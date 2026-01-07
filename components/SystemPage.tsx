import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowDownRight, Globe, Database, Zap, Bot, Video, Users, BarChart3, ChevronRight } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
import HeroVisual_Suspension from './HeroVisual_Suspension';
import FAQSection from './FAQSection';
import { getSystemPageFAQs } from '../constants/faqData';
import Modal from './Modal';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface SystemPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ onBack, onNavigate }) => {
  const [selectedPillar, setSelectedPillar] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeHoverPillar, setActiveHoverPillar] = useState<string>('pillar1'); // Default to first pillar active

  const systemFAQs = getSystemPageFAQs();

  // Ensure first pillar is active on mount (for tablet/desktop)
  useEffect(() => {
    setActiveHoverPillar('pillar1');
  }, []);

  // --- DATA: COMPLETE COPY IMPLEMENTATION ---
  const systems = [
    {
      id: 'sys_01',
      label: 'SYS_01 [ ACQUISITION ]',
      tabLabel: 'GET CLIENTS',
      title: 'Capture and Convert',
      description: 'The goal is to turn attention into leads without losing anyone along the way.',
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      borderAccent: 'border-[#E21E3F]',
      pillars: [
        { 
          id: 'pillar1', 
          number: '01',
          icon: Globe, 
          title: 'WEBSITES & E-COMMERCE', 
          subtitle: 'The Face', 
          techLabel: '[ YOUR ONLINE STOREFRONT ]',
          description: 'Sites that capture leads and sell products — not just look pretty. I build websites that feed your CRM automatically.',
          systemGroup: 'ACQUISITION',
          symptom: "Are you losing leads in spreadsheets?",
          visualPrompt: 'catchment',
          features: ['Smart Lead Forms', 'Inventory Connected to Sales', 'Fast, Mobile-First Design']
        },
        { 
          id: 'pillar2', 
          number: '02',
          icon: Database, 
          title: 'CRM & LEAD TRACKING', 
          subtitle: 'The Brain', 
          techLabel: '[ NEVER LOSE A LEAD ]',
          description: 'Track every lead, every call, every deal. Nothing slips through.',
          systemGroup: 'ACQUISITION',
          symptom: "Do you know exactly where every deal is stuck?",
          visualPrompt: 'network',
          features: ['Pipeline Visibility', 'Automated Follow-Ups', 'One Source of Truth']
        },
        { 
          id: 'pillar3', 
          number: '03',
          icon: Zap, 
          title: 'AUTOMATION', 
          subtitle: 'The Muscle', 
          techLabel: '[ INVOICES & ADMIN ON AUTOPILOT ]',
          description: 'Invoices, follow-ups, data entry — all on autopilot.',
          systemGroup: 'ACQUISITION',
          symptom: "How many hours are you losing to repeat tasks?",
          visualPrompt: 'helix',
          features: ['Auto-Invoicing', 'Task Triggers', 'System-to-System Sync']
        }
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
      pillars: [
        { 
          id: 'pillar4', 
          number: '04',
          icon: Bot, 
          title: 'AI ASSISTANTS', 
          subtitle: 'The Voice', 
          techLabel: '[ BOTS THAT TALK & THINK ]',
          description: 'Answer calls and enquiries 24/7 — even while you sleep.',
          systemGroup: 'VELOCITY',
          symptom: "Are you missing calls after hours?",
          visualPrompt: 'brain',
          features: ['24/7 Availability', 'Lead Qualification', 'Appointment Booking']
        },
        { 
          id: 'pillar5', 
          number: '05',
          icon: Video, 
          title: 'CONTENT SYSTEMS', 
          subtitle: 'The Presence', 
          techLabel: '[ CREATE ONCE, POST EVERYWHERE ]',
          description: 'One voice note → blog, socials, newsletter. Auto-published.',
          systemGroup: 'VELOCITY',
          symptom: "Do you know what to post but never find the time?",
          visualPrompt: 'broadcast',
          features: ['Voice-to-Content', 'Auto-Publishing', 'Multi-Platform Distribution']
        },
        { 
          id: 'pillar6', 
          number: '06',
          icon: Users, 
          title: 'TEAM TRAINING', 
          subtitle: 'The Soul', 
          techLabel: '[ MAKE YOUR TEAM USE IT ]',
          description: 'Short training that makes your team actually use the tools.',
          systemGroup: 'VELOCITY',
          symptom: "Is your team actually using the tools you bought?",
          visualPrompt: 'turbine',
          features: ['Bite-Sized Videos', 'Step-by-Step Guides', 'Team Q&A Library']
        }
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
      pillars: [
        { 
          id: 'pillar7', 
          number: '07',
          icon: BarChart3, 
          title: 'DASHBOARDS & REPORTING', 
          subtitle: 'The Eyes', 
          techLabel: '[ SEE YOUR NUMBERS IN REAL-TIME ]',
          description: 'Revenue, margins, pipeline — one screen, live.',
          systemGroup: 'INTELLIGENCE',
          symptom: "Are you steering the business by gut feeling?",
          visualPrompt: 'radar',
          features: ['Live Revenue Tracking', 'Forecasting & Projections', 'One-Screen Business Health']
        }
      ]
    }
  ];

  // Helper to find pillar data for the Display Box
  const getAllPillars = () => systems.flatMap(s => s.pillars);
  const getActivePillarData = () => {
    const allPillars = getAllPillars();
    return allPillars.find(p => p.id === activeHoverPillar) || allPillars[0] || null;
  };
  const activeData = getActivePillarData();

  // --- LOGIC: HANDLE CLICKS BASED ON DEVICE ---
  const handlePillarClick = (pillar: any) => {
    // Update active hover pillar immediately so display box shows the clicked pillar
    setActiveHoverPillar(pillar.id);
    
    // Check if window is strictly Desktop (>= 1024px)
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      // DESKTOP: Open Modal
      const modalData: ServiceDetail = {
        id: pillar.id,
        title: pillar.title,
        subtitle: pillar.subtitle,
        description: pillar.description,
        systemGroup: pillar.systemGroup,
        symptom: pillar.symptom,
        visualPrompt: pillar.visualPrompt,
        features: pillar.features,
      };
      setSelectedPillar(modalData);
      setIsModalOpen(true);
    } else {
      // MOBILE / TABLET: Go straight to page (NO POPUP)
      onNavigate(pillar.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-16">
          <button onClick={onBack} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return to Home
          </button>
        </div>

        {/* HERO SECTION */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ THE SYSTEM</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              7 Ways I Fix <br />
              <span className="italic text-black/20">Your Business.</span>
            </h1>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-xl border-l-2 border-[#C5A059] pl-6">
              I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.
            </p>
          </div>
          <div className="h-full flex items-center justify-center lg:justify-end min-h-[500px] relative">
             <HeroVisual_Suspension />
          </div>
        </div>

        {/* --- DISPLAY BOX (Sticky Visualizer) - Visible on all screens --- */}
        {activeData && (
          <div className="mb-8 sticky top-32 z-40">
           <div className="bg-[#1a1a1a] text-[#FFF2EC] p-6 rounded-sm shadow-2xl flex items-center justify-between border border-white/10 relative overflow-hidden">
              {/* Background Visual */}
              <div className="absolute inset-0 opacity-20">
                <ViewportViz type={activeData.visualPrompt} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-transparent" />
              
              <div className="relative z-10 flex items-center gap-8 flex-1">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#E21E3F] animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                       Active_Protocol // {activeData.title}
                    </span>
                 </div>
                 <div className="h-4 w-[1px] bg-white/20" />
                 <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A059]">
                    {activeData.techLabel}
                 </span>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                 <p className="text-sm font-sans opacity-70 italic max-w-md text-right hidden xl:block">
                   "{activeData.description}"
                 </p>
                 <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-sm text-[9px] font-mono uppercase tracking-widest transition-colors">
                   [ SEE HOW IT WORKS ]
                 </button>
              </div>
           </div>
          </div>
        )}

        {/* SYSTEMS GRID (GROUPED) */}
        <div className="space-y-24 mb-32">
          {systems.map((system) => (
            <div key={system.id} className="relative group/system">
              
              {/* SYSTEM HEADER */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-6 mb-8 gap-6">
                 <div>
                   <div className={`font-mono text-[10px] uppercase tracking-[0.25em] font-bold mb-4 ${system.accent}`}>
                      {system.label}
                   </div>
                   <h2 className="font-serif text-4xl text-[#1a1a1a]">{system.title}</h2>
                 </div>
                 <div className="md:max-w-md md:text-right">
                    <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed">
                      {system.description}
                    </p>
                 </div>
              </div>

              {/* PILLARS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {system.pillars.map((pillar: any, index: number) => {
                  // First pillar (pillar1) should always be active on initial load
                  const isActive = activeHoverPillar === pillar.id;
                  return (
                    <button 
                      key={pillar.id} 
                      onClick={() => handlePillarClick(pillar)}
                      onMouseEnter={() => setActiveHoverPillar(pillar.id)}
                      className={`group relative text-left p-8 border transition-all duration-300 flex flex-col items-start h-full w-full min-h-[320px] rounded-sm overflow-hidden
                        ${isActive 
                          ? 'bg-[#1a1a1a] border-[#C5A059] shadow-xl scale-[1.02] z-10' 
                          : 'bg-white border-black/5 hover:border-black/20'
                        }
                      `}
                    >
                      <div className="flex justify-between items-start w-full mb-8">
                         <span className={`font-mono text-xl font-light ${isActive ? 'text-white/30' : 'text-black/20'}`}>
                           {pillar.number}
                         </span>
                         <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isActive ? 'bg-white/10 text-[#C5A059]' : 'bg-black/5 text-[#1a1a1a]'}`}>
                           <pillar.icon className="w-5 h-5" />
                         </div>
                      </div>

                      <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-3 block ${isActive ? 'text-[#C5A059]' : 'text-[#E21E3F]'}`}>
                        {pillar.techLabel}
                      </span>
                      
                      <h3 className={`font-serif text-2xl mb-4 leading-none ${isActive ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        {pillar.title}
                      </h3>
                      
                      <p className={`font-sans text-sm leading-relaxed mb-8 ${isActive ? 'text-white/60' : 'text-[#1a1a1a]/60'}`}>
                        {pillar.description}
                      </p>
                      
                      <div
                        className={
                          `mt-auto flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest font-bold transition-all duration-300 ` +
                          (isActive
                            ? 'text-[#C5A059] opacity-100 translate-y-0'
                            : 'text-[#1a1a1a] opacity-50 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0')
                        }
                      >
                        <span className="hidden lg:inline">[ SEE FULL DETAILS ]</span>
                        <span className="lg:hidden">[ TAP TO VIEW ]</span>
                        <ArrowRight className={`w-3 h-3 ${isActive ? 'translate-x-1' : ''}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop guessing and start building.</h2>
           <button 
             onClick={() => onNavigate('contact')}
             className="group relative flex items-center justify-center px-10 py-6 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
           >
             <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
             <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
               [ BOOK A CALL ]
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
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

      {/* MODAL: Only opens on Desktop via handlePillarClick logic */}
      <AnimatePresence>
        {isModalOpen && selectedPillar && (
          <Modal
            service={selectedPillar}
            isOpen={isModalOpen}
            onClose={() => {
              // Just close the modal - stay on SystemPage, preserve activeHoverPillar state
              setIsModalOpen(false);
              // Keep the activeHoverPillar set to the clicked pillar so display box remains visible
              if (selectedPillar?.id) {
                setActiveHoverPillar(selectedPillar.id);
              }
            }}
            onViewPillar={(pillarId) => {
              setIsModalOpen(false);
              onNavigate(pillarId);
            }}
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default SystemPage;
