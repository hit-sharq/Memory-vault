"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import styles from "./profile-form.module.css"

interface ProfileFormProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "")
  const [email, setEmail] = useState(user.email || "")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMessage("Profile updated successfully")
    setIsSaving(false)
  }

  return (
    <div className={styles.card}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {user.image ? (
            <Image
              src={user.image || "/placeholder.svg"}
              alt={user.name || "User"}
              width={80}
              height={80}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback}>{user.name?.charAt(0) || user.email?.charAt(0) || "U"}</div>
          )}
        </div>
        <div className={styles.uploadButton}>
          <label htmlFor="avatar-upload" className={styles.uploadLabel}>
            Change Avatar
          </label>
          <input id="avatar-upload" type="file" accept="image/*" className={styles.uploadInput} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Your name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Your email"
            disabled
          />
          <p className={styles.helperText}>Email cannot be changed</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <button type="button" className={styles.changePasswordButton}>
            Change Password
          </button>
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

