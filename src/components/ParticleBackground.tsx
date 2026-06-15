import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "heart" | "star" | "sparkle";
  duration: number;
  delay: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate organic scattered particles
    const items: Particle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      y: Math.random() * 100, // percentage of screen height
      size: Math.random() * (i % 3 === 0 ? 18 : 8) + 6,
      type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "star" : "sparkle",
      duration: Math.random() * 12 + 8,
      delay: Math.random() * -20, // Negative delay to prevent all starting at once
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-radial from-[#131129] via-[#090814] to-[#04030a]">
      {/* Soft warm pink and lavender ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] rounded-full bg-purple-900/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-violet-900/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "4.5s" }} />

      {/* Floating Elements */}
      {particles.map((p) => {
        if (p.type === "heart") {
          return (
            <motion.svg
              key={p.id}
              className="absolute text-pink-400/20 fill-pink-400/10"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -150],
                x: [0, Math.sin(p.id) * 30],
                rotate: [0, p.id % 2 === 0 ? 360 : -360],
                opacity: [0, p.opacity, p.opacity, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          );
        } else if (p.type === "star") {
          return (
            <motion.svg
              key={p.id}
              className="absolute text-yellow-200/40 fill-yellow-200/35"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                scale: [0.7, 1.3, 0.7],
                opacity: [0.1, p.opacity * 2, 0.1],
              }}
              transition={{
                duration: p.duration / 3,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </motion.svg>
          );
        } else {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-indigo-300/30 blur-[1px]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size / 2,
                height: p.size / 2,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, p.opacity, 0],
              }}
              transition={{
                duration: p.duration * 0.8,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
            />
          );
        }
      })}
    </div>
  );
}
