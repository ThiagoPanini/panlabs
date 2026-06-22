import { PlaceholderCard } from "@/components/PlaceholderCard/PlaceholderCard";
import { SolutionCard } from "@/components/SolutionCard/SolutionCard";
import { solutions } from "@/data/solutions";
import styles from "./Catalog.module.css";

export function Catalog() {
  const count = solutions.length;

  return (
    <section className={styles.catalog}>
      <p className={styles.meta}>{`// ${count} soluções no ar · preview ao vivo`}</p>
      <div className={styles.grid}>
        {solutions.map((solution) => (
          <SolutionCard key={solution.slug} solution={solution} />
        ))}
        <PlaceholderCard />
      </div>
    </section>
  );
}
