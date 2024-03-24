"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"
import { type Id } from "../../../../../convex/_generated/dataModel"
import { itemSchema } from "./item"
import { AddItemForm } from "./item-form"

type Input = z.infer<typeof itemSchema>

export function AddItem() {
  const generateUploadUrl = useMutation(api.wardrobe.generateUploadUrl)
  const createItem = useMutation(api.wardrobe.createItem)

  const [open, setOpen] = React.useState(false)

  const form = useForm<Input>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      image: undefined,
      brand: "",
      size: "",
      color: "black",
      category: "tops",
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

      await createItem({
        brand: values.brand,
        category: values.category,
        color: values.color,
        size: values.size,
        imageId: storageId,
      })

      setOpen(false)
      toast.success("Item added to wardrobe!")
      form.reset()
    } catch (err) {
      catchError(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" aria-label="Add Item" className="space-x-2">
          <Icons.add className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline-block">Add Item</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add item</DialogTitle>
          <DialogDescription>
            Add a new clothing item to your wardrobe
          </DialogDescription>
        </DialogHeader>
        <AddItemForm onSubmit={onSubmit} form={form} />
      </DialogContent>
    </Dialog>
  )
}
