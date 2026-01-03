
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface BentoGridProps {
  onServiceClick: (service: ServiceDetail) => void;
}

const TechnicalLabel: React.FC<{ active: boolean; text: string }> = ({ active, text }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (active) {
      setDisplayText("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prev => text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30); // Faster typing for technical feel
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [active, text]);
  
  return (
    <div className={`font-mono text-[8px] uppercase tracking-[0.1em] transition-colors duration-500 h-3 truncate ${active ? 'text-[#E21E3F]' : 'text-black/30'}`}>
      {displayText}
    </div>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ onServiceClick }) => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Auto-rotate on mobile only
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveId(prev => {
        const currentIndex = SERVICES.findIndex(s => s.id === prev);
        const nextIndex = (currentIndex + 1) % SERVICES.length;
        return SERVICES[nextIndex].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <section id="architecture" className="py-32 px-6 lg:px-12 bg-[#FFF2EC] border-t border-[#1a1a1a]/10">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* 1. HEADER (With Explanatory Copy) */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
            <span className="font-mono text-xs text-[#1a1a1a] tracking-[0.4em] mb-6 block uppercase font-bold">
              <span className="text-[#E21E3F]">/</span> PROCESS ARCHITECTURE
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-8">
              The 7 Pillars of <span className="italic text-[#C5A059]">Authority.</span>
            </h2>
            <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-2xl mx-auto">
              I don't just build websites. I treat your business as a single, connected engine. By linking your Marketing, Sales, and Operations into one synchronised flow, I eliminate the friction that burns out your people.
            </p>
        </div>

        {/* 2. TOP DISPLAY (Visualizer) */}
        <div className="relative w-full h-[400px] bg-[#1a1a1a] rounded-sm shadow-2xl overflow-hidden group border border-black/20 mb-12">
             <ViewportViz type={activeService.visualPrompt} />
             <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
             
             {/* Status Label */}
             <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
               <div className="w-2 h-2 rounded-full bg-[#E21E3F] animate-pulse shadow-[0_0_8px_#E21E3F]" />
               <span className="text-[10px] font-mono text-[#E21E3F] tracking-[0.3em] uppercase">
                 Active_Protocol // {activeService.id}
               </span>
             </div>

             {/* Content Overlay */}
             <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 pointer-events-none flex flex-col items-start justify-end h-full">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeService.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className="max-w-4xl pointer-events-auto"
                 >
                   <div className="mb-2 font-mono text-[9px] text-[#C5A059] uppercase tracking-widest">
                      [{activeService.systemGroup || 'SYSTEM_UNDEFINED'}]
                   </div>
                   <h3 className="text-white text-3xl md:text-5xl font-serif mb-4 leading-none tracking-tighter">
                      {activeService.title}
                   </h3>
                   <p className="text-white/70 text-base md:text-lg font-sans font-light leading-relaxed mb-8 max-w-xl hidden md:block">
                     {activeService.description}
                   </p>
                   
                   {/* THE GOLD BUTTON (With Slide-Up White Fill) */}
                   <button
                     onClick={() => onServiceClick(activeService)}
                     className="group relative px-8 py-4 bg-[#C5A059] text-[#1a1a1a] font-mono text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden"
                   >
                     {/* The Slide-Up Fill Layer (White) */}
                     <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                     
                     {/* The Content */}
                     <span className="relative z-10 flex items-center gap-3">
                        [ EXPLORE PILLAR ]
                        <LucideIcons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                     </span>
                   </button>

                 </motion.div>
               </AnimatePresence>
             </div>
        </div>

        {/* 3. BOTTOM GRID (7 Columns with System Grouping) */}
        <div className="relative">
          
          {/* SYSTEM BRACKETS (Desktop Visual Grouping) - HIDDEN ON MOBILE */}
          <div className="absolute inset-0 hidden lg:grid grid-cols-7 gap-2 -top-6 -bottom-4 pointer-events-none">
             {/* ACQUISITION (Cols 1-3) */}
             <div className="col-span-3 border-t border-x border-[#E21E3F]/20 bg-[#E21E3F]/5 relative rounded-t-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-2 font-mono text-[9px] text-[#E21E3F] uppercase tracking-widest font-bold">
                   SYS_01 [ ACQUISITION ]
                </div>
             </div>
             {/* VELOCITY (Cols 4-6) */}
             <div className="col-span-3 border-t border-x border-[#C5A059]/20 bg-[#C5A059]/5 relative rounded-t-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-2 font-mono text-[9px] text-[#C5A059] uppercase tracking-widest font-bold">
                   SYS_02 [ VELOCITY ]
                </div>
             </div>
             {/* INTELLIGENCE (Col 7) */}
             <div className="col-span-1 border-t border-x border-[#1a1a1a]/20 bg-[#1a1a1a]/5 relative rounded-t-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-2 font-mono text-[9px] text-[#1a1a1a] uppercase tracking-widest font-bold">
                   SYS_03
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 relative z-10">
            {SERVICES.map((service, idx) => {
              const isActive = activeId === service.id;
              const isHovered = hoveredId === service.id;
              
              return (
                <div 
                  key={service.id}
                  onMouseEnter={() => { setActiveId(service.id); setHoveredId(service.id); }}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onServiceClick(service)}
                  className={`relative p-4 border transition-all duration-300 cursor-pointer min-h-[160px] flex flex-col justify-between group rounded-sm overflow-hidden ${
                    isActive 
                      ? 'bg-[#1a1a1a] border-[#C5A059] shadow-xl -translate-y-2' 
                      : 'bg-white border-black/10 hover:border-black/30'
                  }`}
                >
                   <div className="flex justify-between items-start mb-2">
                     <span className={`text-[9px] font-mono font-bold tracking-widest block ${isActive ? 'text-[#C5A059]' : 'text-black/30'}`}>
                        0{idx + 1}
                     </span>
                     <LucideIcons.ArrowDownRight className={`w-3 h-3 ${isActive ? 'text-[#C5A059]' : 'text-black/20'}`} />
                   </div>

                   <div className="relative z-10">
                     <h4 className={`text-xs md:text-sm font-serif uppercase tracking-wider leading-tight mb-2 ${isActive ? 'text-white' : 'text-[#1a1a1a]'}`}>
                       {service.title}
                     </h4>
                     <TechnicalLabel active={isActive} text={service.technicalLabel} />
                   </div>
                   
                   {/* MOBILE PROGRESS BAR */}
                   {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#333] lg:hidden">
                         <motion.div 
                           initial={{ width: '0%' }}
                           animate={{ width: '100%' }}
                           transition={{ duration: 4, ease: "linear" }}
                           className="h-full bg-[#C5A059]"
                         />
                      </div>
                   )}

                   {/* DESKTOP ACTIVE BAR */}
                   {isActive && (
                      <motion.div layoutId="active-bar" className="hidden lg:block absolute bottom-0 left-0 h-[2px] bg-[#C5A059] w-full" />
                   )}

                   {/* LIVE WIRE (Hover Connector to Next Pillar) */}
                   {/* Only show if hovered, active, and not the last item */}
                   <AnimatePresence>
                     {isActive && idx < SERVICES.length - 1 && (
                       <motion.div 
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 10 }}
                         className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-50 items-center pointer-events-none"
                       >
                          <div className="w-4 h-[1px] bg-[#C5A059]" />
                          <LucideIcons.ChevronRight className="w-3 h-3 text-[#C5A059] -ml-1" />
                       </motion.div>
                     )}
                   </AnimatePresence>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
