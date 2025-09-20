<div className="font-sans bg-gray-50 text-gray-900">
      {/* ===== HERO SECTION ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I’m <span className="text-blue-600">Bhavin Patel</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Staff Front-End Developer with 10+ years of experience modernizing
          applications, building design systems, and improving developer
          productivity.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/BhavinPatel04"
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/bhavinpatel04"
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-lg leading-relaxed">
          Passionate about accessibility, UI consistency, and user-centric
          design. Experienced in React, Angular, MarkoJS, and GraphQL. 
          Award-winning developer with a focus on building performant and scalable applications.
        </p>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <section id="experience" className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8 text-center">Experience</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-bold">eBay Canada – Staff Front-End Developer</h3>
            <p className="text-sm text-gray-600">2021 – Present</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Led development of eBay Vault front-end, launched with zero critical bugs.</li>
              <li>Adopted GraphQL to improve data access efficiency across the org.</li>
              <li>Automated testing pipelines, reducing run time by 78%.</li>
            </ul>
          </div>
          {/* Repeat similar cards for other roles */}
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="py-16 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">Date & Time Range Picker</h3>
            <p className="text-gray-600 mt-2">
              Dynamic reusable React component for selecting time intervals.{" "}
              <a
                href="https://github.com/BhavinPatel04/reactjs-datetime-range-picker"
                className="text-blue-600 underline"
              >
                View on GitHub
              </a>
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">Budget Watcher</h3>
            <p className="text-gray-600 mt-2">
              OCR-based React Native app for receipt scanning and expense tracking.
            </p>
          </div>
          {/* Add more project cards */}
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-4">Get In Touch</h2>
        <p className="text-lg mb-6">
          Interested in working together? Feel free to reach out.
        </p>
        <a
          href="mailto:bhavin.ptl04.ca@gmail.com"
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Say Hello
        </a>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bhavin Patel. Built with React & Tailwind.
      </footer>
    </div>


    /** 
  Resume Site Mockup (React + Tailwind)
  -------------------------------------
  Single-file React component (default export) that demonstrates
  a modern, responsive, accessible resume layout using Tailwind CSS.

  Setup notes (yarn + Vite + Tailwind):
    1. yarn create vite my-resume-site --template react
    2. cd my-resume-site
    3. yarn
    4. yarn add -D tailwindcss postcss autoprefixer
    5. npx tailwindcss init -p
    6. Configure tailwind.config.js `content` with './index.html'
    7. Import the generated index.css which includes Tailwind directives.

  This file: src/App.jsx
  - Self-contained component showing header, hero, skills, projects, experience and contact.
  - Uses semantic HTML, ARIA labels, keyboard-accessible nav, and good spacing/typography.
*/

import React from 'react'

// Sample data: replace with your real data or feed via props
const PROFILE = {
  name: 'Bhavin Kumar Patel',
  title: 'Staff Front-End Developer',
  location: 'Toronto, Canada',
  email: 'bhavin.ptl04.ca@gmail.com',
  links: [
    { label: 'Portfolio', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
}

const SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'MarkoJS', 'Tailwind',
  'GraphQL', 'Redux', 'Node.js', 'Accessibility (WCAG)'
]

const PROJECTS = [
  { title: 'eBay Vault Frontend', desc: 'Led v1.0 launch using MarkoJS; zero critical post-release bugs', tags: ['MarkoJS','GraphQL'] },
  { title: 'Interop Layer', desc: 'Render React components inside Marko pages', tags: ['React','Architecture'] },
  { title: 'Octavius', desc: 'Org-wide productivity tool integrated with Slack/GitHub/JIRA', tags: ['React','Integrations'] },
]

const EXPERIENCE = [
  { company: 'eBay Canada Inc.', role: 'Staff Front-End Developer', date: 'Apr 2021 – Present', bullets: [
    'Led development of a new front-end application for eBay Vault using MarkoJS',
    'Built and maintained accessible shared UI components in MarkoJS and React',
    'Automated visual and integration tests; reduced test runtime by 78%'
  ]},
  { company: 'eBay Inc.', role: 'Front-End Engineer', date: 'Jun 2019 – Apr 2021', bullets: [
    'Migrated legacy Java pages to MarkoJS, improving accessibility and performance',
    'Implemented scalable theming system to reduce maintenance effort'
  ]}
]

export default function App() {
  // Render the sticky header/navigation
  // Using a nav with anchor links that map to section IDs (good for keyboard users)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans leading-6">
      {/* Header: sticky with quick links */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="#hero" className="text-lg font-semibold text-gray-900">{PROFILE.name}</a>
              <span className="hidden sm:inline-block text-sm text-gray-500">• {PROFILE.title}</span>
            </div>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-3">
              <a className="px-3 py-2 text-sm rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" href="#about">About</a>
              <a className="px-3 py-2 text-sm rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" href="#projects">Projects</a>
              <a className="px-3 py-2 text-sm rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" href="#experience">Experience</a>
              <a className="px-3 py-2 text-sm rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" href="#contact">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <a href="#contact" className="inline-block bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero / Intro */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Intro card */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{PROFILE.name}</h1>
            <p className="mt-2 text-sm text-gray-600">{PROFILE.title} — building performant, scalable, and accessible web applications.</p>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <a href={`mailto:${PROFILE.email}`} className="text-sm text-gray-700 hover:underline">{PROFILE.email}</a>
              <span className="hidden sm:inline text-sm text-gray-400">|</span>
              {PROFILE.links.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-blue-600 hover:underline">{l.label}</a>
              ))}
            </div>

            <p className="mt-6 text-gray-700">Proven leader in modernizing legacy systems, building design systems, improving test infrastructure, and contributing to open-source tools. Passionate about developer productivity, UI consistency, accessibility and user-centric design.</p>

            <div className="mt-6 flex flex-wrap gap-2" aria-hidden>
              {SKILLS.slice(0, 8).map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-full bg-gray-100 border border-gray-200">{s}</span>
              ))}
            </div>
          </div>

          {/* Quick stats / skills panel */}
          <aside className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Key Skills</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
              {SKILLS.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-10">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="mt-1 text-sm text-gray-600">Selected projects demonstrating system design, impact, and cross-team collaboration.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <article key={p.title} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-200">{t}</span>
                  ))}
                </div>
                <div className="mt-3">
                  <a href="#" className="text-sm text-blue-600 hover:underline">View details</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mt-10">
          <h2 className="text-xl font-semibold">Experience</h2>
          <div className="mt-4 space-y-4">
            {EXPERIENCE.map((e) => (
              <div key={e.company} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{e.company}</h3>
                    <p className="text-sm text-gray-600">{e.role} • <span className="text-gray-500">{e.date}</span></p>
                  </div>
                </div>

                <ul className="mt-3 ml-4 list-disc text-sm text-gray-700 space-y-1">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="mt-10">
          <div className="bg-gradient-to-r from-yellow-50 to-white p-6 rounded-2xl border border-gray-100">
            <h2 className="text-lg font-semibold">Get in touch</h2>
            <p className="mt-2 text-sm text-gray-700">I'm open to senior front-end opportunities. Reach out for roles focusing on architecture, developer productivity, and accessibility.</p>

            <div className="mt-4">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Email me</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} {PROFILE.name} — Built with React & Tailwind
        </footer>
      </main>
    </div>
  )
}
