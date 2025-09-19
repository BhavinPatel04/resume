import React from "react";
import { Link } from "react-router";
import "./index.css";

export function Header() {
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
        <Link to="#about" className="text-sm/6">
          About
        </Link>
        <Link to="#projects" className="text-sm/6">
          Projects
        </Link>
        <Link to="#skills" className="text-sm/6">
          Skills
        </Link>
        <Link to="#career" className="text-sm/6">
          Career
        </Link>
        <Link to="#awards" className="text-sm/6">
          Awards
        </Link>
      </div>
    </div>
  );
}
