import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowUpRight, X } from 'lucide-react'

export default function Footer() {
  const yellow = '#FFC107'   // Consistent yellow from navigation
  const accentBlue = '#0071E3'
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  // Close modals on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showTermsModal) setShowTermsModal(false)
        if (showPrivacyModal) setShowPrivacyModal(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showTermsModal, showPrivacyModal])

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (showTermsModal || showPrivacyModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showTermsModal, showPrivacyModal])

  // Reusable modal component (to avoid repetition)
  const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(4px)',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 40px -12px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid #E5E5E7',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1D1D1F',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F2F2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <X size={20} color="#86868B" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div
            style={{
              padding: '24px',
              overflowY: 'auto',
              flex: 1,
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#3A3A3C',
            }}
          >
            {children}
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #E5E5E7',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={onClose}
              style={{
                background: accentBlue,
                border: 'none',
                padding: '8px 20px',
                borderRadius: '980px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <footer
        aria-label="Site footer"
        itemScope
        itemType="https://schema.org/WPFooter"
        style={{
          background: '#F5F5F7',
          borderTop: '1px solid #E5E5E7',
        }}>
        <div className="container" style={{ padding: '64px 24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>

            {/* Brand – matches Navigation logo style */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <div style={{
                  background: '#000000',
                  borderRadius: '10px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                }}>
                  <img
                    src="/eclogo.png"
                    alt="EliteCrows logo"
                    style={{ height: '20px', width: 'auto', display: 'block' }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#1D1D1F',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}>
                    ELITE<span style={{ color: yellow }}> CROWS</span>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: yellow,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}>
                    Infotech
                  </div>
                </div>
              </Link>
              <p style={{ fontSize: '13px', color: '#86868B', lineHeight: 1.75, maxWidth: '220px' }}>
                Technology-driven solutions for businesses that demand excellence worldwide.
              </p>
            </div>

            {/* Services */}
            <nav aria-label="Services navigation">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accentBlue, marginBottom: '16px' }}>
                Services
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['Web Development', '/services'],
                  ['Software Development', '/services'],
                  ['AI & Machine Learning', '/services'],
                  ['Cloud & DevOps', '/services'],
                  ['Digital Marketing', '/services'],
                  ['Cybersecurity', '/services'],
                ].map(([s, path]) => (
                  <Link key={s} to={path} style={{ fontSize: '13px', color: '#86868B', cursor: 'pointer', transition: 'color 0.15s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1D1D1F')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#86868B')}
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Company */}
            <nav aria-label="Company navigation">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accentBlue, marginBottom: '16px' }}>
                Company
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Products', '/products'], ['LearnHub', '/learnhub'], ['Portfolio', '/portfolio'], ['Careers', '/careers'], ['Contact', '/contact']].map(([label, path]) => (
                  <Link key={path} to={path} style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '13px', color: '#86868B', textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = accentBlue)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#86868B')}
                  >
                    {label}
                    <ArrowUpRight size={10} />
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Locations navigation">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accentBlue, marginBottom: '16px' }}>
                Locations
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['Coimbatore AI automation', '/coimbatore'],
                  ['Tiruppur software development', '/tiruppur'],
                  ['Erode cloud consulting', '/erode'],
                  ['Salem cybersecurity services', '/salem'],
                  ['Tamil Nadu service areas', '/service-areas'],
                ].map(([label, path]) => (
                  <Link key={path} to={path} style={{ fontSize: '13px', color: '#86868B', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.color = accentBlue)} onMouseLeave={e => (e.currentTarget.style.color = '#86868B')}>
                    {label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Technology resources">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accentBlue, marginBottom: '16px' }}>
                Resources
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['React docs', 'https://react.dev/'],
                  ['Vite docs', 'https://vitejs.dev/guide/'],
                  ['AWS architecture center', 'https://aws.amazon.com/architecture/'],
                  ['OWASP Top 10', 'https://owasp.org/www-project-top-ten/'],
                ].map(([label, href]) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#86868B', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.color = accentBlue)} onMouseLeave={e => (e.currentTarget.style.color = '#86868B')}>
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Contact */}
            <address style={{ fontStyle: 'normal' }} itemScope itemType="https://schema.org/PostalAddress">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accentBlue, marginBottom: '16px' }}>
                Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={14} color="#A1A1A6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#86868B', lineHeight: 1.5 }} itemProp="addressLocality">
                    Gobichettipalayam College Pirivu, Gobichettipalayam, Tamil Nadu 638453, India
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={14} color="#A1A1A6" style={{ flexShrink: 0 }} />
                  <a href="tel:+916383106107" style={{ fontSize: '13px', color: '#86868B', textDecoration: 'none' }} aria-label="Call EliteCrows Infotech">+91 6383106107</a>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={14} color="#A1A1A6" style={{ flexShrink: 0 }} />
                  <a href="mailto:elitecrowsindia@gmail.com" style={{ fontSize: '13px', color: '#86868B', textDecoration: 'none' }} aria-label="Email EliteCrows Infotech">elitecrowsindia@gmail.com</a>
                </div>
              </div>
            </address>
          </div>

          <div style={{ height: '1px', background: '#E5E5E7', margin: '0 0 24px' }} />

          {/* Bottom row with copyright, terms, privacy, and credit */}
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#A1A1A6' }}>
              <span>© {new Date().getFullYear()} EliteCrows Infotech. All rights reserved.</span>
              <span>|</span>
              <button
                onClick={() => setShowTermsModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#A1A1A6',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = yellow)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A6')}
                aria-label="View Terms and Conditions"
              >
                Terms and Conditions
              </button>
              <span>|</span>
              <button
                onClick={() => setShowPrivacyModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#A1A1A6',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = yellow)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A6')}
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </button>
            </div>
            <span style={{ fontSize: '12px', color: '#A1A1A6' }}>
              Designed & Developed by{' '}
              <span style={{ color: yellow, fontWeight: 600 }}>EliteCrows</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Terms and Conditions Modal */}
      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} title="Terms and Conditions">
        <p style={{ marginBottom: '1rem' }}>
          Welcome to <strong>EliteCrows Infotech</strong> ("Company", "we", "our", "us"). 
          By accessing or using our website, services, or any related applications 
          (collectively, the "Services"), you agree to be bound by these Terms and 
          Conditions. If you do not agree with any part of these terms, you must not 
          use our Services.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>1. Acceptance of Terms</h3>
        <p>These Terms constitute a legally binding agreement between you and EliteCrows Infotech. By using our website or engaging our services, you acknowledge that you have read, understood, and accepted these Terms, including any future amendments.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>2. Use of Our Services</h3>
        <p>You agree to use our Services only for lawful purposes and in a manner consistent with all applicable laws and regulations. You shall not:</p>
        <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
          <li>Upload, transmit, or distribute any malicious code, viruses, or harmful content.</li>
          <li>Attempt to gain unauthorized access to our systems, servers, or networks.</li>
          <li>Interfere with or disrupt the integrity or performance of our Services.</li>
          <li>Reverse engineer, decompile, or extract source code from any of our software or platforms.</li>
        </ul>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>3. Intellectual Property</h3>
        <p>All content, trademarks, logos, designs, graphics, code, and other materials provided through our Services are the exclusive property of EliteCrows Infotech or its licensors. You may not copy, modify, distribute, sell, or lease any part of our Services without explicit written permission.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>4. Client Responsibilities & Confidentiality</h3>
        <p>When you engage us for services such as web development, software development, AI/ML solutions, or digital marketing, you agree to provide accurate and complete information. Both parties agree to keep confidential any proprietary or sensitive information disclosed during the engagement. Ownership of the final deliverables (e.g., source code, design files) will be clearly outlined in a separate project agreement.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>5. Third-Party Links & Resources</h3>
        <p>Our website may contain links to third-party websites or services that are not owned or controlled by EliteCrows Infotech. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. You acknowledge and agree that we shall not be liable for any damages caused by your use of such third-party resources.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>6. Disclaimer of Warranties</h3>
        <p>Our Services are provided on an "AS IS" and "AS AVAILABLE" basis. EliteCrows Infotech disclaims all warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, secure, or free of viruses or other harmful components.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>7. Limitation of Liability</h3>
        <p>To the maximum extent permitted by law, in no event shall EliteCrows Infotech, its directors, employees, or agents be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of the Services. Our total liability shall not exceed the amount you paid us (if any) in the six months preceding the event giving rise to liability.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>8. Indemnification</h3>
        <p>You agree to indemnify, defend, and hold harmless EliteCrows Infotech and its affiliates from any claim, demand, loss, liability, or expense (including reasonable attorneys' fees) arising out of your violation of these Terms or your misuse of the Services.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>9. Modification of Terms</h3>
        <p>We reserve the right to revise these Terms at any time. If we make material changes, we will post the updated Terms on this page and update the "Last Updated" date below. Your continued use of the Services after any such change constitutes your acceptance of the new Terms.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>10. Governing Law & Dispute Resolution</h3>
        <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any dispute arising out of or relating to these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts located in Gobichettipalayam, Tamil Nadu, India.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>11. Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>EliteCrows Infotech</strong><br />
          Email: <a href="mailto:elitecrowsindia@gmail.com" style={{ color: accentBlue, textDecoration: 'none' }}>elitecrowsindia@gmail.com</a><br />
          Phone: <a href="tel:+916383106107" style={{ color: accentBlue, textDecoration: 'none' }}>+91 6383106107</a>
          <br />Address: Gobichettipalayam College Pirivu, Gobichettipalayam, Tamil Nadu 638453, India
        </p>

        <p style={{ marginTop: '2rem', borderTop: '1px solid #E5E5E7', paddingTop: '1rem', fontSize: '12px', color: '#86868B' }}>
          Last Updated: March 2026
        </p>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Privacy Policy">
        <p style={{ marginBottom: '1rem' }}>
          At <strong>EliteCrows Infotech</strong> ("we", "our", "us"), protecting your privacy is a top priority. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
          visit our website or use our services. Please read this policy carefully. If you do not agree with 
          the terms, do not access our site or services.
        </p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>1. Information We Collect</h3>
        <p>We may collect both personal and non‑personal information in the following ways:</p>
        <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
          <li><strong>Personal Data:</strong> Name, email address, phone number, company name, billing information, and any other information you voluntarily provide when filling out forms, requesting a quote, or contacting us.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, time and date of visits, and other diagnostic data collected automatically via cookies and similar technologies.</li>
          <li><strong>Project Data:</strong> If you engage us for services, we may collect technical specifications, business requirements, and other information necessary to deliver our solutions.</li>
        </ul>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>2. How We Use Your Information</h3>
        <p>We use the collected information for various legitimate business purposes:</p>
        <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
          <li>To provide, operate, and maintain our services and website.</li>
          <li>To respond to your inquiries, quotes, or support requests.</li>
          <li>To process payments and deliver project deliverables.</li>
          <li>To send you technical notices, updates, security alerts, and support messages.</li>
          <li>To improve our website, services, and user experience through analytics.</li>
          <li>To comply with legal obligations or protect our rights.</li>
        </ul>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>3. Cookies and Tracking Technologies</h3>
        <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our website may not function properly without cookies.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>4. Sharing Your Information</h3>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your data in the following limited situations:</p>
        <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
          <li>With service providers who assist us in operating our business (e.g., hosting, payment processing, analytics) under strict confidentiality agreements.</li>
          <li>To comply with legal obligations, court orders, or governmental requests.</li>
          <li>To protect the rights, property, or safety of EliteCrows Infotech, our clients, or others.</li>
          <li>In connection with a merger, acquisition, or asset sale — we will notify you of any change in ownership.</li>
        </ul>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>5. Data Security</h3>
        <p>We implement industry‑standard administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>6. Your Data Protection Rights</h3>
        <p>Depending on your location, you may have certain rights regarding your personal information:</p>
        <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Rectification:</strong> Correct inaccurate or incomplete information.</li>
          <li><strong>Erasure:</strong> Request deletion of your personal data under certain conditions.</li>
          <li><strong>Restriction:</strong> Ask us to limit processing of your data.</li>
          <li><strong>Portability:</strong> Receive your data in a structured, machine‑readable format.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the details below. We will respond within a reasonable timeframe and as required by law.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>7. Third‑Party Links</h3>
        <p>Our website may contain links to external sites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third‑party sites. We encourage you to review their privacy policies before providing any personal information.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>8. Children’s Privacy</h3>
        <p>Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us, and we will take steps to remove that information.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>9. Changes to This Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes become effective immediately upon posting.</p>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 0.5rem', color: '#1D1D1F' }}>10. Contact Us</h3>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please reach out:</p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>EliteCrows Infotech</strong><br />
          Email: <a href="mailto:elitecrowsindia@gmail.com" style={{ color: accentBlue, textDecoration: 'none' }}>elitecrowsindia@gmail.com</a><br />
          Phone: <a href="tel:+916383106107" style={{ color: accentBlue, textDecoration: 'none' }}>+91 6383106107</a><br />
          Address: Gobichettipalayam College Pirivu, Gobichettipalayam, Tamil Nadu 638453, India
        </p>

        <p style={{ marginTop: '2rem', borderTop: '1px solid #E5E5E7', paddingTop: '1rem', fontSize: '12px', color: '#86868B' }}>
          Last Updated: March 2026
        </p>
      </Modal>
    </>
  )
}
