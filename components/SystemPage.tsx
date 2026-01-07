import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowDownRight, Globe, Database, Zap, Bot, Video, Users, BarChart3 } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
import HeroVisual_Suspension from './HeroVisual_Suspension';
import FAQSection from './FAQSection';
import { getSystemPageFAQs } from '../constants/faqData';
import Modal from './Modal';
import { ServiceDetail } from '../types';
import { VizAcquisition, VizVelocity, VizIntelligence } from './ArchitecturePageVisuals';

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
        },
        // VISUAL CARD 1: ACQUISITION
        { 
          id: 'v1', 
          isVisual: true, 
          subtitle: 'Active_Listening', 
          accent: '#E21E3F' 
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
        },
        // VISUAL CARD 2: VELOCITY
        { 
          id: 'v2', 
          isVisual: true, 
          subtitle: 'Processing_Cycles', 
          accent: '#C5A059' 
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
        },
        // VISUAL CARD 3: INTELLIGENCE
        { 
          id: 'v3', 
          isVisual: true, 
          subtitle: 'Predictive_Model', 
          accent: '#1a1a1a' 
        }
      ]
    }
  ];


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

        {/* SYSTEMS GRID - GitHub Layout */}
        <div className="space-y-32 mb-32">
          {systems.map((system) => (
            <div key={system.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/5 pt-12 relative group/system">
              {/* LEFT COLUMN: System Info */}
              <div className="lg:col-span-4 relative flex flex-col">
                <div className={`font-mono text-[10px] uppercase tracking-[0.25em] font-bold mb-6 ${system.accent}`}>{system.label}</div>
                <h2 className="font-serif text-4xl mb-6">{system.title}</h2>
                <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed max-w-md">{system.description}</p>
                <div className="mt-auto hidden lg:block relative h-12 w-full">
                   <ArrowDownRight className={`w-8 h-8 ${system.accent} opacity-50 absolute bottom-0 left-0`} />
                   <div className={`absolute top-1/2 left-10 right-[-48px] h-[1px] opacity-20 ${system.bgAccent}`} />
                   <div className={`absolute top-1/2 right-[-48px] w-1 h-1 rounded-full ${system.bgAccent} opacity-40`} />
                </div>
              </div>
              
              {/* RIGHT COLUMN: 2x2 Grid of Pillars */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {system.pillars.map((pillar: any) => (
                  pillar.isVisual ? (
                    <div key={pillar.id} className="group p-0 bg-[#1a1a1a]/5 border border-black/5 flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[300px]">
                        {/* ANIMATION CONTAINER */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                           {pillar.id === 'v1' && <VizAcquisition color="#E21E3F" />}
                           {pillar.id === 'v2' && <VizVelocity color="#C5A059" />}
                           {pillar.id === 'v3' && <VizIntelligence color="#1a1a1a" />}
                        </div>
                        
                        <div className="absolute bottom-6 font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 z-10 bg-white/50 px-2 py-1 backdrop-blur-md rounded-sm" style={{ color: pillar.accent }}>
                           [ {pillar.subtitle} ]
                        </div>
                    </div>
                  ) : (
                    <button 
                      key={pillar.id} 
                      onClick={() => handlePillarClick(pillar)}
                      onMouseEnter={() => setActiveHoverPillar(pillar.id)}
                      className="group text-left p-8 bg-white border border-black/5 hover:border-black/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-start h-full w-full"
                    >
                      <div className={`w-10 h-10 mb-6 flex items-center justify-center rounded-full bg-black/5 ${system.accent}`}>
                        <pillar.icon className="w-5 h-5" />
                      </div>
                      <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-2 block ${system.accent} opacity-70`}>{pillar.subtitle}</span>
                      <h3 className="font-serif text-2xl mb-4 group-hover:translate-x-1 transition-transform duration-300">{pillar.title}</h3>
                      <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed mb-8">{pillar.description}</p>
                      <div className={`mt-auto flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${system.accent}`}>
                        <span>[ SEE HOW IT WORKS ]</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${system.bgAccent}`} />
                    </button>
                  )
                ))}
              </div>
            </div>
          ))}
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
