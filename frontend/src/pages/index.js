// app/page.tsx
import styles from "../styles/Home.module.css";
import Image from "next/image"; // Next.js optimized image component

export default function Home() {
  return (
    <>
      <div className={styles.backgroundWrapper}>
        <Image
          src="/images/background.png"
          alt="Social media background"
          fill
          priority
          quality={80}
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.connectlyGlow}>
            <h1 className={styles.connectlyText}>Connectly</h1>
          </div>

          <h1 className={styles.title}>Connect. Share. Belong.</h1>
          <p className={styles.subtitle}>
            A modern social platform built for real connections. Join thousands
            who are already sharing their stories.
          </p>

          <div className={styles.actions}>
            <a href="/register" className={styles.primaryBtn}>
              Get Started Free
            </a>
            <a href="/login" className={styles.secondaryBtn}>
              Sign In
            </a>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Real-time Interaction</h3>
            <p>
              Like, comment, and connect instantly with friends and communities.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Secure & Private</h3>
            <p>Your data stays protected with enterprise-grade security.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Built for Scale</h3>
            <p>Experience seamless performance as our community grows.</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            @Roshan Shrestha
          </p>
        </footer>
      </main>
    </>
  );
}
