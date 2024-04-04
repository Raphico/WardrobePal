import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError, cn } from "@/lib/utils"
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
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
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
import { BlurImage } from "@/components/blur-image"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { colors } from "../constant"
import { itemSchema, type Item } from "./item"
import { ItemForm } from "./item-form"

type Input = z.infer<typeof itemSchema>

interface ItemsActionsProps {
  item: Item
}

export function ItemActions({ item }: ItemsActionsProps) {
  const deleteItem = useMutation(api.wardrobe.deleteItem)
  const incrementWornCount = useMutation(api.wardrobe.incrementWornCount)
  const decrementWornCount = useMutation(api.wardrobe.decrementWornCount)
  const editItem = useMutation(api.wardrobe.editItem)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const [showEdit, setShowEdit] = React.useState(false)
  const [showWorn, setShowWorn] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [showView, setShowView] = React.useState(false)

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
      let storageId

      // Only upload a new image if the user has selected one
      if (values.image) {
        const postUrl = await generateUploadUrl()

        const imageType = values.image[0].type

        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": imageType },
          body: values.image[0],
        })

        const { storageId: newStorageId } = (await result.json()) as {
          storageId: Id<"_storage">
        }

        storageId = newStorageId
      }

      await editItem({
        itemId: item._id,
        prevImageId: storageId ? item.imageId : undefined,
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
            onClick={() => setShowView((prev) => !prev)}
            className="cursor-pointer"
          >
            <Icons.view className="mr-2 size-4" aria-hidden="true" />
            View
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
          <ItemForm
            onSubmit={onSubmit}
            form={form}
            type="edit"
            imageUrl={item.imageUrl}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showView} onOpenChange={setShowView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">{item.brand}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <AspectRatio
              ratio={4 / 3}
              className="flex items-center justify-center border"
            >
              <div className="relative h-full w-48">
                <BlurImage
                  src={item.imageUrl}
                  alt="Clothing item image"
                  className="object-cover"
                  fill
                  loading="lazy"
                />
              </div>
            </AspectRatio>
            <div className="flex items-center space-x-2">
              <Badge>{item.category}</Badge>
              <Badge
                className={cn(
                  colors.find((color) => color.value === item.color)?.color,
                  item.color === "white" && "text-black"
                )}
              >
                {item.color}
              </Badge>
              <Badge variant="secondary">{item.size}</Badge>
            </div>
          </div>
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
                  onClick={async () => {
                    try {
                      await decrementWornCount({
                        itemId: item._id,
                      })
                    } catch (err) {
                      catchError(err)
                    }
                  }}
                >
                  <Icons.minus className="size-4" aria-hidden="true" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {item.wornCount}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0 rounded-full"
                  onClick={async () => {
                    try {
                      await incrementWornCount({
                        itemId: item._id,
                      })
                    } catch (err) {
                      catchError(err)
                    }
                  }}
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
