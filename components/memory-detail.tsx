import Image from "next/image"
import { format } from "date-fns"
import { DeleteMemoryButton } from "@/components/delete-memory-button"
import styles from "./memory-detail.module.css"

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
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {memory.imageUrl && (
          <div className={styles.imageContainer}>
            <Image
              src={memory.imageUrl || "/placeholder.svg"}
              alt={memory.title}
              width={1200}
              height={675}
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.header}>
          <p className={styles.date}>Created on {format(new Date(memory.createdAt), "MMMM d, yyyy")}</p>
          <DeleteMemoryButton id={memory.id} />
        </div>
        <div className={styles.description}>
          <p>{memory.description}</p>
        </div>
      </div>
    </div>
  )
}

