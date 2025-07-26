import React from "react";
import { About } from "~/about";
import { Header } from "~/header";

export function Intro() {
  return (
    <>
      <div className="resume font-sans">
        {/* Header */}
        <Header />

        {/* About Section */}
        <section id="about" className="p-8 max-w-4xl mx-auto h-full">
          <About />
        </section>

        {/* Projects Section */}
        <section id="projects" className="p-8 bg-white max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <ul className="space-y-4">
            <li className="border p-4 rounded shadow-sm">
              <h3 className="font-bold">Project 1</h3>
              <p>
                Short description of the project. Tech used: React, Tailwind.
              </p>
              <a href="#" className="text-blue-600 underline">
                View Project
              </a>
            </li>
            {/* Add more projects here */}
          </ul>
        </section>

        {/* Skills Section */}
        <section id="skills" className="p-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            <li className="bg-gray-200 px-3 py-1 rounded">React</li>
            <li className="bg-gray-200 px-3 py-1 rounded">Tailwind CSS</li>
            <li className="bg-gray-200 px-3 py-1 rounded">JavaScript</li>
            {/* Add more skills */}
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" className="p-8 bg-white max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p>
            Feel free to reach out to me via{" "}
            <a href="mailto:your@email.com" className="text-blue-600 underline">
              email
            </a>
            .
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 p-4">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </footer>
      </div>
    </>
  );
}
