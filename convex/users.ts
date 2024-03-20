import { ConvexError, v } from "convex/values"

import { internalMutation } from "./_generated/server"

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    username: v.string(),
    image: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      username: args.username,
      image: args.image,
    })
  },
})

export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    username: v.string(),
    image: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first()

    if (!user) {
      throw new ConvexError("No user with this token found")
    }

    await ctx.db.patch(user._id, {
      username: args.username,
      image: args.image,
    })
  },
})
