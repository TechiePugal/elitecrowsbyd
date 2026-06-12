import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const rootHtml = `
  <main id="main-content" aria-label="EliteCrows Infotech home page content">
    <nav aria-label="Main navigation">
      <a href="/">EliteCrows</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Work</a>
      <a href="/about">About</a>
      <a href="/careers">Careers</a>
      <a href="/contact">Contact</a>
    </nav>

    <section>
      <p>EliteCrows Infotech delivers custom software development, AI automation, cloud engineering, and cybersecurity for enterprises.</p>
      <h1>Custom Software Development, AI Automation & Cloud Engineering for Enterprises</h1>
      <p>We build enterprise web apps, AI chatbots, cloud infrastructure, and cybersecurity solutions for high-growth businesses.</p>
      <a href="/contact">Start a project</a>
      <a href="/services">Explore services</a>
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

    <section id="contact">
      <h2>Contact EliteCrows Infotech</h2>
      <p>Book a strategy call for custom software, AI automation, cloud migration, and cybersecurity services.</p>
      <a href="mailto:info@elitecrows.com">info@elitecrows.com</a>
      <a href="tel:+916383106107">+91 63831 06107</a>
    </section>

    <footer>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/careers">Careers</a>
      <a href="/contact">Contact</a>
    </footer>
  </main>
`;

const distIndexPath = resolve(process.cwd(), 'dist', 'index.html');
const html = readFileSync(distIndexPath, 'utf8');
const updatedHtml = html.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);

writeFileSync(distIndexPath, updatedHtml, 'utf8');