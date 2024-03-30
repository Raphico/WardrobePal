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
import { ItemForm } from "./item-form"

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
    if (!values.image) {
      form.setError("image", {
        type: "validate",
        message: "Image is required",
      })
      return
    }

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
        <Button size="sm" aria-label="Add Item">
          <Icons.add className="mr-2 size-4" aria-hidden="true" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add item</DialogTitle>
          <DialogDescription>
            Add a new clothing item to your wardrobe
          </DialogDescription>
        </DialogHeader>
        <ItemForm onSubmit={onSubmit} form={form} type="add" />
      </DialogContent>
    </Dialog>
  )
}
