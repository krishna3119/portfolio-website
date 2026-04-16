"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SectionDivider from "@/components/SectionDivider";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const SkillsPlayground = dynamic(
  () => import("@/components/SkillsPlayground"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />

      <main className="relative">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsPlayground />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <CertificatesSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
