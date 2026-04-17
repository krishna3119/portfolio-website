"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiHtml5,
    SiCss,
    SiJavascript,
    SiAngular,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiPython,
    SiCanva,
} from "react-icons/si";
import { FaJava, FaBrain } from "react-icons/fa";

const skills = [
    { label: "HTML",               icon: SiHtml5,      color: "#e34f26" },
    { label: "CSS",                icon: SiCss,        color: "#1572b6" },
    { label: "JS",                 icon: SiJavascript, color: "#f7df1e" },
    { label: "Angular v21",        icon: SiAngular,    color: "#dd0031" },
    { label: "Node.js",            icon: SiNodedotjs,  color: "#339933" },
    { label: "Express",            icon: SiExpress,    color: "#aaaaaa" },
    { label: "MongoDB",            icon: SiMongodb,    color: "#47a248" },
    { label: "Python",             icon: SiPython,     color: "#3776ab" },
    { label: "Java",               icon: FaJava,       color: "#ed8b00" },
    { label: "Canva",              icon: SiCanva,      color: "#00c4cc" },
    { label: "Prompt Engineering", icon: FaBrain,      color: "#a855f7" },
];

// ─── Mobile Skill Grid ────────────────────────────────────────────────────────
function MobileSkillGrid() {
    const [tapped, setTapped] = useState<string | null>(null);

    const handleTap = (label: string) => {
        setTapped(label);
        setTimeout(() => setTapped(null), 600);
    };

    return (
        <div className="w-full py-4">
            <p className="text-center text-sm text-purple-300/70 mb-6 tracking-wide">
                Tap on blocks to interact ✨
            </p>
            <div className="grid grid-cols-3 gap-4 px-2">
                {skills.map((skill) => {
                    const Icon = skill.icon;
                    const isActive = tapped === skill.label;
                    return (
                        <motion.button
                            key={skill.label}
                            whileTap={{ scale: 1.15 }}
                            animate={
                                isActive
                                    ? {
                                          scale: [1, 1.15, 0.95, 1.05, 1],
                                          transition: { duration: 0.45, ease: "easeInOut" },
                                      }
                                    : { scale: 1 }
                            }
                            onClick={() => handleTap(skill.label)}
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-colors duration-300"
                            style={{
                                background: isActive
                                    ? `${skill.color}18`
                                    : "rgba(10, 5, 30, 0.7)",
                                borderColor: isActive
                                    ? skill.color
                                    : "rgba(255,255,255,0.08)",
                                boxShadow: isActive
                                    ? `0 0 18px ${skill.color}55`
                                    : "none",
                            }}
                        >
                            <Icon
                                style={{
                                    color: skill.color,
                                    fontSize: "1.8rem",
                                    filter: isActive
                                        ? `drop-shadow(0 0 8px ${skill.color}cc)`
                                        : "none",
                                    transition: "filter 0.2s",
                                }}
                            />
                            <span
                                className="text-[10px] font-semibold text-center leading-tight"
                                style={{
                                    color: isActive ? skill.color : "#e2d9f3",
                                    transition: "color 0.2s",
                                }}
                            >
                                {skill.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Desktop Game Component ───────────────────────────────────────────────────
const GameComponent = () => {
    const [isGameOver, setIsGameOver] = useState(false);

    const characterRef = useRef({ x: 60, y: 0, velocityY: 0, isJumping: false });
    const obstacleRef  = useRef({ x: 900, speed: 4, index: 0 });
    const bgRef        = useRef({ x: 0 });
    const matchRef     = useRef({ score: 0, speed: 4 });

    const [uiState, setUiState] = useState({
        charX: 60, charY: 0, obsX: 900, obsIndex: 0,
        bgX: 0, isJumping: false, score: 0,
    });

    const gravity   = 0.6;
    const jumpPower = -12;
    const baseSpeed = 4;

    const audioRef = useRef<{ jump: HTMLAudioElement; hit: HTMLAudioElement; point: HTMLAudioElement } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const jump  = new Audio("/sounds/jump.mp3");
            const hit   = new Audio("/sounds/hit.mp3");
            const point = new Audio("/sounds/point.mp3");
            jump.preload = hit.preload = point.preload = "auto";
            audioRef.current = { jump, hit, point };
        }
    }, []);

    const playSound = (type: "jump" | "hit" | "point") => {
        if (audioRef.current?.[type]) {
            audioRef.current[type].currentTime = 0;
            const p = audioRef.current[type].play();
            p?.catch(() => {});
        }
    };

    // Game Loop
    useEffect(() => {
        if (isGameOver) return;
        let reqId: number;

        const update = () => {
            const currentSpeed = baseSpeed + matchRef.current.score * 0.02;
            matchRef.current.speed = currentSpeed;

            if (characterRef.current.isJumping || characterRef.current.y > 0) {
                characterRef.current.velocityY += gravity;
                characterRef.current.y -= characterRef.current.velocityY;
                characterRef.current.x = 60 + characterRef.current.y * 0.15;

                if (characterRef.current.y <= 0) {
                    characterRef.current.y = 0;
                    characterRef.current.x = 60;
                    characterRef.current.velocityY = 0;
                    characterRef.current.isJumping = false;
                }
            } else {
                characterRef.current.x = 60;
            }

            obstacleRef.current.x -= matchRef.current.speed;
            bgRef.current.x       -= matchRef.current.speed;

            if (obstacleRef.current.x < -100) {
                const el = document.getElementById("game-container");
                const w  = el ? el.clientWidth : 900;
                obstacleRef.current.x     = w + 50 + Math.random() * 150;
                obstacleRef.current.index = Math.floor(Math.random() * skills.length);
                matchRef.current.score   += 10;
                if (matchRef.current.score > 0 && matchRef.current.score % 50 === 0) playSound("point");
            }

            const cX = characterRef.current.x, cW = 50, cY = characterRef.current.y;
            const oX = obstacleRef.current.x,  oW = 60, oH = 60;
            const shrink = 12;
            const xHit = (cX + shrink) < (oX + oW - shrink) && (cX + cW - shrink) > (oX + shrink);
            const yHit = cY < oH - shrink;

            if (xHit && yHit) {
                playSound("hit");
                setIsGameOver(true);
            } else {
                setUiState({
                    charX: characterRef.current.x,
                    charY: characterRef.current.y,
                    obsX:  obstacleRef.current.x,
                    obsIndex: obstacleRef.current.index,
                    bgX:  bgRef.current.x,
                    isJumping: characterRef.current.isJumping,
                    score: matchRef.current.score,
                });
                reqId = requestAnimationFrame(update);
            }
        };

        reqId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(reqId);
    }, [isGameOver]);

    // Keyboard input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.code === "Space" || e.code === "ArrowUp") && !characterRef.current.isJumping && !isGameOver) {
                e.preventDefault();
                characterRef.current.isJumping = true;
                characterRef.current.velocityY = jumpPower;
                playSound("jump");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isGameOver]);

    // Tap-to-jump for touch devices (within game on desktop-size tablets)
    const handleTap = () => {
        if (!characterRef.current.isJumping && !isGameOver) {
            characterRef.current.isJumping = true;
            characterRef.current.velocityY = jumpPower;
            playSound("jump");
        }
    };

    const resetGame = () => {
        const el = document.getElementById("game-container");
        const w  = el ? el.clientWidth : 900;
        characterRef.current = { x: 60, y: 0, velocityY: 0, isJumping: false };
        obstacleRef.current  = { x: w + 100, speed: baseSpeed, index: 0 };
        matchRef.current     = { score: 0, speed: baseSpeed };
        bgRef.current.x      = 0;
        setIsGameOver(false);
        setUiState({ charX: 60, charY: 0, obsX: w + 100, obsIndex: 0, bgX: 0, isJumping: false, score: 0 });
    };

    const skill    = skills[uiState.obsIndex] || skills[0];
    const Icon     = skill.icon;
    const floorH   = 80;

    return (
        <div
            id="game-container"
            className="w-full h-full relative overflow-hidden outline-none select-none"
            tabIndex={0}
            autoFocus
            onClick={handleTap}
        >
            <style>{`
                @keyframes runBounce {
                    0%, 100% { transform: scaleX(-1) translateY(0) rotate(0deg); }
                    50%       { transform: scaleX(-1) translateY(-6px) rotate(-3deg); }
                }
                .running-anim { animation: runBounce 0.4s infinite linear; }
            `}</style>

            {/* Score */}
            <div className="absolute top-4 left-4 z-20 text-xl sm:text-3xl font-bold"
                style={{ color: "var(--color-neon)", fontFamily: "var(--font-family-mono)" }}>
                Score: {uiState.score}
            </div>

            {/* Instructions */}
            {!isGameOver && uiState.score < 30 && (
                <div className="absolute top-14 left-4 z-20 text-white/50 text-xs sm:text-sm">
                    Press SPACE / UP ARROW or click to jump!
                </div>
            )}

            {/* Parallax bg */}
            <div
                className="absolute inset-0 grid-bg pointer-events-none opacity-20 z-0"
                style={{ backgroundPositionX: `${uiState.bgX * 0.3}px` }}
            />

            {/* Ground */}
            <div
                className="absolute w-full z-0 border-t"
                style={{
                    height: `${floorH}px`, bottom: 0,
                    borderColor: "rgba(204, 153, 255, 0.4)",
                    background: "rgba(10, 5, 30, 0.95)",
                    backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 60px, rgba(204,153,255,0.15) 60px, rgba(204,153,255,0.15) 64px)",
                    backgroundPositionX: `${uiState.bgX}px`,
                }}
            />

            {/* Character */}
            <div
                className="absolute z-10"
                style={{ left: `${uiState.charX}px`, bottom: `${uiState.charY + floorH}px`, width: 50, height: 50 }}
            >
                <div
                    className={`flex items-center justify-center text-5xl origin-bottom w-full h-full ${(!uiState.isJumping && !isGameOver) ? "running-anim" : ""}`}
                    style={{
                        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                        transform: `scaleX(-1) rotate(${uiState.isJumping ? -12 : 0}deg)`,
                        transition: uiState.isJumping ? "transform 0.1s ease-out" : "none",
                    }}
                >
                    🏃‍♂️
                </div>
            </div>

            {/* Obstacle */}
            <div
                className="absolute z-10 rounded-xl flex flex-col items-center justify-center gap-1 border border-white/10"
                style={{
                    left: `${uiState.obsX}px`, bottom: `${floorH}px`, width: 60, height: 60,
                    background: "rgba(10, 5, 30, 0.95)",
                    boxShadow: `0 0 15px ${skill.color}66, 0 4px 10px rgba(0,0,0,0.5)`,
                    borderColor: `${skill.color}55`,
                }}
            >
                <Icon style={{ color: skill.color, fontSize: "1.6rem", filter: `drop-shadow(0 0 5px ${skill.color}cc)` }} />
                <span className="text-[9px] font-bold text-center leading-tight px-1" style={{ color: "#e2d9f3" }}>
                    {skill.label}
                </span>
            </div>

            {/* Game Over */}
            {isGameOver && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center backdrop-blur-sm bg-red-950/40">
                    <h3
                        className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-4 animate-bounce"
                        style={{ fontFamily: "var(--font-family-display)", textShadow: "0 0 20px rgba(255,0,0,0.8)" }}
                    >
                        CRASHED
                    </h3>
                    <p className="text-2xl sm:text-3xl mb-8 font-semibold"
                        style={{ color: "var(--color-neon)", fontFamily: "var(--font-family-mono)" }}>
                        Final Score: {uiState.score}
                    </p>
                    <button
                        onClick={(e) => { e.stopPropagation(); resetGame(); }}
                        className="px-8 py-3 bg-transparent text-white border-2 border-neon font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(204,153,255,0.3)] hover:shadow-[0_0_25px_rgba(204,153,255,0.6)] hover:bg-neon hover:text-black"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SkillsPlayground() {
    const [isPlaying, setIsPlaying]   = useState(false);
    const [isMobile, setIsMobile]     = useState(false);

    // Detect mobile on mount (client-only)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section id="skills" className="relative py-28 md:py-36 px-4 sm:px-8 md:px-16 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <p
                        className="text-neon text-sm tracking-[0.3em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-family-mono)" }}
                    >
                        Skills
                    </p>
                    <h2
                        className="section-heading text-3xl sm:text-4xl md:text-5xl mb-4"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Skills Playground
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-base sm:text-lg md:text-xl text-purple-200/80 max-w-2xl mx-auto"
                    >
                        Not just skills, play with them.
                    </motion.p>
                </motion.div>

                {/* ── MOBILE: Tap-based skill grid ── */}
                {isMobile ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass-card p-4"
                    >
                        <MobileSkillGrid />
                    </motion.div>
                ) : (
                    /* ── DESKTOP: Full game ── */
                    !isPlaying ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-center items-center h-[500px] glass-card"
                        >
                            <div className="text-center">
                                <p className="text-sm sm:text-base md:text-lg text-purple-300/70 max-w-xl mx-auto mb-6">
                                    Play and explore my skills in action.
                                </p>
                                <button onClick={() => setIsPlaying(true)} className="play-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
                                        <rect width="36" height="36" x="0" y="0" fill="#fdd835"></rect>
                                        <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"></path>
                                        <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"></path>
                                        <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"></path>
                                        <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"></path>
                                        <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"></path>
                                        <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"></path>
                                        <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"></path>
                                        <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"></path>
                                    </svg>
                                    <span className="now">now!</span>
                                    <span className="play">play</span>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card overflow-hidden relative"
                            style={{ height: "550px", touchAction: "none" }}
                        >
                            <GameComponent />
                        </motion.div>
                    )
                )}
            </div>
        </section>
    );
}
