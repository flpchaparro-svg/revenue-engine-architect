import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Database, Zap, Bot, Video, Users, BarChart3 } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
import HeroVisual_Suspension from './HeroVisual_Suspension';
import FAQSection from './FAQSection';
import { getSystemPageFAQs } from '../constants/faqData';
import Modal from './Modal';
import { ServiceDetail } from '../types';

interface SystemPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ onBack, onNavigate }) => {
  const [selectedPillar, setSelectedPillar] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // DESKTOP ONLY: Tracks which card is hovered to update the Sticky Display Box
  // Default: Pillar 1 (so the box isn't empty on load)
  const [activeHoverPillar, setActiveHoverPillar] = useState<string>('pillar1');

  const systemFAQs = getSystemPageFAQs();

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

  // Helper to find pillar data for the Display Box (Desktop Only)
  const getAllPillars = () => systems.flatMap(s => s.pillars);
  const getActivePillarData = () => getAllPillars().find(p => p.id === activeHoverPillar) || getAllPillars()[0];
  const activeData = getActivePillarData();

  const handlePillarClick = (pillar: any) => {
    // Desktop Check
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
      // MOBILE: Navigate to page
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

        {/* --- DESKTOP DISPLAY BOX (Sticky) --- */}
        {/* Hidden on Mobile, Block on Large Screens */}
        <div className="hidden lg:block mb-8 sticky top-32 z-40">
           <div className="bg-[#1a1a1a] text-[#FFF2EC] p-6 rounded-sm shadow-2xl flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-8">
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
              <div className="flex items-center gap-4">
                 <p className="text-sm font-sans opacity-70 italic max-w-md text-right hidden xl:block">
                   "{activeData.description}"
                 </p>
                 <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-sm text-[9px] font-mono uppercase tracking-widest transition-colors">
                   [ SEE HOW IT WORKS ]
                 </button>
              </div>
           </div>
        </div>

        {/* SYSTEMS GRID */}
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
                {system.pillars.map((pillar: any) => {
                  
                  // DESKTOP: Check if this card is the hovered one
                  const isHovered = activeHoverPillar === pillar.id;

                  return (
                    <button 
                      key={pillar.id} 
                      onClick={() => handlePillarClick(pillar)}
                      onMouseEnter={() => setActiveHoverPillar(pillar.id)} // Only affects Desktop logic
                      
                      // --- THE HYBRID STYLING STRATEGY ---
                      // BASE (Mobile/Tablet): Always Black (#1a1a1a), Gold Borders, White Text.
                      // LG (Desktop): Resets to White, applies Hover effect.
                      className={`
                        group relative text-left p-8 transition-all duration-300 flex flex-col items-start h-full w-full min-h-[320px] rounded-sm overflow-hidden z-10
                        
                        /* MOBILE / TABLET STYLES (Default) */
                        bg-[#1a1a1a] border border-[#C5A059] shadow-xl

                        /* DESKTOP STYLES (LG override) */
                        lg:bg-white lg:border-black/5 lg:shadow-none
                        lg:hover:bg-[#1a1a1a] lg:hover:border-[#C5A059] lg:hover:scale-[1.02] lg:hover:shadow-2xl
                        
                        /* Desktop Active State (Matches Hover) */
                        ${isHovered ? 'lg:bg-[#1a1a1a] lg:border-[#C5A059] lg:scale-[1.02] lg:shadow-2xl' : ''}
                      `}
                    >
                      
                      {/* --- INTERNAL ELEMENTS --- */}

                      {/* 1. Background Grid (Visible on Mobile OR Desktop Hover) */}
                      <div className={`absolute inset-0 pointer-events-none opacity-20 bg-[size:20px_20px] bg-[linear-gradient(rgba(197,160,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.05)_1px,transparent_1px)]
                        /* Always show on Mobile, Hide on Desktop Default, Show on Desktop Hover */
                        lg:opacity-0 lg:group-hover:opacity-20
                        ${isHovered ? 'lg:opacity-20' : ''}
                      `} />

                      {/* 2. Top Row: Number & Icon */}
                      <div className="flex justify-between items-start w-full mb-8 relative z-10">
                         {/* Number: White/30 on Mobile -> Black/20 on Desktop -> White/30 on Desktop Hover */}
                         <span className={`font-mono text-xl font-light 
                            text-white/30 
                            lg:text-black/20 lg:group-hover:text-white/30
                            ${isHovered ? 'lg:text-white/30' : ''}
                         `}>
                           {pillar.number}
                         </span>
                         
                         {/* Icon Box: Dark/Gold on Mobile -> Gray/Black on Desktop -> Dark/Gold on Desktop Hover */}
                         <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300
                            bg-white/10 text-[#C5A059]
                            lg:bg-black/5 lg:text-[#1a1a1a]
                            lg:group-hover:bg-white/10 lg:group-hover:text-[#C5A059]
                            ${isHovered ? 'lg:bg-white/10 lg:text-[#C5A059]' : ''}
                         `}>
                           <pillar.icon className="w-5 h-5" />
                         </div>
                      </div>

                      {/* 3. Tech Label */}
                      <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-3 block relative z-10 transition-colors
                        text-[#C5A059]
                        lg:text-[#E21E3F]
                        lg:group-hover:text-[#C5A059]
                        ${isHovered ? 'lg:text-[#C5A059]' : ''}
                      `}>
                        {pillar.techLabel}
                      </span>
                      
                      {/* 4. Title */}
                      <h3 className={`font-serif text-2xl mb-4 leading-none relative z-10 transition-colors
                        text-white
                        lg:text-[#1a1a1a]
                        lg:group-hover:text-white
                        ${isHovered ? 'lg:text-white' : ''}
                      `}>
                        {pillar.title}
                      </h3>
                      
                      {/* 5. Description */}
                      <p className={`font-sans text-sm leading-relaxed mb-8 relative z-10 transition-colors
                        text-white/60
                        lg:text-[#1a1a1a]/60
                        lg:group-hover:text-white/60
                        ${isHovered ? 'lg:text-white/60' : ''}
                      `}>
                        {pillar.description}
                      </p>
                      
                      {/* 6. CTA */}
                      <div className={`mt-auto flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest font-bold relative z-10 transition-all duration-300
                        text-[#C5A059]
                        lg:text-[#1a1a1a] lg:opacity-50
                        lg:group-hover:text-[#C5A059] lg:group-hover:opacity-100
                        ${isHovered ? 'lg:text-[#C5A059] lg:opacity-100' : ''}
                      `}>
                        <span className="hidden lg:inline">[ SEE FULL DETAILS ]</span>
                        <span className="lg:hidden">[ TAP TO VIEW ]</span>
                        <ArrowRight className={`w-3 h-3 group-hover:translate-x-1 transition-transform`} />
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

    </motion.div>
  );
};

export default SystemPage;
