"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [selectedOption, setSelectedOption] = useState("");
    const [customInterest, setCustomInterest] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const resolvedInterest = selectedOption === "Other" ? customInterest : selectedOption;

    const handleNext = () => {
        if (step === 1 && (!form.name || !form.email)) return;
        if (step === 2 && !selectedOption) return;
        if (step === 2 && selectedOption === "Other" && !customInterest.trim()) return;
        setStep(step + 1);
    };

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!form.message) return;
        setStatus("sending");

        console.log("Sending data:", { ...form, interest: resolvedInterest });

        try {
            const SERVICE_ID = "service_portfolio";
            const TEMPLATE_ID = "template_hjx0m0l";
            const PUBLIC_KEY = "nWjwFFZSpDShUUzGM";

            const templateParams = {
                name: form.name,
                email: form.email,
                interest: resolvedInterest,
                message: form.message,
            };

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            ).then(() => {
                console.log("Email sent successfully");
                setStatus("sent");
                setStep(4);
            }).catch((error) => {
                console.error("Email failed:", error);
                throw error;
            });

            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Email sending process encountered an exception:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const resetForm = () => {
        setForm({ name: "", email: "", message: "" });
        setSelectedOption("");
        setCustomInterest("");
        setStep(1);
    };

    const isStep2Valid = selectedOption && (selectedOption !== "Other" || customInterest.trim());

    return (
        <section id="contact" className="relative py-28 md:py-36 px-4 sm:px-8 md:px-16">
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
                        Say Hello
                    </p>
                    <h2
                        className="section-heading text-3xl sm:text-4xl md:text-5xl"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Get in Touch
                    </h2>
                </motion.div>

                {/* Multistep Contact Conversational UI */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-card p-6 sm:p-8 md:p-14 min-h-[400px] flex flex-col justify-center relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {/* Step 1 */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-12"
                            >
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.8] md:leading-[1.8] text-text-primary" style={{ fontFamily: "var(--font-family-display)" }}>
                                    <span className="whitespace-nowrap">Hi, my name is</span>{" "}
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="inline-block bg-transparent border-0 border-b-2 border-neon/50 text-neon focus:outline-none focus:border-neon px-2 mx-1 min-w-[120px] w-full sm:w-[50%] md:w-[250px] placeholder-neon/30 align-baseline transition-colors"
                                        placeholder="Your Name"
                                        style={{ fontSize: "inherit" }}
                                    />
                                    {" "}and my email is{" "}
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="inline-block bg-transparent border-0 border-b-2 border-neon/50 text-neon focus:outline-none focus:border-neon px-2 mx-1 min-w-[200px] w-full sm:w-[80%] md:w-[350px] placeholder-neon/30 align-baseline transition-colors"
                                        placeholder="Your Email"
                                        style={{ fontSize: "inherit" }}
                                        onKeyDown={(e) => e.key === 'Enter' && form.name && form.email && handleNext()}
                                    />
                                    .
                                </h3>
                                <div className="flex justify-end mt-8">
                                    <button
                                        onClick={handleNext}
                                        disabled={!form.name || !form.email}
                                        className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                    >
                                        NEXT &rarr;
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <h3 className="text-2xl sm:text-3xl md:text-5xl text-text-primary" style={{ fontFamily: "var(--font-family-display)" }}>
                                    I&apos;m interested in...
                                </h3>

                                {/* Options */}
                                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                                    {["Website Development", "Graphic Design", "Social Media / Content", "Other"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSelectedOption(option);
                                                if (option !== "Other") setCustomInterest("");
                                            }}
                                            className={`px-6 py-4 rounded-full border-2 text-sm md:text-lg transition-all duration-300 font-medium tracking-wide ${
                                                selectedOption === option
                                                    ? 'border-neon bg-neon/10 text-neon shadow-[0_0_15px_rgba(204,153,255,0.4)]'
                                                    : 'border-white/10 text-text-secondary hover:border-neon/50 hover:text-white'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom input shown only when "Other" is selected */}
                                <AnimatePresence>
                                    {selectedOption === "Other" && (
                                        <motion.div
                                            key="custom-input"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <input
                                                type="text"
                                                value={customInterest}
                                                onChange={(e) => setCustomInterest(e.target.value)}
                                                placeholder="Type your requirement…"
                                                className="w-full bg-transparent border-0 border-b-2 border-neon/50 text-neon focus:outline-none focus:border-neon px-2 py-2 placeholder-neon/30 transition-colors text-lg md:text-xl"
                                                onKeyDown={(e) => e.key === 'Enter' && customInterest.trim() && handleNext()}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={() => setStep(1)} className="text-text-muted hover:text-white transition-colors text-lg tracking-wide">
                                        &larr; Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={!isStep2Valid}
                                        className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                    >
                                        NEXT &rarr;
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8 flex flex-col h-full"
                            >
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.8] md:leading-[1.8] text-text-primary flex flex-wrap items-end" style={{ fontFamily: "var(--font-family-display)" }}>
                                    <span className="whitespace-nowrap mr-3">Hey Krishna,</span>
                                    <textarea
                                        rows={1}
                                        value={form.message}
                                        onChange={(e) => {
                                            setForm({ ...form, message: e.target.value });
                                            e.currentTarget.style.height = 'auto';
                                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                        }}
                                        className="flex-grow bg-transparent border-0 border-b-2 border-neon/50 text-neon focus:outline-none focus:border-neon px-2 placeholder-neon/30 transition-colors resize-none overflow-hidden"
                                        placeholder="I'd love to chat about..."
                                        style={{ fontSize: "inherit", minWidth: "250px", lineHeight: "1.4" }}
                                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && form.message && handleSend(e as any)}
                                    />
                                </h3>
                                <div className="flex justify-between items-center mt-12">
                                    <button onClick={() => setStep(2)} className="text-text-muted hover:text-white transition-colors text-lg tracking-wide">
                                        &larr; Back
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        disabled={!form.message || status === "sending"}
                                        className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                        style={{ backgroundColor: "var(--color-neon)", color: "#000" }}
                                    >
                                        {status === "sending" ? "SENDING..." : "SEND →"}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Success Screen */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center justify-center text-center space-y-8 py-10"
                            >
                                <h3 className="text-3xl sm:text-4xl md:text-6xl text-neon font-bold mb-2 drop-shadow-[0_0_15px_rgba(204,153,255,0.6)]" style={{ fontFamily: "var(--font-family-display)" }}>
                                    Done!
                                </h3>
                                <p className="text-lg sm:text-xl md:text-3xl text-text-primary font-medium tracking-wide">
                                    Will come back 2 U shortly :)
                                </p>
                                <button onClick={resetForm} className="btn-glow mt-8 w-full sm:w-auto">
                                    CLOSE
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Direct email link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <p className="text-text-muted text-sm">
                        Or email me directly at{" "}
                        <a
                            href="mailto:krishnacbusiness31@gmail.com"
                            className="text-neon hover:text-neon-light transition-colors underline underline-offset-4"
                        >
                            krishnacbusiness31@gmail.com
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
