import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Work' },
  { path: '/careers', label: 'Careers' },
  { path: '/contact', label: 'Contact' },
]

// CSS custom properties with fallbacks
const cssVars = {
  navBg: 'var(--nav-bg, rgba(255, 255, 255, 0.9))',
  border: 'var(--border, rgba(0, 0, 0, 0.08))',
  shadowNav: 'var(--shadow-nav, 0 4px 20px rgba(0, 0, 0, 0.05))',
  textPrimary: 'var(--text-primary, #1D1D1F)',
  textSecondary: 'var(--text-secondary, #6B7280)',
  accent: 'var(--accent, #0071E3)',
  accentLight: 'var(--accent-light, rgba(0, 113, 227, 0.08))',
  navMobileBg: 'var(--nav-mobile-bg, rgba(255, 255, 255, 0.98))',
  shadowCardHover: 'var(--shadow-card-hover, 0 20px 35px rgba(0, 0, 0, 0.1))',
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  // Track scroll position for nav card effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [mobileOpen])

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '0px',
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none', // allows clicking through the empty space, but children will override
      }}
    >
      <div
        ref={menuRef}
        style={{
          width: scrolled ? 'calc(100% - 32px)' : '100%',
          maxWidth: '1280px',
          background: scrolled ? cssVars.navBg : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          border: scrolled ? `1px solid ${cssVars.border}` : '1px solid transparent',
          borderRadius: scrolled ? '20px' : '0px',
          boxShadow: scrolled ? cssVars.shadowNav : 'none',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          padding: '0 24px',
          pointerEvents: 'auto', // make the nav bar interactive
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minHeight: '44px', // touch target
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #0066FF 0%, #7C3AED 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src="/eclogo.png"
                alt="EliteCrows logo"
                style={{ height: '22px', filter: 'brightness(0) invert(1)' }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  fontWeight: 800,
                  color: cssVars.textPrimary,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  transition: 'color 0.3s',
                }}
              >
                Elite<span style={{ color: cssVars.accent }}>Crows</span>
              </div>
              <div
                style={{
                  fontSize: 'clamp(8px, 2.5vw, 10px)',
                  color: cssVars.textSecondary,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s',
                }}
              >
                Infotech
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isActive ? cssVars.accent : cssVars.textPrimary,
                    background: isActive ? cssVars.accentLight : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    minHeight: '44px',
                    lineHeight: '28px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = cssVars.accentLight
                      e.currentTarget.style.color = cssVars.accent
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = cssVars.textPrimary
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{
                marginLeft: '8px',
                padding: '10px 22px',
                fontSize: '13px',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${cssVars.accent}, #00C6FF)`,
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,113,227,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-actions" style={{ display: 'none', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '12px',
                color: cssVars.textPrimary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '48px',
                minHeight: '48px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = cssVars.accentLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay – improved animation and positioning */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 'clamp(70px, 15vh, 90px)',
              left: '16px',
              right: '16px',
              maxWidth: '400px',
              margin: '0 auto',
              background: cssVars.navMobileBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              padding: '24px 20px',
              borderRadius: '28px',
              border: `1px solid ${cssVars.border}`,
              boxShadow: cssVars.shadowCardHover,
              zIndex: 999,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: isActive ? cssVars.accent : cssVars.textPrimary,
                      background: isActive ? cssVars.accentLight : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      minHeight: '52px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                to="/contact"
                style={{
                  marginTop: '16px',
                  padding: '14px 24px',
                  fontSize: '15px',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${cssVars.accent}, #00C6FF)`,
                  color: 'white',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s',
                  minHeight: '52px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-actions {
            display: flex !important;
          }
        }
        /* Improve touch targets on very small devices */
        @media (max-width: 480px) {
          .mobile-actions button {
            padding: 10px !important;
          }
        }
      `}</style>
    </nav>
  )
}