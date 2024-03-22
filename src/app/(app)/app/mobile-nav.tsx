"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { appConfig } from "./app"

export function MobileNav() {
  const pathname = usePathname()
  const [showNav, setShowNav] = React.useState(false)

  const toggleNav = () => setShowNav((prev) => !prev)

  return (
    <div className="flex sm:hidden">
      <button
        className="flex items-center justify-center"
        onClick={toggleNav}
        aria-controls="mobile-navigation"
      >
        {showNav ? (
          <Icons.close className="size-6" aria-hidden="true" />
        ) : (
          <Icons.menu className="size-6" aria-hidden="true" />
        )}
        <span className="sr-only">Menu</span>
      </button>

      {showNav && (
        <div
          id="mobile-navigation"
          className={cn(
            "fixed inset-0 top-14 z-50 h-[calc(100vh-4rem)] overflow-auto p-6 animate-in slide-in-from-bottom-20"
          )}
        >
          <nav className="relative z-20 grid gap-4 rounded-md bg-card p-4 text-card-foreground shadow-lg">
            {appConfig.navItems.map((item) => {
              const isActive = pathname.includes(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium capitalize text-muted-foreground",
                    {
                      "text-foreground": isActive,
                    }
                  )}
                  onClick={toggleNav}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
