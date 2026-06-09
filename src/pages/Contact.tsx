import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, CheckCircle, Sparkles, Shield, Star, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import emailjs from '@emailjs/browser'

const contactInfo = [
  { icon: Mail, color: '#0071E3', bg: '#EAF3FF', title: 'Email', details: ['info@elitecrows.com', 'elitecrowsindia@gmail.com'] },
  { icon: Phone, color: '#34C759', bg: '#EDFBF1', title: 'Phone', details: ['+91 6383106107'] },
  { icon: MapPin, color: '#FF3B30', bg: '#FFF0EF', title: 'Service Area', details: ['All Over Tamil Nadu', 'Remote Services Worldwide'] },
  { icon: Clock, color: '#FF9500', bg: '#FFF5E6', title: 'Business Hours', details: ['Mon – Sat: 9 AM – 6 PM', 'Sunday: Closed'] },
]

const services = [
  'Web Development', 'Software Development', 'Digital Marketing / SEO',
  'Cloud Services', 'AI & Automation', 'Cybersecurity', 'Other',
]

const faqs = [
  { q: 'How quickly can you start on my project?', a: 'We typically begin within 48 hours of signing the agreement. For urgent projects, we can start as early as the same day.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Absolutely. Every project comes with 30 days of free support, and we offer flexible maintenance plans for long-term peace of mind.' },
  { q: 'Can you work with my existing tech stack?', a: 'Yes – we’re language‑ and platform‑agnostic. Our team adapts to your current tools and infrastructure.' },
  { q: 'What information do you need to provide a quote?', a: 'A brief description of your project goals, timeline, and any specific requirements. Use the form above to get a free estimate.' },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([])

  // Generate particles client-side only (to avoid SSR mismatch)
  useEffect(() => {
    const newParticles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  // Structured data for ContactPage
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact EliteCrows | Get a Free Consultation",
      "description": "Contact EliteCrows for custom software development, AI solutions, cloud services, digital marketing, and cybersecurity. Free quote within 24 hours.",
      "url": "https://elitecrows.com/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "EliteCrows Infotech",
        "url": "https://elitecrows.com",
        "email": "info@elitecrows.com",
        "telephone": "+916383106107",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+916383106107",
          "contactType": "customer service",
          "availableLanguage": ["English", "Tamil"]
        }
      }
    })
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    emailjs.sendForm('service_2r7ddha', 'template_hlrd256', formRef.current!, 'WZawqmV08XgvK1Pkd')
      .then(() => { setSuccess(true); setLoading(false); formRef.current!.reset() })
      .catch((err) => { console.error(err); setLoading(false); alert('Something went wrong. Please try again.') })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    fontSize: '15px',
    fontFamily: 'inherit',
    background: '#F9F9FB',
    border: '1px solid #E5E5E7',
    borderRadius: '12px',
    color: '#1D1D1F',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    appearance: 'none',
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Contact EliteCrows | Free Consultation for Web, AI, Cloud & SEO</title>
        <meta name="description" content="Ready to scale your business? Contact EliteCrows for custom web development, SEO, cloud services, AI automation, and cybersecurity. Free consultation – get a quote within 24 hours." />
        <meta name="keywords" content="contact software company, web development consultation, AI solutions quote, cloud services contact, digital marketing agency, cybersecurity experts, EliteCrows contact" />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elitecrows.com/contact" />
        
        <meta property="og:title" content="Contact EliteCrows – Start Your Project Today" />
        <meta property="og:description" content="Get a free quote for web development, AI, cloud, SEO, and cybersecurity. Our team responds within 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.com/contact" />
        <meta property="og:image" content="https://elitecrows.com/contact-og.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EliteCrows – Free Consultation & Quote" />
        <meta name="twitter:description" content="Reach out to EliteCrows for custom software, AI, cloud, and digital marketing solutions. Serving Tamil Nadu and worldwide." />
      </Helmet>

      <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* ─── PREMIUM HERO BANNER (Fully Responsive) ─── */}
        <section className="contact-hero"
          style={{
            position: 'relative',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)',
            padding: '120px 0 100px',
          }}
        >
          {/* Responsive animated orbs */}
          <motion.div
            animate={{ x: [0, 80, 0, -80, 0], y: [0, -40, 0, 40, 0], scale: [1, 1.15, 1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '10%', right: '5%',
              width: 'min(350px, 40vw)', height: 'min(350px, 40vw)',
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(0,198,255,0.03) 50%, transparent 70%)',
              filter: 'blur(50px)', pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ x: [0, -60, 0, 60, 0], y: [0, 50, 0, -50, 0], scale: [1, 1.2, 1, 1.1, 1] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '10%', left: '5%',
              width: 'min(300px, 35vw)', height: 'min(300px, 35vw)',
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(175,82,222,0.06) 0%, rgba(0,113,227,0.02) 60%, transparent 80%)',
              filter: 'blur(50px)', pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ x: [0, 50, 0, -50, 0], y: [0, -30, 0, 30, 0], scale: [1, 1.1, 1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '50%', left: '30%',
              width: 'min(250px, 30vw)', height: 'min(250px, 30vw)',
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,149,0,0.05) 0%, rgba(255,179,71,0.02) 60%, transparent 80%)',
              filter: 'blur(50px)', pointerEvents: 'none',
            }}
          />

          {/* Client-side floating particles */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: `${p.x}%`, y: `${p.y}%` }}
              animate={{
                y: [`${p.y}%`, `${p.y - 15}%`, `${p.y - 30}%`],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
              style={{
                position: 'absolute', width: '2px', height: '2px',
                background: `rgba(0, 113, 227, 0.3)`,
                borderRadius: '50%', pointerEvents: 'none',
              }}
            />
          ))}

          {/* Hero text content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '8px 20px', background: 'rgba(0, 113, 227, 0.08)',
                backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 113, 227, 0.15)',
                borderRadius: '100px', marginBottom: '32px',
              }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Sparkles size={16} color="#0071E3" />
              </motion.div>
              <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#0071E3', letterSpacing: '0.5px' }}>NO OBLIGATION — FREE QUOTE</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 style={{ fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '28px' }}>
                Let's Start a{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #0071E3, #00C6FF, #AF52DE)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  position: 'relative', display: 'inline-block'
                }}>
                  Conversation
                  <motion.div
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', bottom: '-12px', left: 0, height: '3px',
                      background: 'linear-gradient(90deg, transparent, #0071E3, #00C6FF, transparent)',
                      borderRadius: '3px',
                    }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: '#6B7280', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                Tell us about your project — we’ll craft a tailored solution and get back to you within 24 hours. Free consultation for web development, AI, cloud, SEO, and cybersecurity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,113,227,0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', boxShadow: '0 5px 20px rgba(0,113,227,0.15)', minHeight: '48px' }}
              >
                Get Free Quote <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="tel:+916383106107"
                whileHover={{ scale: 1.05, background: 'rgba(0,113,227,0.05)', borderColor: 'rgba(0,113,227,0.3)' }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'white', color: '#0071E3', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', border: '1px solid rgba(0,113,227,0.2)', minHeight: '48px' }}
              >
                Call Us Now <Phone size={18} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ─── CONTACT INFO CARDS – EQUAL SIZE (FIXED) ─── */}
        <section className="contact-info-section" style={{ background: '#F9CD05', padding: '80px 0' }}>
          <div className="container">
            <div className="contact-cards-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '28px',
              alignItems: 'stretch'
            }}>
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '24px',
                      padding: 'clamp(24px, 5vw, 32px) clamp(20px, 4vw, 24px)',
                      textAlign: 'center',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '18px',
                      background: info.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}>
                      <Icon size={24} color={info.color} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '12px' }}>
                      {info.title}
                    </h3>
                    {info.details.map((d, di) => (
                      <p key={di} style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#6B7280', lineHeight: 1.6, marginBottom: di === info.details.length - 1 ? 0 : 6 }}>
                        {d}
                      </p>
                    ))}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── FORM + TRUST SECTION (Responsive 2‑column) ─── */}
        <section id="contact-form" className="contact-form-section" style={{ padding: '80px 0', background: '#F5F5F7' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
              {/* Left: Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={{
                  background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.05)', overflow: 'hidden',
                }}>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px) clamp(20px, 5vw, 40px) 24px', borderBottom: '1px solid #E5E5E7', background: '#F9F9FB' }}>
                    <span className="badge" style={{ marginBottom: '14px' }}>Get a Quote</span>
                    <h2 style={{ fontSize: 'clamp(24px, 5vw, 28px)', color: '#1D1D1F', marginBottom: '6px' }}>Tell Us About Your Project</h2>
                    <p style={{ color: '#6B7280', fontSize: '14px' }}>We’ll respond within 24 hours.</p>
                  </div>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px) clamp(20px, 5vw, 40px) 40px' }}>
                    {success ? (
                      <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <CheckCircle size={56} color="#34C759" strokeWidth={1.5} />
                        <h3 style={{ fontSize: 'clamp(22px, 4vw, 24px)', fontWeight: 600, color: '#1D1D1F' }}>Message Sent!</h3>
                        <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '280px' }}>
                          Thank you for reaching out. One of our experts will contact you shortly.
                        </p>
                      </div>
                    ) : (
                      <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Full Name *</label>
                            <input name="name" required placeholder="Your name" style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Email *</label>
                            <input name="email" required type="email" placeholder="you@company.com" style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Phone *</label>
                          <input name="phone" required placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Service Needed *</label>
                          <select name="service" required style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2386868B' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '40px' }}>
                            <option value="">Select a service</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Budget Range (optional)</label>
                          <select name="budget" style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2386868B' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '40px' }}>
                            <option value="">Select budget (optional)</option>
                            <option>Under ₹25,000</option>
                            <option>₹25,000 – ₹1,00,000</option>
                            <option>₹1,00,000 – ₹5,00,000</option>
                            <option>Above ₹5,00,000</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Project Details *</label>
                          <textarea name="message" required placeholder="Describe your project, goals, timeline..." rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} />
                        </div>
                        <button type="submit" disabled={loading} style={{ padding: '14px 20px', fontSize: '16px', justifyContent: 'center', marginTop: '8px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s', minHeight: '52px' }}>
                          {loading ? 'Sending...' : (<>Send Message <Send size={16} /></>)}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right: Trust Signals & FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="trust-card" style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', padding: 'clamp(24px, 5vw, 32px)', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <Shield size={28} color="#0071E3" />
                    <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700, color: '#1D1D1F' }}>Why businesses trust EliteCrows</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { icon: Star, text: '150+ successful projects delivered across industries', color: '#FF9500' },
                      { icon: Clock, text: '24–48 hour response time – guaranteed', color: '#34C759' },
                      { icon: Shield, text: '100% confidentiality & IP protection', color: '#AF52DE' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: `${item.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <item.icon size={18} color={item.color} />
                        </div>
                        <span style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', color: '#1D1D1F' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-card" style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', padding: 'clamp(24px, 5vw, 32px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <HelpCircle size={28} color="#0071E3" />
                    <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700, color: '#1D1D1F' }}>Frequently Asked Questions</h3>
                  </div>
                  {faqs.map((faq, idx) => (
                    <div key={idx} style={{ borderBottom: idx !== faqs.length - 1 ? '1px solid #E5E5E7' : 'none', marginBottom: idx !== faqs.length - 1 ? 16 : 0 }}>
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '16px 0 12px', cursor: 'pointer', textAlign: 'left', minHeight: '48px' }}
                      >
                        <span style={{ fontSize: 'clamp(14px, 3vw, 15px)', fontWeight: 600, color: '#1D1D1F' }}>{faq.q}</span>
                        {openFaq === idx ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
                      </button>
                      {openFaq === idx && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} style={{ paddingBottom: '20px' }}>
                          <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#6B7280', lineHeight: 1.6 }}>{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Location note */}
                <div className="location-note" style={{ marginTop: '32px', background: '#F9F9FB', borderRadius: '24px', padding: 'clamp(16px, 4vw, 20px)', textAlign: 'center', border: '1px solid #E5E5E7' }}>
                  <MapPin size={20} color="#0071E3" style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#6B7280' }}>Serving Tamil Nadu & remote clients worldwide</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GLOBAL RESPONSIVE STYLES */}
        <style>{`
          .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
          }
          @media (min-width: 1920px) {
            .container {
              max-width: 1600px;
            }
          }
          
          /* Contact cards responsiveness – equal size on all screens */
          @media (max-width: 1024px) {
            .contact-cards-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            .contact-cards-grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          /* Form & layout responsiveness */
          @media (max-width: 767px) {
            .contact-hero {
              padding: 80px 0 60px !important;
            }
            .contact-info-section {
              padding: 60px 0 !important;
            }
            .contact-form-section {
              padding: 60px 0 !important;
            }
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            .form-row {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .contact-hero {
              padding: 100px 0 80px !important;
            }
            .contact-info-section {
              padding: 70px 0 !important;
            }
            .contact-form-section {
              padding: 70px 0 !important;
            }
            .contact-grid {
              gap: 36px !important;
            }
          }
          
          /* Touch-friendly */
          button, a, [role="button"] {
            touch-action: manipulation;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
          
          .badge {
            display: inline-block;
            padding: 6px 14px;
            background: rgba(0,113,227,0.08);
            border-radius: 100px;
            font-size: 13px;
            font-weight: 600;
            color: #0071E3;
          }
        `}</style>
      </div>
    </>
  )
}