import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TIMELINE_EVENTS } from "../data.ts";
import { playDreamTone } from "./AudioPlayer.tsx";
import { Calendar, Heart, MapPin, ZoomIn, CheckCircle } from "lucide-react";

export default function ChapterBeginning() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    playDreamTone();
    setSelectedEventId(id);
  };

  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedEventId);

  return (
    <div id="chapter-beginning" className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Chapter header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-pink-400 font-mono"
        >
          Chapter One
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-display text-pink-100 mt-2 font-medium"
        >
          The Beginning
        </motion.h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-400 to-pink-500/0 mx-auto mt-4" />
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-pink-500/20 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
        {TIMELINE_EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Pulsing point icon on timeline */}
            <span className="absolute -left-[45px] md:-left-[61px] top-1.5 flex h-9 w-9 items-center justify-center rounded-full border border-pink-400/40 bg-[#0c0a1e] text-pink-300 shadow-sm shadow-pink-500/30 cursor-pointer hover:scale-110 hover:border-pink-300 transition-all z-10"
              onClick={() => handleNodeClick(event.id)}
            >
              <span className="text-sm">{event.emoji}</span>
              <span className="absolute -inset-0.5 rounded-full bg-pink-400/20 animate-ping opacity-30" />
            </span>

            {/* Content Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div 
                className="glass-card-pink rounded-2xl p-6 flex-1 hover:border-pink-400/40 transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-lg"
                onClick={() => handleNodeClick(event.id)}
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-300">
                  <ZoomIn size={16} />
                </div>
                
                <span className="text-xs text-pink-300/70 font-mono tracking-wider flex items-center gap-1.5 mb-2">
                  <Calendar size={12} /> {event.date}
                </span>
                <h3 className="text-xl font-serif text-white font-semibold transition-all group-hover:text-pink-200">
                  {event.title}
                </h3>
                <p className="text-gray-300 mt-2 text-sm max-w-2xl leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Card Popup Dialog / Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            id="timeline-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEventId(null)}
            className="fixed inset-0 bg-[#05040a]/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="timeline-popup"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-lg rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl relative"
            >
              {/* Photo top card */}
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={selectedEvent.cardImage}
                  alt={selectedEvent.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c1f] via-transparent to-black/40" />
                
                {/* Floating Heart Button */}
                <div className="absolute top-4 right-4 bg-pink-500/20 backdrop-blur-md border border-pink-500/30 w-10 h-10 rounded-full flex items-center justify-center text-pink-300 shadow-md">
                  <Heart size={18} fill="currentColor" className="animate-pulse" />
                </div>

                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-pink-300 bg-pink-900/40 px-2.5 py-1 rounded-full border border-pink-500/30">
                    Memory Saved
                  </span>
                </div>
              </div>

              {/* Text content details */}
              <div className="p-8">
                <h3 className="text-2xl font-serif text-white font-medium flex items-center gap-3">
                  <span className="text-2xl">{selectedEvent.emoji}</span>
                  {selectedEvent.title}
                </h3>
                <p className="text-pink-300/85 font-serif italic text-sm mt-1">{selectedEvent.date}</p>
                
                <p className="text-gray-200 mt-4 leading-relaxed text-sm">
                  {selectedEvent.description}
                </p>

                {/* Romantic quotation card footer */}
                <div className="mt-6 pt-5 border-t border-pink-500/10 flex items-start gap-3">
                  <span className="text-pink-400 font-serif text-3xl leading-none">“</span>
                  <p className="text-pink-200/90 font-serif italic text-sm leading-relaxed">
                    {selectedEvent.caption}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedEventId(null)}
                  className="mt-6 w-full py-2.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 rounded-xl text-pink-300 font-mono tracking-widest text-xs uppercase cursor-pointer transition-all duration-300"
                >
                  Close Memory
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote at the bottom of the section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-20 text-center px-4"
      >
        <span className="italic font-serif text-lg md:text-xl text-pink-205/90">
          "I didn't know then that you would become one of the most important people in my life."
        </span>
        <div className="flex justify-center gap-1.5 mt-4 text-pink-400">
          <Heart size={14} fill="currentColor" />
          <Heart size={14} fill="currentColor" className="opacity-60" />
          <Heart size={14} fill="currentColor" className="opacity-30" />
        </div>
      </motion.div>
    </div>
  );
}
