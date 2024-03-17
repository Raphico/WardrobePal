import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { siteConfig } from "./site"

export function Footer() {
  return (
    <footer className="w-full">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <Link
            href={siteConfig.links.githubAccount}
            className="font-semibold transition-colors hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            Raphico
            <span className="sr-only">Github</span>
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.links.github}
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.gitHub className="size-4" aria-hidden="true" />
            <span className="sr-only">Github</span>
          </Link>
          <Link
            href={siteConfig.links.github}
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.x className="size-4" aria-hidden="true" />
            <span className="sr-only">X</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
