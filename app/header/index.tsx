import React from "react";
import { Link } from "react-router";
import "./index.css";

type HeaderProps = {
  activeLink?: string;
};

export function Header({ activeLink }: HeaderProps) {
  const links = [
    {
      id: "about",
      to: "#about",
      label: "About",
    },
    {
      id: "projects",
      to: "#projects",
      label: "Projects",
    },
    {
      id: "skills",
      to: "#skills",
      label: "Skills",
    },
    {
      id: "career",
      to: "#career",
      label: "Career",
    },
    {
      id: "awards",
      to: "#awards",
      label: "Awards",
    },
  ];
  return (
    <div className="header flex justify-between text-center gap-24 ptb-8 plr-8 lg:ptb-16 lg:plr-0">
      <h1
        className="logo flex flex-col h-50 w-50 p-4"
        aria-label="Bhavin Kumar Patel's portfolio"
        tabIndex={0}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="leading-none">B</div>
          <div className="leading-none">K</div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="leading-none">P</div>
          <div className="leading-none">&nbsp;&nbsp;&nbsp;</div>
        </div>
      </h1>
      <div className="navigation-links flex flex-wrap gap-8 lg:gap-16 text-xs items-center">
        {/** @todo decide later how to handle the active section UX */}
        {links.map((link) => (
          <Link
            key={`link-${link.id}`}
            to={link.to}
            className={`text-sm/6 leading-32 ${activeLink === link.to ? "" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
