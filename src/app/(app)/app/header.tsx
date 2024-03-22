"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { appConfig } from "./app"
import { MobileNav } from "./mobile-nav"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="hidden items-center space-x-4 sm:flex">
          <Link href="/">
            <Icons.logo className="size-6" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {appConfig.navItems.map((item) => {
              const isActive = pathname.includes(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium capitalize text-muted-foreground transition-colors hover:text-foreground",
                    {
                      "text-foreground": isActive,
                    }
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        <MobileNav />

        <Link href="/" className="flex sm:hidden">
          <Icons.logo className="size-6" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </Link>

        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  )
}
