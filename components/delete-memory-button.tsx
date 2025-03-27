"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteMemory } from "@/actions/memory"
import styles from "./delete-memory-button.module.css"

interface DeleteMemoryButtonProps {
  id: string
}

export function DeleteMemoryButton({ id }: DeleteMemoryButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const result = await deleteMemory(id)

      if (result.success) {
        setIsOpen(false)
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Failed to delete memory")
      }
    } catch (error) {
      console.error("Error deleting memory:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(true)} className={styles.deleteButton} aria-label="Delete memory">
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
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
        Delete
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Are you sure?</h3>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
            <div className={styles.modalContent}>
              <p>This action cannot be undone. This will permanently delete this memory from your account.</p>
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={() => setIsOpen(false)} disabled={isDeleting}>
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

