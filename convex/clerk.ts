"use node"

import type { WebhookEvent } from "@clerk/nextjs/server"
import { v } from "convex/values"
import { Webhook } from "svix"

import { internalAction } from "./_generated/server"

export const fulfill = internalAction({
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  handler: async (_, args) => {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string)
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent
    return payload
  },
})
