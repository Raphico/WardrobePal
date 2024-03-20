import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { Shell } from "@/components/shell"

import { getUser } from "../../../../../convex/utils"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Welcome to WardrobePal's dashboard",
}

export default async function Dashboard() {
  const user = await getUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <Shell>
      <h1 className="text-xl font-bold">Hi, {user.username}</h1>
    </Shell>
  )
}
