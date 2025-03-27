import type { Metadata } from "next"
import { auth } from "@/auth"
import { ProfileForm } from "../../../components/profile-form"
import styles from "./page.module.css"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile | Memory Vault",
  description: "Manage your profile information",
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Profile</h1>
        <p className={styles.description}>Manage your personal information</p>
      </div>
      <ProfileForm user={session.user} />
    </div>
  )
}

