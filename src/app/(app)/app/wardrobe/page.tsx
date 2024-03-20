import type { Metadata } from "next"
import { env } from "@/env"

import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Wardrobe",
  description: "Manage your wardrobe",
}

export default function Dashboard() {
  return <Shell></Shell>
}
