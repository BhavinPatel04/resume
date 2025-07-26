import React from "react";
import type { Item } from "./types";

export function Item({ className = "", name, href, description, techStack }: Item) {
  return (
    <div className={`item project flex flex-col w-full justify-between h-[50%] ${className}`}>
      <div className="info">
        <div className="name">
          <a target="_blank" href={href} className="underline" rel="noreferrer">
            {name}
          </a>
        </div>
        <div className="description">{description}</div>
        <div className="tech-stack"><i>{techStack}</i></div>
      </div>
    </div>
  );
}
