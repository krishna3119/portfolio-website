"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative py-12 px-4 sm:px-8 md:px-16 border-t border-glass-border">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8"
                >
                    {/* Logo */}
                    <a
                        href="#hero"
                        className="text-xl font-bold tracking-tight"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        <span className="text-neon glow-text-sm">K</span>
                        <span className="text-text-primary">rishna</span>
                        <span className="text-neon-dim ml-1">.</span>
                    </a>

                    {/* Copyright */}
                    <p className="text-text-muted text-sm text-center">
                        © {new Date().getFullYear()} Krishna Chaudhary. Crafted with{" "}
                        <span className="text-neon">♥</span> and code.
                    </p>

                    {/* Back to top */}
                    <button 
                        className="back-to-top" 
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <div className="text">
                            <span>Back</span>
                            <span>to</span>
                            <span>top</span>
                        </div>
                        <div className="clone">
                            <span>Back</span>
                            <span>to</span>
                            <span>top</span>
                        </div>

                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" stroke="currentColor" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </footer>
    );
}
