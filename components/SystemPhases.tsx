import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';
import Modal from './Modal';

const PHASES = [
  { 
    id: 'GET CLIENTS', 
    title: 'GET CLIENTS', 
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: 'text-[#E21E3F]', 
    barColor: 'bg-[#E21E3F]',
    tabLine: 'bg-[#E21E3F]',
    vizType: 'geometric',
    dark: false,
    sidebarText: 'text-black',
    sidebarBorder: 'border-black/10',
    sidebarBg: 'bg-white/80'
  },
  { 
    id: 'SCALE FASTER', 
    title: 'SCALE FASTER', 
    bg: 'bg-[#1a1a1a]', 
    text: 'text-white', 
    accent: 'text-[#C5A059]', 
    barColor: 'bg-[#C5A059]',
    tabLine: 'bg-[#C5A059]',
    vizType: 'neural',
    dark: true,
    sidebarText: 'text-white',
    sidebarBorder: 'border-white/10',
    sidebarBg: 'bg-black/40'
  },
  { 
    id: 'SEE CLEARLY', 
    title: 'SEE CLEARLY', 
    bg: 'bg-[#f4f4f5]', 
    text: 'text-[#1a1a1a]', 
    accent: 'text-[#1a1a1a]', 
    barColor: 'bg-[#1a1a1a]',
    tabLine: 'bg-[#1a1a1a]',
    vizType: 'dashboard',
    dark: false,
    sidebarText: 'text-black',
    sidebarBorder: 'border-black/10',
    sidebarBg: 'bg-white/80'
  }
];

const SystemPhases = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredService, setHoveredService] = useState<ServiceDetail | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeIndex = Math.abs(page % PHASES.length);
  const activePhase = PHASES[activeIndex];
  const currentServices = SERVICES.filter(s => s.systemGroup === activePhase.id);
  const displayService = hoveredService || currentServices[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const dist = rect.bottom - window.innerHeight;
      setIsNearBottom(dist < 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changePhase = (newIndex: number) => {
    setPage([newIndex, newIndex > activeIndex ? 1 : -1]);
    setHoveredService(null);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative min-h-screen flex flex-row lg:flex-col transition-colors duration-700 ${activePhase.bg}`}
    >
      {/* MOBILE SIDEBAR - Enhanced Pulse */}
      <aside className={`lg:hidden sticky top-0 h-screen w-14 shrink-0 flex flex-col items-center justify-center gap-10 z-[70] border-r backdrop-blur-xl transition-all duration-500 ${activePhase.sidebarText} ${activePhase.sidebarBorder} ${activePhase.sidebarBg}`}>
        {PHASES.map((phase, idx) => {
          const isActive = idx === activeIndex;
          const isNext = idx === activeIndex + 1;
          
          return (
            <button key={phase.id} onClick={() => changePhase(idx)} className="relative flex flex-col items-center gap-2">
              <motion.div 
                // Enhanced pulse for unclicked phases
                animate={isNext ? { 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3] 
                } : { scale: isActive ? 1.5 : 1, opacity: isActive ? 1 : 0.3 }}
                transition={isNext ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.3 }}
                className={`font-mono text-xs font-bold ${activePhase.sidebarText}`}
              >
                0{idx + 1}
              </motion.div>
              {isActive && <motion.div layoutId="side-dot" className={`w-1 h-1 rounded-full ${phase.tabLine}`} />}
            </button>
          );
        })}
      </aside>

      <div className="flex-1 flex flex-col w-full">
        {/* HEADER - Synchronized with HomePage.tsx */}
        <div className={`pt-24 pb-12 px-6 lg:pt-16 lg:pb-8 text-center max-w-4xl mx-auto ${activePhase.text}`}>
           <span className="font-mono text-xs tracking-[0.4em] mb-4 block uppercase font-bold opacity-60">/ THE SYSTEM</span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none tracking-tighter mb-6">7 Ways I Fix Your Business.</h2>
        </div>

        {/* DESKTOP TIMELINE: "Attention" Indicator for Phases 2 & 3 */}
        <header className="hidden lg:flex justify-center mb-10 pt-10">
           <div className="flex justify-between w-full max-w-4xl border-b border-current/10 pb-2">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIndex;
                const isUnvisited = idx > activeIndex;

                return (
                  <button 
                    key={phase.id} 
                    onClick={() => changePhase(idx)}
                    className={`relative pb-2 font-mono text-sm font-bold tracking-widest transition-all ${activePhase.text}`}
                  >
                    <div className="flex items-center gap-2">
                      <motion.span 
                        animate={isUnvisited ? { opacity: [0.4, 1, 0.4] } : { opacity: isActive ? 1 : 0.4 }}
                        transition={isUnvisited ? { repeat: Infinity, duration: 2.5 } : {}}
                      >
                        0{idx + 1} / {phase.title}
                      </motion.span>
                      
                      {/* Small notification dot for Phases 2/3 to show they need to be clicked */}
                      {isUnvisited && (
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`w-1.5 h-1.5 rounded-full ${activePhase.barColor}`} 
                        />
                      )}
                    </div>
                    {isActive && <motion.div layoutId="activeTab" className={`absolute bottom-[-1px] left-0 right-0 h-[3px] ${phase.tabLine}`} />}
                  </button>
                );
              })}
           </div>
        </header>

        {/* DASHBOARD AREA - Harmonized Card Sizes */}
        <main className="flex-1 px-6 lg:px-12 pb-24 w-full max-w-screen-2xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[600px]">
              
              {/* LEFT DISPLAY */}
              <div className="hidden lg:flex lg:col-span-6 flex-col">
                <div className={`relative flex-1 rounded-sm border shadow-2xl overflow-hidden flex flex-col ${activePhase.dark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
                  <div className="h-1/2 relative border-b border-current/5">
                    {/* RESTORED EYEBROW LABEL */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className={`font-mono text-[9px] uppercase tracking-[0.2em] font-medium opacity-40 ${activePhase.text}`}>
                        {displayService?.technicalLabel || '[ SYSTEM ARCHITECTURE ]'}
                      </div>
                    </div>
                    
                    <ViewportViz 
                      key={`viz-${displayService?.id}`} 
                      type={displayService?.visualPrompt || activePhase.vizType} 
                      color={activePhase.dark ? '#C5A059' : (activePhase.id === 'GET CLIENTS' ? '#E21E3F' : '#1a1a1a')} 
                    />
                  </div>

                  <div className={`p-8 flex-1 flex flex-col justify-between ${activePhase.text}`}>
                    <div>
                      <h3 className="font-serif text-3xl mb-4 leading-tight">{displayService?.title}</h3>
                      <p className="text-sm opacity-70 leading-relaxed line-clamp-4">{displayService?.description}</p>
                    </div>
                    
                    <div className={`pt-6 border-t mt-auto ${activePhase.dark ? 'border-white/10' : 'border-black/5'}`}>
                      <button 
                        onClick={() => { setSelectedService(displayService); setIsModalOpen(true); }}
                        className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] font-bold transition-colors duration-300 ${
                          activePhase.id === 'SCALE FASTER' 
                            ? 'text-[#C5A059] hover:text-white' // Phase 2: Gold to White
                            : 'text-black hover:text-[#C5A059]'    // Phase 1 & 3: Black to Gold
                        }`}
                      >
                        [ EXPLORE PILLAR ]
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT GRID - Proportionally scaled cards */}
              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {currentServices.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    onMouseEnter={() => setHoveredService(service)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                    className={`relative p-6 border rounded-sm transition-all duration-300 group cursor-pointer min-h-[170px] flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1 ${
                      activePhase.dark 
                        ? 'border-[#C5A059]/30 hover:border-[#C5A059] text-white bg-white/5 hover:bg-white/10' 
                        : 'border-black/5 hover:border-[#E21E3F]/30 text-black bg-white hover:shadow-xl'
                    }`}
                  >
                    {/* MOBILE-ONLY VIZ */}
                    <div className="absolute inset-0 z-0 opacity-[0.08] lg:hidden pointer-events-none">
                      <ViewportViz type={service.visualPrompt} color={activePhase.dark ? '#C5A059' : '#E21E3F'} />
                    </div>

                    <div className="flex justify-between items-start relative z-10">
                      <span className="font-mono text-[10px] opacity-40">0{idx + 1}</span>
                      
                      {/* GHOST CAPTION: Appears Red on Hover */}
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#E21E3F] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        [ EXPLORE PILLAR ]
                      </span>
                      
                      <ArrowDownRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="font-serif text-xl mb-2">{service.title}</h4>
                      <p className="text-xs opacity-60 line-clamp-2">{service.description}</p>
                    </div>
                  </motion.div>
                ))}

                {/* PREMIUM CTA CARD - No arrows, no hover display update */}
                <div 
                  onClick={() => window.location.href='/system'}
                  className={`relative p-6 bg-[#1a1a1a] border rounded-sm group cursor-pointer transition-all hover:-translate-y-1 min-h-[170px] flex flex-col justify-between ${
                    activePhase.dark ? 'border-[#C5A059]' : 'border-white/10 shadow-xl'
                  }`}
                >
                  <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                    <ViewportViz type="neural" color="#C5A059" />
                  </div>
                  <span className="relative z-10 font-mono text-[10px] text-white/50 block tracking-widest uppercase">/// BLUEPRINT</span>
                  <div className="relative z-10">
                    <h4 className="font-serif text-xl text-white mb-2 leading-tight">Architecture of Growth</h4>
                    <p className="text-xs text-white/60 mb-4 line-clamp-2">Connect every pillar into one automated engine.</p>
                  </div>
                  <div className="bg-[#C5A059] text-[#1a1a1a] py-3 px-4 font-mono text-[10px] tracking-widest font-bold text-center uppercase transition-colors duration-300 hover:bg-white">
                    [ EXPLORE THE SYSTEM ]
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>

      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={() => {}} />
    </section>
  );
};

export default SystemPhases;
