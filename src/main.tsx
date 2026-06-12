import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import App from './App';
import './index.css';

// Extend Chakra UI theme (kept exactly as before)
const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  colors: {
    brand: {
      50: '#EAF3FF',
      100: '#C6DEFF',
      200: '#91C0FF',
      300: '#5CA3FF',
      400: '#2D87FF',
      500: '#0071E3',
      600: '#0060C0',
      700: '#004F9D',
      800: '#003E7A',
      900: '#002D57',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#FFFFFF',
        color: '#1D1D1F',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: '980px',
      },
    },
  },
});

// ─── Global Organization + WebSite structured data ───
// Consistent with index.html static version; React-Helmet injects this into <head>
// at runtime for client-side rendering so crawlers that execute JS also see it.
const globalOrganizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
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
      image: 'https://elitecrows.in/og-image.jpg',
      description:
        'EliteCrows Infotech is a full-service technology company offering custom software development, AI automation, cloud infrastructure, digital marketing, and cybersecurity services.',
      foundingDate: '2023',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 75,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Gobichettipalayam College Pirivu',
        addressLocality: 'Gobichettipalayam',
        addressRegion: 'Tamil Nadu',
        postalCode: '638453',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+916383106107',
          contactType: 'customer service',
          areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
          availableLanguage: ['English', 'Tamil'],
        },
      ],
      email: 'info@elitecrows.com',
      telephone: '+916383106107',
      sameAs: [
        'https://linkedin.com/company/elitecrows',
        'https://twitter.com/elitecrows',
      ],
      knowsAbout: [
        'Custom Software Development',
        'AI Chatbot Development',
        'Cloud Architecture',
        'Cybersecurity',
        'Web Development',
        'Digital Marketing',
        'SEO',
        'React.js',
        'Node.js',
        'AWS',
        'DevOps',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://elitecrows.in/#website',
      url: 'https://elitecrows.in',
      name: 'EliteCrows Infotech',
      description:
        'Enterprise software development agency specializing in AI, cloud infrastructure, and cybersecurity solutions.',
      publisher: { '@id': 'https://elitecrows.in/#organization' },
      inLanguage: 'en-IN',
    },
  ],
};

function Root() {
  return (
    <>
      <Helmet
        defaultTitle="EliteCrows Infotech | Custom Software, AI & Cloud Development Agency"
        titleTemplate="%s | EliteCrows Infotech"
        htmlAttributes={{ lang: 'en', dir: 'ltr' }}
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta
          name="description"
          content="EliteCrows Infotech delivers high-performance web apps, AI chatbots, cloud infrastructure, and enterprise cybersecurity. 150+ projects delivered. Book a free strategy call."
        />
        <meta
          name="keywords"
          content="custom software development, AI automation, cloud consulting, cybersecurity services, React development, Next.js agency, enterprise software India, Tamil Nadu IT company"
        />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#0071E3" />
        <meta name="application-name" content="EliteCrows Infotech" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Gobichettipalayam, Tamil Nadu, India" />
        <link rel="canonical" href="https://elitecrows.in/" />
        <link rel="alternate" hrefLang="en-IN" href="https://elitecrows.in/" />

        {/* Open Graph */}
        <meta property="og:site_name" content="EliteCrows Infotech" />
        <meta property="og:title" content="EliteCrows Infotech – Enterprise Software, AI & Cloud Engineering" />
        <meta property="og:description" content="We build scalable, secure digital products for high-growth enterprises. AI, cloud, web, cybersecurity – all under one roof." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.in/" />
        <meta property="og:image" content="https://elitecrows.in/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EliteCrows Infotech – Enterprise Software, AI & Cloud Engineering" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@elitecrows" />
        <meta name="twitter:title" content="EliteCrows Infotech – Enterprise Software, AI & Cloud Engineering" />
        <meta name="twitter:description" content="Custom software development, AI chatbots, cloud infrastructure, and cybersecurity for forward-thinking enterprises." />
        <meta name="twitter:image" content="https://elitecrows.in/og-image.jpg" />
        <meta name="twitter:image:alt" content="EliteCrows Infotech logo and tagline" />

        <script type="application/ld+json">{JSON.stringify(globalOrganizationJsonLd)}</script>
      </Helmet>
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
