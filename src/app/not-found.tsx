import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"

export default function NotFound() {
  return (
    <Shell variant="centered" className="max-w-sm">
      <div className="flex flex-col items-center justify-center space-y-1 text-center">
        <Icons.notFound className="size-16" aria-hidden="true" />
        <p className="pb-2 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist
        </p>
        <Link href="/app/wardrobe" className={cn(buttonVariants())}>
          Go to home
        </Link>
      </div>
    </Shell>
  )
}
