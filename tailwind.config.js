/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        base:       '#080808',
        surface:    '#111111',
        elevated:   '#1A1A1A',
        border:     'rgba(255,255,255,0.07)',
        'border-mid': 'rgba(255,255,255,0.14)',
        'border-strong': 'rgba(255,255,255,0.25)',

        // Text
        primary:    '#F5F5F5',
        secondary:  '#888888',
        muted:      '#444444',
        accent:     '#C9A96E',
        'accent-dim': 'rgba(201,169,110,0.2)',

        // Glass
        glass:       'rgba(255,255,255,0.03)',
        'glass-md':  'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:     ['"Inter"', 'system-ui', 'sans-serif'],
        editorial: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs':  ['10px', { letterSpacing: '0.15em' }],
        xs:     ['12px', { letterSpacing: '0.08em' }],
        sm:     ['14px', { lineHeight: '1.8' }],
        base:   ['16px', { lineHeight: '1.7' }],
        // Display sizes
        'd-sm':   ['clamp(48px, 6vw, 80px)',   { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'd-md':   ['clamp(72px, 10vw, 140px)', { lineHeight: '0.90', letterSpacing: '-0.04em' }],
        'd-lg':   ['clamp(96px, 13vw, 200px)', { lineHeight: '0.88', letterSpacing: '-0.05em' }],
      },
      spacing: {
        section:  '140px',
        'section-sm': '80px',
        gutter:   '80px',
        'gutter-sm': '24px',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        'gold-glow': 'radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)',
        'blue-glow': 'radial-gradient(ellipse, rgba(80,100,220,0.06) 0%, transparent 70%)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth:    'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1200: '1200ms',
      },
      keyframes: {
        'drip': {
          '0%':   { top: '-20px', opacity: 0 },
          '15%':  { opacity: 1 },
          '90%':  { opacity: 1 },
          '100%': { top: '60px', opacity: 0 },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%':      { opacity: 0.3, transform: 'scale(0.6)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'drip':       'drip 2.4s cubic-bezier(0.25,1,0.5,1) infinite',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
        'marquee':    'marquee 28s linear infinite',
        'fade-up':    'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
