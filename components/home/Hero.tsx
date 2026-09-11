"use client";

import React, { useEffect, useRef, useState } from "react";

import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

import {
  ArrowDown,
  Sparkles,
  Code2,
  Database,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";
import TypewriterRoles from "./TypewriterRoles";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [showAscii, setShowAscii] = useState(false);
  const [asciiArt, setAsciiArt] = useState("");

  const imageRef = useRef<HTMLImageElement>(null);

  /* ============================================================
     ASCII IMAGE GENERATOR
  ============================================================ */

  const generateAscii = () => {
    const image = imageRef.current;

    if (!image || !image.complete) {
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const width = 55;
    const aspectRatio =
      image.naturalHeight / image.naturalWidth;

    const height = Math.floor(
      width * aspectRatio * 0.45
    );

    canvas.width = width;
    canvas.height = height;

    context.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    const imageData = context.getImageData(
      0,
      0,
      width,
      height
    );

    const characters = "@%#*+=-:. ";

    let result = "";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const red = imageData.data[index];
        const green = imageData.data[index + 1];
        const blue = imageData.data[index + 2];

        const brightness =
          (red * 299 +
            green * 587 +
            blue * 114) /
          1000;

        const characterIndex = Math.floor(
          (brightness / 255) *
            (characters.length - 1)
        );

        result += characters[characterIndex];
      }

      result += "\n";
    }

    setAsciiArt(result);
  };

  useEffect(() => {
    if (showAscii) {
      generateAscii();
    }
  }, [showAscii]);

  /* ============================================================
     ANIMATION
  ============================================================ */

  const containerVariants: import("framer-motion").Variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: shouldReduceMotion
          ? 0
          : 0.08,
      },
    },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.45,
        ease: [0.2, 0.9, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="
        pt-20
        sm:pt-24
        md:pt-28
        pb-20
        md:pb-28
        w-full
      "
    >
      <div className="max-w-container mx-auto px-6 sm:px-8">

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-12
            lg:gap-8
            items-center
          "
        >

          {/* =====================================================
              LEFT COLUMN
          ====================================================== */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              lg:col-span-7
              space-y-6
              text-left
            "
          >

            {/* Headline */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >

              <p
                className="
                  font-sans
                  text-lg
                  sm:text-xl
                  text-[#3DDC84]
                "
              >
                Hello, I'm
              </p>

              <h1
                className="
                  font-sans
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-bold
                  tracking-tight
                  text-[var(--text-primary)]
                  leading-[1.08]
                "
              >
                {profileData.name}
              </h1>

              <TypewriterRoles />

            </motion.div>


            {/* Positioning */}
            <motion.p
              variants={itemVariants}
              className="
                font-sans
                text-base
                sm:text-lg
                text-[var(--text-secondary)]
                leading-relaxed
                max-w-xl
              "
            >
              Building scalable backend systems and full-stack
              applications with modern web technologies.
            </motion.p>


            {/* Core Domain Highlights */}
            <motion.div
              variants={itemVariants}
              className="
                flex
                flex-wrap
                items-center
                gap-2
                pt-1
                font-mono
                text-xs
                text-[var(--text-secondary)]
              "
            >

              <span
                className="
                  px-2.5
                  py-1
                  rounded-control
                  bg-[var(--surface)]
                  border
                  border-[var(--hairline)]
                  flex
                  items-center
                  gap-1.5
                "
              >
                <Database
                  size={13}
                  className="text-[#3DDC84]"
                />

                Backend Architecture
              </span>


              <span
                className="
                  px-2.5
                  py-1
                  rounded-control
                  bg-[var(--surface)]
                  border
                  border-[var(--hairline)]
                  flex
                  items-center
                  gap-1.5
                "
              >
                <Code2
                  size={13}
                  className="text-[#3DDC84]"
                />

                Real-Time Systems & WebSockets
              </span>


              <span
                className="
                  px-2.5
                  py-1
                  rounded-control
                  bg-[var(--surface)]
                  border
                  border-[var(--hairline)]
                  flex
                  items-center
                  gap-1.5
                "
              >
                <Sparkles
                  size={13}
                  className="text-[#3DDC84]"
                />

                Software Dev → AI/ML
              </span>

            </motion.div>


            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="
                pt-2
                max-w-[700px]
              "
            >
              <SocialLinks />
            </motion.div>


            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="
                pt-1
                flex
                flex-wrap
                items-center
                gap-3.5
              "
            >

              <Button
                href="#projects"
                variant="primary"
                size="md"
              >
                <span>View My Work</span>

                <ArrowDown size={15} />
              </Button>


              <Button
                href="#contact"
                variant="secondary"
                size="md"
              >
                <span>Contact Me</span>
              </Button>

            </motion.div>

          </motion.div>


          {/* =====================================================
              RIGHT COLUMN — PORTRAIT
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.2, 0.9, 0.3, 1] as const,
              delay: 0.15,
            }}
            className="
              lg:col-span-5
              flex
              justify-center
              lg:justify-end
            "
          >

            <div
              className="
                relative
                w-full
                max-w-[380px]
              "
            >

              {/* =================================================
                  TECHNICAL BACKGROUND
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  overflow-visible
                "
              >

                {/* Grid dots */}
                <div
                  className="
                    absolute
                    right-[-10px]
                    top-[12%]
                    h-32
                    w-32
                    opacity-30
                    [background-image:radial-gradient(var(--text-muted)_1px,transparent_1px)]
                    [background-size:14px_14px]
                  "
                />


                {/* Horizontal technical line */}
                <div
                  className="
                    absolute
                    left-[-25px]
                    right-[-25px]
                    top-[38%]
                    h-px
                    bg-[var(--hairline)]
                    opacity-50
                  "
                />


                {/* Vertical line */}
                <div
                  className="
                    absolute
                    bottom-[-20px]
                    left-[12%]
                    top-[-30px]
                    w-px
                    bg-[var(--hairline)]
                    opacity-35
                  "
                />


                {/* Green node */}
                <span
                  className="
                    absolute
                    left-[-18px]
                    top-[37.5%]
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#3DDC84]
                    shadow-[0_0_10px_rgba(61,220,132,0.6)]
                  "
                />


                {/* Small node */}
                <span
                  className="
                    absolute
                    right-[-20px]
                    top-[20%]
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#3DDC84]
                    opacity-70
                  "
                />


                {/* Cross marker */}
                <span
                  className="
                    absolute
                    right-[-22px]
                    bottom-[28%]
                    h-5
                    w-5
                    opacity-50
                  "
                >
                  <span
                    className="
                      absolute
                      left-1/2
                      top-0
                      h-full
                      w-px
                      bg-[#3DDC84]
                    "
                  />

                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-px
                      w-full
                      bg-[#3DDC84]
                    "
                  />
                </span>

              </div>


              {/* =================================================
                  ASCII BUTTON
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  setShowAscii((value) => !value)
                }
                className="
                  absolute
                  right-[18px]
                  top-[-12px]
                  z-30

                  rounded-md

                  border
                  border-[var(--hairline)]

                  bg-[var(--background)]

                  px-3
                  py-1.5

                  font-mono
                  text-[11px]
                  font-semibold
                  tracking-wide

                  text-[var(--text-primary)]

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-[#3DDC84]/60
                  hover:text-[#3DDC84]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#3DDC84]/40
                "
              >
                {showAscii ? "[PHOTO]" : "[ASCII]"}
              </button>


              {/* =================================================
                  PORTRAIT AREA
              ================================================== */}

              <div
                className="
                  relative
                  mx-auto
                  w-[270px]
                  sm:w-[290px]
                "
              >

                {/* Outer organic outline */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -inset-3
                    opacity-70

                    border
                    border-[#3DDC84]/60

                    rounded-[48%_52%_46%_54%_/_44%_48%_52%_56%]

                    rotate-[-3deg]
                  "
                />


                {/* Second subtle outline */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -inset-6

                    border
                    border-[var(--hairline)]

                    rounded-[52%_48%_54%_46%_/_48%_55%_45%_52%]

                    rotate-[4deg]

                    opacity-40
                  "
                />


                {/* Image */}
                <div
                  className="
                    relative
                    overflow-hidden

                    rounded-[48%_52%_45%_55%_/_42%_48%_52%_58%]

                    bg-[var(--surface)]

                    aspect-[4/5]

                    shadow-2xl
                  "
                >

                  <img
                    ref={imageRef}
                    src="/profile.jpg"
                    alt="Nikhil Singh"
                    onLoad={generateAscii}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full

                      object-cover
                      object-top

                      transition-all
                      duration-500
                    "
                    style={{
                      opacity: showAscii ? 0 : 1,
                    }}
                  />


                  {/* =================================================
                      ASCII MODE
                  ================================================== */}

                  <div
                    className={`
                      absolute
                      inset-0

                      flex
                      items-center
                      justify-center

                      overflow-hidden

                      bg-[#070908]

                      transition-opacity
                      duration-500

                      ${
                        showAscii
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }
                    `}
                  >

                    <pre
                      aria-hidden={!showAscii}
                      className="
                        select-none
                        whitespace-pre

                        font-mono

                        text-[4px]
                        leading-[4px]

                        sm:text-[5px]
                        sm:leading-[5px]

                        text-[#3DDC84]

                        opacity-90
                      "
                    >
                      {asciiArt}
                    </pre>


                    {/* Scan line */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        left-0
                        right-0
                        top-1/2

                        h-px

                        bg-[#3DDC84]/30
                      "
                    />

                  </div>


                  {/* Subtle image overlay */}
                  {!showAscii && (
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-black/20
                        via-transparent
                        to-transparent
                      "
                    />
                  )}


                  {/* Corner technical marks */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      left-5
                      top-5

                      h-4
                      w-4

                      border-l
                      border-t

                      border-[#3DDC84]/70
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      right-5
                      top-5

                      h-4
                      w-4

                      border-r
                      border-t

                      border-[#3DDC84]/70
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  OPEN TO WORK
              ================================================== */}

              <div
                className="
                  relative
                  z-20

                  mt-7

                  flex
                  justify-center
                "
              >

                <div
                  className="
                    inline-flex
                    items-center

                    rounded-full

                    border
                    border-[var(--hairline)]

                    bg-[var(--background)]

                    px-4
                    py-2

                    font-mono
                    text-[11px]

                    text-[var(--text-secondary)]

                    shadow-md
                  "
                >

                  <span
                    className="
                      mr-2
                      text-[#3DDC84]
                    "
                  >
                    ●
                  </span>

                  OPEN TO WORK

                </div>

              </div>


              {/* =================================================
                  ROLE LABEL
              ================================================== */}

              <p
                className="
                  mt-5

                  text-center

                  font-mono
                  text-xs
                  tracking-wide

                  text-[var(--text-muted)]
                "
              >
                Software

                <span
                  className="
                    mx-1.5
                    text-[#3DDC84]
                  "
                >
                  •
                </span>

                Backend

                <span
                  className="
                    mx-1.5
                    text-[#3DDC84]
                  "
                >
                  •
                </span>

                Full-Stack
              </p>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};