import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Code, Search, Bot, Factory, Globe, ArrowRight, ChevronDown,
  Briefcase, Users, Heart, Headphones, TrendingUp, Shield, Award,
  Smartphone, Cloud, Zap, ExternalLink, Sparkles
} from 'lucide-react';

const COLORS = {
  primary: '#0066FF',
  accent: '#7C3AED',
  background: '#FFFFFF',
  text: '#0A0A0A',
  muted: '#6B7280',
};

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  let numericValue: number | null = null;
  let displayString: string | null = null;

  if (typeof target === 'number') {
    numericValue = target;
  } else if (typeof target === 'string') {
    const trimmed = target.trim();
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      numericValue = parseFloat(trimmed);
    } else {
      displayString = trimmed;
    }
  }

  useEffect(() => {
    if (displayString !== null) return;
    if (numericValue === null) return;
    if (!inView) {
      setCount(numericValue);
      return;
    }
    let start = 0;
    const duration = 2000;
    const step = 16;
    const inc = numericValue / (duration / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, numericValue, displayString]);

  if (displayString !== null) {
    return <span ref={ref}>{displayString}</span>;
  }
  return <span ref={ref}>{numericValue !== null ? count : target}{suffix}</span>;
}

/* ─── Scroll Reveal ─── */
function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
      {children}
    </motion.div>
  );
}

/* ─── Hero Background Crystals ─── */
function HeroCrystals() {
  const crystals = useRef(
    Array.from({ length: 22 }, () => ({
      size: 8 + Math.random() * 24,
      top: `${4 + Math.random() * 88}%`,
      left: `${2 + Math.random() * 92}%`,
      floatDelay: Math.random() * 4,
      floatDuration: 3.5 + Math.random() * 4,
      spinDuration: 10 + Math.random() * 16,
      shimmerDuration: 2 + Math.random() * 3,
      rotation: Math.floor(Math.random() * 45),
    }))
  ).current;

  const orbs = [
    { cx: '-8%', cy: '-12%', size: 580, delay: 0, tx: 22, ty: 16, duration: 9 },
    { cx: '72%', cy: '62%', size: 480, delay: 2, tx: -16, ty: 12, duration: 11 },
    { cx: '52%', cy: '-18%', size: 360, delay: 4, tx: 12, ty: 22, duration: 13 },
  ];

  const rings = [
    { cx: '16%', cy: '76%', size: 200, delay: 0, duration: 6.5 },
    { cx: '84%', cy: '16%', size: 100, delay: 2, duration: 8 },
    { cx: '48%', cy: '92%', size: 110, delay: 1, duration: 7 },
    { cx: '90%', cy: '55%', size: 80, delay: 3, duration: 9 },
  ];

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {orbs.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute', left: o.cx, top: o.cy, width: o.size, height: o.size, borderRadius: '50%',
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          }}
          animate={{ x: [0, o.tx, 0], y: [0, o.ty, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: o.duration, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}
      {rings.map((r, i) => (
        <motion.div
          key={`ring-${i}`}
          style={{
            position: 'absolute', left: r.cx, top: r.cy, width: r.size, height: r.size,
            marginLeft: -r.size / 2, marginTop: -r.size / 2, borderRadius: '50%',
            border: '1px solid rgba(0,102,255,0.09)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.65, 0.15, 0.65] }}
          transition={{ duration: r.duration, repeat: Infinity, ease: 'easeInOut', delay: r.delay }}
        />
      ))}
      {crystals.map((c, i) => (
        <motion.div
          key={`crystal-${i}`}
          style={{ position: 'absolute', top: c.top, left: c.left, width: c.size, height: c.size }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: c.floatDuration, repeat: Infinity, ease: 'easeInOut', delay: c.floatDelay }}
        >
          <motion.div
            style={{ width: '100%', height: '100%', borderRadius: '3px', border: '1px solid transparent' }}
            animate={{
              rotate: [c.rotation, c.rotation + 360],
              background: ['rgba(0,102,255,0.05)', 'rgba(124,58,237,0.10)', 'rgba(0,102,255,0.05)'],
              borderColor: ['rgba(0,102,255,0.13)', 'rgba(124,58,237,0.22)', 'rgba(0,102,255,0.13)'],
            }}
            transition={{
              rotate: { duration: c.spinDuration, repeat: Infinity, ease: 'linear', delay: c.floatDelay },
              background: { duration: c.shimmerDuration, repeat: Infinity, ease: 'easeInOut', delay: c.floatDelay },
              borderColor: { duration: c.shimmerDuration, repeat: Infinity, ease: 'easeInOut', delay: c.floatDelay },
            }}
          />
        </motion.div>
      ))}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025 }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0066FF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ─── Project Data ─── */
const projects = [
  {
    category: 'Web Development',
    icon: Globe,
    color: '#0066FF',
    gradient: 'linear-gradient(135deg, #0066FF, #7C3AED)',
    title: 'Enterprise E-Commerce Platform',
    description: 'Full-featured online shopping platform with AI-powered recommendations, payment integration, real-time inventory management, and customer analytics dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    highlights: ['AI Recommendations', 'Real-time Analytics', 'Payment Gateway', 'Admin Dashboard'],
  },
  {
    category: 'Software Development',
    icon: Code,
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #0066FF)',
    title: 'Hospital Management System',
    description: 'Comprehensive healthcare management solution for patient records, appointments, billing, and inventory with HIPAA-compliant data handling.',
    technologies: ['React', 'PostgreSQL', 'Express', 'TypeScript', 'Docker'],
    highlights: ['Patient Portal', 'Telemedicine', 'Billing System', 'Analytics'],
  },
  {
    category: 'AI Solutions',
    icon: Bot,
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899, #7C3AED)',
    title: 'AI Customer Support Chatbot',
    description: 'GPT-4 powered chatbot with natural language processing, multi-channel integration, and 80% automated ticket resolution rate.',
    technologies: ['Python', 'TensorFlow', 'React', 'WebSocket', 'Redis'],
    highlights: ['24/7 Support', 'Multi-language', 'Context Aware', 'Self Learning'],
  },
  {
    category: 'SEO & Digital Marketing',
    icon: Search,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #0066FF)',
    title: 'SaaS SEO Optimization',
    description: 'Complete SEO overhaul with technical optimization, content strategy, and conversion rate optimization resulting in 300% organic traffic growth.',
    technologies: ['Technical SEO', 'Content Strategy', 'Analytics', 'Schema Markup'],
    highlights: ['Page 1 Rankings', 'Core Web Vitals', '300% Growth', 'CRO'],
  },
  {
    category: 'Industrial Applications',
    icon: Factory,
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #EC4899)',
    title: 'Manufacturing Execution System',
    description: 'Real-time production tracking and quality control system with IoT integration, predictive maintenance, and operational intelligence dashboards.',
    technologies: ['Python', 'PostgreSQL', 'React', 'IoT Sensors', 'MQTT'],
    highlights: ['Live Monitoring', 'Quality Control', 'Predictive AI', 'SCADA Integration'],
  },
  {
    category: 'Cloud Solutions',
    icon: Cloud,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6, #7C3AED)',
    title: 'Cloud Migration & DevOps',
    description: 'AWS/Azure cloud migration with Kubernetes orchestration, achieving 99.99% uptime and 30% infrastructure cost reduction.',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    highlights: ['99.99% Uptime', 'Auto-scaling', 'Cost Optimization', 'Zero Downtime'],
  },
];

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed', icon: Briefcase, color: '#0066FF' },
  { value: 50, suffix: '+', label: 'Happy Clients', icon: Users, color: '#7C3AED' },
  { value: 95, suffix: '%', label: 'Client Retention', icon: Heart, color: '#EC4899' },
  { value: '24/7', suffix: '', label: 'Support Available', icon: Headphones, color: '#10B981' },
];

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

/* ═══════════════════════════════════════════════
   PORTFOLIO PAGE
   ═══════════════════════════════════════════════ */
export default function Portfolio() {
  const [active, setActive] = useState('All');
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://elitecrows.in/portfolio#webpage',
        url: 'https://elitecrows.in/portfolio',
        name: 'Portfolio | EliteCrows Infotech – Project Case Studies & Work',
        description: 'Browse EliteCrows Infotech portfolio: e-commerce platforms, hospital management systems, AI chatbots, manufacturing execution systems, and more. 100+ projects delivered.',
        isPartOf: { '@id': 'https://elitecrows.in/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elitecrows.in/' },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://elitecrows.in/portfolio' },
          ],
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'ItemList',
        name: 'EliteCrows Infotech Project Portfolio',
        description: 'A curated selection of digital solutions delivered across e-commerce, healthcare, AI, SEO, industrial, and cloud industries.',
        numberOfItems: projects.length,
        itemListElement: projects.map((proj, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'CreativeWork',
            name: proj.title,
            description: proj.description,
            keywords: proj.technologies.join(', '),
            creator: { '@id': 'https://elitecrows.in/#organization' },
            genre: proj.category,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>Portfolio | EliteCrows Infotech – Project Case Studies & Work Showcase</title>
        <meta name="description" content="Browse EliteCrows Infotech's portfolio: e-commerce, hospital systems, AI chatbots, SEO campaigns, industrial automation, and cloud solutions. 100+ projects." />
        <meta name="keywords" content="EliteCrows portfolio, software development projects India, web development case studies, AI chatbot projects, e-commerce development Tamil Nadu, hospital management software, manufacturing MES system, cloud migration portfolio" />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elitecrows.in/portfolio" />
        <meta property="og:site_name" content="EliteCrows Infotech" />
        <meta property="og:title" content="Portfolio – EliteCrows Infotech | Projects That Define Excellence" />
        <meta property="og:description" content="A curated selection of digital solutions delivered across e-commerce, healthcare, AI, SEO, industrial, and cloud industries. 100+ projects completed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.in/portfolio" />
        <meta property="og:image" content="https://elitecrows.in/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EliteCrows Infotech project portfolio showcase" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@elitecrows" />
        <meta name="twitter:title" content="EliteCrows Infotech Portfolio – Projects That Define Excellence" />
        <meta name="twitter:description" content="100+ delivered projects: e-commerce, AI, healthcare, industrial, and more. Explore our work." />
        <meta name="twitter:image" content="https://elitecrows.in/og-image.jpg" />
        <meta name="twitter:image:alt" content="EliteCrows Infotech portfolio" />
        <script type="application/ld+json">{JSON.stringify(portfolioJsonLd)}</script>
      </Helmet>

      <main
        id="main-content"
        aria-label="EliteCrows Infotech portfolio page"
        style={{
          background: '#FFFFFF',
          color: COLORS.text,
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        {/* ══════════════════════ HERO ══════════════════════ */}
        <motion.section
          className="portfolio-hero"
          style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '100px',
            paddingBottom: '80px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)',
            opacity: heroOpacity,
          }}
        >
          <HeroCrystals />
          <motion.div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)',
              y: backgroundY,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
              y: backgroundY,
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'rgba(0,102,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '100px',
                  marginBottom: '24px',
                  border: '1px solid rgba(0,102,255,0.15)',
                }}
              >
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: COLORS.primary,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  Solutions in Motion
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(36px, 6vw, 56px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                  color: COLORS.text,
                }}
              >
                Projects That{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #0066FF 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Define Excellence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 20px)',
                  lineHeight: 1.6,
                  color: COLORS.muted,
                  marginBottom: '0',
                  maxWidth: '560px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                A curated selection of digital solutions delivered across industries – from AI-powered platforms to enterprise cloud infrastructure.
              </motion.p>
            </div>
          </div>

          {/* <motion.div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              color: COLORS.muted,
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Scroll to explore</span>
            <ChevronDown size={18} />
          </motion.div> */}
        </motion.section>

        {/* ══════════════════════ STATS ══════════════════════ */}
        <section
          className="stats-section"
          style={{
            padding: '60px 0',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 2,
            position: 'relative',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <div
                className="stats-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '24px',
                  maxWidth: '1000px',
                  margin: '0 auto',
                }}
              >
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6, boxShadow: '0 20px 35px rgba(0,0,0,0.08)' }}
                      style={{
                        textAlign: 'center',
                        padding: '32px 20px',
                        borderRadius: '24px',
                        background: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ marginBottom: '14px' }}>
                        <Icon size={28} color={s.color} strokeWidth={1.8} />
                      </div>
                      <div style={{
                        fontSize: '38px',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: COLORS.text,
                        lineHeight: 1,
                        marginBottom: '8px',
                      }}>
                        <AnimatedCounter target={s.value} suffix={s.suffix} />
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: COLORS.muted,
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}>
                        {s.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════ FILTER BUTTONS ══════════════════════ */}
        <section style={{ padding: '48px 0 24px', background: '#FFFFFF', zIndex: 2, position: 'relative' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '10px 22px',
                    minHeight: '44px',
                    borderRadius: '980px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: active === cat ? COLORS.primary : 'rgba(0,0,0,0.08)',
                    background: active === cat
                      ? 'linear-gradient(135deg, rgba(0,102,255,0.1), rgba(124,58,237,0.1))'
                      : '#FFFFFF',
                    color: active === cat ? COLORS.primary : COLORS.muted,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.02em',
                    backdropFilter: active === cat ? 'blur(8px)' : 'none',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ PROJECT GRID ══════════════════════ */}
        <section
          className="projects-section"
          style={{
            padding: '40px 0 100px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FC 100%)',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <motion.div
              layout
              className="projects-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map((proj, i) => {
                const Icon = proj.icon;
                return (
                  <Reveal key={proj.title} delay={i * 0.06} direction="up">
                    <motion.div
                      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
                      className="project-card"
                      style={{
                        padding: '32px 28px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        height: '100%',
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Gradient accent top bar */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: proj.gradient,
                        borderRadius: '24px 24px 0 0',
                      }} />

                      {/* Header with icon and category */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginTop: '4px',
                      }}>
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            background: proj.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(0,102,255,0.15)',
                          }}
                        >
                          <Icon size={24} color="white" strokeWidth={1.5} />
                        </motion.div>
                        <span style={{
                          padding: '6px 14px',
                          borderRadius: '980px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: 'rgba(0,102,255,0.06)',
                          color: COLORS.primary,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(0,102,255,0.1)',
                        }}>
                          {proj.category}
                        </span>
                      </div>

                      {/* Title and description */}
                      <div>
                        <h3 style={{
                          fontSize: 'clamp(18px, 3vw, 22px)',
                          fontWeight: 700,
                          color: COLORS.text,
                          marginBottom: '8px',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.3,
                        }}>
                          {proj.title}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: COLORS.muted,
                          lineHeight: 1.65,
                        }}>
                          {proj.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {proj.highlights.map((h, j) => (
                          <span key={j} style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            background: 'rgba(0,0,0,0.03)',
                            color: COLORS.text,
                            letterSpacing: '0.01em',
                          }}>
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div style={{
                        marginTop: 'auto',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                      }}>
                        <div style={{
                          fontSize: '10px',
                          color: COLORS.muted,
                          fontWeight: 700,
                          marginBottom: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}>
                          Tech Stack
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {proj.technologies.map((t, j) => (
                            <span key={j} style={{
                              padding: '5px 12px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: 600,
                              border: '1px solid rgba(0,102,255,0.15)',
                              color: COLORS.primary,
                              background: 'rgba(0,102,255,0.04)',
                              letterSpacing: '0.01em',
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Project Link */}
                      <div style={{ paddingTop: '4px' }}>
                        <Link
                          to="/contact"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: COLORS.primary,
                            textDecoration: 'none',
                            minHeight: '44px',
                          }}
                        >
                          Discuss This Project <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section
          className="cta-section"
          style={{
            padding: '120px 0',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F3F0FF 100%)',
            zIndex: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-30%',
            left: '-15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            right: '-15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
            <Reveal>
              <motion.div
                whileHover={{ y: -6 }}
                style={{
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(24px)',
                  borderRadius: '40px',
                  padding: 'clamp(60px, 10vw, 80px) clamp(32px, 6vw, 56px)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    width: '72px',
                    height: '72px',
                    background: 'linear-gradient(135deg, rgba(0,102,255,0.1), rgba(124,58,237,0.1))',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    border: '1px solid rgba(0,102,255,0.1)',
                  }}
                >
                  <Sparkles size={32} color={COLORS.primary} strokeWidth={1.5} />
                </motion.div>

                <h2 style={{
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  marginBottom: '20px',
                  color: COLORS.text,
                }}>
                  Ready to be Our Next{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #0066FF, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Success Story?
                  </span>
                </h2>

                <p style={{
                  color: COLORS.muted,
                  fontSize: '18px',
                  lineHeight: 1.65,
                  marginBottom: '40px',
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  Let us build something remarkable together. Join 50+ forward-thinking companies that trust EliteCrows.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '18px 44px',
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '40px',
                      background: 'linear-gradient(135deg, #0066FF, #7C3AED)',
                      color: 'white',
                      textDecoration: 'none',
                      minHeight: '52px',
                      boxShadow: '0 8px 24px rgba(0,102,255,0.2)',
                    }}
                  >
                    Start a Project <ExternalLink size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ─── Global Responsive Styles ─── */}
        <style>{`
          .container {
            width: 100%;
            margin: 0 auto;
            padding: 0 24px;
          }
          @media (min-width: 1280px) {
            .container {
              max-width: 1280px;
            }
          }
          @media (min-width: 1920px) {
            .container {
              max-width: 1600px;
            }
          }
          
          /* Mobile Responsive */
          @media (max-width: 767px) {
            .portfolio-hero {
              min-height: 80vh !important;
              padding-top: 80px !important;
              padding-bottom: 60px !important;
            }
            .stats-section {
              padding: 40px 0 !important;
            }
            .stats-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 16px !important;
            }
            .projects-section {
              padding: 32px 0 80px !important;
            }
            .projects-grid {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            .cta-section {
              padding: 80px 0 !important;
            }
          }
          
          @media (min-width: 768px) and (max-width: 1023px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .cta-section {
              padding: 100px 0 !important;
            }
          }
          
          /* Hover effects */
          .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 48px rgba(0,0,0,0.12);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          /* Touch-friendly */
          button, a, [role="button"] {
            touch-action: manipulation;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
          
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
      </main>
    </>
  );
}