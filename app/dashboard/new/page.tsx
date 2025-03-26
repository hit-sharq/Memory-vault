import type { Metadata } from "next"
import { NewMemoryForm } from "@/components/new-memory-form"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Create Memory | Memory Vault",
  description: "Create a new memory",
}

export default function NewMemoryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create New Memory</h1>
        <p className={styles.description}>Add a new memory to your collection</p>
      </div>
      <NewMemoryForm />
    </div>
  )
}

