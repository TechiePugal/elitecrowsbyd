import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Code, Search, Cloud, Bot, Factory, ShieldCheck, Check, ArrowRight, Sparkles, Rocket, Zap, Globe } from 'lucide-react'

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

// SEO-optimized service data
const services = [
  {
    icon: Code, num: '01', color: '#0071E3', bg: '#EAF3FF',
    title: 'Web & Software Development',
    desc: 'Custom web applications and enterprise software built with modern technologies for optimal performance, scalability, and user experience.',
    benefits: [
      'Responsive web design for all devices',
      'Custom software tailored to your business needs',
      'Modern stack: React, Next.js, Node.js, Python',
      'Scalable architecture for future growth',
      'Clean, maintainable, documented code',
      'Full-stack development expertise'
    ],
  },
  {
    icon: Search, num: '02', color: '#34C759', bg: '#EDFBF1',
    title: 'Digital Marketing & SEO',
    desc: 'Data-driven digital marketing strategies and technical SEO optimization to boost your online visibility, attract qualified traffic, and increase conversions.',
    benefits: [
      'SEO-optimized website development',
      'Comprehensive keyword research',
      'Content marketing strategies',
      'Local and international SEO',
      'Social media integration',
      'Analytics & performance tracking'
    ],
  },
  {
    icon: Cloud, num: '03', color: '#FF3B30', bg: '#FFF0EF',
    title: 'Cloud Customization',
    desc: 'Scalable, secure cloud solutions designed to enhance business efficiency, reduce infrastructure costs, and improve operational flexibility.',
    benefits: [
      'AWS, Azure, and GCP expertise',
      'Seamless cloud migration',
      'Infrastructure optimization',
      'Cost-effective resource management',
      'High availability & disaster recovery',
      'Secure cloud architecture'
    ],
  },
  {
    icon: Bot, num: '04', color: '#FF9500', bg: '#FFF5E6',
    title: 'AI Chat Support & Automation',
    desc: 'Intelligent AI chatbot solutions to automate customer support, enhance user engagement, and streamline business operations 24/7.',
    benefits: [
      '24/7 automated customer support',
      'Natural language processing (NLP)',
      'Multi-channel integration (web, mobile, social)',
      'Reduced support costs',
      'Improved customer satisfaction scores',
      'Custom AI training on your data'
    ],
  },
  {
    icon: Factory, num: '05', color: '#30B0C7', bg: '#E6F7FB',
    title: 'Custom Industrial Applications',
    desc: 'Specialized software systems for manufacturing, enterprise operations, and industrial automation – built to improve productivity and reduce downtime.',
    benefits: [
      'Manufacturing execution systems (MES)',
      'Inventory management solutions',
      'Production tracking & analytics',
      'Quality control automation',
      'Real-time monitoring dashboards',
      'ERP and legacy system integration'
    ],
  },
  {
    icon: ShieldCheck, num: '06', color: '#AF52DE', bg: '#F5EDFF',
    title: 'Cybersecurity & Protection',
    desc: 'Enterprise-grade security posture with proactive vulnerability management, data protection, and compliance assurance.',
    benefits: [
      'Comprehensive security audits',
      'Penetration testing & vulnerability scanning',
      'Data encryption & privacy solutions',
      'Compliance consulting (GDPR, SOC2, ISO)',
      'Incident response planning',
      '24/7 security monitoring'
    ],
  },
]

export default function Services() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate particles client-side only with percentage positions
    const newParticles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EliteCrows Technology Services',
    description: 'Comprehensive IT and software development services including web development, SEO, cloud solutions, AI chatbots, industrial applications, and cybersecurity.',
    numberOfItems: services.length,
    itemListElement: services.map((svc, idx) => ({
      '@type': 'Service',
      position: idx + 1,
      name: svc.title,
      description: svc.desc,
      provider: {
        '@type': 'Organization',
        name: 'EliteCrows Infotech',
        url: 'https://elitecrows.com'
      }
    })),
    url: 'https://elitecrows.com/services'
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Services | EliteCrows – Web Dev, SEO, AI, Cloud & Cybersecurity</title>
        <meta name="description" content="Explore EliteCrows' full range of technology services: custom web development, SEO, cloud solutions, AI chatbots, industrial applications, and enterprise cybersecurity. Free consultation →" />
        <meta name="keywords" content="custom software development, SEO services, cloud consulting, AI chatbot development, industrial automation software, cybersecurity services, web development company" />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elitecrows.com/services" />
        
        <meta property="og:title" content="Services – EliteCrows | Custom Software, AI, Cloud & More" />
        <meta property="og:description" content="End-to-end technology solutions: web & software development, SEO, cloud customization, AI chatbots, industrial apps, and cybersecurity. Get a free consultation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.com/services" />
        <meta property="og:image" content="https://elitecrows.com/services-og.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EliteCrows Services – Technology Solutions for Growth" />
        <meta name="twitter:description" content="From web development to AI and cybersecurity – we deliver scalable, secure digital products." />
        
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* ─── PREMIUM HERO BANNER (Fully Responsive) ─── */}
        <section className="services-hero"
          style={{
            position: 'relative',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)',
            padding: '120px 0 100px',
          }}
        >
          {/* Animated Orbs - Responsive sizing */}
          <motion.div
            animate={{ x: [0, 80, 0, -80, 0], y: [0, -40, 0, 40, 0], scale: [1, 1.15, 1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
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
            animate={{ x: [0, -60, 0, 60, 0], y: [0, 50, 0, -50, 0], scale: [1, 1.2, 1, 1.1, 1] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
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
            animate={{ x: [0, 50, 0, -50, 0], y: [0, -30, 0, 30, 0], scale: [1, 1.1, 1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
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
              }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Sparkles size={16} color="#0071E3" />
              </motion.div>
              <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#0071E3', letterSpacing: '0.5px' }}>END‑TO‑END TECHNOLOGY SOLUTIONS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 style={{ fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '28px' }}>
                Services Built for{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #0071E3, #00C6FF, #AF52DE)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  Scale
                  <motion.div
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    style={{ 
                      position: 'absolute', 
                      bottom: '-12px', 
                      left: 0, 
                      height: '3px', 
                      background: 'linear-gradient(90deg, transparent, #0071E3, #00C6FF, transparent)', 
                      borderRadius: '3px' 
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
                From custom web applications and AI automation to cloud infrastructure and enterprise security — we deliver end‑to‑end technology solutions that drive measurable business growth.
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
                href="#services-grid"
                whileHover={{ scale: 1.05, background: 'rgba(0,113,227,0.05)', borderColor: 'rgba(0,113,227,0.3)' }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'white', color: '#0071E3', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 16px)', border: '1px solid rgba(0,113,227,0.2)', minHeight: '48px' }}
              >
                Explore Services <Zap size={18} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* SERVICES GRID – Responsive equal height cards */}
        <section id="services-grid" className="services-grid-section" style={{ background: '#FFFFFF', padding: '100px 0' }}>
          <div className="container">
            <div className="services-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '40px',
              alignItems: 'stretch'
            }}>
              {services.map((svc, i) => {
                const Icon = svc.icon
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="service-card"
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '28px',
                        border: '1px solid #E5E5E7',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ height: '4px', background: svc.color, width: '100%' }} />
                      <div className="service-card-content" style={{ padding: '36px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: svc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                          <Icon size={28} color={svc.color} strokeWidth={1.5} />
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: svc.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                          Service {svc.num}
                        </div>
                        <h3 style={{ fontSize: 'clamp(22px, 4vw, 26px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '14px', lineHeight: 1.3 }}>
                          {svc.title}
                        </h3>
                        <p style={{ fontSize: 'clamp(14px, 2.5vw, 15px)', color: '#6B7280', lineHeight: 1.65, marginBottom: '32px' }}>
                          {svc.desc}
                        </p>
                        <div style={{ marginTop: 'auto' }}>
                          <div style={{ fontWeight: 600, fontSize: '13px', color: '#1D1D1F', marginBottom: '18px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                            Key features
                          </div>
                          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            {svc.benefits.map((b, j) => (
                              <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: svc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                  <Check size={12} color={svc.color} strokeWidth={2.5} />
                                </div>
                                <span style={{ fontSize: 'clamp(12px, 2.5vw, 13px)', color: '#4B5563', lineHeight: 1.5 }}>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION - Responsive */}
        <section className="services-cta-section" style={{ padding: '100px 0 120px', background: '#F5F5F7' }}>
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <motion.div
                whileHover={{ y: -6 }}
                className="services-cta-card"
                style={{
                  textAlign: 'center',
                  background: '#FFFFFF',
                  borderRadius: '32px',
                  padding: '64px 56px',
                  border: '1px solid #E5E5E7',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ width: '72px', height: '72px', background: 'rgba(0,113,227,0.08)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                  <Globe size={32} color="#0071E3" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 5vw, 34px)', fontWeight: 700, marginBottom: '16px', color: '#1D1D1F', letterSpacing: '-0.02em' }}>
                  Not sure which service fits your needs?
                </h2>
                <p style={{ color: '#6B7280', fontSize: 'clamp(16px, 3vw, 18px)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Our experts will analyze your requirements and recommend the best solution — at no cost or obligation.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(14px, 4vw, 16px) clamp(28px, 6vw, 40px)', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', borderRadius: '50px', color: 'white', textDecoration: 'none', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 600, boxShadow: '0 8px 20px rgba(0,113,227,0.2)', minHeight: '48px' }}>
                    Talk to an Expert <ArrowRight size={18} />
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
            .services-hero {
              padding: 80px 0 60px !important;
            }
            .services-grid-section {
              padding: 60px 0 !important;
            }
            .services-cta-section {
              padding: 60px 0 !important;
            }
            .service-card-content {
              padding: 24px 20px !important;
            }
            .services-cta-card {
              padding: 40px 24px !important;
            }
            .services-grid {
              gap: 24px !important;
            }
            .benefits-grid {
              gap: 12px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .services-hero {
              padding: 100px 0 80px !important;
            }
            .services-grid-section {
              padding: 80px 0 !important;
            }
            .services-cta-section {
              padding: 80px 0 !important;
            }
            .service-card-content {
              padding: 28px 24px !important;
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