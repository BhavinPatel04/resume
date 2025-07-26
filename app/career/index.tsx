import React from "react";
import { Carousel } from "~/carousel";
import "./index.css";

export function Career() {
  const items = [
    {
      company: "ebay Canada",
      duration: "April 2021 - Present",
      location: "Toronto, ON",
      team: "My Collection (BGE)",
      points: [
        "Led development of a new front-end application for eBay Vault using MarkoJS; launched v1.0 on schedule with zero critical post-release bugs",
        "Among the first in the org to adopt GraphQL, improving efficiency and consistency in front-end data access",
        "Built and maintained accessible shared UI components in MarkoJS and React for scalable use across business units",
        "Automated visual and integration testing at PR level and reduced test run time by 78%, accelerating deployment speed and quality",
        "Designed and developed internal tools to streamline workflows, enable rule management, and boost team productivity",
        "Supported eBay’s homepage initiatives with UX enhancements that positively impacted engagement and revenue",
        "Collaborated cross-functionally with designers and product managers to deliver key features for “My Collection” and MyEbay",
        "Mentored and onboarded new hires and contractors, providing architectural guidance and resolving day-to-day blockers",
      ],
    },
    {
      company: "ebay",
      duration: "June 2019 - April 2021",
      location: "San Jose, CA",
      team: "MyEbay (BGE)",
      points: [
        "Drove migration and modernization of legacy Java pages in the MyEbay section of ebay.com using MarkoJS, aligning with current UI and accessibility standards",
        "Delivered multiple new features with zero post-release bugs by collaborating closely with design and product stakeholders",
        "Implemented a scalable theming system in MarkoJS, reducing long-term maintenance effort during UI revamps",
        "Optimized front-end performance by removing Lodash, significantly reducing bundle size and improving load times",
        "Adopted and integrated ebayui-components into the MyEbay MarkoJS application, ensuring compliance with platform-wide design guidelines",
        "Mentored junior developers and facilitated onboarding for offshore teams, supporting timely delivery and consistent code quality",
      ],
    },
    {
      company: "ebay",
      duration: "January 2017 - June 2019",
      location: "Bellevue, WA",
      team: "M1 (DSS)",
      points: [
        "Built a QA automation tool using Angular and Puppeteer to validate dashboard performance, generate JIRA tickets for front-end issues, and manage on-call schedules",
        "Contributed to a React-based internal dashboard builder enabling self-service analytics",
        "Developed a marketing data visualization app in AngularJS to support business decision-making",
        "Created core UI components aligned with internal style guides to maintain design consistency and reusability",
        "Active contributor to eBay’s open source initiatives including MarkoJS and internal UI libraries",
      ],
    },
    {
      company: "Technumen",
      duration: "March 2014 - December 2016",
      location: "",
      team: "",
      points: [
        "Built internal tools using Spring MVC and JavaScript to support campaign tracking and marketing analytics",
        "Improved login performance of AT&T's mobile app using lazy loading techniques",
        "Created performance monitoring and health check tools to support production systems",
      ],
    },
  ];

  return (
    <div className="career">
      <div className="title flex justify-between">
        <div className="title section-title">Career</div>
      </div>
      <div className="items">
        <Carousel slideCount={items.length}>
          {items.map((item, idx) => (
            <div key={idx} className="item w-full">
              <div className="item__title text-2xl">{item.company}</div>
              <div className="item__sub-title flex justify-between text-xs mb-16">
                <div className="sub-title__duration">{item.duration}</div>
                <div className="sub-title__location">{item.location}</div>
              </div>
              <div className="item__team text-sm mb-4">{item.team}</div>
              <div className="item__points secondary-text text-sm overflow-hidden">
                <ul className="ml-16 lg:mlr-16 list-disc">
                  {item.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
