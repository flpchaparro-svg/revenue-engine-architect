import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProtocolVisual_Geodesic from './ProtocolVisual_Geodesic';

interface ProtocolPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const ProtocolPage: React.FC<ProtocolPageProps> = ({ onBack, onNavigate }) => {

  const principles = [
    {
      id: 'p1',
      label: '01 // CLARITY OVER COMPLEXITY',
      body: "If I can't explain it to you at a pub, it's too complex. You'll understand every part of your system. If you don't, I haven't done my job."
    },
    {
      id: 'p2',
      label: '02 // PEOPLE BEFORE TECHNOLOGY',
      body: "If a new tool makes your team's day harder, it's failed. I build systems that save time. Not add more admin."
    }
  ];

  const steps = [
    {
      id: '01',
      label: '[ DIAGNOSE ]',
      title: 'Find the Leaks',
      text: "I don't guess. I look for the repetitive tasks burning your team. The stuff that eats 15 hours a week. Where data gets typed twice. Where leads go cold. Where profit disappears."
    },
    {
      id: '02',
      label: '[ DESIGN ]',
      title: 'Pick the Right Tools',
      text: "I'm not locked into HubSpot or Salesforce. I find what actually fits your business. So you're not paying for features you'll never use."
    },
    {
      id: '03',
      label: '[ BUILD ]',
      title: 'Ship Fast',
      text: "No 6-month projects. I build in sprints. You start seeing results in weeks, not quarters. We refine as we go."
    },
    {
      id: '04',
      label: '[ HANDOVER ]',
      title: 'Make It Stick',
      text: "Software fails when people don't use it. I build the training so your team actually prefers the new way. I don't leave until it's their new normal."
    }
  ];

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
            / Return to Home
          </button>
        </div>

        {/* HERO */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ THE PROCESS</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              How I Work.
            </h1>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6">
              From chaos to order. No fluff.
            </p>
          </div>
          <div className="h-full min-h-[500px] flex items-center justify-center lg:justify-end">
            <ProtocolVisual_Geodesic />
          </div>
        </div>

        {/* GUIDING PRINCIPLES */}
        <div className="mb-40 max-w-5xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              {principles.map((principle) => (
                <div key={principle.id}>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-4 block font-bold">{principle.label}</span>
                  <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                    {principle.body}
                  </p>
                </div>
              ))}
           </div>
        </div>

        {/* THE 4 PHASES */}
        <div className="mb-32">
          <div className="space-y-0 relative border-l border-black/10 ml-4 md:ml-0">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group py-12 pl-12 md:pl-0 flex flex-col md:flex-row gap-8 md:items-baseline relative"
              >
                 <div className="absolute left-[-5px] top-16 w-2 h-2 bg-[#1a1a1a] rounded-full md:hidden" />
                 <div className="w-32 shrink-0 font-mono text-xs text-[#E21E3F] font-bold tracking-widest pt-2">
                   {step.id} //
                 </div>
                 <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-black/5 pb-12 group-last:border-none">
                    <div className="md:col-span-4">
                       <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] mb-3 block">{step.label}</span>
                       <h3 className="font-serif text-4xl text-[#1a1a1a]">{step.title}</h3>
                    </div>
                    <div className="md:col-span-7">
                       <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed">
                         {step.text}
                       </p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 p-12 md:p-24 relative overflow-hidden mb-32 rounded-sm">
           <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="font-serif text-5xl md:text-6xl mb-8">Ready to start?</h2>
              
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-10 py-5 bg-transparent text-zinc-100 border border-zinc-700 font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300 hover:border-zinc-500 mb-4"
              >
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                 <span className="relative z-10 group-hover:text-zinc-900 transition-colors duration-500 flex items-center gap-3">
                    [ BOOK A CALL ] <ArrowRight className="w-4 h-4" />
                 </span>
              </button>
              
              <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                15 minutes. No sales pitch.
              </p>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProtocolPage;
