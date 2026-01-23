import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, PenTool, Hammer, Flag, 
  CheckCircle2
} from 'lucide-react';
import ProtocolVisual_Geodesic from '../components/ProtocolVisual_Geodesic';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

interface ProcessPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const Section: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ProcessPage: React.FC<ProcessPageProps> = ({ onBack, onNavigate }) => {

  const principles = [
    {
      id: 'p1',
      label: 'RULE 01 / CLARITY',
      title: 'Clarity Over Complexity',
      body: "If I can't explain it to you at a pub, it's too complex. You'll understand every part of your system, and if you don't, I haven't done my job.",
      icon: Search
    },
    {
      id: 'p2',
      label: 'RULE 02 // EMPATHY',
      title: 'People Before Technology',
      body: "If a new tool makes your team's day harder, it's failed. I build systems that save time, not add more admin.",
      icon: CheckCircle2
    }
  ];

  const steps = [
    {
      id: '01',
      phase: 'PHASE I',
      title: 'Find the Leaks',
      text: "I don't guess. I look for the repetitive tasks burning your team, the stuff that eats 15 hours a week. I find where data gets typed twice, where leads go cold, and where profit disappears.",
      icon: Search,
      color: 'text-[#E21E3F]',
      borderColor: 'border-[#E21E3F]'
    },
    {
      id: '02',
      phase: 'PHASE II',
      title: 'Pick the Right Tools',
      text: "I'm not locked into HubSpot or Salesforce, so I find what actually fits your business. We design the logic before we write a single line of code.",
      icon: PenTool,
      color: 'text-[#C5A059]',
      borderColor: 'border-[#C5A059]'
    },
    {
      id: '03',
      phase: 'PHASE III',
      title: 'Ship Fast & Iterate',
      text: "No 6-month projects that drain your budget. I build in sprints so you start seeing progress in weeks, not quarters.",
      icon: Hammer,
      color: 'text-[#C5A059]',
      borderColor: 'border-[#C5A059]'
    },
    {
      id: '04',
      phase: 'PHASE IV',
      title: 'Make It Stick',
      text: "Software fails when people don't use it. I build the training materials and run the workshops so your team actually prefers the new way.",
      icon: Flag,
      color: 'text-[#C5A059]',
      borderColor: 'border-[#C5A059]'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col selection:bg-[#C5A059]/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HERO SECTION */}
        <div className="mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <Section className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-center lg:justify-start">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                THE PROCESS
              </span>
            </div>
            {/* FIXED: Scaled up to text-5xl on mobile to match Home Page standard */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-12">
              How I <span className="italic font-serif text-[#C5A059]">Work.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-8 py-2 text-left lg:mx-0">
              A clear path from chaos to order. <br className="hidden md:block" />
              No black boxes. No fluff. Just engineering.
            </p>
          </Section>

          <Section delay={0.2} className="h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center lg:justify-end relative">
            <div className="w-full max-w-[320px] lg:max-w-none">
               <ProtocolVisual_Geodesic />
            </div>
          </Section>
        </div>

        {/* SECTION: PHILOSOPHY CARDS */}
        <div className="mb-24 md:mb-40">
          <Section className="mb-16 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / OPERATING SYSTEM
            </span>
            {/* FIXED: Scaled up to text-4xl on mobile */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
              Core <span className="italic font-serif text-[#C5A059]">Principles.</span>
            </h2>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {principles.map((principle, idx) => (
               <Section key={principle.id} delay={idx * 0.1} className="group bg-white p-8 md:p-12 border border-[#1a1a1a]/5 hover:border-[#1a1a1a]/20 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left will-change-transform" />
                 <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors">
                      {principle.label}
                    </span>
                    <principle.icon className="w-6 h-6 text-[#1a1a1a]/20 group-hover:text-[#C5A059] transition-colors" />
                 </div>
                 <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-4 leading-tight tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                   {principle.title}
                 </h3>
                 <p className="font-sans text-lg font-light text-[#1a1a1a]/70 leading-relaxed">
                   {principle.body}
                 </p>
               </Section>
             ))}
          </div>
        </div>

        {/* SECTION: THE EXECUTION PATH */}
        <div className="mb-32">
          <Section className="mb-20 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / METHODOLOGY
            </span>
            {/* FIXED: Scaled up to text-4xl on mobile */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
              The Execution <span className="italic font-serif text-[#C5A059]">Path.</span>
            </h2>
          </Section>

          {/* FIX: Increased horizontal padding on mobile to prevent clipping */}
          <div className="relative px-4 md:px-0">
             {/* Center Line on Desktop */}
             <div className="absolute left-[19px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-[#E21E3F] via-[#C5A059] to-[#1a1a1a] hidden md:block" />
             {/* Left Line on Mobile */}
             <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#E21E3F] via-[#C5A059] to-[#1a1a1a] md:hidden" />

             {steps.map((step, idx) => (
               <Section key={step.id} delay={idx * 0.1} className={`relative flex flex-col md:flex-row gap-4 md:gap-24 py-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon Node */}
                  <div className="absolute left-0 md:left-[50%] top-12 -translate-x-1/2 md:-translate-x-1/2 z-10 bg-[#FFF2EC] p-2">
                     <div className={`w-10 h-10 rounded-full border-2 bg-white flex items-center justify-center shadow-md transition-transform duration-300 ${step.borderColor}`}>
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                     </div>
                  </div>
                  
                  {/* Left/Right Logic for Desktop */}
                  <div className={`flex-1 md:text-right ${idx % 2 !== 0 ? 'md:text-left' : ''} pl-12 md:pl-0`}>
                     <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block ${step.color}`}>
                       {step.phase}
                     </span>
                     <h3 className="font-serif text-2xl md:text-4xl text-[#1a1a1a] mb-4 leading-tight tracking-tighter">
                       {step.title}
                     </h3>
                  </div>
                  
                  <div className={`flex-1 pl-12 md:pl-0 ${idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                     <p className="font-sans text-base md:text-lg font-light text-[#1a1a1a]/70 leading-relaxed max-w-md mx-auto md:mx-0">
                       {step.text}
                     </p>
                  </div>
               </Section>
             ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <Section className="mb-24">
          <div className="bg-[#1a1a1a] text-white p-12 md:p-24 text-center relative overflow-hidden rounded-sm group cursor-default">
             <div className="relative z-10 flex flex-col items-center">
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-6 block">
                  / PROJECT INITIATION
                </span>
                {/* FIXED: Scaled up to text-5xl on mobile */}
                <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter text-white mb-12">
                  Ready to <span className="italic font-serif text-[#C5A059]">Start?</span>
                </h2>
                
                <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                  [ BOOK A CALL ]
                </CTAButton>
                
                <div className="flex items-center gap-2 opacity-50 mt-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                    ACCEPTING NEW CLIENTS
                  </p>
                </div>
             </div>
          </div>
        </Section>
      </div>
    </motion.div>
  );
};

export default ProcessPage;