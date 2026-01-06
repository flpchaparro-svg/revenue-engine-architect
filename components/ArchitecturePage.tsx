
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Database, Zap, Cpu, Layers, Users, BarChart3, ArrowRight, ArrowDownRight } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
// FIX: Strict relative import to prevent "Module not found" error
import HeroVisual_Suspension from './HeroVisual_Suspension';
import { VizAcquisition, VizVelocity, VizIntelligence } from './ArchitecturePageVisuals';

interface ArchitecturePageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack, onNavigate }) => {

  const systems = [
    {
      id: 'acquisition',
      label: 'SYSTEM 01 // GET CLIENTS',
      title: 'Capture and Convert',
      description: 'The goal is to turn attention into leads without losing anyone along the way.',
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      borderAccent: 'border-[#E21E3F]',
      pillars: [
        { id: 'pillar1', icon: Target, title: 'Websites & E-commerce', subtitle: 'The Face', text: 'Most websites are brochures, but I build sites that capture leads, sell products, and feed your CRM automatically.' },
        { id: 'pillar2', icon: Database, title: 'CRM & Lead Tracking', subtitle: 'The Brain', text: 'If it\'s not in the CRM, it didn\'t happen. I build the system that tracks every lead, every call, and every deal so nothing slips through.' },
        { id: 'pillar3', icon: Zap, title: 'Automation', subtitle: 'The Muscle', text: 'Invoices, follow-ups, and data entry are the boring stuff that eats your week. I make it run on autopilot so your team can do real work.' },
        // VISUAL CARD 1: DATA INGEST
        { 
          id: 'v1', 
          isVisual: true, 
          subtitle: 'Active_Listening', 
          accent: '#E21E3F' 
        }
      ]
    },
    {
      id: 'velocity',
      label: 'SYSTEM 02 // SCALE FASTER',
      title: 'Multiply Your Output',
      description: 'The goal is to do more without hiring more, using AI and content systems that work while you sleep.',
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      borderAccent: 'border-[#C5A059]',
      pillars: [
        { id: 'pillar4', icon: Cpu, title: 'AI Assistants', subtitle: 'The Voice', text: 'Bots that answer your phone, reply to enquiries, and qualify leads 24/7, even at 3am when you\'re asleep.' },
        { id: 'pillar5', icon: Layers, title: 'Content Systems', subtitle: 'The Presence', text: 'One voice note becomes a blog, 5 social posts, and a newsletter, all published automatically across every platform.' },
        { id: 'pillar6', icon: Users, title: 'Team Training', subtitle: 'The Soul', text: 'New software only works if your team actually uses it, so I build short training videos that make adoption easy.' },
        // VISUAL CARD 2: TURBINE
        { 
          id: 'v2', 
          isVisual: true, 
          subtitle: 'Processing_Cycles', 
          accent: '#C5A059' 
        }
      ]
    },
    {
      id: 'intelligence',
      label: 'SYSTEM 03 // SEE CLEARLY',
      title: 'Make Better Decisions',
      description: 'The goal is to stop guessing and see your numbers in real time so you can steer the business with confidence.',
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      borderAccent: 'border-[#1a1a1a]',
      pillars: [
        { id: 'pillar7', icon: BarChart3, title: 'Dashboards & Reporting', subtitle: 'The Eyes', text: 'Revenue, margins, and pipeline all on one screen, updated live, so you\'re not doing spreadsheets at midnight anymore.' },
        // VISUAL CARD 3: RADAR
        { 
          id: 'v3', 
          isVisual: true, 
          subtitle: 'Predictive_Model', 
          accent: '#1a1a1a' 
        }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-24">
          <button onClick={onBack} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return to Home
          </button>
        </div>

        {/* HERO SECTION - SPLIT LAYOUT WITH ANIMATION */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ THE SYSTEM</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              I don't sell hours. <br />
              <span className="italic text-black/20">I sell outcomes.</span>
            </h1>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-xl border-l-2 border-[#C5A059] pl-6">
              Most agencies sell you ingredients like SEO, design, and ads. I build complete systems. 7 pillars designed to get the admin off your plate.
            </p>
          </div>
          
          {/* ANIMATION CONTAINER */}
          <div className="h-full flex items-center justify-center lg:justify-end min-h-[500px] relative">
             <HeroVisual_Suspension />
          </div>
        </div>

        {/* SYSTEMS GRID */}
        <div className="space-y-32 mb-32">
          {systems.map((system) => (
            <div key={system.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/5 pt-12 relative group/system">
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
              
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {system.pillars.map((pillar: any) => (
                  pillar.isVisual ? (
                    <div key={pillar.id} className="group p-8 bg-[#1a1a1a]/5 border border-black/5 flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[300px]">
                        {pillar.id === 'v1' && <VizAcquisition color={pillar.accent} />}
                        {pillar.id === 'v2' && <VizVelocity color={pillar.accent} />}
                        {pillar.id === 'v3' && <VizIntelligence color={pillar.accent} />}
                        <div className="absolute bottom-6 font-mono text-[9px] uppercase tracking-[0.2em] opacity-50" style={{ color: pillar.accent }}>
                           [ {pillar.subtitle} ]
                        </div>
                    </div>
                  ) : (
                    <button 
                      key={pillar.id} 
                      onClick={() => onNavigate(pillar.id)}
                      className="group text-left p-8 bg-white border border-black/5 hover:border-black/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-start h-full w-full"
                    >
                      <div className={`w-10 h-10 mb-6 flex items-center justify-center rounded-full bg-black/5 ${system.accent}`}>
                        <pillar.icon className="w-5 h-5" />
                      </div>
                      <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-2 block ${system.accent} opacity-70`}>{pillar.subtitle}</span>
                      <h3 className="font-serif text-2xl mb-4 group-hover:translate-x-1 transition-transform duration-300">{pillar.title}</h3>
                      <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed mb-8">{pillar.text}</p>
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
      <GlobalFooter onNavigate={onNavigate} />
    </motion.div>
  );
};

export default ArchitecturePage;
