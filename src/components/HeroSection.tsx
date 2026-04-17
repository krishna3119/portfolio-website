"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleUniverse = dynamic(() => import("./ParticleUniverse"), {
    ssr: false,
});

const titles = ["AI Web Developer", "Graphic Designer", "Programmer"];

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a051e] via-[#030014] to-black px-4 sm:px-8 md:px-16"
        >
            {/* Particle background */}
            <ParticleUniverse />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.08)_0%,_transparent_70%)] z-[1]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                {/* Greeting line */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-text-muted text-sm md:text-base tracking-[0.3em] uppercase mb-6"
                    style={{ fontFamily: "var(--font-family-mono)" }}
                >
                    Welcome to my universe
                </motion.p>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 glow-text text-center"
                    style={{ fontFamily: "var(--font-family-display)" }}
                >
                    <span className="text-text-primary">Krishna</span>{" "}
                    <span className="bg-gradient-to-r from-violet via-neon to-neon-light bg-clip-text text-transparent">
                        Chaudhary
                    </span>
                </motion.h1>

                {/* Titles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10"
                >
                    {titles.map((title, i) => (
                        <span key={title} className="flex items-center gap-3 md:gap-4">
                            <span className="text-sm md:text-lg text-text-secondary font-medium tracking-wide">
                                {title}
                            </span>
                            {i < titles.length - 1 && (
                                <span className="w-1.5 h-1.5 rounded-full bg-neon glow-text-sm" />
                            )}
                        </span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                >
                    <a href="#projects" className="animated-button flex items-center justify-center w-full sm:w-auto">
                        <span>View My Work!</span>
                        <span></span>
                    </a>
                    <a href="#contact" className="animated-button flex items-center justify-center w-full sm:w-auto">
                        <span>Get in Touch</span>
                        <span></span>
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-neon/30 flex items-start justify-center p-1"
                    >
                        <motion.div className="w-1 h-2 rounded-full bg-neon" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
