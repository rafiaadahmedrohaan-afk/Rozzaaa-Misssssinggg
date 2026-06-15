import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion } from "motion/react";

// Web Audio API Synth for romantic, dreamy bell tones on click
export function playDreamTone() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const now = ctx.currentTime;
    
    // Core tone oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Choose sweet notes (pentatonic major in F# or Db, very romantic)
    const tones = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C, D, E, G, A, C
    const freq = tones[Math.floor(Math.random() * tones.length)];
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    
    // Harmonics for a bell-like richness
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(freq * 1.5, now); // Perfect fifth or octave helper
    
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    
    subGain.gain.setValueAtTime(0.04, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    osc.connect(gainNode);
    subOsc.connect(subGain);
    
    gainNode.connect(ctx.destination);
    subGain.connect(ctx.destination);
    
    osc.start(now);
    subOsc.start(now);
    
    osc.stop(now + 1.8);
    subOsc.stop(now + 1.2);
  } catch (err) {
    // Fail silently if browser blocks audio context or is not supported
  }
}

// Procedural continuous ambient background pianist to play sweet romantic music under any connection status
class AmbientPianist {
  private ctx: AudioContext | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private schedulerId: any = null;
  private isRunning: boolean = false;

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      this.playCycle();
    } catch (e) {
      console.warn("Ambient pianist failed to start:", e);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.schedulerId) {
      clearTimeout(this.schedulerId);
      this.schedulerId = null;
    }
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
            gain.disconnect();
          } catch (e) {}
        }, 1000);
      } catch (e) {}
    });
    this.activeNodes = [];
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }

  private playNote(freq: number, startTime: number, duration: number, volume: number = 0.04) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, startTime);

      // Warm romantic lo-fi curve (soft piano attack)
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.5);
      gainNode.gain.setValueAtTime(volume, startTime + duration - 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);

      const node = { osc, gain: gainNode };
      this.activeNodes.push(node);

      // Automated node cleanup
      setTimeout(() => {
        this.activeNodes = this.activeNodes.filter((n) => n !== node);
        try {
          osc.disconnect();
          filter.disconnect();
          gainNode.disconnect();
        } catch (e) {}
      }, (duration + 2) * 1000);
    } catch (e) {}
  }

  private playCycle = () => {
    if (!this.isRunning || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Romantic, dreamy chord progressions (Cmaj9, Dm9, Am9, Fmaj9)
      const chordProgressions = [
        [130.81, 261.63, 329.63, 392.00, 493.88], // Cmaj9
        [146.83, 293.66, 349.23, 440.00, 523.25], // Dm9
        [110.00, 220.00, 261.63, 329.63, 392.00], // Am9
        [174.61, 349.23, 392.00, 440.00, 523.25], // Fmaj9
      ];

      const currentChord = chordProgressions[Math.floor(Math.random() * chordProgressions.length)];

      // Play soft cozy harmony and bass notes
      currentChord.forEach((freq, idx) => {
        const arpeggioDelay = idx * 0.18;
        const vol = idx === 0 ? 0.04 : 0.025; // elegant balance
        this.playNote(freq, now + arpeggioDelay, 5.0, vol);
      });

      // Twinkling stargaze notes in the higher octave
      const starNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      for (let i = 0; i < 3; i++) {
        const noteDelay = 1.6 + i * 1.2 + Math.random() * 0.4;
        const noteFreq = starNotes[Math.floor(Math.random() * starNotes.length)];
        this.playNote(noteFreq, now + noteDelay, 2.5, 0.012);
      }

      this.schedulerId = setTimeout(this.playCycle, 6500);
    } catch (e) {}
  };
}

const globalAmbientPianist = new AmbientPianist();

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set comfortable default background volume on load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.40;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      // 1. Start the ambient synthesized backup stream instantly (robust, zero CORS)
      globalAmbientPianist.start();

      // 2. Play backing track stream (without crossOrigin to avoid CORS blocks)
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Backing stream failed or was blocked by browser:", err);
          });
        }
      }
    } else {
      globalAmbientPianist.stop();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      globalAmbientPianist.stop();
    };
  }, [isPlaying]);

  const togglePlay = () => {
    playDreamTone();
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="audio-container" className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {/* Hidden audio tag with loop enabled and beautiful backup streams */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
      </audio>

      {/* Interactive Floating Controller Badge */}
      <motion.button
        id="music-toggle-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-pink-500/30 glass-panel shadow-lg text-pink-300 hover:text-pink-100 cursor-pointer transition-all duration-300"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-pink-400"
            >
              <Music size={16} />
            </motion.div>
          ) : (
            <Music size={16} className="text-gray-400" />
          )}

          {/* Glowing dot when playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.0 w-2.0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400"></span>
            </span>
          )}
        </div>

        <span className="text-[10px] uppercase font-mono tracking-widest hidden md:inline">
          {isPlaying ? "Playing Dream Theme" : "Music Off"}
        </span>

        {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </motion.button>
    </div>
  );
}
