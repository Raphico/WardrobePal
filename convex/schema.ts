import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  items: defineTable({
    userId: v.id("users"),
    imageId: v.id("_storage"),
    brand: v.string(),
    size: v.string(),
    color: v.string(),
    category: v.string(),
  }).index("by_userId", ["userId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    username: v.string(),
    image: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
})
