/** Originally from `skateshop`
 * @link https://github.com/sadmann7/skateshop/blob/main/src/app/(auth)/_components/oauth-signin.tsx
 */

"use client"

import * as React from "react"
import { useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/types"

import { catchClerkError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Github", strategy: "oauth_discord", icon: "gitHub" },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]

export function OAuthSignIn() {
  const [loading, setLoading] = React.useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    try {
      setLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/app/wardrobe",
      })
    } catch (err) {
      catchClerkError(err)
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background"
            onClick={() => void oauthSignIn(provider.strategy)}
            disabled={loading !== null}
          >
            {loading === provider.strategy ? (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 size-4" aria-hidden="true" />
            )}
            <span className="hidden sm:inline-block">{provider.name}</span>
            <span className="sr-only">{provider.name}</span>
          </Button>
        )
      })}
    </div>
  )
}
