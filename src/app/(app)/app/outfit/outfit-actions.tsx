import * as React from "react"
import { useMutation } from "convex/react"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BlurImage } from "@/components/blur-image"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"

interface OutfitActionsProps {
  outfit: {
    id: Id<"outfits">
    imageUrl: string
  }
}

export function OutfitActions({ outfit }: OutfitActionsProps) {
  const deleteOutfit = useMutation(api.outfits.deleteOutfit)

  const [showDelete, setShowDelete] = React.useState(false)
  const [showView, setShowView] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.verticalMore className="size-4" aria-hidden="true" />
            <span className="sr-only">Item Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" forceMount>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowView((prev) => !prev)}
            className="cursor-pointer"
          >
            <Icons.view className="mr-2 size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDelete((prev) => !prev)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Icons.delete className="mr-2 size-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showView} onOpenChange={setShowView}>
        <DialogContent className="flex items-center justify-center">
          <BlurImage
            src={outfit.imageUrl}
            alt="Clothing item image"
            className="object-cover"
            width={200}
            height={200}
            loading="lazy"
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              Outfit
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await deleteOutfit({ outfitId: outfit.id })
                  toast.success("Item deleted.")
                } catch (err) {
                  catchError(err)
                }
              }}
              className="bg-destructive hover:bg-destructive/80 focus:bg-destructive"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
