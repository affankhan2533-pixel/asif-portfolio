import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import axios from 'axios';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WORKS = [
  {
    _id: 'd1', number: '01', title: 'Gallego Fashion Week',
    brand: 'Blue Wings Entertainment', year: '2026', category: 'Runway Model',
    description: 'Walking as the runway model for Gallego Fashion Week Season-3, organized by Blue Wings Entertainment in Delhi-NCR, showcasing modern premium collection silhouettes with striking and deliberate grace.',
    image: '/images/gallego_runway.jpg',
  },
  {
    _id: 'd2', number: '02', title: 'Milan Runway',
    brand: 'Giorgio Armani', year: '2024', category: 'Ready-to-Wear',
    description: 'Walking the collection centerpiece, a double-breasted velvet smoking jacket, expressing the legacy of Italian tailoring with continuous fluid motion.',
    image: '/images/image copy 6.png',
  },
  {
    _id: 'd3', number: '03', title: 'Vogue Arabia Editorial',
    brand: 'Desert Shadows', year: '2023', category: 'Editorial',
    description: 'An architectural outdoor study captured on the stone shores of the Arabian gulf, matching structured drapery styles against raw natural desert layers.',
    image: '/images/image copy 2.png',
  },
  {
    _id: 'd4', number: '04', title: 'New York Fashion Week',
    brand: 'Calvin Klein', year: '2023', category: 'Minimalist Campaign',
    description: 'A stark study of light and shade set in monochromatic structures, highlighting sharp-collared overcoats and direct structural silhouettes.',
    image: '/images/image.png',
  },
];

// Tilt card component
function WorkCard({ work, idx }) {
  const cardRef  = useRef(null);
  const imgRef   = useRef(null);
  const metaRef  = useRef(null);
  const scanRef  = useRef(null);
  const [hovered, setHovered] = useState(false);

  const isReversed = idx % 2 === 1;

  // Mouse tilt (Framer Motion springs)
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 120, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 120, damping: 22 });

  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rotX.set(((e.clientY - rect.top) / rect.height - 0.5) * 7);
    rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * -7);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  // GSAP scanner + clip entrance
  useEffect(() => {
    const card    = cardRef.current;
    const imgWrap = imgRef.current;
    const meta    = metaRef.current;
    const scan    = scanRef.current;
    if (!card || !imgWrap) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
    });

    const h = imgWrap.offsetHeight || 480;

    if (scan) {
      tl.fromTo(scan, { y: 0, opacity: 0 }, { opacity: 1, duration: 0.1 })
        .to(scan, { y: -h, duration: 1.6, ease: 'power4.out' }, 0);
    }

    tl.fromTo(imgWrap,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.out' },
      0.06
    );

    if (scan) tl.to(scan, { opacity: 0, duration: 0.2 }, '-=0.2');

    if (meta) {
      tl.fromTo(meta,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.2'
      );
    }

    // Image parallax
    const img = imgWrap.querySelector('img');
    if (img) {
      gsap.to(img, {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }, []);

  const getImageSrc = (img) => {
    if (!img) return '';
    return img.startsWith('/') ? img : `http://localhost:5000/uploads/${img}`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      className={`wk-card ${isReversed ? 'wk-card-reversed' : ''}`}
      style={{
        position: 'relative',
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
    >
      {/* Big faded number */}
      <span style={{
        position: 'absolute',
        top: -44, left: isReversed ? 'auto' : -20,
        right: isReversed ? -20 : 'auto',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(80px, 12vw, 160px)',
        fontWeight: 300, letterSpacing: '-0.06em', lineHeight: 1,
        color: 'rgba(255,255,255,0.025)',
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>
        {work.number || `0${idx + 1}`}
      </span>

      {/* Image block */}
      <div
        ref={imgRef}
        className="wk-img-block"
        style={{
          position: 'relative', zIndex: 1,
          aspectRatio: '3/4', overflow: 'hidden',
          direction: 'ltr',
        }}
      >
        <img
          src={getImageSrc(work.image)}
          alt={work.title}
          loading="lazy"
          style={{
            width: '100%', height: '115%',
            objectFit: 'cover', objectPosition: 'center top',
            transform: 'scale(1)',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease',
            filter: hovered ? 'brightness(0.72) contrast(1.08)' : 'brightness(0.84) contrast(1.05)',
          }}
        />

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.86) 0%, rgba(8,8,8,0.18) 45%, transparent 70%)',
          display: 'flex', alignItems: 'flex-end', padding: 28, zIndex: 2,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <div>
            <p className="label-caps-gold" style={{ marginBottom: 6 }}>{work.year}</p>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24, fontWeight: 300, color: '#F5F5F5', letterSpacing: '-0.02em',
            }}>
              {work.brand}
            </span>
          </div>
        </div>

        {/* Gold scanner sweep */}
        <div ref={scanRef} style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '100%', height: 1,
          background: '#C9A96E', opacity: 0, zIndex: 10,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Meta */}
      <div
        ref={metaRef}
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', gap: 20,
          opacity: 0, direction: 'ltr',
        }}
      >
        {/* Tag row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 8,
            fontWeight: 400, letterSpacing: '0.38em',
            textTransform: 'uppercase', color: '#C9A96E',
            border: '1px solid rgba(201,169,110,0.28)',
            padding: '5px 12px',
          }}>
            {work.category}
          </span>
          <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
          <span className="label-caps" style={{ color: '#666' }}>{work.year}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 4vw, 54px)',
          fontWeight: 300, letterSpacing: '-0.03em',
          color: '#F5F5F5', lineHeight: 1.05,
        }}>
          <a
            href="#contact"
            style={{
              color: 'inherit', textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
            onMouseLeave={e => e.currentTarget.style.color = '#F5F5F5'}
          >
            {work.title}
          </a>
        </h3>

        {/* Brand */}
        <p className="label-caps" style={{
          fontSize: 11, letterSpacing: '0.22em', color: '#888',
        }}>
          {work.brand}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)', lineHeight: 1.9, color: '#AAAAAA',
          maxWidth: 400,
          borderLeft: '1px solid rgba(255,255,255,0.12)',
          paddingLeft: 20,
        }}>
          {work.description}
        </p>

        {/* CTA */}
        <a
          href="#contact"
          className="btn-premium"
          style={{ alignSelf: 'flex-start', padding: '12px 28px', fontSize: 10 }}
        >
          <span>Enquire</span>
          <span className="btn-arrow">→</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [works, setWorks] = useState([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/work')
      .then(r => setWorks(r.data?.length > 0 ? r.data : DEFAULT_WORKS))
      .catch(() => setWorks(DEFAULT_WORKS));
  }, []);

  useEffect(() => {
    if (!works.length || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(headingRef.current, { types: 'chars' });
      gsap.fromTo(split.chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          duration: 1.4, ease: 'power4.out',
          stagger: { amount: 0.3 },
          scrollTrigger: { trigger: headingRef.current, start: 'top 84%' },
        }
      );
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && sectionRef.current?.contains(t.trigger)) t.kill();
      });
      ctx.revert();
    };
  }, [works]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pad"
      style={{ background: '#080808', position: 'relative', zIndex: 2 }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 32, marginBottom: 80,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="label-caps">Selected Work</span>
          <div style={{ width: 48, height: 1, background: '#C9A96E', opacity: 0.6 }} />
        </div>

        <div style={{ overflow: 'hidden' }}>
          <h2
            ref={headingRef}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 300, letterSpacing: '-0.04em',
              color: '#F5F5F5', lineHeight: 1,
            }}
          >
            Portfolio
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
        {works.map((w, i) => (
          <WorkCard key={w._id || i} work={w} idx={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .wk-img-block { aspect-ratio: 4/5 !important; }
        }
        @media (max-width: 900px) {
          #work .section-pad { padding: 80px 24px; }
        }
      `}</style>
    </section>
  );
}
