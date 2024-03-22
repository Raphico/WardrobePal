import { type HandleOAuthCallbackParams } from "@clerk/types"

import { Card, CardContent } from "@/components/ui/card"
import { Shell } from "@/components/shell"

import { SSOCallback } from "./sso-callback"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <Shell variant="centered" className="max-w-md">
      <Card className="w-full rounded-none sm:rounded-md">
        <CardContent>
          <SSOCallback searchParams={searchParams} />
        </CardContent>
      </Card>
    </Shell>
  )
}
