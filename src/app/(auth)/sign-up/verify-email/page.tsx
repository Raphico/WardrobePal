import type { Metadata } from "next"
import { env } from "@/env"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/shell"

import { VerifyEmailForm } from "../../_components/verify-email-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Verification",
  description: "Verify your email",
}

export default function SignInPage() {
  return (
    <Shell variant="centered" className="max-w-md">
      <Card className="w-full rounded-none sm:rounded-md">
        <CardHeader className="items-center space-y-1 text-center">
          <CardTitle className="text-xl">Verify email</CardTitle>
          <CardDescription>
            Enter the code sent to your email to complete verification and
            access WardrobePal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
