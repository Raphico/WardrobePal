import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { Footer } from "./footer"
import { Header } from "./header"
import { siteConfig } from "./site"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Generated by https://bg.ibelick.com/ */}
      {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
      <div className="absolute inset-0 -z-10 size-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <Header />
      <main className="mt-24 flex w-full flex-1 flex-col items-center md:mt-36">
        <div className="container flex flex-col items-center justify-center space-y-4">
          <h1 className="text-center text-4xl font-bold leading-[1.15] sm:text-6xl">
            Manage & style
            <br className="max-md:hidden" />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-500 to-purple-400 bg-clip-text text-center text-transparent">
              {" "}
              Your Wardrobe
            </span>
          </h1>
          <p className="max-w-xl text-center text-muted-foreground sm:text-xl">
            Easily organize your closet. Create stunning outfits. Your personal
            style assistant is here.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className={buttonVariants()}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              className={buttonVariants({
                variant: "outline",
              })}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.gitHub className="mr-2 size-4" aria-hidden="true" />
              Github
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
