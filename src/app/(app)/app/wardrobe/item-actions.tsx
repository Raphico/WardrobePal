import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { itemSchema, type Item } from "./item"
import { AddItemForm } from "./item-form"

type Input = z.infer<typeof itemSchema>

interface ItemsActionsProps {
  item: Item
}

export function ItemActions({ item }: ItemsActionsProps) {
  const deleteItem = useMutation(api.wardrobe.deleteItem)
  const generateUploadUrl = useMutation(api.wardrobe.generateUploadUrl)
  const editItem = useMutation(api.wardrobe.editItem)

  const [showEdit, setShowEdit] = React.useState(false)
  const [showWorn, setShowWorn] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)

  const form = useForm<Input>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      image: undefined,
      brand: item.brand,
      size: item.size,
      color: item.color,
      category: item.category,
    },
  })

  const onSubmit = async (values: Input) => {
    try {
      const postUrl = await generateUploadUrl()

      const imageType = values.image[0].type

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": imageType },
        body: values.image[0],
      })

      const { storageId } = (await result.json()) as {
        storageId: Id<"_storage">
      }

      await editItem({
        itemId: item._id,
        prevImageId: item.imageId,
        brand: values.brand,
        category: values.category,
        color: values.color,
        size: values.size,
        imageId: storageId,
      })

      setShowEdit(false)
      toast.success("Item updated!")
      form.reset()
    } catch (err) {
      catchError(err)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.more className="size-4" aria-hidden="true" />
            <span className="sr-only">Item Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" forceMount>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowEdit((prev) => !prev)}
            className="cursor-pointer"
          >
            <Icons.edit className="mr-2 size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowWorn((prev) => !prev)}
            className="cursor-pointer"
          >
            <Icons.count className="mr-2 size-4" aria-hidden="true" />
            Worn
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

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit item</DialogTitle>
            <DialogDescription>Make changes to clothing item</DialogDescription>
          </DialogHeader>
          <AddItemForm
            onSubmit={onSubmit}
            form={form}
            type="edit"
            imageUrl={item.imageUrl}
          />
        </DialogContent>
      </Dialog>

      <Drawer open={showWorn} onOpenChange={setShowWorn}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Worn Count</DrawerTitle>
              <DrawerDescription>
                Adjust how many times you&apos;ve worn this item
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0 rounded-full"
                >
                  <Icons.minus className="size-4" aria-hidden="true" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">0</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0 rounded-full"
                >
                  <Icons.plus className="size-4" aria-hidden="true" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await deleteItem({ itemId: item._id })
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
