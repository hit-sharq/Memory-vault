import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getMemories } from "@/actions/memory"
import styles from "./memories-list.module.css"

export async function MemoriesList() {
  const result = await getMemories()

  if (!result.success) {
    return (
      <div className={styles.empty}>
        <p>Failed to load memories</p>
      </div>
    )
  }

  const memories = result.data || []

  if (memories.length === 0) {
    return (
      <div className={styles.empty}>
        <p>You haven't created any memories yet</p>
        <Link href="/dashboard/new" className={styles.createButton}>
          Create your first memory
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {memories.map((memory) => (
        <Link href={`/dashboard/memory/${memory.id}`} key={memory.id} className={styles.card}>
          {memory.imageUrl && (
            <div className={styles.imageContainer}>
              <Image
                src={memory.imageUrl || "/placeholder.svg"}
                alt={memory.title}
                width={500}
                height={300}
                className={styles.image}
              />
            </div>
          )}
          <div className={styles.content}>
            <h2 className={styles.title}>{memory.title}</h2>
            <p className={styles.description}>{memory.description}</p>
            <div className={styles.footer}>
              <p className={styles.date}>{format(new Date(memory.createdAt), "MMM d, yyyy")}</p>
              <span className={styles.viewButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.icon}
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

