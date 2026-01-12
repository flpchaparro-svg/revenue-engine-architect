import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { SERVICES } from '../constants'; //
import { ServiceDetail } from '../types'; //
import ViewportViz from './ViewportViz'; //
import Modal from './Modal'; //

// --- CONFIGURATION ---
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
    sidebarBg: 'bg-white/40'
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
    sidebarBg: 'bg-black/20'
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
    sidebarBg: 'bg-white/40'
  }
];

const SystemPhases = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredService, setHoveredService] = useState<ServiceDetail | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeIndex = Math.abs(page % PHASES.length);
  const activePhase = PHASES[activeIndex];
  const currentServices = SERVICES.filter(s => s.systemGroup === activePhase.id); //
  
  // Intelligence Phase Fix: Default to the first service so display isn't empty
  const displayService = hoveredService || currentServices[0];

  const changePhase = (newIndex: number) => {
    setPage([newIndex, newIndex > activeIndex ? 1 : -1]);
    setHoveredService(null);
    // Standard section scroll to keep user oriented
    if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`py-16 md:py-32 px-6 lg:px-12 transition-colors duration-700 ${activePhase.bg}`}
    >
      <div className="max-w-screen-2xl mx-auto">
        
        {/* HEADER: Font sizes matched to HomePage.tsx */}
        <div className={`mb-10 text-center max-w-4xl mx-auto ${activePhase.text}`}>
           <span className="font-mono text-xs tracking-[0.4em] mb-4 block uppercase font-bold">
              / THE SYSTEM
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6">
              7 Ways I Fix Your Business.
           </h2>
           <p className="font-sans text-base md:text-xl font-light opacity-70 leading-relaxed max-w-2xl mx-auto px-4">
              I don't just build websites. I treat your business as one connected system.
           </p>
        </div>

        {/* TIMELINE: Click only interaction */}
        <header className="hidden lg:flex justify-center mb-10">
           <div className="flex justify-between w-full max-w-4xl border-b border-current/10 pb-2">
              {PHASES.map((phase, idx) => (
                <button 
                  key={phase.id} 
                  onClick={() => changePhase(idx)}
                  className={`relative pb-2 font-mono text-xs md:text-sm font-bold tracking-widest transition-all ${idx === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'} ${activePhase.text}`}
                >
                  0{idx + 1} / {phase.title}
                  {idx === activeIndex && (
                    <motion.div layoutId="activeTab" className={`absolute bottom-[-1px] left-0 right-0 h-[3px] ${phase.tabLine}`} />
                  )}
                </button>
              ))}
           </div>
        </header>

        {/* MAIN DASHBOARD LAYOUT: Compact for one-screen view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:max-h-[600px]">
          
          {/* LEFT DISPLAY (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 h-[550px]">
            <div className={`relative w-full rounded-sm border shadow-2xl overflow-hidden flex flex-col ${activePhase.dark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
              
              {/* Top Progress Bar */}
              <div className="h-1.5 w-full bg-current/10 absolute top-0 z-10">
                <motion.div 
                  key={displayService?.id}
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className={`h-full ${activePhase.barColor}`} 
                />
              </div>

              {/* Viz Area */}
              <div className="h-1/2 relative border-b border-current/5">
                <ViewportViz 
                  key={`viz-${displayService?.id}`} 
                  type={displayService?.visualPrompt || activePhase.vizType} 
                  color={activePhase.dark ? '#C5A059' : (activePhase.id === 'GET CLIENTS' ? '#E21E3F' : '#1a1a1a')} 
                />
              </div>

              {/* Content Area */}
              <div className={`p-8 flex-1 flex flex-col justify-between ${activePhase.text}`}>
                <div>
                  <h3 className="font-serif text-3xl mb-4">{displayService?.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed line-clamp-4">{displayService?.description}</p>
                </div>
                
                <div className={`pt-6 border-t mt-auto ${activePhase.dark ? 'border-white/10' : 'border-black/5'}`}>
                  <button 
                    onClick={() => { setSelectedService(displayService); setIsModalOpen(true); }}
                    className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] font-bold hover:text-gold transition-colors"
                  >
                    [ EXPLORE PILLAR ]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SELECTOR GRID */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentServices.map((service, idx) => (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredService(service)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                className={`p-6 border rounded-sm transition-all duration-300 group cursor-pointer min-h-[170px] flex flex-col justify-between ${activePhase.dark ? 'border-[#C5A059]/30 hover:border-[#C5A059] text-white bg-white/5' : 'border-black/5 hover:border-[#E21E3F]/30 text-black bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] opacity-40">0{idx + 1}</span>
                  <ArrowDownRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">{service.title}</h4>
                  <p className="text-xs opacity-60 line-clamp-2">{service.description}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA CARD: No display-hover effect, no arrows */}
            <div 
              onClick={() => window.location.href='/system'}
              onMouseEnter={() => {}} // No display effect
              className={`p-6 bg-[#1a1a1a] border rounded-sm group cursor-pointer transition-all min-h-[170px] flex flex-col justify-between ${activePhase.dark ? 'border-[#C5A059]' : 'border-white/10 shadow-xl'}`}
            >
              <span className="font-mono text-[10px] text-white/50 block tracking-widest uppercase">/// BLUEPRINT</span>
              <div>
                <h4 className="font-serif text-xl text-white mb-2 leading-tight">Architecture of Growth</h4>
                <p className="text-xs text-white/60 mb-4 line-clamp-2">Connect every pillar into one automated engine.</p>
              </div>
              <div className="bg-[#C5A059] text-[#1a1a1a] py-3 px-4 font-mono text-[10px] tracking-widest font-bold text-center uppercase">
                [ EXPLORE THE SYSTEM ]
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={() => {}} />
    </section>
  );
};

export default SystemPhases;
