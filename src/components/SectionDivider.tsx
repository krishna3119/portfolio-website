"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="gradient-line max-w-xl mx-auto"
        />
    );
}
