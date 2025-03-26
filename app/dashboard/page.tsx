import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MemoriesList } from "@/components/memories-list"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Dashboard | Memory Vault",
  description: "Manage your memories",
}

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Memories</h1>
        <Link href="/dashboard/new" className={styles.newButton}>
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
          New Memory
        </Link>
      </div>
      <Suspense fallback={<div className={styles.loading}>Loading memories...</div>}>
        <MemoriesList />
      </Suspense>
    </div>
  )
}

