import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteMemoryButton } from "@/components/delete-memory-button"

interface MemoryDetailProps {
  memory: {
    id: string
    title: string
    description: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export function MemoryDetail({ memory }: MemoryDetailProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {memory.imageUrl && (
          <div className="mb-6 aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={memory.imageUrl || "/placeholder.svg"}
              alt={memory.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Created on {format(new Date(memory.createdAt), "MMMM d, yyyy")}
          </p>
          <DeleteMemoryButton id={memory.id} />
        </div>
        <div className="prose max-w-none dark:prose-invert">
          <p>{memory.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

