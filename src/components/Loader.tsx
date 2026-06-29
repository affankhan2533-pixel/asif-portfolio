import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';

export default function Loader({ onComplete }) {
  const overlayRef  = useRef(null);
  const barRef      = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => { if (onComplete) onComplete(); }
      });

      // Counter + bar
      const obj = { value: 0 };
      tl.to(obj, {
        value: 100,
        duration: 2.6,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.floor(obj.value))
      }, 0)
      .to(barRef.current, {
        scaleX: 1,
        duration: 2.6,
        ease: 'power2.inOut'
      }, 0)
      // Hold 0.2s then slide up
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 1.4,
        ease: 'power4.inOut',
        delay: 0.15
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8"
      style={{ background: '#080808' }}
    >
      {/* Brand mark */}
      <p className="label-caps" style={{ color: 'rgba(245,245,245,0.25)', letterSpacing: '0.7em' }}>
        Asif Khan
      </p>

      {/* Large name */}
      <div className="flex flex-col items-center leading-none" style={{ gap: 0 }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(64px, 14vw, 140px)',
            fontWeight: 300,
            letterSpacing: '-0.05em',
            color: '#F5F5F5',
            lineHeight: 0.88,
          }}
        >
          ASIF
        </h1>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(64px, 14vw, 140px)',
            fontWeight: 300,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(245,245,245,0.3)',
            lineHeight: 0.88,
          }}
        >
          KHAN
        </h1>
      </div>

      {/* Progress */}
      <div className="flex flex-col items-center gap-4 w-full" style={{ maxWidth: 200 }}>
        {/* Track */}
        <div
          className="w-full relative overflow-hidden"
          style={{ height: 1, background: 'rgba(255,255,255,0.07)' }}
        >
          <div
            ref={barRef}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, transparent, #C9A96E)',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Counter */}
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            fontWeight: 300,
            letterSpacing: '0.3em',
            color: 'rgba(201,169,110,0.7)',
          }}
        >
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </div>
  );
}
