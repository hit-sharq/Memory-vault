import type { Metadata } from "next"
import { SettingsForm } from "../../../components/settings-form"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Settings | Memory Vault",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.description}>Manage your account preferences and settings</p>
      </div>
      <SettingsForm />
    </div>
  )
}

