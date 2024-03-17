import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function Header() {
  return (
    <header className="w-full">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="size-6" aria-hidden="true" />
          <span className="hidden text-lg font-bold lg:inline-block">
            {siteConfig.name}
          </span>
          <span className="sr-only">Home</span>
        </Link>

        <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
          Sign In
        </Link>
      </div>
    </header>
  )
}
