import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const TheArchitect: React.FC = () => {
  const [mode, setMode] = useState<'architect' | 'human'>('architect');

  return (
    <section id="origins" className="w-full bg-[#FFF2EC] py-32 lg:py-64 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative items-center">
          
          {/* LEFT: LIVING PORTRAIT CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Structural Frame */}
            <div className={`absolute -inset-4 border border-[#1a1a1a]/10 transition-all duration-1000 ${mode === 'architect' ? 'opacity-100' : 'opacity-30'}`} />
            <div className={`absolute -inset-1 border border-[#1a1a1a] transition-all duration-1000 ${mode === 'architect' ? 'border-[#1a1a1a]' : 'border-[#C5A059]'}`} />

            <div className="aspect-[3/4] bg-[#1a1a1a] relative overflow-hidden shadow-2xl">
              {/* The Living Image */}
              <motion.div
                className={`w-full h-full relative transition-all duration-1000 ${mode === 'architect' ? 'grayscale contrast-125' : 'grayscale-0 contrast-100 sepia-[0.2]'}`}
                animate={{ 
                  scale: [1, 1.05, 1],
                  x: [0, -10, 0] // Subtle parallax movement
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                 <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200"
                    alt="The Architect"
                    className="w-full h-full object-cover"
                 />
                 {/* Vignette Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* Technical Overlay */}
              <div className="absolute top-6 left-6 z-20">
                <div className={`font-mono text-[9px] uppercase tracking-[0.3em] flex items-center gap-3 transition-colors duration-500 ${mode === 'architect' ? 'text-white/60' : 'text-[#C5A059]'}`}>
                   <span className="w-1.5 h-1.5 rounded-full bg-[#E21E3F] animate-pulse" />
                   SUBJECT: THE_ARCHITECT // STATUS: ONLINE
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-0 right-0 p-6 z-20">
                 <ShieldCheck className={`w-10 h-10 transition-colors duration-700 ${mode === 'architect' ? 'text-white/20' : 'text-[#C5A059]'}`} />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="lg:col-span-7 relative">
             {/* PROFILE SWITCH - High Visibility Dashboard Style */}
             <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12 border-b border-black/5 pb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold">
                // SELECT_PROFILE_VIEW:
              </span>
              
              <div className="flex bg-[#1a1a1a]/5 p-1.5 rounded-sm w-fit">
                <button 
                  onClick={() => setMode('architect')}
                  className={`relative px-8 py-3 font-mono text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 rounded-sm ${
                    mode === 'architect' 
                      ? 'bg-[#1a1a1a] text-[#FFF2EC] shadow-lg' 
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  THE_ARCHITECT
                </button>
                
                <button 
                  onClick={() => setMode('human')}
                  className={`relative px-8 py-3 font-mono text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 rounded-sm ${
                    mode === 'human' 
                      ? 'bg-[#C5A059] text-white shadow-lg' 
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  THE_HUMAN
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.5 }}
              >
                 <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-10 text-[#1a1a1a] tracking-tight">
                    {mode === 'architect' ? (
                       <>I don't hire juniors. <br/><span className="italic text-[#1a1a1a]/30">I hire Logic.</span></>
                    ) : (
                       <>I am a Scientist, <br/><span className="italic text-[#C5A059]">not a Salesman.</span></>
                    )}
                 </h2>
                 <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#1a1a1a]/10 pl-8 max-w-xl">
                    {mode === 'architect' 
                      ? "Traditional agencies are bloated with communication layers. I deliver the output of a 10-person unit with the surgical focus of a single mind. I replace human friction with autonomous code."
                      : "I connect disciplines. With a background in Chemistry and Jazz, I see business as a reaction that can be engineered. I don't guess; I experiment, measure, and refine until the system sings."
                    }
                 </p>

                 {/* Signature Block */}
                 <div className="mt-16 pt-10 border-t border-black/5 flex items-center gap-8">
                    <div>
                       <p className="font-mono text-[9px] text-black/30 uppercase tracking-[0.3em] mb-1">
                          {mode === 'architect' ? 'SYSTEM_DESIGNATION' : 'HUMAN_DESIGNATION'}
                       </p>
                       <p className={`font-serif text-2xl transition-colors duration-500 ${mode === 'architect' ? 'text-[#1a1a1a]' : 'text-[#C5A059]'}`}>
                          Felipe Chaparro
                       </p>
                    </div>
                    <a 
                      href="https://meetings-ap1.hubspot.com/felipe" 
                      target="_blank"
                      className={`flex items-center justify-center w-14 h-14 border transition-all duration-300 ${mode === 'architect' ? 'border-black/10 hover:bg-[#1a1a1a] hover:text-white' : 'border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-white'}`}
                    >
                       <ArrowUpRight className="w-5 h-5" />
                    </a>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Discovery-Based Design Footer */}
        <div className="mt-32 pt-10 border-t border-black/5 flex flex-wrap justify-between items-center gap-8">
          <div className="flex gap-12 font-mono text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black/60 transition-colors duration-700 cursor-help">
            <span>[ LATENCY: 2ms ]</span>
            <span>[ THROUGHPUT: 1.4PB/S ]</span>
            <span>[ UPTIME: 99.99% ]</span>
          </div>
          <div className={`font-mono text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${mode === 'architect' ? 'text-[#E21E3F]' : 'text-[#C5A059]'}`}>
            {mode === 'architect' ? 'CRITICAL_PATH_LOCKED' : 'CREATIVE_STATE_ENGAGED'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheArchitect;