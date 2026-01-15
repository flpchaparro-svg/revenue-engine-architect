import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Database, Zap, Bot, Video, Users, BarChart3, ChevronDown, LayoutGrid } from 'lucide-react';
import GlobalFooter from '../../components/GlobalFooter';
import HeroVisual_Suspension from '../../components/HeroVisual_Suspension';
import FAQSection from '../../components/FAQSection';
import { getSystemPageFAQs } from '../../constants/faqData';
import Modal from '../../components/Modal';
import { ServiceDetail } from '../../types';
import { VizAcquisition, VizVelocity, VizIntelligence } from '../../components/ArchitecturePageVisuals';

// --- TYPES & INTERFACES ---
interface SystemPillar extends Partial<ServiceDetail> {
  id: string;
  number?: string;
  icon?: React.ElementType;
  title?: string;
  subtitle: string;
  techLabel?: string;
  description?: string;
  isVisual?: boolean;
  systemGroup?: string;
  symptom?: string;
  visualPrompt?: string;
  features?: string[];
}

interface SystemCategory {
  id: string;
  label: string;
  tabLabel: string;
  title: string;
  description: string;
  accent: string;
  bgAccent: string;
  borderAccent: string;
  hex: string;
  pillars: SystemPillar[];
}

// --- DATA CONSTANTS ---
const SYSTEMS_DATA: SystemCategory[] = [
  {
    id: 'sys_01',
    label: 'SYS_01 [ ACQUISITION ]',
    tabLabel: 'GET CLIENTS',
    title: 'Capture and Convert',
    description: 'The goal is to turn attention into leads without losing anyone along the way.',
    accent: 'text-[#E21E3F]',
    bgAccent: 'bg-[#E21E3F]',
    borderAccent: 'border-[#E21E3F]',
    hex: '#E21E3F',
    pillars: [
      { 
        id: 'pillar1', number: '01', icon: Globe, title: 'WEBSITES & E-COMMERCE', subtitle: 'The Face', techLabel: '[ YOUR ONLINE STOREFRONT ]',
        description: 'Sites that capture leads and sell products, not just look pretty.',
        systemGroup: 'ACQUISITION', symptom: "Are you losing leads in spreadsheets?", visualPrompt: 'catchment',
        features: ['Smart Lead Forms', 'Inventory Sync', 'Fast, Mobile-First Design']
      },
      { 
        id: 'pillar2', number: '02', icon: Database, title: 'CRM & LEAD TRACKING', subtitle: 'The Brain', techLabel: '[ NEVER LOSE A LEAD ]',
        description: 'Track every lead, every call, every deal. Nothing slips through.',
        systemGroup: 'ACQUISITION', symptom: "Do you know exactly where every deal is stuck?", visualPrompt: 'network',
        features: ['Pipeline Visibility', 'Automated Follow-Ups', 'One Source of Truth']
      },
      { 
        id: 'pillar3', number: '03', icon: Zap, title: 'AUTOMATION', subtitle: 'The Muscle', techLabel: '[ ADMIN ON AUTOPILOT ]',
        description: 'Invoices, follow-ups, data entry, all on autopilot.',
        systemGroup: 'ACQUISITION', symptom: "How many hours are you losing to repeat tasks?", visualPrompt: 'helix',
        features: ['Auto-Invoicing', 'Task Triggers', 'System-to-System Sync']
      },
      { id: 'v1', isVisual: true, subtitle: 'Active_Listening' }
    ]
  },
  {
    id: 'sys_02',
    label: 'SYS_02 [ VELOCITY ]',
    tabLabel: 'SCALE FASTER',
    title: 'Multiply Your Output',
    description: 'The goal is to do more without hiring more, using AI and content systems that work while you sleep.',
    accent: 'text-[#C5A059]',
    bgAccent: 'bg-[#C5A059]',
    borderAccent: 'border-[#C5A059]',
    hex: '#C5A059',
    pillars: [
      { 
        id: 'pillar4', number: '04', icon: Bot, title: 'AI ASSISTANTS', subtitle: 'The Voice', techLabel: '[ BOTS THAT THINK ]',
        description: 'Answer calls and enquiries 24/7, even while you sleep.',
        systemGroup: 'VELOCITY', symptom: "Are you missing calls after hours?", visualPrompt: 'brain',
        features: ['24/7 Availability', 'Lead Qualification', 'Appointment Booking']
      },
      { 
        id: 'pillar5', number: '05', icon: Video, title: 'CONTENT SYSTEMS', subtitle: 'The Presence', techLabel: '[ POST EVERYWHERE ]',
        description: 'One voice note → blog, socials, newsletter. Auto-published.',
        systemGroup: 'VELOCITY', symptom: "Do you know what to post but never find the time?", visualPrompt: 'broadcast',
        features: ['Voice-to-Content', 'Auto-Publishing', 'Multi-Platform Distribution']
      },
      { 
        id: 'pillar6', number: '06', icon: Users, title: 'TEAM TRAINING', subtitle: 'The Soul', techLabel: '[ TEAM ADOPTION ]',
        description: 'Short training that makes your team actually use the tools.',
        systemGroup: 'VELOCITY', symptom: "Is your team actually using the tools you bought?", visualPrompt: 'turbine',
        features: ['Bite-Sized Videos', 'Step-by-Step Guides', 'Team Q&A Library']
      },
      { id: 'v2', isVisual: true, subtitle: 'Processing_Cycles' }
    ]
  },
  {
    id: 'sys_03',
    label: 'SYS_03',
    tabLabel: 'SEE CLEARLY',
    title: 'Make Better Decisions',
    description: 'The goal is to stop guessing and see your numbers in real time so you can steer the business.',
    accent: 'text-[#1a1a1a]',
    bgAccent: 'bg-[#1a1a1a]',
    borderAccent: 'border-[#1a1a1a]',
    hex: '#1a1a1a',
    pillars: [
      { 
        id: 'pillar7', number: '07', icon: BarChart3, title: 'DASHBOARDS & REPORTING', subtitle: 'The Eyes', techLabel: '[ REAL-TIME DATA ]',
        description: 'Revenue, margins, pipeline, one screen, live.',
        systemGroup: 'INTELLIGENCE', symptom: "Are you steering the business by gut feeling?", visualPrompt: 'radar',
        features: ['Live Revenue Tracking', 'Forecasting & Projections', 'One-Screen Business Health']
      },
      { id: 'v3', isVisual: true, subtitle: 'Predictive_Model' }
    ]
  }
];

// --- ANIMATION VARIANTS ---
const heroContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const heroItem = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 40, damping: 20 } }
};

const consoleWrapper = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const tabContent = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1, x: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.05, type: "spring", stiffness: 50, damping: 20 }
  },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } }
};


interface SystemPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ onBack, onNavigate }) => {
  const [activeSystemId, setActiveSystemId] = useState('sys_01');
  const [selectedPillar, setSelectedPillar] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeHoverPillar, setActiveHoverPillar] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const systemFAQs = getSystemPageFAQs();
  const activeSystem = SYSTEMS_DATA.find(s => s.id === activeSystemId) || SYSTEMS_DATA[0];

  // Accurate check for desktop to prevent hydration mismatches or resize bugs
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handlePillarClick = (pillar: SystemPillar) => {
    // Systematic check: Only open modal if we are strictly in desktop mode
    if (isDesktop) {
      const modalData: ServiceDetail = {
        id: pillar.id,
        title: pillar.title || '',
        subtitle: pillar.subtitle,
        description: pillar.description || '',
        systemGroup: pillar.systemGroup || '',
        symptom: pillar.symptom || '',
        visualPrompt: pillar.visualPrompt || '',
        features: pillar.features || [],
        technicalLabel: pillar.techLabel || '',
        bgImage: '',
        icon: '',
      };
      setSelectedPillar(modalData);
      setIsModalOpen(true);
    } else {
      onNavigate(pillar.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        {/* FIX 2: Reduced mb-16 to mb-8/mb-12 to pull the Hero/Eyebrow closer to the nav */}
        <div className="flex justify-between items-center mb-8 lg:mb-12">
          <button onClick={onBack} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return to Home
          </button>
        </div>

        {/* --- HERO SECTION (Animated on Scroll) --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={heroContainer}
          className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.span variants={heroItem} className="font-mono text-xs text-[#E21E3F] tracking-[0.2em] mb-6 block uppercase font-bold">
              / THE SYSTEM
            </motion.span>
            <motion.h1 variants={heroItem} className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter mb-8">
              7 Ways I Fix <br />
              <span className="italic text-black/20">Your Business.</span>
            </motion.h1>
            <motion.p variants={heroItem} className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-xl border-l-2 border-[#C5A059] pl-6">
              I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.
            </motion.p>
          </div>
          <motion.div variants={heroItem} className="h-full flex items-center justify-center lg:justify-end min-h-[300px] lg:min-h-[500px] relative">
             <HeroVisual_Suspension />
          </motion.div>
        </motion.div>

        {/* --- COMMAND CONSOLE (Desktop) --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={consoleWrapper}
          className="w-full hidden lg:flex min-h-[600px] border-t border-black/10 pt-12 mb-32"
        >
            
            {/* SIDEBAR NAVIGATION (25%) */}
            <div className="w-1/4 pr-8 flex flex-col gap-3">
              <div className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-4 pl-6">Select System</div>
              {SYSTEMS_DATA.map((sys) => {
                const isActive = activeSystemId === sys.id;
                return (
                  <button 
                    key={sys.id}
                    onClick={() => setActiveSystemId(sys.id)}
                    className={`group text-left p-6 transition-all duration-300 border-l-[3px] relative overflow-hidden flex flex-col gap-2 ${
                      isActive 
                        ? `bg-white shadow-lg ${sys.borderAccent}` 
                        : 'border-transparent hover:bg-black/5 hover:border-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                       <span className={`text-[10px] font-mono uppercase tracking-[0.2em] block ${isActive ? sys.accent : 'text-gray-400 group-hover:text-gray-600'}`}>
                         {sys.label.split('[')[0]}
                       </span>
                       {isActive && <motion.div layoutId="active-dot" className={`w-1.5 h-1.5 rounded-full ${sys.bgAccent}`} />}
                    </div>
                    <span className={`font-serif text-2xl block leading-none transition-colors ${isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/70'}`}>
                      {sys.tabLabel}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* MAIN STAGE (75%) */}
            <div className="w-3/4 pl-12 border-l border-black/5 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSystem.id}
                  variants={tabContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full flex flex-col"
                >
                   {/* HEADER (Slide Up) */}
                   <motion.div variants={staggerItem} className="mb-10 relative">
                      <div className={`inline-block font-mono text-[10px] uppercase tracking-[0.2em] font-bold mb-4 px-3 py-1 bg-white border border-black/5 rounded-full ${activeSystem.accent}`}>
                         {activeSystem.label}
                      </div>
                      <h2 className="font-serif text-5xl mb-6">{activeSystem.title}</h2>
                      <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-2xl">
                         {activeSystem.description}
                      </p>
                      
                      {/* Decorative Tech Tag */}
                      <div className="absolute right-0 top-0 hidden xl:block opacity-20">
                         <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
                            <LayoutGrid className="w-4 h-4" />
                            <span>SYSTEM_ACTIVE</span>
                         </div>
                      </div>
                   </motion.div>

                   {/* PILLARS GRID (Staggered Children) */}
                   <div className="grid grid-cols-2 gap-6 pb-12">
                      {activeSystem.pillars.map((pillar) => (
                        <motion.div key={pillar.id} variants={staggerItem} className="h-full">
                          {pillar.isVisual ? (
                            // VISUAL CARD
                            <div className="group p-0 bg-[#1a1a1a]/5 border border-black/5 flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[280px] rounded-lg">
                                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                                   {pillar.id === 'v1' && <VizAcquisition color="#E21E3F" />}
                                   {pillar.id === 'v2' && <VizVelocity color="#C5A059" />}
                                   {pillar.id === 'v3' && <VizIntelligence color="#1a1a1a" />}
                                </div>
                                <div className="absolute bottom-6 font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 z-10 bg-white/50 px-2 py-1 backdrop-blur-md rounded-sm" style={{ color: activeSystem.hex }}>
                                   [ {pillar.subtitle} ]
                                </div>
                            </div>
                          ) : (
                            // CONTENT CARD
                            <button 
                              onClick={() => handlePillarClick(pillar)}
                              onMouseEnter={() => setActiveHoverPillar(pillar.id)}
                              onMouseLeave={() => setActiveHoverPillar(null)}
                              className="group text-left p-8 bg-white border border-black/5 hover:border-black/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-start h-full w-full rounded-lg"
                            >
                              <div className="flex justify-between w-full mb-6">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-black/5 ${activeSystem.accent}`}>
                                  {pillar.icon && <pillar.icon className="w-5 h-5" />}
                                </div>
                                <span className={`font-mono text-[10px] opacity-30`}>{pillar.number}</span>
                              </div>
                              
                              <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-2 block ${activeSystem.accent} opacity-70`}>
                                 {pillar.subtitle}
                              </span>
                              <h3 className="font-serif text-2xl mb-4 group-hover:translate-x-1 transition-transform duration-300">
                                 {pillar.title}
                              </h3>
                              <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed mb-6">
                                 {pillar.description}
                              </p>
                              
                              <div className={`mt-auto flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${activeSystem.accent}`}>
                                <span>[ EXPLORE ]</span>
                                <ArrowRight className="w-3 h-3" />
                              </div>
                              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${activeSystem.bgAccent}`} />
                            </button>
                          )}
                        </motion.div>
                      ))}
                   </div>
                </motion.div>
              </AnimatePresence>
            </div>
        </motion.div>

        {/* --- MOBILE ACCORDION (Stacked) --- */}
        <div className="lg:hidden flex flex-col gap-4 mb-32">
           {SYSTEMS_DATA.map((sys) => {
             const isOpen = activeSystemId === sys.id;
             return (
               <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={consoleWrapper}
                  key={sys.id} 
                  className={`border border-black/5 rounded-xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white shadow-xl' : 'bg-transparent'}`}
               >
                  {/* Header */}
                  <button 
                    onClick={() => setActiveSystemId(isOpen ? '' : sys.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                     <div>
                        <span className={`text-[9px] font-mono uppercase tracking-[0.2em] block mb-2 ${sys.accent}`}>
                           {sys.label.split('[')[0]}
                        </span>
                        <span className={`font-serif text-3xl block leading-none ${isOpen ? 'text-black' : 'text-black/60'}`}>
                           {sys.tabLabel}
                        </span>
                     </div>
                     <motion.div 
                       animate={{ rotate: isOpen ? 180 : 0 }}
                       className={`p-2 rounded-full ${isOpen ? 'bg-black/5' : ''}`}
                     >
                        <ChevronDown className={`w-5 h-5 ${isOpen ? sys.accent : 'text-black/30'}`} />
                     </motion.div>
                  </button>

                  {/* Content Body */}
                  <AnimatePresence>
                     {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                           <div className="px-6 pb-8 pt-2">
                              <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-8 border-l-2 pl-4 border-black/10">
                                 {sys.description}
                              </p>
                              
                              <div className="space-y-4">
                                 {sys.pillars.map((pillar) => (
                                    !pillar.isVisual && (
                                       <div 
                                          key={pillar.id} 
                                          onClick={() => onNavigate(pillar.id)}
                                          className="bg-[#FFF2EC] p-6 rounded-lg border border-black/5 active:scale-[0.98] transition-transform"
                                       >
                                          <div className="flex items-center gap-3 mb-3">
                                             {pillar.icon && <pillar.icon className={`w-4 h-4 ${sys.accent}`} />}
                                             <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">{pillar.subtitle}</span>
                                          </div>
                                          <h4 className="font-serif text-xl mb-2">{pillar.title}</h4>
                                          <p className="text-sm opacity-60 leading-relaxed">{pillar.description}</p>
                                       </div>
                                    )
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
             )
           })}
        </div>

      </div>
      
      {/* FAQ Section */}
      <FAQSection
        faqs={systemFAQs}
        accentColor="#C5A059"
        title="Questions?"
        subtitle="Everything you need to know before choosing a service."
        onNavigate={onNavigate}
      />
      
      <GlobalFooter onNavigate={onNavigate} />

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedPillar && (
          <Modal
            service={selectedPillar}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onViewPillar={(pillarId) => {
              setIsModalOpen(false);
              onNavigate(pillarId);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default SystemPage;
