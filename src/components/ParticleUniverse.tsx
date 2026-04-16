"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 3000 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const { viewport } = useThree();

    const [positions, velocities, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * 30;
            pos[i3 + 1] = (Math.random() - 0.5) * 30;
            pos[i3 + 2] = (Math.random() - 0.5) * 20;

            vel[i3] = (Math.random() - 0.5) * 0.005;
            vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
            vel[i3 + 2] = (Math.random() - 0.5) * 0.003;

            // Purple color variations
            const t = Math.random();
            col[i3] = 0.35 + t * 0.3;        // R
            col[i3 + 1] = 0.1 + t * 0.15;    // G
            col[i3 + 2] = 0.7 + t * 0.3;     // B
        }
        return [pos, vel, col];
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        const geometry = mesh.current.geometry;
        const posAttr = geometry.attributes.position;
        const posArray = posAttr.array as Float32Array;

        const mx = (state.pointer.x * viewport.width) / 2;
        const my = (state.pointer.y * viewport.height) / 2;

        mouseRef.current.x += (mx - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (my - mouseRef.current.y) * 0.05;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Drift
            posArray[i3] += velocities[i3];
            posArray[i3 + 1] += velocities[i3 + 1];
            posArray[i3 + 2] += velocities[i3 + 2];

            // Mouse repulsion
            const dx = posArray[i3] - mouseRef.current.x;
            const dy = posArray[i3 + 1] - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 3) {
                const force = (3 - dist) * 0.008;
                posArray[i3] += (dx / dist) * force;
                posArray[i3 + 1] += (dy / dist) * force;
            }

            // Wrap around
            if (posArray[i3] > 15) posArray[i3] = -15;
            if (posArray[i3] < -15) posArray[i3] = 15;
            if (posArray[i3 + 1] > 15) posArray[i3 + 1] = -15;
            if (posArray[i3 + 1] < -15) posArray[i3 + 1] = 15;
            if (posArray[i3 + 2] > 10) posArray[i3 + 2] = -10;
            if (posArray[i3 + 2] < -10) posArray[i3 + 2] = 10;
        }

        posAttr.needsUpdate = true;
        mesh.current.rotation.y += 0.0003;
        mesh.current.rotation.x += 0.0001;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticleUniverse() {
    return (
        <div className="hero-canvas">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
            >
                <Particles count={4000} />
            </Canvas>
        </div>
    );
}
