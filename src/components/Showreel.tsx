import React from 'react';
import { motion } from 'framer-motion';
import './Showreel.css';

const INSTAGRAM_REEL = 'https://www.instagram.com/reel/DXRK6OMjU5P/';

export default function Showreel() {
  const openReel = () => {
    window.open(INSTAGRAM_REEL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="showreel"
      className="section-pad"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', zIndex: 2,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 32, marginBottom: 40,
        flexWrap: 'wrap', gap: 16,
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 300, letterSpacing: '-0.04em',
          color: '#FFFFFF', lineHeight: 1,
        }}>
          Showreel
        </h2>
        <span className="label-caps" style={{ color: '#777' }}>Motion Reel 2024</span>
      </div>

      {/* Clickable video container */}
      <motion.div
        className="showreel-inner"
        onClick={openReel}
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          maxHeight: '75vh',
          background: '#111',
          cursor: 'pointer',
        }}
      >
        {/* Background image */}
        <img
          src="/images/IMG_8256.PNG"
          alt="Asif Khan Showreel"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6) grayscale(15%)',
            position: 'absolute', inset: 0,
            transition: 'filter 0.5s ease',
          }}
        />

        {/* Hover lightens the image */}
        <style>{`
          .showreel-inner:hover img { filter: brightness(0.75) grayscale(5%) !important; }
        `}</style>

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, transparent 30%, transparent 60%, rgba(8,8,8,0.6) 100%)',
        }} />

        {/* Bottom text */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 60px)',
          zIndex: 3, pointerEvents: 'none',
        }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 5vw, 68px)',
            fontWeight: 300, letterSpacing: '-0.04em',
            color: 'rgba(255,255,255,0.95)', lineHeight: 1,
          }}>
            Motion Reel
          </h3>
          <p className="label-caps-gold" style={{ marginTop: 14 }}>
            Paris · Milan · New York — 2024
          </p>
        </div>

        {/* Play button */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'rgba(8,8,8,0.55)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 5,
          }}
        >
          {/* Instagram icon SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#F5F5F5" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" stroke="#F5F5F5" strokeWidth="1.5" />
            <circle cx="17.5" cy="6.5" r="1" fill="#C9A96E" />
          </svg>
        </motion.div>

        {/* Tap to view label */}
        <div style={{
          position: 'absolute', top: 24, right: 24, zIndex: 4,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(8,8,8,0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201,169,110,0.25)',
          padding: '6px 14px',
          borderRadius: 2,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#C9A96E" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" stroke="#C9A96E" strokeWidth="1.5" />
            <circle cx="17.5" cy="6.5" r="1" fill="#C9A96E" />
          </svg>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 9, fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C9A96E',
          }}>
            View on Instagram
          </span>
        </div>
      </motion.div>
    </section>
  );
}
