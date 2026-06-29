import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const IMAGES = [
  { src: '/images/IMG_8256.PNG',     caption: 'Runway Focus',       gridClass: 'md:col-span-2 md:row-span-2' },
  { src: '/images/image copy 6.png', caption: 'Milan Editorial',     gridClass: 'md:col-span-1 md:row-span-1' },
  { src: '/images/image copy 2.png', caption: 'Vogue Campaign',      gridClass: 'md:col-span-1 md:row-span-2' },
  { src: '/images/image.png',        caption: 'Backstage Paris',     gridClass: 'md:col-span-1 md:row-span-1' },
  { src: '/images/image copy 3.png', caption: 'Studio Portrait',     gridClass: 'md:col-span-1 md:row-span-1' },
  { src: '/images/image copy 4.png', caption: 'Model Polaroid',      gridClass: 'md:col-span-2 md:row-span-1' },
  { src: '/images/image copy 5.png', caption: 'Casting Digital',     gridClass: 'md:col-span-1 md:row-span-2' },
  { src: '/images/image copy 7.png', caption: 'Sartorial Details',   gridClass: 'md:col-span-1 md:row-span-1' },
  { src: '/images/image copy 8.png', caption: 'Sunset Campaign',     gridClass: 'md:col-span-2 md:row-span-1' },
  { src: '/images/image copy 9.png', caption: 'Runway Motion',       gridClass: 'md:col-span-1 md:row-span-1' },
  { src: '/images/image copy 10.png',caption: 'Backstage Details',    gridClass: 'md:col-span-1 md:row-span-1' },
  { src: '/images/image copy 11.png',caption: 'Monochrome Portrait',  gridClass: 'md:col-span-1 md:row-span-2' },
  { src: '/images/image copy 12.png',caption: 'Couture Silhouette',   gridClass: 'md:col-span-2 md:row-span-1' },
  { src: '/images/image copy 13.png',caption: 'Milano Fitting',       gridClass: 'md:col-span-1 md:row-span-1' },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section-pad"
      style={{
        background: '#080808',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 32,
        marginBottom: 48,
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 6vw, 80px)',
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: '#F5F5F5',
          lineHeight: 1,
        }}>
          Digitals &amp; Polaroids
        </h2>
        <span className="label-caps" style={{ alignSelf: 'flex-end', color: '#888' }}>
          Photographic Record
        </span>
      </div>

      {/* Bento masonry grid using Tailwind */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[260px]">
        {IMAGES.map((img, i) => (
          <GalleryItem
            key={i}
            img={img}
            idx={i}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ img, idx, isInView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden group bg-[#111] border border-white/5 ${img.gridClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(idx * 0.05, 0.4), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={img.src}
        alt={img.caption}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        style={{
          filter: hovered ? 'brightness(0.72) contrast(1.08)' : 'brightness(0.84) contrast(1.05)',
        }}
      />

      {/* Caption overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <span className="label-caps-gold text-[10px] tracking-[0.25em]">{img.caption}</span>
      </div>
    </motion.div>
  );
}
