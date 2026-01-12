import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Car, Coffee, Code2, Building2, Activity, ArrowRight, GitBranch, Database, Cpu, Users, FlaskConical, Award, Wrench, Target, Globe, Quote } from 'lucide-react';

interface ArchitectPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const ArchitectPage: React.FC<ArchitectPageProps> = ({ onBack, onNavigate }) => {
  const [mode, setMode] = useState<'architect' | 'human'>('architect');

  const handleNavigate = (view: string, sectionId?: string) => {
    onNavigate(view, sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = {
      architect: {
        label: '/ THE ARCHITECT',
        accent: 'text-[#E21E3F]',
        bgAccent: 'bg-[#E21E3F]',
        borderAccent: 'border-[#E21E3F]',
        headline: (
          <>
            I build the systems that give your team <br />
            <span className="italic text-black/20">their time back.</span>
          </>
        ),
        subhead: "Most consultants sell ideas. I build infrastructure. The kind that runs while you sleep, captures every lead, and stops your best people from drowning in admin.",
        timeline: [
          {
            id: 'a1',
            icon: FlaskConical,
            label: 'PHASE 01 // THE APPROACH',
            title: 'Custom Processes, Not Templates',
            text: "I spent years in chemical research building custom treatment systems for mining and industrial companies. No two companies had the same process. I learned that real solutions are engineered for each situation — never copy-pasted."
          },
          {
            id: 'a2',
            icon: Award,
            label: 'PHASE 02 // THE STANDARD',
            title: 'High Standards, No Shortcuts',
            text: "Whether it's a CRM setup or a full automation system, I push for precision. In chemistry, if you miss a step, the reaction fails. Same applies to business systems. I don't ship until it works properly."
          },
          {
            id: 'a3',
            icon: Wrench,
            label: 'PHASE 03 // THE TOOLS',
            title: 'Enterprise-Grade for Real Businesses',
            text: "I use the same tools as large agencies — HubSpot, Make.com, AI assistants, dashboards — but for real-world businesses. Tradies, wholesalers, service companies. You don't need to be a tech startup to have professional systems."
          },
          {
            id: 'a4',
            icon: Target,
            label: 'PHASE 04 // THE RESULT',
            title: 'Freedom to Do Your Actual Job',
            text: "The goal is simple: give people the freedom they need to use their talent. If your sales team is doing data entry, something is broken. I fix that."
          }
        ],
        credentials: [
          { label: '24+ Certifications' },
          { label: 'HubSpot Marketing Automation' },
          { label: 'Based in Sydney' },
          { label: 'Same-Day Response' }
        ],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000",
        imageCaption: "Fig. 01 // Logic_Stream"
      },
      human: {
        label: '/ THE ARCHITECT',
        accent: 'text-[#C5A059]',
        bgAccent: 'bg-[#C5A059]',
        borderAccent: 'border-[#C5A059]',
        headline: (
          <>
            From lab coats to spreadsheets <br />
            <span className="italic text-[#C5A059]">to freedom.</span>
          </>
        ),
        subhead: "I've been the person doing the admin at midnight. Running payroll, chasing invoices, managing staff while trying to grow a business. That's why I build systems that actually work for real people.",
        timeline: [
          {
            id: 'h1',
            icon: FlaskConical,
            label: 'CHAPTER 01 // THE SCIENTIST',
            title: 'Started in the Lab',
            text: "I trained as a chemist in Chile, working on water treatment research for mining companies. Every project needed a custom process — no templates, just problem-solving from scratch. That's where I learned to see systems as reactions that can be engineered."
          },
          {
            id: 'h2',
            icon: Coffee,
            label: 'CHAPTER 02 // THE OWNER',
            title: 'Built My Own Business',
            text: "I opened an artistic café in Santiago. Events, classes, artist exhibitions — we built a community space from nothing. I did everything: hiring, payroll, spreadsheets, marketing, inventory. I know what it costs to run a business with your own hands."
          },
          {
            id: 'h3',
            icon: Globe,
            label: 'CHAPTER 03 // THE OPERATOR',
            title: 'Managed Across Cultures',
            text: "I ran an international fitness franchise in Southeast Asia. Different country, different culture, different expectations. I learned to adapt systems to people — not force people into systems. Then luxury car sales in Sydney taught me how to communicate value to high-end clients."
          },
          {
            id: 'h4',
            icon: Code2,
            label: 'CHAPTER 04 // THE BUILDER',
            title: 'Now I Build for Others',
            text: "After studying marketing automation, front-end development, and business analytics, I put it all together. I build the systems I wish I'd had when I was running my café — so business owners can focus on the work that actually matters."
          }
        ],
        quote: "Give people the freedom they need to use their talent.",
        attribution: "— Felipe Chaparro",
        funFact: {
          label: "Off the Clock",
          body: "When I'm not building systems, I play guitar and dance Bachata. Structure and improvisation — that's how I see everything."
        },
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
            / Return to Home
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
                className={`px-8 py-4 text-xs font-mono uppercase tracking-[0.25em] font-bold transition-all duration-300 relative overflow-hidden ${
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
                className={`px-8 py-4 text-xs font-mono uppercase tracking-[0.25em] font-bold transition-all duration-300 relative overflow-hidden ${
                  mode === 'human' 
                  ? 'text-[#1a1a1a] bg-[#FFF2EC] border-x border-t border-black/10' 
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                }`}
                style={mode === 'human' ? { boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' } : {}}
              >
                THE_HUMAN
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
           
           {/* LEFT: VIDEOS (9:16 ratio) */}
           <div className="lg:col-span-5 hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={mode}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="sticky top-32 space-y-6"
                >
                  {mode === 'architect' ? (
                    <div className="aspect-[9/16] relative overflow-hidden border border-black/10 bg-[#1a1a1a]">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src="/videos/architect-mode.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="aspect-[9/16] relative overflow-hidden border border-black/10 bg-[#1a1a1a]">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src="/videos/human-mode.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
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
                    <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-xl border-l-2 border-black/5 pl-6">
                      {current.subhead}
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

                  {/* ARCHITECT MODE: CREDENTIALS BAR */}
                  {mode === 'architect' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-b border-black/10 py-8 mt-16"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {content.architect.credentials.map((cred, idx) => (
                          <div key={idx} className="text-center">
                            <div className="font-mono text-sm font-bold text-[#1a1a1a]">{cred.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* HUMAN MODE: QUOTE & FUN FACT */}
                  {mode === 'human' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-12 mt-16"
                    >
                      {/* QUOTE BLOCK */}
                      <div className="border-l-4 border-[#C5A059] pl-8 py-8 bg-[#C5A059]/5">
                        <Quote className="w-8 h-8 text-[#C5A059] mb-4" />
                        <p className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-4 italic">
                          "{content.human.quote}"
                        </p>
                        <p className="font-mono text-sm text-[#1a1a1a]/60 uppercase tracking-widest">
                          {content.human.attribution}
                        </p>
                      </div>

                      {/* FUN FACT */}
                      <div className="p-8 border border-black/10 bg-white">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] mb-2 block font-bold text-[#C5A059]">
                          {content.human.funFact.label}
                        </span>
                        <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                          {content.human.funFact.body}
                        </p>
                      </div>
                    </motion.div>
                  )}

                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">
             {mode === 'architect' ? "Ready to build your system?" : "Let's talk about your business."}
           </h2>
           <button 
             onClick={() => handleNavigate('contact')}
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
    </motion.div>
  );
};

export default ArchitectPage;
