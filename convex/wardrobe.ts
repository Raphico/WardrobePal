import { v } from "convex/values"

import { mutation } from "./_generated/server"

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
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("You must be logged in to create an item.")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique()

    if (!user) {
      throw new Error("User not found. Please check your authentication.")
    }

    await ctx.db.insert("items", {
      userId: user._id,
      imageId: args.imageId,
      brand: args.brand,
      size: args.size,
      color: args.color,
      category: args.category,
    })
  },
})
