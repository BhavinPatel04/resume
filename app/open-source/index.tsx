import React from "react";
import { HeroItem } from "./hero-item";
import { Item } from "./item";
import "./index.css";

export function OpenSource() {
  return (
    <div className="open-source">
      <div className="title flex justify-between">
        <div className="title section-title">Projects</div>
        {/* <div className="explore-all text-sm">Explore all</div> */}
      </div>
      <div className="projects flex w-full gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="project-container hero-container w-full">
          <HeroItem className="section-content"/>
        </div>
        <div className="project-container items-container flex flex-col w-full h-350 gap-8">
          <Item
            className="budget-watcher section-content"
            name="Budget watcher"
            href="https://github.com/BhavinPatel04/budget-watcher"
            description="Developed an OCR-based receipt scanning app with auto-categorization and monthly spending summaries"
            techStack="React-native"
          />
          <Item
            className="json-schema section-content"
            name="JSON schema"
            href="https://github.com/BhavinPatel04/ngx-antd-json-schema-form"
            description="Angular form using antd"
            techStack="Angular"
          />
        </div>
      </div>
    </div>
  );
}
