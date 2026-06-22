import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <span className={styles.wordmark}>panlabs</span>
        <span className={styles.meta}>/ catálogo</span>
      </header>
      <main className={styles.main} />
    </>
  );
}
