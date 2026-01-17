import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

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
  const getDisplayTitle = (title: string) => {
    return title.split(' & ').map(word => 
      word.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
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
      {/* MOBILE SIDEBAR - FIX: High Contrast Indicators */}
      <aside className={`lg:hidden sticky top-0 h-screen w-14 shrink-0 flex flex-col items-center justify-center gap-10 z-[70] border-r backdrop-blur-xl transition-all duration-500 ${activePhase.sidebarText} ${activePhase.sidebarBorder} ${activePhase.sidebarBg}`}>
        {PHASES.map((phase, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <button key={phase.id} onClick={() => changePhase(idx)} className="relative flex items-center justify-center w-8 h-8 group">
              {/* Active Indicator: Solid Circle (High Contrast) */}
              {isActive && (
                <motion.div 
                   layoutId="activeMobilePhase"
                   className={`absolute inset-0 rounded-full ${activePhase.dark ? 'bg-white' : 'bg-black'}`}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Number: Explicit color flip for readability */}
              <span className={`font-mono text-xs font-bold relative z-10 transition-colors duration-300
                ${isActive 
                   ? (activePhase.dark ? 'text-black' : 'text-white') // If dark phase (White Circle) -> Black Text
                   : activePhase.sidebarText} 
              `}>
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="flex-1 flex flex-col w-full">
        {/* HEADER */}
        <div className={`pt-24 pb-12 px-6 lg:pt-16 lg:pb-8 text-center max-w-4xl mx-auto ${activePhase.text}`}>
           <span className="font-mono text-xs tracking-[0.2em] mb-4 block uppercase font-bold opacity-60">/ THE SYSTEM</span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none tracking-tighter mb-6">7 Ways I Fix Your Business.</h2>
           <p className="font-sans text-base md:text-xl font-light opacity-70 leading-relaxed max-w-2xl mx-auto px-4">
              <span className="hidden lg:inline">I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.</span>
              <span className="lg:hidden">I treat your business as one connected system, linking Marketing, Sales, and Operations to eliminate the friction that burns out your people.</span>
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
                    className={`relative flex items-center font-mono text-xs md:text-sm font-bold tracking-[0.2em] transition-all ${isActive ? 'opacity-100' : 'opacity-40'} ${activePhase.text}`}
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
                {(() => {
                  const isBlueprint = displayService?.id === 'system-overview' || displayService?.id === 'blueprint-architecture';
                  return (
                    <div className={`relative flex-1 rounded-sm border shadow-2xl overflow-hidden flex flex-col transition-colors duration-500 
                      ${isBlueprint 
                        ? 'bg-[#1a1a1a] border-[#C5A059] text-white' 
                        : (activePhase.dark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-black/10 text-black')
                      }`}
                    >
                      {/* VISUAL CONTAINER */}
                      {!isBlueprint && (
                        <div className="h-1/2 relative border-b border-current/5">
                          <div className="absolute top-6 left-6 z-20">
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                              {displayService?.technicalLabel || '[ SYSTEM ARCHITECTURE ]'}
                            </div>
                          </div>
                          
                          <AnimatePresence mode="wait">
                              <ViewportViz 
                                key={`viz-${displayService?.id}`} 
                                type={displayService?.visualPrompt || activePhase.vizType} 
                                color={activePhase.dark ? '#C5A059' : (activePhase.id === 'GET CLIENTS' ? '#E21E3F' : '#1a1a1a')} 
                              />
                          </AnimatePresence>
                        </div>
                      )}

                      {/* TEXT CONTENT */}
                      <div className={`p-8 flex-1 flex flex-col justify-between ${isBlueprint ? 'justify-center py-12' : ''}`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isBlueprint ? systemCard.title : displayService?.id}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <h3 className={`font-serif mb-2 leading-tight ${isBlueprint ? 'text-4xl md:text-5xl text-[#C5A059]' : 'text-3xl'}`}>
                                    {isBlueprint ? systemCard.titleDisplay : getDisplayTitle(displayService?.title || '')}
                                </h3>
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-4">
                                    {isBlueprint ? systemCard.subtitleDisplay : displayService?.subtitle}
                                </p>
                                
                                <p className={`opacity-70 leading-relaxed ${isBlueprint ? 'text-lg max-w-xl mb-6' : 'text-base line-clamp-4'}`}>
                                    {isBlueprint ? systemCard.description : displayService?.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* FOOTER CTA */}
                        <div className={`mt-auto pt-6 border-t ${isBlueprint ? 'border-[#C5A059]/20' : (activePhase.dark ? 'border-white/10' : 'border-black/5')}`}>
                             {isBlueprint ? (
                                 <div 
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
                                    className="relative overflow-hidden bg-[#C5A059] text-[#1a1a1a] py-4 px-6 font-mono text-xs tracking-[0.2em] font-bold text-center uppercase cursor-pointer group/btn"
                                 >
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                                    <span className="relative z-10 transition-colors duration-500">[ EXPLORE THE SYSTEM ]</span>
                                 </div>
                             ) : (
                                 <button
                                    onClick={() => handleCardClick(displayService)}
                                    className={`text-left font-mono text-xs font-bold uppercase tracking-[0.2em] mt-1 transition-colors duration-300
                                        ${activePhase.dark ? 'text-[#C5A059] hover:text-white' : 'text-[#E21E3F] hover:text-black'}
                                    `}
                                 >
                                    [ SEE HOW IT WORKS ]
                                 </button>
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
                className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
              >
                {currentServices.map((service, idx) => {
                  const isActive = displayService?.id === service.id;

                  return (
                    <motion.div
                      key={service.id}
                      variants={cardVariants}
                      onMouseEnter={() => setActiveService(service)}
                      onClick={() => handleCardClick(service)}
                      className={`relative border rounded-sm lg:transition-all lg:duration-500 lg:ease-out group cursor-pointer flex flex-col
                        ${activePhase.dark ? 'bg-white/5' : 'bg-white'}
                        ${isActive 
                           ? (activePhase.dark 
                               ? 'border-[#C5A059]/30 lg:border-[#C5A059] lg:-translate-y-2 lg:shadow-[0_0_30px_-10px_rgba(197,160,89,0.3)]' 
                               : 'border-black/5 lg:border-[#E21E3F] lg:-translate-y-2 lg:shadow-xl')
                           : (activePhase.dark 
                               ? 'border-[#C5A059]/30 lg:hover:border-[#C5A059] lg:hover:-translate-y-2' 
                               : 'border-black/5 lg:hover:border-[#E21E3F]/30 lg:hover:-translate-y-2')
                        }
                        ${activePhase.dark ? 'text-white' : 'text-black'}
                      `}
                    >
                      {/* MOBILE TOP VISUALIZER */}
                      <div className="relative h-48 w-full border-b border-current/10 lg:hidden shrink-0 overflow-hidden bg-black/5">
                          <div className="absolute top-4 left-4 z-10">
                             <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-50">
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
                            <span className={`font-mono text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-40'} lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100`}>0{idx + 1}</span>
                            <ArrowDownRight className={`w-4 h-4 ${
                                isActive 
                                  ? `opacity-100 ${activePhase.dark ? 'text-[#C5A059]' : 'text-[#E21E3F]'} lg:-rotate-90 lg:transition-all lg:duration-500`
                                  : `opacity-30 lg:transition-all lg:duration-500 lg:group-hover:opacity-100 lg:group-hover:-rotate-90 ${activePhase.dark ? 'lg:group-hover:text-[#C5A059]' : 'lg:group-hover:text-[#E21E3F]'}`
                            }`} />
                         </div>

                         {/* MIDDLE: CONTENT */}
                         <div className="mb-auto relative z-10">
                            {/* Technical Label - Desktop Small Card Only */}
                            <div className="hidden lg:block mb-2">
                              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
                                {service.technicalLabelShort || service.technicalLabel}
                              </span>
                            </div>
                            
                            <h4 className={`font-serif text-2xl mb-3 leading-tight ${isActive ? '' : ''} lg:transition-transform lg:duration-300 lg:translate-x-1 lg:group-hover:translate-x-1`}>
                              <span className="lg:hidden">{MOBILE_TITLES[service.title] || getDisplayTitle(service.title)}</span>
                              <span className="hidden lg:inline">{service.title}</span>
                            </h4>
                            
                            {/* Desktop Small Card Body - Short hook/question */}
                            {/* Mobile: Show full mobile description */}
                            <p className={`font-sans text-sm leading-relaxed line-clamp-none ${isActive ? 'opacity-100' : 'opacity-60'} lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100`}>
                              <span className="lg:hidden">{MOBILE_DESCRIPTIONS[service.id] || service.description}</span>
                              <span className="hidden lg:inline">{service.smallCardBody || service.description}</span>
                            </p>
                         </div>

                         {/* BOTTOM: CTA */}
                         <div className="mt-6 pt-4 border-t border-current/10 flex justify-start">
                            <span className={`
                              font-mono text-xs uppercase tracking-[0.2em] font-bold
                              ${isActive 
                                 ? (activePhase.dark ? 'text-white' : 'text-black') 
                                 : (activePhase.dark ? 'text-[#C5A059]' : 'text-[#E21E3F]')
                              }
                              lg:transition-colors lg:duration-300 lg:group-hover:text-white lg:group-hover:text-black
                            `}>
                              <span className="lg:hidden">[ EXPLORE ]</span>
                              <span className="hidden lg:inline">[ LEARN MORE ]</span>
                            </span>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* SYSTEM CTA CARD */}
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
                      className={`relative p-6 bg-[#1a1a1a] border rounded-sm group cursor-pointer lg:transition-all min-h-[250px] flex flex-col justify-between 
                        ${isBlueprint
                          ? 'border-[#C5A059] lg:-translate-y-2 lg:shadow-[0_0_30px_-10px_rgba(197,160,89,0.3)]' 
                          : (activePhase.dark ? 'border-[#C5A059] lg:hover:-translate-y-1' : 'border-white/10 lg:shadow-xl lg:hover:-translate-y-1')
                        }
                      `}
                    >
                      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                        <ViewportViz type="neural" color="#C5A059" />
                      </div>
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                         <span className="font-mono text-xs font-bold text-white/50 block tracking-[0.2em] uppercase">
                           <span className="lg:hidden">{systemCardData.labelMobile}</span>
                           <span className="hidden lg:inline">{systemCardData.label}</span>
                         </span>
                         <ArrowDownRight className={`w-4 h-4 text-[#C5A059] lg:transition-transform lg:duration-500 ${isBlueprint ? 'lg:-rotate-90' : 'lg:group-hover:-rotate-90'}`} />
                      </div>

                      <div className="relative z-10 mb-auto">
                         <h4 className="font-serif text-2xl text-white mb-3 leading-tight">
                           <span className="lg:hidden">{systemCardData.titleMobile}</span>
                           <span className="hidden lg:inline">{systemCardData.title}</span>
                         </h4>
                         <p className="font-sans text-xs text-white/40 mb-2 uppercase tracking-[0.2em]">
                           <span className="hidden lg:inline">{systemCardData.subtitle}</span>
                         </p>
                         <p className="font-sans text-sm text-white/60 line-clamp-none">
                           <span className="lg:hidden">{systemCardData.descriptionMobile}</span>
                           <span className="hidden lg:inline">{systemCardData.smallCardBody}</span>
                         </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="relative overflow-hidden bg-[#C5A059] text-[#1a1a1a] py-3 px-4 font-mono text-xs tracking-[0.2em] font-bold text-center uppercase">
                          <div className="absolute inset-0 bg-white translate-y-full lg:group-hover:translate-y-0 lg:transition-transform lg:duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 lg:transition-colors lg:duration-500">
                            <span className="lg:hidden">[ SEE ALL ]</span>
                            <span className="hidden lg:inline">[ SEE ALL ]</span>
                          </span>
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
