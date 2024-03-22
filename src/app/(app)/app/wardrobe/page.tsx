import type { Metadata } from "next"
import { env } from "@/env"

import { Shell } from "@/components/shell"

import { AddItem } from "./add-item"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Wardrobe",
  description: "Manage your wardrobe",
}

export default function Dashboard() {
  return (
    <Shell>
      <div className="flex items-center justify-end">
        <AddItem />
      </div>
    </Shell>
  )
}
