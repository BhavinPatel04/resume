import React from "react";
import profileImage from "../assets/Linkedin profile pic.jpeg";
import resume from "../assets/Resume-Bhavinkumar-Patel.pdf";
import Vitals from "~/vitals";
import "./index.css";

export function About() {
  return (
    <div className="about flex flex-col lg:flex-row lg:justify-between text-center lg:h-full plr-16 lg:plr-0 xxl:plr-32 lg:w-full">
      <div className="profile-pic flex flex-col gap-24 items-center h-full w-full lg:w-[50%] mtb-8 lg:mtb-24">
        <div className="picture flex justify-center rounded-full h-200 w-200 lg:h-300 lg:w-300 xl:h-450 xl:w-450">
          <img
            src={profileImage}
            alt="Bhavin Kumar Patel profile picture"
            className="rounded-full h-full shadow-md"
          />
        </div>
        <div className="links flex gap-8 items-center justify-center w-full">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/bhavinpatel04/"
            aria-label="Go to Bhavin's LinkedIn" rel="noreferrer"
          >
            <svg className="icon__linkedin size-32">
              <use href="#icon-linkedin"></use>
            </svg>
          </a>
          <a
            target="_blank"
            href="https://github.com/BhavinPatel04"
            aria-label="Go to Bhavin's Github" rel="noreferrer"
          >
            <svg className="icon__github size-32">
              <use href="#icon-github"></use>
            </svg>
          </a>
        </div>
        <Vitals />
      </div>
      <div className="info flex flex-col gap-8 lg:gap-16 justify-end mt-8 lg:mb-200">
        <div className="name font-bold text-2xl lg:text-5xl">
          Bhavin Kumar Patel
        </div>
        <div className="designation">Staff front-end engineer</div>
        <div className="download-button flex justify-center">
          <a
            type="button"
            href={resume}
            download="Bhavin Kumar Patel - Resume"
            className="flex justify-center items-center gap-8 ptb-8 plr-16"
          >
            <svg className="icon__download size-24">
              <use href="#icon-download"></use>
            </svg>
            <div>Download CV</div>
          </a>
        </div>
      </div>
    </div>
  );
}
