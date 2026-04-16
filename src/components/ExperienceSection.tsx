"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Content Contributor",
        company: "PR Team — Jyotica Tangri",
        period: "Nov 2024 — Mar 2025",
        description:
            "Contributed creative content for the PR and promotions team of renowned Indian singer Jyotica Tangri. Worked on social media campaigns and audience engagement.",
        tags: ["PR", "Content Creation", "Campaign", "Entertainment"],
        icon: "🎵",
        color: "#c084fc",
    },
    {
        role: "Content Creator",
        company: "ReDevelopment Bazaar",
        period: "May 2025 — Jun 2025",
        description:
            "Creating compelling content for the redevelopment sector — writing articles, producing visual media, and building community engagement across digital platforms.",
        tags: ["Content Strategy", "Writing", "Visual Media", "Community"],
        icon: "🏗️",
        color: "#7c3aed",
    },
    {
        role: "Social Media Manager & Graphic Designer",
        company: "Property Times of India",
        period: "Jun 2025 — Jul 2025",
        description:
            "Managing social media presence, creating engaging graphic content, designing marketing materials, and driving brand awareness for real estate audiences.",
        tags: ["Social Media", "Graphic Design", "Marketing", "Canva"],
        icon: "🏠",
        color: "#a855f7",
    },
];

export default function ExperienceSection() {
    return (
        <section id="experience" className="relative py-28 md:py-36 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p
                        className="text-neon text-sm tracking-[0.3em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-family-mono)" }}
                    >
                        Journey
                    </p>
                    <h2
                        className="section-heading text-4xl md:text-5xl"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Experience
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-violet to-transparent md:-translate-x-[1px]" />

                    {experiences.map((exp, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.8, delay: i * 0.15 }}
                                className={`relative flex items-start mb-12 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 z-10 top-8">
                                    <div
                                        className="w-4 h-4 rounded-full border-2 glow-pulse"
                                        style={{
                                            borderColor: exp.color,
                                            backgroundColor: exp.color + "33",
                                            boxShadow: `0 0 20px ${exp.color}44`,
                                        }}
                                    />
                                </div>

                                {/* Card */}
                                <div
                                    className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                                        }`}
                                >
                                    <div className="glass-card p-6 group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{exp.icon}</span>
                                            <div>
                                                <h3
                                                    className="text-lg font-bold text-text-primary group-hover:text-neon transition-colors"
                                                    style={{ fontFamily: "var(--font-family-display)" }}
                                                >
                                                    {exp.role}
                                                </h3>
                                                <p className="text-sm text-neon-light font-medium">
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>

                                        <p
                                            className="text-xs text-text-muted mb-3 tracking-wide"
                                            style={{ fontFamily: "var(--font-family-mono)" }}
                                        >
                                            {exp.period}
                                        </p>

                                        <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet/10 text-neon-light border border-violet/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
