import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  Truck, HardHat, Heart, 
  Coffee, Package, TrendingUp, 
  Briefcase, AlertTriangle, Calculator, 
  Clock, Store, ShieldCheck, 
  CheckCircle, ChevronDown, ChevronRight, HelpCircle
} from 'lucide-react';
import PillarVisual_Helix from '../../components/PillarVisual_Helix';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (GOLD THEME: #C5A059) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'media' && (
        // ANIMATION: "The Audio Wave"
        <div className="flex items-center gap-1 h-12">
            {[1, 2, 4, 3, 5, 4, 2, 1, 3, 5, 2].map((h, i) => (
                <motion.div 
                    key={i}
                    className="w-1.5 bg-[#C5A059] rounded-full"
                    animate={{ height: [10, h * 8, 10] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                />
            ))}
        </div>
      )}

      {tierKey === 'matrix' && (
        // ANIMATION: "The QR Scan"
        <div className="relative w-20 h-20 border-2 border-[#C5A059] p-1 flex flex-wrap gap-1 content-start rounded-sm">
             {/* QR Dots */}
             {[...Array(16)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="w-3.5 h-3.5 bg-[#C5A059]/20 rounded-[1px]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, delay: Math.random(), repeat: Infinity }}
                />
             ))}
             {/* Scanning Line */}
             <motion.div 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 w-full h-[2px] bg-[#C5A059] shadow-[0_0_10px_#C5A059]"
             />
        </div>
      )}

      {tierKey === 'visuals' && (
        // ANIMATION: "The Diagram"
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Top Node */}
            <div className="w-6 h-6 border border-[#C5A059] flex items-center justify-center absolute top-2">
                <div className="w-1.5 h-1.5 bg-[#C5A059]" />
            </div>
            {/* Lines */}
            <div className="absolute w-[1px] h-8 bg-[#C5A059]/40 top-8" />
            <div className="absolute w-16 h-[1px] bg-[#C5A059]/40 top-16" />
            <div className="absolute w-[1px] h-4 bg-[#C5A059]/40 top-16 left-[calc(50%-32px)]" />
            <div className="absolute w-[1px] h-4 bg-[#C5A059]/40 top-16 right-[calc(50%-32px)]" />
            
            {/* Bottom Nodes */}
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-4 h-4 bg-[#C5A059] absolute top-[72px] left-[calc(50%-40px)] rounded-sm" 
            />
            <div className="w-4 h-4 border border-[#C5A059] absolute top-[72px] right-[calc(50%-40px)] rounded-sm" />
        </div>
      )}

      {tierKey === 'analyst' && (
        // ANIMATION: "The Knowledge Node"
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
                className="w-10 h-10 bg-[#1a1a1a] border border-[#C5A059] rounded-full z-10 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <div className="w-3 h-3 bg-[#C5A059] rounded-full shadow-[0_0_15px_#C5A059]" />
            </motion.div>
            <motion.div 
                className="absolute w-20 h-20 border border-[#C5A059]/20 rounded-full border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
             <motion.div 
                className="absolute w-28 h-28 border border-[#C5A059]/10 rounded-full"
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  toolAdoption: {
    id: 'toolAdoption',
    label: "SERVICE 01 / TOOL ADOPTION",
    hook: "I need my team to use the tools.",
    summary: "Who this is for: Businesses launching new software",
    sprint: "",
    specs: ['Tool-specific training', 'Quick-start guides', 'Video walkthroughs', 'Q&A support'],
    personas: [
      {
        id: "shelfware",
        icon: Truck,
        title: "The Shelfware Buyer",
        examples: "Has paid for tools nobody uses",
        painTitle: "We bought HubSpot a year ago. Nobody uses it. It's expensive shelfware.",
        painText: "We bought HubSpot a year ago. Nobody uses it. It's expensive shelfware.",
        solution: "I retrain your team with short videos and simple processes. The tool you already paid for starts working."
      },
      {
        id: "newsystem",
        icon: HardHat,
        title: "The New System Launcher",
        examples: "Rolling out new software",
        painTitle: "We're switching CRMs next month. Last time we did this, it took 6 months for people to use it properly.",
        painText: "We're switching CRMs next month. Last time we did this, it took 6 months for people to use it properly.",
        solution: "I create training before launch. Day one, everyone knows what to do. No fumbling."
      },
      {
        id: "resistant",
        icon: Heart,
        title: "The Resistant Team",
        examples: "Staff who prefer the old way",
        painTitle: "My team refuses to use the new system. They say the old spreadsheet was fine.",
        painText: "My team refuses to use the new system. They say the old spreadsheet was fine.",
        solution: "I make training so simple they can't say no. 5-minute videos, not 2-hour workshops."
      }
    ]
  },
  processTraining: {
    id: 'processTraining',
    label: "SERVICE 02 / PROCESS TRAINING",
    hook: "I need processes documented.",
    summary: "Who this is for: Businesses documenting how they work",
    sprint: "",
    specs: ['Process documentation', 'Training videos', 'Checklists', 'Competency tracking'],
    personas: [
      {
        id: "tribal",
        icon: Coffee,
        title: "The Tribal Knowledge Problem",
        examples: "Key processes live in one person's head",
        painTitle: "If Sarah leaves, we're in trouble. She's the only one who knows how to do half of this.",
        painText: "If Sarah leaves, we're in trouble. She's the only one who knows how to do half of this.",
        solution: "I extract what Sarah knows and turn it into documented processes anyone can follow."
      },
      {
        id: "inconsistent",
        icon: Package,
        title: "The Inconsistent Team",
        examples: "Different people doing the same task differently",
        painTitle: "Every salesperson does their own thing. Some follow up, some don't. No consistency.",
        painText: "Every salesperson does their own thing. Some follow up, some don't. No consistency.",
        solution: "I create one clear process with training. Everyone does it the same way. Results become predictable."
      },
      {
        id: "scaling",
        icon: TrendingUp,
        title: "The Scaling Challenge",
        examples: "Hiring fast and struggling to onboard",
        painTitle: "We're hiring 3 people a month. Training each one individually is burning out our managers.",
        painText: "We're hiring 3 people a month. Training each one individually is burning out our managers.",
        solution: "I build onboarding training they can do themselves. Managers freed up, new hires productive faster."
      }
    ]
  },
  videoLibrary: {
    id: 'videoLibrary',
    label: "SERVICE 03 / VIDEO LIBRARY",
    hook: "I need self-service training.",
    summary: "Who this is for: Businesses wanting self-service training",
    sprint: "",
    specs: ['Custom video creation', 'Searchable library', 'Progress tracking', 'Regular updates'],
    personas: [
      {
        id: "repeat",
        icon: Briefcase,
        title: "The Repeat Trainer",
        examples: "Answers the same how-to questions weekly",
        painTitle: "Every week someone asks me how to do the same thing. I've explained it 50 times.",
        painText: "Every week someone asks me how to do the same thing. I've explained it 50 times.",
        solution: "I record it once. Next time someone asks, you send the video. Hours saved."
      },
      {
        id: "remote",
        icon: AlertTriangle,
        title: "The Remote Team",
        examples: "Distributed workforce",
        painTitle: "I can't sit next to people and show them. They're in different cities.",
        painText: "I can't sit next to people and show them. They're in different cities.",
        solution: "Video library they can access anytime. Training that doesn't require you to be there."
      },
      {
        id: "compliance",
        icon: Calculator,
        title: "The Compliance Box",
        examples: "Industries requiring training records",
        painTitle: "I need to prove staff completed training but I have no system for tracking it.",
        painText: "I need to prove staff completed training but I have no system for tracking it.",
        solution: "Video library with completion tracking. Audit-ready records without the admin."
      }
    ]
  },
  changeManagement: {
    id: 'changeManagement',
    label: "SERVICE 04 / CHANGE MANAGEMENT",
    hook: "I need help with big changes.",
    summary: "Who this is for: Businesses making big shifts",
    sprint: "",
    specs: ['Change planning', 'Phased training', 'Communication templates', 'Resistance management'],
    personas: [
      {
        id: "transformation",
        icon: Clock,
        title: "The Transformation",
        examples: "Major system or process overhaul",
        painTitle: "We're changing everything. New CRM, new processes, new expectations. Staff are overwhelmed.",
        painText: "We're changing everything. New CRM, new processes, new expectations. Staff are overwhelmed.",
        solution: "I phase the rollout with training at each stage. Change happens gradually, not all at once."
      },
      {
        id: "merger",
        icon: Store,
        title: "The Merger",
        examples: "Combining two teams or companies",
        painTitle: "We acquired a business but they do everything differently. Integration is chaos.",
        painText: "We acquired a business but they do everything differently. Integration is chaos.",
        solution: "I document both approaches, design the new way, and train both teams together."
      },
      {
        id: "leadership",
        icon: ShieldCheck,
        title: "The Leadership Change",
        examples: "New owner or manager taking over",
        painTitle: "I'm taking over and I don't know how anything works. No documentation exists.",
        painText: "I'm taking over and I don't know how anything works. No documentation exists.",
        solution: "I interview the team, document current processes, and create training so you understand the business."
      }
    ]
  }
};

const Pillar6: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('toolAdoption');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('toolAdoption');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar6');
  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);

  // Scroll Animation
  useAnimationFrame((time, delta) => {
    const currentY = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    let newY = currentY + (speed * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);
  });

  const currentTier = TIERS[activeTier];
  const currentPersona = currentTier.personas[activePersonaIndex];

  // --- AUTO SCROLL FUNCTION ---
  const handleScrollTo = (id: string) => {
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Header offset
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
      
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
        }
    }, 300); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          
          {/* NAVIGATION - STANDARDIZED */}
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
               <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                   THE SYSTEM / SCALE FASTER
                 </span>
               </div>

               {/* STANDARD H1 */}
               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Team <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Training.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 New software only works if your team actually uses it. I build short training videos and SOPs that make adoption easy — no 3-hour Zoom calls, no confusion.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Helix />
               </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-[#1a1a1a]/10 overflow-hidden z-0">
          <motion.div 
            style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }}
            className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" 
          />
        </div>
      </section>

      {/* --- ENGINE CONFIGURATOR --- */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-32 max-w-[1400px] mx-auto border-t border-[#1a1a1a]/10">

        {/* HEADER */}
        <div className="mb-16">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           {/* STANDARD H2 */}
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6">
             Select your <span className="italic text-[#C5A059] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               Training is usually the bottleneck to scaling. I've mapped out the 4 ways we speed up knowledge transfer. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the problem you have</strong> to see the solution.
             </p>
           </div>
        </div>

        {/* --- DESKTOP VIEW: TABBED DASHBOARD (HIDDEN ON MOBILE) --- */}
        <div className="hidden md:block border border-black/10 bg-gradient-to-br from-white to-[#FFF9F0] shadow-sm mb-32 rounded-sm overflow-hidden">
           {/* TABS (GOLD HIGHLIGHTS) */}
           <div className="grid grid-cols-4 border-b border-black/10 bg-[#FAFAFA]">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTier(key as keyof typeof TIERS)}
                  className={`py-6 px-4 text-center transition-all duration-300 relative group overflow-hidden flex flex-col justify-center min-h-[100px] ${
                    activeTier === key ? 'bg-white' : 'hover:bg-white/50 text-black/40'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-2 ${activeTier === key ? 'text-[#C5A059]' : 'text-inherit'}`}>
                    {tier.label}
                  </span>
                  <span className={`font-serif text-lg leading-tight ${activeTier === key ? 'text-black' : 'text-inherit opacity-60'}`}>
                    "{tier.hook}"
                  </span>
                  {activeTier === key && <motion.div layoutId="tab-highlight" className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]" />}
                </button>
              ))}
           </div>
           
           {/* CONTENT: SPLIT VIEW */}
           <div className="flex min-h-[600px]">
              {/* LEFT: Persona List */}
              <div className="w-1/3 border-r border-black/10 bg-[#FAFAFA] p-8 flex flex-col">
                 
                 {/* INTRO SUMMARY */}
                 <div className="mb-8 p-4 bg-white border border-black/5 rounded-sm">
                    <div className="flex gap-2 items-center mb-2">
                       <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                       <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-black/60">Is this you?</span>
                    </div>
                    <p className="font-sans text-sm text-black/70 leading-relaxed">
                       {currentTier.summary}
                    </p>
                 </div>

                 <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-4 block pl-1">Select Profile</span>
                 <div className="space-y-3 flex-grow">
                    {currentTier.personas.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePersonaIndex(idx)}
                        className={`w-full text-left p-4 border rounded-sm transition-all duration-300 flex items-center gap-4 group ${
                           activePersonaIndex === idx ? 'bg-white border-[#C5A059] shadow-md' : 'bg-transparent border-transparent hover:bg-white hover:border-black/5'
                        }`}
                      >
                         <div className={`p-2 rounded-full ${activePersonaIndex === idx ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-black/5 text-black/40'}`}>
                           <p.icon className="w-4 h-4" />
                         </div>
                         <div>
                           <h4 className={`font-serif text-lg leading-tight ${activePersonaIndex === idx ? 'text-black' : 'text-black/60'}`}>{p.title}</h4>
                         </div>
                         {activePersonaIndex === idx && <ChevronRight className="w-4 h-4 ml-auto text-[#C5A059]" />}
                      </button>
                    ))}
                 </div>

                 {/* SPECS LIST */}
                 <div className="mt-8 pt-8 border-t border-black/5">
                    <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-4 block">Included Specs</span>
                    <ul className="space-y-2">
                      {currentTier.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                          <CheckCircle className="w-3 h-3 text-[#C5A059]" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>

              {/* RIGHT: Solution */}
              <div className="w-2/3 p-12 relative flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div 
                       key={`${activeTier}-${activePersonaIndex}`}
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                       className="flex-grow flex flex-col"
                    >
                       <div className="mb-10">
                          <span className="text-[#C5A059] font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block">The Problem</span>
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#C5A059] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-4 font-bold">The Fix</span>
                                <p className="font-sans text-lg leading-relaxed mb-8">{currentPersona.solution}</p>
                                
                                <div className="w-fit">
                                  <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                                    [ BOOK A CALL ]
                                  </CTAButton>
                                </div>
                             </div>
                             {/* VISUAL ON DESKTOP */}
                             <div className="w-32 hidden lg:block flex-shrink-0">
                                <TierVisual tierKey={activeTier} />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  </AnimatePresence>
              </div>
           </div>
        </div>

        {/* --- MOBILE VIEW: HIGH-CONTRAST VERTICAL ACCORDION (VISIBLE ON MOBILE) --- */}
        <div className="md:hidden space-y-4 mb-32">
          {Object.entries(TIERS).map(([key, tier]) => {
            const isTierExpanded = expandedTier === key;
            return (
              <div 
                key={key} 
                id={`tier-mobile-${key}`} 
                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isTierExpanded ? 'border-[#1a1a1a] bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
                
                {/* LEVEL 1: TIER HEADER (DARK MODE WHEN ACTIVE) */}
                <button 
                  onClick={() => {
                    const willExpand = !isTierExpanded;
                    setExpandedTier(willExpand ? key as keyof typeof TIERS : null);
                    setExpandedPersona(null); 
                    if (willExpand) {
                        handleScrollTo(`tier-mobile-${key}`);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${isTierExpanded ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
                >
                  <div>
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-[#C5A059]' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    <span className={`font-serif text-lg leading-tight ${isTierExpanded ? 'text-white' : 'text-black'}`}>"{tier.hook}"</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTierExpanded ? 'rotate-180 text-[#C5A059]' : 'text-black/30'}`} />
                </button>

                {/* LEVEL 1 CONTENT: PERSONA LIST */}
                <AnimatePresence>
                  {isTierExpanded && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden bg-[#FAFAFA]"
                    >
                      <div className="p-4 space-y-2">
                         {/* INTRO SUMMARY */}
                         <div className="mb-6 p-4 bg-white border border-black/5 rounded-sm">
                            <p className="font-sans text-sm text-black/70 leading-relaxed">
                               <strong className="text-[#C5A059] block mb-1 font-bold uppercase text-[9px] tracking-widest">Is this you?</strong>
                               {tier.summary}
                            </p>
                         </div>

                         <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold block mb-2 px-2">Select Profile:</span>
                         
                         {tier.personas.map((p) => {
                           const isPersonaExpanded = expandedPersona === p.id;
                           return (
                             <div 
                                key={p.id} 
                                id={`persona-mobile-${p.id}`} 
                                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isPersonaExpanded ? 'border-[#C5A059] bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
                               
                               {/* LEVEL 2: PERSONA HEADER (GOLD ACCENT WHEN ACTIVE) */}
                               <button 
                                 onClick={() => {
                                    const willExpand = !isPersonaExpanded;
                                    setExpandedPersona(willExpand ? p.id : null);
                                    if (willExpand) {
                                        handleScrollTo(`persona-mobile-${p.id}`); 
                                    }
                                 }}
                                 className="w-full flex items-center gap-4 p-4 text-left hover:bg-black/5 transition-colors"
                               >
                                  <div className={`p-2 rounded-full ${isPersonaExpanded ? 'bg-[#C5A059] text-[#1a1a1a]' : 'bg-black/5 text-black/40'}`}>
                                     <p.icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-grow">
                                     <h4 className={`font-serif text-lg leading-tight ${isPersonaExpanded ? 'text-[#C5A059]' : 'text-black/70'}`}>{p.title}</h4>
                                     <span className="text-[10px] text-black/40 block mt-1 line-clamp-1">{p.examples}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${isPersonaExpanded ? 'rotate-180 text-[#C5A059]' : 'text-black/20'}`} />
                               </button>

                               {/* LEVEL 2 CONTENT: SOLUTION */}
                               <AnimatePresence>
                                 {isPersonaExpanded && (
                                   <motion.div
                                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                     className="border-t border-[#C5A059]/20 bg-white"
                                   >
                                      <div className="p-6">
                                         {/* Pain */}
                                         <div className="mb-6">
                                            <span className="text-[#E21E3F] font-mono text-[9px] uppercase tracking-widest font-bold mb-2 block">The Problem</span>
                                            <h5 className="font-serif text-2xl mb-2 text-[#1a1a1a]">{p.painTitle}</h5>
                                            <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed italic border-l-2 border-[#E21E3F] pl-4">"{p.painText}"</p>
                                         </div>

                                         {/* Solution */}
                                         <div className="bg-[#1a1a1a] p-6 text-white rounded-sm mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/20 rounded-full blur-2xl" />
                                            <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-3 font-bold relative z-10">The Fix</span>
                                            <p className="font-sans text-base leading-relaxed mb-6 relative z-10">{p.solution}</p>
                                            
                                            {/* VISUAL ON MOBILE - Pure Gold on Transparent */}
                                            <div className="w-full flex justify-center py-4 bg-transparent relative z-10">
                                               <div className="w-24">
                                                 <TierVisual tierKey={key} />
                                               </div>
                                            </div>
                                         </div>

                                         {/* STANDARDIZED CTA BUTTON MOBILE */}
                                         <div className="w-full">
                                            <CTAButton theme="dark" onClick={() => onNavigate('contact')} className="w-full">
                                                [ BOOK A CALL ]
                                            </CTAButton>
                                         </div>

                                         {/* Specs List */}
                                         <div className="mt-8 pt-6 border-t border-black/10">
                                            <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-3 block">Included Specs</span>
                                            <ul className="space-y-2">
                                              {tier.specs.map((spec, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                                                  <CheckCircle className="w-3 h-3 text-[#C5A059]" />
                                                  {spec}
                                                </li>
                                              ))}
                                            </ul>
                                         </div>
                                      </div>
                                   </motion.div>
                                 )}
                               </AnimatePresence>
                             </div>
                           )
                         })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </section>

      {/* FAQ SECTION */}
      <FAQSection
        faqs={pillarFAQs}
        accentColor="#C5A059"
        title="Questions about training?"
        subtitle="Common questions about team training and adoption."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar6;