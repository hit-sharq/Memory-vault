"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import styles from "./login.module.css"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const registered = searchParams.get("registered")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl })
    } catch (error) {
      setError("Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>Login</h1>
          <p className={styles.cardDescription}>Enter your credentials to access your account</p>
        </div>
        <div className={styles.cardContent}>
          {registered && (
            <div className={styles.success}>
              <p>Registration successful! Please login with your credentials.</p>
            </div>
          )}

          {error && (
            <div className={styles.alert}>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.labelWithLink}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <Link href="/forgot-password" className={styles.link}>
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>Or continue with</span>
          </div>

          <button className={styles.googleButton} onClick={handleGoogleSignIn} disabled={isLoading}>
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
              className={styles.googleIcon}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            Google
          </button>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

