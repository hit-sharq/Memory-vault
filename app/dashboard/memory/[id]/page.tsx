import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { MemoryDetail } from "@/components/memory-detail"
import styles from "./page.module.css"

interface MemoryPageProps {
  params: {
    id: string
  }
}

export default async function MemoryPage({ params }: MemoryPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const memory = await db.memory.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  })

  if (!memory) {
    return notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/dashboard" className={styles.backButton}>
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span className="sr-only">Back</span>
        </Link>
        <h1 className={styles.title}>{memory.title}</h1>
      </div>
      <MemoryDetail memory={memory} />
    </div>
  )
}

