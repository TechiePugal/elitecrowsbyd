import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Mail, Phone, MapPin, Clock, ArrowRight, Send, CheckCircle,
  Sparkles, Shield, Star, HelpCircle, ChevronDown, ChevronUp, X, FileText
} from 'lucide-react';

const contactInfo = [
  { icon: Mail, color: '#0071E3', bg: '#EAF3FF', title: 'Email', details: ['elitecrowsindia@gmail.com'] },
  { icon: Phone, color: '#34C759', bg: '#EDFBF1', title: 'Phone', details: ['+91 6383106107'] },
  { icon: MapPin, color: '#FF3B30', bg: '#FFF0EF', title: 'Office Address', details: ['Gobichettipalayam College Pirivu', 'Gobichettipalayam, Tamil Nadu 638453'] },
  { icon: Clock, color: '#FF9500', bg: '#FFF5E6', title: 'Business Hours', details: ['Mon – Sat: 9 AM – 6 PM', 'Sunday: Closed'] },
];

const services = [
  'Web Development', 'Software Development', 'Digital Marketing / SEO',
  'Cloud Services', 'AI & Automation', 'Cybersecurity', 'Other',
];

const faqs = [
  { q: 'How quickly can you start on my project?', a: 'We typically begin within 48 hours of signing the agreement. For urgent projects, we can start as early as the same day.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Absolutely. Every project comes with 30 days of free support, and we offer flexible maintenance plans for long-term peace of mind.' },
  { q: 'Can you work with my existing tech stack?', a: 'Yes – we’re language‑ and platform‑agnostic. Our team adapts to your current tools and infrastructure.' },
  { q: 'What information do you need to provide a quote?', a: 'A brief description of your project goals, timeline, and any specific requirements. Use the form above to get a free estimate.' },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formDataForModal, setFormDataForModal] = useState<any>(null);
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

  // DIRECT MAIL LOGIC
  const buildEmailBody = (formValues: any) => {
    const lines = [
      `Full Name: ${formValues.name}`,
      `Email: ${formValues.email}`,
      `Phone: ${formValues.phone}`,
      `Service Needed: ${formValues.service}`,
      `Budget Range: ${formValues.budget || 'Not specified'}`,
      `\n--- Project Details ---\n${formValues.message}`,
      `\n---\nThis enquiry was submitted via EliteCrows contact page.`,
    ];
    return lines.join('\n');
  };

  const handleDirectMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formValues: any = {};
    formData.forEach((value, key) => { formValues[key] = value; });

    if (!formValues.name || !formValues.email || !formValues.phone || !formValues.service || !formValues.message) {
      alert('Please fill in all required fields (*).');
      return;
    }

    setFormDataForModal(formValues);
    setShowConfirmModal(true);
  };

  const proceedToMailClient = () => {
    if (!formDataForModal) return;
    const subject = `Project Enquiry - ${formDataForModal.name} (${formDataForModal.service})`;
    const body = buildEmailBody(formDataForModal);
    const mailtoLink = `mailto:elitecrowsindia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setShowConfirmModal(false);
    setLoading(false);
    setShowSuccess(true);
    if (formRef.current) formRef.current.reset();

    setTimeout(() => setShowSuccess(false), 6000);
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

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://elitecrows.in/contact#webpage',
        name: 'Contact EliteCrows Infotech | Get a Free Consultation',
        url: 'https://elitecrows.in/contact',
        mainEntity: {
          '@type': 'Organization',
          name: 'EliteCrows Infotech',
          email: 'elitecrowsindia@gmail.com',
          telephone: '+916383106107',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Contact EliteCrows Infotech | Free Consultation – Tamil Nadu</title>
        <meta name="description" content="Contact EliteCrows Infotech for web dev, AI, cloud, SEO, and cybersecurity. Free quote within 24 hours. Serving Tamil Nadu and worldwide." />
        <meta name="keywords" content="contact EliteCrows Infotech, software development consultation, AI solutions quote, cloud services contact, web app development quote, digital transformation agency, cybersecurity experts India, React development company, enterprise software consultation, Tamil Nadu IT services" />
        <link rel="canonical" href="https://elitecrows.in/contact" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <script type="application/ld+json">{JSON.stringify(contactJsonLd)}</script>
      </Helmet>

      <main style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* HERO SECTION WITH ANIMATED UNDERLINE */}
        <section className="contact-hero" style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)', padding: 'clamp(80px, 15vw, 120px) 0 clamp(60px, 10vw, 100px)' }}>
          {/* Animated orbs */}
          <motion.div animate={{ x: [0, 80, 0, -80, 0], y: [0, -40, 0, 40, 0], scale: [1, 1.15, 1, 1.2, 1] }} transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }} style={{ position: 'absolute', top: '10%', right: '5%', width: 'min(350px, 40vw)', height: 'min(350px, 40vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(0,198,255,0.03) 50%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <motion.div animate={{ x: [0, -60, 0, 60, 0], y: [0, 50, 0, -50, 0], scale: [1, 1.2, 1, 1.1, 1] }} transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse' }} style={{ position: 'absolute', bottom: '10%', left: '5%', width: 'min(300px, 35vw)', height: 'min(300px, 35vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(175,82,222,0.06) 0%, rgba(0,113,227,0.02) 60%, transparent 80%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <motion.div animate={{ x: [0, 50, 0, -50, 0], y: [0, -30, 0, 30, 0], scale: [1, 1.1, 1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }} style={{ position: 'absolute', top: '50%', left: '30%', width: 'min(250px, 30vw)', height: 'min(250px, 30vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,149,0,0.05) 0%, rgba(255,179,71,0.02) 60%, transparent 80%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

          {particles.map((p, i) => (
            <motion.div key={i} initial={{ x: `${p.x}%`, y: `${p.y}%` }} animate={{ y: [`${p.y}%`, `${p.y - 15}%`, `${p.y - 30}%`], opacity: [0, 0.4, 0] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }} style={{ position: 'absolute', width: '2px', height: '2px', background: `rgba(0, 113, 227, 0.3)`, borderRadius: '50%', pointerEvents: 'none' }} />
          ))}

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(0, 113, 227, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 113, 227, 0.15)', borderRadius: '100px', marginBottom: '32px' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><Sparkles size={16} color="#0071E3" /></motion.div>
              <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#0071E3' }}>NO OBLIGATION — FREE QUOTE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 'clamp(36px, 8vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '28px' }}
            >
              Let's Start a{' '}
              <span style={{
                background: 'linear-gradient(135deg, #0071E3, #00C6FF, #AF52DE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                display: 'inline-block'
              }}>
                Conversation
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
              Tell us about your project — we’ll craft a tailored solution and get back to you within 24 hours.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a href="#contact-form" whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600 }}>Get Free Quote <ArrowRight size={18} /></motion.a>
              <motion.a href="tel:+916383106107" whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 36px)', background: 'white', color: '#0071E3', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(0,113,227,0.2)' }}>Call Us Now <Phone size={18} /></motion.a>
            </motion.div>
          </div>
        </section>

        {/* CONTACT INFO CARDS - FULLY RESPONSIVE GRID */}
        <section style={{ background: '#F9CD05', padding: 'clamp(60px, 10vw, 80px) 0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div className="contact-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} style={{ background: '#FFFFFF', borderRadius: '24px', padding: 'clamp(24px, 5vw, 32px)', textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: info.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Icon size={24} color={info.color} /></div>
                    <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700 }}>{info.title}</h3>
                    {info.details.map((d, di) => <p key={di} style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#6B7280', marginBottom: di === info.details.length - 1 ? 0 : 6 }}>{d}</p>)}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FORM + TRUST / FAQ - RESPONSIVE 2-COLUMN */}
        <section id="contact-form" style={{ padding: 'clamp(60px, 10vw, 80px) 0', background: '#F5F5F7' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>
              
              {/* LEFT: FORM */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div style={{ background: '#FFFFFF', borderRadius: '32px', border: '1px solid #E5E5E7', overflow: 'hidden' }}>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px)', borderBottom: '1px solid #E5E5E7', background: '#F9F9FB' }}>
                    <span className="badge" style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(0,113,227,0.08)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: '#0071E3' }}>Get a Quote</span>
                    <h2 style={{ fontSize: 'clamp(24px, 5vw, 28px)', marginTop: '8px' }}>Tell Us About Your Project</h2>
                    <p style={{ color: '#6B7280', fontSize: '14px' }}>We’ll respond within 24 hours.</p>
                  </div>
                  <div style={{ padding: 'clamp(24px, 5vw, 32px)' }}>
                    {showSuccess ? (
                      <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <CheckCircle size={56} color="#34C759" />
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginTop: '16px' }}>Email Opened!</h3>
                        <p style={{ color: '#6B7280', marginTop: '8px' }}>Please check your default mail client, review the message, attach any files, and send. We'll get back to you within 24h.</p>
                      </div>
                    ) : (
                      <form ref={formRef} onSubmit={handleDirectMailSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                          <div><label style={{ fontSize: '13px', fontWeight: 600 }}>Full Name *</label><input name="name" required style={inputStyle} /></div>
                          <div><label style={{ fontSize: '13px', fontWeight: 600 }}>Email *</label><input name="email" required type="email" style={inputStyle} /></div>
                        </div>
                        <div style={{ marginBottom: '16px' }}><label style={{ fontSize: '13px', fontWeight: 600 }}>Phone *</label><input name="phone" required style={inputStyle} /></div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Service Needed *</label>
                          <select name="service" required style={{ ...inputStyle, appearance: 'none' }}>
                            <option value="">Select a service</option>
                            {services.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Budget Range (optional)</label>
                          <select name="budget" style={{ ...inputStyle, appearance: 'none' }}>
                            <option value="">Select budget (optional)</option>
                            <option>Under ₹25,000</option><option>₹25,000 – ₹1,00,000</option>
                            <option>₹1,00,000 – ₹5,00,000</option><option>Above ₹5,00,000</option>
                          </select>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600 }}>Project Details *</label>
                          <textarea name="message" required rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your project, goals, timeline..." />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                          <Mail size={18} /> Send Enquiry via Email
                        </button>
                        <p style={{ fontSize: '12px', color: '#8E8E93', textAlign: 'center', marginTop: '16px' }}>You'll review your message before opening your email client.</p>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: TRUST & FAQ */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(24px, 5vw, 32px)', marginBottom: '32px', border: '1px solid #E5E5E7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}><Shield size={28} color="#0071E3" /><h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 700 }}>Why businesses trust EliteCrows</h3></div>
                  {[{ icon: Star, text: '150+ successful projects delivered', color: '#FF9500' }, { icon: Clock, text: '24–48 hour response time – guaranteed', color: '#34C759' }, { icon: Shield, text: '100% confidentiality & IP protection', color: '#AF52DE' }].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: `${item.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><item.icon size={18} color={item.color} /></div>
                      <span style={{ fontSize: 'clamp(13px, 2.5vw, 15px)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(24px, 5vw, 32px)', border: '1px solid #E5E5E7' }}>
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
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONFIRMATION MODAL - FULLY RESPONSIVE */}
        {showConfirmModal && formDataForModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '500px', width: '100%', background: '#FFFFFF', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', margin: '16px' }}>
              <div style={{ padding: 'clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) 16px', borderBottom: '1px solid #E5E5E7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={24} color="#0071E3" /> Review & Send</h3>
                <button onClick={() => setShowConfirmModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={24} /></button>
              </div>
              <div style={{ padding: 'clamp(20px, 5vw, 28px)', maxHeight: '60vh', overflowY: 'auto' }}>
                <div style={{ background: '#F5F5F7', padding: '16px', borderRadius: '20px', marginBottom: '24px', wordBreak: 'break-word' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>📋 Enquiry summary</p>
                  <p><strong>Name:</strong> {formDataForModal.name}</p>
                  <p><strong>Email:</strong> {formDataForModal.email}</p>
                  <p><strong>Phone:</strong> {formDataForModal.phone}</p>
                  <p><strong>Service:</strong> {formDataForModal.service}</p>
                  <p><strong>Budget:</strong> {formDataForModal.budget || '—'}</p>
                  <p><strong>Project details:</strong><br />{formDataForModal.message}</p>
                </div>
                <div style={{ background: '#FFFBEB', borderRadius: '20px', padding: '16px', marginBottom: '16px', border: '1px solid #FEF3C7' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#B45309', flexWrap: 'wrap' }}><Sparkles size={18} /> Attach your files</p>
                  <p style={{ fontSize: '13px', color: '#92400E', marginTop: '4px' }}>Your email client will open with all details pre‑filled. <strong>Please manually attach any relevant documents (proposal, brief, portfolio, etc.)</strong> before sending.</p>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>The email will be sent to <strong>elitecrowsindia@gmail.com</strong>. You can edit the message before sending.</p>
              </div>
              <div style={{ padding: '16px clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px)', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #E5E5E7', flexWrap: 'wrap' }}>
                <button onClick={() => setShowConfirmModal(false)} style={{ padding: '10px 20px', borderRadius: '40px', background: '#F2F2F5', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button onClick={proceedToMailClient} style={{ padding: '10px 24px', borderRadius: '40px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Mail size={16} /> Open Email & Attach Files
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
        button, a, [role="button"] {
          touch-action: manipulation;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        @media (max-width: 640px) {
          .container {
            padding-left: 20px;
            padding-right: 20px;
          }
          .contact-cards-grid {
            gap: 20px !important;
          }
          .contact-grid {
            gap: 32px !important;
          }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
