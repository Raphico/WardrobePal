"use client"

import { useQuery } from "convex/react"

import { Card, CardContent } from "@/components/ui/card"
import { BlurImage } from "@/components/blur-image"
import { Icons } from "@/components/icons"

import { api } from "../../../../../convex/_generated/api"
import { OutfitActions } from "./outfit-actions"

export function Outfits() {
  const outfits = useQuery(api.outfits.getOutfits)

  const isLoading = !outfits

  return (
    <>
      {isLoading ? (
        <section className="flex items-center justify-center">
          <Icons.spinner
            className="size-6 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        </section>
      ) : !outfits.length ? (
        <div className="flex flex-col items-center justify-center space-y-1 pt-32">
          <Icons.empty className="size-16" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            You haven&apos;t created any outfit
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {outfits.map((outfit) => (
            <Card key={outfit._id}>
              <CardContent className="p-4">
                <div className="flex w-full justify-end">
                  <OutfitActions
                    outfit={{ id: outfit._id, imageUrl: outfit.imageUrl }}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <BlurImage
                    src={outfit.imageUrl}
                    alt="Outfit Image"
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
