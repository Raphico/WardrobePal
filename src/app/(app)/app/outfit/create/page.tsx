import type { Metadata } from "next"
import { env } from "@/env"

import { Shell } from "@/components/shell"

import { AddItemToCanvas } from "./add-item-to-canvas"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create",
  description: "Create an outfit",
}

export default function CreateOutfitPage() {
  return (
    <Shell>
      <div className="flex items-center justify-end">
        <AddItemToCanvas />
      </div>
    </Shell>
  )
}
