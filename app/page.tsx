import React from "react";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Contact } from "@/components/contact/Contact";

export default function SinglePagePortfolio() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Home / Hero Section (#home) */}
      <Hero />

      {/* About & Career Journey Section (#about) */}
      <About />

      {/* Skills & Technologies Section (#skills) */}
      <Skills />

      {/* Selected Projects Showcase (#projects) */}
      <Projects />

      {/* Contact Section (#contact) */}
      <Contact />
    </div>
  );
}
