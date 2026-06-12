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
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Track scroll for nav style
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

  // Close mobile menu when clicking outside both the nav bar AND the mobile overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileOpen) return
      const target = event.target as Node
      const isInsideNavBar = menuRef.current?.contains(target)
      const isInsideMobileMenu = mobileMenuRef.current?.contains(target)
      if (!isInsideNavBar && !isInsideMobileMenu) {
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

  const handleMobileLinkClick = () => {
    setMobileOpen(false)
  }

  // Yellow color for Crows and Infotech
  const yellow = '#FFC107'

  return (
    <nav
      aria-label="Main navigation"
      role="navigation"
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '0px',
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Desktop / main nav bar */}
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
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo with black background */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minHeight: '44px',
            }}
          >
            {/* Black background wrapper for logo */}
            <div
              style={{
                background: '#000000',
                borderRadius: '10px',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src="/eclogo.png"
                alt="EliteCrows logo"
                style={{
                  height: '26px',
                  width: 'auto',
                  display: 'block',
                }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            {/* Text container: centered alignment for both lines */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  fontWeight: 800,
                  color: cssVars.textPrimary,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                ELITE<span style={{ color: yellow }}> CROWS</span>
              </div>
              {/* Infotech: smaller than ELITE CROWS, bold, centered */}
              <div
                style={{
                  fontSize: 'clamp(9px, 2.5vw, 11px)',
                  fontWeight: 700,
                  color: yellow,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
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
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
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

      {/* Mobile Menu Overlay */}
{/* Mobile Menu Overlay */}
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      ref={mobileMenuRef}
      id="mobile-menu"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed',
        top: '78px',
        right: '16px',
        width: '280px',
        background: cssVars.navMobileBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '20px 16px',
        borderRadius: '20px',
        border: `1px solid ${cssVars.border}`,
        boxShadow: cssVars.shadowCardHover,
        zIndex: 1001,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.path

          return (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.05,
                duration: 0.2,
              }}
            >
              <Link
                to={link.path}
                onClick={handleMobileLinkClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  color: isActive
                    ? cssVars.accent
                    : cssVars.textPrimary,
                  background: isActive
                    ? cssVars.accentLight
                    : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          )
        })}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: navLinks.length * 0.05,
            duration: 0.2,
          }}
          style={{ marginTop: '12px' }}
        >
          <Link
            to="/contact"
            onClick={handleMobileLinkClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              padding: '14px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 800,
              letterSpacing: '0.3px',
              color: '#fff',
              background: `linear-gradient(135deg, ${cssVars.accent}, #00C6FF)`,
              boxShadow: '0 8px 20px rgba(0,113,227,0.25)',
            }}
          >
            Get Started
          </Link>
        </motion.div>
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
        @media (max-width: 480px) {
          .mobile-actions button {
            padding: 10px !important;
          }
        }
      `}</style>
    </nav>
  )
}