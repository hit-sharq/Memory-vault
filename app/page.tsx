import Link from "next/link"
import { auth } from "@/auth"
import styles from "./page.module.css"

export default async function Home() {
  const session = await auth()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span>Memory Vault</span>
          </div>
          <nav className={styles.nav}>
            {session ? (
              <Link href="/dashboard" className={styles.primaryButton}>
                Dashboard
              </Link>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/login" className={styles.secondaryButton}>
                  Login
                </Link>
                <Link href="/register" className={styles.primaryButton}>
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Preserve Your Precious Memories</h1>
              <p className={styles.heroDescription}>
                Memory Vault helps you securely store and organize your cherished memories, photos, and important life
                moments.
              </p>
            </div>
            <div className={styles.heroButtons}>
              {session ? (
                <Link href="/dashboard" className={styles.primaryButton}>
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/register" className={styles.primaryButton}>
                    Get Started
                  </Link>
                  <Link href="/login" className={styles.secondaryButton}>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        <section id="features" className={styles.features}>
          <div className={styles.featuresContent}>
            <div className={styles.featuresHeader}>
              <h2 className={styles.featuresTitle}>Features</h2>
              <p className={styles.featuresDescription}>Everything you need to preserve your memories securely.</p>
            </div>
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>Secure Authentication</h3>
                <p className={styles.featureDescription}>
                  Login securely with email/password or Google authentication.
                </p>
              </div>
              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>Memory Storage</h3>
                <p className={styles.featureDescription}>
                  Save personal memories with titles, descriptions, and optional images.
                </p>
              </div>
              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>Cloud Integration</h3>
                <p className={styles.featureDescription}>Upload and manage images to enhance your memory storage.</p>
              </div>
            </div>
            {!session && (
              <div className={styles.ctaContainer}>
                <p className={styles.ctaText}>Ready to start preserving your memories?</p>
                <div className={styles.ctaButtons}>
                  <Link href="/register" className={styles.primaryButton}>
                    Create an Account
                  </Link>
                  <Link href="/login" className={styles.secondaryButton}>
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© {new Date().getFullYear()} Memory Vault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

