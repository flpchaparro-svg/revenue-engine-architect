import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface BentoGridProps {
  onServiceClick: (service: ServiceDetail) => void;
}

const TechnicalLabel = ({ active, text, mobileMode }: { active: boolean; text: string; mobileMode?: boolean }) => (
  <div className={`font-mono text-[8px] uppercase tracking-[0.1em] h-3 truncate transition-colors duration-300 ${active || mobileMode ? 'text-[#E21E3F]' : 'text-black/30'}`}>
    {text}
  </div>
);

const BentoGrid: React.FC<BentoGridProps> = ({ onServiceClick }) => {
  // Desktop State
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  // Mobile State (Accordion) - Default to null (all closed)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <section id="architecture" className="py-24 lg:py-32 px-6 lg:px-12 bg-[#FFF2EC] border-t border-[#1a1a1a]/10">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
            <span className="font-mono text-xs text-[#1a1a1a] tracking-[0.4em] mb-6 block uppercase font-bold">
              <span className="text-[#E21E3F]">/</span> THE SYSTEM
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-8">
              7 Ways I Fix Your Business.
            </h2>
            <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-2xl mx-auto">
              I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.
            </p>
        </div>

        {/* =========================================
            DESKTOP VIEW (lg+) - THE DASHBOARD
           ========================================= */}
        <div className="hidden lg:block">
            {/* TOP ACTIVE DISPLAY */}
            <div className="relative w-full h-[400px] bg-[#1a1a1a] rounded-sm shadow-2xl overflow-hidden mb-4 group">
                <div className="absolute inset-0">
                    <ViewportViz type={activeService.visualPrompt} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-12 z-20 flex flex-col items-start justify-end h-full pointer-events-none">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={activeService.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.2 }}
                       className="max-w-4xl pointer-events-auto"
                     >
                       <div className="mb-2 font-mono text-[9px] text-[#C5A059] uppercase tracking-widest">
                          [{activeService.systemGroup}]
                       </div>
                       <h3 className="text-white text-5xl font-serif mb-4 leading-none tracking-tighter">
                          {activeService.title}
                       </h3>
                       <p className="text-white/70 text-lg font-sans font-light leading-relaxed mb-6 max-w-xl">
                         {activeService.description}
                       </p>
                       <button 
                         onClick={() => onServiceClick(activeService)}
                         className="group relative px-6 py-3 bg-[#C5A059] text-[#1a1a1a] font-mono text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden"
                       >
                         <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                         <span className="relative z-10 flex items-center gap-3">
                            [ SEE HOW IT WORKS ]
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                         </span>
                       </button>
                     </motion.div>
                   </AnimatePresence>
                </div>
            </div>

            {/* BOTTOM NAV GRID */}
            <div className="grid grid-cols-7 gap-2">
                {SERVICES.map((service, idx) => {
                  const isActive = activeId === service.id;
                  return (
                    <div 
                      key={service.id}
                      onMouseEnter={() => setActiveId(service.id)}
                      onClick={() => onServiceClick(service)}
                      className={`
                        relative p-4 border transition-all duration-300 cursor-pointer min-h-[160px] flex flex-col justify-between group rounded-sm overflow-hidden
                        ${isActive ? 'bg-[#1a1a1a] border-[#C5A059] shadow-xl -translate-y-2' : 'bg-white border-black/10 hover:border-black/30'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[9px] font-mono font-bold tracking-widest ${isActive ? 'text-[#C5A059]' : 'text-black/30'}`}>0{idx + 1}</span>
                      </div>
                      <div>
                        <h4 className={`text-sm font-serif uppercase tracking-wider mb-2 ${isActive ? 'text-white' : 'text-[#1a1a1a]'}`}>{service.title}</h4>
                        <TechnicalLabel active={isActive} text={service.technicalLabel} />
                      </div>
                      {isActive && <motion.div layoutId="active-desktop" className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]" />}
                    </div>
                  );
                })}
            </div>
        </div>

        {/* =========================================
            MOBILE VIEW (< lg) - THE ACCORDION
           ========================================= */}
        <div className="lg:hidden flex flex-col gap-2">
            {SERVICES.map((service, idx) => {
               const isExpanded = expandedId === service.id;
               
               return (
                 <motion.div
                   key={service.id}
                   initial={false}
                   animate={{ 
                     backgroundColor: isExpanded ? '#1a1a1a' : '#ffffff',
                     borderColor: isExpanded ? '#C5A059' : 'rgba(0,0,0,0.1)'
                   }}
                   onClick={() => setExpandedId(isExpanded ? null : service.id)}
                   className={`border rounded-sm overflow-hidden relative cursor-pointer`}
                 >
                    {/* EXPANDED BACKGROUND VIZ */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-0"
                        >
                           <ViewportViz type={service.visualPrompt} />
                           <div className="absolute inset-0 bg-[#1a1a1a]/80" /> {/* Dimmer */}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CONTENT */}
                    <div className="relative z-10 p-6">
                       <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-4">
                             <span className={`text-[9px] font-mono font-bold tracking-widest ${isExpanded ? 'text-[#C5A059]' : 'text-black/30'}`}>
                               0{idx + 1}
                             </span>
                             <h4 className={`text-sm font-serif uppercase tracking-wider ${isExpanded ? 'text-white' : 'text-[#1a1a1a]'}`}>
                               {service.title}
                             </h4>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#C5A059]' : 'text-black/30'}`} />
                       </div>

                       <AnimatePresence>
                         {isExpanded && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden"
                           >
                              <p className="text-white/70 text-sm font-sans font-light leading-relaxed mb-6">
                                {service.description}
                              </p>
                              <div className="flex justify-between items-end">
                                 <TechnicalLabel active={true} text={service.technicalLabel} mobileMode={true} />
                                 <button 
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     onServiceClick(service);
                                   }}
                                   className="px-4 py-2 bg-[#C5A059] text-[#1a1a1a] font-mono text-[9px] uppercase tracking-widest font-bold flex items-center gap-2"
                                 >
                                   EXPLORE <ArrowRight className="w-3 h-3" />
                                 </button>
                              </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                 </motion.div>
               );
            })}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
