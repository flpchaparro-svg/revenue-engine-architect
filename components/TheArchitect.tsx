import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const TheArchitect: React.FC = () => {
  const [mode, setMode] = useState<'architect' | 'human'>('architect');

  return (
    <section id="origins" className="w-full bg-[#FFF2EC] py-32 lg:py-64 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/5">
      <div className="max-w-[1600px] mx-auto relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative items-center">
      
          {/* LEFT: LIVING PORTRAIT CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:self-start"
          >
            <div className="aspect-[9/16] md:max-h-[70vh] lg:max-h-none bg-[#1a1a1a] relative overflow-visible shadow-2xl">
              {/* Structural Frame - Inside the video container so it scales together */}
              <div className={`absolute -inset-4 border border-[#1a1a1a]/10 transition-all duration-1000 pointer-events-none ${mode === 'architect' ? 'opacity-100' : 'opacity-30'}`} />
              <div className={`absolute -inset-1 border border-[#1a1a1a] transition-all duration-1000 pointer-events-none ${mode === 'architect' ? 'border-[#1a1a1a]' : 'border-[#C5A059]'}`} />
              
              {/* Video container with overflow-hidden to clip video content */}
              <div className="w-full h-full relative overflow-hidden">
                {/* Video in 9:16 ratio */}
                <motion.div
                  className="w-full h-full relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    role="presentation"
                  >
                    <source src="/videos/revenue-engine-architecture-system-About-video.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
                </motion.div>
              </div>
           
              {/* Technical Overlay */}
              <div className="absolute top-6 left-6 z-20">
                {/* Type B: Card Tag */}
                <div className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-colors duration-500 ${mode === 'architect' ? 'text-white/80' : 'text-[#C5A059]'}`}>
                   <span className="w-1.5 h-1.5 rounded-full bg-[#E21E3F] animate-pulse" />
                   FELIPE CHAPARRO / SYDNEY
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
              {/* Type A: Section Anchor */}
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60">
                / VIEW MODE
              </span>
         
              <div className="flex bg-[#1a1a1a]/5 p-1.5 rounded-sm w-fit">
                <button 
                  onClick={() => setMode('architect')}
                  className={`relative px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 rounded-sm ${
                    mode === 'architect' 
                      ? 'bg-[#1a1a1a] text-[#FFF2EC] shadow-lg' 
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  THE ARCHITECT
                </button>
            
                <button 
                  onClick={() => setMode('human')}
                  className={`relative px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 rounded-sm ${
                    mode === 'human' 
                      ? 'bg-[#C5A059] text-white shadow-lg' 
                      : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  THE HUMAN
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                 {/* FIXED RESPONSIVENESS: Scales smoothly now */}
                 <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8 md:mb-12 text-[#1a1a1a] tracking-tight">
                    {mode === 'architect' ? (
                       <>One person. <br/><span className="italic text-[#C5A059]">Ten person output.</span></>
                    ) : (
                       <>I've run businesses. <br/><span className="italic text-[#C5A059]">Not just advised them.</span></>
                    )}
                 </h2>
                 <div className="space-y-8 md:space-y-12">
                    {/* FIXED: Body text scaling */}
                    <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 border-l-2 border-[#1a1a1a]/10 pl-8 max-w-xl">
                       {mode === 'architect' 
                         ? "No account managers. No junior handoffs. No endless meetings. You talk directly to the person building your system. I use automation and AI to deliver what agencies charge a team for."
                         : "Before I built systems for others, I ran my own café, managed international franchises, and worked factory floors. I know what it's like to chase invoices at midnight. I don't give you theory. I give you what actually works."
                       }
                    </p>
                 </div>

                 {/* Signature Block */}
                 <div className="mt-16 pt-10 border-t border-black/5">
                    <div className="flex items-center gap-8 mb-8">
                      <div>
                          {/* Type B: Card Tag */}
                          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-1">
                             {mode === 'architect' ? 'THE ARCHITECT' : 'THE HUMAN'}
                          </p>
                          <p className={`font-serif text-2xl transition-colors duration-500 ${mode === 'architect' ? 'text-[#1a1a1a]' : 'text-[#C5A059]'}`}>
                             Felipe Chaparro
                          </p>
                      </div>
                      <a 
                        href="https://www.linkedin.com/in/felipe-chaparro-97a390176/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Felipe Chaparro's LinkedIn Profile"
                        className={`group/arrow flex items-center justify-center w-14 h-14 border transition-all duration-300 ${mode === 'architect' ? 'border-black/10 hover:bg-[#1a1a1a] hover:text-white' : 'border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-white'}`}
                      >
                          <ArrowUpRight className="w-6 h-6 stroke-[1.5] group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1 transition-transform duration-300 ease-out" />
                      </a>
                    </div>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheArchitect;
