import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HIDDEN_LETTERS } from "../data.ts";
import { playDreamTone } from "./AudioPlayer.tsx";
import { Mail, MailOpen, Heart, MessageCircle } from "lucide-react";

export default function ChapterLetters() {
  const [openLetterId, setOpenLetterId] = useState<number | null>(null);

  const handleEnvelopeClick = (id: number) => {
    playDreamTone();
    setOpenLetterId(id);
  };

  const activeLetter = HIDDEN_LETTERS.find((l) => l.id === openLetterId);

  return (
    <div id="chapter-letters" className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Cards Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-pink-400 font-mono"
        >
          Chapter Four
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-pink-100 mt-2 font-medium"
        >
          Hidden Letters
        </motion.h2>
        <p className="text-pink-300/60 font-serif italic text-xs mt-1">
          Click to open the messages hidden inside these virtual letters...
        </p>
        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0 mx-auto mt-4" />
      </div>

      {/* Grid of 4 floating envelopes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {HIDDEN_LETTERS.map((letter) => {
          const isOpened = openLetterId === letter.id;
          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleEnvelopeClick(letter.id)}
              className="cursor-pointer"
            >
              <div className={`relative rounded-3xl p-8 border border-white/10 glass-panel bg-gradient-to-br ${letter.color} transition-all duration-300 flex flex-col justify-between h-64 overflow-hidden shadow-xl`}>
                
                {/* Floating mail indicators */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-300">
                    {isOpened ? <MailOpen size={20} className="animate-bounce" /> : <Mail size={20} />}
                  </div>
                  
                  {/* Glowing wax seal heart shape */}
                  <div className="relative">
                    <span className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-400">
                      <Heart size={14} fill="currentColor" />
                    </span>
                    <span className="absolute inset-0 bg-pink-500/20 rounded-full animate-ping opacity-25" />
                  </div>
                </div>

                {/* Card summary text */}
                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-pink-300/60">
                    Letter 0{letter.id}
                  </span>
                  <h3 className="text-lg font-serif text-white mt-1.5 font-medium leading-snug">
                    {letter.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed italic">
                    "{letter.excerpt}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-pink-300/50">
                  <span>UNFOLD LETTER</span>
                  <MessageCircle size={12} className="opacity-65" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Elegant unfolding letter presentation popup */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            id="envelope-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenLetterId(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* The unfolding mock paper */}
            <motion.div
              id="letter-paper"
              initial={{ rotateX: 90, scale: 0.8, opacity: 0 }}
              animate={{ rotateX: 0, scale: 1, opacity: 1 }}
              exit={{ rotateX: -90, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#faf3f0] text-gray-800 w-full max-w-lg rounded-3xl overflow-hidden border border-amber-100 shadow-2xl relative p-8 md:p-10 font-serif"
              style={{ transformOrigin: "top center" }}
            >
              {/* Paper texture and margins */}
              <div className="absolute inset-y-0 left-6 border-l border-red-200/20 w-[1px]" />
              
              <div className="relative">
                {/* Letter Header stamp */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800/60 bg-amber-800/5 px-2.5 py-1 rounded-full border border-amber-800/10">
                    Confidential • For Rozaa
                  </span>
                  <div className="flex gap-1 text-red-400">
                    <Heart size={14} fill="currentColor" />
                    <Heart size={10} fill="currentColor" />
                  </div>
                </div>

                {/* Nice visual handwriting stamp */}
                <h4 className="text-3xl font-script text-pink-500 font-bold mb-4 drop-shadow-sm">
                  {activeLetter.title}
                </h4>

                <div className="w-16 h-[1px] bg-amber-800/10 mb-6" />

                {/* Body paragraph */}
                <p className="text-gray-750 text-base leading-relaxed md:leading-loose whitespace-pre-line font-serif italic selection:bg-pink-100">
                  {activeLetter.content}
                </p>

                {/* Letter sign off */}
                <div className="mt-10 pt-6 border-t border-amber-900/10 flex justify-between items-end">
                  <div>
                    <h5 className="text-[10px] font-mono text-amber-800/60 tracking-wider">CREATOR</h5>
                    <p className="text-lg font-script text-pink-500 font-bold tracking-wide mt-0.5">Rohaan</p>
                  </div>
                  <div className="text-xs text-amber-800/50 font-mono italic">
                    With endless love
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setOpenLetterId(null)}
                  className="mt-8 w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-mono tracking-widest text-xs uppercase cursor-pointer transition-all duration-300 shadow-md shadow-pink-900/10"
                >
                  Pack Letter away
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
