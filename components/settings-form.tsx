"use client"

import type React from "react"

import { useState } from "react"
import styles from "./settings-form.module.css"

export function SettingsForm() {
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMessage("Settings saved successfully")
    setIsSaving(false)
  }

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Appearance</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <label htmlFor="darkMode" className={styles.settingLabel}>
                Dark Mode
              </label>
              <p className={styles.settingDescription}>Enable dark mode for the application</p>
            </div>
            <div className={styles.toggle}>
              <input
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className={styles.toggleInput}
              />
              <label htmlFor="darkMode" className={styles.toggleLabel}>
                <span className={styles.toggleButton}></span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notifications</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <label htmlFor="emailNotifications" className={styles.settingLabel}>
                Email Notifications
              </label>
              <p className={styles.settingDescription}>Receive email notifications about your account</p>
            </div>
            <div className={styles.toggle}>
              <input
                type="checkbox"
                id="emailNotifications"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className={styles.toggleInput}
              />
              <label htmlFor="emailNotifications" className={styles.toggleLabel}>
                <span className={styles.toggleButton}></span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Privacy</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Delete Account</label>
              <p className={styles.settingDescription}>Permanently delete your account and all your data</p>
            </div>
            <button type="button" className={styles.dangerButton}>
              Delete Account
            </button>
          </div>
        </div>

        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.actions}>
          <button type="submit" className={styles.saveButton} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}

