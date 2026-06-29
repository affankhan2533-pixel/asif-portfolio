import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const TRAITS = [
  ['Nationality', 'India'],
  ['Base', 'Mumbai'],
  ['Height', '6\'2"'],
  ['Representation', 'IMG Models Worldwide'],
];

export default function About() {
  const sectionRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const imgRef      = useRef(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!imgWrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(imgWrapRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(imgRef.current, { scale: 1.08 });

      gsap.timeline({
        scrollTrigger: { trigger: imgWrapRef.current, start: 'top 80%', once: true }
      })
      .to(imgWrapRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.0, ease: 'power4.inOut' })
      .to(imgRef.current, { scale: 1.0, duration: 2.0, ease: 'power4.inOut' }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    const globalLenis = (window as any).lenis;
    if (globalLenis) globalLenis.scrollTo(el, { duration: 1.8 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay }
    }
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad"
      style={{
        background: '#111111',
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="about-grid">
        {/* Portrait */}
        <div
          ref={imgWrapRef}
          className="about-portrait-wrapper"
          style={{
            position: 'relative',
            aspectRatio: '2/3',
            overflow: 'hidden',
          }}
        >
          <img
            ref={imgRef}
            src="/images/image copy 3.png"
            alt="Asif Khan portrait"
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.86) contrast(1.06) grayscale(12%)',
              transition: 'filter 0.8s ease',
            }}
          />
          {/* Bottom overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '28px 28px',
            background: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 100%)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            zIndex: 2,
          }}>
            <span className="label-caps-gold">ASIF KHAN</span>
            <span className="label-caps" style={{ color: '#444' }}>EST. 2012</span>
          </div>
        </div>

        {/* Bio content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <motion.span
            className="label-caps"
            variants={fadeIn(0)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            About
          </motion.span>

          {/* Pull quote */}
          <motion.h3
            variants={fadeIn(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              lineHeight: 1.65, color: '#CCCCCC',
              maxWidth: '90%',
            }}
          >
            "A singular force in haute couture — where disciplined form meets effortless presence."
          </motion.h3>

          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', lineHeight: 1.95, color: '#BBBBBB', marginBottom: 16 }}>
              Born in Lahore, trained in Milan, Asif Khan has walked for the most revered houses in fashion history. His work is defined by an innate understanding of movement, fabric, and the silent language of the runway.
            </p>
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', lineHeight: 1.95, color: '#BBBBBB' }}>
              Over twelve years, he has collaborated with creative directors who reshape culture — from Pierpaolo Piccioli to Raf Simons — bringing to each collection a presence that is both commanding and still.
            </p>
          </motion.div>

          {/* Traits grid */}
          <motion.div
            variants={fadeIn(0.3)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 40px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              paddingTop: 28, marginTop: 4,
            }}
          >
            {TRAITS.map(([label, value]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span className="label-caps" style={{ color: '#666' }}>{label}</span>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: 300, color: '#F5F5F5',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeIn(0.4)} initial="hidden" animate={isInView ? 'show' : 'hidden'}>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="btn-premium"
              style={{ display: 'inline-flex' }}
            >
              <span>Book Asif</span>
              <span className="btn-arrow">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          #about [style*="grid-template-columns: 1fr 1.15fr"] {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .about-portrait-wrapper { max-width: 560px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
