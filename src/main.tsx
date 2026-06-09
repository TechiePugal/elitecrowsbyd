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

// Global SEO defaults – updated to elitecrows.in
const seoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EliteCrows Infotech',
  url: 'https://elitecrows.in',
  logo: 'https://elitecrows.in/logo.png',
  sameAs: ['https://linkedin.com/company/elitecrows'],
  description: 'Custom software development, AI solutions, cloud integration, digital marketing, and cybersecurity services.',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+916383106107',
    contactType: 'customer service',
    availableLanguage: ['English', 'Tamil'],
  },
};

function Root() {
  return (
    <>
      <Helmet
        defaultTitle="EliteCrows | Custom Software, AI & Cloud Development Agency"
        titleTemplate="%s | EliteCrows"
        htmlAttributes={{ lang: 'en' }}
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="EliteCrows delivers high‑performance web apps, AI chatbots, cloud infrastructure, and enterprise cybersecurity. 150+ projects delivered. Book a free strategy call." />
        <meta name="keywords" content="custom software development, AI automation, cloud consulting, cybersecurity services, React development, Next.js agency" />
        <meta name="author" content="EliteCrows Infotech" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elitecrows.in/" />
        <meta property="og:title" content="EliteCrows – Enterprise Software, AI & Cloud Engineering" />
        <meta property="og:description" content="We build scalable, secure digital products for high‑growth enterprises. AI, cloud, web, cybersecurity – all under one roof." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elitecrows.in/" />
        <meta property="og:image" content="https://elitecrows.in/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EliteCrows – Enterprise Software, AI & Cloud Engineering" />
        <meta name="twitter:description" content="Custom software development, AI chatbots, cloud infrastructure, and cybersecurity for forward‑thinking enterprises." />
        <script type="application/ld+json">{JSON.stringify(seoJsonLd)}</script>
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