import { v } from "convex/values"

import { mutation } from "./_generated/server"
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
