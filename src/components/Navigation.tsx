import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, GraduationCap, Sparkles, Crown, Send, CheckCircle, X as XIcon, Mail, FileText, ArrowRight } from 'lucide-react'

const COLORS = {
  primary: '#2563EB',
  gradientPurple: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/products', label: 'Products' },
  { path: '/learnhub', label: 'LearnHub' },
  { path: '/portfolio', label: 'Works' },
  { path: '/careers', label: 'Careers' },
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

// Popup Form Component for Navigation - Professional UI
function EnrollPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [formDataForModal, setFormDataForModal] = useState<any>(null)

  // Hide scrollbar style
  const hideScrollbarStyle = {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
  }

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    color: '#1E293B',
    outline: 'none',
    transition: 'all 0.2s',
  }

  const buildEmailBody = (formValues: any) => {
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 LEARNHUB STUDENT INQUIRY (FROM NAVIGATION)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 STUDENT INFORMATION
─────────────────────────────────────────
Name: ${formValues.name}
Email: ${formValues.email}
Phone: ${formValues.phone}
Education: ${formValues.education || 'Not specified'}
Institution: ${formValues.institution || 'Not specified'}

📋 INQUIRY DETAILS
─────────────────────────────────────────
Type: ${formValues.inquiryType}
Course: ${formValues.course || 'Not applicable'}
Mode: ${formValues.preferredMode || 'Not specified'}

💬 MESSAGE
─────────────────────────────────────────
${formValues.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via Navigation Bar Enroll Button
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const formValues: any = {}
    formData.forEach((value, key) => { formValues[key] = value })

    if (!formValues.name || !formValues.email || !formValues.phone || !formValues.inquiryType || !formValues.message) {
      alert('Please fill in all required fields.')
      return
    }

    setFormDataForModal(formValues)
    setShowConfirmModal(true)
  }

  const proceedToMail = () => {
    if (!formDataForModal) return
    
    const subject = `LearnHub Inquiry - ${formDataForModal.name} (${formDataForModal.inquiryType})`
    const body = buildEmailBody(formDataForModal)
    window.location.href = `mailto:learnhub@elitecrows.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setShowConfirmModal(false)
    setShowSuccess(true)
    if (formRef.current) formRef.current.reset()
    
    setTimeout(() => {
      onClose()
      setShowSuccess(false)
    }, 3000)
  }

  const inquiryTypes = ['Course Enrollment', 'Internship Application', 'Placement Training', 'Career Guidance', 'Workshop Registration', 'General Query']
  const preferredModes = ['Online', 'Offline', 'Hybrid']
  const courses = [
    'Full-Stack Web Development (MERN)',
    'Python for Data Science & AI',
    'Machine Learning & Generative AI',
    'Cloud Computing & DevOps (AWS)',
    'Digital Marketing & SEO Mastery',
    'Cybersecurity & Ethical Hacking',
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '550px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#FFFFFF',
              borderRadius: '28px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              ...hideScrollbarStyle,
            }}
          >
            {/* Popup Header - Professional Blue */}
            <div style={{
              padding: '24px 28px',
              background: COLORS.primary,
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
            }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GraduationCap size={24} /> Enroll Now
                </h2>
                <p style={{ fontSize: '13px', opacity: 0.9 }}>Fill out the form to start your learning journey</p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Popup Body */}
            <div style={{ padding: '28px' }}>
              {showSuccess ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={64} color="#10B981" />
                  <h3 style={{ fontSize: '22px', fontWeight: 700, marginTop: '20px', color: '#1E293B' }}>Thank You!</h3>
                  <p style={{ color: '#64748B', marginTop: '10px', lineHeight: 1.6 }}>
                    Your email client will open. Please review the message, attach any documents, and send. Our team will respond within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    style={{
                      marginTop: '24px',
                      padding: '12px 28px',
                      background: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Full Name *</label>
                    <input name="name" required style={inputStyle} placeholder="Enter your full name" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Email *</label>
                      <input name="email" required type="email" style={inputStyle} placeholder="your@email.com" />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Phone *</label>
                      <input name="phone" required style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Education Level</label>
                    <select name="education" style={inputStyle}>
                      <option value="">Select</option>
                      <option>High School</option>
                      <option>Undergraduate</option>
                      <option>Postgraduate</option>
                      <option>Working Professional</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Institution / College</label>
                    <input name="institution" style={inputStyle} placeholder="Your college name" />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Inquiry Type *</label>
                    <select name="inquiryType" required style={inputStyle}>
                      <option value="">Select</option>
                      {inquiryTypes.map(type => <option key={type}>{type}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Course Interested In</label>
                    <select name="course" style={inputStyle}>
                      <option value="">Select a course</option>
                      {courses.map(course => <option key={course}>{course}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Preferred Mode</label>
                    <select name="preferredMode" style={inputStyle}>
                      <option value="">Select</option>
                      {preferredModes.map(mode => <option key={mode}>{mode}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' }}>Your Message *</label>
                    <textarea name="message" required rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell us about your goals and questions..." />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: COLORS.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    <Send size={18} /> Submit Inquiry
                  </button>

                  <p style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', marginTop: '16px' }}>
                    We'll get back to you within 24 hours
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Confirmation Modal - Professional */}
      {showConfirmModal && formDataForModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '500px', width: '100%', background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', background: COLORS.primary, color: 'white' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={20} /> Review Your Inquiry</h3>
            </div>
            <div style={{ padding: '24px', maxHeight: '60vh', overflowY: 'auto', ...hideScrollbarStyle }}>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
                <p><strong>Name:</strong> {formDataForModal.name}</p>
                <p><strong>Email:</strong> {formDataForModal.email}</p>
                <p><strong>Phone:</strong> {formDataForModal.phone}</p>
                <p><strong>Inquiry:</strong> {formDataForModal.inquiryType}</p>
                <p><strong>Course:</strong> {formDataForModal.course || 'Not specified'}</p>
                <p><strong>Message:</strong><br />{formDataForModal.message}</p>
              </div>
              <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
                <p style={{ fontSize: '13px', color: '#92400E' }}><strong>Note:</strong> Your email client will open. Please attach any relevant documents before sending.</p>
              </div>
            </div>
            <div style={{ padding: '20px 24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0' }}>
              <button onClick={() => setShowConfirmModal(false)} style={{ padding: '10px 20px', borderRadius: '10px', background: '#F8FAFC', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Edit</button>
              <button onClick={proceedToMail} style={{ padding: '10px 24px', borderRadius: '10px', background: COLORS.primary, color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Send Email</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isEnrollPopupOpen, setIsEnrollPopupOpen] = useState(false)
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

  // Close mobile menu when clicking outside
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
      if (e.key === 'Escape' && isEnrollPopupOpen) setIsEnrollPopupOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [mobileOpen, isEnrollPopupOpen])

  const handleMobileLinkClick = () => {
    setMobileOpen(false)
  }

  const openEnrollPopup = () => {
    setIsEnrollPopupOpen(true)
  }

  const yellow = '#FFC107'

  // Only show Enroll Now button on LearnHub page
  const isLearnHubPage = location.pathname === '/learnhub'

  return (
    <>
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
            {/* Logo */}
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
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              {/* Contact Us Button */}
              <Link
                to="/contact"
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
              >
                Contact Us !
              </Link>

              {/* Special Enroll Now Button for LearnHub - Opens Popup */}
              {isLearnHubPage && (
                <motion.button
                  onClick={openEnrollPopup}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    marginLeft: '8px',
                    padding: '10px 24px',
                    fontSize: '13px',
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: COLORS.primary,
                    color: 'white',
                    borderRadius: '50px',
                    border: 'none',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                  }}
                >
                  <GraduationCap size={16} />
                  Enroll Now
                  <Sparkles size={14} />
                </motion.button>
              )}
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
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
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
                          color: isActive ? cssVars.accent : cssVars.textPrimary,
                          background: isActive ? cssVars.accentLight : 'transparent',
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
                  transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
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
                    Contact Us !
                  </Link>
                </motion.div>

                {/* Mobile Enroll Button for LearnHub - Opens Popup */}
                {/* {isLearnHubPage && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.05, duration: 0.2 }}
                    style={{ marginTop: '8px' }}
                  >
                    <button
                      onClick={() => {
                        handleMobileLinkClick()
                        openEnrollPopup()
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        textAlign: 'center',
                        width: '100%',
                        padding: '14px',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: 800,
                        letterSpacing: '0.3px',
                        color: '#fff',
                        background: COLORS.primary,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
                      }}
                    >
                      <GraduationCap size={18} />
                      Enroll Now
                      <Sparkles size={14} />
                    </button>
                  </motion.div>
                )} */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Enroll Popup */}
      <EnrollPopup isOpen={isEnrollPopupOpen} onClose={() => setIsEnrollPopupOpen(false)} />

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
    </>
  )
}