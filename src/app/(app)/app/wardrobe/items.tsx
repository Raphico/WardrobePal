"use client"

import Image from "next/image"
import { useQuery } from "convex/react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"

export function Items() {
  const items = useQuery(api.wardrobe.getItems)

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
              <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-sm font-medium capitalize">
                  {item.brand}
                </CardTitle>
                <Icons.more className="size-4" aria-hidden="true" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt="Clothing Item image"
                    width={150}
                    height={150}
                    className="bg-muted object-contain"
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
