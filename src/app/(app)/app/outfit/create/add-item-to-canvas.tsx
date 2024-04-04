import * as React from "react"
import Image from "next/image"
import { useQuery } from "convex/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Icons } from "@/components/icons"

import { api } from "../../../../../../convex/_generated/api"
import { categories, colors } from "../../constant"
import { FilterItems } from "./filter-items"
import type { ItemOnCanvasType } from "./item"

interface AddItemToCanvasProps {
  itemsOnCanvas: ItemOnCanvasType[]
  setItemsOnCanvas: React.Dispatch<React.SetStateAction<ItemOnCanvasType[]>>
}

export function AddItemToCanvas({
  itemsOnCanvas,
  setItemsOnCanvas,
}: AddItemToCanvasProps) {
  const [showItem, setShowItems] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  )
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])

  const items = useQuery(api.wardrobe.getItems, {
    categories: selectedCategories,
    colors: selectedColors,
  })

  const itemsNotOnCanvas = items?.filter(
    (item) =>
      !itemsOnCanvas.some((itemOnCanvas) => itemOnCanvas.id === item._id)
  )

  const isLoading = !itemsNotOnCanvas

  return (
    <Drawer open={showItem} onOpenChange={setShowItems}>
      <DrawerTrigger asChild>
        <Button size="sm">
          <Icons.add className="mr-2 size-4" aria-hidden="true" />
          Select Item
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90dvh]">
        <div className="container max-w-5xl space-y-6">
          <DrawerHeader className="flex flex-col items-start justify-center px-0 sm:flex-row sm:justify-between">
            <DrawerTitle className="text-base">Select an Item</DrawerTitle>
            <div className="flex items-center justify-center gap-2">
              <FilterItems
                title="categories"
                options={categories}
                selectedValues={selectedCategories}
                setSelectedValues={setSelectedCategories}
              />
              <FilterItems
                title="Colors"
                options={colors}
                selectedValues={selectedColors}
                setSelectedValues={setSelectedColors}
              />
            </div>
          </DrawerHeader>
          {isLoading ? (
            <section className="flex items-center justify-center">
              <Icons.spinner
                className="size-6 animate-spin text-muted-foreground"
                aria-hidden="true"
              />
            </section>
          ) : !itemsNotOnCanvas.length ? (
            <div className="flex flex-col items-center justify-center space-y-1 pt-32">
              <Icons.empty className="size-16" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Would could not find a match
              </p>
            </div>
          ) : (
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {itemsNotOnCanvas.map((item) => (
                <Card
                  key={item._id}
                  onClick={() => {
                    setItemsOnCanvas((prev) => [
                      ...prev,
                      {
                        id: item._id,
                        imageUrl: item.imageUrl,
                        x: 0,
                        y: 0,
                        isDragging: false,
                      },
                    ])
                    setShowItems(false)
                  }}
                  className="cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center">
                      <Image
                        src={item.imageUrl}
                        alt="Clothing Item image"
                        width={110}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
