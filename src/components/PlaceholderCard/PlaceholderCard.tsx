import styles from "./PlaceholderCard.module.css";

/**
 * Anonymous "// TODO" slot — a derived, inert variant of the solution card
 * (no link, stats, CTA, or motion). Hints at the next experiment on the way.
 */
export function PlaceholderCard() {
  return (
    <article className={styles.card} aria-label="Próximo experimento a caminho">
      <div className={styles.preview}>
        <span className={styles.todo}>{"// TODO"}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.copy}>mais um experimento a caminho</p>
      </div>
    </article>
  );
}
