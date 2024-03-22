import { z } from "zod"

export const colorSchema = z
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

export const categorySchema = z
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
  image: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
  brand: z.string().min(1, {
    message: "Brand name must is required",
  }),
  size: z.string().min(1, {
    message: "Size is required",
  }),
  color: colorSchema,
  category: categorySchema,
})
