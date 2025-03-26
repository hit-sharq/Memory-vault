import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getMemories } from "@/actions/memory"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export async function MemoriesList() {
  const result = await getMemories()

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Failed to load memories</p>
      </div>
    )
  }

  const memories = result.data || []

  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">You haven't created any memories yet</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/new">Create your first memory</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {memories.map((memory) => (
        <Card key={memory.id} className="overflow-hidden">
          {memory.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={memory.imageUrl || "/placeholder.svg"}
                alt={memory.title}
                width={500}
                height={300}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle>{memory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{memory.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{format(new Date(memory.createdAt), "MMM d, yyyy")}</p>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/memory/${memory.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

