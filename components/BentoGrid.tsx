import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface BentoGridProps {
  onServiceClick: (service: ServiceDetail) => void;
}

// --- CONFIG: COLOR THEMES PER SYSTEM ---
const SYSTEM_STYLES: Record<string, {
  // Card Styles
  cardBg: string;
  cardBorder: string;
  cardText: string; // Title text on small cards
  accent: string;   // Numbers and icons
  // Display Styles
  displayBg: string;
  displayTitle: string; // Main H3 on Display
  displayDesc: string;  // Paragraph on Display
  displayBorder: string;
  // Interactive Elements
  indicatorColor: string; // The color code (hex/class) for bars/dots
  buttonBorder: string;
  buttonText: string;
  buttonHoverBg: string;
  buttonHoverText: string;
}> = {
  'ACQUISITION_SYS': {
    // RED THEME (Pillars 1, 2, 3)
    cardBg: 'bg-[#1a1a1a]', 
    cardBorder: 'border-[#E21E3F]/30',
    cardText: 'text-white', 
    accent: 'text-[#E21E3F]', // Unified Red for numbers/icons
    
    // Display Box
    displayBg: 'bg-[#1a1a1a]', 
    displayTitle: 'text-white', 
    displayDesc: 'text-white/80', 
    displayBorder: 'border-[#E21E3F]/50',
    
    // Elements
    indicatorColor: 'bg-[#E21E3F]',
    // BUTTON: Gold Fill Default -> White Hover
    buttonBorder: 'border-[#C5A059] bg-[#C5A059]', 
    buttonText: 'text-[#1a1a1a]', 
    buttonHoverBg: 'bg-white',
    buttonHoverText: 'group-hover:text-[#1a1a1a]'
  },
  'VELOCITY_SYS': {
    // GOLD THEME (Pillars 4, 5, 6)
    cardBg: 'bg-[#1a1a1a]',
    cardBorder: 'border-[#C5A059]/30',
    cardText: 'text-white', 
    accent: 'text-[#C5A059]', // Unified Gold
    
    // Display Box
    displayBg: 'bg-[#1a1a1a]', 
    displayTitle: 'text-white', 
    displayDesc: 'text-white/80', 
    displayBorder: 'border-[#C5A059]/50',
    
    // Elements
    indicatorColor: 'bg-[#C5A059]',
    // BUTTON: Gold Fill Default -> White Hover
    buttonBorder: 'border-[#C5A059] bg-[#C5A059]', 
    buttonText: 'text-[#1a1a1a]', 
    buttonHoverBg: 'bg-white',
    buttonHoverText: 'group-hover:text-[#1a1a1a]'
  },
  'INTELLIGENCE_SYS': {
    // WHITE THEME (Pillar 7)
    cardBg: 'bg-[#1a1a1a]',
    cardBorder: 'border-white/20',
    cardText: 'text-white',
    accent: 'text-white', // White for numbers/icons
    
    // Display Box
    displayBg: 'bg-[#1a1a1a]', 
    displayTitle: 'text-white', 
    displayDesc: 'text-white/80', 
    displayBorder: 'border-white/40',
    
    // Elements
    indicatorColor: 'bg-white',
    // BUTTON: Gold Fill Default -> White Hover
    buttonBorder: 'border-[#C5A059] bg-[#C5A059]',
    buttonText: 'text-[#1a1a1a]',
    buttonHoverBg: 'bg-white',
    buttonHoverText: 'group-hover:text-[#1a1a1a]'
  }
};

// Map current systemGroup names to GitHub style
const mapSystemGroup = (group: string): string => {
  if (group === 'GET CLIENTS') return 'ACQUISITION_SYS';
  if (group === 'SCALE FASTER') return 'VELOCITY_SYS';
  if (group === 'SEE CLEARLY') return 'INTELLIGENCE_SYS';
  return 'ACQUISITION_SYS'; // Default
};

const TechnicalLabel: React.FC<{ active: boolean; text: string; accentColor: string }> = ({ active, text, accentColor }) => {
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
      }, 30); 
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [active, text]);
  
  return (
    <div className={`font-mono text-[8px] uppercase tracking-[0.1em] transition-opacity duration-500 h-3 truncate ${accentColor} ${active ? 'opacity-100' : 'opacity-50'}`}>
      {displayText}
    </div>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ onServiceClick }) => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];
  const activeSystemGroup = mapSystemGroup(activeService.systemGroup || 'GET CLIENTS');
  const activeStyle = SYSTEM_STYLES[activeSystemGroup] || SYSTEM_STYLES['ACQUISITION_SYS'];

  // Calculate Viz Color based on system
  const getVizColor = (group: string) => {
      const mapped = mapSystemGroup(group);
      if (mapped === 'ACQUISITION_SYS') return '#E21E3F'; // Red
      if (mapped === 'VELOCITY_SYS') return '#C5A059';   // Gold
      return '#FFFFFF'; // White for Intelligence
  };

  return (
    <section id="architecture" className="py-32 px-6 lg:px-12 bg-[#FFF2EC] border-t border-[#1a1a1a]/10">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* 1. HEADER - Keep your existing copy */}
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

        {/* 2. DESKTOP TOP DISPLAY (Visualizer) - HIDDEN ON MOBILE/TABLET */}
        <div 
          onClick={() => onServiceClick(activeService)}
          className={`hidden lg:block relative w-full h-[450px] rounded-sm shadow-2xl overflow-hidden group border mb-12 transition-colors duration-500 cursor-pointer ${activeStyle.displayBg} ${activeStyle.displayBorder}`}
        >
             
             {/* Display Loading Bar (Top) */}
             <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-30">
               <motion.div 
                 key={activeService.id} // Key forces reset on change
                 initial={{ width: '0%' }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 4, ease: "linear" }}
                 className={`h-full ${activeStyle.indicatorColor} shadow-[0_0_10px_currentColor]`}
               />
             </div>

             <ViewportViz type={activeService.visualPrompt} color={getVizColor(activeService.systemGroup || 'GET CLIENTS')} />
             
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
                   <div className={`mb-2 font-mono text-[9px] uppercase tracking-widest ${activeStyle.accent} opacity-80`}>
                      [{activeService.systemGroup || 'SYSTEM_UNDEFINED'}]
                   </div>
                   <h3 className={`text-3xl md:text-5xl font-serif mb-4 leading-none tracking-tighter ${activeStyle.displayTitle}`}>
                      {activeService.title}
                   </h3>
                   <p className={`text-base md:text-lg font-sans font-light leading-relaxed mb-8 max-w-xl hidden md:block ${activeStyle.displayDesc}`}>
                     {activeService.description}
                   </p>
                   
                   {/* DESKTOP BUTTON */}
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       onServiceClick(activeService);
                     }}
                     className={`group relative px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden border transition-colors ${activeStyle.buttonBorder} ${activeStyle.buttonText}`}
                   >
                     <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1) ${activeStyle.buttonHoverBg}`} />
                     <span className={`relative z-10 flex items-center gap-3 transition-colors ${activeStyle.buttonHoverText}`}>
                        [ SEE HOW IT WORKS ]
                        <LucideIcons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                     </span>
                   </button>

                 </motion.div>
               </AnimatePresence>
             </div>
        </div>

        {/* 3. GRID (7 Cards) - ADAPTIVE LAYOUT */}
        <div className="relative">
          
          {/* SYSTEM BRACKETS (Desktop Visual Grouping) */}
          <div className="absolute inset-0 hidden lg:grid grid-cols-7 gap-2 -top-6 -bottom-4 pointer-events-none">
             {/* ACQUISITION (Cols 1-3) */}
             <div className="col-span-3 border-t border-x border-[#E21E3F]/20 bg-[#E21E3F]/5 relative rounded-t-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-2 font-mono text-[9px] text-[#E21E3F] uppercase tracking-widest font-bold">
                   SYS_01 [ GET CLIENTS ]
                </div>
             </div>
             {/* VELOCITY (Cols 4-6) */}
             <div className="col-span-3 border-t border-x border-[#C5A059]/20 bg-[#C5A059]/5 relative rounded-t-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-2 font-mono text-[9px] text-[#C5A059] uppercase tracking-widest font-bold">
                   SYS_02 [ SCALE FASTER ]
                </div>
             </div>
             {/* INTELLIGENCE (Col 7) */}
             <div className="col-span-1 border-t border-x border-[#1a1a1a]/20 bg-[#1a1a1a]/5 relative rounded-t-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-2 font-mono text-[9px] text-[#1a1a1a] uppercase tracking-widest font-bold">
                   SYS_03 [ SEE CLEARLY ]
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-2 relative z-10">
            {SERVICES.map((service, idx) => {
              const isActive = activeId === service.id;
              
              const sysGroup = mapSystemGroup(service.systemGroup || 'GET CLIENTS');
              const style = SYSTEM_STYLES[sysGroup];

              return (
                <div 
                  key={service.id}
                  onMouseEnter={() => { setActiveId(service.id); setHoveredId(service.id); }}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onServiceClick(service)}
                  className={`
                    relative transition-all duration-300 cursor-pointer flex flex-col justify-end group rounded-sm overflow-hidden border
                    ${style.cardBg} ${style.cardBorder}
                    ${isActive ? 'shadow-2xl -translate-y-2 z-10 scale-[1.02] border-opacity-100' : 'hover:brightness-110 hover:scale-[1.01] border-opacity-30'}
                    /* Heights for mobile vs desktop */
                    min-h-[500px] lg:min-h-[160px]
                  `}
                >
                   {/* =======================================================
                       MOBILE CONTENT (Visible < lg) - FULL DISPLAY STYLE
                   ======================================================= */}
                   <motion.div 
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true, margin: "-10%" }}
                     className="lg:hidden absolute inset-0 z-0 flex flex-col justify-end"
                   >
                       {/* MOBILE LOADING BAR - REMOVED ON MOBILE/TABLET FOR PERFORMANCE */}
                       
                       {/* Full Background Animation */}
                       <div className="absolute inset-0 z-0 opacity-100">
                           <ViewportViz type={service.visualPrompt} color={getVizColor(service.systemGroup || 'GET CLIENTS')} />
                           {/* Gradient Overlay for Text Readability - LIGHTER GRADIENT */}
                           <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />
                       </div>

                       {/* Content Layer */}
                       <div className="relative z-10 p-8 w-full flex flex-col items-start pb-12">
                           
                           {/* System Label - Animated */}
                           <motion.div 
                             initial={{ y: 20, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.5, delay: 0.1 }}
                             className={`mb-3 font-mono text-[9px] uppercase tracking-widest ${style.accent} opacity-90`}
                           >
                              [{service.systemGroup || 'SYSTEM_UNDEFINED'}]
                           </motion.div>

                           {/* Big Title - Animated */}
                           <motion.h3 
                             initial={{ y: 20, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                             className={`text-4xl font-serif mb-4 leading-none tracking-tighter text-white drop-shadow-md`}
                           >
                              {service.title}
                           </motion.h3>

                           {/* Description - Animated */}
                           <motion.p 
                             initial={{ y: 20, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.5, delay: 0.3 }}
                             className="text-sm font-sans font-light leading-relaxed mb-8 text-white/90 max-w-md drop-shadow-sm"
                           >
                             {service.description}
                           </motion.p>
                           
                           {/* Mobile Button - Gold at all times, no hover effects for performance */}
                           <motion.button
                             initial={{ y: 20, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.5, delay: 0.4 }}
                             whileTap={{ scale: 0.95 }}
                             onClick={(e) => {
                               e.stopPropagation();
                               onServiceClick(service);
                             }}
                             className={`px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] font-bold border w-full md:w-auto border-[#C5A059] bg-[#C5A059] text-[#1a1a1a]`}
                           >
                             <span className="flex items-center justify-center gap-3">
                                [ EXPLORE PILLAR ]
                                <LucideIcons.ArrowRight className="w-4 h-4" />
                             </span>
                           </motion.button>
                       </div>
                   </motion.div>

                   {/* =======================================================
                       DESKTOP CONTENT (Visible >= lg) - COMPACT CARD
                   ======================================================= */}
                   <div className="hidden lg:flex flex-col justify-between h-full relative z-10 p-4 w-full">
                       
                       <div className="flex justify-between items-start mb-2">
                         <span className={`text-[9px] font-mono font-bold tracking-widest block ${style.accent}`}>
                            0{idx + 1}
                         </span>
                         <LucideIcons.ArrowDownRight className={`w-3 h-3 ${style.accent} opacity-50 group-hover:opacity-100`} />
                       </div>

                       <div>
                         <h4 className={`text-xs md:text-sm font-serif uppercase tracking-wider leading-tight mb-2 ${style.cardText}`}>
                           {service.title}
                         </h4>
                         <TechnicalLabel active={isActive} text={service.technicalLabel} accentColor={style.accent} />
                       </div>
                       
                       {/* Hover Glow */}
                       <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none ${style.indicatorColor} z-20`} />
                   </div>

                   {/* Active Loading Bar - DESKTOP ONLY - MOVED TO ABSOLUTE BOTTOM */}
                   {isActive && (
                      <div className="hidden lg:block absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-30">
                         <motion.div 
                           key={activeId}
                           initial={{ width: '0%' }}
                           animate={{ width: '100%' }}
                           transition={{ duration: 4, ease: "linear" }}
                           className={`h-full ${style.indicatorColor}`}
                         />
                      </div>
                   )}

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
