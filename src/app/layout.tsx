import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { env } from "@/env"
import { Toaster } from "sonner"

import { absoluteUrl, cn } from "@/lib/utils"

import ConvexClientProvider from "./convex-client-provider"
import { siteConfig } from "./site"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
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
    images: [`${siteConfig.url}/og.jpg`],
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
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
