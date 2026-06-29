import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './Contact.css';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/khan_asifff_17/' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Walk',      href: '#' },
];

const CONTACT_INFO = [
  ['Agency', 'Walk'],
  ['Bookings', 'WhatsApp: +91 84337 84407'],
  ['Press', 'Instagram: @khan_asifff_17'],
  ['Based', 'India, Mumbai'],
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', phone: '', showName: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918433784407';
      const text = `Hi Asif,\n\nI would like to make an inquiry.\n\n*Name*: ${form.name}\n*Email*: ${form.email}\n*Phone*: ${form.phone}\n*Show/Event*: ${form.showName}\n\n*Message*:\n${form.message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
      
      setStatus('success');
      setForm({ name: '', email: '', phone: '', showName: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as any, delay } }
  });

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.13)',
    color: '#F5F5F5',
    fontFamily: 'Inter, sans-serif',
    fontSize: 14, fontWeight: 300,
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.4s ease, background 0.3s ease',
    letterSpacing: '0.01em',
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad"
      style={{
        background: '#111111',
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="contact-grid">
        {/* LEFT — info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <motion.div
            variants={fadeIn(0)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <span style={{ width: 32, height: 1, background: '#C9A96E', opacity: 0.7, flexShrink: 0 }} />
            <span className="label-caps-gold">Booking &amp; Inquiries</span>
          </motion.div>

          <motion.h2
            variants={fadeIn(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 300, letterSpacing: '-0.04em',
              color: '#FFFFFF', lineHeight: 1.05,
            }}
          >
            Let's Create Something<br />
            <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>Remarkable</span>
          </motion.h2>

          <motion.p
            variants={fadeIn(0.2)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              lineHeight: 1.9,
              color: '#CCCCCC',
              maxWidth: '90%',
            }}
          >
            Available for runway, editorial, campaigns, and long-term collaborations
            with fashion houses worldwide.
          </motion.p>

          {/* Detail rows */}
          <motion.div
            variants={fadeIn(0.3)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {CONTACT_INFO.map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                {/* Label — was #444 (near invisible), now bright */}
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: '#AAAAAA',
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13, fontWeight: 300,
                  color: '#EEEEEE',
                  letterSpacing: '0.02em',
                }}>
                  {val}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeIn(0.4)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}
          >
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10, fontWeight: 400,
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  color: '#AAAAAA',
                  textDecoration: 'none',
                  transition: 'color 0.3s, letter-spacing 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#C9A96E';
                  e.currentTarget.style.letterSpacing = '0.42em';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#AAAAAA';
                  e.currentTarget.style.letterSpacing = '0.36em';
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — form */}
        <motion.div
          variants={fadeIn(0.15)}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 16,
                  padding: '60px 40px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 36, color: '#C9A96E' }}>✓</span>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28, fontWeight: 300,
                  color: '#FFFFFF', letterSpacing: '-0.02em',
                }}>
                  Message Received
                </h3>
                <p style={{ fontSize: 14, color: '#CCCCCC', lineHeight: 1.9 }}>
                  Thank you for reaching out. Our team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-premium"
                  style={{ marginTop: 8 }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {/* Name + Email row */}
                <div className="contact-form-row">
                  {[['name', 'Name'], ['email', 'Email']].map(([name, label]) => (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <label style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 10, fontWeight: 500,
                        letterSpacing: '0.36em',
                        textTransform: 'uppercase',
                        color: '#AAAAAA',
                      }}>
                        {label}
                      </label>
                      <input
                        type={name === 'email' ? 'email' : 'text'}
                        name={name}
                        value={form[name]}
                        onChange={onChange}
                        required
                        placeholder={`Your ${name === 'email' ? 'email' : 'name'}`}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(201,169,110,0.5)';
                          e.target.style.background = 'rgba(255,255,255,0.06)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.13)';
                          e.target.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Phone + Show Name row */}
                <div className="contact-form-row">
                  {[['phone', 'Phone Number'], ['showName', 'Show / Event Name']].map(([name, label]) => (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <label style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 10, fontWeight: 500,
                        letterSpacing: '0.36em',
                        textTransform: 'uppercase',
                        color: '#AAAAAA',
                      }}>
                        {label}
                      </label>
                      <input
                        type={name === 'phone' ? 'tel' : 'text'}
                        name={name}
                        value={form[name]}
                        onChange={onChange}
                        required
                        placeholder={name === 'phone' ? 'Your phone number' : 'Show or event title'}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(201,169,110,0.5)';
                          e.target.style.background = 'rgba(255,255,255,0.06)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.13)';
                          e.target.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10, fontWeight: 500,
                    letterSpacing: '0.36em',
                    textTransform: 'uppercase',
                    color: '#AAAAAA',
                  }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="Describe your project or inquiry..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(201,169,110,0.5)';
                      e.target.style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.13)';
                      e.target.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p style={{ fontSize: 12, color: '#E57373', letterSpacing: '0.05em' }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-premium"
                  style={{ alignSelf: 'flex-start', marginTop: 4 }}
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Send Inquiry'}</span>
                  <span className="btn-arrow">→</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── FOOTER STRIP ──────────────────────────────────── */}
      <div style={{
        marginTop: 100,
        paddingTop: 36,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        {/* Brand name */}
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, fontWeight: 300,
          color: '#CCCCCC', letterSpacing: '-0.02em',
        }}>
          Asif <span style={{ color: '#C9A96E' }}>Khan</span>
        </span>

        {/* Copyright */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 9, fontWeight: 400,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: '#666666',
        }}>
          © {new Date().getFullYear()} · All rights reserved
        </span>
      </div>

      {/* ── DEVELOPER CREDIT ─────────────────────────────── */}
      <div style={{
        marginTop: 28,
        paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.65)',
        }}>
          <span>Designed &amp; Developed by</span>
          <a
            href="https://affan.nexcoreinstitute.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 16,
              fontWeight: 600,
              color: '#C9A96E',
              textDecoration: 'none',
              letterSpacing: '0.12em',
              lineHeight: 1,
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#EDD28A'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#C9A96E'; }}
          >
            Affan Studio
            <span style={{ color: '#C9A96E', marginLeft: 2 }}>.</span>
          </a>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.25);
          font-weight: 300;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .contact-grid { gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
