import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Code, Search, Cloud, Bot, Factory, ShieldCheck,
  TrendingUp, Shield, Users, Award, ArrowRight, ChevronDown,
  Zap, Rocket, Smartphone, GitBranch, Briefcase, Heart, Headphones
} from 'lucide-react';

const COLORS = {
  primary: '#0066FF',
  accent: '#7C3AED',
  background: '#FFFFFF',
  text: '#0A0A0A',
  muted: '#6B7280',
};

/* ─── Animated counter (fixed for "24/7") ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Determine if target is a number or a numeric string (e.g., "100", "98.5")
  let numericValue: number | null = null;
  let displayString: string | null = null;

  if (typeof target === 'number') {
    numericValue = target;
  } else if (typeof target === 'string') {
    const trimmed = target.trim();
    // Check if the string consists only of digits and an optional decimal point
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      numericValue = parseFloat(trimmed);
    } else {
      // For strings like "24/7", we display them as-is without counting
      displayString = trimmed;
    }
  }

  useEffect(() => {
    // Non‑numeric strings are never animated
    if (displayString !== null) return;
    if (numericValue === null) return;

    // If not in view yet, show the final value without animation
    if (!inView) {
      setCount(numericValue);
      return;
    }

    // Counting animation for numeric values
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

  // Render the original string for non‑numeric cases (e.g., "24/7")
  if (displayString !== null) {
    return <span ref={ref}>{displayString}</span>;
  }

  // Numeric case: show counted number + optional suffix
  return <span ref={ref}>{numericValue !== null ? count : target}{suffix}</span>;
}

/* ─── Scroll reveal ─── */
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

/* ─── HeroCrystals (unchanged) ─── */
function HeroCrystals({ darkMode }: { darkMode: boolean }) {
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
    { cx: '-8%',  cy: '-12%', size: 580, delay: 0, tx: 22, ty: 16, duration: 9  },
    { cx: '72%',  cy: '62%',  size: 480, delay: 2, tx: -16, ty: 12, duration: 11 },
    { cx: '52%',  cy: '-18%', size: 360, delay: 4, tx: 12,  ty: 22, duration: 13 },
  ];

  const rings = [
    { cx: '16%', cy: '76%', size: 200, delay: 0, duration: 6.5 },
    { cx: '84%', cy: '16%', size: 100, delay: 2, duration: 8   },
    { cx: '48%', cy: '92%', size: 110, delay: 1, duration: 7   },
    { cx: '90%', cy: '55%', size: 80,  delay: 3, duration: 9   },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {orbs.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            left: o.cx,
            top: o.cy,
            width: o.size,
            height: o.size,
            borderRadius: '50%',
            background: i % 2 === 0
              ? darkMode
                ? 'radial-gradient(circle, rgba(0,102,255,0.09) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)'
              : darkMode
                ? 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)'
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
            position: 'absolute',
            left: r.cx,
            top: r.cy,
            width: r.size,
            height: r.size,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
            borderRadius: '50%',
            border: darkMode
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,102,255,0.09)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.65, 0.15, 0.65] }}
          transition={{ duration: r.duration, repeat: Infinity, ease: 'easeInOut', delay: r.delay }}
        />
      ))}
      {crystals.map((c, i) => (
        <motion.div
          key={`crystal-${i}`}
          style={{
            position: 'absolute',
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
          }}
          animate={{ y: [0, -18, 0] }}
          transition={{
            duration: c.floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: c.floatDelay,
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '3px',
              border: '1px solid transparent',
            }}
            animate={{
              rotate: [c.rotation, c.rotation + 360],
              background: darkMode
                ? [
                    'rgba(124,58,237,0.08)',
                    'rgba(0,102,255,0.14)',
                    'rgba(124,58,237,0.08)',
                  ]
                : [
                    'rgba(0,102,255,0.05)',
                    'rgba(124,58,237,0.10)',
                    'rgba(0,102,255,0.05)',
                  ],
              borderColor: darkMode
                ? [
                    'rgba(255,255,255,0.13)',
                    'rgba(124,58,237,0.28)',
                    'rgba(255,255,255,0.13)',
                  ]
                : [
                    'rgba(0,102,255,0.13)',
                    'rgba(124,58,237,0.22)',
                    'rgba(0,102,255,0.13)',
                  ],
            }}
            transition={{
              rotate: {
                duration: c.spinDuration,
                repeat: Infinity,
                ease: 'linear',
                delay: c.floatDelay,
              },
              background: {
                duration: c.shimmerDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: c.floatDelay,
              },
              borderColor: {
                duration: c.shimmerDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: c.floatDelay,
              },
            }}
          />
        </motion.div>
      ))}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: darkMode ? 0.04 : 0.025,
        }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={darkMode ? '#fff' : '#0066FF'} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ─── Data ─── */
const services = [
  { icon: Code,       title: 'Web & Software Development',  desc: 'React, Next.js, Node.js – we build custom web apps that load under 0.5 seconds and scale seamlessly to millions of users.',                                                        color: '#0066FF', gradient: 'linear-gradient(135deg, #0066FF, #7C3AED)' },
  { icon: Search,     title: 'Digital Marketing & SEO',      desc: 'Data-driven technical SEO, content clusters, and conversion optimization strategies that drive organic growth for tech companies.',                                                   color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #0066FF)' },
  { icon: Cloud,      title: 'Cloud Customization',          desc: 'AWS, Azure, Kubernetes – we architect cloud-native solutions with 99.99% uptime and reduce infrastructure costs by up to 30%.',                                                      color: '#0066FF', gradient: 'linear-gradient(135deg, #0066FF, #7C3AED)' },
  { icon: Bot,        title: 'AI Chat & Automation',         desc: 'GPT-powered chatbots that resolve 80% of support tickets automatically and integrate seamlessly with your CRM and ERP systems.',                                                     color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #0066FF)' },
  { icon: Factory,    title: 'Industrial Applications',      desc: 'SCADA, IIoT, and manufacturing execution systems with real-time analytics, predictive maintenance, and operational intelligence.',                                                    color: '#0066FF', gradient: 'linear-gradient(135deg, #0066FF, #7C3AED)' },
  { icon: ShieldCheck,title: 'Cybersecurity & Protection',   desc: 'Zero-trust architecture, penetration testing, and SOC-2 readiness – enterprise-grade security that protects your most critical assets.',                                             color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #0066FF)' },
];

const technologies = [
  { name: 'React',        logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg',         color: '#0066FF' },
  { name: 'Next.js',      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg',     color: '#7C3AED' },
  { name: 'Node.js',      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg',     color: '#0066FF' },
  { name: 'Python',       logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg',        color: '#7C3AED' },
  { name: 'PostgreSQL',   logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg',    color: '#0066FF' },
  { name: 'MongoDB',      logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg',       color: '#7C3AED' },
  { name: 'Docker',       logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg',        color: '#0066FF' },
  { name: 'AWS',          logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg',     color: '#7C3AED' },
  { name: 'Kubernetes',   logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg',    color: '#0066FF' },
  { name: 'Firebase',     logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg',      color: '#7C3AED' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg',   color: '#0066FF' },
  { name: 'Git',          logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg',           color: '#7C3AED' },
];

const colorFilters: Record<string, string> = {
  '#0066FF': 'brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(2000%) hue-rotate(210deg) brightness(102%) contrast(105%)',
  '#7C3AED': 'brightness(0) saturate(100%) invert(24%) sepia(73%) saturate(1800%) hue-rotate(255deg) brightness(80%) contrast(110%)',
};

const stats = [
  { value: 150,   suffix: '+', label: 'Projects Delivered', icon: Briefcase,  color: '#0066FF' },
  { value: 75,    suffix: '+', label: 'Global Clients',     icon: Users,      color: '#7C3AED' },
  { value: 98,    suffix: '%', label: 'Client Retention',   icon: Heart,      color: '#EC4899' },
  { value: '24/7',suffix: '',  label: 'Support Coverage',   icon: Headphones, color: '#10B981' },
];

const whyUs = [
  { icon: TrendingUp, title: 'Proven Track Record', desc: '150+ delivered enterprise projects with 98% client retention rate – we deliver measurable results.',                                color: '#0066FF', bg: 'rgba(0, 102, 255, 0.08)' },
  { icon: Shield,     title: 'Security First',       desc: 'ISO 27001 aligned practices, weekly vulnerability scans, and enterprise-grade compliance standards.',                              color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.08)' },
  { icon: Users,      title: 'Elite Engineering Team',desc: 'Senior engineers from FAANG and unicorn startups with deep expertise across the modern stack.',                                  color: '#0066FF', bg: 'rgba(0, 102, 255, 0.08)' },
  { icon: Award,      title: 'Quality Assured',       desc: 'CI/CD pipelines, automated testing, 24/7 monitoring, and guaranteed service level agreements.',                                  color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.08)' },
];

const tickerItems = [
  { icon: Code,        label: 'Custom Web Apps'          },
  { icon: Bot,         label: 'Generative AI Integration' },
  { icon: Cloud,       label: 'Cloud Migration'           },
  { icon: Search,      label: 'SEO for SaaS'              },
  { icon: ShieldCheck, label: 'Penetration Testing'       },
  { icon: Factory,     label: 'Industrial IoT'            },
  { icon: Smartphone,  label: 'Progressive Web Apps'      },
  { icon: GitBranch,   label: 'DevOps Pipelines'          },
];

const clientLogos = [
  { src: '/mk.png',       alt: 'MK partner logo – enterprise software client',    name: 'MK'      },
  { src: '/sheilogo.png', alt: 'Shei logo – trusted technology partner',          name: 'Shei'    },
  { src: '/smw.webp',     alt: 'SMW client logo – digital transformation',        name: 'SMW'     },
  { src: '/stslogo.png',  alt: 'STS logo – strategic technology alliance',        name: 'STS'     },
  { src: '/Twinkle.png',  alt: 'Twinkle logo – innovative solutions partner',     name: 'Twinkle' },
  { src: '/SL.jpeg',      alt: 'Sovereign Luxora – enterprise software client',    name: 'Dubai'      },
  { src: '/S.jpeg',       alt: 'Siruvani – enterprise software client',    name: 'Siruvani'      },
  { src: '/os.png',       alt: 'ORTUSAMIGOS IT SOLUTIONS – enterprise software client',    name: 'ORTUSAMIGOS IT SOLUTIONS'      },
];

const logosNeedingSizeBoost = ['/SL.jpeg'];

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  const [darkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const bgY2         = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const colors = {
    primary:    COLORS.primary,
    accent:     COLORS.accent,
    background: darkMode ? '#0A0A0A' : COLORS.background,
    text:       darkMode ? '#F9FAFB' : COLORS.text,
    muted:      darkMode ? '#9CA3AF' : COLORS.muted,
    cardBg:     darkMode ? 'rgba(18, 18, 18, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.3)',
    cardShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.08)',
    sectionBg1: darkMode ? '#0F0F10' : '#F8F9FC',
    sectionBg2: darkMode ? '#0A0A0A' : '#FFFFFF',
    border:     darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
  };

  useEffect(() => {
    document.body.style.background  = colors.background;
    document.body.style.color       = colors.text;
    document.body.style.transition  = 'background-color 0.3s ease, color 0.3s ease';
    if (darkMode) document.documentElement.classList.add('dark');
    else          document.documentElement.classList.remove('dark');
    return () => {
      document.body.style.background  = '';
      document.body.style.color       = '';
      document.body.style.transition  = '';
      document.documentElement.classList.remove('dark');
    };
  }, [darkMode, colors.background, colors.text]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://elitecrows.in/#webpage-home',
        url: 'https://elitecrows.in/',
        name: 'EliteCrows Infotech | Enterprise Software, AI & Cloud Development Agency – India',
        description: 'EliteCrows Infotech delivers high-performance web apps, AI chatbots, cloud infrastructure, and cybersecurity. 10+ projects. 75+ global clients.',
        isPartOf: { '@id': 'https://elitecrows.in/#website' },
        about: { '@id': 'https://elitecrows.in/#organization' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elitecrows.in/' },
          ],
        },
        inLanguage: 'en-IN',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.hero-section'],
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://elitecrows.in/#organization',
        name: 'EliteCrows Infotech',
        alternateName: 'EliteCrows',
        url: 'https://elitecrows.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://elitecrows.in/eclogo.png',
          width: 512,
          height: 512,
        },
        description: 'Enterprise software development agency specializing in AI, cloud infrastructure, cybersecurity, digital marketing, and custom web applications.',
        foundingDate: '2023',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 75 },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gobichettipalayam College Pirivu',
          addressLocality: 'Gobichettipalayam',
          addressRegion: 'Tamil Nadu',
          postalCode: '638453',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+916383106107',
          contactType: 'customer service',
          areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
          availableLanguage: ['English', 'Tamil'],
        },
        email: 'info@elitecrows.com',
        telephone: '+916383106107',
        sameAs: ['https://linkedin.com/company/elitecrows', 'https://twitter.com/elitecrows'],
        knowsAbout: ['Custom Software Development', 'AI Chatbots', 'Cloud Architecture', 'Cybersecurity', 'Web Development', 'Digital Marketing', 'React.js', 'Node.js', 'AWS', 'DevOps'],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>EliteCrows Infotech | Enterprise Software, AI & Cloud Development Agency – India</title>
        <meta name="description" content="EliteCrows Infotech builds enterprise web apps, AI automation, cloud infrastructure, and cybersecurity solutions. 150+ projects delivered." />
        <meta name="keywords" content="custom software development India, enterprise software development, AI automation agency, AI chatbot development, cloud consulting Tamil Nadu, cloud migration services, cybersecurity services, React development, Node.js development, Next.js development, AWS consulting, DevOps services, digital transformation, elitecrows infotech" />
        <meta name="author" content="EliteCrows Infotech" />
        <link rel="canonical" href="https://elitecrows.in/" />
        <meta property="og:site_name" content="EliteCrows Infotech" />
        <meta property="og:title" content="EliteCrows Infotech – Enterprise Software, AI & Cloud Engineering" />
        <meta property="og:description" content="We build scalable, secure digital products for high-growth enterprises. AI, cloud, web, cybersecurity – all under one roof. 150+ projects delivered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.in/" />
        <meta property="og:image" content="https://elitecrows.in/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EliteCrows Infotech home page – Enterprise Software, AI & Cloud" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@elitecrows" />
        <meta name="twitter:title" content="EliteCrows Infotech – Enterprise Software, AI & Cloud Engineering" />
        <meta name="twitter:description" content="Custom software development, AI chatbots, cloud infrastructure, and cybersecurity for forward-thinking enterprises. 150+ projects delivered." />
        <meta name="twitter:image" content="https://elitecrows.in/og-image.jpg" />
        <meta name="twitter:image:alt" content="EliteCrows Infotech – Enterprise Software, AI & Cloud Engineering" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main
        id="main-content"
        aria-label="EliteCrows Infotech home page content"
        style={{ background: colors.background, color: colors.text, minHeight: '100vh', overflowX: 'hidden', transition: 'background-color 0.3s, color 0.3s', position: 'relative' }}
      >

        {/* ══════════════════════ HERO ══════════════════════ */}
        <motion.section
          className="hero-section"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingBottom: '80px',
            position: 'relative',
            overflow: 'hidden',
            background: darkMode
              ? 'linear-gradient(135deg, #0A0A0A 0%, #0F0F10 50%, #0A0A0A 100%)'
              : 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)',
            opacity: heroOpacity,
            transition: 'background 0.3s',
          }}
        >
          <HeroCrystals darkMode={darkMode} />
          <motion.div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)', y: backgroundY, pointerEvents: 'none' }} />
          <motion.div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', y: bgY2, pointerEvents: 'none' }} />

          <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '32px',
                  color: colors.text,
                  maxWidth: '900px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Enterprise Software,{' '}
                <span style={{ background: 'linear-gradient(135deg, #0066FF 0%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  AI & Cloud Engineering
                </span>{' '}
                That Scales
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 21px)',
                  lineHeight: 1.6,
                  color: colors.muted,
                  marginBottom: '48px',
                  maxWidth: '700px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}
              >
                EliteCrows builds future-ready digital solutions – from AI-native applications and cloud infrastructure to zero-trust cybersecurity. Trusted by 75+ global brands across industries.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 36px', fontSize: '16px', fontWeight: 600, borderRadius: '50px', background: colors.primary, color: 'white', textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,102,255,0.25)' }}
                  >
                    Get a Free Consultation <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/services"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 36px', fontSize: '16px', fontWeight: 600, borderRadius: '50px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', color: colors.text, textDecoration: 'none', border: `1px solid ${colors.border}` }}
                  >
                    Explore AI Solutions <Zap size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <motion.div
            style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: colors.muted }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.section>

        {/* ══════════════════════ STATS ══════════════════════ */}
        <section className="stats-section" style={{ padding: '60px 0', background: darkMode ? 'rgba(15,15,16,0.8)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 2, position: 'relative' }}>
          <div className="container">
            <Reveal>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6, boxShadow: '0 20px 35px rgba(0,0,0,0.08)' }}
                      style={{ textAlign: 'center', padding: '28px 18px', borderRadius: '24px', background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: `1px solid ${colors.border}`, transition: 'all 0.3s ease' }}
                    >
                      <div style={{ marginBottom: '14px' }}><Icon size={28} color={s.color} strokeWidth={1.8} /></div>
                      <div style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-0.03em', color: colors.text, lineHeight: 1, marginBottom: '8px' }}>
                        <AnimatedCounter target={s.value} suffix={s.suffix} />
                      </div>
                      <div style={{ fontSize: '13px', color: colors.muted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════ TICKER ══════════════════════ */}
        <div
          className="ticker-section"
          style={{ borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, background: darkMode ? 'rgba(15,15,16,0.9)' : '#FAFBFC', padding: '24px 0', overflow: 'hidden', position: 'relative', whiteSpace: 'nowrap', zIndex: 2 }}
        >
          <style>{`
            @keyframes tickerScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .ticker-track {
              display: flex;
              width: fit-content;
              animation: tickerScroll 35s linear infinite;
            }
            .ticker-container:hover .ticker-track {
              animation-play-state: paused;
            }
            .ticker-chip {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin: 0 18px;
              padding: 8px 20px;
              background: ${darkMode ? 'rgba(255,255,255,0.04)' : '#FFFFFF'};
              border: 1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
              border-radius: 40px;
              transition: all 0.25s ease;
              cursor: default;
              white-space: nowrap;
            }
            .ticker-chip:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(0,0,0,0.05);
              border-color: ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,102,255,0.15)'};
            }
            @media (max-width: 767px) {
              .ticker-chip { margin: 0 8px; padding: 6px 14px; }
              .ticker-chip-text { font-size: 11px !important; }
            }
            .ticker-chip-icon {
              display: flex; align-items: center; justify-content: center;
              width: 24px; height: 24px;
              color: ${COLORS.primary};
            }
            .ticker-chip-text {
              font-size: 13px; font-weight: 600;
              letter-spacing: 0.04em;
              color: ${darkMode ? '#E5E7EB' : '#1F2937'};
              text-transform: uppercase;
            }
          `}</style>
          <div className="ticker-container" style={{ position: 'relative' }}>
            <div className="ticker-track">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} style={{ display: 'flex', flexShrink: 0 }}>
                  {tickerItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={`${dup}-${idx}`} className="ticker-chip">
                        <span className="ticker-chip-icon"><Icon size={16} strokeWidth={2} /></span>
                        <span className="ticker-chip-text">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════ SERVICES ══════════════════════ */}
        <section className="services-section" style={{ padding: '100px 0', background: 'linear-gradient(135deg, #F8FAFC 0%, #F3F0FF 100%)', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', borderRadius: '100px', marginBottom: '18px', border: '1px solid rgba(255,255,255,0.8)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Core Capabilities</span>
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', color: colors.text }}>
                  Enterprise Solutions Engineered for{' '}
                  <span style={{ background: 'linear-gradient(135deg, #0066FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale & Security</span>
                </h2>
                <p style={{ color: colors.muted, maxWidth: '560px', margin: '0 auto', fontSize: '16px', lineHeight: 1.6 }}>
                  From concept to deployment – we deliver secure, scalable systems that drive business growth and operational efficiency.
                </p>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {services.map((svc, i) => (
                <Reveal key={i} delay={i * 0.06} direction="up">
                  <motion.div
                    whileHover={{ y: -5 }}
                    style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '28px 24px', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 12px 30px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                      <motion.div
                        whileHover={{ rotate: 3, scale: 1.1 }}
                        style={{ width: '44px', height: '44px', borderRadius: '14px', background: svc.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 15px rgba(0,102,255,0.15)' }}
                      >
                        <svc.icon size={22} color="white" strokeWidth={1.5} />
                      </motion.div>
                      <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: colors.text, marginBottom: '6px', letterSpacing: '-0.01em' }}>{svc.title}</h3>
                        <p style={{ color: colors.muted, fontSize: '13px', lineHeight: 1.6, marginBottom: 0 }}>{svc.desc}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
                      <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: svc.color, textDecoration: 'none', minHeight: '44px' }}>
                        Learn More <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ WHY US ══════════════════════ */}
        <section className="whyus-section" style={{ padding: '120px 0', background: '#F9CD05', position: 'relative', overflow: 'hidden', zIndex: 2 }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="whyus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
              <Reveal direction="left">
                <div>
                  <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,0,0,0.1)', borderRadius: '100px', marginBottom: '24px', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A0A0A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Why EliteCrows</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '24px', color: '#0A0A0A' }}>
                    Over a Decade of Engineering Excellence –{' '}
                    <span style={{ background: 'linear-gradient(135deg, #0066FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Zero Compromise on Quality</span>
                  </h2>
                  <p style={{ color: '#333', lineHeight: 1.7, fontSize: '17px', marginBottom: '36px', maxWidth: '480px' }}>
                    We bring elite engineering, automated CI/CD pipelines, and architectural rigor to every system we build. Our track record speaks for itself.
                  </p>
                  <motion.div whileHover={{ x: 6 }}>
                    <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0066FF', fontWeight: 700, fontSize: '15px', textDecoration: 'none', minHeight: '44px' }}>
                      Discover Our Story & Vision <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </Reveal>
              <div className="whyus-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {whyUs.map((item, i) => (
                  <Reveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'right' : 'up'}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      style={{ padding: '32px 24px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                    >
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <item.icon size={20} color={item.color} strokeWidth={1.5} />
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0A0A0A', marginBottom: '8px' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{item.desc}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ CLIENT LOGOS ══════════════════════ */}
        <section className="clients-section" style={{ padding: '80px 0', background: colors.background, zIndex: 2, position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', background: darkMode ? 'rgba(0,102,255,0.15)' : 'rgba(0,102,255,0.06)', borderRadius: '100px', marginBottom: '20px', border: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: colors.primary, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Trusted Partners</span>
                </div>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>
                  Trusted by Industry Leaders Worldwide
                </h2>
                <p style={{ color: colors.muted, maxWidth: '500px', margin: '0 auto', fontSize: '15px', lineHeight: 1.6 }}>
                  From innovative startups to Fortune 150 enterprises – organizations rely on EliteCrows for their most critical digital initiatives.
                </p>
              </div>
            </Reveal>
            <div style={{ width: '100%', overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <style>{`
                @keyframes logoScroll {
                  0%   { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .logo-track {
                  display: flex;
                  width: fit-content;
                  animation: logoScroll 25s linear infinite;
                  gap: 48px;
                  align-items: center;
                }
                .logo-track:hover { animation-play-state: paused; }
                .logo-item {
                  flex-shrink: 0;
                  opacity: 0.7;
                  transition: opacity 0.2s ease, transform 0.2s ease;
                  cursor: default;
                }
                .logo-item:hover { opacity: 1; transform: translateY(-2px); }
                @media (max-width: 767px) {
                  .logo-track { gap: 24px; }
                  .logo-item img { height: 40px !important; }
                }
              `}</style>
              <div className="logo-track">
                {[...clientLogos, ...clientLogos].map((logo, idx) => {
                  const needsSizeBoost = logosNeedingSizeBoost.includes(logo.src);
                  return (
                    <div key={idx} className="logo-item">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        title={logo.name}
                        loading="lazy"
                        decoding="async"
                        width={needsSizeBoost ? 160 : 140}
                        height={needsSizeBoost ? 70 : 60}
                        style={{
                          height: needsSizeBoost ? '70px' : '60px',
                          width: 'auto',
                          maxWidth: '160px',
                          objectFit: 'contain',
                          filter: darkMode ? 'brightness(0) invert(1)' : 'none'
                        }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ TECH STACK ══════════════════════ */}
        <section className="tech-section" style={{ padding: '120px 0', background: colors.background, zIndex: 2, position: 'relative' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', background: darkMode ? 'rgba(0,102,255,0.15)' : 'rgba(0,102,255,0.06)', borderRadius: '100px', marginBottom: '20px', border: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: colors.primary, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Modern Stack</span>
                </div>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: colors.text }}>
                  Technologies We Master
                </h2>
                <p style={{ color: colors.muted, maxWidth: '560px', margin: '12px auto 0', fontSize: '16px', lineHeight: 1.6 }}>
                  Leveraging best-in-class tools and frameworks for performance, security, and scalability at every layer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
                {technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : '#FFFFFF', border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'default', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #0066FF, #7C3AED)', opacity: 0.7, borderRadius: '16px 16px 0 0' }} />
                    <img
                      src={tech.logo}
                      style={{ height: '36px', width: '36px', objectFit: 'contain', position: 'relative', zIndex: 1, filter: colorFilters[tech.color] ?? colorFilters['#0066FF'] }}
                      onError={(e: any) => (e.currentTarget.style.display = 'none')}
                      alt={`${tech.name} logo – technology used by EliteCrows Infotech`}
                      title={tech.name}
                      loading="lazy"
                      width="36"
                      height="36"
                      decoding="async"
                    />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.text, textAlign: 'center', letterSpacing: '-0.01em', position: 'relative', zIndex: 1 }}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="service-areas-preview" style={{ padding: '100px 0', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(0,102,255,0.06)', borderRadius: '100px', marginBottom: '18px', border: '1px solid rgba(0,102,255,0.08)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: colors.primary, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Service Areas</span>
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: colors.text, marginBottom: '12px' }}>
                  Serving businesses across Tamil Nadu
                </h2>
                <p style={{ color: colors.muted, maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
                  We support clients in Coimbatore, Tiruppur, Erode, Salem, and across nearby industrial and commercial hubs with custom software, AI automation, cloud migration, and cybersecurity.
                </p>
              </div>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
              {[
                ['Coimbatore AI automation services', '/coimbatore'],
                ['Tiruppur software development', '/tiruppur'],
                ['Erode cloud consulting', '/erode'],
                ['Salem cybersecurity services', '/salem'],
                ['Full service area list', '/service-areas'],
              ].map(([label, path]) => (
                <Link key={path} to={path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '18px 20px', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.08)', background: '#FAFBFC', color: colors.text, textDecoration: 'none', fontWeight: 600 }}>
                  <span>{label}</span>
                  <ArrowRight size={16} color={colors.primary} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section className="cta-section" style={{ padding: '120px 0', background: colors.sectionBg1, zIndex: 2, position: 'relative' }}>
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
            <Reveal>
              <motion.div
                whileHover={{ y: -6 }}
                className="cta-card"
                style={{ textAlign: 'center', background: colors.cardBg, backdropFilter: 'blur(24px)', borderRadius: '40px', padding: '80px 48px', boxShadow: colors.cardShadow, border: `1px solid ${colors.cardBorder}`, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '-40%', left: '-20%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-40%', right: '-20%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, rgba(0,102,255,0.1), rgba(124,58,237,0.1))', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', border: `1px solid ${colors.border}` }}
                >
                  <Rocket size={32} color={colors.primary} strokeWidth={1.5} />
                </motion.div>
                <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '20px', color: colors.text }}>
                  Ready to Build Your Next{' '}
                  <span style={{ background: 'linear-gradient(135deg, #0066FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Breakthrough Product?</span>
                </h2>
                <p style={{ color: colors.muted, fontSize: '18px', lineHeight: 1.65, marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
                  Join 75+ forward-thinking companies that accelerated their roadmap with EliteCrows. Limited slots for new enterprise partnerships this quarter.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 44px', fontSize: '16px', fontWeight: 600, borderRadius: '40px', background: colors.primary, color: 'white', textDecoration: 'none', minHeight: '52px' }}
                  >
                    Book a Strategy Call <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <style>{`
          .container {
            width: 100%;
            margin: 0 auto;
            padding: 0 24px;
          }
          @media (min-width: 1280px) { .container { max-width: 1280px; } }
          @media (min-width: 1920px) { .container { max-width: 1600px; } }
          @media (max-width: 767px) {
            .hero-section    { padding-top: 60px !important; padding-bottom: 60px !important; }
            .stats-section   { padding: 40px 0 !important; }
            .services-section{ padding: 60px 0 !important; }
            .whyus-section   { padding: 80px 0 !important; }
            .clients-section { padding: 60px 0 !important; }
            .tech-section    { padding: 80px 0 !important; }
            .cta-section     { padding: 80px 0 !important; }
            .whyus-grid      { gap: 40px !important; }
            .whyus-cards     { grid-template-columns: 1fr !important; }
            .cta-card        { padding: 40px 24px !important; border-radius: 32px !important; }
            .stats-grid      { gap: 16px !important; grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .whyus-grid      { gap: 48px !important; }
            .cta-card        { padding: 60px 40px !important; }
            .services-section{ padding: 80px 0 !important; }
          }
          img { max-width: 100%; height: auto; }
          button, a, [role="button"] { touch-action: manipulation; }
          * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        `}</style>
      </main>
    </>
  );
}