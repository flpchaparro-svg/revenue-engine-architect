import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';
import CTAButton from './CTAButton';

// Added Prop Interface
interface SystemPhasesProps {
  onNavigate?: (view: string, id?: string) => void;
}

const PHASES = [
  { 
    id: 'GET CLIENTS', 
    title: 'GET CLIENTS', 
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: '#E21E3F', // Red
    accentClass: 'text-[#B91C36]',
    borderAccent: 'border-[#E21E3F]',
    vizType: 'geometric',
    dark: false
  },
  { 
    id: 'SCALE FASTER', 
    title: 'SCALE FASTER', 
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: '#C5A059', // Gold
    accentClass: 'text-[#8B6914]',
    borderAccent: 'border-[#C5A059]',
    vizType: 'neural',
    dark: false
  },
  { 
    id: 'SEE CLEARLY', 
    title: 'SEE CLEARLY', 
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: '#1a1a1a', // Black
    accentClass: 'text-[#1a1a1a]',
    borderAccent: 'border-[#1a1a1a]',
    vizType: 'dashboard',
    dark: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.5 } }
};

const textVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};


// SYSTEM CARD DATA
const SYSTEM_CARDS: Record<string, { 
  label: string; 
  title: string; 
  titleDisplay: string;
  subtitle: string;
  subtitleDisplay: string;
  smallCardBody: string;
  description: string;
}> = {
  'GET CLIENTS': {
    label: '/ GET CLIENTS',
    title: 'How These 3 Work Together',
    titleDisplay: 'How These 3 Work Together',
    subtitle: 'The Foundation',
    subtitleDisplay: 'The Foundation',
    smallCardBody: 'These three capture clients. But they work better when connected to everything else.',
    description: 'Your website captures leads. Your CRM tracks them. Automation follows up instantly. These three work together so nothing slips through. But they\'re just the start.',
  },
  'SCALE FASTER': {
    label: '/ SCALE FASTER',
    title: 'How These 3 Work Together',
    titleDisplay: 'How These 3 Work Together',
    subtitle: 'The Growth Layer',
    subtitleDisplay: 'The Growth Layer',
    smallCardBody: 'AI and content multiply your reach. But they need clean data from the first three pillars to work properly.',
    description: 'AI answers your phone at 2am. Content posts while you sleep. Training makes sure your team actually uses the tools. These three multiply your output without multiplying your headcount.',
  },
  'SEE CLEARLY': {
    label: '/ SEE CLEARLY',
    title: 'Where It All Comes Together',
    titleDisplay: 'Where It All Comes Together',
    subtitle: 'The Dashboard',
    subtitleDisplay: 'The Dashboard',
    smallCardBody: 'A dashboard is only as good as the data feeding it. When all 7 pillars are connected, you get one source of truth.',
    description: 'A dashboard is only as good as the data feeding it. When all 7 pillars are connected, you get one source of truth. No more conflicting spreadsheets.',
  },
};

const SystemPhases: React.FC<SystemPhasesProps> = ({ onNavigate }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [hoveredPhaseIdx, setHoveredPhaseIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const activeIndex = Math.abs(page % PHASES.length);
  const activePhase = PHASES[activeIndex];
  const currentServices = SERVICES.filter(s => s.systemGroup === activePhase.id);
  
  useEffect(() => {
    setActiveService(currentServices[0]);
  }, [activePhase.id]);

  const displayService = activeService || currentServices[0];
  const systemCard = SYSTEM_CARDS[activePhase.id];
  const isBlueprint = displayService?.id === 'system-overview' || displayService?.id === 'blueprint-architecture';
  
  const getDisplayTitle = (title: string) => {
    return title.split(' & ').map(word => 
      word.split(' ').map(w => {
        if (w.toUpperCase() === 'AI') return 'AI';
        return w.charAt(0) + w.slice(1).toLowerCase();
      }).join(' ')
    ).join(' & ');
  };

  const changePhase = (newIndex: number) => {
    setPage([newIndex, newIndex > activeIndex ? 1 : -1]);
    
    if (window.innerWidth < 1024 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCardClick = (service: ServiceDetail | any) => {
    if (!onNavigate) return;
    // All cards now navigate to /system to force consideration stage
    onNavigate('system');
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative min-h-screen flex flex-row lg:flex-col transition-colors duration-700 ${activePhase.bg}`}
    >
      {/* MOBILE SIDEBAR */}
      <aside className="lg:hidden sticky top-0 h-screen w-14 shrink-0 flex flex-col items-center justify-center gap-8 z-[70] border-r border-[#1a1a1a]/10 bg-white/95 backdrop-blur-xl">
        {PHASES.map((phase, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <button key={phase.id} onClick={() => changePhase(idx)} className="relative flex items-center justify-center w-10 h-10 group">
              <div 
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: phase.accent }}
              />
              <span 
                className={`font-mono text-xs font-bold transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-30'}`}
                style={{ color: isActive ? phase.accent : '#1a1a1a' }}
              >
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="flex-1 flex flex-col w-full">
        {/* HEADER */}
        <div className={`pt-24 pb-12 px-6 lg:pt-16 lg:pb-8 text-center max-w-4xl mx-auto ${activePhase.text}`}>
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7A5D12] mb-4 block">/ THE SYSTEM</span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none tracking-tighter mb-6">
             7 Pillars. <span className="italic text-[#8B6914]">3 Outcomes.</span>
           </h2>
           <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto px-4">
              I don't sell isolated tools. I build connected systems. Websites feed your CRM. Your CRM triggers automation. Dashboards show you what's working. Everything talks to everything else.
           </p>
        </div>

        {/* DESKTOP TIMELINE */}
        <header className="hidden lg:flex justify-center mb-10 pt-6">
           <div className="flex gap-0 bg-white border border-[#1a1a1a]/10 p-1 shadow-sm">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIndex;
                // FIX: Check if phase 3 (Black) to invert text color when active
                const isBlackPhase = phase.id === 'SEE CLEARLY'; 
                
                return (
                    <button 
                      key={phase.id} 
                      onClick={() => changePhase(idx)}
                      onMouseEnter={() => setHoveredPhaseIdx(idx)}
                      onMouseLeave={() => setHoveredPhaseIdx(null)}
                      className={`relative px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#1a1a1a] text-white' 
                          : 'text-[#1a1a1a]/50 hover:bg-[#1a1a1a]/5'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {/* Number always uses accent color, text changes to accent on hover */}
                        <span 
                          style={{ 
                            color: isActive ? 'inherit' : phase.accent
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span className="hidden xl:inline">/</span>
                        <span 
                          className="hidden xl:inline"
                          style={{
                            color: isActive 
                              ? 'inherit' 
                              : (hoveredPhaseIdx === idx ? phase.accent : 'rgba(26, 26, 26, 0.5)')
                          }}
                        >
                          {phase.id}
                        </span>
                      </span>
                      {isActive && (
                        <motion.div 
                          layoutId="phase-indicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px]"
                          style={{ backgroundColor: phase.accent }}
                        />
                      )}
                    </button>
                );
              })}
           </div>
        </header>

        {/* DASHBOARD AREA */}
        <main className="flex-1 px-6 lg:px-12 pb-24 w-full max-w-screen-2xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[600px]">
              
              {/* LEFT DISPLAY */}
              <div className="hidden lg:flex lg:col-span-6 flex-col">
                {(() => {
                  const isBlueprint = displayService?.id === 'system-overview' || displayService?.id === 'blueprint-architecture';
                  return (
                    <div className={`relative flex-1 overflow-hidden flex flex-col transition-all duration-500 
                      ${isBlueprint 
                        ? 'bg-[#1a1a1a] text-white border-l-4' 
                        : 'bg-white text-[#1a1a1a] border border-[#1a1a1a]/10'
                      }`}
                      style={{ borderLeftColor: isBlueprint ? '#C5A059' : activePhase.accent }}
                    >
                      {!isBlueprint && (
                        <div className="h-1/2 relative border-b border-[#1a1a1a]/5 bg-[#FAFAFA]">
                          <div className="absolute top-6 left-6 z-20">
                            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                              0{activeIndex + 1} / {activePhase.title}
                            </div>
                          </div>
                          
                          <AnimatePresence mode="wait">
                              <ViewportViz 
                                key={`viz-${displayService?.id}`} 
                                type={displayService?.visualPrompt || activePhase.vizType} 
                                color={activePhase.accent} 
                              />
                          </AnimatePresence>
                        </div>
                      )}

                      <div className={`p-10 flex-1 flex flex-col justify-between ${isBlueprint ? 'justify-center py-16' : ''}`}>
                        <AnimatePresence mode="wait">
                            {(() => {
                              const displayData = isBlueprint 
                                ? { 
                                    id: systemCard.title, 
                                    title: systemCard.titleDisplay, 
                                    subtitle: systemCard.subtitleDisplay, 
                                    description: systemCard.description,
                                  }
                                : { 
                                    id: displayService?.id, 
                                    title: getDisplayTitle(displayService?.title || ''), 
                                    subtitle: displayService?.subtitle, 
                                    description: displayService?.description 
                                  };
                              
                              return (
                                <motion.div
                                    key={displayData?.id}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-6" 
                                       style={{ color: isBlueprint ? '#C5A059' : activePhase.accent }}>
                                      {isBlueprint ? systemCard.label : `/ ${displayService?.subtitle || 'SERVICE'}`}
                                    </p>
                                    
                                    <h3 className={`font-serif mb-4 leading-[0.95] tracking-tighter ${isBlueprint ? 'text-5xl lg:text-6xl' : 'text-4xl md:text-5xl'}`}
                                        style={{ color: isBlueprint ? '#C5A059' : 'inherit' }}>
                                        {displayData?.title}
                                    </h3>
                                    
                                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                                       style={{ color: isBlueprint ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,26,0.4)' }}>
                                        {displayData?.subtitle}
                                    </p>
                                    
                                    <p className={`font-sans text-lg font-light leading-relaxed ${isBlueprint ? 'text-white/70' : 'text-[#1a1a1a]/70'}`}>
                                        {displayData?.description}
                                    </p>
                                </motion.div>
                              );
                            })()}
                        </AnimatePresence>
                        
                        <div className={`mt-auto pt-8 border-t ${isBlueprint ? 'border-white/10' : 'border-[#1a1a1a]/10'}`}>
                             {isBlueprint ? (
                                 <CTAButton 
                                    theme="dark"
                                    onClick={() => {
                                      const systemCardService = {
                                        id: 'system-overview',
                                        title: systemCard.title,
                                        subtitle: systemCard.subtitle,
                                        description: systemCard.description,
                                        technicalLabel: systemCard.label,
                                      };
                                      handleCardClick(systemCardService as any);
                                    }}
                                    className="w-full"
                                 >
                                    [ EXPLORE THE SYSTEM ]
                                 </CTAButton>
                             ) : (
                                 <CTAButton
                                    variant="bracket"
                                    theme="light"
                                    onClick={() => onNavigate && onNavigate('system')}
                                 >
                                    VIEW DETAILS
                                 </CTAButton>
                             )}
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* RIGHT GRID - SERVICE LIST */}
              <motion.div 
                key={activePhase.id} 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5"
              >
                {currentServices.map((service, idx) => {
                  const isActive = displayService?.id === service.id;

                  return (
                    <motion.div
                      key={service.id}
                      variants={cardVariants}
                      onMouseEnter={() => setActiveService(service)}
                      onClick={() => handleCardClick(service)}
                      className={`relative bg-white border transition-all duration-300 group cursor-pointer flex flex-col
                        ${isActive 
                           ? 'border-l-4 shadow-lg' 
                           : 'border-[#1a1a1a]/10 hover:border-l-4 hover:shadow-md'
                        }
                      `}
                      style={{ 
                        borderLeftColor: isActive ? activePhase.accent : 'transparent',
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderLeftColor = activePhase.accent;
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderLeftColor = 'transparent';
                        }
                      }}
                    >
                      <div className="relative h-40 w-full border-b border-[#1a1a1a]/5 lg:hidden shrink-0 overflow-hidden bg-[#FAFAFA]">
                          <div className="absolute top-4 left-4 z-10">
                             <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                               {service.subtitle || 'SERVICE'}
                             </span>
                          </div>
                          <ViewportViz 
                             type={service.visualPrompt} 
                             color={activePhase.accent} 
                          />
                      </div>

                      <div className="p-6 flex flex-col flex-1 h-full min-h-[200px]">
                         
                         <div className="flex justify-between items-center mb-4">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                                  style={{ color: isActive ? activePhase.accent : 'rgba(26,26,26,0.3)' }}>
                              0{idx + 1}
                            </span>
                            <ArrowDownRight 
                              className={`w-4 h-4 transition-all duration-300 ${
                                isActive ? '-rotate-90' : 'group-hover:-rotate-90'
                              }`}
                              style={{ color: isActive ? activePhase.accent : 'rgba(26,26,26,0.2)' }}
                            />
                         </div>

                         <div className="mb-auto">
                            <h4 className="font-serif text-xl md:text-2xl text-[#1a1a1a] mb-2 leading-tight tracking-tight">
                              {getDisplayTitle(service.title)}
                            </h4>
                            
                            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
                               style={{ color: activePhase.accent }}>
                              {service.subtitle}
                            </p>
                            
                            <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]/80">
                              <span className="lg:hidden">{service.description}</span>
                              <span className="hidden lg:inline">{service.smallCardBody || service.description}</span>
                            </p>
                         </div>

                         <div className="mt-6 pt-4 border-t border-[#1a1a1a]/5 flex justify-start">
                            <CTAButton
                              variant="bracket"
                              size="sm"
                              theme="light"
                              onClick={() => onNavigate && onNavigate('system', service.id)}
                            >
                              VIEW DETAILS
                            </CTAButton>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}

                {(() => {
                  const systemCardData = SYSTEM_CARDS[activePhase.id];
                  const isBlueprint = displayService?.id === 'system-overview' || displayService?.id === 'blueprint-architecture';
                  const systemCardService = {
                    id: 'system-overview',
                    title: systemCardData.title,
                    subtitle: systemCardData.subtitle,
                    description: systemCardData.description,
                    technicalLabel: systemCardData.label,
                  };
                  return (
                    <motion.div 
                      variants={cardVariants}
                      onMouseEnter={() => setActiveService(systemCardService as any)}
                      onClick={() => handleCardClick(systemCardService as any)}
                      className={`relative bg-[#1a1a1a] border-l-4 border-[#C5A059] group cursor-pointer transition-all duration-300 min-h-[200px] flex flex-col
                        ${isBlueprint ? 'shadow-lg' : 'hover:shadow-lg'}
                      `}
                    >
                      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <ViewportViz type="neural" color="#C5A059" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1 relative z-10">
                        <div className="flex justify-between items-center mb-4">
                           <span className="font-mono text-[10px] font-bold text-[#8B6914] tracking-[0.2em] uppercase">
                             {systemCardData.label}
                           </span>
                           <ArrowDownRight className={`w-4 h-4 text-[#8B6914] transition-transform duration-300 ${isBlueprint ? '-rotate-90' : 'group-hover:-rotate-90'}`} />
                        </div>

                        <div className="mb-auto">
                           <h4 className="font-serif text-xl md:text-2xl text-white mb-2 leading-tight tracking-tight">
                             {systemCardData.title}
                           </h4>
                           <p className="font-mono text-[10px] text-[#8B6914] mb-4 uppercase tracking-[0.2em] font-bold">
                             {systemCardData.subtitle}
                           </p>
                           <p className="font-sans text-sm text-white/50 leading-relaxed">
                             <span className="lg:hidden">{systemCardData.description}</span>
                             <span className="hidden lg:inline">{systemCardData.smallCardBody}</span>
                           </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10">
                          <CTAButton 
                            variant="bracket"
                            size="sm"
                            theme="dark"
                            onClick={() => onNavigate && onNavigate('system')}
                          >
                            VIEW ALL PILLARS
                          </CTAButton>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </div>
        </main>
      </div>
    </section>
  );
};

export default SystemPhases;
