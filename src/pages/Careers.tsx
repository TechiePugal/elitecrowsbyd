import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { TrendingUp, Users, Award, Lightbulb, ArrowRight, Send, CheckCircle, Sparkles, Rocket, Clock, Star, Shield, HelpCircle, ChevronDown, ChevronUp, MapPin, GraduationCap, Calendar } from 'lucide-react'
import emailjs from '@emailjs/browser'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// SEO-optimized benefits data
const benefits = [
  { icon: TrendingUp, color: '#0071E3', bg: '#EAF3FF', title: 'Skill Growth', desc: 'Hands‑on experience with modern tech stacks and real-world projects that build your portfolio.' },
  { icon: Users, color: '#34C759', bg: '#EDFBF1', title: 'Expert Mentorship', desc: 'Learn from industry professionals who guide you at every step of your learning journey.' },
  { icon: Award, color: '#FF9500', bg: '#FFF5E6', title: 'Certificate & LOR', desc: 'Receive a completion certificate and a detailed performance letter for your career.' },
  { icon: Lightbulb, color: '#AF52DE', bg: '#F5EDFF', title: 'Flexible Duration', desc: 'Choose from 7 days, 15 days, 1 month, or 3 months — as per your availability and goals.' },
]

const internshipAreas = [
  'Web Development', 'Software Development', 'AI / Machine Learning',
  'Cloud & DevOps', 'Digital Marketing & SEO', 'Cybersecurity'
]

const durationOptions = ['7 Days', '15 Days', '1 Month', '3 Months']

const faqs = [
  { q: 'What are the available internship durations?', a: 'We offer flexible durations: 7 days, 15 days, 1 month, or 3 months. You can choose based on your schedule and learning objectives.' },
  { q: 'Is the internship certificate provided?', a: 'Yes, every intern receives a completion certificate and a detailed performance letter upon successful completion.' },
  { q: 'Are internships remote or on‑site?', a: 'We offer both remote and hybrid options. Our office is in Gobichettipalayam College Pirivu, Tamil Nadu, but we welcome talent from anywhere in India and globally.' },
  { q: 'What is the selection process?', a: 'We evaluate your application, followed by a short technical discussion. No strict CGPA requirements — passion and willingness to learn matter more.' },
  { q: 'Can I extend my internship duration?', a: 'Absolutely. You can start with a shorter duration and extend based on mutual agreement and performance.' },
]

export default function Careers() {
  const [formType, setFormType] = useState('internship')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([])

  // Generate particles client-side only
  useEffect(() => {
    const newParticles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  // Structured data for JobPosting and Organization
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EliteCrows Infotech",
      "url": "https://elitecrows.com/careers",
      "description": "Flexible internship programs in IT, software development, AI, cloud computing, digital marketing, and cybersecurity. Durations: 7 days, 15 days, 1 month, or 3 months.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gobichettipalayam College Pirivu",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Internship Programs",
        "itemListElement": internshipAreas.flatMap(area => durationOptions.map(duration => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "JobPosting",
            "title": `${area} Intern (${duration})`,
            "description": `Join EliteCrows as a ${area} intern for ${duration}. Gain hands-on project experience, mentorship, and a certificate. Flexible remote or hybrid work.`,
            "employmentType": "INTERN",
            "workHours": "Flexible",
            "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Gobichettipalayam College Pirivu", "addressRegion": "Tamil Nadu", "addressCountry": "IN" } }
          }
        })))
      }
    })
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    emailjs.sendForm('service_y9gjftz', 'template_zsg7n2p', formRef.current!, 'WZawqmV08XgvK1Pkd')
      .then(() => { setSuccess(true); setLoading(false); formRef.current!.reset(); setSelectedDuration('') })
      .catch((err) => { console.error(err); setLoading(false); alert('Submission failed. Please try again.') })
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
        <title>Internships at EliteCrows | Flexible 7 Days to 3 Months – Apply Now</title>
        <meta name="description" content="Apply for internships in web development, AI, cloud, digital marketing & more at EliteCrows. Choose from 7 days, 15 days, 1 month, or 3 months. Get certified and gain real project experience. Remote/onsite." />
        <meta name="keywords" content="internship, software development internship, web development internship, AI internship, cloud internship, digital marketing internship, cybersecurity internship, flexible duration internship, certificate internship" />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elitecrows.com/careers" />
        
        <meta property="og:title" content="Internships at EliteCrows – Flexible Duration, Real Projects" />
        <meta property="og:description" content="Kickstart your career with hands-on internships in tech. Durations: 7 days to 3 months. Certificate & mentorship included." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.com/careers" />
        <meta property="og:image" content="https://elitecrows.com/careers-og.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EliteCrows Internships – Build Your Future With Us" />
        <meta name="twitter:description" content="Flexible internships in web dev, AI, cloud, digital marketing, and cybersecurity. Apply today!" />
      </Helmet>

      <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* ─── PREMIUM HERO BANNER (Responsive) ─── */}
        <section className="careers-hero"
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
          {/* Animated Orbs - Responsive */}
          <motion.div
            animate={{ x: [0, 80, 0, -80, 0], y: [0, -40, 0, 40, 0], scale: [1, 1.15, 1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '10%', right: '5%', width: 'min(350px, 40vw)', height: 'min(350px, 40vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(0,198,255,0.03) 50%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }}
          />
          <motion.div
            animate={{ x: [0, -60, 0, 60, 0], y: [0, 50, 0, -50, 0], scale: [1, 1.2, 1, 1.1, 1] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '10%', left: '5%', width: 'min(300px, 35vw)', height: 'min(300px, 35vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(175,82,222,0.06) 0%, rgba(0,113,227,0.02) 60%, transparent 80%)', filter: 'blur(50px)', pointerEvents: 'none' }}
          />
          <motion.div
            animate={{ x: [0, 50, 0, -50, 0], y: [0, -30, 0, 30, 0], scale: [1, 1.1, 1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '50%', left: '30%', width: 'min(250px, 30vw)', height: 'min(250px, 30vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,149,0,0.05) 0%, rgba(255,179,71,0.02) 60%, transparent 80%)', filter: 'blur(50px)', pointerEvents: 'none' }}
          />

          {/* Floating Particles - Client-side only */}
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
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: `rgba(0, 113, 227, 0.3)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Main Content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(0, 113, 227, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 113, 227, 0.15)', borderRadius: '100px', marginBottom: '32px' }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Sparkles size={16} color="#0071E3" />
              </motion.div>
              <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#0071E3', letterSpacing: '0.5px' }}>FLEXIBLE DURATION – 7 DAYS TO 3 MONTHS</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 style={{ fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '28px' }}>
                Build Your Future{' '}
                <span style={{ background: 'linear-gradient(135deg, #0071E3, #00C6FF, #AF52DE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', display: 'inline-block' }}>
                  With Us
                  <motion.div
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    style={{ position: 'absolute', bottom: '-12px', left: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #0071E3, #00C6FF, transparent)', borderRadius: '3px' }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: '#6B7280', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                Launch your tech career with EliteCrows. Choose your own duration — 7 days, 15 days, 1 month, or 3 months. Work on real projects, get certified, and learn from industry experts. Remote or hybrid options available.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a href="#application-form" whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,113,227,0.2)' }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', boxShadow: '0 5px 20px rgba(0,113,227,0.15)', minHeight: '48px' }}>
                Apply Now <ArrowRight size={18} />
              </motion.a>
              <motion.a href="#faq" whileHover={{ scale: 1.05, background: 'rgba(0,113,227,0.05)', borderColor: 'rgba(0,113,227,0.3)' }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'white', color: '#0071E3', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', border: '1px solid rgba(0,113,227,0.2)', minHeight: '48px' }}>
                Learn More <ChevronDown size={18} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ─── BENEFITS CARDS (YELLOW BACKGROUND) ─── */}
        <section className="benefits-section" style={{ background: '#F9CD05', padding: '80px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="badge" style={{ marginBottom: '16px', background: '#1D1D1F', color: '#F9CD05', display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: 600 }}>Why Join Us</span>
              <h2 style={{ color: '#1D1D1F', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700 }}>Where Talent <span style={{ color: '#FFFFFF' }}>Grows</span></h2>
              <p style={{ color: '#1D1D1F', maxWidth: '500px', margin: '16px auto 0', opacity: 0.8, fontSize: 'clamp(14px, 3vw, 16px)' }}>Gain practical skills, build your network, and accelerate your career.</p>
            </div>
            <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', justifyContent: 'center' }}>
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <motion.div whileHover={{ y: -6 }} style={{ background: '#FFFFFF', borderRadius: '24px', padding: 'clamp(24px, 5vw, 32px) clamp(20px, 4vw, 28px)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center', height: '100%' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Icon size={24} color={b.color} strokeWidth={1.5} />
                      </div>
                      <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px' }}>{b.title}</h3>
                      <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#6B7280', lineHeight: 1.6 }}>{b.desc}</p>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── INTERNSHIP AREAS (WHITE BACKGROUND) ─── */}
        <section className="areas-section" style={{ background: '#FFFFFF', padding: '80px 0' }}>
          <div className="container">
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span className="badge" style={{ marginBottom: '16px' }}>Open Positions</span>
                <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#1D1D1F' }}>Internship <span style={{ color: '#0071E3' }}>Areas</span></h2>
                <p style={{ color: '#6B7280', maxWidth: '500px', margin: '16px auto 0', fontSize: 'clamp(14px, 3vw, 16px)' }}>Choose your domain and start building real‑world skills with industry‑relevant projects</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="areas-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
                {internshipAreas.map((area, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02, y: -3 }} style={{ padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 24px)', borderRadius: '100px', background: '#F5F5F7', border: '1px solid #E5E5E7', fontSize: 'clamp(13px, 2.5vw, 15px)', fontWeight: 500, color: '#1D1D1F', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <GraduationCap size={16} color="#0071E3" />
                    {area}
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── APPLICATION FORM + TRUST/FAQ (Responsive Grid) ─── */}
        <section id="application-form" className="form-section" style={{ background: '#F5F5F7', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
              {/* Left: Form */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px) clamp(20px, 5vw, 40px) 24px', borderBottom: '1px solid #E5E5E7', background: '#F9F9FB' }}>
                    <span className="badge" style={{ marginBottom: '14px' }}>Apply Now</span>
                    <h2 style={{ fontSize: 'clamp(24px, 5vw, 28px)', color: '#1D1D1F', marginBottom: '8px' }}>Start Your Application</h2>
                    <p style={{ color: '#6B7280', fontSize: '14px' }}>We'll respond within 48 hours.</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                      {['internship', 'fulltime'].map(type => (
                        <button key={type} onClick={() => setFormType(type)} style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, minHeight: '44px', border: '1px solid', borderColor: formType === type ? '#0071E3' : '#E5E5E7', background: formType === type ? 'rgba(0,113,227,0.08)' : '#FFFFFF', color: formType === type ? '#0071E3' : '#86868B', cursor: 'pointer', transition: 'all 0.2s' }}>
                          {type === 'internship' ? '🎓 Internship' : '💼 Full-time Role'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px) clamp(20px, 5vw, 40px) 40px' }}>
                    {success ? (
                      <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <CheckCircle size={56} color="#34C759" strokeWidth={1.5} />
                        <h3 style={{ fontSize: 'clamp(22px, 4vw, 24px)', fontWeight: 600, color: '#1D1D1F' }}>Application Submitted!</h3>
                        <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '280px' }}>Our team will review your profile and contact you soon.</p>
                      </div>
                    ) : (
                      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input type="hidden" name="form_type" value={formType} />
                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Full Name *</label>
                            <input name="name" required placeholder="Your name" style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Email *</label>
                            <input name="email" required type="email" placeholder="you@email.com" style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Phone *</label>
                          <input name="phone" required placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Area of Interest *</label>
                          <select name="area" required style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2386868B' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '40px' }}>
                            <option value="">Select area</option>
                            {internshipAreas.map(a => <option key={a} value={a}>{a}</option>)}
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Preferred Duration *</label>
                          <select name="duration" required value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)} style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2386868B' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '40px' }}>
                            <option value="">Select duration</option>
                            {durationOptions.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Resume / Portfolio Link (optional)</label>
                          <input name="resume" placeholder="Google Drive, LinkedIn, or personal website" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>Why do you want to join EliteCrows? *</label>
                          <textarea name="message" required placeholder="Tell us about your skills, passion, and what you hope to learn..." rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} />
                        </div>
                        <button type="submit" disabled={loading} style={{ padding: '14px 20px', fontSize: '16px', justifyContent: 'center', marginTop: '8px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s', minHeight: '52px' }}>
                          {loading ? 'Submitting...' : (<>Submit Application <Send size={16} /></>)}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right: Trust & FAQ */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="trust-card" style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', padding: 'clamp(24px, 5vw, 32px)', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <Shield size={28} color="#0071E3" />
                    <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700, color: '#1D1D1F' }}>Why students choose EliteCrows</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { icon: Calendar, text: 'Flexible durations: 7 days / 15 days / 1 month / 3 months', color: '#FF9500' },
                      { icon: Clock, text: 'Choose your own start date & work remotely or hybrid', color: '#34C759' },
                      { icon: Award, text: 'Certificate & Letter of Recommendation included', color: '#AF52DE' },
                      { icon: Users, text: 'Mentorship from industry experts with 10+ years experience', color: '#0071E3' },
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
                <div id="faq" className="faq-card" style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', padding: 'clamp(24px, 5vw, 32px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <HelpCircle size={28} color="#0071E3" />
                    <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700, color: '#1D1D1F' }}>Frequently Asked Questions</h3>
                  </div>
                  {faqs.map((faq, idx) => (
                    <div key={idx} style={{ borderBottom: idx !== faqs.length - 1 ? '1px solid #E5E5E7' : 'none', marginBottom: idx !== faqs.length - 1 ? 16 : 0 }}>
                      <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '16px 0 12px', cursor: 'pointer', textAlign: 'left', minHeight: '48px' }}>
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

                {/* Location footer */}
                <div className="location-card" style={{ marginTop: '32px', background: '#F9F9FB', borderRadius: '24px', padding: 'clamp(16px, 4vw, 20px)', textAlign: 'center', border: '1px solid #E5E5E7' }}>
                  <MapPin size={20} color="#0071E3" style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#6B7280' }}>📍 Gobichettipalayam College Pirivu, Tamil Nadu — Remote positions also available for candidates across India</p>
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
          
          /* Responsive section paddings */
          @media (max-width: 767px) {
            .careers-hero {
              padding: 80px 0 60px !important;
            }
            .benefits-section {
              padding: 60px 0 !important;
            }
            .areas-section {
              padding: 60px 0 !important;
            }
            .form-section {
              padding: 60px 0 !important;
            }
            .form-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            .form-row {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            .benefits-grid {
              gap: 20px !important;
            }
            .areas-chips {
              gap: 10px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .careers-hero {
              padding: 100px 0 80px !important;
            }
            .benefits-section {
              padding: 70px 0 !important;
            }
            .areas-section {
              padding: 70px 0 !important;
            }
            .form-section {
              padding: 70px 0 !important;
            }
            .form-grid {
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