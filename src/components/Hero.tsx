import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import SplitType from 'split-type';
import './Hero.css';

// Framer Motion variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 }
  }
};

const charVariant: any = {
  hidden: { yPercent: 110, opacity: 0, filter: 'blur(8px)' },
  show: {
    yPercent: 0, opacity: 1, filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const imgReveal: any = {
  hidden: { opacity: 0, scale: 1.06, y: 24 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Reusable SplitChar renderer
function SplitChars({ text, className = '', style = {} }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={charVariant}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            ...style
          }}
          className={className}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ ready }) {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);

  // Mouse parallax (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const imgX = useTransform(springX, [-1, 1], [-14, 14]);
  const imgY = useTransform(springY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
      mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    return () => section.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.getElementById('work');
    if (!el) return;
    const globalLenis = (window as any).lenis;
    if (globalLenis) {
      globalLenis.scrollTo(el, { duration: 2.0, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
    >
      {/* Ambient glow top-left */}
      <div className="hero-glow hero-glow-left" />
      {/* Ambient glow bottom-right */}
      <div className="hero-glow hero-glow-right" />
      {/* Vignette */}
      <div className="hero-vignette" />

      {/* ── LEFT: TEXT CONTENT ──────────────────────────────── */}
      <motion.div
        className="hero-left"
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          <span className="label-caps-gold">Haute Couture · Runway · Editorial</span>
        </motion.div>

        {/* Name wrapper — on desktop name is left, portrait is right.
            On mobile, portrait is BETWEEN name and body text */}
        <div className="hero-name-portrait-row">
          {/* Name block */}
          <div className="hero-name-block">
            <SplitChars
              text="ASIF"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(52px, 11vw, 190px)',
                fontWeight: 300,
                letterSpacing: '-0.05em',
                color: '#FFFFFF',
                lineHeight: 0.9,
              }}
            />
            <SplitChars
              text="KHAN"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(52px, 11vw, 190px)',
                fontWeight: 300,
                letterSpacing: '-0.05em',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(245,245,245,0.55)',
                lineHeight: 0.9,
              }}
            />
          </div>

          {/* ── PORTRAIT — shown inline on mobile next to name ── */}
          <motion.div
            className="hero-portrait-mobile"
            variants={imgReveal}
          >
            <div className="hero-portrait-frame">
              <div className="hero-portrait-rim" />
              <img
                ref={imageRef}
                src="/images/hero_runway.png"
                alt="Asif Khan — Haute Couture Model"
                className="hero-portrait-img"
              />
              <div className="hero-portrait-gradient" />
              <div className="hero-portrait-badge">
                <span className="label-caps-gold">Available 2025</span>
                <span className="hero-badge-dot" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="hero-subtitle">
          Defining elegance on the world's most prestigious runways.
          Collaborating with legacy houses to translate fabric into motion.
        </motion.p>

        {/* Stats */}
        <motion.div variants={fadeUp} className="hero-stats">
          {[['80+', 'Shows'], ['12', 'Years'], ['30+', 'Brands']].map(([n, l]) => (
            <div key={l} className="hero-stat-item">
              <span className="hero-stat-num">{n}</span>
              <span className="label-caps hero-stat-label">{l}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div variants={fadeUp} className="hero-cta">
          <a href="#work" className="btn-premium" onClick={scrollToWork}>
            <span>View Portfolio</span>
            <span className="btn-arrow">→</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-booking-link"
          >
            Booking Inquiries ↗
          </a>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: PORTRAIT (desktop only) ─────────────────── */}
      <motion.div
        className="hero-portrait-desktop"
        initial={{ opacity: 0, scale: 1.05, y: 30 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div style={{ x: imgX, y: imgY, willChange: 'transform' }}>
          <div className="hero-portrait-frame">
            <div className="hero-portrait-rim" />
            <img
              src="/images/hero_runway.png"
              alt="Asif Khan — Haute Couture Model"
              className="hero-portrait-img"
            />
            <div className="hero-portrait-gradient" />
            <div className="hero-portrait-badge">
              <span className="label-caps-gold">Available 2025</span>
              <span className="hero-badge-dot" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ────────────────────────────────── */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1.0 }}
      >
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line">
          <div className="scroll-drip" />
        </div>
      </motion.div>

      {/* pulse-dot animation */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.6); }
        }
      `}</style>
    </section>
  );
}
