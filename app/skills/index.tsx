import React from "react";
import "./index.css";

export function Skills() {
  return (
    <div className="skills">
      <div className="title flex justify-between">
        <div className="title section-title">Skills</div>
      </div>
      <div className="categories bg-white p-16 rounded-lg grid gap-16 grid-cols-1 lg:grid-cols-2">
        <div className="language-and-frameworks flex flex-col gap-1">
          <div className="title">Languages and frameworks</div>
          <div className="items secondary-text">
            JavaScript, TypeScript, ReactJS, Angular, MarkoJS, Redux, GraphQL,
            Node.js, Spring MVC
          </div>
        </div>
        <div className="testing-and-tools flex flex-col gap-4">
          <div className="title">Testing & Tooling</div>
          <div className="items secondary-text">
            Playwright, Percy, Jest, React Testing Library, Wdio
          </div>
        </div>
        <div className="developer-tools flex flex-col gap-4">
          <div className="title">Developer Tools</div>
          <div className="items secondary-text">
            Git, VS Code, Figma, IntelliJ, Postman, Android Studio
          </div>
        </div>
        <div className="ai-tools flex flex-col gap-4">
          <div className="title">AI tools</div>
          <div className="items secondary-text">
            Copilot, Cline
          </div>
        </div>
        <div className="other flex flex-col gap-4">
          <div className="title">Other</div>
          <div className="items secondary-text">
            Accessibility (WCAG), CI/CD pipelines, Slackbot/GitHub/JIRA
            integrations, UX optimization
          </div>
        </div>
      </div>
    </div>
  );
}
