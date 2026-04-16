"use client";

import { motion, Variants } from "framer-motion";

const developmentProjects = [
    {
        title: "ClassHub",
        subtitle: "MEAN Stack Classroom Platform",
        description: "Classroom management platform built using MEAN stack with authentication and role-based access.",
        icon: "📚",
        links: [
            { label: "Live →", url: "https://mean-class-hub.vercel.app/login" },
            { label: "GitHub →", url: "https://github.com/Krishnacs3119/Mean-ClassHub" },
        ],
        featured: true
    },
    {
        title: "Calories Calculator",
        subtitle: "Java & MySQL Application",
        description: "Java and MySQL based application to track daily calorie intake and store user data.",
        icon: "🔥",
        links: [
            { label: "🎥 Watch Demo →", url: "https://drive.google.com/file/d/1KjyVW3fxEKITnVmqSptiGLkt9axRN2Ul/view?usp=sharing" },
        ],
        featured: false
    }
];

const academicProjects = [
    {
        title: "IoT Project",
        subtitle: "Team Lead • Smart System",
        description: "Led a team to build an IoT-based system, handling implementation, coordination, and execution.",
        icon: "📡",
        links: [
            { label: "📄 View Document", url: "https://drive.google.com/file/d/1I1OJA_XrsXimKYUg3WNLCNle6IEoSI2c/view?usp=sharing" },
            { label: "🎥 Watch Demo", url: "https://drive.google.com/file/d/1JQeHoqvxVy50hn2QAZmWwlgnivvSP--m/view?usp=sharing" }
        ]
    },
    {
        title: "CEP Project",
        subtitle: "Team Lead • Research & Execution",
        description: "Led the research, documentation, and execution of the project while coordinating with the team.",
        icon: "📘",
        links: [
            { label: "📄 View Document", url: "https://drive.google.com/file/d/1oWUhMUDDC6aYFPTNtWWBXgRASKxNKe2W/view?usp=sharing" }
        ]
    },
    {
        title: "Research Papers",
        subtitle: "Academic Work • Documentation",
        description: "Created and documented research papers as part of academic work, focusing on analysis and structured documentation.",
        icon: "📄",
        links: [
            { label: "📄 Paper 1", url: "https://drive.google.com/file/d/1HIS6CO4htIoN5d4l8DMpHiWHdWHjrGpj/view?usp=sharing" },
            { label: "📄 Paper 2", url: "https://drive.google.com/file/d/1Xn4M0betZfR8LagXLIPZzXDaGIY653DX/view?usp=sharing" }
        ]
    }
];

const designProjects = [
    { title: "Earbuds", subtitle: "Product Commercial", image: "/images/designs/Earbuds .png" },
    { title: "Porsche 911", subtitle: "Automotive Poster", image: "/images/designs/Porsche 911 Desgin (1).png" },
    { title: "Property Times of India", subtitle: "Real Estate Post", image: "/images/designs/Propert times of india post design (1).png" },
    { title: "Property Times — News", subtitle: "Social Media Post", image: "/images/designs/Property times of india news.png" },
    { title: "Property Times — Post 2", subtitle: "Social Media Post", image: "/images/designs/Property times of india news post (2).jpg" },
    { title: "Property Times — Post 3", subtitle: "Social Media Post", image: "/images/designs/Property times of india news post (3).jpg" },
    { title: "Aqua Customs", subtitle: "Brand Design", image: "/images/designs/Aqua Customs.png" },
    { title: "Apartment 1", subtitle: "Real Estate Design", image: "/images/designs/Apartment 1.png" },
    { title: "Apartment 2", subtitle: "Real Estate Design", image: "/images/designs/Apartment 2.png" },
    { title: "Apartment 3", subtitle: "Real Estate Design", image: "/images/designs/Apartment 3.png" },
    { title: "Apartment 4", subtitle: "Real Estate Design", image: "/images/designs/Apartment 4.png" },
    { title: "Design 12", subtitle: "Graphic Design", image: "/images/designs/12.png" },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: i * 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};

function ProjectCard({ project, index, isDevelopment }: { project: any, index: number, isDevelopment: boolean }) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
            className="flex flex-col h-full w-full"
        >
            <div 
                className={`card w-full h-full ${isDevelopment ? "min-h-[250px]" : "min-h-[220px]"}`}
                style={project.featured ? { boxShadow: "0 0 25px rgba(168, 85, 247, 0.25)", borderColor: "rgba(168, 85, 247, 0.5)" } : {}}
            >
                <div className="card__front">
                    <span className="text-4xl mb-2 block">{project.icon}</span>
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-family-display)" }}>
                        {project.title}
                    </h3>
                    <p className={`text-sm font-medium ${isDevelopment ? "text-neon-light" : "text-purple-300"}`}>
                        {project.subtitle}
                    </p>
                </div>
                <div className="card__content">
                    <p className="card__title">{project.title}</p>
                    <p className="card__description">
                        {project.description}
                    </p>
                    {project.links && project.links.length > 0 && (
                        <div className="card__buttons">
                            {project.links.map((link: any, idx: number) => (
                                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    return (
        <section id="projects" className="relative py-28 md:py-36 px-6">
            <div className="max-w-6xl mx-auto">
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
                        Portfolio
                    </p>
                    <h2
                        className="section-heading text-4xl md:text-5xl"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Featured Projects
                    </h2>
                </motion.div>

                {/* Development Projects Section */}
                <div className="mb-24">
                    <h3
                        className="text-2xl md:text-3xl text-center md:text-left mb-10 font-bold text-white tracking-wide"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Development Projects
                    </h3>
                    <div className="grid md:grid-cols-2 gap-10">
                        {developmentProjects.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} isDevelopment={true} />
                        ))}
                    </div>
                </div>

                {/* Academic Projects Section */}
                <div>
                    <h3
                        className="text-2xl md:text-3xl text-center md:text-left mb-10 font-bold tracking-wide"
                        style={{ fontFamily: "var(--font-family-display)", color: "rgba(255, 255, 255, 0.85)" }}
                    >
                        Academic Projects
                    </h3>
                    {/* Uses 3 column grid for slight visual de-emphasis compared to 2 column development ones */}
                    {/* Uses 3 column grid for slight visual de-emphasis compared to 2 column development ones */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {academicProjects.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} isDevelopment={false} />
                        ))}
                    </div>
                </div>

                {/* Graphic Designs Section */}
                <div className="mt-28">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p
                            className="text-neon text-sm tracking-[0.3em] uppercase mb-3"
                            style={{ fontFamily: "var(--font-family-mono)" }}
                        >
                            Creative Work
                        </p>
                        <h2
                            className="section-heading text-4xl md:text-5xl"
                            style={{ fontFamily: "var(--font-family-display)" }}
                        >
                            Designs
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {designProjects.map((design, i) => (
                            <motion.div
                                key={design.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="noselect design-container"
                            >
                                <div className="design-canvas">
                                    {[...Array(25)].map((_, idx) => (
                                        <div key={idx} className={`tracker tr-${idx + 1}`} />
                                    ))}
                                    <div id="design-card">
                                        <img
                                            src={design.image}
                                            alt={design.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
                                        />
                                        <div className="design-card-title">
                                            <span>{design.title}</span>
                                            <span className="design-card-subtitle">{design.subtitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
