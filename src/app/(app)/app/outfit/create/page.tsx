"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

import { AddItemToCanvas } from "./add-item-to-canvas"
import type { ItemOnCanvasType } from "./item"

const Canvas = dynamic(() => import("./canvas").then((mod) => mod.Canvas), {
  ssr: false,
})

export default function CreateOutfitPage() {
  const [itemsOnCanvas, setItemsOnCanvas] = React.useState<ItemOnCanvasType[]>(
    []
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setItemsOnCanvas([])}
          >
            Clear
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.hint className="size-4" aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent className="border bg-popover text-popover-foreground">
                <p>To remove an item from the canvas, click on it</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <AddItemToCanvas
          itemsOnCanvas={itemsOnCanvas}
          setItemsOnCanvas={setItemsOnCanvas}
        />
      </div>

      <Canvas
        itemsOnCanvas={itemsOnCanvas}
        setItemsOnCanvas={setItemsOnCanvas}
      />
    </>
  )
}
