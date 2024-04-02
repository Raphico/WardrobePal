import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { verifyCurrentUserHasAccess } from "./util"

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity()

  if (!identity) {
    throw new Error("You must be logged in to generate an upload URL.")
  }

  return await ctx.storage.generateUploadUrl()
})

export const createItem = mutation({
  args: {
    imageId: v.id("_storage"),
    brand: v.string(),
    size: v.string(),
    color: v.string(),
    category: v.string(),
  },
  async handler(ctx, args) {
    const user = await verifyCurrentUserHasAccess(ctx)

    await ctx.db.insert("items", {
      userId: user._id,
      imageId: args.imageId,
      brand: args.brand,
      size: args.size,
      color: args.color,
      category: args.category,
      wornCount: 0,
    })
  },
})

export const getItems = query({
  args: {
    colors: v.optional(v.array(v.string())),
    categories: v.optional(v.array(v.string())),
  },
  async handler(ctx, args) {
    const user = await verifyCurrentUserHasAccess(ctx)

    let items = await ctx.db
      .query("items")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()

    const { colors, categories } = args

    if (colors?.length) {
      items = items.filter((item) => colors.includes(item.color))
    }
    if (categories?.length) {
      items = items.filter((item) => categories.includes(item.category))
    }

    return Promise.all(
      items.map(async (item) => {
        const imageUrl = await ctx.storage.getUrl(item.imageId)
        if (!imageUrl) {
          throw new Error(`Image URL not found`)
        }
        return {
          ...item,
          imageUrl,
        }
      })
    )
  },
})

export const editItem = mutation({
  args: {
    itemId: v.id("items"),
    prevImageId: v.optional(v.id("_storage")),
    imageId: v.optional(v.id("_storage")),
    brand: v.string(),
    size: v.string(),
    color: v.string(),
    category: v.string(),
  },
  async handler(ctx, args) {
    await verifyCurrentUserHasAccess(ctx)

    if (args.imageId && args.prevImageId) {
      await ctx.storage.delete(args.prevImageId)

      await ctx.db.patch(args.itemId, {
        imageId: args.imageId,
        brand: args.brand,
        size: args.size,
        color: args.color,
        category: args.category,
      })
    } else {
      await ctx.db.patch(args.itemId, {
        brand: args.brand,
        size: args.size,
        color: args.color,
        category: args.category,
      })
    }
  },
})

export const deleteItem = mutation({
  args: {
    itemId: v.id("items"),
  },
  async handler(ctx, args) {
    await verifyCurrentUserHasAccess(ctx)

    const item = await ctx.db.get(args.itemId)

    if (!item) {
      throw new Error("Unauthorized")
    }

    await ctx.storage.delete(item.imageId)
    await ctx.db.delete(item._id)
  },
})

export const incrementWornCount = mutation({
  args: {
    itemId: v.id("items"),
  },
  async handler(ctx, args) {
    await verifyCurrentUserHasAccess(ctx)

    const item = await ctx.db.get(args.itemId)

    if (!item) {
      throw new Error("Item not found.")
    }

    await ctx.db.patch(args.itemId, {
      wornCount: item.wornCount + 1,
    })
  },
})

export const decrementWornCount = mutation({
  args: {
    itemId: v.id("items"),
  },
  async handler(ctx, args) {
    await verifyCurrentUserHasAccess(ctx)

    const item = await ctx.db.get(args.itemId)

    if (!item) {
      throw new Error("Item not found.")
    }

    await ctx.db.patch(args.itemId, {
      wornCount: item.wornCount - 1,
    })
  },
})
