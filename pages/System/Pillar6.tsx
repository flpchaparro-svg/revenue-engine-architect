import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll,
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle,
  Users, Radio, Video, Map, 
  Truck, HardHat, Heart, 
  Coffee, Package, TrendingUp, 
  Briefcase, AlertTriangle, Calculator, 
  Clock, Store, ShieldCheck, 
  Check, ChevronDown, ChevronRight, Terminal, HelpCircle
} from 'lucide-react';
import PillarVisual_Helix from '../../components/PillarVisual_Helix';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../../components/BackButton'; // STANDARDIZED BACK LINK

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (Service Level - Training Specific) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'media' && (
        // ANIMATION: "The Audio Wave" (Learning while driving)
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
        // ANIMATION: "The QR Scan" (Just-in-Time Learning)
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
        // ANIMATION: "The Diagram" (Visual Logic)
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
        // ANIMATION: "The Knowledge Node" (AI Brain)
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
  media: {
    id: 'media',
    label: "TIER 01 / MEDIA",
    hook: "I need them to listen.",
    summary: "Choose this if your team is 'On the Road' (Logistics, Trade, Sales) and ignores written emails. Turn dead time (driving) into learning time.",
    sprint: "5-DAY SPRINT",
    specs: ['ElevenLabs Voice Cloning', 'Private Podcast Feeds', 'Descript Editing', 'Automated Distribution'],
    personas: [
      {
        id: "fleet",
        icon: Truck,
        title: "The Fleet Manager",
        examples: "Logistics Companies, Removalists, Couriers",
        painTitle: "The Unread Bulletin",
        painText: "You send critical safety updates via email knowing 90% of your drivers never open them because they're on the road. Important information hits the bin, not the brain.",
        solution: "I turn your weekly bulletin into a 3-minute private podcast. They listen while they drive, and you get a dashboard proving they heard it. Information delivered, attention confirmed."
      },
      {
        id: "field",
        icon: HardHat,
        title: "The Field Director",
        examples: "Solar Installers, Electricians, HVAC",
        painTitle: "The Site-Start Lag",
        painText: "Your technicians sit in their vans for 15 minutes trying to find the 'Installation Guide'. It kills billable time. You're paying them to search, not work.",
        solution: "I build Pre-Arrival Briefs. As they drive to the job, they listen to the specific technical specs. They arrive ready to work, not ready to read."
      },
      {
        id: "care",
        icon: Heart,
        title: "The Care Leader",
        examples: "NDIS, Aged Care, Disability Services",
        painTitle: "Cultural Drift",
        painText: "Your staff feel like 'just a number' because they only receive cold emails from HQ. You're losing the human connection. Culture dies in the inbox.",
        solution: "I build Monday Encouragement. Clone your voice to deliver personal updates. Hearing the founder's voice builds trust in a way text never can. Your team feels connected, even remotely."
      }
    ]
  },
  matrix: {
    id: 'matrix',
    label: "TIER 02 / MATRIX",
    hook: "I need them to do it right.",
    summary: "Choose this if you have high staff turnover (Retail, Hospitality, Warehousing) and are tired of repeating the same 60-second training speech.",
    sprint: "7-DAY SPRINT",
    specs: ['HeyGen Avatars', 'QR Code Library', 'Just-in-Time Delivery', 'Mobile-First Player'],
    personas: [
      {
        id: "retail",
        icon: Coffee,
        title: "The Retail Manager",
        examples: "Cafe Groups, Gyms, Retail Chains",
        painTitle: "Broken Record Syndrome",
        painText: "You repeat the 'How to close the register' speech for the 50th time this year to a new casual. You're a manager, not a broken record.",
        solution: "I build a QR Code library behind the counter. A new hire scans it, watches a 60-second video of your clone explaining the task, and does it right. You train once, they learn forever."
      },
      {
        id: "warehouse",
        icon: Package,
        title: "The Warehouse Lead",
        examples: "Wholesale Distributors, Manufacturing, 3PLs",
        painTitle: "The Line Stopper",
        painText: "A packer stops the line because they 'forgot' how to label a dangerous good. It kills your throughput. One confused worker, whole team waiting.",
        solution: "I build Point-of-Action Knowledge. A sticker on the bench links to a vertical video on 'Packing Protocol'. Search time becomes pack time. The answer is where they work."
      },
      {
        id: "sales",
        icon: TrendingUp,
        title: "The CRM Police",
        examples: "Real Estate, Finance Brokers, B2B Sales",
        painTitle: "The CRM Mess",
        painText: "You spend 5 hours a week cleaning up data because reps 'forgot' the new workflow. You're the most expensive data entry clerk in the building.",
        solution: "I build In-App Nudges. When a rep moves a deal, a video pops up showing exactly which fields to fill. Rules enforced with video, not nagging. Clean data, happy director."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "TIER 03 / VISUALS",
    hook: "I need to explain the complex.",
    summary: "Choose this if you sell complex services or have dangerous sites where text manuals are ignored. We make safety and sales 'Visually Obvious'.",
    sprint: "5-DAY SPRINT",
    specs: ['Napkin.ai Logic', 'Lucidchart Architecture', 'One-Page Cheat Sheets', 'Safety Iconography'],
    personas: [
      {
        id: "exec",
        icon: Briefcase,
        title: "The Non-Tech Exec",
        examples: "CEOs, Board Members, Business Owners",
        painTitle: "The Invisible Value",
        painText: "You reject a $50k automation project because the IT team explained it poorly. You can't sign off on what you don't understand. Good projects die in confusion.",
        solution: "I turn technical mess into a 'Napkin Sketch'. Customer Pays → Xero Updates → Slack Alerts. When you see the flow, you sign the cheque. Clarity unlocks budget."
      },
      {
        id: "safety",
        icon: AlertTriangle,
        title: "The Safety Lead",
        examples: "Construction, Mining, Industrial Sites",
        painTitle: "The Ignored Manual",
        painText: "Your 500-page safety binders act as doorstops. Workers guess the protocol because the manual is unreadable. One wrong guess and someone gets hurt.",
        solution: "I build Universal Iconography. High-contrast site posters that tell a worker exactly what to do with zero reading required. Safety becomes instinct, not homework."
      },
      {
        id: "estimator",
        icon: Calculator,
        title: "The Estimator",
        examples: "Civil Engineering, Commercial Fit-outs",
        painTitle: "The Pricing Error",
        painText: "Your junior estimator misses a variable like 'Traffic Loading' because it was buried on page 10 of a doc. One missed line, $50k mistake.",
        solution: "I build Pricing Decision Trees. A visual sheet that asks 3 questions and gives the right multiplier. Juniors can't make mistakes. Accuracy built into the process."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "TIER 04 / ANALYST",
    hook: "I need them to stop asking me.",
    summary: "Choose this if you are the bottleneck. Your staff ask you 20 questions a day that are already answered in the company handbook (which they don't read).",
    sprint: "10-DAY SPRINT",
    specs: ['Private Knowledge Base', 'Slack/Teams Integration', 'RAG Architecture', 'Source Attribution'],
    personas: [
      {
        id: "billable",
        icon: Clock,
        title: "The Billable Protector",
        examples: "Senior Lawyers, Consultants, Accountants",
        painTitle: "The Interruption Drain",
        painText: "You spend 5 hours a week answering junior questions like 'Where's the precedent for X?'. It kills your billable capacity. Your $500/hr brain is doing $50/hr work.",
        solution: "I clone your brain. The AI knows every precedent in your firm. Juniors ask the bot first, buying back your expensive time. You bill more, answer less."
      },
      {
        id: "franchise",
        icon: Store,
        title: "The Franchise Guardian",
        examples: "Franchise Groups, Retail Chains",
        painTitle: "Operational Drift",
        painText: "Your manager in Parramatta does things differently to the one in Bondi because the official guide is too hard to find. Every location invents its own rules.",
        solution: "I build The Franchise Brain. A manager asks 'What's the Summer Promo setup?' and gets the exact guide instantly. Consistency scales. One brand, every location."
      },
      {
        id: "compliance",
        icon: ShieldCheck,
        title: "The Compliance Guardian",
        examples: "Property Managers, Strata, Insurance",
        painTitle: "The Compliance Maze",
        painText: "Your junior PM asks 'Can we increase the bond for this tenant?' You have to stop work to look up the Residential Tenancy Act. One wrong answer and you're in court.",
        solution: "I build a Compliance Bot. Tag @CompanyBrain in Slack: 'What's the maximum bond increase in NSW?' and get the answer with a citation to the legislation. Certainty on the fly."
      }
    ]
  }
};

const Pillar6: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('media');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('media');
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
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
      
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
        }
    }, 200); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
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

        {/* HEADER WITH HUMAN EXPLAINER */}
        <div className="mb-16">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-none mb-6">
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
           {/* TABS (NOW WITH HOOKS) */}
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
                 
                 {/* INTRO SUMMARY (NEW) */}
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
                          <span className="text-[#E21E3F] font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block">The Problem</span>
                          <h2 className="font-serif text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#E21E3F] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-4 font-bold">The Fix</span>
                                <p className="font-sans text-lg leading-relaxed mb-8">{currentPersona.solution}</p>
                                {/* STANDARDIZED CTA BUTTON */}
                                <div className="w-fit">
                                  <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                                    [ BOOK A CALL ]
                                  </CTAButton>
                                </div>
                             </div>
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
                id={`tier-mobile-${key}`} // ID for Scroll Target
                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isTierExpanded ? 'border-[#1a1a1a] bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
                
                {/* LEVEL 1: TIER HEADER (DARK MODE WHEN ACTIVE) */}
                <button 
                  onClick={() => {
                    const willExpand = !isTierExpanded;
                    setExpandedTier(willExpand ? key as keyof typeof TIERS : null);
                    setExpandedPersona(null); // Close inner accordions
                    if (willExpand) {
                        handleScrollTo(`tier-mobile-${key}`); // TRIGGER SCROLL
                    }
                  }}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${isTierExpanded ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}
                >
                  <div>
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-[#C5A059]' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    {/* NEW: Hook visible on closed state too */}
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
                         {/* INTRO SUMMARY (NEW FOR MOBILE) */}
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
                                id={`persona-mobile-${p.id}`} // ID for Scroll Target
                                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isPersonaExpanded ? 'border-[#C5A059] bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
                               
                               {/* LEVEL 2: PERSONA HEADER (GOLD ACCENT WHEN ACTIVE) */}
                               <button 
                                 onClick={() => {
                                    const willExpand = !isPersonaExpanded;
                                    setExpandedPersona(willExpand ? p.id : null);
                                    if (willExpand) {
                                        handleScrollTo(`persona-mobile-${p.id}`); // TRIGGER SCROLL
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

                                         {/* Specs List (Restored for Mobile) */}
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