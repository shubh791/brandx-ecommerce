import fs from 'fs';

const heroBannerJsx = `'use client';

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
  { id: 'blue-denim', src: '/images/hero/hero-blue-denim.png', alt: 'Premium indigo blue denim jeans', className: styles.blueDenim, depth: 0.75, width: 928, height: 1856 },
  { id: 'black-tee', src: '/images/hero/hero-black-tee.png', alt: 'Black oversized Brand X T-shirt', className: styles.blackTee, depth: 1.1, width: 1024, height: 1536 },
  { id: 'bag', src: '/images/hero/hero-brandx-bag.png', alt: 'Black Brand X Samalkha shopping bag', className: styles.bag, depth: 1.2, width: 1024, height: 1536 },
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
        \`.\${styles.eyebrow}\`,
        \`.\${styles.headlineLine}\`,
        \`.\${styles.description}\`,
        \`.\${styles.actions}\`,
        \`.\${styles.trustStrip}\`,
        \`.\${styles.fashionObject}\`,
        \`.\${styles.chromeX}\`,
        \`.\${styles.annotation}\`,
        \`.\${styles.visualCaption}\`,
      ], { clearProps: 'all' });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from(\`.\${styles.eyebrow}\`, { opacity: 0, y: 14, duration: 0.55 })
      .from(\`.\${styles.headlineLine}\`, {
        opacity: 0,
        yPercent: 110,
        rotate: 2,
        duration: 0.82,
        stagger: 0.1,
      }, '-=0.24')
      .from(\`.\${styles.description}\`, { opacity: 0, y: 18, duration: 0.62 }, '-=0.38')
      .from(\`.\${styles.actions}\`, { opacity: 0, y: 16, duration: 0.58 }, '-=0.4')
      .from(\`.\${styles.trustStrip}\`, { opacity: 0, y: 12, duration: 0.5 }, '-=0.32')
      .from(\`.\${styles.fashionObject}\`, {
        opacity: 0,
        x: (index) => [-50, 80, -70, 50, 95][index],
        y: (index) => [-60, 55, 70, 85, 90][index],
        scale: 0.75,
        duration: 1.05,
        stagger: 0.08,
      }, 0.2)
      .from(\`.\${styles.chromeX}\`, {
        opacity: 0,
        scale: 0.62,
        rotate: -24,
        duration: 1.15,
        ease: 'expo.out',
      }, 0.32)
      .from(\`.\${styles.annotation}\`, { opacity: 0, duration: 0.45, stagger: 0.08 }, '-=0.36')
      .from(\`.\${styles.visualCaption}\`, { opacity: 0, y: 10, duration: 0.5 }, '-=0.2');

    gsap.to(\`.\${styles.blackTee} .\${styles.objectPlane}\`, {
      y: -8, rotateZ: -1.2, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.creamTee} .\${styles.objectPlane}\`, {
      y: 7, rotateZ: 1, duration: 4.6, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.blueDenim} .\${styles.objectPlane}\`, {
      y: -6, rotateZ: 1.2, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.bag} .\${styles.objectPlane}\`, {
      y: -6, rotateZ: 1.4, duration: 3.3, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.sneakers} .\${styles.objectPlane}\`, {
      y: -7, rotateZ: -0.8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.chromeX}\`, {
      rotationY: '+=8', rotationX: '-=4', duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    const desktop = gsap.matchMedia();
    desktop.add('(min-width: 1024px) and (pointer: fine)', () => {
      const objects = gsap.utils.toArray(\`.\${styles.parallaxLayer}\`);
      const moveTo = objects.map((object) => ({
        x: gsap.quickTo(object, 'x', { duration: 0.65, ease: 'power3.out' }),
        y: gsap.quickTo(object, 'y', { duration: 0.65, ease: 'power3.out' }),
        rotateY: gsap.quickTo(object, 'rotationY', { duration: 0.8, ease: 'power3.out' }),
        rotateX: gsap.quickTo(object, 'rotationX', { duration: 0.8, ease: 'power3.out' }),
      }));

      const handlePointerMove = (event) => {
        const bounds = visual.getBoundingClientRect();
        const normalX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const normalY = (event.clientY - bounds.top) / bounds.height - 0.5;
        objects.forEach((object, index) => {
          const depth = Number(object.dataset.depth || 0.5);
          moveTo[index].x(normalX * 16 * depth);
          moveTo[index].y(normalY * 12 * depth);
          moveTo[index].rotateY(normalX * 2.2 * depth);
          moveTo[index].rotateX(normalY * -1.6 * depth);
        });
      };

      const resetPointer = () => {
        moveTo.forEach((move) => {
          move.x(0);
          move.y(0);
          move.rotateY(0);
          move.rotateX(0);
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
          <div className={\`\${styles.chromeX} \${styles.parallaxLayer}\`} data-depth="0.35" aria-hidden="true">
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
              className={\`\${styles.fashionObject} \${styles.parallaxLayer} \${object.className}\`}
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
          <div className={\`\${styles.annotation} \${styles.newDrop}\`}>NEW DROP</div>
          <div className={\`\${styles.annotation} \${styles.brandLabel}\`}>BRAND X</div>

          {/* Editorial Caption Directly Under Artwork */}
          <div className={styles.visualCaption}>
            <span className={styles.seasonCaption}>NEW SEASON</span>
            <span className={styles.captionDot} aria-hidden="true">•</span>
            <span className={styles.counterCaption}>01 / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

const cssContent = `.hero {
  --hero-ink: #09090b;
  --hero-muted: #65656d;
  --hero-canvas: #f4f2ed;
  --hero-line: rgba(9, 9, 11, 0.14);
  --hero-accent: #f2cf45;
  position: relative;
  isolation: isolate;
  min-height: calc(100svh - 5rem);
  overflow: hidden;
  border-bottom: 1px solid var(--hero-line);
  background:
    radial-gradient(circle at 79% 40%, rgba(255,255,255,.94) 0, rgba(255,255,255,.4) 26%, transparent 52%),
    var(--hero-canvas);
  color: var(--hero-ink);
}

.gridBackdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: .38;
  background-image:
    linear-gradient(to right, rgba(9,9,11,.055) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(9,9,11,.055) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to right, #000, rgba(0,0,0,.62) 56%, transparent 94%);
}

.shell {
  width: min(100%, 82rem);
  min-height: calc(100svh - 5rem);
  margin-inline: auto;
  padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 2.5vw, 2.5rem);
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.14fr);
  align-items: center;
  gap: clamp(1.2rem, 3vw, 2.8rem);
}

.copy {
  position: relative;
  z-index: 20;
  min-width: 0;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-bottom: clamp(1.3rem, 3vh, 2.15rem);
  font-family: var(--font-geist-mono), monospace;
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .2em;
}

.eyebrow span {
  width: 2.5rem;
  height: 1px;
  background: currentColor;
}

.headline {
  width: min-content;
  font-size: clamp(3.65rem, 6.25vw, 6.15rem);
  font-weight: 900;
  letter-spacing: -.073em;
  line-height: .82;
}

.lineMask {
  display: block;
  overflow: hidden;
  padding: .06em .06em .1em 0;
}

.headlineLine {
  display: block;
  white-space: nowrap;
  transform-origin: left center;
}

.lineMask:nth-child(2) .headlineLine {
  color: transparent;
  -webkit-text-stroke: 1.6px var(--hero-ink);
}

.description {
  max-width: 31rem;
  margin-top: clamp(1.5rem, 3.5vh, 2.4rem);
  color: var(--hero-muted);
  font-size: clamp(.98rem, 1.3vw, 1.1rem);
  line-height: 1.65;
}

.actions {
  display: flex;
  align-items: center;
  gap: .85rem;
  margin-top: 1.75rem;
}

.primaryCta,
.secondaryCta {
  min-height: 3.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .75rem;
  padding: .9rem 1.15rem;
  border: 1px solid var(--hero-ink);
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .065em;
  transition: transform .28s cubic-bezier(.22,1,.36,1), background-color .2s ease, color .2s ease;
}

.primaryCta {
  background: var(--hero-ink);
  color: white;
}

.secondaryCta {
  background: rgba(255,255,255,.5);
  color: var(--hero-ink);
}

.primaryCta svg,
.secondaryCta svg {
  width: .95rem;
  height: .95rem;
  transition: transform .28s cubic-bezier(.22,1,.36,1);
}

.primaryCta:hover,
.secondaryCta:hover {
  transform: translateY(-2px);
}

.primaryCta:hover svg {
  transform: translate(.16rem, -.16rem);
}

.secondaryCta:hover {
  background: white;
}

.secondaryCta:hover svg {
  transform: translateX(.2rem);
}

.primaryCta:focus-visible,
.secondaryCta:focus-visible {
  outline: 2px solid var(--hero-ink);
  outline-offset: 4px;
}

.trustStrip {
  display: flex;
  flex-wrap: wrap;
  gap: .62rem;
  margin-top: clamp(1.8rem, 4vh, 3rem);
  color: #55555d;
  font-family: var(--font-geist-mono), monospace;
  font-size: .59rem;
  font-weight: 700;
  letter-spacing: .12em;
}

.trustStrip i {
  color: #a1a1aa;
  font-style: normal;
}

/* =========================================================
   FREE-FLOATING 3D HERO VISUAL ARTBOARD (NO CARD / NO BOX)
   ========================================================= */
.visual {
  position: relative;
  z-index: 10;
  width: 100%;
  height: min(690px, calc(100svh - 6.5rem));
  min-height: 560px;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
  perspective: 1400px;
  transform-style: preserve-3d;
  user-select: none;
}

.faintWordmark {
  position: absolute;
  top: 48%;
  left: 48%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(-7deg);
  color: rgba(9,9,11,.045);
  font-size: clamp(5rem, 10.5vw, 9.5rem);
  font-weight: 900;
  letter-spacing: -.085em;
  white-space: nowrap;
  pointer-events: none;
}

.orbit {
  position: absolute;
  top: 14%;
  left: 10%;
  z-index: 0;
  width: 76%;
  aspect-ratio: 1;
  border: 1px solid rgba(9,9,11,.12);
  border-radius: 50%;
  transform: rotateX(66deg) rotateZ(-14deg);
  pointer-events: none;
}

.orbit::after {
  content: '';
  position: absolute;
  inset: 8%;
  border: 1px dashed rgba(9,9,11,.08);
  border-radius: inherit;
}

/* Yellow Accent Arch in Background */
.accentDisc {
  position: absolute;
  top: 14%;
  right: 12%;
  z-index: 1;
  width: clamp(4.2rem, 6.5vw, 5.8rem);
  height: clamp(7rem, 10vw, 9.5rem);
  border-radius: 9999px 9999px 0 0;
  background: var(--hero-accent);
  box-shadow: 0 20px 42px rgba(242,207,69,.22);
  transform: translateZ(-30px);
  pointer-events: none;
}

/* Chrome Metal X (Luminous Central Anchor ~65-70% Visible) */
.chromeX {
  position: absolute;
  top: 22%;
  left: 23%;
  z-index: 2;
  width: 50%;
  transform-style: preserve-3d;
  filter: drop-shadow(0 26px 22px rgba(0,0,0,.15));
  will-change: transform;
  pointer-events: none;
}

.chromeX img {
  display: block;
  width: 100%;
  height: auto;
}

.fashionObject {
  position: absolute;
  z-index: 3;
  transform-style: preserve-3d;
  pointer-events: none;
  will-change: transform;
}

.objectPlane {
  transform-style: preserve-3d;
  will-change: transform;
}

.fashionObject img {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 22px 20px rgba(0,0,0,.14));
}

/* 1. Cream Tee (Upper-middle / right behind black tee) */
.creamTee {
  top: 0%;
  left: 36%;
  z-index: 3;
  width: 39%;
}

.creamTee .objectPlane {
  transform: translate3d(0,0,55px) rotateY(-5deg) rotateZ(5deg);
}

/* 2. Black Tee (Upper-left of the right visual zone) */
.blackTee {
  top: 3%;
  left: 3%;
  z-index: 5;
  width: 44%;
}

.blackTee .objectPlane {
  transform: translate3d(0,0,140px) rotateY(6deg) rotateZ(-7deg);
}

/* 3. NEW Blue Denim Jeans (Right-middle vertical accent) */
.blueDenim {
  top: 8%;
  right: 0%;
  z-index: 4;
  width: 34%;
}

.blueDenim .objectPlane {
  transform: translate3d(0,0,85px) rotateY(-8deg) rotateZ(8deg);
}

.blueDenim img {
  filter: drop-shadow(0 24px 22px rgba(16,36,75,.22));
}

/* 4. Luxury Brand X Shopping Bag (Lower-left) */
.bag {
  bottom: 8%;
  left: 3%;
  z-index: 6;
  width: 26%;
}

.bag .objectPlane {
  transform: translate3d(0,0,185px) rotateY(8deg) rotateZ(-5deg);
}

/* 5. Sneakers (Lower-center/right foreground) */
.sneakers {
  right: 6%;
  bottom: 5%;
  z-index: 7;
  width: 43%;
}

.sneakers .objectPlane {
  transform: translate3d(0,0,225px) rotateX(3deg) rotateY(-5deg) rotateZ(-6deg);
}

.sneakers img {
  filter: drop-shadow(0 26px 22px rgba(0,0,0,.22));
}

/* =========================================================
   CONTAINED ORGANIC PARTICLES (SURROUNDING OBJECTS, NOT OVERFLOWING)
   ========================================================= */
.particleLayer {
  position: absolute;
  inset: 2% 2%;
  transform-style: preserve-3d;
  pointer-events: none;
  will-change: transform;
}

.backgroundParticles { z-index: 1; opacity: .55; }
.midgroundParticles { z-index: 4; }

.particle {
  --size: 6px;
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: var(--size);
  height: var(--size);
  display: block;
  animation: particleDrift 7.5s var(--delay, 0s) ease-in-out infinite alternate;
  will-change: transform;
}

.sphere { border-radius: 50%; background: #171719; }

.chromeSphere {
  border: 1px solid rgba(9,9,11,.16);
  border-radius: 50%;
  background: radial-gradient(circle at 32% 26%, #fff 0 11%, #d4d4d8 28%, #52525b 62%, #111113 100%);
}

.yellowSphere { border-radius: 50%; background: var(--hero-accent); }

.tinyCube {
  background: linear-gradient(135deg, #55555c 0 20%, #111113 22% 70%, #8b8b92 72%);
  transform: rotate(24deg);
}

.blackTriangle {
  background: linear-gradient(135deg, #52525b, #09090b 68%);
  clip-path: polygon(50% 0, 100% 100%, 0 76%);
}

.abstractObject {
  position: absolute;
  z-index: 4;
  transform-style: preserve-3d;
  pointer-events: none;
  will-change: transform;
}

.abstractObject::before {
  content: '';
  position: absolute;
  inset: 0;
  animation: objectDrift 8s ease-in-out infinite alternate;
}

.blackShard { top: 29%; left: 24%; width: 2.6rem; height: 1.1rem; }
.blackShard::before {
  background: linear-gradient(145deg, #46464b 0, #09090b 55%, #242428 100%);
  clip-path: polygon(0 35%, 78% 0, 100% 62%, 28% 100%);
  transform: rotate(-22deg) skewX(-8deg);
}

.chromeFragment { top: 25%; right: 26%; width: 2rem; height: 2.5rem; }
.chromeFragment::before {
  background: linear-gradient(125deg, #fafafa 0, #77777e 22%, #f4f4f5 48%, #28282c 76%, #b7b7bd 100%);
  clip-path: polygon(18% 0, 100% 28%, 66% 100%, 0 70%);
  filter: drop-shadow(0 7px 7px rgba(0,0,0,.13));
  transform: rotate(18deg);
}

.yellowCube { right: 20%; bottom: 25%; width: 1.15rem; height: 1.15rem; }
.yellowCube::before {
  border: 1px solid rgba(9,9,11,.16);
  background: linear-gradient(135deg, #ffe36a 0 48%, #d1ad1f 50% 100%);
  box-shadow: 4px 4px 0 #a98916;
  transform: rotate(23deg) skew(-4deg, -4deg);
}

@keyframes particleDrift {
  from { transform: translate3d(-2px, 2px, 0) rotate(-7deg); }
  to { transform: translate3d(3px, -4px, 0) rotate(12deg); }
}

@keyframes objectDrift {
  from { translate: 0 2px; }
  to { translate: 2px -3px; }
}

/* =========================================================
   EDITORIAL LABELS & CAPTION DIRECTLY UNDER ARTWORK
   ========================================================= */
.annotation {
  position: absolute;
  z-index: 10;
  font-family: var(--font-geist-mono), monospace;
  font-size: .58rem;
  font-weight: 800;
  letter-spacing: .17em;
  white-space: nowrap;
  pointer-events: none;
}

.newDrop {
  top: 6%;
  left: 2%;
  padding: .35rem .55rem;
  background: var(--hero-accent);
  color: #000;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}

.brandLabel {
  top: 8%;
  right: 12%;
  color: #000;
  background: transparent;
  border: none;
  box-shadow: none;
}

.brandLabel::before {
  content: '';
  display: inline-block;
  width: 1.35rem;
  height: 1px;
  margin-right: .55rem;
  vertical-align: middle;
  background: currentColor;
}

/* Editorial Caption directly under fashion composition */
.visualCaption {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  display: flex;
  align-items: center;
  gap: .85rem;
  font-family: var(--font-geist-mono), monospace;
  white-space: nowrap;
  pointer-events: none;
}

.seasonCaption {
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .22em;
  color: #27272a;
}

.captionDot {
  color: #a1a1aa;
  font-size: .65rem;
}

.counterCaption {
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .14em;
  color: #71717a;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS
   ========================================================= */
@media (max-width: 1100px) {
  .headline {
    font-size: clamp(3.5rem, 6.1vw, 5.2rem);
  }

  .visual {
    min-height: 520px;
  }

  .actions {
    align-items: stretch;
    flex-direction: column;
    max-width: 19rem;
  }
}

@media (max-width: 900px) {
  .hero,
  .shell {
    min-height: auto;
  }

  .shell {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 4rem;
    padding-bottom: 2.5rem;
  }

  .copy {
    width: min(100%, 42rem);
  }

  .headline {
    font-size: clamp(4rem, 10vw, 6rem);
  }

  .actions {
    flex-direction: row;
    max-width: none;
  }

  .visual {
    width: min(100%, 38rem);
    height: 580px;
    min-height: 0;
    margin-inline: auto;
  }

  .blueDenim {
    width: 32%;
    right: 2%;
  }

  .backgroundParticles .particle:nth-child(n+4),
  .midgroundParticles .particle:nth-child(n+3) {
    display: none;
  }
}

@media (max-width: 600px) {
  .shell {
    gap: 1.25rem;
    padding-top: 2.5rem;
    padding-bottom: 1.5rem;
  }

  .eyebrow {
    margin-bottom: 1.15rem;
  }

  .headline {
    font-size: clamp(3.1rem, 14.4vw, 4.7rem);
    line-height: .84;
  }

  .description {
    max-width: 22rem;
    margin-top: 1.3rem;
    font-size: .94rem;
  }

  .actions {
    align-items: stretch;
    flex-direction: column;
    margin-top: 1.35rem;
  }

  .primaryCta,
  .secondaryCta {
    width: 100%;
  }

  .trustStrip {
    gap: .4rem;
    margin-top: 1.5rem;
    font-size: .52rem;
    letter-spacing: .085em;
  }

  .visual {
    width: 100%;
    height: 450px;
  }

  .faintWordmark {
    top: 47%;
    font-size: 5rem;
  }

  .orbit {
    top: 16%;
    left: 14%;
    width: 72%;
  }

  .accentDisc {
    top: 20%;
    right: 8%;
    width: 3.6rem;
  }

  .chromeX {
    top: 32%;
    left: 28%;
    width: 44%;
  }

  .creamTee {
    display: none;
  }

  .blackTee {
    top: 6%;
    left: -1%;
    width: 44%;
  }

  .blueDenim {
    top: 10%;
    right: 0%;
    width: 34%;
  }

  .bag {
    display: none;
  }

  .sneakers {
    right: 8%;
    bottom: 6%;
    width: 44%;
  }

  .newDrop {
    top: 6%;
    left: 2%;
  }

  .brandLabel {
    top: 7%;
    right: 4%;
  }

  .visualCaption {
    bottom: 0%;
  }

  .backgroundParticles,
  .midgroundParticles,
  .chromeFragment,
  .blackShard,
  .yellowCube {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primaryCta,
  .secondaryCta,
  .primaryCta svg,
  .secondaryCta svg {
    transition-duration: .01ms;
  }

  .headlineLine,
  .fashionObject,
  .objectPlane,
  .chromeX,
  .particle,
  .abstractObject::before,
  .annotation,
  .visualCaption,
  .eyebrow,
  .description,
  .actions,
  .trustStrip {
    animation: none !important;
    transform-style: flat;
  }
}
`;

fs.writeFileSync('components/shop/HeroBanner.jsx', heroBannerJsx, 'utf-8');
fs.writeFileSync('components/shop/HeroBanner.module.css', cssContent, 'utf-8');
console.log('HeroBanner.jsx and HeroBanner.module.css successfully updated!');
