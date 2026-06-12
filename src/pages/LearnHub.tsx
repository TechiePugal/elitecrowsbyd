import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  GraduationCap, BookOpen, Briefcase, Target, Users, Rocket, Award,
  Code, Cpu, Cloud, Megaphone, Shield, Smartphone, Palette, Database,
  CheckCircle, Sparkles, ArrowRight, Clock, Calendar, X,
  Camera, Image as ImageIcon, Mail, Phone, MapPin, Send, FileText,
  HelpCircle, ChevronDown, ChevronUp, Star, TrendingUp, Globe, Zap,
  Crown, Brain, Layers, Gift, Trophy, Medal, ThumbsUp
} from 'lucide-react'

// Professional Color Scheme
const COLORS = {
  primary: '#2563EB',
  secondary: '#3B82F6',
  accent: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  dark: '#1E293B',
  light: '#64748B',
  background: '#F8FAFC',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
  gradientWarm: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  gradientPurple: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  gradientSuccess: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
}

// Animation Components
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = 16
    const inc = target / (1600 / step)
    const timer = setInterval(() => {
      start += inc
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

// Data
const stats = [
  { value: 2000, suffix: '+', label: 'Students Trained', icon: Users, color: COLORS.primary },
  { value: 92, suffix: '%', label: 'Placement Rate', icon: TrendingUp, color: COLORS.success },
  { value: 25, suffix: '+', label: 'Live Courses', icon: BookOpen, color: COLORS.accent },
  { value: 15, suffix: '+', label: 'Expert Mentors', icon: Award, color: COLORS.warning },
]

const programs = [
  { icon: Briefcase, title: 'Internship Program', desc: 'Work on real client projects with mentor guidance. Flexible duration with certificate.', color: COLORS.primary, bg: '#EFF6FF' },
  { icon: Target, title: 'Placement Training', desc: 'Aptitude, coding rounds, mock interviews, resume building, and hiring drives.', color: COLORS.success, bg: '#F0FDF4' },
  { icon: BookOpen, title: 'Industry Courses', desc: 'Beginner-to-advanced courses with live projects, not just theory.', color: COLORS.accent, bg: '#ECFEFF' },
]

const courses = [
  { track: 'Web Development', icon: Code, level: 'Beginner → Advanced', duration: '3 Months', mode: 'Online / Offline', title: 'Full-Stack Web Development (MERN)', desc: 'Build complete web apps with React, Node.js, Express, and MongoDB.', highlights: ['React', 'Node.js', 'MongoDB', 'Live Projects'] },
  { track: 'AI & Data Science', icon: Cpu, level: 'Beginner', duration: '2 Months', mode: 'Online / Offline', title: 'Python for Data Science & AI', desc: 'Master Python, data analysis, and visualization with machine learning fundamentals.', highlights: ['Python', 'Pandas', 'NumPy', 'Visualization'] },
  { track: 'AI & Data Science', icon: Sparkles, level: 'Intermediate', duration: '2 Months', mode: 'Online / Offline', title: 'Machine Learning & Generative AI', desc: 'Train ML models and build LLM-powered apps, chatbots, and AI agents.', highlights: ['ML Models', 'LLMs', 'RAG', 'Deployment'] },
  { track: 'Cloud & DevOps', icon: Cloud, level: 'Intermediate', duration: '2 Months', mode: 'Online / Offline', title: 'Cloud Computing & DevOps (AWS)', desc: 'Deploy, scale, and automate apps with AWS, Docker, Kubernetes, and CI/CD.', highlights: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
  { track: 'Digital Marketing', icon: Megaphone, level: 'Beginner', duration: '6 Weeks', mode: 'Online / Offline', title: 'Digital Marketing & SEO Mastery', desc: 'Learn SEO, social media, Google Ads, and content strategy that drives results.', highlights: ['SEO', 'Google Ads', 'Social Media', 'Analytics'] },
  { track: 'Cybersecurity', icon: Shield, level: 'Intermediate', duration: '2 Months', mode: 'Online / Offline', title: 'Cybersecurity & Ethical Hacking', desc: 'Hands-on VAPT, network security, and OWASP Top 10 with real lab environments.', highlights: ['Ethical Hacking', 'VAPT', 'OWASP', 'Network Security'] },
]

const placementFeatures = [
  { icon: Target, text: 'Aptitude & logical reasoning training' },
  { icon: Code, text: 'Coding & DSA interview rounds' },
  { icon: Users, text: 'Mock interviews — technical + HR' },
  { icon: Award, text: 'Resume & LinkedIn profile building' },
  { icon: Megaphone, text: 'Soft skills & communication coaching' },
  { icon: Rocket, text: 'Direct access to placement drives' },
]

const inquiryTypes = ['Course Enrollment', 'Internship Application', 'Placement Training', 'Career Guidance', 'Workshop Registration', 'General Query']
const preferredModes = ['Online', 'Offline', 'Hybrid']

const faqs = [
  { q: 'What is the duration of courses?', a: 'Our courses range from 6 weeks to 3 months depending on the program. Each course page has specific duration details.' },
  { q: 'Do you provide placement assistance?', a: 'Yes! We offer comprehensive placement training including aptitude tests, mock interviews, resume building, and direct access to placement drives until you get placed.' },
  { q: 'Are internships paid?', a: 'Internship stipends vary based on performance and project complexity. We focus on providing real-world experience and skill development.' },
  { q: 'Can I attend classes online?', a: 'Absolutely! Most courses are available in both online and offline modes. You can choose what works best for your schedule.' },
  { q: 'Is there a certificate after completion?', a: 'Yes, you receive a completion certificate and a letter of recommendation for internships and courses.' },
]

const gallery = [
  { src: '/learnhub/gallery/1.jpg', caption: 'Coding Workshop' },
  { src: '/learnhub/gallery/2.jpg', caption: 'Hands-on Training' },
  { src: '/learnhub/gallery/3.jpg', caption: 'Placement Drive' },
  { src: '/learnhub/gallery/4.jpg', caption: 'Hackathon' },
  { src: '/learnhub/gallery/5.jpg', caption: 'Mentor Session' },
  { src: '/learnhub/gallery/6.jpg', caption: 'Project Showcase' },
]

const tracks = ['All', ...Array.from(new Set(courses.map(c => c.track)))]

export default function LearnHub() {
  const [activeTrack, setActiveTrack] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([])
  
  // Popup Form States
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [formDataForModal, setFormDataForModal] = useState<any>(null)

  useEffect(() => {
    setParticles(Array.from({ length: 12 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    })))
  }, [])

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isPopupOpen])

  const filteredCourses = activeTrack === 'All' ? courses : courses.filter(c => c.track === activeTrack)

  const openEnrollPopup = (courseName: string = '') => {
    setSelectedCourse(courseName)
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedCourse('')
    setShowSuccess(false)
  }

  const buildEmailBody = (formValues: any) => {
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 LEARNHUB STUDENT INQUIRY
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
Submitted via LearnHub Page
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
      closePopup()
    }, 3000)
  }

  // Remove scrollbar from popup - custom style
  const hideScrollbarStyle = {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: COLORS.background,
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    color: COLORS.dark,
    outline: 'none',
    transition: 'all 0.2s',
  }

  return (
    <>
      <Helmet>
        <title>LearnHub | Internships, Placement Training & IT Courses – EliteCrows</title>
        <meta name="description" content="Join EliteCrows LearnHub for internships, placement training, and industry-ready IT courses. Full-stack, AI, Cloud, Digital Marketing & more. 92% placement rate." />
        <meta name="keywords" content="IT courses, internship program, placement training, web development, AI course, data science, cloud computing, digital marketing, cybersecurity" />
        <link rel="canonical" href="https://elitecrows.in/learnhub" />
      </Helmet>

      <main style={{ background: COLORS.white, minHeight: '100vh', overflowX: 'hidden' }}>

        {/* Hero Section - Centered Content */}
        <section id="enroll" style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: COLORS.gradientLight, padding: 'clamp(80px, 15vw, 120px) 0' }}>
          <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', background: COLORS.white, border: '1px solid #E2E8F0', borderRadius: '50px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <GraduationCap size={16} color={COLORS.primary} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: COLORS.primary }}>INTERNSHIPS · COURSES · PLACEMENT</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ fontSize: 'clamp(42px, 8vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', color: COLORS.dark }}
              >
                Learn. Build.{' '}
                <span style={{ background: COLORS.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Get Placed.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: COLORS.light, lineHeight: 1.6, marginBottom: '32px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}
              >
                Transform your career with hands-on training, real-world projects, and guaranteed placement support. Join 2000+ successful students.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <a href="#courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', background: COLORS.gradient, color: COLORS.white, borderRadius: '50px', textDecoration: 'none', fontWeight: 600, boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}>Explore Courses <ArrowRight size={18} /></a>
                
                <motion.button
                  onClick={() => openEnrollPopup()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 36px',
                    background: COLORS.primary,
                    color: COLORS.white,
                    borderRadius: '50px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '15px',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
                  }}
                >
                  Enroll Now
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>

              {/* Trust Badges - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ display: 'flex', gap: '32px', marginTop: '48px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={18} color={COLORS.warning} />
                  <span style={{ fontSize: '13px', color: COLORS.light }}>92% Placement Rate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Medal size={18} color={COLORS.primary} />
                  <span style={{ fontSize: '13px', color: COLORS.light }}>Industry Certificate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ThumbsUp size={18} color={COLORS.success} />
                  <span style={{ fontSize: '13px', color: COLORS.light }}>2000+ Happy Students</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: '20%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '0', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        </section>

        {/* Stats Section */}
        <section style={{ padding: 'clamp(50px, 8vw, 70px) 0', background: COLORS.white }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ padding: '24px', borderRadius: '20px', background: COLORS.background }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${stat.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <stat.icon size={24} color={stat.color} />
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: COLORS.dark, marginBottom: '8px' }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div style={{ fontSize: '14px', color: COLORS.light, fontWeight: 500 }}>{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section style={{ padding: 'clamp(60px, 10vw, 80px) 0', background: COLORS.background }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
              <span style={{ display: 'inline-block', padding: '6px 14px', background: `${COLORS.primary}10`, borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: COLORS.primary, marginBottom: '16px' }}>WHAT WE OFFER</span>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: COLORS.dark, marginBottom: '16px' }}>Three Paths to Your <span style={{ color: COLORS.primary }}>Tech Career</span></h2>
              <p style={{ fontSize: '16px', color: COLORS.light, lineHeight: 1.6 }}>Choose the right program based on your goals and experience level</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {programs.map((program, i) => {
                const Icon = program.icon
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <div style={{ background: COLORS.white, borderRadius: '24px', padding: '32px', textAlign: 'center', border: '1px solid #E2E8F0', transition: 'all 0.3s' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: program.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Icon size={28} color={program.color} />
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: COLORS.dark }}>{program.title}</h3>
                      <p style={{ fontSize: '14px', color: COLORS.light, lineHeight: 1.6 }}>{program.desc}</p>
                      <button
                        onClick={() => openEnrollPopup()}
                        style={{ marginTop: '20px', padding: '10px 24px', background: COLORS.primary, color: COLORS.white, border: 'none', borderRadius: '50px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Enroll Now →
                      </button>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" style={{ padding: 'clamp(60px, 10vw, 80px) 0', background: COLORS.white }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
              <span style={{ display: 'inline-block', padding: '6px 14px', background: `${COLORS.primary}10`, borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: COLORS.primary, marginBottom: '16px' }}>COURSE CATALOG</span>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: COLORS.dark, marginBottom: '16px' }}>Industry-Ready <span style={{ color: COLORS.primary }}>Courses</span></h2>
              <p style={{ fontSize: '16px', color: COLORS.light, lineHeight: 1.6 }}>Project-based learning with certificates. Learn online or offline at your pace.</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
              {tracks.map(track => (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: activeTrack === track ? 'none' : '1px solid #E2E8F0',
                    background: activeTrack === track ? COLORS.gradient : COLORS.white,
                    color: activeTrack === track ? COLORS.white : COLORS.light,
                    transition: 'all 0.2s',
                  }}
                >
                  {track}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '28px' }}>
              {filteredCourses.map((course, i) => {
                const Icon = course.icon
                return (
                  <Reveal key={course.title} delay={i * 0.05}>
                    <motion.div whileHover={{ y: -4 }} style={{ background: COLORS.white, border: '1px solid #E2E8F0', borderRadius: '20px', overflow: 'hidden', transition: 'all 0.3s' }}>
                      <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: COLORS.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={22} color={COLORS.white} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', background: `${COLORS.primary}10`, borderRadius: '50px', color: COLORS.primary }}>{course.track}</span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: COLORS.dark }}>{course.title}</h3>
                        <p style={{ fontSize: '13px', color: COLORS.light, lineHeight: 1.5, marginBottom: '16px' }}>{course.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                          {course.highlights.map((h, j) => (
                            <span key={j} style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', background: COLORS.background, borderRadius: '8px', color: COLORS.dark }}>{h}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <span style={{ fontSize: '12px', color: COLORS.light, display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {course.duration}</span>
                            <span style={{ fontSize: '12px', color: COLORS.light, display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {course.mode}</span>
                          </div>
                          <button onClick={() => openEnrollPopup(course.title)} style={{ color: COLORS.primary, fontSize: '13px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Enroll →</button>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Placement Section */}
        <section style={{ padding: 'clamp(60px, 10vw, 80px) 0', background: COLORS.gradientLight }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '6px 14px', background: COLORS.white, borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: COLORS.primary, marginBottom: '16px' }}>PLACEMENT TRAINING</span>
                <h2 style={{ fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 700, color: COLORS.dark, marginBottom: '20px', lineHeight: 1.2 }}>From Classroom to <span style={{ color: COLORS.primary }}>Career</span></h2>
                <p style={{ fontSize: '16px', color: COLORS.light, lineHeight: 1.6, marginBottom: '28px' }}>
                  We don't stop at teaching skills. Our comprehensive placement program prepares you for every stage of the hiring process until you land the job.
                </p>
                <button onClick={() => openEnrollPopup()} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', background: COLORS.gradient, color: COLORS.white, borderRadius: '50px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Join Placement Program <ArrowRight size={18} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {placementFeatures.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <Reveal key={i} delay={i * 0.05}>
                      <div style={{ background: COLORS.white, borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #E2E8F0' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${COLORS.primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={18} color={COLORS.primary} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark }}>{feature.text}</span>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: 'clamp(60px, 10vw, 80px) 0', background: COLORS.white }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
              <span style={{ display: 'inline-block', padding: '6px 14px', background: `${COLORS.primary}10`, borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: COLORS.primary, marginBottom: '16px' }}>FAQ</span>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: COLORS.dark, marginBottom: '16px' }}>Frequently Asked <span style={{ color: COLORS.primary }}>Questions</span></h2>
              <p style={{ fontSize: '16px', color: COLORS.light, lineHeight: 1.6 }}>Everything you need to know about our programs</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ marginBottom: '16px', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px 24px',
                      background: COLORS.white,
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '16px', fontWeight: 600, color: COLORS.dark }}>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={20} color={COLORS.primary} /> : <ChevronDown size={20} color={COLORS.primary} />}
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 24px 20px 24px', color: COLORS.light, fontSize: '14px', lineHeight: 1.6, borderTop: '1px solid #E2E8F0', background: COLORS.background }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {/* <section style={{ padding: 'clamp(60px, 10vw, 80px) 0', background: COLORS.background }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
              <span style={{ display: 'inline-block', padding: '6px 14px', background: `${COLORS.primary}10`, borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: COLORS.primary, marginBottom: '16px' }}>GALLERY</span>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: COLORS.dark, marginBottom: '16px' }}>Life at <span style={{ color: COLORS.primary }}>LearnHub</span></h2>
              <p style={{ fontSize: '16px', color: COLORS.light, lineHeight: 1.6 }}>Moments from our workshops, hackathons, and placement drives</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {gallery.map((img, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <motion.div whileHover={{ scale: 1.02 }} onClick={() => setLightbox(i)} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', background: COLORS.gradient }}>
                    <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                      <p style={{ color: COLORS.white, fontSize: '14px', fontWeight: 600 }}>{img.caption}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}

        {/* Lightbox Modal */}
        {lightbox !== null && (
          <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={24} color={COLORS.white} />
            </button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '100%' }}>
              <img src={gallery[lightbox].src} alt={gallery[lightbox].caption} style={{ width: '100%', borderRadius: '16px' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              <p style={{ color: COLORS.white, textAlign: 'center', marginTop: '16px', fontSize: '16px' }}>{gallery[lightbox].caption}</p>
            </motion.div>
          </div>
        )}

        {/* Floating Action Button - Mobile Only (moved up) */}
        <div className="floating-enroll-btn">
          <motion.button
            onClick={() => openEnrollPopup()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'fixed',
              right: '325px',
              bottom: '40px',
              zIndex: 999,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: COLORS.primary,
              color: COLORS.white,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <GraduationCap size={24} />
          </motion.button>
        </div>

        {/* ENROLL POPUP MODAL - No Scrollbar */}
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
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
                  background: COLORS.white,
                  borderRadius: '28px',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                  ...hideScrollbarStyle,
                }}
              >
                {/* Popup Header - Professional */}
                <div style={{
                  padding: '24px 28px',
                  background: COLORS.primary,
                  color: COLORS.white,
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
                    onClick={closePopup}
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
                      color: COLORS.white,
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Popup Body */}
                <div style={{ padding: '28px' }}>
                  {showSuccess ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <CheckCircle size={64} color={COLORS.success} />
                      <h3 style={{ fontSize: '22px', fontWeight: 700, marginTop: '20px', color: COLORS.dark }}>Thank You!</h3>
                      <p style={{ color: COLORS.light, marginTop: '10px', lineHeight: 1.6 }}>
                        Your email client will open. Please review the message, attach any documents, and send. Our team will respond within 24 hours.
                      </p>
                      <button
                        onClick={closePopup}
                        style={{
                          marginTop: '24px',
                          padding: '12px 28px',
                          background: COLORS.primary,
                          color: COLORS.white,
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
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Full Name *</label>
                        <input name="name" required style={inputStyle} placeholder="Enter your full name" />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Email *</label>
                          <input name="email" required type="email" style={inputStyle} placeholder="your@email.com" />
                        </div>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Phone *</label>
                          <input name="phone" required style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Education Level</label>
                        <select name="education" style={inputStyle}>
                          <option value="">Select</option>
                          <option>High School</option>
                          <option>Undergraduate</option>
                          <option>Postgraduate</option>
                          <option>Working Professional</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Institution / College</label>
                        <input name="institution" style={inputStyle} placeholder="Your college name" />
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Inquiry Type *</label>
                        <select name="inquiryType" required style={inputStyle}>
                          <option value="">Select</option>
                          {inquiryTypes.map(type => <option key={type}>{type}</option>)}
                        </select>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Course Interested In</label>
                        <select name="course" style={inputStyle} value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                          <option value="">Select a course</option>
                          {courses.map(course => <option key={course.title}>{course.title}</option>)}
                        </select>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Preferred Mode</label>
                        <select name="preferredMode" style={inputStyle}>
                          <option value="">Select</option>
                          {preferredModes.map(mode => <option key={mode}>{mode}</option>)}
                        </select>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: COLORS.dark, marginBottom: '6px', display: 'block' }}>Your Message *</label>
                        <textarea name="message" required rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell us about your goals and questions..." />
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '14px',
                          background: COLORS.primary,
                          color: COLORS.white,
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

                      <p style={{ fontSize: '12px', color: COLORS.light, textAlign: 'center', marginTop: '16px' }}>
                        We'll get back to you within 24 hours
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal - No Scrollbar */}
        {showConfirmModal && formDataForModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '500px', width: '100%', background: COLORS.white, borderRadius: '24px', overflow: 'hidden' }}>
              <div style={{ padding: '24px', background: COLORS.primary, color: COLORS.white }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={20} /> Review Your Inquiry</h3>
              </div>
              <div style={{ padding: '24px', maxHeight: '60vh', overflowY: 'auto', ...hideScrollbarStyle }}>
                <div style={{ background: COLORS.background, padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
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
                <button onClick={() => setShowConfirmModal(false)} style={{ padding: '10px 20px', borderRadius: '10px', background: COLORS.background, border: 'none', fontWeight: 500, cursor: 'pointer' }}>Edit</button>
                <button onClick={proceedToMail} style={{ padding: '10px 24px', borderRadius: '10px', background: COLORS.primary, color: COLORS.white, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Send Email</button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <style>{`
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        html { scroll-behavior: smooth; }
        
        /* Hide scrollbar for popup */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Floating button - Mobile only */
        .floating-enroll-btn {
          display: none;
        }
        
        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          .floating-enroll-btn {
            display: block;
          }
        }
        
        /* Desktop - hide floating button */
        @media (min-width: 769px) {
          .floating-enroll-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}