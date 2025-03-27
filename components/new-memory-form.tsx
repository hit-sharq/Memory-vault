"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import styles from "./new-memory-form.module.css"
import { uploadImage } from "@/actions/upload-image"
import { createMemory } from "@/actions/memory"

export function NewMemoryForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadImage(formData)

      if (!result.success) {
        setError(result.error || "Failed to upload image")
        return
      }

      setImageUrl(result.url || null)
    } catch (error) {
      setError("An error occurred while uploading the image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      if (imageUrl) {
        formData.append("imageUrl", imageUrl)
      }

      const result = await createMemory(formData)

      if (!result.success) {
        setError(result.error || "Failed to create memory")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeImage = () => {
    setImageUrl(null)
  }

  return (
    <div className={styles.card}>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your memory"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your memory..."
            rows={5}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image (Optional)</label>
          {imageUrl ? (
            <div className={styles.imagePreview}>
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Memory image"
                width={500}
                height={300}
                className={styles.previewImage}
              />
              <button type="button" className={styles.removeButton} onClick={removeImage}>
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <div className={styles.uploadContainer}>
              <label htmlFor="image" className={styles.uploadLabel}>
                {isUploading ? (
                  <svg
                    className={styles.spinner}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.uploadIcon}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Upload an image</span>
                  </>
                )}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className={styles.saveButton} disabled={isSubmitting || isUploading}>
            {isSubmitting ? "Saving..." : "Save Memory"}
          </button>
        </div>
      </form>
    </div>
  )
}

