"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"

import { catchClerkError } from "@/lib/utils"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function FirstFactorForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [code, setCode] = React.useState("")
  const [isVerifying, setIsVerifying] = React.useState(false)
  const router = useRouter()

  const onComplete = async (code: string) => {
    if (!isLoaded && !signIn) return null

    setIsVerifying(true)

    try {
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      })

      // This mainly for debuggin while developing.
      // Once your Instance is setup this should not be required.
      if (completeSignIn.status !== "complete") {
        console.error(JSON.stringify(completeSignIn, null, 2))
      }

      // If verification was completed, create a session for the user
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId })

        // Redirect user
        router.push("/app/wardrobe")
      }
    } catch (err) {
      catchClerkError(err)
      setIsVerifying(false)
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
