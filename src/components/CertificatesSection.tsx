"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
    {
        title: "Prompt Engineering",
        issuer: "MVLU College",
        description:
            "Certified in advanced Prompt Engineering — mastering techniques for crafting effective prompts for Large Language Models, understanding AI behavior optimization, and developing AI-powered tools.",
        icon: "🧠",
        badge: "Certified",
        image: "/images/prompt eng certificate.jpeg",
    },
];

export default function CertificatesSection() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedImage(null);
            }
        };

        if (selectedImage) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage]);

    return (
        <section id="certificates" className="relative py-28 md:py-36 px-4 sm:px-8 md:px-16">
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
                        Credentials
                    </p>
                    <h2
                        className="section-heading text-3xl sm:text-4xl md:text-5xl"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Certificates
                    </h2>
                </motion.div>

                {/* Certificate cards — same flip animation as development projects */}
                <div className="grid gap-8">
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={cert.title}
                            custom={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                            className="w-full"
                        >
                            <div className="card w-full min-h-[200px]">
                                {/* Front face */}
                                <div className="card__front">
                                    <span className="text-5xl mb-3 block">{cert.icon}</span>
                                    <h3
                                        className="text-2xl font-bold text-white mb-1"
                                        style={{ fontFamily: "var(--font-family-display)" }}
                                    >
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm font-medium" style={{ color: "var(--color-neon-light)" }}>
                                        {cert.issuer}
                                    </p>
                                    <span className="mt-3 inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-violet/10 text-neon border border-neon/30">
                                        {cert.badge}
                                    </span>
                                </div>

                                {/* Flip face — revealed on hover */}
                                <div className="card__content flex flex-col items-center justify-center">
                                    <p className="card__title">{cert.title}</p>
                                    <p className="card__description">{cert.description}</p>
                                    {cert.image && (
                                        <button
                                            onClick={() => setSelectedImage(cert.image)}
                                            className="mt-6 px-6 py-2 bg-transparent text-neon border border-neon/50 rounded-md text-sm font-semibold hover:bg-neon hover:text-black transition-colors shadow-[0_0_10px_rgba(204,153,255,0.1)] hover:shadow-[0_0_15px_rgba(204,153,255,0.4)] w-full sm:w-auto"
                                        >
                                            View Certificate
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative max-w-4xl w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 sm:-right-6 text-white/50 hover:text-white text-4xl w-10 h-10 flex items-center justify-center transition-colors"
                                aria-label="Close modal"
                            >
                                &times;
                            </button>
                            <img
                                src={selectedImage}
                                alt="Certificate Document"
                                className="w-full max-h-[85vh] object-contain rounded-md shadow-2xl border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
