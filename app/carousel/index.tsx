import React, { Children, useState } from "react";
import type { CarouselProps } from "./types";
import "./index.css";

export function Carousel({ children, slideCount }: CarouselProps) {
  // Convert children to array for indexing
  const slides = Children.toArray(children);

  // Track current slide index
  const [current, setCurrent] = useState(0);

  // Handlers for navigation
  const prevSlide = () => {
    setCurrent(current === 0 ? slideCount - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slideCount - 1 ? 0 : current + 1);
  };

  return (
    <div className="carousel relative w-full overflow-hidden">
      {/* Slide wrapper with horizontal transform */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((child, idx) => (
          <div
            key={idx}
            className="slide w-full flex-shrink-0 overflow-hidden lg:overflow-visible"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className={`slide-button absolute top-1/2 left-2 -translate-y-1/2
          bg-gray-50 bg-opacity-50 text-black rounded-full
          hover:bg-opacity-70 shadow-md h-40 w-40 lg:hidden
          flex justify-center items-center
        `}
        aria-label="Go to previous slide"
      >
        <svg className="icon__chevron-left size-32">
          <use href="#icon-chevron-left"></use>
        </svg>
      </button>
      {/* Next Button */}
      <button
        onClick={nextSlide}
        className={`slide-button absolute top-1/2 right-2 -translate-y-1/2
          bg-gray-50 bg-opacity-50 text-black rounded-full
          hover:bg-opacity-70 shadow-md h-40 w-40 lg:hidden
          flex justify-center items-center
        `}
        aria-label="Go to next slide"
      >
        <svg className="icon__chevron-right size-32">
          <use href="#icon-chevron-right"></use>
        </svg>
      </button>

      {/* Indicators */}
      <div className="w-full flex justify-center items-center gap-4 mt-16">
        {Array.from({ length: slideCount }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full cursor-pointer shadow-md ${
              current === idx ? "w-10 h-10 bg-gray-50" : "w-6 h-6 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
