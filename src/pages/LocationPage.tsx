import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

type LocationPageProps = {
  city: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  intro: string;
  localContext: string;
  serviceBullets: string[];
  projectNote: string;
};

export default function LocationPage({
  city,
  title,
  description,
  canonical,
  h1,
  intro,
  localContext,
  serviceBullets,
  projectNote,
}: LocationPageProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        <section style={{ padding: '120px 0 80px', background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'inline-flex', padding: '8px 18px', borderRadius: '999px', background: 'rgba(0,113,227,0.08)', color: '#0071E3', fontWeight: 600, marginBottom: '24px' }}>
                {city}
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '20px', maxWidth: '900px' }}>{h1}</h1>
              <p style={{ maxWidth: '760px', fontSize: 'clamp(16px, 2.2vw, 20px)', lineHeight: 1.7, color: '#6B7280', marginBottom: '28px' }}>{intro}</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '999px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                  Talk to us <ArrowRight size={18} />
                </Link>
                <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '999px', background: '#FFFFFF', color: '#0071E3', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(0,113,227,0.2)' }}>
                  View services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ padding: '28px', borderRadius: '24px', border: '1px solid #E5E5E7', background: '#FFFFFF' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '14px' }}>Why {city} businesses work with us</h2>
                <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '20px' }}>{localContext}</p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: 1.8 }}>
                  {serviceBullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div style={{ padding: '28px', borderRadius: '24px', border: '1px solid #E5E5E7', background: '#FAFBFC' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '14px' }}>Services offered in {city}</h2>
                <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '20px' }}>{projectNote}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link to="/services" style={{ color: '#0071E3', textDecoration: 'none', fontWeight: 600 }}>Explore our service stack</Link>
                  <Link to="/portfolio" style={{ color: '#0071E3', textDecoration: 'none', fontWeight: 600 }}>See project work and case studies</Link>
                  <Link to="/service-areas" style={{ color: '#0071E3', textDecoration: 'none', fontWeight: 600 }}>Browse all service areas</Link>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '22px 24px', borderRadius: '20px', background: '#F5F7FA', border: '1px solid #E5E5E7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <p style={{ margin: 0, color: '#4B5563' }}>Need a local delivery partner for custom software, AI automation, cloud migration, or cybersecurity in {city}?</p>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0071E3', textDecoration: 'none', fontWeight: 700 }}>
                Get in touch <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}