
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Database, Zap, Cpu, Layers, Users, BarChart3, ArrowRight, ArrowDownRight } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
// FIX: Strict relative import to prevent "Module not found" error
import HeroVisual_Suspension from './HeroVisual_Suspension';

interface ArchitecturePageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack, onNavigate }) => {

  const systems = [
    {
      id: 'acquisition',
      label: 'SYSTEM 01 // ACQUISITION',
      title: 'Acquisition Architecture',
      description: 'The goal is simple: To capture attention and turn it into data without leaks. We engineer the entry point to ensure every drop of traffic is qualified.',
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      borderAccent: 'border-[#E21E3F]',
      pillars: [
        { id: 'pillar1', icon: Target, title: 'Digital Revenue', subtitle: 'The Catchment', text: 'Most websites are brochures; I build conversion engines. A high-performance digital catchment that feeds the ecosystem.' },
        { id: 'pillar2', icon: Database, title: 'Capture Core', subtitle: 'The Nervous System', text: 'The single source of truth. If a lead isn\'t tracked, it doesn\'t exist. I build the CRM architecture that remembers every interaction.' },
        { id: 'pillar3', icon: Zap, title: 'Auto-Fulfillment', subtitle: 'The Hands', text: 'Decoupling revenue from headcount. We automate the "boring" administrative work so your team can focus on the profitable work.' },
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
      label: 'SYSTEM 02 // VELOCITY',
      title: 'Velocity Architecture',
      description: 'The goal is speed. We use AI and Media Infrastructure to increase your output per hour, scaling your responsiveness infinitely.',
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      borderAccent: 'border-[#C5A059]',
      pillars: [
        { id: 'pillar4', icon: Cpu, title: 'AI Agents', subtitle: 'The Voice', text: 'Digital Employees. I build Agentic AI that can reason, speak, and qualify leads 24/7 on your behalf.' },
        { id: 'pillar5', icon: Layers, title: 'Media Logistics', subtitle: 'The Presence', text: 'An asset supply chain. We turn raw expertise into authority assets and distribute them automatically across every channel.' },
        { id: 'pillar6', icon: Users, title: 'Internal Adoption', subtitle: 'The Culture', text: 'Protocol synchronization. I engineer the behavioral shift using micro-learning to ensure your team actually adopts the tools.' },
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
      label: 'SYSTEM 03 // INTELLIGENCE',
      title: 'Intelligence Architecture',
      description: 'The goal is clarity. We move you from "gut feeling" to evidence-based growth by visualizing your unit economics in real-time.',
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      borderAccent: 'border-[#1a1a1a]',
      pillars: [
        { id: 'pillar7', icon: BarChart3, title: 'The Control Tower', subtitle: 'The Eyes', text: 'Vision locked. A centralized executive dashboard that gives you the confidence to steer the ship.' },
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
            / Return_to_Engine
          </button>
        </div>

        {/* HERO SECTION - SPLIT LAYOUT WITH ANIMATION */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_ARCHITECTURE</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              I don't sell hours. <br />
              <span className="italic text-black/20">I sell outcomes.</span>
            </h1>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-xl border-l-2 border-[#C5A059] pl-6">
              Most agencies sell "Ingredients" (SEO, Design, Ads). I sell "Systems." <br/>
              A 7-Pillar Architecture designed to remove human friction from your revenue cycle.
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
                        {/* Visual Logic Retained from previous context */}
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
                        <span>[ VIEW_SPECIFICATIONS ]</span>
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
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop guessing. <br/> Start <span className="italic text-[#E21E3F]">Engineering.</span></h2>
           <button 
             onClick={() => onNavigate('landing', 'booking')}
             className="group relative flex items-center justify-center px-10 py-6 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
           >
             <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
             <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
               [ INITIATE_AUDIT ]
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
