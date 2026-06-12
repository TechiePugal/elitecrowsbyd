import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

type RoutePage = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  bodyHtml: string;
};

const rootTemplatePath = resolve(process.cwd(), 'dist', 'index.html');
const rootTemplate = readFileSync(rootTemplatePath, 'utf8');

function withBody(template: string, bodyHtml: string) {
  return template.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function withMeta(html: string, page: Pick<RoutePage, 'title' | 'description' | 'canonical'>) {
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${page.canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${page.canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${page.description}" />`);
}

function writeRoutePage(page: RoutePage) {
  const targetPath = page.path === '/' ? rootTemplatePath : resolve(process.cwd(), 'dist', page.path.slice(1), 'index.html');
  mkdirSync(dirname(targetPath), { recursive: true });
  const html = withMeta(withBody(rootTemplate, page.bodyHtml), page);
  writeFileSync(targetPath, html, 'utf8');
}

const homeBody = `
  <main id="main-content" aria-label="EliteCrows Infotech home page content">
    <nav aria-label="Main navigation">
      <a href="/">EliteCrows</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Work</a>
      <a href="/about">About</a>
      <a href="/coimbatore">Coimbatore</a>
      <a href="/tiruppur">Tiruppur</a>
      <a href="/erode">Erode</a>
      <a href="/salem">Salem</a>
      <a href="/service-areas">Service Areas</a>
      <a href="/contact">Contact</a>
    </nav>

    <section>
      <p>EliteCrows Infotech delivers custom software development, AI automation, cloud engineering, and cybersecurity for enterprises in Tamil Nadu.</p>
      <h1>Custom Software Development, AI Automation & Cloud Engineering for Enterprises</h1>
      <p>We build enterprise web apps, AI chatbots, cloud infrastructure, and cybersecurity solutions for high-growth businesses.</p>
      <a href="/contact">Start a project</a>
      <a href="/services">Explore services</a>
      <a href="/coimbatore">AI automation services in Coimbatore</a>
      <a href="/tiruppur">Software development in Tiruppur</a>
      <a href="/erode">Cloud consulting in Erode</a>
      <a href="/salem">Cybersecurity services in Salem</a>
      <img src="/eclogo.png" alt="EliteCrows Infotech logo" width="128" height="128" />
    </section>

    <section id="services">
      <h2>Enterprise Software Development</h2>
      <p>React, Node.js, and Next.js web app development built for scale, speed, and reliability.</p>

      <h2>AI Automation & Chatbot Development</h2>
      <p>AI assistants, workflow automation, and intelligent customer experiences for modern teams.</p>

      <h2>Cloud Consulting & Migration</h2>
      <p>AWS, DevOps, cloud architecture, and migration services for secure digital operations.</p>

      <h2>Cybersecurity Services</h2>
      <p>Security reviews, hardening, and proactive protection for enterprise systems and web applications.</p>
    </section>

    <section id="work">
      <h2>150+ Projects Delivered</h2>
      <p>Browse case studies and see how EliteCrows helps businesses grow with custom software, AI, cloud, and cybersecurity.</p>
      <a href="/portfolio">View our case studies</a>
    </section>

    <section id="areas">
      <h2>Serving Tamil Nadu Service Areas</h2>
      <p>We support businesses in Coimbatore, Tiruppur, Erode, Salem, and surrounding districts.</p>
      <a href="/service-areas">View all service areas</a>
    </section>

    <section id="contact">
      <h2>Contact EliteCrows Infotech</h2>
      <p>Book a strategy call for custom software, AI automation, cloud migration, and cybersecurity services.</p>
      <a href="mailto:elitecrowsindia@gmail.com">elitecrowsindia@gmail.com</a>
      <a href="tel:+916383106107">+91 6383106107</a>
    </section>

    <footer>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/careers">Careers</a>
      <a href="/service-areas">Service Areas</a>
      <a href="/contact">Contact</a>
      <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React docs</a>
      <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer">Vite docs</a>
      <a href="https://aws.amazon.com/architecture/" target="_blank" rel="noopener noreferrer">AWS architecture center</a>
      <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP Top 10</a>
    </footer>
  </main>
`;

const routePages: RoutePage[] = [
  {
    path: '/',
    title: 'EliteCrows Infotech – Custom Software, AI & Cloud Agency',
    description: 'EliteCrows Infotech builds enterprise web apps, AI automation, cloud infrastructure, and cybersecurity solutions. 150+ projects delivered.',
    canonical: 'https://elitecrows.in/',
    bodyHtml: homeBody,
  },
  {
    path: '/about',
    title: 'About EliteCrows Infotech | Custom Software & AI Development Company',
    description: 'Learn about EliteCrows Infotech, our mission, and how we deliver enterprise software, AI automation, cloud, and cybersecurity services from Tamil Nadu.',
    canonical: 'https://elitecrows.in/about',
    bodyHtml: `
      <main id="main-content">
        <h1>About EliteCrows Infotech</h1>
        <p>EliteCrows Infotech is a Tamil Nadu technology partner focused on custom software, AI automation, cloud systems, and cybersecurity.</p>
        <h2>What we build</h2>
        <p>We help teams modernize operations with React, Node.js, cloud migration, and AI-powered workflows.</p>
        <h2>Where we work</h2>
        <p>We serve businesses in Coimbatore, Tiruppur, Erode, Salem, and throughout nearby districts.</p>
        <a href="/services">See services</a>
        <a href="/portfolio">View case studies</a>
        <a href="/contact">Talk to us</a>
      </main>
    `,
  },
  {
    path: '/services',
    title: 'Services | EliteCrows Infotech – Web Dev, SEO, AI, Cloud & Cybersecurity India',
    description: 'EliteCrows Infotech offers web development, SEO, AI chatbot development, cloud consulting, industrial applications, and enterprise cybersecurity.',
    canonical: 'https://elitecrows.in/services',
    bodyHtml: `
      <main id="main-content">
        <h1>Services Built for Scale</h1>
        <p>From custom web applications to cloud engineering, we deliver secure and scalable systems for growing businesses.</p>
        <h2>Web & Software Development</h2>
        <h2>AI Automation & Chatbot Development</h2>
        <h2>Cloud Consulting & Migration</h2>
        <h2>Cybersecurity Services</h2>
        <a href="/coimbatore">Coimbatore AI automation services</a>
        <a href="/tiruppur">Tiruppur software development</a>
        <a href="/erode">Erode cloud consulting</a>
        <a href="/salem">Salem cybersecurity services</a>
      </main>
    `,
  },
  {
    path: '/portfolio',
    title: 'Portfolio | EliteCrows Infotech – Project Case Studies & Work Showcase',
    description: 'Browse EliteCrows Infotech project case studies covering e-commerce, healthcare, AI chatbots, SEO campaigns, industrial automation, and cloud solutions.',
    canonical: 'https://elitecrows.in/portfolio',
    bodyHtml: `
      <main id="main-content">
        <h1>Portfolio and Case Studies</h1>
        <p>See how EliteCrows Infotech delivers measurable results with enterprise software, AI automation, and secure cloud delivery.</p>
        <h2>E-commerce and healthcare systems</h2>
        <h2>AI support and automation projects</h2>
        <h2>Industrial workflow and cloud solutions</h2>
        <a href="/services">Explore services</a>
        <a href="/contact">Discuss your project</a>
      </main>
    `,
  },
  {
    path: '/careers',
    title: 'Internships at EliteCrows Infotech | Direct Apply',
    description: 'Apply for IT internships at EliteCrows Infotech in web development, AI, cloud, marketing, and cybersecurity.',
    canonical: 'https://elitecrows.in/careers',
    bodyHtml: `
      <main id="main-content">
        <h1>Build Your Future With Us</h1>
        <p>Join EliteCrows Infotech for internship opportunities in software development, AI, cloud, digital marketing, and cybersecurity.</p>
        <h2>Flexible internship programs</h2>
        <h2>Certificate and letter of recommendation</h2>
        <a href="/contact">Apply now</a>
      </main>
    `,
  },
  {
    path: '/contact',
    title: 'Contact EliteCrows Infotech | Free Consultation – Tamil Nadu',
    description: 'Contact EliteCrows Infotech for web development, AI automation, cloud, SEO, and cybersecurity. Free quote within 24 hours.',
    canonical: 'https://elitecrows.in/contact',
    bodyHtml: `
      <main id="main-content">
        <h1>Let’s Start a Conversation</h1>
        <p>Reach EliteCrows Infotech at Gobichettipalayam College Pirivu, Gobichettipalayam, Tamil Nadu 638453, India.</p>
        <h2>Enterprise software, AI, cloud, and cybersecurity</h2>
        <a href="mailto:elitecrowsindia@gmail.com">elitecrowsindia@gmail.com</a>
        <a href="tel:+916383106107">+91 6383106107</a>
      </main>
    `,
  },
  {
    path: '/coimbatore',
    title: 'Coimbatore AI Automation & Software Development | EliteCrows Infotech',
    description: 'EliteCrows Infotech helps Coimbatore businesses with custom software, AI automation, cloud migration, and cybersecurity services tailored for manufacturing and services.',
    canonical: 'https://elitecrows.in/coimbatore',
    bodyHtml: `
      <main id="main-content">
        <h1>Coimbatore AI Automation, Software Development & Cloud Services</h1>
        <p>We support Coimbatore’s industrial and commercial businesses with custom software, AI automation, cloud consulting, and cybersecurity.</p>
        <h2>Enterprise software for operations</h2>
        <h2>AI chatbots and workflow automation</h2>
        <h2>Cloud migration and DevOps</h2>
        <a href="/contact">Talk to us</a>
        <a href="/services">See services</a>
        <a href="/portfolio">View work</a>
      </main>
    `,
  },
  {
    path: '/tiruppur',
    title: 'Tiruppur Software Development & AI Automation | EliteCrows Infotech',
    description: 'EliteCrows Infotech builds software, AI automation, cloud solutions, and cybersecurity systems for Tiruppur businesses in textiles, manufacturing, and exports.',
    canonical: 'https://elitecrows.in/tiruppur',
    bodyHtml: `
      <main id="main-content">
        <h1>Tiruppur Software Development, AI Automation & Cloud Consulting</h1>
        <p>Tiruppur businesses can use modern software and automation to reduce manual work, speed up operations, and improve security across teams and suppliers.</p>
        <h2>Web apps for operations and reporting</h2>
        <h2>AI automation for support and processes</h2>
        <h2>Cloud systems for scale</h2>
        <a href="/contact">Talk to us</a>
        <a href="/services">See services</a>
        <a href="/portfolio">View work</a>
      </main>
    `,
  },
  {
    path: '/erode',
    title: 'Erode Cloud Consulting & Cybersecurity | EliteCrows Infotech',
    description: 'EliteCrows Infotech supports Erode businesses with cloud consulting, software development, AI automation, and cybersecurity services designed for operational reliability.',
    canonical: 'https://elitecrows.in/erode',
    bodyHtml: `
      <main id="main-content">
        <h1>Erode Cloud Consulting, Software Development & Cybersecurity</h1>
        <p>Erode teams looking to modernize can use cloud platforms, software automation, and security controls to improve delivery and reduce operational friction.</p>
        <h2>Cloud architecture and migration</h2>
        <h2>Secure software development</h2>
        <h2>AI automation and security reviews</h2>
        <a href="/contact">Talk to us</a>
        <a href="/services">See services</a>
        <a href="/portfolio">View work</a>
      </main>
    `,
  },
  {
    path: '/salem',
    title: 'Salem Cybersecurity Services & Software Development | EliteCrows Infotech',
    description: 'EliteCrows Infotech provides Salem businesses with cybersecurity services, software development, AI automation, and cloud consulting for secure digital growth.',
    canonical: 'https://elitecrows.in/salem',
    bodyHtml: `
      <main id="main-content">
        <h1>Salem Cybersecurity, Software Development & AI Automation</h1>
        <p>Salem companies looking for secure digital systems can partner with us for custom software, AI automation, cloud modernization, and practical cybersecurity improvements.</p>
        <h2>Cybersecurity audits and remediation</h2>
        <h2>Automation for service desks and workflows</h2>
        <h2>Cloud consulting for resilient deployments</h2>
        <a href="/contact">Talk to us</a>
        <a href="/services">See services</a>
        <a href="/portfolio">View work</a>
      </main>
    `,
  },
  {
    path: '/service-areas',
    title: 'Service Areas in Tamil Nadu | EliteCrows Infotech',
    description: 'EliteCrows Infotech serves Coimbatore, Tiruppur, Erode, Salem, and nearby Tamil Nadu districts with software, AI automation, cloud, and cybersecurity services.',
    canonical: 'https://elitecrows.in/service-areas',
    bodyHtml: `
      <main id="main-content">
        <h1>Service Areas Across Tamil Nadu</h1>
        <p>EliteCrows Infotech works with businesses across major Tamil Nadu markets and surrounding districts.</p>
        <h2>Priority cities</h2>
        <a href="/coimbatore">Coimbatore</a>
        <a href="/tiruppur">Tiruppur</a>
        <a href="/erode">Erode</a>
        <a href="/salem">Salem</a>
        <h2>Other supported locations</h2>
        <p>Namakkal, Karur, Dharmapuri, Krishnagiri, Hosur, Dindigul, and The Nilgiris.</p>
      </main>
    `,
  },
];

for (const page of routePages) {
  writeRoutePage(page);
}