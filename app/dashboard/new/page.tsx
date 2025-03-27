import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { NewMemoryForm } from "@/components/new-memory-form"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Create Memory | Memory Vault",
  description: "Create a new memory",
}

export default async function NewMemoryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

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

