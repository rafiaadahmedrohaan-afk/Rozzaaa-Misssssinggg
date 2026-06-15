import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Hourglass, Gift, Star, Sparkles } from "lucide-react";

export default function ChapterCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Current year is 2026 based on metadata
    const targetDate = new Date("2026-09-12T00:00:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="chapter-countdown" className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Chapter header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-pink-400 font-mono"
        >
          Chapter Seven
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-pink-100 mt-2 font-medium"
        >
          Special Countdown
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0 mx-auto mt-4" />
      </div>

      {/* Floating Sparkles decorative icons */}
      <div className="absolute top-10 left-12 opacity-20 animate-float">
        <Star size={36} className="text-amber-300" fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-12 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
        <Sparkles size={36} className="text-pink-400" />
      </div>

      {/* Main Countdown Display inside glass */}
      <div className="max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-pink-500/15 relative overflow-hidden shadow-2xl text-center">
        
        {/* Glow helper */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Highlight text header */}
        <p className="text-yellow-200/90 font-mono text-[10px] tracking-[0.3em] uppercase mb-1 flex items-center justify-center gap-1.5">
          <Gift size={12} /> SEPTEMBER 12TH, 2026
        </p>

        <h3 className="text-2xl md:text-3xl font-serif text-white font-medium mb-8">
          The Countdown To Extraordinariness
        </h3>

        {/* Ticking Clock Row */}
        <div className="grid grid-cols-4 gap-3 md:gap-6 relative z-10">
          
          {/* Days */}
          <div className="flex flex-col">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-[#0d0920] border border-pink-500/20 text-white shadow-lg shadow-pink-500/5 flex items-center justify-center text-xl sm:text-4xl font-mono font-bold text-romantic-gradient">
              {timeLeft.days}
            </div>
            <span className="text-[9px] md:text-xs font-mono text-pink-300/60 uppercase tracking-widest mt-2">D</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-[#0d0920] border border-pink-500/20 text-white shadow-lg shadow-pink-500/5 flex items-center justify-center text-xl sm:text-4xl font-mono font-bold text-romantic-gradient font-medium">
              {timeLeft.hours}
            </div>
            <span className="text-[9px] md:text-xs font-mono text-pink-300/60 uppercase tracking-widest mt-2">H</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-[#0d0920] border border-pink-500/20 text-white shadow-lg shadow-pink-500/5 flex items-center justify-center text-xl sm:text-4xl font-mono font-bold text-romantic-gradient font-medium">
              {timeLeft.minutes}
            </div>
            <span className="text-[9px] md:text-xs font-mono text-pink-300/60 uppercase tracking-widest mt-2">M</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-[#0d0920] border border-pink-500/20 text-white shadow-lg shadow-pink-500/5 flex items-center justify-center text-xl sm:text-4xl font-mono font-bold text-rose-400">
              {timeLeft.seconds}
            </div>
            <span className="text-[9px] md:text-xs font-mono text-pink-300/60 uppercase tracking-widest mt-2">S</span>
          </div>

        </div>

        {/* Poetic birthday sentiment at the bottom */}
        <div className="mt-10 pt-8 border-t border-white/5 space-y-2">
          <p className="text-base md:text-xl font-serif text-pink-100 font-light italic">
            "Not because it's just your birthday..."
          </p>
          <p className="text-lg md:text-2xl font-serif text-pink-300 font-medium leading-relaxed">
            "But because it's the day the world received someone extraordinary."
          </p>
        </div>

      </div>
    </div>
  );
}
