import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Public Components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Gallery from './components/Gallery';
import Showreel from './components/Showreel';
import Press from './components/Press';
import Contact from './components/Contact';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminWork from './admin/AdminWork';
import AdminPress from './admin/AdminPress';
import AdminMessages from './admin/AdminMessages';

gsap.registerPlugin(ScrollTrigger);

// Public Landing Page view
function PublicView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as any).lenis = lenis;

    const updateLenis = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      (window as any).lenis = null;
    };
  }, []);

  useEffect(() => {
    if (isLoaded && mainContentRef.current) {
      gsap.to(mainContentRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, [isLoaded]);

  const handleLoaderComplete = () => setIsLoaded(true);

  return (
    <>
      {/* ── NAVBAR: OUTSIDE the opacity wrapper so it's ALWAYS VISIBLE ── */}
      <Navbar ready={isLoaded} />

      {/* Intro Preloader */}
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Three.js 3D Background */}
      <Scene3D />

      {/* Main Page Content — starts below fixed navbar via padding-top on #hero */}
      <div
        ref={mainContentRef}
        style={{
          opacity: 0,
          width: '100%',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Hero ready={isLoaded} />

        <div className="section-divider"><span>Selected Works</span></div>
        <Work />

        <div className="section-divider"><span>Biography</span></div>
        <About />

        <div className="section-divider"><span>Digitals &amp; Polaroids</span></div>
        <Gallery />

        <div className="section-divider"><span>Showreel</span></div>
        <Showreel />

        <div className="section-divider"><span>Press &amp; Editorial</span></div>
        <Press />

        <div className="section-divider"><span>Booking &amp; Inquiries</span></div>
        <Contact />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="work" element={<AdminWork />} />
          <Route path="press" element={<AdminPress />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
