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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)', scale: 0.98 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.5 } }
};

const textVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// 1. DEFINE DATA CONSTANT
const BLUEPRINT_SERVICE = {
  id: 'blueprint-architecture',
  title: 'Architecture of Growth',
  subtitle: '/// BLUEPRINT',
  description: 'Connect every pillar into one automated engine.',
  visualPrompt: 'neural', // This triggers the 3D Node Animation
  technicalLabel: 'SYSTEM ARCHITECTURE',
  systemGroup: 'INTEGRATION',
  features: []
};

const SystemPhases = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  
  // FIX 1: HOVER PERSISTENCE
  // We initialize activeService directly. We don't use 'hoveredService' anymore.
  // This ensures the last hovered item REMAINS active.
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeIndex = Math.abs(page % PHASES.length);
  const activePhase = PHASES[activeIndex];
  const currentServices = SERVICES.filter(s => s.systemGroup === activePhase.id);
  
  // Ensure we have a valid service to display when changing phases
  useEffect(() => {
    setActiveService(currentServices[0]);
  }, [activePhase.id]);

  const displayService = activeService || currentServices[0];

  const changePhase = (newIndex: number) => {
    setPage([newIndex, newIndex > activeIndex ? 1 : -1]);
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative min-h-screen flex flex-row lg:flex-col transition-colors duration-700 ${activePhase.bg}`}
    >
      {/* MOBILE SIDEBAR */}
      <aside className={`lg:hidden sticky top-0 h-screen w-14 shrink-0 flex flex-col items-center justify-center gap-10 z-[70] border-r backdrop-blur-xl transition-all duration-500 ${activePhase.sidebarText} ${activePhase.sidebarBorder} ${activePhase.sidebarBg}`}>
        {PHASES.map((phase, idx) => {
          const isActive = idx === activeIndex;
          const isUnvisited = idx > activeIndex;
          return (
            <button key={phase.id} onClick={() => changePhase(idx)} className="relative flex flex-col items-center gap-2">
              <motion.div 
                animate={isUnvisited ? { opacity: [0.4, 1, 0.4] } : { opacity: isActive ? 1 : 0.4 }}
                transition={isUnvisited ? { repeat: Infinity, duration: 2 } : {}}
                className={`font-mono text-xs font-bold ${activePhase.sidebarText}`}
              >
                0{idx + 1}
              </motion.div>
            </button>
          );
        })}
      </aside>

      <div className="flex-1 flex flex-col w-full">
        {/* HEADER */}
        <div className={`pt-24 pb-12 px-6 lg:pt-16 lg:pb-8 text-center max-w-4xl mx-auto ${activePhase.text}`}>
           <span className="font-mono text-xs tracking-[0.4em] mb-4 block uppercase font-bold opacity-60">/ THE SYSTEM</span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none tracking-tighter mb-6">7 Ways I Fix Your Business.</h2>
           <p className="font-sans text-base md:text-xl font-light opacity-70 leading-relaxed max-w-2xl mx-auto px-4">
              I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.
           </p>
        </div>

        {/* DESKTOP TIMELINE */}
        <header className="hidden lg:flex justify-center mb-10 pt-10">
           <div className="flex justify-between w-full max-w-4xl border-b border-current/10 pb-2">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIndex;
                const isUnvisited = idx > activeIndex;
                return (
                  <button 
                    key={phase.id} 
                    onClick={() => changePhase(idx)}
                    className={`relative flex items-center font-mono text-xs md:text-sm font-bold tracking-widest transition-all ${isActive ? 'opacity-100' : 'opacity-40'} ${activePhase.text}`}
                  >
                    <motion.span 
                      animate={isUnvisited ? { opacity: [0.4, 1, 0.4] } : {}}
                      transition={isUnvisited ? { repeat: Infinity, duration: 2 } : {}}
                    >
                      0{idx + 1} / {phase.title}
                    </motion.span>
                  </button>
                );
              })}
           </div>
        </header>

        {/* DASHBOARD AREA */}
        <main className="flex-1 px-6 lg:px-12 pb-24 w-full max-w-screen-2xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[600px]">
              
              {/* LEFT DISPLAY - MAIN CARD */}
              <div className="hidden lg:flex lg:col-span-6 flex-col">
                <div className={`relative flex-1 rounded-sm border shadow-2xl overflow-hidden flex flex-col transition-colors duration-500 ${activePhase.dark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
                  
                  {/* Visual Container */}
                  <div className="h-1/2 relative border-b border-current/5">
                    <div className="absolute top-6 left-6 z-20">
                      <div className={`font-mono text-[9px] uppercase tracking-[0.2em] font-medium opacity-50 ${activePhase.text}`}>
                        {displayService?.technicalLabel || '[ SYSTEM ARCHITECTURE ]'}
                      </div>
                    </div>
                    
                    <AnimatePresence mode="wait">
                        {/* FIX: Force 'neural' type and '#C5A059' color when Blueprint is active */}
                        <ViewportViz 
                          key={`viz-${displayService?.id}`} 
                          type={displayService?.id === 'blueprint-architecture' ? 'neural' : (displayService?.visualPrompt || activePhase.vizType)} 
                          color={
                            displayService?.id === 'blueprint-architecture' 
                              ? '#C5A059' 
                              : (activePhase.dark ? '#C5A059' : (activePhase.id === 'GET CLIENTS' ? '#E21E3F' : '#1a1a1a'))
                          } 
                        />
                    </AnimatePresence>
                  </div>

                  {/* Text Content */}
                  <div className={`p-8 flex-1 flex flex-col justify-between ${activePhase.text}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={displayService?.id}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <h3 className="font-serif text-3xl mb-2">{displayService?.title}</h3>
                            <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-4">{displayService?.subtitle}</p>
                            <p className="text-sm opacity-70 leading-relaxed line-clamp-4">{displayService?.description}</p>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* FIX 2: NEW STATIC CTA DISPLAY */}
                    <div className={`mt-auto pt-6 border-t ${activePhase.dark ? 'border-white/10' : 'border-black/5'}`}>
                        <div className="flex flex-col gap-3">
                             <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">
                                /// SYSTEM_INTEGRATION
                             </span>
                             <p className="font-sans text-xs opacity-60 leading-relaxed max-w-[90%]">
                                See how this pillar integrates with the full Revenue Engine or functions as a standalone module.
                             </p>
                             <button
                                onClick={() => { setSelectedService(displayService); setIsModalOpen(true); }}
                                className={`text-left font-mono text-xs font-bold uppercase tracking-widest mt-1 transition-colors duration-300
                                    ${activePhase.dark ? 'text-[#C5A059] hover:text-white' : 'text-[#E21E3F] hover:text-black'}
                                `}
                             >
                                [ EXPLORE PILLAR ]
                             </button>
                        </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT GRID - SERVICE LIST */}
              <motion.div 
                key={activePhase.id} 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
              >
                {currentServices.map((service, idx) => {
                  const isActive = displayService?.id === service.id;

                  return (
                    <motion.div
                      key={service.id}
                      variants={cardVariants}
                      // FIX 1: Update activeService on hover, but DON'T reset on leave
                      onMouseEnter={() => setActiveService(service)}
                      onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                      className={`relative border rounded-sm transition-all duration-500 ease-out group cursor-pointer flex flex-col
                        ${activePhase.dark ? 'bg-white/5' : 'bg-white'}
                        ${isActive 
                           ? (activePhase.dark 
                               ? 'border-[#C5A059] -translate-y-2 shadow-[0_0_30px_-10px_rgba(197,160,89,0.3)]' 
                               : 'border-[#E21E3F] -translate-y-2 shadow-xl')
                           : (activePhase.dark 
                               ? 'border-[#C5A059]/30 hover:border-[#C5A059] hover:-translate-y-2' 
                               : 'border-black/5 hover:border-[#E21E3F]/30 hover:-translate-y-2')
                        }
                        ${activePhase.dark ? 'text-white' : 'text-black'}
                      `}
                    >
                      {/* MOBILE TOP VISUALIZER */}
                      <div className="relative h-48 w-full border-b border-current/10 lg:hidden shrink-0 overflow-hidden bg-black/5">
                          <div className="absolute top-4 left-4 z-10">
                             <span className="font-mono text-[9px] uppercase tracking-widest opacity-50">
                               [ {service.subtitle || 'SYSTEM'} ]
                             </span>
                          </div>
                          <ViewportViz 
                             type={service.visualPrompt} 
                             color={activePhase.dark ? '#C5A059' : (activePhase.id === 'GET CLIENTS' ? '#E21E3F' : '#1a1a1a')} 
                          />
                      </div>

                      {/* CONTENT CONTAINER */}
                      <div className="p-6 flex flex-col flex-1 h-full min-h-[220px]">
                         
                         {/* TOP: NUMBER + ARROW */}
                         <div className="flex justify-between items-start mb-4">
                            <span className={`font-mono text-xs transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>0{idx + 1}</span>
                            <ArrowDownRight className={`w-4 h-4 transition-all duration-500 ${
                                isActive 
                                  ? `opacity-100 -rotate-90 ${activePhase.dark ? 'text-[#C5A059]' : 'text-[#E21E3F]'}`
                                  : `opacity-30 group-hover:opacity-100 group-hover:-rotate-90 ${activePhase.dark ? 'group-hover:text-[#C5A059]' : 'group-hover:text-[#E21E3F]'}`
                            }`} />
                         </div>

                         {/* MIDDLE: CONTENT */}
                         <div className="mb-auto relative z-10">
                            <h4 className={`font-serif text-2xl mb-3 leading-tight transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                              {service.title}
                            </h4>
                            <p className={`font-sans text-sm leading-relaxed transition-opacity duration-300 line-clamp-none ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                              {service.description}
                            </p>
                         </div>

                         {/* BOTTOM: CTA */}
                         <div className="mt-6 pt-4 border-t border-current/10 flex justify-start">
                            <span className={`
                              font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-300
                              ${isActive 
                                 ? (activePhase.dark ? 'text-white' : 'text-black') 
                                 : (activePhase.dark ? 'text-[#C5A059] group-hover:text-white' : 'text-[#E21E3F] group-hover:text-black')
                              }
                            `}>
                              [ EXPLORE PILLAR ]
                            </span>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* PREMIUM CTA CARD */}
                <motion.div 
                  variants={cardVariants}
                  // FIX: Use the Constant to ensure data (and the 'neural' prompt) is passed correctly
                  onMouseEnter={() => setActiveService(BLUEPRINT_SERVICE)}
                  onClick={() => window.location.href='/system'}
                  className={`relative p-6 bg-[#1a1a1a] border rounded-sm group cursor-pointer transition-all min-h-[250px] flex flex-col justify-between 
                    ${displayService?.id === 'blueprint-architecture'
                      ? 'border-[#C5A059] -translate-y-2 shadow-[0_0_30px_-10px_rgba(197,160,89,0.3)]' 
                      : (activePhase.dark ? 'border-[#C5A059] hover:-translate-y-1' : 'border-white/10 shadow-xl hover:-translate-y-1')
                    }
                  `}
                >
                  <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                    <ViewportViz type="neural" color="#C5A059" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                     <span className="font-mono text-xs text-white/50 block tracking-widest uppercase">/// BLUEPRINT</span>
                     <ArrowDownRight className={`w-4 h-4 text-[#C5A059] transition-transform duration-500 ${displayService?.id === 'blueprint-architecture' ? '-rotate-90' : 'group-hover:-rotate-90'}`} />
                  </div>

                  <div className="relative z-10 mb-auto">
                     <h4 className="font-serif text-2xl text-white mb-3 leading-tight">Architecture of Growth</h4>
                     <p className="font-sans text-sm text-white/60 line-clamp-none">Connect every pillar into one automated engine.</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="relative overflow-hidden bg-[#C5A059] text-[#1a1a1a] py-3 px-4 font-mono text-xs tracking-widest font-bold text-center uppercase">
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                      <span className="relative z-10 transition-colors duration-500">[ EXPLORE THE SYSTEM ]</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
        </main>
      </div>

      <Modal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onViewPillar={() => {}} 
        // FIX: PASSING THE ACTIVE PHASE COLORS
        theme={{
          bg: activePhase.bg,
          text: activePhase.text,
          accent: activePhase.accent,
          dark: activePhase.dark
        }}
      />
    </section>
  );
};

export default SystemPhases;
