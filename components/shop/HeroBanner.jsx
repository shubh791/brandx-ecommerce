'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './HeroBanner.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const fashionObjects = [
  { id: 'cream-tee', src: '/images/hero/hero-cream-tee.png', alt: 'Cream oversized Brand X T-shirt', className: styles.creamTee, depth: 0.55, width: 1024, height: 1536 },
  { id: 'denim', src: '/images/hero/hero-denim.png', alt: 'Washed black premium denim jeans', className: styles.denim, depth: 0.75, width: 1024, height: 1536 },
  { id: 'blue-denim', src: '/images/hero/hero-blue-denim.png', alt: 'Premium indigo blue denim jeans', className: styles.blueDenim, depth: 0.85, width: 928, height: 1856 },
  { id: 'black-tee', src: '/images/hero/hero-black-tee.png', alt: 'Black oversized Brand X T-shirt', className: styles.blackTee, depth: 1.1, width: 1024, height: 1536 },
  { id: 'bag', src: '/images/hero/hero-brandx-bag.png', alt: 'Black Brand X Samalkha shopping bag', className: styles.bag, depth: 1.2, width: 1024, height: 1536 },
  { id: 'black-sneaker', src: '/images/hero/hero-black-sneaker.png', alt: 'Black Brand X streetwear runner sneaker', className: styles.blackSneaker, depth: 1.35, width: 1200, height: 800 },
  { id: 'sneakers', src: '/images/hero/hero-sneakers.png', alt: 'White and black Brand X streetwear sneakers', className: styles.sneakers, depth: 1.45, width: 1536, height: 1024 },
];

export function HeroBanner() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(() => {
    const root = heroRef.current;
    const visual = visualRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set([
        `.${styles.eyebrow}`,
        `.${styles.headlineLine}`,
        `.${styles.description}`,
        `.${styles.actions}`,
        `.${styles.trustStrip}`,
        `.${styles.fashionObject}`,
        `.${styles.chromeX}`,
        `.${styles.annotation}`,
      ], { clearProps: 'all' });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from(`.${styles.eyebrow}`, { opacity: 0, y: 14, duration: 0.55 })
      .from(`.${styles.headlineLine}`, {
        opacity: 0,
        yPercent: 110,
        rotate: 2,
        duration: 0.82,
        stagger: 0.1,
      }, '-=0.24')
      .from(`.${styles.description}`, { opacity: 0, y: 18, duration: 0.62 }, '-=0.38')
      .from(`.${styles.actions}`, { opacity: 0, y: 16, duration: 0.58 }, '-=0.4')
      .from(`.${styles.trustStrip}`, { opacity: 0, y: 12, duration: 0.5 }, '-=0.32')
      .from(`.${styles.fashionObject}`, {
        opacity: 0,
        x: (index) => [-50, 40, 75, -70, 50, -35, 95][index],
        y: (index) => [-60, 40, 55, 70, 85, 80, 90][index],
        scale: 0.75,
        duration: 1.05,
        stagger: 0.07,
      }, 0.2)
      .from(`.${styles.chromeX}`, {
        opacity: 0,
        scale: 0.62,
        rotate: -24,
        duration: 1.15,
        ease: 'expo.out',
      }, 0.32)
      .from(`.${styles.annotation}`, { opacity: 0, duration: 0.45, stagger: 0.08 }, '-=0.36');

    gsap.to(`.${styles.blackTee} .${styles.objectPlane}`, {
      y: -8, rotateZ: -1.2, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.creamTee} .${styles.objectPlane}`, {
      y: 7, rotateZ: 1, duration: 4.6, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.denim} .${styles.objectPlane}`, {
      y: 6, rotateZ: -0.8, duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.blueDenim} .${styles.objectPlane}`, {
      y: -5, rotateZ: 1.0, duration: 4.0, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.bag} .${styles.objectPlane}`, {
      y: -6, rotateZ: 1.4, duration: 3.3, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.blackSneaker} .${styles.objectPlane}`, {
      y: -6, rotateZ: -1.0, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.sneakers} .${styles.objectPlane}`, {
      y: -7, rotateZ: -0.8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(`.${styles.chromeX}`, {
      rotationY: '+=8', rotationX: '-=4', duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    const desktop = gsap.matchMedia();
    desktop.add('(min-width: 1024px) and (pointer: fine)', () => {
      const objects = gsap.utils.toArray(`.${styles.parallaxLayer}`);
      const moveTo = objects.map((object) => ({
        x: gsap.quickTo(object, 'x', { duration: 0.65, ease: 'power3.out' }),
        y: gsap.quickTo(object, 'y', { duration: 0.65, ease: 'power3.out' }),
        rotationY: gsap.quickTo(object, 'rotationY', { duration: 0.8, ease: 'power3.out' }),
        rotationX: gsap.quickTo(object, 'rotationX', { duration: 0.8, ease: 'power3.out' }),
      }));

      const handlePointerMove = (event) => {
        const bounds = visual.getBoundingClientRect();
        const normalX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const normalY = (event.clientY - bounds.top) / bounds.height - 0.5;
        objects.forEach((object, index) => {
          const depth = Number(object.dataset.depth || 0.5);
          moveTo[index].x(normalX * 16 * depth);
          moveTo[index].y(normalY * 12 * depth);
          moveTo[index].rotationY(normalX * 2.2 * depth);
          moveTo[index].rotationX(normalY * -1.6 * depth);
        });
      };

      const resetPointer = () => {
        moveTo.forEach((move) => {
          move.x(0);
          move.y(0);
          move.rotationY(0);
          move.rotationX(0);
        });
      };

      visual.addEventListener('pointermove', handlePointerMove);
      visual.addEventListener('pointerleave', resetPointer);
      return () => {
        visual.removeEventListener('pointermove', handlePointerMove);
        visual.removeEventListener('pointerleave', resetPointer);
      };
    });

    gsap.to(visual, {
      yPercent: 6,
      scale: 0.98,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });

    return () => desktop.revert();
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="brandx-hero-title">
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}><span aria-hidden="true" />BRAND X / SAMALKHA</div>

          <h1 id="brandx-hero-title" className={styles.headline}>
            <span className={styles.lineMask}><span className={styles.headlineLine}>STYLE THAT</span></span>
            <span className={styles.lineMask}><span className={styles.headlineLine}>DOESN&apos;T</span></span>
            <span className={styles.lineMask}><span className={styles.headlineLine}>BLEND IN.</span></span>
          </h1>

          <p className={styles.description}>
            Everyday essentials to statement fits. Discover the latest from Brand X.
          </p>

          <div className={styles.actions}>
            <Link href="/category/all" className={styles.primaryCta}>
              SHOP NEW ARRIVALS <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/category/all" className={styles.secondaryCta}>
              EXPLORE COLLECTION <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <p className={styles.trustStrip}>
            <span>MEN&apos;S FASHION</span><i>/</i><span>EASY SHOPPING</span><i>/</i><span>SAMALKHA</span>
          </p>
        </div>

        <div ref={visualRef} className={styles.visual} aria-label="BRAND X floating fashion collection">
          <div className={styles.faintWordmark} aria-hidden="true">BRANDX</div>
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.accentDisc} aria-hidden="true" />

          {/* Background Particles Layer */}
          <div
            className={[styles.particleLayer, styles.backgroundParticles, styles.parallaxLayer].join(' ')}
            data-depth="0.18"
            aria-hidden="true"
          >
            <i className={[styles.particle, styles.sphere].join(' ')} style={{ '--x': '28%', '--y': '32%', '--size': '5px', '--delay': '-2s' }} />
            <i className={[styles.particle, styles.chromeSphere].join(' ')} style={{ '--x': '48%', '--y': '22%', '--size': '6px', '--delay': '-5s' }} />
            <i className={[styles.particle, styles.tinyCube].join(' ')} style={{ '--x': '64%', '--y': '36%', '--size': '6px', '--delay': '-1s' }} />
            <i className={[styles.particle, styles.sphere].join(' ')} style={{ '--x': '54%', '--y': '58%', '--size': '4px', '--delay': '-4s' }} />
            <i className={[styles.particle, styles.yellowSphere].join(' ')} style={{ '--x': '74%', '--y': '52%', '--size': '6px', '--delay': '-3s' }} />
          </div>

          {/* Chrome Metal X (Anchor ~65-70% Visible) */}
          <div className={`${styles.chromeX} ${styles.parallaxLayer}`} data-depth="0.35" aria-hidden="true">
            <Image
              src="/images/hero/hero-metal-x.png"
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 600px) 44vw, 25vw"
            />
          </div>

          {/* Midground Particles */}
          <div
            className={[styles.particleLayer, styles.midgroundParticles, styles.parallaxLayer].join(' ')}
            data-depth="0.62"
            aria-hidden="true"
          >
            <i className={[styles.particle, styles.blackTriangle].join(' ')} style={{ '--x': '36%', '--y': '44%', '--size': '9px', '--delay': '-4s' }} />
            <i className={[styles.particle, styles.chromeSphere].join(' ')} style={{ '--x': '70%', '--y': '40%', '--size': '8px', '--delay': '-1s' }} />
            <i className={[styles.particle, styles.yellowSphere].join(' ')} style={{ '--x': '44%', '--y': '72%', '--size': '7px', '--delay': '-5s' }} />
            <i className={[styles.particle, styles.tinyCube].join(' ')} style={{ '--x': '58%', '--y': '48%', '--size': '8px', '--delay': '-2s' }} />
          </div>

          {/* Floating Garments & Products */}
          {fashionObjects.map((object) => (
            <div
              key={object.id}
              className={`${styles.fashionObject} ${styles.parallaxLayer} ${object.className}`}
              data-depth={object.depth}
            >
              <div className={styles.objectPlane}>
                <Image
                  src={object.src}
                  alt={object.alt}
                  width={object.width}
                  height={object.height}
                  sizes="(max-width: 600px) 42vw, (max-width: 900px) 34vw, 22vw"
                />
              </div>
            </div>
          ))}

          {/* Floating Abstract Shards */}
          <div className={[styles.abstractObject, styles.blackShard, styles.parallaxLayer].join(' ')} data-depth="0.7" aria-hidden="true" />
          <div className={[styles.abstractObject, styles.chromeFragment, styles.parallaxLayer].join(' ')} data-depth="0.48" aria-hidden="true" />
          <div className={[styles.abstractObject, styles.yellowCube, styles.parallaxLayer].join(' ')} data-depth="0.8" aria-hidden="true" />

          {/* Upper Annotations */}
          <div className={`${styles.annotation} ${styles.newDrop}`}>NEW DROP</div>
          <div className={`${styles.annotation} ${styles.brandLabel}`}>BRAND X</div>
        </div>
      </div>
    </section>
  );
}
