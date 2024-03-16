import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { absoluteUrl, cn } from "@/lib/utils"

import { siteConfig } from "../config/site"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nextjs",
    "react",
    "lucia",
    "virtual wardrobe tool",
    "outfit creation tool",
    "fashion",
  ],
  authors: [
    {
      name: "Raphico",
      url: siteConfig.links.githubAccount,
    },
  ],
  creator: "Raphico",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.ogImage}`],
    creator: "@Raphico",
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: absoluteUrl("/site.webmanifest"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  )
}