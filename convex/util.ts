import type { MutationCtx, QueryCtx } from "./_generated/server"

export async function verifyCurrentUserHasAccess(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity()

  if (!identity) {
    throw new Error("You must be logged in to get items.")
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first()

  if (!user) {
    throw new Error("User not found. Please check your authentication.")
  }

  return user
}
