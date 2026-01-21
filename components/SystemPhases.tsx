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
    title: 'CAPTURE', // Clean label without underscore
    subtitle: 'Acquire & Convert',
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: '#E21E3F', // Red for Phase 1
    accentClass: 'text-[#E21E3F]',
    borderAccent: 'border-[#E21E3F]',
    vizType: 'geometric',
    dark: false,
    sidebarText: 'text-black',
    sidebarBorder: 'border-black/10',
    sidebarBg: 'bg-white/80'
  },
  { 
    id: 'SCALE FASTER', 
    title: 'MULTIPLY', // Clean label
    subtitle: 'Scale & Automate',
    bg: 'bg-[#FFF2EC]', // Changed to light background for cleaner look
    text: 'text-[#1a1a1a]', 
    accent: '#C5A059', // Gold for Phase 2
    accentClass: 'text-[#C5A059]',
    borderAccent: 'border-[#C5A059]',
    vizType: 'neural',
    dark: false, // Changed to light
    sidebarText: 'text-black',
    sidebarBorder: 'border-black/10',
    sidebarBg: 'bg-white/80'
  },
  { 
    id: 'SEE CLEARLY', 
    title: 'COMMAND', // Clean label
    subtitle: 'Visibility & Control',
    bg: 'bg-[#FFF2EC]', // Consistent light background
    text: 'text-[#1a1a1a]', 
    accent: '#1a1a1a', // Black for Phase 3
    accentClass: 'text-[#1a1a1a]',
    borderAccent: 'border-[#1a1a1a]',
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

// MOBILE TITLES - Shortened versions for mobile cards
const MOBILE_TITLES: Record<string, string> = {
  'WEBSITES & E-COMMERCE': 'Websites',
  'CRM & LEAD TRACKING': 'CRM',
  'AUTOMATION': 'Automation',
  'AI ASSISTANTS': 'AI Bots',
  'CONTENT SYSTEMS': 'Content',
  'TEAM TRAINING': 'Training',
  'DASHBOARDS & REPORTING': 'Dashboards',
};

// MOBILE DESCRIPTIONS - Shortened versions for mobile cards
const MOBILE_DESCRIPTIONS: Record<string, string> = {
  'pillar1': 'Sites that capture leads and sell, not just look pretty.',
  'pillar2': 'Track every lead, call, and deal. Nothing slips through.',
  'pillar3': 'Invoices, follow-ups, data entry on autopilot.',
  'pillar4': 'Answer calls and enquiries 24/7, even while you sleep.',
  'pillar5': 'One voice note becomes blog, socials, newsletter. Auto-published.',
  'pillar6': 'Short training that makes your team actually use the tools.',
  'pillar7': 'Revenue, margins, pipeline on one screen, live.',
};

// SYSTEM CARD DATA - Different copy for each group context
const SYSTEM_CARDS: Record<string, { 
  label: string; 
  labelMobile: string;
  title: string; 
  titleDisplay: string;
  titleMobile: string;
  subtitle: string;
  subtitleDisplay: string;
  smallCardBody: string;
  description: string;
  descriptionMobile: string;
}> = {
  'GET CLIENTS': {
    label: '/ ALL 7 PILLARS',
    labelMobile: '/ ALL 7',
    title: 'See the Full System',
    titleDisplay: 'The Complete System',
    titleMobile: 'Full System',
    subtitle: 'The Blueprint',
    subtitleDisplay: 'The Blueprint',
    smallCardBody: 'These three get you clients. But there\'s more under the hood.',
    description: 'Websites, CRM, and Automation capture leads. But the system goes further: AI that answers your phone, content that posts itself, dashboards that show you the truth. See how all seven connect.',
    descriptionMobile: 'These three are just the start. See all seven pillars.',
  },
  'SCALE FASTER': {
    label: '/ ALL 7 PILLARS',
    labelMobile: '/ ALL 7',
    title: 'See the Full System',
    titleDisplay: 'The Complete System',
    titleMobile: 'Full System',
    subtitle: 'The Blueprint',
    subtitleDisplay: 'The Blueprint',
    smallCardBody: 'AI and content scale you. But they work better when connected to everything else.',
    description: 'These pillars multiply your output, but they\'re not standalone. Your website feeds the CRM, the CRM triggers the automation, the dashboard shows what\'s working. See the full loop.',
    descriptionMobile: 'AI and content work better connected to everything else.',
  },
  'SEE CLEARLY': {
    label: '/ ALL 7 PILLARS',
    labelMobile: '/ ALL 7',
    title: 'See the Full System',
    titleDisplay: 'The Complete System',
    titleMobile: 'Full System',
    subtitle: 'The Blueprint',
    subtitleDisplay: 'The Blueprint',
    smallCardBody: 'A dashboard is only as good as the data feeding it. Garbage in, garbage out.',
    description: 'Clean dashboards need clean data. When your website, CRM, automation, and AI are all connected, you get one source of truth. No more conflicting spreadsheets. See how the entire system works together.',
    descriptionMobile: 'Dashboards need clean data. See how all seven connect.',
  },
};

const SystemPhases: React.FC<SystemPhasesProps> = ({ onNavigate }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
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
  
  // Helper to convert title case for display box (e.g., "WEBSITES & E-COMMERCE" -> "Websites & E-commerce")
  // Special handling for "AI" to keep it fully capitalized
  const getDisplayTitle = (title: string) => {
    return title.split(' & ').map(word => 
      word.split(' ').map(w => {
        // Keep "AI" fully capitalized
        if (w.toUpperCase() === 'AI') return 'AI';
        return w.charAt(0) + w.slice(1).toLowerCase();
      }).join(' ')
    ).join(' & ');
  };

  const changePhase = (newIndex: number) => {
    setPage([newIndex, newIndex > activeIndex ? 1 : -1]);
    
    // FIX: Scroll to top of section on mobile when changing phases
    if (window.innerWidth < 1024 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // FIX: Using app navigation instead of window reload
  const handleCardClick = (service: ServiceDetail | any) => {
    if (!onNavigate) return; // Safety check
    
    if (service.id === 'system-overview' || service.id === 'blueprint-architecture') {
      onNavigate('system');
    } else {
      // Service IDs are already 'pillar1', 'pillar2', etc., which match the routeMap keys
      onNavigate(service.id);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative min-h-screen flex flex-row lg:flex-col transition-colors duration-700 ${activePhase.bg}`}
    >
      {/* MOBILE SIDEBAR - Clean Phase Indicators */}
      <aside className="lg:hidden sticky top-0 h-screen w-14 shrink-0 flex flex-col items-center justify-center gap-8 z-[70] border-r border-[#1a1a1a]/10 bg-white/95 backdrop-blur-xl">
        {PHASES.map((phase, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <button key={phase.id} onClick={() => changePhase(idx)} className="relative flex items-center justify-center w-10 h-10 group">
              {/* Active Indicator: Accent colored left bar */}
              <div 
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: phase.accent }}
              />
              
              {/* Number */}
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
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">/ THE SYSTEM</span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none tracking-tighter mb-6">
             7 Ways I Fix <span className="italic text-[#C5A059]">Your Business.</span>
           </h2>
           <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto px-4">
              I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.
           </p>
        </div>

        {/* DESKTOP TIMELINE - Premium Phase Tabs */}
        <header className="hidden lg:flex justify-center mb-10 pt-6">
           <div className="flex gap-0 bg-white border border-[#1a1a1a]/10 p-1 shadow-sm">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeIndex;
                return (
                    <button 
                      key={phase.id} 
                      onClick={() => changePhase(idx)}
                      className={`relative px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#1a1a1a] text-white' 
                          : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span style={{ color: isActive ? phase.accent : 'inherit' }}>0{idx + 1}</span>
                        <span className="hidden xl:inline">//</span>
                        <span className="hidden xl:inline">{phase.title}</span>
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
              
              {/* LEFT DISPLAY - MAIN CARD (Premium Strategic Card) */}
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
                      {/* VISUAL CONTAINER - Clean, minimal */}
                      {!isBlueprint && (
                        <div className="h-1/2 relative border-b border-[#1a1a1a]/5 bg-[#FAFAFA]">
                          <div className="absolute top-6 left-6 z-20">
                            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                              PHASE 0{activeIndex + 1} // {activePhase.title}
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

                      {/* TEXT CONTENT */}
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
                                    {/* Eyebrow */}
                                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-6" 
                                       style={{ color: isBlueprint ? '#C5A059' : activePhase.accent }}>
                                      {isBlueprint ? systemCard.label : `/ ${displayService?.subtitle || 'SERVICE'}`}
                                    </p>
                                    
                                    {/* Title */}
                                    <h3 className={`font-serif mb-4 leading-[0.95] tracking-tighter ${isBlueprint ? 'text-5xl lg:text-6xl' : 'text-4xl md:text-5xl'}`}
                                        style={{ color: isBlueprint ? '#C5A059' : 'inherit' }}>
                                        {displayData?.title}
                                    </h3>
                                    
                                    {/* Subtitle */}
                                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                                       style={{ color: isBlueprint ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,26,0.4)' }}>
                                        {displayData?.subtitle}
                                    </p>
                                    
                                    {/* Description */}
                                    <p className={`font-sans text-lg font-light leading-relaxed ${isBlueprint ? 'text-white/70' : 'text-[#1a1a1a]/70'}`}>
                                        {displayData?.description}
                                    </p>
                                </motion.div>
                              );
                            })()}
                        </AnimatePresence>
                        
                        {/* FOOTER CTA */}
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
                                    onClick={() => handleCardClick(displayService)}
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

              {/* RIGHT GRID - SERVICE LIST (Premium Strategic Cards) */}
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
                      {/* MOBILE TOP VISUALIZER */}
                      <div className="relative h-40 w-full border-b border-[#1a1a1a]/5 lg:hidden shrink-0 overflow-hidden bg-[#FAFAFA]">
                          <div className="absolute top-4 left-4 z-10">
                             <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                               {service.subtitle || 'SERVICE'}
                             </span>
                          </div>
                          <ViewportViz 
                             type={service.visualPrompt} 
                             color={activePhase.accent} 
                          />
                      </div>

                      {/* CONTENT CONTAINER */}
                      <div className="p-6 flex flex-col flex-1 h-full min-h-[200px]">
                         
                         {/* TOP: Phase Number + Arrow */}
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

                         {/* MIDDLE: CONTENT */}
                         <div className="mb-auto">
                            {/* Title - Serif for premium feel */}
                            <h4 className="font-serif text-xl md:text-2xl text-[#1a1a1a] mb-2 leading-tight tracking-tight">
                              <span className="lg:hidden">{MOBILE_TITLES[service.title] || getDisplayTitle(service.title)}</span>
                              <span className="hidden lg:inline">{getDisplayTitle(service.title)}</span>
                            </h4>
                            
                            {/* Subtitle/Label - Mono for technical feel */}
                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-4"
                               style={{ color: activePhase.accent }}>
                              {service.subtitle}
                            </p>
                            
                            {/* Description */}
                            <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]/60">
                              <span className="lg:hidden">{MOBILE_DESCRIPTIONS[service.id] || service.description}</span>
                              <span className="hidden lg:inline">{service.smallCardBody || service.description}</span>
                            </p>
                         </div>

                         {/* BOTTOM: CTA */}
                         <div className="mt-6 pt-4 border-t border-[#1a1a1a]/5 flex justify-start">
                            <CTAButton
                              variant="bracket"
                              size="sm"
                              theme="light"
                              className="pointer-events-none"
                            >
                              <span className="lg:hidden">VIEW</span>
                              <span className="hidden lg:inline">VIEW DETAILS</span>
                            </CTAButton>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* SYSTEM CTA CARD - The Blueprint */}
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
                      {/* Subtle background pattern */}
                      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <ViewportViz type="neural" color="#C5A059" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1 relative z-10">
                        {/* TOP */}
                        <div className="flex justify-between items-center mb-4">
                           <span className="font-mono text-[10px] font-bold text-[#C5A059] tracking-[0.2em] uppercase">
                             <span className="lg:hidden">{systemCardData.labelMobile}</span>
                             <span className="hidden lg:inline">{systemCardData.label}</span>
                           </span>
                           <ArrowDownRight className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 ${isBlueprint ? '-rotate-90' : 'group-hover:-rotate-90'}`} />
                        </div>

                        {/* CONTENT */}
                        <div className="mb-auto">
                           <h4 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-tight tracking-tight">
                             <span className="lg:hidden">{systemCardData.titleMobile}</span>
                             <span className="hidden lg:inline">{systemCardData.title}</span>
                           </h4>
                           <p className="font-mono text-[9px] text-[#C5A059] mb-4 uppercase tracking-[0.2em] font-bold">
                             {systemCardData.subtitle}
                           </p>
                           <p className="font-sans text-sm text-white/50 leading-relaxed">
                             <span className="lg:hidden">{systemCardData.descriptionMobile}</span>
                             <span className="hidden lg:inline">{systemCardData.smallCardBody}</span>
                           </p>
                        </div>

                        {/* FOOTER CTA */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <CTAButton 
                            variant="bracket"
                            size="sm"
                            theme="dark"
                            className="pointer-events-none"
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
