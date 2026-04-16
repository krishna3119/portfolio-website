"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

const GameComponent = () => {
    const [isGameOver, setIsGameOver] = useState(false);
    
    // Physics & State References inside animation frame
    const characterRef = useRef({ x: 60, y: 0, velocityY: 0, isJumping: false });
    const obstacleRef = useRef({ x: 900, speed: 4, index: 0 });
    const bgRef = useRef({ x: 0 });
    const matchRef = useRef({ score: 0, speed: 4 });

    // UI state to sync with React render
    const [uiState, setUiState] = useState({
        charX: 60,
        charY: 0,
        obsX: 900,
        obsIndex: 0,
        bgX: 0,
        isJumping: false,
        score: 0
    });

    const gravity = 0.6;
    const jumpPower = -12;
    const baseSpeed = 4;

    const audioRef = useRef<{ jump: HTMLAudioElement; hit: HTMLAudioElement; point: HTMLAudioElement } | null>(null);

    // Load Audio
    useEffect(() => {
        if (typeof window !== "undefined") {
            const jump = new Audio("/sounds/jump.mp3");
            const hit = new Audio("/sounds/hit.mp3");
            const point = new Audio("/sounds/point.mp3");
            jump.preload = "auto";
            hit.preload = "auto";
            point.preload = "auto";
            audioRef.current = { jump, hit, point };
        }
    }, []);

    const playSound = (type: "jump" | "hit" | "point") => {
        if (audioRef.current && audioRef.current[type]) {
            audioRef.current[type].currentTime = 0;
            const promise = audioRef.current[type].play();
            if (promise !== undefined) {
                promise.catch(() => { /* Auto-play/Not-found safe catch */ });
            }
        }
    };

    // Primary Game Loop
    useEffect(() => {
        if (isGameOver) return;
        
        let reqId: number;

        const update = () => {
            // Gradually increase speed as score grows
            const currentSpeed = baseSpeed + (matchRef.current.score * 0.02);
            matchRef.current.speed = currentSpeed;

            // Character physics
            if (characterRef.current.isJumping || characterRef.current.y > 0) {
                characterRef.current.velocityY += gravity;
                characterRef.current.y -= characterRef.current.velocityY;
                
                // Add a smooth forward drift mapping jumping arc to X axis
                characterRef.current.x = 60 + (characterRef.current.y * 0.15);

                // Hit ground
                if (characterRef.current.y <= 0) {
                    characterRef.current.y = 0;
                    characterRef.current.x = 60;
                    characterRef.current.velocityY = 0;
                    characterRef.current.isJumping = false;
                }
            } else {
                characterRef.current.x = 60;
            }

            // Move Environment
            obstacleRef.current.x -= matchRef.current.speed;
            bgRef.current.x -= matchRef.current.speed; 

            // Obstacle Recycle
            if (obstacleRef.current.x < -100) {
                const containerEl = document.getElementById("game-container");
                const w = containerEl ? containerEl.clientWidth : 900;
                obstacleRef.current.x = w + 50 + Math.random() * 150;
                obstacleRef.current.index = Math.floor(Math.random() * skills.length);
                
                matchRef.current.score += 10;

                // Milestone sounds
                if (matchRef.current.score > 0 && matchRef.current.score % 50 === 0) {
                    playSound("point");
                }
            }

            // Collision Constraints (Hitbox slightly smaller than visual size)
            const cX = characterRef.current.x, cW = 50, cY = characterRef.current.y, cH = 50;
            const oX = obstacleRef.current.x, oW = 60, oH = 60; 

            const hitboxShrink = 12; // Gives the player a slight fairness margin
            const xCollide = (cX + hitboxShrink) < (oX + oW - hitboxShrink) && (cX + cW - hitboxShrink) > (oX + hitboxShrink);
            const yCollide = cY < oH - hitboxShrink;

            if (xCollide && yCollide) {
                playSound("hit");
                setIsGameOver(true);
            } else {
                setUiState({
                    charX: characterRef.current.x,
                    charY: characterRef.current.y,
                    obsX: obstacleRef.current.x,
                    obsIndex: obstacleRef.current.index,
                    bgX: bgRef.current.x,
                    isJumping: characterRef.current.isJumping,
                    score: matchRef.current.score
                });
                reqId = requestAnimationFrame(update);
            }
        };

        reqId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(reqId);
    }, [isGameOver]);

    // Input Listening
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

    const resetGame = () => {
        const containerEl = document.getElementById("game-container");
        const w = containerEl ? containerEl.clientWidth : 900;
        characterRef.current = { x: 60, y: 0, velocityY: 0, isJumping: false };
        obstacleRef.current = { x: w + 100, speed: baseSpeed, index: 0 };
        matchRef.current = { score: 0, speed: baseSpeed };
        bgRef.current.x = 0;
        setIsGameOver(false);
        setUiState({ charX: 60, charY: 0, obsX: w + 100, obsIndex: 0, bgX: 0, isJumping: false, score: 0 });
    };

    const skill = skills[uiState.obsIndex] || skills[0];
    const Icon = skill.icon;
    const floorHeight = 80;

    return (
        <div id="game-container" className="w-full h-full relative overflow-hidden outline-none" tabIndex={0} autoFocus>
            <style>{`
                @keyframes runBounce {
                    0%, 100% { transform: scaleX(-1) translateY(0) rotate(0deg); }
                    50% { transform: scaleX(-1) translateY(-6px) rotate(-3deg); }
                }
                .running-anim {
                    animation: runBounce 0.4s infinite linear;
                }
            `}</style>
            
            {/* Score */}
            <div className="absolute top-6 left-6 z-20 text-3xl font-bold" style={{ color: "var(--color-neon)", fontFamily: "var(--font-family-mono)" }}>
                Score: {uiState.score}
            </div>
            
            {/* Instructions */}
            {!isGameOver && uiState.score < 30 && (
                <div className="absolute top-16 left-6 z-20 text-white/50 text-sm">
                    Press SPACE or UP ARROW to jump!
                </div>
            )}

            {/* Moving Grid Background (Parallax Sky Effect) */}
            <div 
                className="absolute inset-0 grid-bg pointer-events-none opacity-20 z-0" 
                style={{ 
                    backgroundPositionX: `${uiState.bgX * 0.3}px` 
                }}
            />

            {/* Moving Ground Texture */}
            <div 
                className="absolute w-full z-0 border-t"
                style={{ 
                    height: `${floorHeight}px`, 
                    bottom: 0, 
                    borderColor: "rgba(204, 153, 255, 0.4)", 
                    background: "rgba(10, 5, 30, 0.95)",
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 60px, rgba(204,153,255,0.15) 60px, rgba(204,153,255,0.15) 64px)',
                    backgroundPositionX: `${uiState.bgX}px`
                }}
            ></div>

            {/* Character Positioning Wrapper */}
            <div 
                className="absolute z-10"
                style={{
                    left: `${uiState.charX}px`,
                    bottom: `${uiState.charY + floorHeight}px`,
                    width: '50px',
                    height: '50px',
                }}
            >
                {/* Character Rendering & Animation */}
                <div 
                    className={`flex items-center justify-center text-5xl origin-bottom w-full h-full ${(!uiState.isJumping && !isGameOver) ? 'running-anim' : ''}`}
                    style={{
                        filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                        transform: `scaleX(-1) rotate(${uiState.isJumping ? -12 : 0}deg)`,
                        transition: uiState.isJumping ? 'transform 0.1s ease-out' : 'none'
                    }}
                >
                   🏃‍♂️ 
                </div>
            </div>

            {/* Obstacle */}
            <div 
                className="absolute z-10 rounded-xl flex flex-col items-center justify-center gap-1 border border-white/10"
                style={{
                    left: `${uiState.obsX}px`,
                    bottom: `${floorHeight}px`,
                    width: '60px',
                    height: '60px',
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

            {/* Game Over Overlay */}
            {isGameOver && (
                <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300 ${isGameOver ? 'bg-red-950/40' : 'bg-transparent'}`}>
                    <h3 className="text-6xl text-white font-bold mb-4 animate-bounce" style={{ fontFamily: "var(--font-family-display)", textShadow: "0 0 20px rgba(255,0,0,0.8)" }}>CRASHED</h3>
                    <p className="text-3xl mb-8 font-semibold" style={{ color: "var(--color-neon)", fontFamily: "var(--font-family-mono)" }}>Final Score: {uiState.score}</p>
                    <button 
                        onClick={resetGame}
                        className="px-8 py-3 bg-transparent text-white border-2 border-neon font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(204,153,255,0.3)] hover:shadow-[0_0_25px_rgba(204,153,255,0.6)] hover:bg-neon hover:text-black"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default function SkillsPlayground() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="skills" className="relative py-28 md:py-36 px-6 overflow-hidden">
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
                        className="section-heading text-4xl md:text-5xl mb-4"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Skills Playground
                    </h2>
                    <p className="text-text-secondary max-w-3xl mx-auto text-base md:text-lg">
                        Explore my tech stack in an interactive gravity canvas.&nbsp;
                        Drag, toss, and watch the skill blocks collide!
                    </p>
                </motion.div>

                {!isPlaying ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-center items-center h-[500px] glass-card"
                    >
                        <div className="text-center">
                            <p className="text-text-secondary mb-6 max-w-md mx-auto text-lg">
                                Drag, toss, and watch them bounce!&nbsp;
                                Discover my tech stack interactively.
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
                )}
            </div>
        </section>
    );
}
