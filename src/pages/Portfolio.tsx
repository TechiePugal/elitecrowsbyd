import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Code, Search, Bot, Factory, Globe, ArrowRight, ExternalLink } from 'lucide-react'

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

const projects = [
  {
    category: 'Web Development', icon: Globe, color: '#0071E3', bg: '#EAF3FF',
    title: 'E-Commerce Platform',
    description: 'Full-featured online shopping platform with payment integration, inventory management, and customer analytics.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    highlights: ['Responsive Design', 'SEO Optimized', 'Payment Gateway', 'Admin Dashboard'],
  },
  {
    category: 'Software Development', icon: Code, color: '#34C759', bg: '#EDFBF1',
    title: 'Hospital Management System',
    description: 'Comprehensive healthcare management solution for patient records, appointments, billing, and inventory.',
    technologies: ['React', 'PostgreSQL', 'Express', 'TypeScript'],
    highlights: ['Patient Portal', 'Appointments', 'Billing System', 'Reports'],
  },
  {
    category: 'AI Solutions', icon: Bot, color: '#FF9500', bg: '#FFF5E6',
    title: 'Customer Support Chatbot',
    description: 'AI chatbot for automated customer support with natural language processing and multi-channel integration.',
    technologies: ['Python', 'TensorFlow', 'React', 'WebSocket'],
    highlights: ['24/7 Support', 'Multi-language', 'Context Awareness', 'Self Learning'],
  },
  {
    category: 'SEO & Digital Marketing', icon: Search, color: '#30B0C7', bg: '#E6F7FB',
    title: 'Business Website Optimization',
    description: 'Complete SEO overhaul resulting in 300% growth in organic traffic within six months.',
    technologies: ['Technical SEO', 'Content Strategy', 'Analytics', 'Schema'],
    highlights: ['Google Page 1', 'Mobile Optimized', 'Speed Boost', 'Conversions'],
  },
  {
    category: 'Industrial Applications', icon: Factory, color: '#AF52DE', bg: '#F5EDFF',
    title: 'Manufacturing Execution System',
    description: 'Real-time production tracking and quality control system for a mid-size factory.',
    technologies: ['Python', 'PostgreSQL', 'React', 'IoT'],
    highlights: ['Live Monitoring', 'Quality Control', 'Inventory', 'Analytics'],
  },
  {
    category: 'Web Development', icon: Globe, color: '#FF3B30', bg: '#FFF0EF',
    title: 'Restaurant Booking System',
    description: 'Online reservation platform with table management, real-time availability, and integrated payments.',
    technologies: ['React', 'Node.js', 'MySQL', 'Payments'],
    highlights: ['Online Booking', 'Table Mgmt', 'Payments', 'Reviews'],
  },
]

const stats = [
  { number: '100+', label: 'Projects Completed' },
  { number: '50+', label: 'Happy Clients' },
  { number: '95%', label: 'Client Retention' },
  { number: '24/7', label: 'Support Available' },
]

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* HERO */}
      <section className="portfolio-hero" style={{ background: 'linear-gradient(180deg, #F9F9FB 0%, #FFFFFF 60%)', padding: 'clamp(60px, 10vw, 112px) 0 64px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge" style={{ marginBottom: '20px', display: 'inline-block', padding: '4px 12px', background: 'rgba(0,113,227,0.1)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: '#0071E3' }}>Our Work</span>
            <h1 style={{ maxWidth: '620px', marginBottom: '16px', fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1D1D1F' }}>
              Projects That <span style={{ color: '#0071E3' }}>Define Excellence</span>
            </h1>
            <p style={{ color: '#86868B', maxWidth: '480px', fontSize: 'clamp(16px, 3vw, 19px)', lineHeight: 1.6 }}>
              A curated selection of digital solutions delivered across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS - Fully Responsive Grid */}
      <section style={{ padding: '0 0 48px', background: '#FFFFFF' }}>
        <div className="container">
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: '#F9F9FB',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            overflow: 'hidden',
          }}>
            {stats.map((s, i) => (
              <div key={i} className="stats-item" style={{
                padding: '28px 16px',
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{ fontSize: 'clamp(24px, 5vw, 28px)', fontWeight: 700, color: '#0071E3', letterSpacing: '-0.02em' }}>{s.number}</div>
                <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#86868B', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <div className="container" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActive(cat)} 
              style={{
                padding: '8px 18px',
                minHeight: '44px',
                borderRadius: '980px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid',
                borderColor: active === cat ? '#0071E3' : '#E5E5E7',
                background: active === cat ? 'rgba(0,113,227,0.08)' : '#FFFFFF',
                color: active === cat ? '#0071E3' : '#86868B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECT GRID */}
      <section className="portfolio-grid-section" style={{ padding: '0 0 80px', background: '#FFFFFF' }}>
        <div className="container">
          <div className="projects-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {filtered.map((proj, i) => {
              const Icon = proj.icon
              return (
                <Reveal key={proj.title} delay={i * 0.06}>
                  <div className="project-card" style={{
                    padding: 'clamp(24px, 4vw, 32px)',
                    border: '1px solid #E5E5E7',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    height: '100%',
                    background: '#FFFFFF',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{
                        width: '48px', height: '48px',
                        borderRadius: '14px', background: proj.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={21} color={proj.color} strokeWidth={1.5} />
                      </div>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '980px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: proj.bg,
                        color: proj.color,
                        letterSpacing: '0.02em',
                      }}>
                        {proj.category}
                      </span>
                    </div>

                    {/* Title & desc */}
                    <div>
                      <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                        {proj.title}
                      </h3>
                      <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#86868B', lineHeight: 1.65 }}>
                        {proj.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.highlights.map((h, j) => (
                        <span key={j} style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: '#F5F5F7',
                          color: '#1D1D1F',
                        }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #E5E5E7' }}>
                      <div style={{ fontSize: '11px', color: '#A1A1A6', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Tech Stack
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {proj.technologies.map((t, j) => (
                          <span key={j} style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 500,
                            border: `1px solid ${proj.color}30`,
                            color: proj.color,
                            background: proj.bg,
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="portfolio-cta-section" style={{ padding: '64px 0', background: '#F5F5F7' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <Reveal>
            <div className="cta-card" style={{
              textAlign: 'center',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(40px, 8vw, 56px) clamp(24px, 6vw, 48px)',
              border: '1px solid #E5E5E7',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            }}>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 28px)', marginBottom: '14px', color: '#1D1D1F', fontWeight: 700 }}>
                Ready to be our next success story?
              </h2>
              <p style={{ color: '#86868B', fontSize: 'clamp(14px, 3vw, 16px)', lineHeight: 1.7, marginBottom: '32px' }}>
                Let us build something remarkable together.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: 'clamp(12px, 3vw, 14px) clamp(24px, 5vw, 28px)', 
                fontSize: 'clamp(14px, 3vw, 16px)', 
                background: 'linear-gradient(135deg, #0071E3, #00C6FF)', 
                color: 'white', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                fontWeight: 600,
                minHeight: '48px'
              }}>
                Start a Project <ArrowRight size={16} />
              </Link>
            </div>
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
        
        /* Stats grid - responsive columns and border removal */
        @media (max-width: 767px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            border-radius: 20px;
          }
          .stats-item {
            border-bottom: 1px solid #E5E5E7;
          }
          .stats-item:last-child {
            border-bottom: none;
          }
          .portfolio-hero {
            padding-bottom: 40px !important;
          }
          .portfolio-grid-section {
            padding-bottom: 60px !important;
          }
          .portfolio-cta-section {
            padding: 48px 0 !important;
          }
          .projects-grid {
            gap: 16px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-item:nth-child(odd) {
            border-right: 1px solid #E5E5E7;
          }
          .stats-item:nth-child(3) {
            border-bottom: none;
          }
          .portfolio-grid-section {
            padding-bottom: 70px !important;
          }
        }
        
        /* Desktop: show borders between stats */
        @media (min-width: 1024px) {
          .stats-item:not(:last-child) {
            border-right: 1px solid #E5E5E7;
          }
        }
        
        /* Card hover effect */
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          transition: all 0.25s ease;
        }
        
        /* Touch-friendly */
        button, a, [role="button"] {
          touch-action: manipulation;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  )
}