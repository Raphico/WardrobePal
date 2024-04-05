import type { Metadata } from "next"
import { env } from "@/env"

import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create",
  description: "Create an outfit",
}

export default function CreateOutfitLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Shell className="max-w-sm">{children}</Shell>
}
