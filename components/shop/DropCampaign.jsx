import Link from 'next/link';
import styles from './DropCampaign.module.css';

export function DropCampaign() {
  return (
    <section className={styles.campaign} aria-labelledby="drop-campaign-heading">
      <div className={styles.media} aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=2000&q=90"
          alt=""
          loading="lazy"
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <span className={styles.giantX} aria-hidden="true">X</span>

      <div className={styles.content}>
        <span className={styles.label}>NEW DROP</span>
        <h2 id="drop-campaign-heading">
          THE NEW DROP
          <span>BUILT TO STAND OUT.</span>
        </h2>
        <p>Fresh silhouettes for the days when blending in is not an option.</p>
        <Link href="/category/all" className={styles.cta}>
          EXPLORE THE DROP <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className={styles.signature} aria-hidden="true">
        <span>BRAND X</span>
        <i />
        <span>SAMALKHA</span>
      </div>
    </section>
  );
}
