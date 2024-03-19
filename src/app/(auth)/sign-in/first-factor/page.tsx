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

import { FirstFactorForm } from "../../_components/first-factor-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Verification",
  description: "Verification code",
}

export default function SignInPage() {
  return (
    <Shell variant="centered" className="max-w-md">
      <Card className="w-full rounded-none sm:rounded-md">
        <CardHeader className="items-center space-y-1 text-center">
          <CardTitle className="text-xl">Verification</CardTitle>
          <CardDescription>
            Enter the code sent to your email to complete verification and
            access WardrobePal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FirstFactorForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
