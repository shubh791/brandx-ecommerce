import fs from 'fs';

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
  padding: clamp(2rem, 4.5vw, 4.5rem) clamp(1rem, 2.5vw, 2.5rem);
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
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
   FREE-FLOATING 3D HERO VISUAL CANVAS (NO BOX / NO CARD)
   ========================================================= */
.visual {
  position: relative;
  z-index: 10;
  width: 100%;
  height: min(720px, calc(100svh - 6rem));
  min-height: 590px;
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
  top: 50%;
  left: 48%;
  z-index: 0;
  transform: translate(-50%, -50%) rotate(-7deg);
  color: rgba(9,9,11,.045);
  font-size: clamp(5rem, 11vw, 10rem);
  font-weight: 900;
  letter-spacing: -.085em;
  white-space: nowrap;
  pointer-events: none;
}

.orbit {
  position: absolute;
  top: 15%;
  left: 10%;
  z-index: 0;
  width: 78%;
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

/* Yellow Accent Rounded Arch in Background */
.accentDisc {
  position: absolute;
  top: 14%;
  right: 10%;
  z-index: 1;
  width: clamp(4.5rem, 7vw, 6.5rem);
  height: clamp(7.5rem, 11vw, 10.5rem);
  border-radius: 9999px 9999px 0 0;
  background: var(--hero-accent);
  box-shadow: 0 24px 48px rgba(242,207,69,.25);
  transform: translateZ(-30px);
  pointer-events: none;
}

/* Chrome Metal X (Anchor ~70% Exposed) */
.chromeX {
  position: absolute;
  top: 24%;
  left: 23%;
  z-index: 2;
  width: 52%;
  transform-style: preserve-3d;
  filter: drop-shadow(0 28px 24px rgba(0,0,0,.15));
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
  filter: drop-shadow(0 24px 22px rgba(0,0,0,.14));
}

/* 1. Cream Tee (Upper-middle / right behind black tee) */
.creamTee {
  top: -4%;
  left: 38%;
  z-index: 3;
  width: 41%;
}

.creamTee .objectPlane {
  transform: translate3d(0,0,60px) rotateY(-5deg) rotateZ(6deg);
}

/* 2. Black Tee (Upper-left of the right visual zone) */
.blackTee {
  top: 2%;
  left: 3%;
  z-index: 5;
  width: 45%;
}

.blackTee .objectPlane {
  transform: translate3d(0,0,145px) rotateY(6deg) rotateZ(-8deg);
}

/* 3. Washed Denim Jeans (Right Side extending naturally) */
.denim {
  top: 8%;
  right: -5%;
  z-index: 4;
  width: 36%;
}

.denim .objectPlane {
  transform: translate3d(0,0,88px) rotateY(-8deg) rotateZ(9deg);
}

/* 4. Luxury Brand X Shopping Bag (Lower-left) */
.bag {
  bottom: 0%;
  left: 2%;
  z-index: 6;
  width: 27%;
}

.bag .objectPlane {
  transform: translate3d(0,0,192px) rotateY(8deg) rotateZ(-5deg);
}

/* 5. Sneakers (Lower-center/right foreground) */
.sneakers {
  right: 5%;
  bottom: -4%;
  z-index: 7;
  width: 46%;
}

.sneakers .objectPlane {
  transform: translate3d(0,0,230px) rotateX(3deg) rotateY(-5deg) rotateZ(-6deg);
}

.sneakers img {
  filter: drop-shadow(0 28px 24px rgba(0,0,0,.22));
}

/* =========================================================
   FREE-FLOATING PARTICLES & DECORATIVE PIECES (NO RECTANGULAR INSETS)
   ========================================================= */
.particleLayer {
  position: absolute;
  inset: -6% -10%;
  transform-style: preserve-3d;
  pointer-events: none;
  will-change: transform;
  overflow: visible;
}

.backgroundParticles { z-index: 1; opacity: .55; }
.midgroundParticles { z-index: 4; }
.foregroundParticles { z-index: 8; }

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

.tinyRod {
  width: calc(var(--size) * 1.8);
  height: 2px;
  background: #151517;
  transform: rotate(-28deg);
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

.blackShard { top: 29%; left: 24%; width: 2.8rem; height: 1.15rem; }
.blackShard::before {
  background: linear-gradient(145deg, #46464b 0, #09090b 55%, #242428 100%);
  clip-path: polygon(0 35%, 78% 0, 100% 62%, 28% 100%);
  transform: rotate(-22deg) skewX(-8deg);
}

.chromeFragment { top: 25%; right: 26%; width: 2.15rem; height: 2.7rem; }
.chromeFragment::before {
  background: linear-gradient(125deg, #fafafa 0, #77777e 22%, #f4f4f5 48%, #28282c 76%, #b7b7bd 100%);
  clip-path: polygon(18% 0, 100% 28%, 66% 100%, 0 70%);
  filter: drop-shadow(0 7px 7px rgba(0,0,0,.13));
  transform: rotate(18deg);
}

.yellowCube { right: 20%; bottom: 25%; width: 1.25rem; height: 1.25rem; }
.yellowCube::before {
  border: 1px solid rgba(9,9,11,.16);
  background: linear-gradient(135deg, #ffe36a 0 48%, #d1ad1f 50% 100%);
  box-shadow: 5px 5px 0 #a98916;
  transform: rotate(23deg) skew(-4deg, -4deg);
}

.blackRibbon { top: 55%; right: 1%; width: 3.7rem; height: .52rem; }
.blackRibbon::before {
  border: 2px solid #121214;
  border-left: 0;
  border-radius: 0 70% 70% 0;
  transform: rotate(-31deg) skewX(-20deg);
}

.metalPlane { bottom: 15%; left: 26%; width: 2.8rem; height: 1.7rem; z-index: 8; }
.metalPlane::before {
  background: linear-gradient(155deg, #f4f4f5, #5f5f66 32%, #ececef 54%, #1d1d20 100%);
  clip-path: polygon(0 17%, 100% 0, 76% 100%, 15% 73%);
  filter: drop-shadow(0 8px 7px rgba(0,0,0,.16));
  transform: rotate(13deg);
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
   EDITORIAL LABELS & ANNOTATIONS DIRECTLY ON CANVAS
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
  padding: .4rem .6rem;
  background: var(--hero-accent);
  color: #000;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}

.brandLabel {
  top: 8%;
  right: 14%;
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

.locationLabel {
  right: -2rem;
  top: 50%;
  transform: rotate(90deg);
  color: #71717a;
  letter-spacing: .24em;
  background: transparent;
}

.seasonLabel {
  left: 42%;
  bottom: 2%;
  color: #52525b;
  letter-spacing: .22em;
  background: transparent;
}

.counterLabel {
  right: 6%;
  bottom: 1%;
  color: #71717a;
  letter-spacing: .18em;
  background: transparent;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS
   ========================================================= */
@media (max-width: 1100px) {
  .headline {
    font-size: clamp(3.5rem, 6.1vw, 5.2rem);
  }

  .visual {
    min-height: 550px;
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
    width: min(100%, 42rem);
    height: 620px;
    min-height: 0;
    margin-inline: auto;
  }

  .denim {
    width: 33%;
    right: -3%;
  }

  .backgroundParticles .particle:nth-child(n+6),
  .midgroundParticles .particle:nth-child(n+5),
  .blackRibbon {
    display: none;
  }
}

@media (max-width: 600px) {
  .shell {
    gap: 1rem;
    padding-top: 3rem;
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
    height: 470px;
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
    top: 34%;
    left: 29%;
    width: 44%;
  }

  .creamTee {
    display: none;
  }

  .blackTee {
    top: 10%;
    left: -2%;
    width: 43%;
  }

  .denim {
    top: 13%;
    right: -4%;
    width: 35%;
  }

  .bag {
    display: none;
  }

  .sneakers {
    right: 9%;
    bottom: 0;
    width: 46%;
  }

  .newDrop {
    top: 7%;
    left: 2%;
  }

  .brandLabel {
    top: 8%;
    right: 2%;
  }

  .locationLabel {
    display: none;
  }

  .seasonLabel {
    left: 3%;
    bottom: 4%;
  }

  .counterLabel {
    right: 6%;
    bottom: 1%;
  }

  .backgroundParticles .particle:nth-child(n+4),
  .midgroundParticles .particle:nth-child(n+4),
  .foregroundParticles .particle:nth-child(n+2),
  .chromeFragment,
  .blackRibbon,
  .metalPlane {
    display: none;
  }

  .blackShard {
    top: 38%;
    left: 42%;
    transform: scale(.78);
  }

  .yellowCube {
    right: 19%;
    bottom: 28%;
    transform: scale(.8);
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
  .eyebrow,
  .description,
  .actions,
  .trustStrip {
    animation: none !important;
    transform-style: flat;
  }
}
`;

fs.writeFileSync('components/shop/HeroBanner.module.css', cssContent, 'utf-8');
console.log('HeroBanner.module.css updated successfully with free-floating visual canvas!');
