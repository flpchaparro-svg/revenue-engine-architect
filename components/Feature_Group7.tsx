import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowRight, Activity, Globe, Zap, X, Terminal } from 'lucide-react';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  const allLines = [
    "> Added Sydney location tags for Google... [DONE]",
    "> Removed slow code... [SAVED 2.1MB]",
    "> Load time: 4.2s → 0.4s [10x FASTER]"
  ];

  useEffect(() => {
    let delay = 200;
    allLines.forEach((line) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      delay += 800; // Sequence delay
    });
  }, []);

  return (
    // UPGRADE: Increased p-6 to p-8, font size base for better readability
    <div className="w-full bg-[#1a1a1a] p-8 border-t border-black/10 font-mono text-sm overflow-hidden">
      <div className="flex items-center gap-2 text-white/20 mb-4 border-b border-white/10 pb-2">
        <Terminal className="w-4 h-4 text-[#C5A059]" />
        <span className="text-[#C5A059] uppercase tracking-widest">Build Log // What I Did</span>
      </div>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/80"
          >
            <span className="text-[#0F766E] mr-3">➜</span>
            {line}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-[#C5A059] inline-block align-middle ml-2"
        />
      </div>
    </div>
  );
};

const Feature_Group7: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section className="w-full bg-[#FFF2EC] py-24 md:py-32 border-y border-black/5 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">
            // REAL RESULTS
          </span>
          {/* FIXED: Smooth scaling 4xl -> 5xl -> 7xl */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6">
            See It In <span className="italic text-[#C5A059]">Action.</span>
          </h2>
          {/* FIXED: Body text smooth scaling */}
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/60 border-l-2 border-[#E21E3F]/30 pl-6">
            Don't just take my word for it. Here's what happened when I rebuilt a Sydney security company's website.
          </p>
        </div>

        {/* --- THE TRIGGER CARD (Dark Device on Cream Desk) --- */}
        <motion.div 
          initial="idle"
          whileHover="scan"
          whileInView="scan"
          viewport={{ once: true, amount: 0.5 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#1a1a1a] border border-black/10 p-1 rounded-sm overflow-hidden relative group cursor-pointer hover:border-[#C5A059]/50 transition-colors duration-500 shadow-2xl"
        >
          
          {/* THE FORENSIC SCANNER OVERLAY */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#E21E3F] to-transparent z-50 opacity-0 blur-[1px] pointer-events-none"
            variants={{
              idle: { left: '0%', opacity: 0 },
              scan: { 
                left: '120%', 
                opacity: [0, 1, 1, 0], 
                transition: { duration: 2, ease: "easeInOut" } 
              }
            }}
          />
          <motion.div 
            className="absolute top-0 bottom-0 w-[60px] bg-gradient-to-r from-transparent to-[#E21E3F]/10 z-40 opacity-0 pointer-events-none"
            variants={{
              idle: { left: '-60px', opacity: 0 },
              scan: { 
                left: 'calc(120% - 60px)', 
                opacity: [0, 1, 1, 0], 
                transition: { duration: 2, ease: "easeInOut" } 
              }
            }}
          />

          {/* Header Bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/40 relative z-30">
              <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#C5A059] tracking-[0.2em] uppercase">
                     [ WEBSITE REBUILD ]
                  </span>
              </div>
              <span className="font-mono text-xs font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                  [ SEE THE TRANSFORMATION ]
                  <Zap className="w-3 h-3 text-[#C5A059]" />
              </span>
          </div>

          {/* The Transformation Engine (Visual Abstract) */}
          <div className="p-8 md:p-16 relative min-h-[350px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

              {/* NODE A: LEGACY (Left - Validated Early) */}
              <motion.div 
                className="relative z-10 flex flex-col items-center gap-6"
                variants={{
                  idle: { filter: "grayscale(100%)", opacity: 0.5, scale: 1 },
                  scan: { 
                    filter: "grayscale(0%)", 
                    opacity: 1, 
                    scale: 1.05, 
                    transition: { duration: 0.4, delay: 0.3 } 
                  }
                }}
              >
                  <div className="w-24 h-24 rounded-full border border-[#E21E3F]/50 flex items-center justify-center bg-[#E21E3F]/5 relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-[#E21E3F]/20" 
                        variants={{ idle: { opacity: 0 }, scan: { opacity: 1, transition: { delay: 0.3 } } }} 
                      />
                      <AlertTriangle className="w-10 h-10 text-[#E21E3F] relative z-10" />
                  </div>
                  <div className="text-center">
                      <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-2">Before</div>
                      {/* Node A */}
                      <div className="font-serif text-white/60 text-2xl md:text-3xl tracking-tight mb-2">group7security.com</div>
                      <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-[#E21E3F] bg-[#E21E3F]/10 px-3 py-1.5 rounded">
                          <Activity className="w-3 h-3" />
                          <span>4.2s Load</span>
                      </div>
                  </div>
              </motion.div>

              {/* STREAM CORD */}
              <div className="flex-grow w-full md:w-auto h-[100px] md:h-[1px] bg-white/5 relative mx-4 md:mx-12 flex items-center justify-center">
                  <motion.div 
                      className="absolute top-0 bottom-0 left-0 h-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent w-1/3 opacity-30"
                      animate={{ left: ['-30%', '130%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 bg-[#1a1a1a] border border-[#C5A059]/30 px-6 py-3 rounded-full flex items-center gap-3">
                      <span className="font-mono text-xs text-[#C5A059] uppercase tracking-widest font-bold">
                          VIEW TRANSFORMATION
                      </span>
                  </div>
              </div>

              {/* NODE B: AUTHORITY (Right - Validated Late) */}
              <motion.div 
                className="relative z-10 flex flex-col items-center gap-6"
                variants={{
                  idle: { scale: 1, opacity: 0.5 },
                  scan: { 
                    scale: 1.05, 
                    opacity: 1, 
                    transition: { duration: 0.4, delay: 1.2 } 
                  }
                }}
              >
                  <motion.div 
                    className="w-28 h-28 rounded-full border-2 flex items-center justify-center relative overflow-hidden"
                    variants={{
                      idle: { borderColor: '#333', backgroundColor: 'rgba(0,0,0,0)' },
                      scan: { 
                        borderColor: '#0F766E', 
                        backgroundColor: 'rgba(15, 118, 110, 0.1)', 
                        boxShadow: '0 0 50px rgba(15, 118, 110, 0.4)',
                        transition: { delay: 1.2 }
                      }
                    }}
                  >
                      <ShieldCheck className="w-12 h-12 text-[#C5A059] group-hover:text-[#0F766E] transition-colors duration-500 delay-1000" />
                  </motion.div>
                  <div className="text-center">
                      <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-2 group-hover:text-[#0F766E] transition-colors delay-1000">After</div>
                      {/* Node B */}
                      <div className="font-serif text-white text-3xl md:text-4xl tracking-tight mb-2">group7security.com.au</div>
                      <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-[#0F766E] bg-[#0F766E]/10 px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity delay-1000 duration-500">
                          <Activity className="w-3 h-3" />
                          <span>0.4s Load</span>
                      </div>
                  </div>
              </motion.div>

          </div>

          {/* Footer Action */}
          <div className="py-5 border-t border-white/5 bg-black/40 flex items-center justify-center gap-3 text-white group-hover:text-[#C5A059] transition-colors relative z-30">
               <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">See Full Case Study</span>
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

        </motion.div>

        {/* --- THE EVIDENCE MODAL --- */}
        {isModalOpen && createPortal(
          <AnimatePresence mode="wait">
            <div key="modal" className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-8">
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl bg-[#FFF2EC] overflow-hidden shadow-2xl rounded-sm max-h-[90vh] flex flex-col z-10"
              >
                 
                 {/* MODAL HEADER */}
                 <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white shrink-0">
                    <div>
                      {/* FIXED: Standardized Modal Title */}
                      <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] leading-tight tracking-tight">
                         Case Study: Group 7 Security
                      </h3>
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50 mt-1">
                         [ WEBSITE + SEO OVERHAUL ]
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-[#1a1a1a]" />
                    </button>
                 </div>

                 <div className="flex-grow overflow-y-auto p-0">
                    <EvidenceVisual_Compare 
                      beforeLabel="BEFORE: Old .com Site"
                      afterLabel="AFTER: New .com.au Site"
                    />
                    
                    <TerminalLog />

                    {/* MODAL GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 bg-white border-t border-black/10">
                        <div>
                          {/* FIXED: Standardized Eyebrow Title */}
                          <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-3">
                             The Problem
                          </h4>
                          <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                            They had a slow <strong>.com</strong> website with no local SEO. Google thought they were a global tech company, not a Sydney security firm. Local customers couldn't find them.
                          </p>
                        </div>
                        <div>
                          {/* FIXED: Standardized Eyebrow Title */}
                          <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-3">
                             What I Did
                          </h4>
                          <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                            I migrated them to <strong>.com.au</strong> and rebuilt the site from scratch — fast, mobile-first, with proper Sydney location tags so Google knows exactly where they operate.
                          </p>
                        </div>
                        <div>
                          {/* FIXED: Standardized Eyebrow Title */}
                          <h4 className="font-mono text-xs font-bold text-[#C5A059] mb-3 uppercase tracking-[0.2em]">
                             The Result
                          </h4>
                          <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                            Page load dropped from <strong>4.2s to 0.4s</strong>. Local search rankings improved. The site now converts visitors instead of losing them.
                          </p>
                        </div>
                    </div>
                 </div>

              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Feature_Group7;
