import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Car, Coffee, Code2, Building2, Activity, ArrowRight, GitBranch, Database, Cpu, Users } from 'lucide-react';
import AboutVisual_Harmony from './AboutVisual_Harmony';
import AboutVisual_Distillation from './AboutVisual_Distillation';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  const [mode, setMode] = useState<'architect' | 'human'>('architect');

  const handleNavigate = (view: string, sectionId?: string) => {
    onNavigate(view, sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = {
      architect: {
        label: '/ SYSTEM_SPECIFICATIONS',
        accent: 'text-[#E21E3F]',
        bgAccent: 'bg-[#E21E3F]',
        borderAccent: 'border-[#E21E3F]',
        headline: (
          <>
            Precision is not <br />
            <span className="italic text-black/20">Optional.</span>
          </>
        ),
        subhead: "The Logic Stream.",
        description: "I don't sell 'hours'. I sell a sequential engineering process that removes human friction from your business permanently.",
        timeline: [
          {
            id: 'a1',
            icon: Database,
            label: 'STEP 01 // THE AUDIT',
            title: 'Structural Analysis',
            text: "I strip the business down to its raw data flows. I find where you are 'leaking' revenue through manual entry and double-handling."
          },
          {
            id: 'a2',
            icon: GitBranch,
            label: 'STEP 02 // THE BUILD',
            title: 'Code Injection',
            text: "I don't patch cracks; I replace the foundation. I install autonomous agents and API bridges that do the work of your admin staff."
          },
          {
            id: 'a3',
            icon: Cpu,
            label: 'STEP 03 // THE SCALE',
            title: 'Infinite Output',
            text: "Once the system is live, it scales without fatigue. Your revenue disconnects from your headcount."
          }
        ],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000",
        imageCaption: "Fig. 01 // Logic_Stream"
      },
      human: {
        label: '/ OPERATOR_LOGS',
        accent: 'text-[#C5A059]',
        bgAccent: 'bg-[#C5A059]',
        borderAccent: 'border-[#C5A059]',
        headline: (
          <>
            I haven't just audited <br />
            <span className="italic text-[#C5A059]">I've run them.</span>
          </>
        ),
        subhead: "Experience from the Trenches.",
        description: "I didn't learn business from a textbook. I learned it on the floor of a showroom, behind the bar of my own cafe, and in the boardroom.",
        timeline: [
          {
            id: 'h1',
            icon: Briefcase,
            label: 'PHASE 01 // THE GENERAL MANAGER',
            title: 'International Operations',
            text: "I managed large teams for international companies. I know the stress of payroll, the chaos of people management, and the cost of burnout."
          },
          {
            id: 'h2',
            icon: Car,
            label: 'PHASE 02 // THE LUXURY STANDARD',
            title: 'Super-Luxury Sales',
            text: "Selling high-end vehicles taught me that VIP clients demand perfection. I build that same 'White Glove' standard into your digital systems."
          },
          {
            id: 'h3',
            icon: Coffee,
            label: 'PHASE 03 // THE BUSINESS OWNER',
            title: 'The Coffee Business',
            text: "I put my own capital at risk. I built a business from scratch. I don't treat your budget like 'Play Money' because I know how hard it is to earn."
          },
           {
            id: 'h4',
            icon: Users,
            label: 'PHASE 04 // THE FOUNDATION',
            title: 'The Discipline',
            text: "My background in Chemistry (Process) and High-Level Latin Dance (Discipline) taught me that excellence is a habit. If you miss a detail, the reaction fails."
          }
        ],
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000",
        imageCaption: "Fig. 02 // The_Operator"
      }
    };
  
    const current = content[mode];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Engine
          </button>
        </div>

        {/* HEADER & SWITCH */}
        <div className="mb-24 relative">
           <span className={`font-mono text-xs tracking-widest mb-6 block uppercase font-bold ${current.accent}`}>
             {current.label}
           </span>
           
           {/* REDESIGNED SWITCH: High Contrast Tabs */}
           <div className="flex items-center gap-0 mb-12 border-b-2 border-black/5 w-fit">
              <button 
                onClick={() => setMode('architect')}
                className={`px-8 py-4 text-[10px] font-mono uppercase tracking-[0.25em] font-bold transition-all duration-300 relative overflow-hidden ${
                  mode === 'architect' 
                  ? 'text-[#FFF2EC] bg-[#1a1a1a]' 
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                }`}
              >
                THE_ARCHITECT
                {/* Active Indicator Line */}
                {mode === 'architect' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-1 bg-[#E21E3F]" />}
              </button>
              
              <button 
                onClick={() => setMode('human')}
                className={`px-8 py-4 text-[10px] font-mono uppercase tracking-[0.25em] font-bold transition-all duration-300 relative overflow-hidden ${
                  mode === 'human' 
                  ? 'text-[#1a1a1a] bg-[#FFF2EC] border-x border-t border-black/10' 
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                }`}
                style={mode === 'human' ? { boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' } : {}}
              >
                THE_OPERATOR
                {/* Active Indicator Line */}
                {mode === 'human' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059]" />}
              </button>
           </div>

           <AnimatePresence mode="wait">
             <motion.h1
               key={mode}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mb-8"
             >
               {current.headline}
             </motion.h1>
           </AnimatePresence>
        </div>
        
        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
           
           {/* LEFT: VISUAL (Harmony Visual for Architect / Distillation for Human) */}
           <div className="lg:col-span-5 hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={mode}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={`sticky top-32 aspect-[3/4] relative overflow-hidden transition-all duration-700 border border-black/10 ${mode === 'architect' ? 'bg-[#FFF2EC]' : 'bg-[#FFF2EC]'}`}
                >
                  {mode === 'architect' ? (
                    <AboutVisual_Harmony />
                  ) : (
                    <AboutVisual_Distillation />
                  )}
                </motion.div>
              </AnimatePresence>
           </div>

           {/* RIGHT: THE TIMELINE */}
           <div className="lg:col-span-7 pt-0 lg:pt-12">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={mode}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-16"
                >
                  <div className="mb-16">
                    <h3 className={`font-serif text-3xl mb-6 italic ${current.accent}`}>{current.subhead}</h3>
                    <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-xl border-l-2 border-black/5 pl-6">
                      {current.description}
                    </p>
                  </div>

                  {/* TIMELINE COMPONENT */}
                  <div className={`relative border-l ${current.borderAccent} ml-3 md:ml-6 space-y-16`}>
                    
                    {current.timeline.map((step) => (
                      <div key={step.id} className="relative pl-12 md:pl-16 group">
                         
                         {/* DOT / ICON */}
                         <div className={`absolute -left-3 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-[#FFF2EC] z-10 transition-colors duration-300 ${mode === 'architect' ? 'bg-[#1a1a1a] text-white group-hover:bg-[#E21E3F]' : 'bg-[#1a1a1a] text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#1a1a1a]'}`}>
                            <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                         </div>

                         {/* CONTENT */}
                         <div>
                           <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-2 block font-bold transition-colors ${current.accent}`}>
                             {step.label}
                           </span>
                           <h4 className="font-serif text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                             {step.title}
                           </h4>
                           <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed max-w-lg">
                             {step.text}
                           </p>
                         </div>
                      </div>
                    ))}

                  </div>

                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Ready to engineer <br/> your <span className={`italic ${current.accent}`}>Legacy?</span></h2>
           <button 
             onClick={() => handleNavigate('landing', 'booking')}
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
    </motion.div>
  );
};

export default AboutPage;