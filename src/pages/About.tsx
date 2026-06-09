import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Target, Eye, Heart, Users, Lightbulb, Zap, ArrowRight, ExternalLink, Sparkles, Award, Globe, Star, Linkedin, ChevronRight, Rocket, Shield, Cpu, TrendingUp } from 'lucide-react'

/* ─── LIGHT THEME PREMIUM HERO BANNER (Fully Responsive) ─── */
function HeroBanner() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate particles only on client side with percentage-based positions
    const newParticles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100, // percentage
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)',
      }}
    >
      {/* Floating Animated Orbs - Responsive sizing */}
      <motion.div
        animate={{
          x: [0, 80, 0, -80, 0],
          y: [0, -40, 0, 40, 0],
          scale: [1, 1.15, 1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'min(350px, 40vw)',
          height: 'min(350px, 40vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(0,198,255,0.03) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{
          x: [0, -60, 0, 60, 0],
          y: [0, 50, 0, -50, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 'min(300px, 35vw)',
          height: 'min(300px, 35vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(175,82,222,0.06) 0%, rgba(0,113,227,0.02) 60%, transparent 80%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 1.1, 1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          width: 'min(250px, 30vw)',
          height: 'min(250px, 30vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,149,0,0.05) 0%, rgba(255,179,71,0.02) 60%, transparent 80%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Particles - Client-side only with percentages */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: `${p.x}%`, y: `${p.y}%` }}
          animate={{
            y: [`${p.y}%`, `${p.y - 15}%`, `${p.y - 30}%`],
            opacity: [0, 0.5, 0],
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

      {/* Floating Icons - Responsive size */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '20%', left: '12%', opacity: 0.06, pointerEvents: 'none', display: 'none', '@media (min-width: 768px)': { display: 'block' } }}
      >
        <Sparkles size={60} color="#0071E3" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '25%', right: '10%', opacity: 0.06, pointerEvents: 'none', display: 'none', '@media (min-width: 768px)': { display: 'block' } }}
      >
        <Globe size={55} color="#00C6FF" />
      </motion.div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 20px',
            background: 'rgba(0, 113, 227, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 113, 227, 0.15)',
            borderRadius: '100px',
            marginBottom: '32px',
            cursor: 'pointer',
          }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <Sparkles size={16} color="#0071E3" />
          </motion.div>
          <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#0071E3', letterSpacing: '0.5px' }}>EST. 2023 — INNOVATION SINCE DAY ONE</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 style={{ fontSize: 'clamp(42px, 8vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '24px' }}>
            <span style={{ color: '#1D1D1F' }}>About </span>
            <span style={{ background: 'linear-gradient(135deg, #0071E3, #00C6FF, #AF52DE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', display: 'inline-block' }}>
              EliteCrows
              <motion.div
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: '-10px', left: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #0071E3, #00C6FF, transparent)', borderRadius: '3px' }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#6B7280', maxWidth: '680px', margin: '0 auto 40px', lineHeight: 1.6, fontWeight: 400 }}>
            EliteCrows Infotech — delivering enterprise-grade software development, AI solutions, cloud integration, and digital marketing since 2023. Trusted by 75+ businesses globally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,113,227,0.2)' }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', boxShadow: '0 5px 20px rgba(0,113,227,0.15)', minHeight: '48px' }}
          >
            Start a Project <Rocket size={18} />
          </motion.a>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05, background: 'rgba(0,113,227,0.05)', borderColor: 'rgba(0,113,227,0.3)' }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'white', color: '#0071E3', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', border: '1px solid rgba(0,113,227,0.2)', minHeight: '48px' }}
          >
            Explore Services <ChevronRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Reveal animation wrapper ─── */
function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 30 : 0, x: direction === "left" ? -30 : direction === "right" ? 30 : 0, scale: direction === "up" ? 0.98 : 1 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] } }
  }
  return <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>{children}</motion.div>
}

/* ─── Professional Core Values Component (Responsive) ─── */
function CoreValues() {
  const values = [
    { icon: Lightbulb, title: 'Innovation First', description: 'We constantly explore emerging technologies like generative AI, edge computing, and Web3 to deliver cutting-edge solutions that keep you ahead of the curve.', color: '#FF9500', bg: '#FFF5E6' },
    { icon: Shield, title: 'Integrity & Trust', description: 'Transparency, ethical practices, and honesty form the foundation of every client relationship and business decision we make.', color: '#34C759', bg: '#EDFBF1' },
    { icon: Heart, title: 'Excellence in Execution', description: 'We strive for perfection in every line of code, every design pixel, and every interaction with our clients — no compromises.', color: '#FF3B30', bg: '#FFF0EF' },
    { icon: Users, title: 'Collaborative Partnership', description: 'Your success is our success. We work as a seamless extension of your team, ensuring aligned goals and shared victories.', color: '#0071E3', bg: '#EAF3FF' },
    { icon: Cpu, title: 'Agile & Adaptive', description: 'Fast, responsive, and iterative — we pivot quickly to meet changing market demands and evolving client needs.', color: '#AF52DE', bg: '#F5EAFB' },
    { icon: TrendingUp, title: 'Growth Mindset', description: 'We are committed to continuous improvement, helping our clients scale with confidence through data-driven strategies.', color: '#34C759', bg: '#EDFBF1' }
  ]

  return (
    <section className="core-values-section" style={{ padding: '100px 0', background: '#FFFFFF' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,113,227,0.1)', borderRadius: '100px', marginBottom: '20px' }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0071E3' }}>What Drives Us</span>
            </motion.div>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1D1D1F' }}>
              Our Core <span style={{ background: 'linear-gradient(135deg, #0071E3, #00C6FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Values</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: 'clamp(15px, 3vw, 18px)', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.6 }}>
              The principles that guide our work, shape our culture, and define our commitment to your success.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Reveal key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -12, transition: { duration: 0.2 } }}
                  style={{
                    background: 'white',
                    borderRadius: '28px',
                    padding: 'clamp(24px, 4vw, 32px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px, 3vw, 20px)', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '18px',
                        background: value.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={28} color={value.color} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <div style={{ fontSize: 'clamp(20px, 4vw, 22px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px' }}>{value.title}</div>
                      <div style={{ width: '40px', height: '3px', background: `linear-gradient(90deg, ${value.color}, transparent)`, borderRadius: '3px' }} />
                    </div>
                  </div>
                  <p style={{ fontSize: 'clamp(14px, 2.5vw, 15px)', color: '#6B7280', lineHeight: 1.7, marginLeft: '0' }}>{value.description}</p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Leadership Card Component (Responsive) ─── */
function LeadershipCard({ member, index }: { member: any; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div style={{
        background: 'white',
        borderRadius: '28px',
        padding: 'clamp(32px, 5vw, 40px) clamp(20px, 4vw, 32px)',
        textAlign: 'center',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        height: '100%',
      }}>
        <motion.div whileHover={{ scale: 1.02 }} style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
          <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: `linear-gradient(135deg, ${member.gradientStart}, ${member.gradientEnd})`, opacity: 0.3 }} />
          <img
            src={member.img}
            alt={`${member.name} – ${member.role} at EliteCrows`}
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', position: 'relative', maxWidth: '100%' }}
            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=${member.gradientStart.replace('#', '')}&color=fff&size=120` }}
          />
        </motion.div>
        <h3 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px', letterSpacing: '-0.02em' }}>{member.name}</h3>
        <div style={{ display: 'inline-block', marginBottom: '20px' }}>
          <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, background: `linear-gradient(135deg, ${member.gradientStart}, ${member.gradientEnd})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{member.role}</span>
        </div>
        <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#6B7280', lineHeight: 1.7, marginBottom: '28px', padding: '0 8px' }}>{member.bio}</p>
        <motion.a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: `linear-gradient(135deg, ${member.gradientStart}, ${member.gradientEnd})`, color: 'white', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, boxShadow: `0 4px 12px ${member.gradientStart}40`, minHeight: '44px' }}
        >
          <Linkedin size={16} /> Connect on LinkedIn
        </motion.a>
      </div>
    </motion.div>
  )
}

const milestones = [
  { year: '2023', title: 'Company Founded', desc: 'EliteCrows Infotech was established with a mission to transform digital experiences through custom software and AI-driven solutions.', icon: Star },
  { year: '2024', title: '100+ Projects Delivered', desc: 'Reached milestone of 100+ successful project deliveries across e-commerce, healthcare, fintech, and manufacturing sectors.', icon: Award },
  { year: '2025', title: 'Global Footprint', desc: 'Expanded operations to serve 75+ clients across 15+ countries worldwide, including USA, UK, UAE, and Singapore.', icon: Globe },
  { year: '2026', title: 'AI Innovation Hub', desc: 'Launched dedicated AI research and development center specializing in generative AI, computer vision, and predictive analytics.', icon: Sparkles },
]

const leadershipTeam = [
  { img: '/HOO.jpeg', name: 'Pugal', role: 'Head of Operations', gradientStart: '#0071E3', gradientEnd: '#00C6FF', bio: 'Visionary leader driving operational excellence and digital transformation with over a decade of experience in enterprise technology and process optimization.', linkedin: 'https://www.linkedin.com/in/techiepugal/' },
  { img: '/HOB.jpeg', name: 'Dharanish', role: 'Head of Business', gradientStart: '#FF9500', gradientEnd: '#FFB347', bio: 'Strategic business leader focused on growth, client partnerships, and delivering value-driven solutions that align technology with business goals globally.', linkedin: 'https://www.linkedin.com/in/dharanish-azhagesan-859797253/' },
]

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About EliteCrows Infotech – Custom Software & AI Company',
    description: 'Learn about EliteCrows Infotech, a leading software development and AI solutions provider founded in 2023. We deliver enterprise-grade web applications, cloud integration, and digital marketing services.',
    url: 'https://elitecrows.com/about',
    isPartOf: {
      '@type': 'Organization',
      name: 'EliteCrows Infotech',
      foundingDate: '2023',
      numberOfEmployees: 75,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN'
      },
      knowsAbout: ['Custom Software Development', 'AI Chatbots', 'Cloud Integration', 'SEO Optimization', 'Web Development', 'Digital Transformation']
    }
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>About EliteCrows | Custom Software & AI Development Company</title>
        <meta name="description" content="EliteCrows Infotech – founded in 2023, we deliver enterprise-grade software, AI solutions, cloud integration, and digital marketing. 150+ projects, 75+ global clients. Learn our story →" />
        <meta name="keywords" content="about software company, custom software development company, AI solutions provider, web development agency, digital transformation services, EliteCrows Infotech" />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elitecrows.com/about" />
        
        <meta property="og:title" content="About EliteCrows – Enterprise Software & AI Engineering" />
        <meta property="og:description" content="Learn about our mission, vision, and the team behind EliteCrows. We build scalable digital products for forward-thinking businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.com/about" />
        <meta property="og:image" content="https://elitecrows.com/about-og.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About EliteCrows – Custom Software & AI Agency" />
        <meta name="twitter:description" content="Since 2023, EliteCrows has been delivering high-performance web apps, AI chatbots, and cloud solutions. Meet our leadership and values." />
        
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
        <HeroBanner />

        {/* Story Section - Responsive */}
        <section className="story-section" style={{ padding: '100px 0', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
              <Reveal direction="left">
                <div>
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,113,227,0.1)', borderRadius: '100px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0071E3' }}>Our Story</span>
                  </motion.div>
                  <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                    Born from a Passion for <span style={{ background: 'linear-gradient(135deg, #0071E3, #00C6FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Technology</span>
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      'Founded in 2023, EliteCrows Infotech is a next‑generation IT solutions and software development company dedicated to helping businesses grow through technology‑driven innovation.',
                      'We specialize in SEO‑optimized website development, custom software solutions, AI‑powered systems, cloud integration, and scalable enterprise applications that drive measurable results.',
                      'Our approach is centered on performance, reliability, and long‑term partnerships — delivering measurable ROI and accelerating digital transformation for startups, SMEs, and large enterprises.',
                    ].map((p, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ color: '#6B7280', fontSize: 'clamp(15px, 2.5vw, 17px)', lineHeight: 1.75 }}>
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { icon: Target, gradient: 'linear-gradient(135deg, #0071E3, #00C6FF)', bg: 'linear-gradient(135deg, #EAF3FF 0%, #D4E8FF 100%)', title: 'Our Mission', text: 'To empower businesses with reliable, scalable, and innovative technology solutions that drive digital growth, operational efficiency, and competitive advantage.' },
                    { icon: Eye, gradient: 'linear-gradient(135deg, #34C759, #88D66C)', bg: 'linear-gradient(135deg, #EDFBF1 0%, #D4F5E0 100%)', title: 'Our Vision', text: 'To become a globally trusted technology partner recognized for excellence in software development, AI integration, and digital innovation that transforms industries.' },
                  ].map(({ icon: Icon, gradient, bg, title, text }, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }} style={{ background: 'white', borderRadius: '24px', padding: 'clamp(20px, 4vw, 28px)', display: 'flex', gap: 'clamp(16px, 3vw, 20px)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', flexWrap: 'wrap' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={24} color={gradient.includes('0071E3') ? '#0071E3' : '#34C759'} strokeWidth={1.5} />
                      </div>
                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <div style={{ fontSize: 'clamp(18px, 3.5vw, 20px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px' }}>{title}</div>
                        <div style={{ fontSize: 'clamp(14px, 2.5vw, 15px)', color: '#6B7280', lineHeight: 1.65 }}>{text}</div>
                      </div>
                    </motion.div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px' }}>
                    {[
                      { val: '2023', label: 'Founded', gradient: 'linear-gradient(135deg, #0071E3, #00C6FF)' },
                      { val: '150+', label: 'Projects Completed', gradient: 'linear-gradient(135deg, #FF9500, #FFB347)' },
                      { val: '24/7', label: 'Support Available', gradient: 'linear-gradient(135deg, #34C759, #88D66C)' },
                    ].map((item, i) => (
                      <motion.div key={i} whileHover={{ y: -3, scale: 1.02 }} style={{ padding: 'clamp(16px, 4vw, 24px) 12px', borderRadius: '20px', textAlign: 'center', background: '#F9FAFB', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <div style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 700, background: item.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{item.val}</div>
                        <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#6B7280', marginTop: '6px', fontWeight: 500 }}>{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* MILESTONES SECTION WITH #F9CD05 BACKGROUND - Responsive */}
        <section className="milestones-section" style={{ padding: '80px 0', background: '#F9CD05' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    display: 'inline-block', 
                    padding: '6px 16px', 
                    background: 'rgba(0,0,0,0.1)', 
                    borderRadius: '100px', 
                    marginBottom: '20px' 
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F' }}>Our Journey</span>
                </motion.div>
                <h2 style={{ 
                  fontSize: 'clamp(28px, 5vw, 44px)', 
                  fontWeight: 700, 
                  letterSpacing: '-0.03em', 
                  color: '#1D1D1F' 
                }}>
                  Company{' '}
                  <span style={{ background: 'linear-gradient(135deg, #1D1D1F, #333333)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Milestones
                  </span>
                </h2>
                <p style={{ color: '#4B5563', fontSize: 'clamp(14px, 3vw, 16px)', maxWidth: '500px', margin: '16px auto 0', lineHeight: 1.6 }}>
                  Key achievements that mark our growth and commitment to excellence since 2023.
                </p>
              </div>
            </Reveal>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
              gap: '24px',
              alignItems: 'stretch'
            }}>
              {milestones.map((m, i) => {
                const Icon = m.icon
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <motion.div 
                      whileHover={{ y: -8 }}
                      style={{ 
                        background: 'white', 
                        borderRadius: '24px', 
                        padding: 'clamp(24px, 5vw, 32px) clamp(16px, 4vw, 24px)', 
                        textAlign: 'center', 
                        border: '1px solid rgba(0,0,0,0.06)', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <div style={{
                        width: '56px', height: '56px',
                        borderRadius: '18px',
                        background: '#F9CD05',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                      }}>
                        <Icon size={24} color="#1D1D1F" strokeWidth={1.5} />
                      </div>
                      <div style={{ 
                        fontSize: 'clamp(24px, 5vw, 28px)', 
                        fontWeight: 700, 
                        color: '#1D1D1F',
                        marginBottom: '8px' 
                      }}>
                        {m.year}
                      </div>
                      <div style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px' }}>{m.title}</div>
                      <p style={{ 
                        fontSize: 'clamp(12px, 2.5vw, 13px)', 
                        color: '#4B5563', 
                        lineHeight: 1.6,
                        marginTop: 'auto',
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {m.desc}
                      </p>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <CoreValues />

        {/* Leadership Team - Responsive */}
        <section className="leadership-section" style={{ padding: '100px 0', background: 'linear-gradient(135deg, #F8F9FC 0%, #F0F2F8 100%)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }} style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,113,227,0.1)', borderRadius: '100px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0071E3' }}>Leadership</span>
                </motion.div>
                <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1D1D1F' }}>
                  Meet the <span style={{ background: 'linear-gradient(135deg, #0071E3, #00C6FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Team</span>
                </h2>
                <p style={{ color: '#6B7280', fontSize: 'clamp(15px, 3vw, 17px)', maxWidth: '500px', margin: '16px auto 0', lineHeight: 1.6 }}>
                  Passionate leaders driving innovation, operational excellence, and client success.
                </p>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', justifyContent: 'center', alignItems: 'start' }}>
              {leadershipTeam.map((member, index) => <LeadershipCard key={index} member={member} index={index} />)}
            </div>
          </div>
        </section>

        {/* Final CTA - Responsive */}
        <section className="cta-section" style={{ padding: '100px 0', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <motion.div whileHover={{ y: -5 }} style={{ textAlign: 'center', background: 'linear-gradient(135deg, #1D1D1F 0%, #2a2a2e 100%)', borderRadius: 'clamp(32px, 6vw, 40px)', padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 60px)', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.2 }} style={{ width: '72px', height: '72px', background: 'rgba(255,255,255,0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                  <Globe size={32} color="#FFFFFF" strokeWidth={1.5} />
                </motion.div>
                <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '18px', color: '#FFFFFF' }}>
                  Serving Businesses Across <span style={{ background: 'linear-gradient(135deg, #00C6FF, #0071E3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tamil Nadu & Beyond</span>
                </h2>
                <p style={{ color: '#A1A1A6', fontSize: 'clamp(16px, 3vw, 18px)', lineHeight: 1.65, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
                  From Chennai to Coimbatore, Madurai to Trichy — with remote capabilities worldwide, we bring enterprise-class technology to every corner of your business.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: 'clamp(14px, 4vw, 16px) clamp(28px, 6vw, 36px)', background: 'white', color: '#1D1D1F', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', minHeight: '48px' }}>
                    Start a Conversation <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            </Reveal>
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
            .story-section {
              padding: 60px 0 !important;
            }
            .story-grid {
              gap: 32px !important;
            }
            .core-values-section {
              padding: 60px 0 !important;
            }
            .milestones-section {
              padding: 60px 0 !important;
            }
            .leadership-section {
              padding: 60px 0 !important;
            }
            .cta-section {
              padding: 60px 0 !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .story-section {
              padding: 80px 0 !important;
            }
            .core-values-section {
              padding: 80px 0 !important;
            }
            .milestones-section {
              padding: 80px 0 !important;
            }
            .leadership-section {
              padding: 80px 0 !important;
            }
            .cta-section {
              padding: 80px 0 !important;
            }
          }
          
          /* Ensure all images scale properly */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Touch-friendly */
          button, a, [role="button"] {
            touch-action: manipulation;
          }
        `}</style>
      </div>
    </>
  )
}