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