import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { verifyCurrentUserHasAccess } from "./util"

export const createOutfit = mutation({
  args: {
    imageId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const user = await verifyCurrentUserHasAccess(ctx)

    await ctx.db.insert("outfits", {
      userId: user._id,
      imageId: args.imageId,
    })
  },
})

export const getOutfits = query({
  args: {},
  async handler(ctx) {
    const user = await verifyCurrentUserHasAccess(ctx)

    const outfits = await ctx.db
      .query("outfits")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()

    return Promise.all(
      outfits.map(async (item) => {
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

export const deleteOutfit = mutation({
  args: {
    outfitId: v.id("outfits"),
  },
  async handler(ctx, args) {
    await verifyCurrentUserHasAccess(ctx)

    const outfit = await ctx.db.get(args.outfitId)

    if (!outfit) {
      throw new Error("Unauthorized")
    }

    await ctx.storage.delete(outfit.imageId)
    await ctx.db.delete(outfit._id)
  },
})
