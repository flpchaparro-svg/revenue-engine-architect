
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProtocolVisual_Geodesic from './ProtocolVisual_Geodesic';

interface ProtocolPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const ProtocolPage: React.FC<ProtocolPageProps> = ({ onBack, onNavigate }) => {

  const steps = [
    {
      id: '01',
      title: 'The Friction Audit',
      subtitle: 'Scientific Diagnosis',
      text: "We stop guessing. I don't just look at your analytics; I look for 'Minor Labour'—the repetitive tasks burning your team. We map the data leaks to establish a baseline for friction."
    },
    {
      id: '02',
      title: 'Agnostic Navigation',
      subtitle: 'Unbiased Design',
      text: "I am not a 'HubSpot Partner' or a 'Salesforce Shop'. I am your Navigator. I survey the entire market to find the 'Right Tool for Right Now,' ensuring you never overpay for features you don't need."
    },
    {
      id: '03',
      title: 'The Engineering Sprint',
      subtitle: 'High-Velocity Execution',
      text: (
        <>
          We reject the '6-Month Waterfall'. We build in <strong className="text-[#E21E3F]">Sprints</strong>. Whether it's a 7-day <strong className="text-[#C5A059]">Velocity</strong> build or a 24-hour <strong className="text-black">Terminal</strong> launch, we deploy the asset quickly so you can start generating revenue while we refine the rest.
        </>
      )
    },
    {
      id: '04',
      title: 'The Adoption Shift',
      subtitle: 'Behavioral Engineering',
      text: "Technology fails when humans resist it. I don't just send you a login; I engineer the training (Pillar 6) to ensure your staff prefers the new way. We don't leave until the system is your team's new normal."
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
            / Return_to_Engine
          </button>
        </div>

        {/* HERO */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ OPERATING_PROTOCOL</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              The Rules of <br />
              <span className="italic text-black/20">Engagement.</span>
            </h1>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6">
               A strict protocol to move from Chaos to Order.
            </p>
          </div>
          <div className="h-full min-h-[500px] flex items-center justify-center lg:justify-end">
            <ProtocolVisual_Geodesic />
          </div>
        </div>

        {/* PHILOSOPHY SECTION */}
        <div className="mb-40 max-w-5xl">
           <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-16 text-[#1a1a1a]">
             To guarantee results, we break <br/>
             <span className="italic text-[#E21E3F]">standard agency habits.</span>
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-4 block font-bold">01 // Clarity over Complexity</span>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  If I can't explain the solution to a business owner in a pub, it’s too complex. I reject "Black Box" magic. You will understand every moving part of your engine, or I haven't done my job.
                </p>
              </div>
              
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-4 block font-bold">02 // Human-First Engineering</span>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  Technology serves people, not the other way around. If a new tool makes your staff's life harder, it is a failure of architecture. We build for <strong>Net Time</strong> (No Extra Time) added to their day.
                </p>
              </div>
           </div>
        </div>

        {/* EXECUTION SEQUENCE */}
        <div className="mb-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold mb-16 text-[#1a1a1a]/40 border-b border-black/10 pb-4">
            Execution_Sequence
          </div>
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
                       <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] mb-3 block">{step.subtitle}</span>
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

        {/* BOTTOM CTA - FIXED: Spacing, Dark Theme, Slide Animation */}
        <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 p-12 md:p-24 relative overflow-hidden mb-32 rounded-sm">
           <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="font-serif text-5xl md:text-6xl mb-8">Ready to start <br/> the <span className="italic text-[#C5A059]">Process?</span></h2>
              
              <button 
                onClick={() => onNavigate('landing', 'booking')}
                className="group relative px-10 py-5 bg-transparent text-zinc-100 border border-zinc-700 font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300 hover:border-zinc-500"
              >
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                 <span className="relative z-10 group-hover:text-zinc-900 transition-colors duration-500 flex items-center gap-3">
                    [ INITIATE_AUDIT ] <ArrowRight className="w-4 h-4" />
                 </span>
              </button>
           </div>
        </div>

      </div>
      {/* GLOBAL FOOTER REMOVED (Handled by App.tsx) */}
    </motion.div>
  );
};
export default ProtocolPage;
