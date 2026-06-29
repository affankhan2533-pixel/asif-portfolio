import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import './Press.css';

const DEFAULT_QUOTES = [
  { _id: 'q1', publication: 'Vogue Italia', issue: 'March 2024', quote: 'A silhouette that commands silence. Khan moves with the certainty of a sculptor in motion.' },
  { _id: 'q2', publication: 'System Magazine', issue: 'S/S 2024', quote: 'Precision and poetry — Khan embodies the duality that every great designer seeks in a muse.' },
  { _id: 'q3', publication: 'AnOther Magazine', issue: 'A/W 2023', quote: 'There is a rare stillness behind his movement. Clothes do not simply hang on him — they speak.' },
  { _id: 'q4', publication: 'GQ Middle East', issue: 'Sept 2023', quote: 'The future of men\'s haute couture has a name, and it arrives with striking, deliberate grace.' },
];

const BRANDS = ['Vogue Italia','System Magazine','AnOther Magazine','GQ Middle East','Harper\'s Bazaar','Numéro','Wallpaper*','i-D','Interview','W Magazine'];

export default function Press() {
  const [quotes, setQuotes] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/press')
      .then(r => setQuotes(r.data?.length > 0 ? r.data : DEFAULT_QUOTES))
      .catch(() => setQuotes(DEFAULT_QUOTES));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="press"
      className="section-pad"
      style={{
        background: '#080808',
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 32, marginBottom: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="label-caps">Press &amp; Editorial</span>
          <div style={{ width: 48, height: 1, background: '#C9A96E', opacity: 0.6 }} />
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 300, letterSpacing: '-0.04em',
          color: '#F5F5F5', lineHeight: 1,
        }}>
          As Featured In
        </h2>
      </div>

      {/* Marquee */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '28px 0',
        margin: '0 -80px',
      }}>
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center' }}>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 60, padding: '0 30px' }}>
              <span className="label-caps" style={{ color: '#666', whiteSpace: 'nowrap', letterSpacing: '0.45em', fontSize: 10 }}>
                {b}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 28 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Quote cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 32, marginTop: 72,
      }}>
        {quotes.map((q, i) => (
          <motion.div
            key={q._id || i}
            initial={{ opacity: 0, y: 48 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              paddingLeft: 24, paddingTop: 8,
              display: 'flex', flexDirection: 'column', gap: 18,
              transition: 'border-color 0.4s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
          >
            <span className="label-caps-gold">{q.publication}</span>
            <p style={{
              fontFamily: "'Libre Baskerville', serif",
              fontStyle: 'italic', fontSize: 'clamp(13px, 1.3vw, 15px)',
              lineHeight: 1.85, color: '#BBBBBB',
            }}>
              {q.quote}
            </p>
            <span className="label-caps" style={{ color: '#666' }}>{q.issue}</span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #press [style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #press [style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
          #press [style*="margin: '0 -80px'"] { margin: 0 -24px !important; }
        }
      `}</style>
    </section>
  );
}
