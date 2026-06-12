import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const smallerAreas = [
  'Namakkal',
  'Karur',
  'Dharmapuri',
  'Krishnagiri',
  'Hosur',
  'Dindigul',
  'The Nilgiris',
];

export default function ServiceAreas() {
  return (
    <>
      <Helmet>
        <title>Service Areas in Tamil Nadu | EliteCrows Infotech</title>
        <meta name="description" content="EliteCrows Infotech serves Coimbatore, Tiruppur, Erode, Salem, and nearby Tamil Nadu districts with software, AI automation, cloud, and cybersecurity services." />
        <link rel="canonical" href="https://elitecrows.in/service-areas" />
      </Helmet>

      <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        <section style={{ padding: '120px 0 80px', background: 'linear-gradient(135deg, #F8F9FC 0%, #FFFFFF 50%, #F0F2F8 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'inline-flex', padding: '8px 18px', borderRadius: '999px', background: 'rgba(0,113,227,0.08)', color: '#0071E3', fontWeight: 600, marginBottom: '24px' }}>
              Tamil Nadu Service Areas
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '20px', maxWidth: '900px' }}>Service Areas Across Tamil Nadu</h1>
            <p style={{ maxWidth: '760px', fontSize: 'clamp(16px, 2.2vw, 20px)', lineHeight: 1.7, color: '#6B7280', marginBottom: '28px' }}>
              EliteCrows Infotech works with businesses across major Tamil Nadu markets and surrounding districts. For the most detailed service pages, start with Coimbatore, Tiruppur, Erode, and Salem, then use this page to find the wider regions we support.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: '999px', background: 'linear-gradient(135deg, #0071E3, #00C6FF)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>
              Request a consultation
            </Link>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Priority market pages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {[
                ['Coimbatore', '/coimbatore'],
                ['Tiruppur', '/tiruppur'],
                ['Erode', '/erode'],
                ['Salem', '/salem'],
              ].map(([label, href]) => (
                <Link key={href} to={href} style={{ padding: '18px 20px', borderRadius: '18px', border: '1px solid #E5E5E7', textDecoration: 'none', color: '#0A0A0A', background: '#FAFBFC', fontWeight: 600 }}>
                  {label}
                </Link>
              ))}
            </div>

            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Other supported locations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              {smallerAreas.map((area) => (
                <div key={area} style={{ padding: '16px 18px', borderRadius: '16px', border: '1px solid #E5E5E7', background: '#FFFFFF', color: '#4B5563' }}>{area}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}