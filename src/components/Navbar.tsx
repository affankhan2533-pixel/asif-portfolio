import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import './Navbar.css';

const LINKS = ['work', 'about', 'gallery', 'press', 'contact'];

const LINK_SUBTITLE: Record<string, string> = {
  work: 'Selected Portfolio',
  about: 'Biography & Info',
  gallery: 'Polaroids & Digitals',
  press: 'Featured Editorial',
  contact: 'Booking & Contact',
};

export default function Navbar({ ready }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  // Track scroll direction for hide/show behaviour
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      setScrolled(v > 60);
      if (v > lastY.current && v > 120 && !menuOpen) {
        setNavVisible(false); // scrolling DOWN → hide
      } else {
        setNavVisible(true);  // scrolling UP  → show
      }
      lastY.current = v;
    });
    return () => unsub();
  }, [scrollY, menuOpen]);

  const scrollTo = (id: string) => {
    if (menuOpen) setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(el, { duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, menuOpen ? 600 : 0);
  };

  const handleLink = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <>
      <motion.nav
        animate={{
          y: navVisible ? 0 : -100,
        }}
        initial={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar-main ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleLink(e, 'hero')}
          className="navbar-logo"
        >
          <span>ASIF</span>
          <span className="navbar-logo-dot">·</span>
          <span>KHAN</span>
        </a>

        {/* Desktop nav links */}
        <div className="nav-links-desktop">
          {LINKS.map((id) => <NavLink key={id} id={id} onNav={handleLink} />)}
        </div>

        {/* Book Now CTA */}
        <a
          href="#contact"
          onClick={(e) => handleLink(e, 'contact')}
          className="btn-premium nav-book-btn"
        >
          Book Now
        </a>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="navbar-hamburger-line"
              animate={
                menuOpen
                  ? i === 0 ? { y: 5,  rotate: 45,  background: '#F5F5F5' }
                  : i === 1 ? { scaleX: 0 }
                  : { y: -5, rotate: -45, background: '#F5F5F5' }
                  : { y: 0, rotate: 0, scaleX: 1 }
              }
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10px' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-overlay"
          >
            {/* Ambient gold glow behind the mobile links */}
            <div className="mobile-menu-glow" />

            <div className="mobile-menu-links-container">
              {LINKS.map((id, i) => (
                <motion.div
                  key={id}
                  className="mobile-menu-item-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleLink(e, id)}
                    className="mobile-menu-link"
                  >
                    <span className="mobile-menu-link-num">0{i + 1}</span>
                    {id}
                  </a>
                  <span className="mobile-menu-link-sub">
                    {LINK_SUBTITLE[id]}
                  </span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.5 }}
                style={{ marginTop: 12 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleLink(e, 'contact')}
                  className="btn-premium mobile-menu-book-btn"
                >
                  Book Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ id, onNav }: { id: string; onNav: (e: React.MouseEvent, id: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#${id}`}
      onClick={(e) => onNav(e, id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        fontSize: 10, fontWeight: 400,
        textTransform: 'uppercase', letterSpacing: '0.22em',
        color: hovered ? '#F5F5F5' : '#CCCCCC',
        textDecoration: 'none', paddingBottom: 4,
        transition: 'color 0.3s', cursor: 'pointer',
      }}
    >
      {id}
      <motion.span
        style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 1, background: '#C9A96E',
          transformOrigin: hovered ? 'left' : 'right',
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  );
}
