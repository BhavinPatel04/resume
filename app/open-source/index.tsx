import React from "react";
import { HeroItem } from "./hero-item";
import { Item } from "./item";
import "./index.css";

export function OpenSource() {
  const openSourceContributions = [
    {
      label: "marko-js/marko",
      url: "https://github.com/marko-js/marko/pulls?q=is%3Apr+author%3ABhavinPatel04+is%3Aclosed",
    },
    {
      label: "marko-js/cli",
      url: "https://github.com/marko-js/cli/pulls?q=is%3Apr+author%3ABhavinPatel04+is%3Aclosed",
    },
    {
      label: "ebay/ebayui-core",
      url: "https://github.com/eBay/ebayui-core/pulls?q=is%3Apr+author%3ABhavinPatel04+is%3Aclosed",
    },
    {
      label: "ebay/skin",
      url: "https://github.com/eBay/skin/pulls?q=is%3Apr+is%3Aclosed+author%3ABhavinPatel04",
    },
  ];

  return (
    <div className="open-source">
      <div className="title flex justify-between">
        <div className="title section-title">Projects</div>
        {/* <div className="explore-all text-sm">Explore all</div> */}
      </div>
      <div className="projects flex w-full gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="project-container hero-container w-full">
          <HeroItem className="section-content" />
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
            name="Other open-source contributions"
            description={
              <div className="overflow-auto">
                {openSourceContributions.map((contribution, idx) => (
                  <a
                    key={`contribution-${idx}`}
                    className="underline portfolio-link block leading-24"
                    href={contribution.url}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={`Go to ${contribution.label} Github repository`}
                  >
                    {contribution.label}
                  </a>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
