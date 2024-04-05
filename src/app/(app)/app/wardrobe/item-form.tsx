import * as React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BlurImage } from "@/components/blur-image"
import { Icons } from "@/components/icons"

import { categories, colors } from "../constant"
import type { itemSchema } from "./item"

interface ItemFormProps {
  type: "edit" | "add"
  onSubmit: (values: z.infer<typeof itemSchema>) => Promise<void>
  form: UseFormReturn<z.infer<typeof itemSchema>, unknown, undefined>
  imageUrl?: string
}

export function ItemForm({ onSubmit, form, type, imageUrl }: ItemFormProps) {
  const [preview, setPreview] = React.useState<string | null>(imageUrl || null)

  function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer()

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    )

    const files = dataTransfer.files
    const displayUrl = URL.createObjectURL(event.target.files![0])

    return { files, displayUrl }
  }

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel className="flex h-48 w-full cursor-pointer items-center justify-center border border-dashed shadow">
                {preview ? (
                  <div className="relative h-full w-1/3">
                    <BlurImage src={preview} alt="Selected Image" fill />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Icons.upload className="size-16" aria-hidden="true" />
                    <span className="font-medium">Choose a photo</span>
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...rest}
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event)
                    setPreview(displayUrl)
                    onChange(files)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand*</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <span
                          className={cn(
                            "mr-2 inline-block size-4",
                            color.color,
                            {
                              border: color.value === "white",
                            }
                          )}
                        />
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size*</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} className="mt-4">
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          {type === "add" ? "Add Item" : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}
