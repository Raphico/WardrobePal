import type { Metadata } from "next"
import Link from "next/link"
import { env } from "@/env"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"

import { OAuthSignIn } from "../_components/oauth-sign-in"
import { SignUpForm } from "../_components/sign-up-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign up to WardrobePal",
}

export default function SignInPage() {
  return (
    <Shell variant="centered" className="max-w-md">
      <Card className="w-full rounded-none sm:rounded-md">
        <CardHeader className="items-center space-y-1 text-center">
          <Link href="/">
            <Icons.logo className="size-6" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
          <CardTitle className="text-xl">Join Us Today!</CardTitle>
          <CardDescription>
            Unlock your wardrobe&apos;s potential
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <SignUpForm />
        </CardContent>
        <CardFooter className="justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Shell>
  )
}
