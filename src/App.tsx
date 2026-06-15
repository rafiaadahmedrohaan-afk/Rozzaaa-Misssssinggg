import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import ParticleBackground from "./components/ParticleBackground.tsx";
import AudioPlayer, { playDreamTone } from "./components/AudioPlayer.tsx";

import ChapterBeginning from "./components/ChapterBeginning.tsx";
import ChapterSinceYouLeft from "./components/ChapterSinceYouLeft.tsx";
import ChapterLetters from "./components/ChapterLetters.tsx";
import ChapterVacation from "./components/ChapterVacation.tsx";
import ChapterPuzzle from "./components/ChapterPuzzle.tsx";
import ChapterCountdown from "./components/ChapterCountdown.tsx";
import ChapterReveal from "./components/ChapterReveal.tsx";

import { Heart, ChevronRight, ChevronLeft, MapPin, Sparkles } from "lucide-react";

const CHAPTERS_LIST = [
  { num: 1, id: "beginning", label: "The Beginning" },
  { num: 2, id: "since-left", label: "Since You Left" },
  { num: 3, id: "letters", label: "Hidden Letters" },
  { num: 4, id: "vacation", label: "The Vacation" },
  { num: 5, id: "puzzle", label: "Missing Piece" },
  { num: 6, id: "countdown", label: "Countdown" },
  { num: 7, id: "reveal", label: "The Reveal" },
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0); // 0 is landing page
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => {
    playDreamTone();
    setActiveChapter((prev) => Math.min(prev + 1, CHAPTERS_LIST.length));
  };

  const handlePrev = () => {
    playDreamTone();
    setActiveChapter((prev) => Math.max(prev - 1, 0));
  };

  const handleBegin = () => {
    playDreamTone();
    setIsPlaying(true); // Auto-play soothing theme piano on clicking start journey
    setActiveChapter(1);
  };

  const handleRestory = () => {
    playDreamTone();
    setActiveChapter(1);
  };

  return (
    <div id="application-shell" className="relative min-h-screen text-white bg-[#04030a] overflow-x-hidden selection:bg-pink-500/35 flex flex-col justify-between font-sans">
      
      {/* 1. Global starry/hearts particle background layer */}
      <ParticleBackground />

      {/* 2. Global background music audio stream visual control button */}
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* Header Info Banner for active chapters */}
      {activeChapter > 0 && (
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full z-30 pt-6 px-6 max-w-7xl mx-auto flex justify-between items-center bg-transparent"
        >
          {/* Logo badge with return to home click */}
          <div 
            onClick={() => { playDreamTone(); setActiveChapter(0); }} 
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-pink-500/20 bg-pink-500/5 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
              <Heart size={14} fill="currentColor" className="animate-pulse" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-pink-300 font-semibold group-hover:text-white transition-colors">
              Until You Come Back
            </span>
          </div>

          {/* Cute interactive indicator for vacation location */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase font-mono tracking-wider text-pink-300/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-505 bg-pink-400"></span>
            </span>
            <MapPin size={9} /> Rozaa's Vacation
          </div>
        </motion.header>
      )}

      {/* Main Container Stage inside slide layout */}
      <main id="content-display-window" className="w-full flex-1 flex flex-col justify-center relative z-20 pt-6 pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          {activeChapter === 0 ? (
            
            /* --- LANDING SITE VIEW --- */
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center space-y-10"
            >
              {/* Center icon aura */}
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/25 rounded-full blur-3xl animate-pulse" />
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="relative w-28 h-28 rounded-full border border-pink-400/30 flex items-center justify-center bg-[#070512]"
                >
                  <Heart size={44} className="text-pink-400 fill-pink-540 drop-shadow-[0_0_20px_#f43f5e]" fill="#f43f5e" />
                </motion.div>
                <div className="absolute -top-1 -right-1 text-yellow-200 animate-bounce">
                  <Sparkles size={20} />
                </div>
              </div>

              {/* Romantic headers */}
              <div className="space-y-4 max-w-xl mx-auto">
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs uppercase tracking-[0.3em] text-pink-400 font-mono"
                >
                  Dedicated to Rozaa
                </motion.h4>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium leading-tight text-white select-none">
                  For someone who is currently <br />
                  <span className="text-romantic-gradient font-light italic">far away...</span>
                </h1>

                <p className="text-gray-400 text-lg sm:text-xl font-serif font-light italic">
                  "But never far from my heart."
                </p>
              </div>

              {/* Glowing entry button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  id="begin-the-journey-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBegin}
                  className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 font-mono text-white text-xs uppercase tracking-[0.25em] font-medium border border-rose-300/30 shadow-2xl hover:border-white/50 cursor-pointer flex items-center gap-3 transition-colors relative"
                >
                  <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition" />
                  Begin The Journey
                  <ChevronRight size={14} className="animate-pulse" />
                </motion.button>
                
                <p className="text-[10px] font-mono text-gray-500 tracking-wider mt-4">
                  Turn your sound on for the dreamiest experience 🎵
                </p>
              </motion.div>

              {/* Signature stamp */}
              <div className="pt-8 text-[11px] font-mono tracking-widest text-[#fecdd3]/40">
                CREATED WITH LOVE FOR ROZAA BY ROHAAN ❤️
              </div>
            </motion.div>

          ) : (
            
            /* --- PRIMARY ACTIVE JOURNEY STAGE --- */
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.55 }}
              className="w-full px-4"
            >
              <div className="w-full">
                {activeChapter === 1 && <ChapterBeginning />}
                {activeChapter === 2 && <ChapterSinceYouLeft />}
                {activeChapter === 3 && <ChapterLetters />}
                {activeChapter === 4 && <ChapterVacation />}
                {activeChapter === 5 && <ChapterPuzzle />}
                {activeChapter === 6 && <ChapterCountdown />}
                {activeChapter === 7 && <ChapterReveal onRestart={handleRestory} />}
              </div>

              {/* Sliding Controls layout below each active Chapter */}
              <div className="max-w-2xl mx-auto mt-12 flex justify-between items-center px-4">
                {activeChapter > 1 ? (
                  <button
                    onClick={handlePrev}
                    id="prev-chapter-btn"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/5 hover:border-pink-500/20 glass-panel text-pink-300 text-xs font-mono tracking-wider cursor-pointer transition-all duration-300"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                ) : (
                  <button
                    onClick={handlePrev}
                    id="prev-chapter-home-btn"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/5 hover:border-pink-500/20 glass-panel text-pink-300 text-xs font-mono tracking-wider cursor-pointer transition-all duration-300"
                  >
                    <ChevronLeft size={14} /> Main Card
                  </button>
                )}

                {activeChapter < CHAPTERS_LIST.length ? (
                  <button
                    onClick={handleNext}
                    id="next-chapter-btn"
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-full border bg-pink-500/5 hover:bg-pink-500/10 border-pink-500/40 text-pink-200 text-xs font-mono font-bold tracking-widest uppercase cursor-pointer shadow-lg shadow-pink-500/5 transition-all duration-300 animate-pulse"
                  >
                    Next Chapter <ChevronRight size={14} />
                  </button>
                ) : (
                  <div className="w-20" /> // spacer for final letter
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent global luxury index and progress panel at foot */}
      {activeChapter > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 inset-x-0 bg-gradient-to-t from-[#04030a] via-[#04030a]/90 to-transparent pt-4 pb-6 px-4 z-40"
        >
          <div className="max-w-3xl mx-auto">
            {/* Quick click step trackers */}
            <div className="flex justify-between items-center gap-1 md:gap-2 mb-2">
              {CHAPTERS_LIST.map((chap) => {
                const isActive = activeChapter === chap.num;
                const isPassed = activeChapter > chap.num;
                return (
                  <button
                    key={chap.num}
                    onClick={() => {
                      playDreamTone();
                      setActiveChapter(chap.num);
                    }}
                    title={chap.label}
                    className="flex-1 group cursor-pointer"
                  >
                    {/* Glowing progress notch */}
                    <div className="relative h-[4px] rounded-full transition-all duration-300 overflow-hidden" 
                      style={{ 
                        background: isActive 
                          ? "#f43f5e" 
                          : isPassed 
                            ? "rgba(244, 63, 94, 0.4)" 
                            : "rgba(255, 255, 255, 0.1)" 
                      }}
                    >
                      {isActive && <div className="absolute inset-0 bg-white animate-pulse" />}
                    </div>
                    {/* Tick label on hover on desktop */}
                    <span 
                      className={`hidden md:block text-[8px] font-mono tracking-widest text-center mt-1.5 uppercase transition-all duration-300 truncate max-w-[65px] ${
                        isActive ? "text-pink-300 font-bold scale-105" : "text-gray-400/50 group-hover:text-gray-200"
                      }`}
                    >
                      {chap.num}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Display names of chapters */}
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase tracking-widest px-1">
              <span>JOURNEY TRACKER</span>
              <span className="text-pink-300 font-bold">
                {activeChapter === 7 ? "ROZAA'S REVEAL ❤️" : `CHAPTER ${activeChapter}: ${CHAPTERS_LIST[activeChapter - 1]?.label}`}
              </span>
              <span>{activeChapter} / 7</span>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
