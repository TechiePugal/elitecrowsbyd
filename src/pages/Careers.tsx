import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  TrendingUp, Users, Award, Rocket, ArrowRight, CheckCircle,
  Sparkles, Clock, Shield, HelpCircle, ChevronDown, ChevronUp,
  Briefcase, Heart, Calendar, Mail, FileText, X
} from 'lucide-react';

// ------------------------------------------------------------------
// Reusable reveal animation
// ------------------------------------------------------------------
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Static data (professional / experienced hiring)
// ------------------------------------------------------------------
const benefits = [
  { icon: TrendingUp, color: '#0071E3', bg: '#EAF3FF', title: 'Competitive Pay', desc: 'Industry-benchmarked salaries, performance bonuses, and annual appraisals that reward real impact.' },
  { icon: Rocket, color: '#AF52DE', bg: '#F5EDFF', title: 'Career Growth', desc: 'Clear promotion paths, leadership tracks, and ownership of products that shape the company.' },
  { icon: Heart, color: '#FF3B30', bg: '#FFEDEC', title: 'Health & Wellness', desc: 'Medical insurance, paid time off, and a culture that genuinely respects work-life balance.' },
  { icon: Clock, color: '#34C759', bg: '#EDFBF1', title: 'Flexible & Remote', desc: 'Remote and hybrid options, flexible hours, and modern tooling so you do your best work.' },
];

// Open roles power both the chips UI and the JobPosting SEO schema
const openRoles = [
  { title: 'Senior Full-Stack Developer', dept: 'Engineering', type: 'Full-time', employmentType: 'FULL_TIME', exp: '3–6 yrs', desc: 'Build and scale production web applications across React, Node.js, and modern cloud infrastructure.' },
  { title: 'AI / Machine Learning Engineer', dept: 'AI', type: 'Full-time', employmentType: 'FULL_TIME', exp: '2–5 yrs', desc: 'Design, train, and ship ML models and LLM/agentic features into real customer products.' },
  { title: 'DevOps / Cloud Engineer', dept: 'Cloud', type: 'Full-time', employmentType: 'FULL_TIME', exp: '3–6 yrs', desc: 'Own CI/CD, Kubernetes, and AWS/Azure infrastructure for high-availability systems.' },
  { title: 'UI / UX Designer', dept: 'Design', type: 'Full-time', employmentType: 'FULL_TIME', exp: '2–4 yrs', desc: 'Craft intuitive, beautiful product experiences from research and wireframes to polished UI.' },
  { title: 'Digital Marketing & SEO Specialist', dept: 'Marketing', type: 'Full-time', employmentType: 'FULL_TIME', exp: '2–5 yrs', desc: 'Drive organic growth through technical SEO, content strategy, and performance campaigns.' },
  { title: 'Cybersecurity Analyst', dept: 'Security', type: 'Full-time', employmentType: 'FULL_TIME', exp: '2–5 yrs', desc: 'Run VAPT, threat monitoring, and compliance to keep client systems secure.' },
  { title: 'QA / Automation Engineer', dept: 'Engineering', type: 'Full-time', employmentType: 'FULL_TIME', exp: '2–4 yrs', desc: 'Build automated test suites and own quality across the release pipeline.' },
  { title: 'Project / Delivery Manager', dept: 'Delivery', type: 'Full-time', employmentType: 'FULL_TIME', exp: '4–8 yrs', desc: 'Lead cross-functional teams and deliver client projects on scope, time, and budget.' },
];

const experienceOptions = ['0–2 Years', '2–4 Years', '4–6 Years', '6+ Years'];

const faqs = [
  { q: 'What roles are you currently hiring for?', a: 'We hire experienced professionals across engineering, AI/ML, cloud & DevOps, design, digital marketing, cybersecurity, QA, and delivery management. See the open positions above for current openings.' },
  { q: 'Are these roles remote, hybrid, or on-site?', a: 'We offer remote, hybrid, and on-site options. Our office is in Gobichettipalayam, Tamil Nadu, but we hire talent from across India for most roles.' },
  { q: 'What does the interview process look like?', a: 'Typically a short screening call, a technical or portfolio round relevant to the role, and a final discussion with the team. The full process usually takes one to two weeks.' },
  { q: 'What compensation and benefits do you offer?', a: 'Industry-benchmarked salaries, performance bonuses, medical insurance, paid leave, and a clear growth path. Final compensation depends on role and experience.' },
  { q: 'How soon can I expect to hear back?', a: 'We review every application and respond within 48 hours. Shortlisted candidates are contacted to schedule the first round.' },
];

// JobPosting dates — update these as you refresh your openings
const POSTED_DATE = '2026-06-01';
const VALID_THROUGH = '2026-08-31';

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
export default function Careers() {
  const [formType, setFormType] = useState('fulltime');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formDataForModal, setFormDataForModal] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // ------------------------------------------------------------------
  // DIRECT MAIL LOGIC
  // ------------------------------------------------------------------
  const buildEmailBody = (formValues: any) => {
    const typeLabel = formValues.form_type === 'contract' ? 'Contract' : 'Full-time';
    const lines = [
      `Application Type: ${typeLabel}`,
      `Full Name: ${formValues.name}`,
      `Email: ${formValues.email}`,
      `Phone: ${formValues.phone}`,
      `Role Applying For: ${formValues.role}`,
      `Total Experience: ${formValues.experience}`,
      `Resume / LinkedIn / Portfolio Link: ${formValues.resume || 'Not provided'}`,
      `\nWhy do you want to join EliteCrows?\n${formValues.message}`,
      `\n---\nThis application was submitted via the EliteCrows careers page.`
    ];
    return lines.join('\n');
  };

  const handleDirectMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formValues: any = {};
    formData.forEach((value, key) => { formValues[key] = value; });

    if (!formValues.name || !formValues.email || !formValues.phone || !formValues.role || !formValues.experience || !formValues.message) {
      alert('Please fill in all required fields (*).');
      return;
    }

    setFormDataForModal(formValues);
    setShowConfirmModal(true);
  };

  const proceedToMailClient = () => {
    if (!formDataForModal) return;
    const subject = `Job Application - ${formDataForModal.name} (${formDataForModal.role})`;
    const body = buildEmailBody(formDataForModal);
    const mailtoLink = `mailto:elitecrowsindia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setShowConfirmModal(false);
    setLoading(false);
    setShowSuccess(true);
    if (formRef.current) formRef.current.reset();
    setSelectedExperience('');

    setTimeout(() => setShowSuccess(false), 5000);
  };

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
  };

  const careersJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://elitecrows.in/careers#webpage',
        url: 'https://elitecrows.in/careers',
        name: 'Careers & Job Openings at EliteCrows Infotech',
        description: 'Explore full-time and contract IT jobs at EliteCrows Infotech — software development, AI/ML, cloud, design, marketing, and cybersecurity roles for experienced professionals.',
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Organization',
        '@id': 'https://elitecrows.in/#organization',
        name: 'EliteCrows Infotech',
        url: 'https://elitecrows.in',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gobichettipalayam College Pirivu',
          addressLocality: 'Gobichettipalayam',
          addressRegion: 'Tamil Nadu',
          postalCode: '638453',
          addressCountry: 'IN',
        },
      },
      ...openRoles.map((r) => ({
        '@type': 'JobPosting',
        title: r.title,
        description: `${r.desc} Experience: ${r.exp}. Department: ${r.dept}.`,
        datePosted: POSTED_DATE,
        validThrough: VALID_THROUGH,
        employmentType: r.employmentType,
        industry: 'Information Technology',
        occupationalCategory: r.dept,
        directApply: true,
        hiringOrganization: { '@id': 'https://elitecrows.in/#organization' },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Gobichettipalayam College Pirivu',
            addressLocality: 'Gobichettipalayam',
            addressRegion: 'Tamil Nadu',
            postalCode: '638453',
            addressCountry: 'IN',
          },
        },
        applicantLocationRequirements: { '@type': 'Country', name: 'India' },
        jobLocationType: 'TELECOMMUTE',
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <title>Careers at EliteCrows Infotech | IT Jobs & Openings in Tamil Nadu</title>
        <meta name="description" content="Join EliteCrows Infotech. Full-time & contract IT jobs for experienced professionals: software developers, AI/ML engineers, DevOps, designers, marketers & security analysts. Remote & hybrid. Apply now." />
        <meta name="keywords" content="EliteCrows careers, IT jobs Tamil Nadu, software developer jobs India, AI ML engineer jobs, DevOps cloud engineer jobs, UI UX designer jobs, digital marketing SEO jobs, cybersecurity analyst jobs, full stack developer hiring, remote IT jobs India, Gobichettipalayam IT company jobs, experienced developer recruitment" />
        <link rel="canonical" href="https://elitecrows.in/careers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:site_name" content="EliteCrows Infotech" />
        <meta property="og:title" content="Careers at EliteCrows Infotech | IT Jobs & Openings" />
        <meta property="og:description" content="Full-time & contract IT roles for experienced professionals — engineering, AI, cloud, design, marketing & security. Remote & hybrid options. Apply now." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.in/careers" />
        <meta property="og:image" content="https://elitecrows.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at EliteCrows Infotech | IT Jobs & Openings" />
        <meta name="twitter:description" content="We're hiring experienced IT professionals across engineering, AI, cloud, design, marketing & security. Remote & hybrid. Apply now." />
        <meta name="twitter:image" content="https://elitecrows.in/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(careersJsonLd)}</script>
      </Helmet>

      <main style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ─── HERO SECTION WITH ANIMATED UNDERLINE UNDER "WITH US" ─── */}
        <section className="careers-hero" style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)', padding: 'clamp(80px, 15vw, 120px) 0 clamp(60px, 10vw, 100px)' }}>
          {/* Animated orbs */}
          <motion.div animate={{ x: [0, 80, 0, -80, 0], y: [0, -40, 0, 40, 0], scale: [1, 1.15, 1, 1.2, 1] }} transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }} style={{ position: 'absolute', top: '10%', right: '5%', width: 'min(350px, 40vw)', height: 'min(350px, 40vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(0,198,255,0.03) 50%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <motion.div animate={{ x: [0, -60, 0, 60, 0], y: [0, 50, 0, -50, 0], scale: [1, 1.2, 1, 1.1, 1] }} transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse' }} style={{ position: 'absolute', bottom: '10%', left: '5%', width: 'min(300px, 35vw)', height: 'min(300px, 35vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(175,82,222,0.06) 0%, rgba(0,113,227,0.02) 60%, transparent 80%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <motion.div animate={{ x: [0, 50, 0, -50, 0], y: [0, -30, 0, 30, 0], scale: [1, 1.1, 1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }} style={{ position: 'absolute', top: '50%', left: '30%', width: 'min(250px, 30vw)', height: 'min(250px, 30vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,149,0,0.05) 0%, rgba(255,179,71,0.02) 60%, transparent 80%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

          {/* Particles */}
          {particles.map((p, i) => (
            <motion.div key={i} initial={{ x: `${p.x}%`, y: `${p.y}%` }} animate={{ y: [`${p.y}%`, `${p.y - 15}%`, `${p.y - 30}%`], opacity: [0, 0.4, 0] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }} style={{ position: 'absolute', width: '2px', height: '2px', background: `rgba(0, 113, 227, 0.3)`, borderRadius: '50%', pointerEvents: 'none' }} />
          ))}

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(0, 113, 227, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 113, 227, 0.15)', borderRadius: '100px', marginBottom: '32px' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><Sparkles size={16} color="#0071E3" /></motion.div>
              <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#0071E3' }}>WE'RE HIRING — FULL-TIME & REMOTE ROLES</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '28px' }}
            >
              Build the Future{' '}
              <span style={{
                background: 'linear-gradient(135deg, #0071E3, #00C6FF, #AF52DE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                display: 'inline-block'
              }}>
                With Us
                {/* Animated underline */}
                <motion.div
                  animate={{ width: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #0071E3, #00C6FF, transparent)',
                    borderRadius: '3px',
                  }}
                />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: '#6B7280', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Join EliteCrows Infotech and ship real products in AI, web, cloud, and more. Competitive pay, flexible remote work, and a team that values craft. Explore our open roles and apply today.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a href="#application-form" whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600 }}>View Open Roles <ArrowRight size={18} /></motion.a>
            </motion.div>
          </div>
        </section>

        {/* BENEFITS (yellow bg) - Fully responsive */}
        <section style={{ background: '#F9CD05', padding: 'clamp(60px, 10vw, 80px) 0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="badge" style={{ background: '#1D1D1F', color: '#F9CD05', display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: 600 }}>Why Join Us</span>
              <h2 style={{ color: '#1D1D1F', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700 }}>Where Careers <span style={{ color: '#FFFFFF' }}>Thrive</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: 'clamp(24px, 5vw, 32px)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', height: '100%' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Icon size={24} color={b.color} /></div>
                      <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700 }}>{b.title}</h3>
                      <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#6B7280' }}>{b.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS - Fully responsive */}
        <section style={{ background: '#FFFFFF', padding: 'clamp(60px, 10vw, 80px) 0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>Now Hiring</span>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700 }}>Open <span style={{ color: '#0071E3' }}>Positions</span></h2>
            <p style={{ color: '#6B7280', fontSize: 'clamp(14px, 2.5vw, 16px)', maxWidth: '620px', margin: '14px auto 0', lineHeight: 1.6 }}>
              Experienced professionals only. Pick the role that fits you and apply below — full-time and contract options available.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', maxWidth: '920px', margin: '32px auto 0' }}>
              {openRoles.map((role, i) => (
                <div key={i} style={{ padding: 'clamp(10px, 2vw, 12px) clamp(18px, 4vw, 22px)', borderRadius: '100px', background: '#F5F5F7', border: '1px solid #E5E5E7', fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  <Briefcase size={16} color="#0071E3" /> {role.title}
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#86868B', background: '#FFFFFF', border: '1px solid #E5E5E7', borderRadius: '100px', padding: '2px 10px' }}>{role.exp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM SECTION + DIRECT MAIL MODAL - Fully responsive 2-column */}
        <section id="application-form" style={{ background: '#F5F5F7', padding: 'clamp(60px, 10vw, 80px) 0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>

              {/* LEFT: FORM */}
              <div>
                <div style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', overflow: 'hidden' }}>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px)', borderBottom: '1px solid #E5E5E7', background: '#F9F9FB' }}>
                    <span className="badge" style={{ marginBottom: '14px' }}>Apply Now</span>
                    <h2 style={{ fontSize: 'clamp(24px, 5vw, 28px)' }}>Submit Your Application</h2>
                    <p style={{ color: '#6B7280', fontSize: '14px' }}>We review every application and respond within 48 hours.</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                      {['fulltime', 'contract'].map(type => (
                        <button key={type} onClick={() => setFormType(type)} style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, border: '1px solid', borderColor: formType === type ? '#0071E3' : '#E5E5E7', background: formType === type ? 'rgba(0,113,227,0.08)' : '#FFFFFF', color: formType === type ? '#0071E3' : '#86868B', cursor: 'pointer' }}>
                          {type === 'fulltime' ? '💼 Full-time' : '📄 Contract'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px)' }}>
                    {showSuccess ? (
                      <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <CheckCircle size={56} color="#34C759" />
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginTop: '16px' }}>Application Opened in Email!</h3>
                        <p style={{ color: '#6B7280' }}>Please check your default mail client, review the details, attach your resume, and send. We'll get back to you within 48 hours.</p>
                      </div>
                    ) : (
                      <form ref={formRef} onSubmit={handleDirectMailSubmit}>
                        <input type="hidden" name="form_type" value={formType} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                          <div><label style={{ fontSize: '13px', fontWeight: 600 }}>Full Name *</label><input name="name" required style={inputStyle} /></div>
                          <div><label style={{ fontSize: '13px', fontWeight: 600 }}>Email *</label><input name="email" required type="email" style={inputStyle} /></div>
                        </div>
                        <div style={{ marginBottom: '16px' }}><label style={{ fontSize: '13px', fontWeight: 600 }}>Phone *</label><input name="phone" required style={inputStyle} /></div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Role Applying For *</label>
                          <select name="role" required style={{ ...inputStyle, appearance: 'none' }}>
                            <option value="">Select a role</option>
                            {openRoles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                          </select>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Total Experience *</label>
                          <select name="experience" required value={selectedExperience} onChange={e => setSelectedExperience(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
                            <option value="">Select experience</option>
                            {experienceOptions.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Resume / LinkedIn / Portfolio Link (optional)</label>
                          <input name="resume" placeholder="Google Drive, LinkedIn, or personal website" style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Why do you want to join EliteCrows? *</label>
                          <textarea name="message" required rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                          <Mail size={18} /> Submit via Email
                        </button>
                        <p style={{ fontSize: '12px', color: '#8E8E93', textAlign: 'center', marginTop: '16px' }}>
                          You'll review your application before opening your email client.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT: TRUST + FAQ */}
              <div>
                <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(24px, 5vw, 32px)', marginBottom: '32px', border: '1px solid #E5E5E7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}><Shield size={28} color="#0071E3" /><h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700 }}>Why professionals choose EliteCrows</h3></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { icon: TrendingUp, text: 'Competitive salaries with performance bonuses and annual appraisals', color: '#FF9500' },
                      { icon: Clock, text: 'Remote & hybrid flexibility with modern tools and async workflows', color: '#34C759' },
                      { icon: Heart, text: 'Medical insurance, paid leave, and a real work-life balance', color: '#FF3B30' },
                      { icon: Users, text: 'Work alongside senior engineers on cutting-edge AI & cloud products', color: '#0071E3' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: `${item.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><item.icon size={18} color={item.color} /></div>
                        <span style={{ fontSize: 'clamp(13px, 2.5vw, 15px)' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div id="faq" style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(24px, 5vw, 32px)', border: '1px solid #E5E5E7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}><HelpCircle size={28} color="#0071E3" /><h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700 }}>FAQ</h3></div>
                  {faqs.map((faq, idx) => (
                    <div key={idx} style={{ borderBottom: idx !== faqs.length - 1 ? '1px solid #E5E5E7' : 'none' }}>
                      <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '12px' }}>
                        <span style={{ fontSize: 'clamp(14px, 3vw, 15px)', fontWeight: 600 }}>{faq.q}</span>
                        {openFaq === idx ? <ChevronUp size={18} style={{ flexShrink: 0 }} /> : <ChevronDown size={18} style={{ flexShrink: 0 }} />}
                      </button>
                      {openFaq === idx && <div style={{ paddingBottom: '20px', color: '#6B7280', fontSize: 'clamp(13px, 2.5vw, 14px)', lineHeight: 1.6 }}>{faq.a}</div>}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '32px', background: '#F9F9FB', borderRadius: '24px', padding: 'clamp(16px, 4vw, 20px)', textAlign: 'center', border: '1px solid #E5E5E7' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      minHeight: '240px',
                      overflow: 'hidden',
                      borderRadius: '18px',
                      border: '1px solid #E5E5E7',
                      background: '#E5E7EB',
                    }}
                  >
                    <iframe
                      title="EliteCrows InfoTech location map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.2937430275847!2d77.40299637452564!3d11.458710946239508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba93d62ff07a7df%3A0xfab3331e9ce37a35!2sEliteCrows%20InfoTech!5e0!3m2!1sen!2sin!4v1781283152949!5m2!1sen!2sin"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONFIRMATION MODAL - Fully responsive */}
        {showConfirmModal && formDataForModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '500px', width: '100%', background: '#FFFFFF', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', margin: '16px' }}>
              <div style={{ padding: 'clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) 16px', borderBottom: '1px solid #E5E5E7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={24} color="#0071E3" /> Review & Send</h3>
                <button onClick={() => setShowConfirmModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={24} /></button>
              </div>
              <div style={{ padding: 'clamp(20px, 5vw, 28px)', maxHeight: '60vh', overflowY: 'auto' }}>
                <div style={{ background: '#F5F5F7', padding: '16px', borderRadius: '20px', marginBottom: '24px', wordBreak: 'break-word' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>📋 Application summary</p>
                  <p><strong>Name:</strong> {formDataForModal.name}</p>
                  <p><strong>Email:</strong> {formDataForModal.email}</p>
                  <p><strong>Phone:</strong> {formDataForModal.phone}</p>
                  <p><strong>Role:</strong> {formDataForModal.role}</p>
                  <p><strong>Experience:</strong> {formDataForModal.experience}</p>
                  <p><strong>Resume link:</strong> {formDataForModal.resume || '—'}</p>
                </div>
                <div style={{ background: '#FFFBEB', borderRadius: '20px', padding: '16px', marginBottom: '16px', border: '1px solid #FEF3C7' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#B45309', flexWrap: 'wrap' }}><Sparkles size={18} /> Attach your resume</p>
                  <p style={{ fontSize: '13px', color: '#92400E', marginTop: '4px' }}>Your email client will open with all details pre-filled. <strong>Please manually attach your resume (PDF/DOC)</strong> before hitting send. This step ensures your application is complete.</p>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>The email will be sent to <strong>elitecrowsindia@gmail.com</strong>. You can edit the message before sending.</p>
              </div>
              <div style={{ padding: '16px clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px)', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #E5E5E7', flexWrap: 'wrap' }}>
                <button onClick={() => setShowConfirmModal(false)} style={{ padding: '10px 20px', borderRadius: '40px', background: '#F2F2F5', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button onClick={proceedToMailClient} style={{ padding: '10px 24px', borderRadius: '40px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Mail size={16} /> Open Email & Attach Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <style>{`
        .container {
          width: 100%;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 24px;
          padding-right: 24px;
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
        button, a, [role="button"] {
          touch-action: manipulation;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 640px) {
          .container {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}