'use client';

import Link from 'next/link';
import styles from './CategoryTiles.module.css';

const categoryTiles = [
  {
    id: 'oversized-tees',
    title: 'Oversized Tees',
    href: '/category/oversized-tees',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=88',
    position: 'center',
    layout: styles.featured,
  },
  {
    id: 'hoodies',
    title: 'Heavyweight Hoodies',
    href: '/category/hoodies',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=88',
    position: 'center 42%',
    layout: styles.wide,
  },
  {
    id: 'cargos-denim',
    title: 'Cargo & Denim',
    href: '/category/cargos-denim',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=88',
    position: 'center 35%',
    layout: styles.compact,
  },
  {
    id: 'tracksuits',
    title: 'Tracksuits & Sets',
    href: '/category/tracksuits',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=88',
    position: 'center 28%',
    layout: styles.compact,
  },
  {
    id: 'jackets',
    title: 'Jackets & Outerwear',
    href: '/category/jackets',
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=1200&q=88',
    position: 'center 38%',
    layout: styles.wide,
  },
];

export function CategoryTiles() {
  return (
    <section className={styles.section} aria-labelledby="category-heading">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <span className={styles.kicker}>BRAND X / COLLECTIONS</span>
            <h2 id="category-heading">SHOP BY CATEGORY</h2>
          </div>

          <p className={styles.intro}>
            Built for every version of your wardrobe. Find the silhouettes that feel most like you.
          </p>
        </header>

        <div className={styles.grid}>
          {categoryTiles.map((tile, index) => (
            <Link
              key={tile.id}
              href={tile.href}
              className={`${styles.tile} ${tile.layout}`}
              aria-label={`Explore ${tile.title}`}
            >
              <div className={styles.media}>
                <img
                  src={tile.image}
                  alt=""
                  className={styles.image}
                  style={{ objectPosition: tile.position }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>

              <div className={styles.caption}>
                <h3>{tile.title}</h3>
                <span className={styles.explore}>
                  EXPLORE <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footerLine} aria-hidden="true">
          <span>BRAND X</span>
          <i />
          <span>SAMALKHA</span>
        </div>
      </div>
    </section>
  );
}
