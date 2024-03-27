import { z } from "zod"

import type { Id } from "../../../../../convex/_generated/dataModel"

const colorSchema = z
  .enum([
    "black",
    "white",
    "gray",
    "navy",
    "beige",
    "blue",
    "green",
    "yellow",
    "pink",
    "brown",
    "red",
    "orange",
    "purple",
    "teal",
  ])
  .default("black")

const categorySchema = z
  .enum([
    "tops",
    "bottoms",
    "dresses",
    "outwear",
    "activewear",
    "shoes",
    "accessories",
  ])
  .default("tops")

export const itemSchema = z.object({
  image: z.custom<FileList>((val) => val instanceof FileList).optional(),
  brand: z.string().min(1, {
    message: "Brand name must is required",
  }),
  size: z.string().min(1, {
    message: "Size is required",
  }),
  color: colorSchema,
  category: categorySchema,
})

export type Item = {
  imageUrl: string
  _id: Id<"items">
  imageId: Id<"_storage">
  brand: string
  size: string
  color: z.infer<typeof colorSchema>
  category: z.infer<typeof categorySchema>
  wornCount: number
}
