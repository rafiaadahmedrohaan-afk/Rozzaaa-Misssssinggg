import { motion } from "motion/react";
import { Train, Compass, Map, Palmtree, Star, Heart } from "lucide-react";

export default function ChapterVacation() {
  return (
    <div id="chapter-vacation" className="relative w-full max-w-4xl mx-auto py-16 px-4 overflow-hidden">
      {/* Chapter header */}
      <div className="text-center mb-12">
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
          The Vacation
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0 mx-auto mt-4" />
      </div>

      {/* Interactive Travel Postcard Frame */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0d091e]/55 border border-pink-500/10 p-6 md:p-10 rounded-3xl backdrop-blur-md shadow-2xl relative">
        
        {/* Soft Background Clouds Vector */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,80 Q25,50 40,80 T70,80 T100,80 L100,100 L0,100 Z" fill="#fff" />
          </svg>
        </div>

        {/* Travel Postcard (Left side or top 7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 space-y-6"
        >
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-xl md:text-2xl text-pink-100 leading-relaxed font-light"
            >
              "While you're making memories with your family..."
            </motion.h3>
            
            <motion.h3 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-serif text-2xl md:text-3xl text-pink-300 leading-relaxed font-semibold"
            >
              "I'm making memories of missing you."
            </motion.h3>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
            I know your train trip to Sylhet with your family is crafting beautiful memories. As you gaze out of the window at the scenic green tea gardens, enjoy every sight, every gentle click-clack of the tracks, and every cozy station. But remember that an eager heart is waiting here to hear all your stories when you come back.
          </p>

          <div className="flex gap-4 items-center pt-2">
            <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 animate-float">
              <Compass size={20} />
            </div>
            <div>
              <p className="text-xs font-mono text-white tracking-widest uppercase">Safe Travels</p>
              <p className="text-[11px] font-mono text-pink-300/60">May every tea garden path bring beauty</p>
            </div>
          </div>
        </motion.div>

        {/* Animated travel illustration (Right side 5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-5 flex flex-col items-center justify-center relative min-h-[220px]"
        >
          {/* Postcard background effect */}
          <div className="w-full h-full min-h-[240px] rounded-2xl border border-white/10 bg-white/5 relative p-4 flex flex-col justify-between overflow-hidden">
            {/* Stamp top right */}
            <div className="absolute top-4 right-4 w-12 h-14 border border-dashed border-pink-400/30 rounded flex flex-col items-center justify-center p-1 bg-pink-500/5 rotate-6 text-pink-300">
              <Heart size={14} fill="currentColor" className="animate-pulse text-pink-400" />
              <span className="text-[6px] font-mono mt-1 text-center leading-none">LOVE POST</span>
              <span className="text-[5px] font-mono text-pink-400/50">ROZAA</span>
            </div>

            {/* Travel mini dashboard */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-1">
                <Map size={14} className="text-pink-400" />
                <span className="text-[10px] font-mono text-pink-300/80 tracking-widest">SYLHET EXPRESS TRAVEL PATH</span>
              </div>

              {/* Animated train connector */}
              <div className="relative h-12 flex items-center justify-between px-4 mt-6">
                {/* Dotted curve connecting */}
                <div className="absolute left-6 right-6 h-[1px] border-b border-dashed border-pink-400/40" />
                
                {/* Starting point (Rohaan) */}
                <div className="z-10 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-pink-900 border border-pink-400 flex items-center justify-center text-[8px] font-mono text-white font-bold">
                    R
                  </div>
                  <span className="text-[8px] font-mono text-pink-300/70 mt-1">HOME</span>
                </div>

                {/* Simulated Train traveling */}
                <motion.div
                  className="absolute z-20 text-pink-400"
                  animate={{
                    left: ["15%", "85%", "15%"],
                    scaleX: [-1, -1, 1, 1, -1] // flips alignment when returning
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Train size={16} />
                </motion.div>

                {/* Destination (Rozaa) */}
                <div className="z-10 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-indigo-950 border border-purple-400 flex items-center justify-center text-[8px] font-mono text-white font-bold animate-pulse">
                    Z
                  </div>
                  <span className="text-[8px] font-mono text-purple-300/70 mt-1">SYLHET</span>
                </div>
              </div>
            </div>

            {/* Micro palm icons */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-gray-400">
              <span className="flex items-center gap-1"><Palmtree size={10} /> Grand Sylhet</span>
              <span className="flex items-center gap-1 text-pink-300"><Star size={10} fill="currentColor" /> Dreaming of You</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quote at the bottom of the section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-14 text-center space-y-2"
      >
        <p className="text-lg md:text-xl font-serif text-pink-100 font-light italic">
          "Every beautiful place reminds me of one thing."
        </p>
        <p className="text-xl md:text-2xl font-serif text-pink-300 font-medium tracking-wide">
          "I wish you were here with me."
        </p>
      </motion.div>
    </div>
  );
}
