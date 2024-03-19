import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sso-callback(.*)",
    "/api(.*)",
  ],
  ignoredRoutes: ["/icon"],
  afterAuth(auth, req) {
    const url = new URL(req.nextUrl.origin)

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      url.pathname = "/sign-in"
      return NextResponse.redirect(url)
    }

    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }

    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
