import { httpRouter } from "convex/server"

import { internal } from "./_generated/api"
import { httpAction } from "./_generated/server"

const http = httpRouter()

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const payloadString = await req.text()
    const headerPayload = req.headers

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      })

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            tokenIdentifier: `${result.data.id}`,
            username: result.data.username ?? "",
            image: result.data.image_url,
          })
          break
        case "user.updated":
          await ctx.runMutation(internal.users.updateUser, {
            tokenIdentifier: `${result.data.id}`,
            username: result.data.username ?? "",
            image: result.data.image_url,
          })
          break
      }

      return new Response(null, {
        status: 200,
      })
    } catch (err) {
      console.log(err)
      return new Response("Webhook Error", {
        status: 400,
      })
    }
  }),
})

export default http
