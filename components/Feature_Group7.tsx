import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowRight, Activity, Globe, Zap, X, Terminal } from 'lucide-react';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  const allLines = [
    "> INJECTING_LOCAL_SCHEMA... [DONE]",
    "> REMOVING_JS_BLOAT... [SAVED 2.1MB]",
    "> SERVER_RESPONSE: 4.2s -> 0.4s [OPTIMIZED]"
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
    <div className="w-full bg-[#1a1a1a] p-6 border-t border-black/10 font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-2 text-white/20 mb-4 border-b border-white/10 pb-2">
        <Terminal className="w-3 h-3 text-[#C5A059]" />
        <span className="text-[#C5A059] uppercase tracking-widest">System_Log // Optimisation_Sequence</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/80"
          >
            <span className="text-[#0F766E] mr-2">➜</span>
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

  return (
    <section className="w-full bg-[#FFF2EC] py-32 border-y border-black/5 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-4 block uppercase font-bold">
            // PROOF_OF_WORK
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-[0.95] mb-6">
            The System in <span className="italic text-[#E21E3F]">Action.</span>
          </h2>
          <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed border-l-2 border-[#E21E3F]/30 pl-6">
            Don't just take my word for it. Analyze the telemetry from a recent deployment.
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
                  <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase">
                     [ VALIDATING_SYSTEM: ACQUISITION ]
                  </span>
              </div>
              <span className="font-mono text-[9px] text-white/30 uppercase flex items-center gap-2">
                  [ CLICK_TO_INSPECT_EVIDENCE ]
                  <Zap className="w-3 h-3 text-[#C5A059]" />
              </span>
          </div>

          {/* The Transformation Engine (Visual Abstract) */}
          <div className="p-8 md:p-16 relative min-h-[350px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

              {/* NODE A: LEGACY (Left - Validated Early) */}
              <motion.div 
                className="relative z-10 flex flex-col items-center gap-4"
                variants={{
                  idle: { filter: "grayscale(100%)", opacity: 0.5, scale: 1 },
                  scan: { 
                    filter: "grayscale(0%)", 
                    opacity: 1, 
                    scale: 1.05, 
                    transition: { duration: 0.4, delay: 0.3 } // Hits early
                  }
                }}
              >
                  <div className="w-20 h-20 rounded-full border border-[#E21E3F]/50 flex items-center justify-center bg-[#E21E3F]/5 relative overflow-hidden">
                      {/* Inner Glow */}
                      <motion.div 
                        className="absolute inset-0 bg-[#E21E3F]/20" 
                        variants={{ idle: { opacity: 0 }, scan: { opacity: 1, transition: { delay: 0.3 } } }} 
                      />
                      <AlertTriangle className="w-8 h-8 text-[#E21E3F] relative z-10" />
                  </div>
                  <div className="text-center">
                      <div className="font-mono text-[10px] text-[#E21E3F] mb-2 uppercase tracking-widest">Legacy State</div>
                      <div className="font-serif text-white/60 text-xl mb-1">group7security.com</div>
                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#E21E3F] bg-[#E21E3F]/10 px-2 py-1 rounded">
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
                  <div className="relative z-10 bg-[#1a1a1a] border border-[#C5A059]/30 px-4 py-2 rounded-full flex items-center gap-3">
                      <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest">
                          VIEW TRANSFORMATION
                      </span>
                  </div>
              </div>

              {/* NODE B: AUTHORITY (Right - Validated Late) */}
              <motion.div 
                className="relative z-10 flex flex-col items-center gap-4"
                variants={{
                  idle: { scale: 1, opacity: 0.5 },
                  scan: { 
                    scale: 1.05, 
                    opacity: 1, 
                    transition: { duration: 0.4, delay: 1.2 } // Hits late
                  }
                }}
              >
                  <motion.div 
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center relative overflow-hidden"
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
                      <ShieldCheck className="w-10 h-10 text-[#C5A059] group-hover:text-[#0F766E] transition-colors duration-500 delay-1000" />
                  </motion.div>
                  <div className="text-center">
                      <div className="font-mono text-[10px] text-[#C5A059] mb-2 uppercase tracking-widest group-hover:text-[#0F766E] transition-colors delay-1000">Authority State</div>
                      <div className="font-serif text-white text-2xl mb-1">group7security.com.au</div>
                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity delay-1000 duration-500">
                          <Globe className="w-3 h-3" />
                          <span>0.4s Load</span>
                      </div>
                  </div>
              </motion.div>

          </div>

          {/* Footer Action */}
          <div className="py-4 border-t border-white/5 bg-black/40 flex items-center justify-center gap-3 text-white group-hover:text-[#C5A059] transition-colors relative z-30">
               <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Open Case File</span>
               <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>

        </motion.div>

        {/* --- THE EVIDENCE MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-8">
              
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Modal Content */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-6xl bg-[#FFF2EC] overflow-hidden shadow-2xl rounded-sm max-h-[90vh] flex flex-col"
              >
                 
                 {/* Modal Header */}
                 <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white shrink-0">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1a1a1a]">FORENSIC_TURNAROUND: GROUP 7</h3>
                      <p className="font-mono text-[10px] text-[#1a1a1a]/50 uppercase tracking-widest">[ DOMAIN_AUTHORITY_MIGRATION ]</p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-[#1a1a1a]" />
                    </button>
                 </div>

                 {/* Modal Body: The Slider & Terminal & Grid */}
                 <div className="flex-grow overflow-y-auto p-0">
                    <EvidenceVisual_Compare 
                      beforeLabel="OLD SITE (.COM)"
                      afterLabel="NEW AUTHORITY (.COM.AU)"
                    />
                    
                    {/* --- NEW TERMINAL LOG --- */}
                    <TerminalLog />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 bg-white border-t border-black/10">
                        <div>
                          <h4 className="font-bold text-[#E21E3F] mb-2 text-sm uppercase tracking-widest">The Problem</h4>
                          <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                            The client was using a generic <strong>.com</strong> domain with zero local SEO targeting. Google assumed they were a global software company, not a Sydney security firm.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#C5A059] mb-2 text-sm uppercase tracking-widest">The Fix</h4>
                          <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                            We migrated to <strong>.com.au</strong> and rebuilt the site on a high-speed Headless stack. We injected local schema ("Security Guards Sydney") to force Google to recognize the location.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F766E] mb-2 text-sm uppercase tracking-widest">The Result</h4>
                          <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                            <strong>94/100 PageSpeed</strong> score. Immediate increase in local inquiries. The site now loads instantly on mobile, securing jobs while competitors are still loading.
                          </p>
                        </div>
                    </div>
                 </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Feature_Group7;