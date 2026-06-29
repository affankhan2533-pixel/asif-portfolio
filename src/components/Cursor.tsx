import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Cursor.css';

// Spring configs
const DOT_SPRING  = { stiffness: 1200, damping: 60, mass: 0.5 };
const RING_SPRING = { stiffness: 180,  damping: 28, mass: 0.8 };

export default function Cursor() {
  const [state,    setState]    = useState('default'); // default | link | image | video
  const [isMobile, setIsMobile] = useState(false);

  // Raw mouse position — start off-screen
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot — tight spring
  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);

  // Ring — loose spring (lag behind)
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  // Detect touch/mobile device
  useEffect(() => {
    const check = () => {
      // True mobile = touch primary device (not just small window)
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mouse tracking — only on non-touch devices
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e) => {
      const t = e.target;
      if (!t?.closest) return;
      if (t.closest('video, .showreel-inner'))
        setState('video');
      else if (t.closest('img, .wk-img-block, .gallery-item, .about-portrait-wrapper, .hero-portrait-frame'))
        setState('image');
      else if (t.closest('a, button, [role="button"], .interactive'))
        setState('link');
      else
        setState('default');
    };

    const onOut = () => setState('default');

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout',  onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout',  onOut);
    };
  }, [isMobile, rawX, rawY]);

  // On mobile — render nothing; browser cursor handles itself
  if (isMobile) return null;

  const isLink  = state === 'link';
  const isImage = state === 'image';
  const isVideo = state === 'video';

  return (
    <>
      {/* Gold dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: -4, left: -4,
          x: dotX, y: dotY,
          zIndex: 99999,
          pointerEvents: 'none',
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: '#C9A96E',
          mixBlendMode: 'normal',
        }}
        animate={{
          scale:   isLink ? 0 : 1,
          opacity: isImage || isVideo ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          zIndex: 99998,
          pointerEvents: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          x: ringX,
          y: ringY,
          border: '1px solid rgba(201,169,110,0.45)',
        }}
        animate={{
          width:      isImage || isVideo ? 88 : isLink ? 60 : 44,
          height:     isImage || isVideo ? 88 : isLink ? 60 : 44,
          marginTop:  isImage || isVideo ? -44 : isLink ? -30 : -22,
          marginLeft: isImage || isVideo ? -44 : isLink ? -30 : -22,
          borderColor: isLink
            ? 'rgba(201,169,110,0.8)'
            : isImage || isVideo
              ? 'rgba(201,169,110,0.55)'
              : 'rgba(201,169,110,0.45)',
          backgroundColor: isLink
            ? 'rgba(201,169,110,0.07)'
            : isImage || isVideo
              ? 'rgba(8,8,8,0.5)'
              : 'transparent',
          backdropFilter: isImage || isVideo ? 'blur(8px)' : 'none',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Label */}
        <motion.span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 8,
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F5F5F5',
            pointerEvents: 'none',
          }}
          animate={{ opacity: isImage ? 1 : isVideo ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isVideo ? 'PLAY' : isImage ? 'VIEW' : ''}
        </motion.span>
      </motion.div>
    </>
  );
}
