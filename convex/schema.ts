import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    username: v.string(),
    image: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
})
