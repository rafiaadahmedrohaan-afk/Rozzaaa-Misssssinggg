import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Hourglass, Smile, Sparkles } from "lucide-react";

export default function ChapterSinceYouLeft() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [smiles, setSmiles] = useState(2548);

  useEffect(() => {
    // Dynamic countdown/count-up starting from the precise requested time (2026-06-15T08:11:22-07:00)
    const anchorTime = new Date("2026-06-15T08:11:22-07:00").getTime();

    const updateCounters = () => {
      const now = new Date().getTime();
      const diffMs = Math.max(0, now - anchorTime);
      
      const daysElapsed = diffMs / (1000 * 60 * 60 * 24);
      const hoursElapsed = Math.floor(diffMs / (1000 * 60 * 60));
      
      setDays(daysElapsed);
      setHours(hoursElapsed);
    };

    updateCounters();
    const tickerInterval = setInterval(updateCounters, 50); // Live high-frequency tick for decimals

    // Smiles ticking up with random happy heartbeats
    const smilesInterval = setInterval(() => {
      setSmiles((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 1500);

    return () => {
      clearInterval(tickerInterval);
      clearInterval(smilesInterval);
    };
  }, []);

  return (
    <div id="chapter-since-you-left" className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Chapter Title */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-pink-400 font-mono"
        >
          Chapter Two
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-pink-100 mt-2 font-medium"
        >
          Since You Left
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0 mx-auto mt-4" />
      </div>

      {/* Grid of counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Days Count Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel overflow-hidden rounded-2xl p-6 border border-pink-500/20 text-center relative group"
        >
          <div className="absolute top-2 right-2 opacity-10 text-pink-400 group-hover:opacity-20 transition-opacity">
            <Heart size={48} fill="currentColor" />
          </div>
          <div className="mx-auto w-12 h-12 rounded-full bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-400 mb-4 animate-float">
            <Heart size={20} />
          </div>
          <h3 className="text-xs uppercase font-mono tracking-widest text-pink-300/80">
            Days Missing You
          </h3>
          <p className="text-2xl lg:text-3xl font-mono text-white font-bold mt-3 text-romantic-gradient">
            {days.toFixed(6)}
          </p>
          <p className="text-[10px] font-mono text-pink-300/50 mt-1">
            Running decimal of pure care
          </p>
        </motion.div>

        {/* Hours Count Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel overflow-hidden rounded-2xl p-6 border border-pink-500/20 text-center relative group"
        >
          <div className="absolute top-2 right-2 opacity-10 text-purple-400 group-hover:opacity-20 transition-opacity">
            <Hourglass size={48} />
          </div>
          <div className="mx-auto w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-4 animate-float" style={{ animationDelay: "1s" }}>
            <Hourglass size={20} />
          </div>
          <h3 className="text-xs uppercase font-mono tracking-widest text-purple-300/80">
            Hours Thinking About You
          </h3>
          <p className="text-2xl lg:text-3xl font-mono text-white font-bold mt-3 text-romantic-gradient">
            {hours}+
          </p>
          <p className="text-[10px] font-mono text-purple-300/50 mt-1">
            Every minute of every hour
          </p>
        </motion.div>

        {/* Smiles Count Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel overflow-hidden rounded-2xl p-6 border border-pink-500/20 text-center relative group"
        >
          <div className="absolute top-2 right-2 opacity-10 text-rose-400 group-hover:opacity-20 transition-opacity">
            <Smile size={48} />
          </div>
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-rose-400 mb-4 animate-float" style={{ animationDelay: "2s" }}>
            <Smile size={20} />
          </div>
          <h3 className="text-xs uppercase font-mono tracking-widest text-rose-300/80">
            Smiles Caused By You
          </h3>
          <p className="text-2xl lg:text-3xl font-mono text-white font-bold mt-3 text-romantic-gradient flex items-center justify-center gap-1">
            {smiles} <Sparkles size={16} className="text-pink-400 animate-pulse" />
          </p>
          <p className="text-[10px] font-mono text-rose-300/50 mt-1">
            Instantly ticking up as I daydream
          </p>
        </motion.div>
      </div>

      {/* Heartfelt messages layout */}
      <div className="max-w-2xl mx-auto space-y-6 text-center mt-12 bg-[#0d0a1b]/40 border border-pink-500/10 p-8 rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-xl">
        {/* Absolute decoration */}
        <div className="absolute top-[-30px] left-[-30px] w-16 h-16 rounded-full bg-pink-500/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-[-30px] right-[-30px] w-16 h-16 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-serif text-pink-100 font-light"
        >
          "I know you're spending precious time with your family."
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-serif text-pink-300 font-light italic"
        >
          "And honestly, that makes me happy."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          viewport={{ once: true }}
          className="py-2"
        >
          <div className="w-12 h-[1px] bg-pink-500/20 mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-serif text-pink-200 font-semibold"
        >
          "But I'd be lying if I said I don't miss you every day."
        </motion.p>
      </div>
    </div>
  );
}
