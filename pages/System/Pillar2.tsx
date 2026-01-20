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
  ArrowLeft, ArrowRight, Zap, Database, Activity, 
  Search, GitMerge, Layout, Repeat, ShoppingBag, // <--- Added ShoppingBag here
  CheckCircle, ChevronDown, ChevronRight, Terminal, HelpCircle,
  Filter
} from 'lucide-react';
import PillarVisual_Catchment from '../../components/PillarVisual_Catchment';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- HELPER: FILL BUTTON ---
const FillButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
  <button 
    onClick={onClick} 
    className={`relative overflow-hidden group bg-[#C5A059] text-white border border-[#C5A059] shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
    <span className="relative z-10 flex items-center justify-center gap-3">{children}</span>
  </button>
);

// --- VISUALIZATIONS (CRM & Logic Concepts) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'capture' && (
        // ANIMATION: "The Magnet" (Capture Core)
        <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute w-4 h-4 bg-[#C5A059] rounded-full z-10 shadow-[0_0_20px_#C5A059]" />
            {/* Orbiting Particles getting sucked in */}
            {[0, 1, 2, 3].map((i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0, x: 40, y: 40 }}
                 animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0.5, 1, 0], 
                    x: 0, 
                    y: 0 
                 }}
                 transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "easeIn"
                 }}
                 className="absolute w-2 h-2 bg-[#1a1a1a] border border-[#C5A059] rounded-full"
                 style={{ 
                    rotate: i * 90 
                 }}
               />
            ))}
            <div className="absolute inset-0 border border-[#C5A059]/20 rounded-full animate-pulse" />
        </div>
      )}

      {tierKey === 'pipeline' && (
        // ANIMATION: "The Flow" (Pipeline)
        <div className="flex gap-4 items-center">
             {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-12 bg-[#C5A059]/20 rounded-sm relative overflow-hidden">
                   <motion.div 
                     animate={{ y: [-20, 50] }}
                     transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, ease: "linear" }}
                     className="w-full h-4 bg-[#C5A059]"
                   />
                </div>
             ))}
             <ArrowRight className="w-4 h-4 text-[#C5A059]" />
             <div className="w-8 h-8 border border-[#C5A059] rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[#C5A059] rounded-full" />
             </div>
        </div>
      )}

      {tierKey === 'retention' && (
        // ANIMATION: "The Loop" (Retention)
        <div className="relative w-32 h-16">
            <svg viewBox="0 0 200 100" className="w-full h-full">
               <path d="M50,50 C20,50 20,20 50,20 C80,20 80,50 100,50 C120,50 120,80 150,80 C180,80 180,50 150,50 C120,50 120,20 100,20 C80,20 80,50 50,50" 
                     fill="none" stroke="#C5A059" strokeOpacity="0.2" strokeWidth="4" />
               <motion.path 
                  d="M50,50 C20,50 20,20 50,20 C80,20 80,50 100,50 C120,50 120,80 150,80 C180,80 180,50 150,50 C120,50 120,20 100,20 C80,20 80,50 50,50" 
                  fill="none" 
                  stroke="#C5A059" 
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
            </svg>
        </div>
      )}

      {tierKey === 'audit' && (
        // ANIMATION: "The Filter" (Operational Audit)
        <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: ["#1a1a1a", "#C5A059", "#1a1a1a"]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.1, 
                    repeat: Infinity 
                  }}
                  className="w-4 h-4 rounded-sm"
                />
            ))}
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  capture: {
    id: 'capture',
    label: "CAPTURE CORE",
    hook: "I miss calls while working.",
    summary: "Choose this if you are a busy Operator (Trades, Venues, Events) who loses money because you physically can't answer the phone instantly.",
    sprint: "3-DAY SPRINT",
    specs: ['Unified Inbox Setup', 'SMS Auto-Responders', 'Missed Call Text-Back', 'Lead Source Tracking'],
    personas: [
      {
        id: "elbow",
        icon: Zap,
        title: "The Elbow-Deep Tradie",
        examples: "Emergency Plumbers, Sparkies, Locksmiths",
        painTitle: "The Silent Competitor",
        painText: "You are under a house or up a ladder. You hear the phone ring but can't answer. That $500 job just went to the next guy on Google who picked up.",
        solution: "I install a 'Safety Net'. The second you miss a call, my system texts the lead: 'Hey, I'm on a job. How can I help?' You secure the client before you even wash your hands."
      },
      {
        id: "venue",
        icon: Layout,
        title: "The Venue Manager",
        examples: "Wedding Venues, Event Spaces, Studios",
        painTitle: "The Enquiry Black Hole",
        painText: "You get 20 DMs on Instagram, 5 emails, and 3 voicemails a day. You forget to reply to one bride, and you lose a $15k booking.",
        solution: "I build a Unified Inbox. Every message from Instagram, Email, and SMS lands in ONE place. Nothing gets lost, and every high-value lead gets an instant VIP reply."
      },
      {
        id: "clinic",
        icon: Activity,
        title: "The Busy Clinic",
        examples: "Physio, Chiro, Dental",
        painTitle: "The Front Desk Bottleneck",
        painText: "Your receptionist is busy with a patient. The phone rings out. You are paying for ads to make the phone ring, but nobody is catching the ball.",
        solution: "We automate the overflow. If the desk doesn't answer, the system does. It books appointments or answers FAQs automatically, stopping the revenue leak."
      }
    ]
  },
  pipeline: {
    id: 'pipeline',
    label: "PIPELINE",
    hook: "I don't know where the money is.",
    summary: "Choose this if you have a sales process (Proposals, Quotes, Meetings) but no clear view of exactly how much revenue is 'Close' vs 'Lost'.",
    sprint: "5-DAY SPRINT",
    specs: ['Visual Deal Board', 'Automated Follow-Ups', 'Quote Tracking', 'Revenue Forecasting'],
    personas: [
      {
        id: "blind",
        icon: Search,
        title: "The Blind Scaler",
        examples: "B2B Agencies, Cleaning Contracts, Security",
        painTitle: "The Shadow Pipeline",
        painText: "You suspect your sales reps are keeping deals in their heads or personal notebooks. If a rep quits tomorrow, they take your revenue with them.",
        solution: "I build a 'Visual Kanban'. Every deal is a card on a board. You can see exactly how much money is sitting in 'Proposal Sent' and who needs a nudge today."
      },
      {
        id: "velocity",
        icon: GitMerge,
        title: "The High-Velocity Team",
        examples: "Solar Sales, Mortgage Brokers",
        painTitle: "Admin Paralysis",
        painText: "Your top closers are spending 2 hours a day entering data instead of selling. Friction kills deals.",
        solution: "I automate the admin. When a client signs a quote, the deal moves itself. Your closers just close; the system handles the paperwork."
      },
      {
        id: "project",
        icon: Layout,
        title: "The Project Based",
        examples: "Construction, Fit-out, Landscaping",
        painTitle: "The Cashflow Gap",
        painText: "You win the job, but forget to send the 'Deposit Invoice' immediately. You start work without cash, hurting your liquidity.",
        solution: "We link the Pipeline to Finance. Moving a deal to 'Won' automatically generates and sends the deposit invoice from Xero. You get paid faster."
      }
    ]
  },
  retention: {
    id: 'retention',
    label: "RETENTION",
    hook: "I need repeat customers.",
    summary: "Choose this if you sell products or subscriptions and want to turn one-time buyers into loyal fans without paying for ads again.",
    sprint: "7-DAY SPRINT",
    specs: ['Klaviyo/HubSpot Flows', 'Win-Back Logic', 'Review Generation', 'VIP Segmentation'],
    personas: [
      {
        id: "hamster",
        icon: Repeat,
        title: "The Hamster Wheel",
        examples: "E-com Fashion, Home Goods",
        painTitle: "The Ad-Spend Trap",
        painText: "You have high revenue but low profit because you have to pay Facebook Ads for every single sale. You don't 'own' your customers.",
        solution: "I build the Backend Engine. We set up automated emails that upsell your past 5,000 customers for free. We turn your customer list into a 'Printing Press'."
      },
      {
        id: "commodity",
        icon: ShoppingBag,
        title: "The Consumable Seller",
        examples: "Coffee Roasters, Supplements, Skincare",
        painTitle: "The Habit Break",
        painText: "Your customer ran out of coffee yesterday, forgot to order, and bought from the supermarket instead. You lost them because you weren't there.",
        solution: "I install 'Replenishment Logic'. The system knows they run out in 30 days. On Day 28, it sends a text: 'Running low? Reply YES to reorder.' Zero friction."
      },
      {
        id: "service",
        icon: CheckCircle,
        title: "The Annual Service",
        examples: "HVAC, Pool Maintenance, Mechanics",
        painTitle: "The Silent Churn",
        painText: "Clients forget to book their annual service. You rely on them remembering, so you lose 40% of your recurring revenue every year.",
        solution: "We automate the Reminder Loop. The system chases them for you via SMS and Email until they book. You wake up to a full calendar of recurring jobs."
      }
    ]
  },
  audit: {
    id: 'audit',
    label: "AUDIT & FIX",
    hook: "My systems are a mess.",
    summary: "Choose this if you have 'Software Bloat'—too many apps, double-entry data, and expensive staff wasting time fixing errors.",
    sprint: "7-DAY AUDIT",
    specs: ['Workflow Mapping', 'Software Consolidation', 'Cost Reduction', 'Single Truth Source'],
    personas: [
      {
        id: "tangled",
        icon: Filter,
        title: "The Tangled Executive",
        examples: "Law Firms, Engineering, Mid-Sized Biz",
        painTitle: "Double Entry Hell",
        painText: "Your highly paid staff type client details into the CRM, and then re-type them into Xero. It wastes hours and causes expensive spelling errors.",
        solution: "I perform a 'Fractional Distillation'. We map every step, cut the connections that don't work, and integrate the tools that do. One entry, everywhere."
      },
      {
        id: "bloat",
        icon: Database,
        title: "The Subscription Victim",
        examples: "Agencies, Tech-Heavy Startups",
        painTitle: "Death by $29/mo",
        painText: "You are paying for Asana, Trello, Monday, Slack, and Zoom, and nobody knows where the files are. You are bleeding cash on tools nobody uses.",
        solution: "I audit and delete. We find the 'One Truth' tool, migrate your data, and cancel the rest. The audit often pays for itself in saved subscription fees."
      },
      {
        id: "franchise",
        icon: Layout,
        title: "The Franchise Guardian",
        examples: "Gym Groups, Retail Chains",
        painTitle: "The Rogue Franchisee",
        painText: "Every location is doing things differently. You have no visibility on the group's performance because the data is messy.",
        solution: "I standardize the Stack. We build one perfect 'Template' system and deploy it to every location. You get a Master Dashboard of the whole empire."
      }
    ]
  }
};

const Pillar2: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('capture');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('capture');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar2');
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
            const offset = 100; 
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
          
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <button 
              onClick={() => onNavigate('system')}
              className="group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              / Return to The System
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
               <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                   THE SYSTEM / THE BRAIN
                 </span>
               </div>

               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Revenue <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Intelligence.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 The website is the face; the CRM is the Brain. We stop "Lead Leakage" by centralising your data, automating your follow-up, and creating a Single Source of Truth.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Catchment />
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
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              SYSTEM CONFIGURATION
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-none mb-6">
             Select your <span className="italic text-[#C5A059] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               Your "Brain" (CRM) is either saving you time or costing you money. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the problem you are facing right now</strong> to see the engineered solution.
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
                                <FillButton onClick={() => onNavigate('contact')} className="w-fit py-4 px-8 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                                  [ BOOK A CALL ]
                                </FillButton>
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

                                         <FillButton onClick={() => onNavigate('contact')} className="w-full py-4 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                                            [ BOOK A CALL ]
                                         </FillButton>

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
        title="Questions about CRM?"
        subtitle="Common questions about data, pipelines, and cleaning up the mess."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar2;