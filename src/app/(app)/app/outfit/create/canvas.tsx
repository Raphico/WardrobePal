import * as React from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import type Konva from "konva"
import type { KonvaEventObject } from "konva/lib/Node"
import { Image, Stage as KonvaStage, Layer } from "react-konva"
import { toast } from "sonner"
import useImage from "use-image"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { api } from "../../../../../../convex/_generated/api"
import type { Id } from "../../../../../../convex/_generated/dataModel"
import type { ItemOnCanvasType } from "./item"

interface CanvasProps {
  itemsOnCanvas: ItemOnCanvasType[]
  setItemsOnCanvas: React.Dispatch<React.SetStateAction<ItemOnCanvasType[]>>
}

const LG_SCREEN = 1024

export function Canvas({ itemsOnCanvas, setItemsOnCanvas }: CanvasProps) {
  const router = useRouter()
  const createOutfit = useMutation(api.outfits.createOutfit)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const stageRef = React.useRef<Konva.Stage | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const widthMultiplier = window.innerWidth > LG_SCREEN ? 0.55 : 0.83

  const addOutfit = async () => {
    setIsLoading(true)

    if (!stageRef.current) {
      return
    }

    if (itemsOnCanvas.length === 0) {
      toast.error("Outfit canvas is empty")
    }

    try {
      const postUrl = await generateUploadUrl()

      const dataUrl = stageRef.current.getStage().toDataURL()
      const blob = await (await fetch(dataUrl)).blob()

      const imageType = blob.type

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": imageType },
        body: blob,
      })

      const { storageId } = (await result.json()) as {
        storageId: Id<"_storage">
      }

      await createOutfit({
        imageId: storageId,
      })

      toast.success("Outfit added!")
      router.push("/app/outfit")
    } catch (err) {
      catchError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid space-y-2">
      <KonvaStage
        ref={stageRef}
        width={window.innerWidth * widthMultiplier}
        height={window.innerHeight * 0.7}
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <Layer>
          {itemsOnCanvas.map((item) => (
            <URLImage
              key={item.id}
              url={item.imageUrl}
              x={item.x}
              y={item.y}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              removeItemFromCanvas={(evt: KonvaEventObject<Event>) =>
                setItemsOnCanvas((prev) =>
                  prev.filter((prevItem) => prevItem.id != item.id)
                )
              }
              onDragEnd={(evt: KonvaEventObject<DragEvent>) => {
                setItemsOnCanvas((prev) =>
                  prev.map((prevItem) =>
                    prevItem.id !== item.id
                      ? prevItem
                      : { ...prevItem, x: evt.target.x(), y: evt.target.y() }
                  )
                )
              }}
            />
          ))}
        </Layer>
      </KonvaStage>
      <Button disabled={isLoading} onClick={addOutfit}>
        {isLoading && (
          <Icons.spinner
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Add Outfit
      </Button>
    </div>
  )
}

interface URLImageProps {
  url: string
  x: number
  y: number
  removeItemFromCanvas: (evt: KonvaEventObject<Event>) => void
  onDragEnd: (evt: KonvaEventObject<DragEvent>) => void
}

const URLImage: React.FC<URLImageProps> = ({
  url,
  x,
  y,
  removeItemFromCanvas,
  onDragEnd,
}) => {
  const [img] = useImage(url, "anonymous")

  return (
    <Image
      image={img}
      x={x}
      y={y}
      width={110}
      height={150}
      onClick={removeItemFromCanvas}
      alt="Clothing item"
      draggable
      onDragEnd={onDragEnd}
    />
  )
}
