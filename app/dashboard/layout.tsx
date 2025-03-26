import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import styles from "./dashboard.module.css"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span>Memory Vault</span>
          </div>
          <UserNav user={session.user} />
        </div>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <DashboardNav />
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}

