import type { Metadata } from "next"
import Link from "next/link"
import { env } from "@/env"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"

import { Outfits } from "./outfits"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Outfit",
  description: "Manage your outfits",
}

export default function OutfitPage() {
  return (
    <Shell>
      <div className="flex items-center justify-end">
        <Link
          href="/app/outfit/create"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          <Icons.add className="mr-2 size-4" aria-hidden="true" />
          Create Outfit
        </Link>
      </div>

      <Outfits />
    </Shell>
  )
}
