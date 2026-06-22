import styles from "./HeroTerminal.module.css";

export function HeroTerminal() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.prompt}>
          <span className={styles.user}>panini@panlabs</span>
          <span className={styles.colon}>:</span>
          <span className={styles.tilde}>~</span>
          <span className={styles.dollar}>$</span>
          <span className={styles.space} />
          <span className={styles.command}>ls ./panlabs</span>
        </div>
        <h1 className={styles.title}>
          ls <span className={styles.gradient}>./panlabs</span>
          <span className={styles.cursor} aria-hidden="true" />
        </h1>
        <p className={styles.lede}>
          Laboratório vivo de soluções de softwares criadas com AI. Experimentos que viraram SaaS
          reais atualmente listados, versionados e disponíveis em produção.
        </p>
      </div>
    </section>
  );
}
