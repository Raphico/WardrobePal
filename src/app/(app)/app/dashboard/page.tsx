import type { Metadata } from "next"
import { env } from "@/env"
import { UserButton } from "@clerk/nextjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Welcome to WardrobePal's dashboard",
}

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to WardrobePal. This is the dashboard page</h1>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  )
}
