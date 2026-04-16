"use client";

import { motion, Variants } from "framer-motion";

const highlights = [
    {
        icon: "🤖",
        title: "AI & Prompt Engineering",
        desc: "Exploring AI tools and learning prompt design to improve workflows and content creation.",
    },
    {
        icon: "🌐",
        title: "Full-Stack Web Development",
        desc: "Learning MEAN stack (Angular, Node.js, Express, MongoDB) and building practical projects.",
    },
    {
        icon: "🎨",
        title: "Digital Design",
        desc: "Creating social media posts and visual content using Canva and AI for real-world platforms.",
    },
];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function AboutSection() {
    return (
        <section id="about" className="relative py-28 md:py-36 px-6">
            <div className="max-w-6xl mx-auto">
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
                        About Me
                    </p>
                    <h2
                        className="section-heading text-4xl md:text-5xl"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Who I Am
                    </h2>
                </motion.div>

                {/* Main glass card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-card p-8 md:p-12 mb-12"
                >
                    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                        <div>
                            <h3
                                className="text-2xl md:text-3xl font-bold text-text-primary mb-6"
                                style={{ fontFamily: "var(--font-family-display)" }}
                            >
                                Computer Science Student &{" "}
                                <span className="text-neon">Creative Developer</span>
                            </h3>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-4">
                                Hi, I&apos;m Krishna Chaudhary, a Computer Science student based in Mumbai, focused on building and designing digital content.
                            </p>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-4">
                                I work on social media design and content creation, where I&apos;ve created posts and managed content for real estate platforms like Property Times of India.
                            </p>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-4">
                                Along with design, I&apos;m learning full-stack development using JavaScript, Angular, and Python, and building projects to improve my practical skills.
                            </p>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                                I focus on learning by doing — building projects, experimenting, and improving step by step.
                            </p>
                        </div>

                        {/* Decorative stat badges */}
                        <div className="flex md:flex-col gap-4">
                            {[
                                { num: "1", label: "Live Project" },
                                { num: "2", label: "Technical Projects" },
                                { num: "2", label: "Academic Projects" },
                                { num: "2", label: "Projects In Progress" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="glass-card p-4 text-center min-w-[90px]"
                                >
                                    <div className="text-2xl font-bold text-neon glow-text-sm">
                                        {stat.num}
                                    </div>
                                    <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Highlight cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeUp}
                            className="glass-card p-7 text-center group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h4
                                className="text-lg font-semibold text-text-primary mb-2"
                                style={{ fontFamily: "var(--font-family-display)" }}
                            >
                                {item.title}
                            </h4>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
