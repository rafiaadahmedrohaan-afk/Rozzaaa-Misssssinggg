import { useState } from "react";
import { motion } from "motion/react";
import { playDreamTone } from "./AudioPlayer.tsx";
import { Heart, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

export default function ChapterPuzzle() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handlePieceInsert = () => {
    if (isCompleted) return;
    playDreamTone();
    // Double bell chime for victory
    setTimeout(() => {
      playDreamTone();
    }, 250);
    setIsCompleted(true);
  };

  return (
    <div id="chapter-puzzle" className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Chapter header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-pink-400 font-mono"
        >
          Chapter Six
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-pink-100 mt-2 font-medium"
        >
          The Missing Piece
        </motion.h2>
        <p className="text-pink-300/60 font-serif italic text-xs mt-1">
          Insert the final piece to complete the picture...
        </p>
        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0 mx-auto mt-4" />
      </div>

      {/* Main Puzzle Interactive Studio */}
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* The 2x2 Jigsaw Screen */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 bg-[#090815] border border-white/5 rounded-3xl p-4 flex flex-col gap-3 shadow-2xl relative">
          
          <div className="grid grid-cols-2 gap-3 h-full w-full">
            
            {/* Piece 1: Trust */}
            <div className="bg-[#14122d] border border-pink-500/10 rounded-2xl flex flex-col items-center justify-center p-3 relative text-center">
              <span className="text-xl">🤝</span>
              <h4 className="text-xs font-mono font-bold text-white tracking-wider mt-1">TRUST</h4>
              <p className="text-[9px] text-pink-300/60 mt-0.5 font-serif italic">Unshakable bonds</p>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-pink-500/30" />
            </div>

            {/* Piece 2: Laughter */}
            <div className="bg-[#14122d] border border-pink-500/10 rounded-2xl flex flex-col items-center justify-center p-3 relative text-center">
              <span className="text-xl">✨</span>
              <h4 className="text-xs font-mono font-bold text-white tracking-wider mt-1">LAUGHTER</h4>
              <p className="text-[9px] text-pink-300/60 mt-0.5 font-serif italic">Inside jokes</p>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-pink-500/30" />
            </div>

            {/* Piece 3: Dreams */}
            <div className="bg-[#14122d] border border-pink-500/10 rounded-2xl flex flex-col items-center justify-center p-3 relative text-center">
              <span className="text-xl">🌙</span>
              <h4 className="text-xs font-mono font-bold text-white tracking-wider mt-1">DREAMS</h4>
              <p className="text-[9px] text-pink-300/60 mt-0.5 font-serif italic">Our cozy future</p>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-pink-500/30" />
            </div>

            {/* Step 4: The Placeholder/Completed Slot */}
            <div 
              onClick={handlePieceInsert}
              className={`rounded-2xl transition-all duration-500 cursor-pointer flex flex-col items-center justify-center relative p-3 text-center border ${
                isCompleted 
                  ? "bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-400" 
                  : "bg-dashed bg-transparent border-pink-500/30 hover:border-pink-400 hover:bg-pink-500/5"
              }`}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0.6, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl animate-bounce">❤️</span>
                  <h4 className="text-sm font-script font-bold text-pink-300 tracking-wider mt-1">ROZAA ❤️</h4>
                  <p className="text-[9px] font-mono text-white/70">Forever Complete</p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-pink-500/40 hover:text-pink-400">
                  <div className="w-8 h-8 rounded-full border border-dashed border-pink-500/40 flex items-center justify-center bg-pink-500/5 animate-pulse mb-1">
                    +
                  </div>
                  <span className="text-[9px] font-mono tracking-widest uppercase">Tap to Insert Block</span>
                </div>
              )}
            </div>

          </div>

          {/* Central Heart Core glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Heart 
              size={56} 
              className={`transition-all duration-500 ${
                isCompleted 
                  ? "text-pink-500 fill-pink-500 scale-110 drop-shadow-[0_0_15px_#f43f5e]" 
                  : "text-pink-500/10 scale-95"
              }`} 
            />
          </div>
        </div>

        {/* The Missing Piece Drawer below */}
        <div className="mt-8 text-center w-full">
          {!isCompleted ? (
            <div className="space-y-4">
              <p className="text-xs font-mono text-gray-400 tracking-wider">
                Select the missing puzzle key below:
              </p>
              
              <div className="flex justify-center">
                <motion.button
                  id="final-puzzle-piece-btn"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePieceInsert}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 border border-pink-300 text-white font-mono font-bold tracking-widest text-sm shadow-xl shadow-pink-500/20 flex items-center gap-2 cursor-pointer relative group overflow-hidden"
                >
                  <Sparkles size={16} className="text-yellow-200 animate-spin" />
                  ROZAA ❤️
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-40" />
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="mt-6 p-5 rounded-2xl bg-[#080718] border border-pink-500/20 max-w-sm mx-auto shadow-2xl relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[8px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle size={8} /> PICTURE COMPLETE
              </div>
              <p className="text-lg md:text-xl font-serif text-pink-200 font-semibold mb-1">
                "Now everything feels complete."
              </p>
              <p className="text-[10px] font-mono text-pink-305/40">
                You are my home, Rozaa.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
