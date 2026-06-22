import Image from "next/image";
import type { Solution } from "@/data/solutions";
import { sparkline } from "@/lib/sparkline";
import styles from "./SolutionCard.module.css";

const ICON_TINT = "c5cdd9";

export function SolutionCard({ solution }: { solution: Solution }) {
  const { slug, name, tagline, url, status, tech, stats, weeks, shot, shotBg } = solution;
  const { line, area } = sparkline(weeks);
  const gradientId = `plspark-${slug}`;

  return (
    <article className={styles.card}>
      <div className={styles.preview} style={{ background: shotBg }}>
        <Image
          src={shot}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 340px"
          className={styles.shot}
        />
        <span className={styles.overlay} aria-hidden="true" />
        <span className={`${styles.status} ${styles[status]}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span className={styles.statusLabel}>{status}</span>
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.tagline}>{tagline}</p>

        <ul className={styles.tech}>
          {tech.map((t) => (
            <li key={t.slug} className={styles.chip}>
              {/* biome-ignore lint/performance/noImgElement: external Simple Icons CDN; self-hosted in V1.1 (#15) */}
              <img
                src={`https://cdn.simpleicons.org/${t.slug}/${ICON_TINT}`}
                alt=""
                width={12}
                height={12}
                className={styles.chipIcon}
              />
              {t.label}
            </li>
          ))}
        </ul>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <span className={styles.statValue}>
              <span className={styles.star} aria-hidden="true">
                ★
              </span>
              {stats.stars}
            </span>
            <span className={styles.statLabel}>stars</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.statValue}>{stats.commits}</span>
            <span className={styles.statLabel}>commits</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.statValue}>{stats.prs}</span>
            <span className={styles.statLabel}>PRs</span>
          </span>

          <svg
            className={styles.spark}
            viewBox="0 0 120 30"
            width={104}
            height={28}
            preserveAspectRatio="none"
            role="img"
            aria-label="Atividade recente do repositório"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9b6cf0" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#9b6cf0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon className={styles.sparkArea} points={area} fill={`url(#${gradientId})`} />
            <polyline className={styles.sparkLine} points={line} />
          </svg>
        </div>

        <a className={styles.cta} href={url} target="_blank" rel="noopener noreferrer">
          $ touch {slug} →
        </a>
      </div>
    </article>
  );
}
