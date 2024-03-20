"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"

import { catchClerkError } from "@/lib/utils"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function VerifyEmailForm() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [code, setCode] = React.useState("")
  const [isVerifying, setIsVerifying] = React.useState(false)
  const router = useRouter()

  const onComplete = async (code: string) => {
    if (!isLoaded && !signUp) return null

    setIsVerifying(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      // This mainly for debugging while developing.
      // Once your Instance is setup this should not be required.
      if (completeSignUp.status !== "complete") {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }

      // If verification was completed, create a session for the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })

        // Redirect user
        router.push("/app/dashboard")
      }
    } catch (err) {
      catchClerkError(err)
    }
  }

  return (
    <form className="flex flex-col items-center justify-center">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={setCode}
        onComplete={onComplete}
        disabled={isVerifying}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSeparator />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </form>
  )
}
