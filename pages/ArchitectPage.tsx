import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Code2, Database, Zap, 
  Globe, Quote, Terminal, Fingerprint, Scan, FlaskConical, 
  Award, Wrench, Target
} from 'lucide-react';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

// FIX: Explicitly defined interface to resolve the "cannot find" error
interface ArchitectPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- COMPONENT: VIDEO HUD ---
const VideoHUD: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-20 p-4 md:p-6 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
         <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm w-fit">
            <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full" />
            <span className="font-mono text-[9px] text-white/90 tracking-widest">REC</span>
         </div>
      </div>
      <Scan className="w-5 h-5 text-white/60" />
    </div>
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-white/10 rounded-full flex items-center justify-center opacity-50">
       <div className="w-1 h-1 bg-white/50 rounded-full" />
    </div>

    <div className="flex justify-between items-end">
      <div className="space-y-1 font-mono text-[8px] md:text-[9px] text-white/60 tracking-widest">
         <div>ISO: 800</div>
         <div>FPS: 60</div>
      </div>
      <div className="border border-white/20 px-2 py-1 bg-black/20 backdrop-blur-sm">
         <span className="font-mono text-[9px] text-[#E21E3F] tracking-widest uppercase font-bold">System Active</span>
      </div>
    </div>
  </div>
);

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

// FIX: Correctly applied the interface to the component
const ArchitectPage: React.FC<ArchitectPageProps> = ({ onBack, onNavigate }) => {
  const [mode, setMode] = useState<'architect' | 'human'>('architect');
  
  const content = {
      architect: {
        label: '/ THE ARCHITECT',
        accent: 'text-[#E21E3F]',
        headline: (
          <>
            I build the systems that give your team <br className="hidden md:block" />
            <span className="italic font-serif text-[#C5A059]">their time back.</span>
          </>
        ),
        subhead: "Most consultants sell ideas. I build infrastructure. The kind that runs while you sleep and stops your best people from drowning in admin.",
        timeline: [
          { id: 'a1', icon: FlaskConical, label: 'PHASE 01 / THE APPROACH', title: 'Custom Processes, Not Templates', text: "Real solutions are engineered for the specific situation — never copy-pasted." },
          { id: 'a2', icon: Award, label: 'PHASE 02 / THE STANDARD', title: 'High Standards, No Shortcuts', text: "In chemistry, if you miss a step, the reaction fails. Same applies to business systems." },
          { id: 'a3', icon: Wrench, label: 'PHASE 03 / THE TOOLS', title: 'Enterprise-Grade', text: "I use the same tools as large agencies — HubSpot, Make.com — but for real-world businesses." },
          { id: 'a4', icon: Target, label: 'PHASE 04 / THE RESULT', title: 'Freedom to Do Your Actual Job', text: "If your sales team is doing data entry, something is broken. I fix that." }
        ],
        credentials: [
          { label: '24+ Certifications', icon: Award },
          { label: 'HubSpot Expert', icon: Database },
          { label: 'Based in Sydney', icon: Globe },
          { label: 'Same-Day Response', icon: Zap }
        ]
      },
      human: {
        label: '/ THE ARCHITECT',
        accent: 'text-[#C5A059]',
        headline: (
          <>
            From lab coats <br className="md:hidden" /> to spreadsheets <br className="hidden md:block" />
            <span className="italic font-serif text-[#C5A059]">to freedom.</span>
          </>
        ),
        subhead: "I've been the person doing the admin at midnight. Running payroll, chasing invoices. That's why I build systems that actually work for real people.",
        timeline: [
          { id: 'h1', icon: FlaskConical, label: 'CHAPTER 01 / THE SCIENTIST', title: 'Started in the Lab', text: "I trained as a chemist in Chile. Every project needed a custom process — no templates, just problem-solving." },
          { id: 'h2', icon: Coffee, label: 'CHAPTER 02 / THE OWNER', title: 'Built My Own Business', text: "I opened a café in Santiago. I did everything: hiring, payroll, marketing. I know what it costs to run a business." },
          { id: 'h3', icon: Globe, label: 'CHAPTER 03 / THE OPERATOR', title: 'Managed Across Cultures', text: "I ran a fitness franchise in Southeast Asia. I learned to adapt systems to people — not force people into systems." },
          { id: 'h4', icon: Code2, label: 'CHAPTER 04 / THE BUILDER', title: 'Now I Build for Others', text: "After studying marketing automation and business analytics, I put it all together. I build the systems I wish I'd had when I was running my café — so you can focus on the work that matters." }
        ],
        quote: "Give people the freedom they need to use their talent.",
        attribution: "— Felipe Chaparro",
        funFact: { label: "Off the Clock", body: "When I'm not building systems, I play guitar and dance Bachata. Structure and improvisation." }
      }
  };
  
  const current = content[mode];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] relative z-[150] flex flex-col selection:bg-[#C5A059]/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        <div className="flex justify-between items-center mb-12 md:mb-20 pt-24 relative z-[200]">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HEADER & SWITCH */}
        <Section className="mb-16 md:mb-24 relative text-center lg:text-left">
           <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-center lg:justify-start">
             <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">/</span>
             <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">{current.label.replace('/', '').trim()}</span>
           </div>
           
           <div className="flex items-center gap-0 mb-12 border border-[#1a1a1a]/10 bg-white p-1 rounded-sm w-fit shadow-lg mx-auto lg:mx-0">
              <button 
                onClick={() => setMode('architect')}
                className={`px-5 md:px-8 py-3.5 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm flex items-center gap-2 ${
                  mode === 'architect' ? 'text-[#FFF2EC] bg-[#1a1a1a] shadow-md' : 'text-[#1a1a1a]/40'
                }`}
              >
                {mode === 'architect' && <Terminal className="w-3 h-3" />} THE ARCHITECT
              </button>
              <button 
                onClick={() => setMode('human')}
                className={`px-5 md:px-8 py-3.5 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm flex items-center gap-2 ${
                  mode === 'human' ? 'text-[#1a1a1a] bg-[#C5A059] shadow-md' : 'text-[#1a1a1a]/40'
                }`}
              >
                {mode === 'human' && <Fingerprint className="w-3 h-3" />} THE HUMAN
              </button>
           </div>

           <AnimatePresence mode="wait">
             <motion.h1
               key={mode}
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="font-serif text-3xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] max-w-5xl mb-6 md:mb-10 mx-auto lg:mx-0"
             >
               {current.headline}
             </motion.h1>
           </AnimatePresence>
        </Section>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
           <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full max-w-[400px] mx-auto lg:max-w-none">
                    <div className={`aspect-[9/16] relative overflow-hidden transition-all duration-500 shadow-2xl ${
                        mode === 'architect' ? 'rounded-sm border-2 border-[#1a1a1a]' : 'rounded-t-full border-4 border-[#C5A059]/20'
                    }`}>
                      <video key={mode} className="w-full h-full object-cover grayscale contrast-110" autoPlay loop muted playsInline>
                        <source src={mode === 'architect' ? "/videos/architect-mode.mp4" : "/videos/human-mode.mp4"} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/10" />
                      {mode === 'architect' && <VideoHUD />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
           </div>

           <div className="lg:col-span-7 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
                  <Section>
                    <p className={`font-sans text-lg md:text-xl font-light leading-relaxed border-l-2 pl-6 mb-8 ${mode === 'architect' ? 'border-[#E21E3F]' : 'border-[#C5A059]'}`}>
                      {current.subhead}
                    </p>
                  </Section>

                  <div className="relative ml-3 md:ml-6 space-y-0">
                    <div className="absolute left-0 top-4 bottom-4 w-px bg-[#1a1a1a]/10" />
                    {current.timeline.map((step, idx) => (
                      <Section key={step.id} delay={idx * 0.1} className="relative pl-12 md:pl-16 pb-16 group last:pb-0">
                         <div className={`absolute -left-3 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-4 border-[#FFF2EC] z-10 ${mode === 'architect' ? 'bg-[#1a1a1a] text-white' : 'bg-[#C5A059] text-white'}`}>
                            <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                         </div>
                         <h4 className="font-serif text-2xl md:text-3xl mb-4">{step.title}</h4>
                         <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed max-w-lg">{step.text}</p>
                      </Section>
                    ))}
                  </div>

                  {mode === 'architect' && (
                    <Section className="bg-white p-6 border border-black/5 rounded-sm">
                      <div className="grid grid-cols-2 gap-4">
                        {content.architect.credentials.map((cred, i) => (
                          <div key={i} className="flex items-center gap-3">
                             <cred.icon className="w-4 h-4 text-[#1a1a1a]/40" />
                             <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase">{cred.label}</span>
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
        
        <Section className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-4xl md:text-7xl tracking-tighter mb-12">
             Ready to build your <span className="italic font-serif text-[#C5A059]">System?</span>
           </h2>
           <CTAButton theme={mode === 'architect' ? 'light' : 'dark'} onClick={() => onNavigate('contact')}>
             [ BOOK A CALL ]
           </CTAButton>
        </Section>
      </div>
    </motion.div>
  );
};

export default ArchitectPage;