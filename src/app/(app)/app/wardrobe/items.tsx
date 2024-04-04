"use client"

import { useQuery } from "convex/react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlurImage } from "@/components/blur-image"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"
import type { Item } from "./item"
import { ItemActions } from "./item-actions"

export function Items() {
  const items = useQuery(api.wardrobe.getItems, {})

  const isLoading = !items

  return (
    <>
      {isLoading ? (
        <section className="flex items-center justify-center">
          <Icons.spinner
            className="size-6 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        </section>
      ) : !items.length ? (
        <div className="flex flex-col items-center justify-center space-y-1 pt-32">
          <Icons.empty className="size-16" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Your wardrobe is empty
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <Card key={item._id}>
              <CardHeader className="flex-row items-center justify-between p-4 pt-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {item.brand}
                </CardTitle>
                <ItemActions item={item as Item} />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-center">
                  <BlurImage
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
    </>
  )
}
