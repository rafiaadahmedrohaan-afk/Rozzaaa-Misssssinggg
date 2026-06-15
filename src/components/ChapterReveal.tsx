import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playDreamTone } from "./AudioPlayer.tsx";
import { Heart, Sparkles, Send, Star, Compass } from "lucide-react";

interface ConfidentialLetterProps {
  onRestart: () => void;
}

export default function ChapterReveal({ onRestart }: ConfidentialLetterProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [showOneLastThing, setShowOneLastThing] = useState(false);
  const [oneLastThingClicked, setOneLastThingClicked] = useState(false);
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; left: number; speedY: number; color: string; size: number; delay: number }[]>([]);

  const letterLines = [
    "Dear Rozaa,",
    "",
    "I know you're busy making memories with your family.",
    "And I want you to enjoy every second of it.",
    "But I wanted to leave a little piece of my heart here for you.",
    "",
    "Because no matter how beautiful the destination is...",
    "My favorite place has always been wherever you are.",
    "",
    "Distance doesn't make me love you less.",
    "It reminds me how much you truly mean to me.",
    "",
    "So until you come back...",
    "I'll keep missing you.",
    "I'll keep waiting for your messages.",
    "And I'll keep loving you exactly the same.",
    "",
    "Forever Yours,",
    "Rohaan ❤️"
  ];

  // Progressive sentence builder
  useEffect(() => {
    if (textIndex < letterLines.length) {
      const timer = setTimeout(() => {
        setTextIndex((prev) => prev + 1);
        // Play very quiet keyboard chime
        if (letterLines[textIndex]?.trim()) {
          playDreamTone();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Completed, reveal the special button
      setShowOneLastThing(true);
    }
  }, [textIndex]);

  // Generate confetti/star coordinates
  const triggerMagicalEnding = () => {
    playDreamTone();
    setTimeout(() => playDreamTone(), 150);
    setTimeout(() => playDreamTone(), 300);
    setOneLastThingClicked(true);

    // Spawn 80 confetti and star items
    const confs = Array.from({ length: 80 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      size: Math.random() * 10 + 6,
      speedY: Math.random() * 15 + 10,
      delay: Math.random() * 3,
      color: ["#f43f5e", "#ec4899", "#d946ef", "#8b5cf6", "#f59e0b", "#10b981", "#3b82f6"][idx % 7]
    }));
    setParticles(confs);
  };

  useEffect(() => {
    const starField = Array.from({ length: 40 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1
    }));
    setStars(starField);
  }, []);

  return (
    <div id="chapter-reveal" className="relative min-h-[90vh] w-full max-w-4xl mx-auto py-12 px-4 flex flex-col justify-center">
      
      {/* Sparkly Starry Night Canvas Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDuration: `${Math.random() * 3 + 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Letter Scrollboard container */}
      <div className="relative glass-panel rounded-3xl border border-pink-500/20 p-8 md:p-12 shadow-2xl overflow-hidden relative max-w-2xl mx-auto z-10">
        {/* Paper visual border */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0" />

        <div className="space-y-2 md:space-y-3 select-none">
          {letterLines.slice(0, textIndex).map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`font-serif text-sm md:text-base leading-relaxed ${
                line.includes("Rohaan") ? "text-pink-400 font-script text-2xl font-bold mt-4" : "text-gray-100"
              } ${line === "" ? "h-3" : ""}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Manual typewriter progress skipper (so she can read quickly if she wants) */}
        {textIndex < letterLines.length && (
          <button
            onClick={() => {
              playDreamTone();
              setTextIndex(letterLines.length);
            }}
            className="mt-6 text-[10px] font-mono text-pink-300/40 hover:text-pink-300/70 uppercase tracking-widest cursor-pointer block text-center"
          >
            Skip Typewriter ▸▸
          </button>
        )}

        {/* "One Last Thing" heart activator */}
        <AnimatePresence>
          {showOneLastThing && !oneLastThingClicked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 text-center"
            >
              <motion.button
                id="one-last-thing-btn"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerMagicalEnding}
                className="px-6 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-mono font-bold tracking-widest text-sm shadow-xl shadow-pink-500/30 cursor-pointer relative group overflow-hidden border border-rose-300/30"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  ONE LAST THING... <Heart size={16} fill="currentColor" className="animate-pulse" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grand Magical Ending reveals */}
        <AnimatePresence>
          {oneLastThingClicked && (
            <motion.div
              className="mt-10 pt-8 border-t border-white/5 text-center space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="relative inline-block">
                {/* Big pulse ring */}
                <span className="absolute inset-0 bg-pink-500/25 rounded-full animate-ping pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-400 flex items-center justify-center text-pink-400 mx-auto animate-float">
                  <Heart size={28} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 font-bold"
                >
                  "I Miss You, Rozaa ❤️"
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg md:text-xl font-serif text-pink-200/90 font-light italic"
                >
                  "And I can't wait to see you again."
                </motion.p>
              </div>

              {/* Reset memory button to let her revisit everything */}
              <div className="pt-6">
                <button
                  onClick={onRestart}
                  className="text-xs uppercase font-mono tracking-[0.2em] text-pink-400/50 hover:text-pink-300 cursor-pointer border border-pink-500/10 hover:border-pink-500/20 px-4 py-2 rounded-full transition-all bg-[#090714]"
                >
                  Revisit Our Story
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Embedded falling confetti shards simulation when clicked */}
      {oneLastThingClicked && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`
              }}
              animate={{
                top: ["-5%", "105%"],
                x: [0, Math.sin(p.id) * 40],
                rotate: [0, 360]
              }}
              transition={{
                duration: p.speedY / 2.5,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
}
