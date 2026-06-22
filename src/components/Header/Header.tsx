import Image from "next/image";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/assets/logo.png"
        alt="panlabs"
        width={30}
        height={30}
        className={styles.logo}
        priority
      />
      <span className={styles.wordmark}>panlabs</span>
      <span className={styles.meta}>/ catálogo</span>
      <span className={styles.spacer} />
      <span className={styles.tagline}>
        build <span className={styles.astBlue}>*</span> automate{" "}
        <span className={styles.astViolet}>*</span> innovate
      </span>
    </header>
  );
}
