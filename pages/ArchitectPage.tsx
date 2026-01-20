import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Code2, Database, Zap, 
  Globe, Quote, Terminal, Fingerprint, Scan, FlaskConical, 
  Award, Wrench, Target
} from 'lucide-react';
import CTAButton from '../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../components/BackButton'; // STANDARDIZED BACK LINK

interface ArchitectPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- COMPONENT: VIDEO HUD (HEADS UP DISPLAY) ---
const VideoHUD: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-20 p-6 flex flex-col justify-between">
    {/* Top Bar */}
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
         <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm w-fit">
            <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full" />
            <span className="font-mono text-[9px] text-white/90 tracking-widest">REC</span>
         </div>
         <span className="font-mono text-[9px] text-white/50 tracking-widest pl-1">[00:12:44]</span>
      </div>
      <Scan className="w-6 h-6 text-white/60" />
    </div>
    
    {/* Center Crosshair */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center opacity-50">
       <div className="w-1 h-1 bg-white/50 rounded-full" />
       <div className="absolute top-0 w-px h-2 bg-white/50" />
       <div className="absolute bottom-0 w-px h-2 bg-white/50" />
       <div className="absolute left-0 h-px w-2 bg-white/50" />
       <div className="absolute right-0 h-px w-2 bg-white/50" />
    </div>

    {/* Bottom Bar */}
    <div className="flex justify-between items-end">
      <div className="space-y-1 font-mono text-[9px] text-white/60 tracking-widest">
         <div>ISO: 800</div>
         <div>FPS: 60</div>
         <div>SHUTTER: 1/50</div>
      </div>
      <div className="border border-white/20 px-2 py-1 bg-black/20 backdrop-blur-sm">
         <span className="font-mono text-[9px] text-[#E21E3F] tracking-widest uppercase font-bold">System Active</span>
      </div>
    </div>
  </div>
);

// --- COMPONENT: SECTION WRAPPER ---
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
        headline: (
          <>
            I build the systems that give your team <br />
            <span className="italic font-serif text-[#C5A059]">their time back.</span>
          </>
        ),
        subhead: "Most consultants sell ideas. I build infrastructure. The kind that runs while you sleep, captures every lead, and stops your best people from drowning in admin.",
        timeline: [
          {
            id: 'a1',
            icon: FlaskConical,
            label: 'PHASE 01 / THE APPROACH',
            title: 'Custom Processes, Not Templates',
            text: "I spent years in chemical research building custom treatment systems. No two companies had the same process. I learned that real solutions are engineered for the specific situation — never copy-pasted."
          },
          {
            id: 'a2',
            icon: Award,
            label: 'PHASE 02 / THE STANDARD',
            title: 'High Standards, No Shortcuts',
            text: "Whether it's a CRM setup or a full automation system, I push for precision. In chemistry, if you miss a step, the reaction fails. Same applies to business systems. I don't ship until it works properly."
          },
          {
            id: 'a3',
            icon: Wrench,
            label: 'PHASE 03 / THE TOOLS',
            title: 'Enterprise-Grade for Real Businesses',
            text: "I use the same tools as large agencies — HubSpot, Make.com, AI assistants — but for real-world businesses. You don't need to be a tech startup to have professional systems."
          },
          {
            id: 'a4',
            icon: Target,
            label: 'PHASE 04 / THE RESULT',
            title: 'Freedom to Do Your Actual Job',
            text: "The goal is simple: give people the freedom they need to use their talent. If your sales team is doing data entry, something is broken. I fix that."
          }
        ],
        credentials: [
          { label: '24+ Certifications', icon: Award },
          { label: 'HubSpot Marketing Automation', icon: Database },
          { label: 'Based in Sydney', icon: Globe },
          { label: 'Same-Day Response', icon: Zap }
        ]
      },
      human: {
        label: '/ THE ARCHITECT',
        accent: 'text-[#C5A059]',
        headline: (
          <>
            From lab coats to spreadsheets <br />
            <span className="italic font-serif text-[#C5A059]">to freedom.</span>
          </>
        ),
        subhead: "I've been the person doing the admin at midnight. Running payroll, chasing invoices, managing staff while trying to grow a business. That's why I build systems that actually work for real people.",
        timeline: [
          {
            id: 'h1',
            icon: FlaskConical,
            label: 'CHAPTER 01 / THE SCIENTIST',
            title: 'Started in the Lab',
            text: "I trained as a chemist in Chile, working on water treatment research. Every project needed a custom process — no templates, just problem-solving from scratch. That's where I learned to see systems as reactions that can be engineered."
          },
          {
            id: 'h2',
            icon: Coffee,
            label: 'CHAPTER 02 / THE OWNER',
            title: 'Built My Own Business',
            text: "I opened an artistic café in Santiago. Events, classes, exhibitions — we built a community space from nothing. I did everything: hiring, payroll, spreadsheets, marketing. I know what it costs to run a business with your own hands."
          },
          {
            id: 'h3',
            icon: Globe,
            label: 'CHAPTER 03 / THE OPERATOR',
            title: 'Managed Across Cultures',
            text: "I ran an international fitness franchise in Southeast Asia. Different country, different culture, different expectations. I learned to adapt systems to people — not force people into systems."
          },
          {
            id: 'h4',
            icon: Code2,
            label: 'CHAPTER 04 / THE BUILDER',
            title: 'Now I Build for Others',
            text: "After studying marketing automation and business analytics, I put it all together. I build the systems I wish I'd had when I was running my café — so business owners can focus on the work that actually matters."
          }
        ],
        quote: "Give people the freedom they need to use their talent.",
        attribution: "— Felipe Chaparro",
        funFact: {
          label: "Off the Clock",
          body: "When I'm not building systems, I play guitar and dance Bachata. Structure and improvisation — that's how I see everything."
        }
      }
    };
  
  const current = content[mode];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col selection:bg-[#C5A059]/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        {/* NAV BACK - STANDARDIZED */}
        <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HEADER & SWITCH */}
        <Section className="mb-16 md:mb-24 relative">
           <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
             <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
             <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
               {current.label.replace('/', '').trim()}
             </span>
           </div>
           
           {/* SWITCH: Toggle Board Style */}
           <div className="flex items-center gap-0 mb-12 border border-[#1a1a1a]/10 bg-white p-1 rounded-sm w-fit shadow-lg">
              <button 
                onClick={() => setMode('architect')}
                className={`px-6 md:px-8 py-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 relative overflow-hidden rounded-sm flex items-center gap-2 ${
                  mode === 'architect' 
                  ? 'text-[#FFF2EC] bg-[#1a1a1a] shadow-md' 
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                }`}
              >
                {mode === 'architect' && <Terminal className="w-3 h-3" />}
                THE ARCHITECT
              </button>
              
              <button 
                onClick={() => setMode('human')}
                className={`px-6 md:px-8 py-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 relative overflow-hidden rounded-sm flex items-center gap-2 ${
                  mode === 'human' 
                  ? 'text-[#1a1a1a] bg-[#C5A059] shadow-md' 
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                }`}
              >
                {mode === 'human' && <Fingerprint className="w-3 h-3" />}
                THE HUMAN
              </button>
           </div>

           <AnimatePresence mode="wait">
             <motion.h1
               key={mode}
               initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
               transition={{ duration: 0.5 }}
               className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] max-w-5xl mb-6 md:mb-10"
             >
               {current.headline}
             </motion.h1>
           </AnimatePresence>
        </Section>
        
        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
           
           {/* LEFT: VISUAL (VERTICAL PORTAL - 9:16) */}
           <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={mode}
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="relative group w-full"
                  >
                    {/* The Frame */}
                    <div className={`aspect-[9/16] relative overflow-hidden transition-all duration-500 shadow-2xl ${
                        mode === 'architect' 
                        ? 'rounded-sm border-2 border-[#1a1a1a]' 
                        : 'rounded-t-full border-4 border-[#C5A059]/20 shadow-[0_20px_50px_rgba(197,160,89,0.15)]'
                    }`}>
                      
                      {/* Video Source Swap */}
                      <video
                        key={mode}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                            mode === 'architect' 
                            ? 'grayscale contrast-110 saturate-0' 
                            : 'grayscale-0 saturate-105'
                        }`}
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={mode === 'architect' ? "/videos/architect-mode.mp4" : "/videos/human-mode.mp4"} type="video/mp4" />
                        <img 
                            src={mode === 'architect' ? "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000" : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000"} 
                            className="w-full h-full object-cover"
                            alt=""
                        />
                      </video>

                      {/* Overlays */}
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* Mode Specific Overlays */}
                      {mode === 'architect' && <VideoHUD />}
                      
                      {mode === 'human' && (
                         <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="font-serif text-white/90 text-2xl italic">"Systems should serve people."</p>
                         </div>
                      )}

                    </div>
                    
                    {/* Decorative Elements underneath */}
                    <div className={`absolute -z-10 top-4 -right-4 w-full h-full border border-black/5 rounded-sm ${mode === 'architect' ? 'bg-[#E21E3F]/5' : 'bg-[#C5A059]/10 rounded-t-full'}`} />

                  </motion.div>
                </AnimatePresence>
              </div>
           </div>

           {/* RIGHT: THE NARRATIVE */}
           <div className="lg:col-span-7 pt-0 lg:pt-0 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={mode}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-16"
                >
                  <Section>
                    <p className={`font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 pl-6 mb-8 transition-colors duration-500 ${mode === 'architect' ? 'border-[#E21E3F]' : 'border-[#C5A059]'}`}>
                      {current.subhead}
                    </p>
                  </Section>

                  {/* TIMELINE COMPONENT */}
                  <div className={`relative ml-3 md:ml-6 space-y-0`}>
                    <div className={`absolute left-0 top-4 bottom-4 w-px ${mode === 'architect' ? 'bg-gradient-to-b from-[#E21E3F] to-transparent' : 'bg-[#C5A059]/30'}`} />

                    {current.timeline.map((step, idx) => (
                      <Section key={step.id} delay={idx * 0.1} className="relative pl-12 md:pl-16 pb-16 group last:pb-0">
                         <div className={`absolute -left-3 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-4 border-[#FFF2EC] z-10 transition-all duration-300 group-hover:scale-110 shadow-sm ${mode === 'architect' ? 'bg-[#1a1a1a] text-white' : 'bg-[#C5A059] text-white'}`}>
                            <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                         </div>
                         <div>
                           <div className="flex items-center gap-3 mb-2">
                             <span className={`font-mono text-[9px] uppercase tracking-[0.2em] font-bold ${current.accent}`}>
                               {step.label}
                             </span>
                             <div className={`h-px flex-grow max-w-[50px] ${mode === 'architect' ? 'bg-[#E21E3F]/20' : 'bg-[#C5A059]/20'}`} />
                           </div>
                           <h4 className="font-serif text-2xl md:text-3xl mb-4 text-[#1a1a1a]">
                             {step.title}
                           </h4>
                           <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed max-w-lg">
                             {step.text}
                           </p>
                         </div>
                      </Section>
                    ))}
                  </div>

                  {/* ARCHITECT MODE: CREDENTIALS GRID */}
                  {mode === 'architect' && (
                    <Section delay={0.4} className="bg-white p-6 md:p-8 border border-black/5 shadow-sm mt-8 rounded-sm">
                      <div className="grid grid-cols-2 gap-6">
                        {content.architect.credentials.map((cred, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                             <div className="p-2 bg-[#1a1a1a]/5 rounded-sm">
                               {cred.icon && <cred.icon className="w-4 h-4 text-[#1a1a1a]" />}
                             </div>
                             <span className="font-mono text-[10px] md:text-xs font-bold text-[#1a1a1a] uppercase tracking-wide">{cred.label}</span>
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}

                  {/* HUMAN MODE: PERSONAL TOUCH */}
                  {mode === 'human' && (
                    <div className="space-y-8 mt-8">
                      <Section delay={0.4} className="relative pl-8 py-2">
                        <Quote className="absolute top-0 left-0 w-6 h-6 text-[#C5A059]/40" />
                        <p className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-4 italic leading-tight">
                          "{content.human.quote}"
                        </p>
                        <div className="flex items-center gap-2">
                           <div className="h-px w-8 bg-[#C5A059]" />
                           <p className="font-mono text-xs text-[#1a1a1a]/60 uppercase tracking-widest">
                             {content.human.attribution}
                           </p>
                        </div>
                      </Section>

                      <Section delay={0.5} className="bg-[#C5A059]/5 p-8 border border-[#C5A059]/20 relative overflow-hidden rounded-sm">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3 block font-bold text-[#C5A059]">
                          {content.human.funFact.label}
                        </span>
                        <p className="font-sans text-lg text-[#1a1a1a]/80 leading-relaxed relative z-10">
                          {content.human.funFact.body}
                        </p>
                      </Section>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        {/* FOOTER CTA - STANDARDIZED */}
        <Section className="border-t border-black/10 py-32 flex flex-col items-center text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/[0.02] pointer-events-none" />
           
           <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-[#1a1a1a] mb-12 max-w-6xl mx-auto relative z-10">
             {mode === 'architect' ? (
               <>
                 Ready to build your <span className="italic font-serif text-[#E21E3F]">System?</span>
               </>
             ) : (
               <>
                 Let's talk about your <span className="italic font-serif text-[#C5A059]">Business.</span>
               </>
             )}
           </h2>
           
           {/* STANDARDIZED BUTTON (Swaps Theme based on Mode) */}
           {/* Architect Mode = Black Action Button (Light Theme) */}
           {/* Human Mode = Gold Action Button (Dark Theme simulation for accent) */}
           <CTAButton 
             theme={mode === 'architect' ? 'light' : 'dark'} 
             onClick={() => handleNavigate('contact')}
           >
             [ BOOK A CALL ]
           </CTAButton>
        </Section>

      </div>
    </motion.div>
  );
};

export default ArchitectPage;
