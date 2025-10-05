import React from "react";
import type { Item } from "./types";

export function Item({
  className = "",
  name,
  href,
  description,
  techStack,
}: Item) {
  return (
    <div
      className={`item project flex flex-col w-full justify-between h-[50%] ${className}`}
    >
      <div className="info flex flex-col justify-between h-full">
        <div className="content">
          <div className="name">
            {href ? (
              <a
                target="_blank"
                href={href}
                className="underline portfolio-link"
                rel="noreferrer"
              >
                {name}
              </a>
            ) : (
              <div>{name}</div>
            )}
          </div>
          <div className="description">{description}</div>
        </div>
        {!!techStack && (
          <div className="tech-stack">
            <i>{techStack}</i>
          </div>
        )}
      </div>
    </div>
  );
}
