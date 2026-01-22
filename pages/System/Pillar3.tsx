import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  Activity, TrendingDown, Database, 
  Droplets, EyeOff, MousePointerClick, 
  Flag, Repeat, ShieldAlert, 
  Layers, Scale, Globe, 
  CheckCircle, ChevronDown, ChevronRight, HelpCircle
} from 'lucide-react';
import PillarVisual_Dashboard from '../../components/PillarVisual_Dashboard';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (STRICT WHITE ON DARK BACKGROUND) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'pulse' && (
        // ANIMATION: "The Pulse" - White bars on dark bg
        <div className="flex items-end gap-1 h-16 w-24">
            {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8].map((h, i) => (
                <motion.div 
                    key={i}
                    className="w-full bg-white rounded-t-sm"
                    animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                />
            ))}
        </div>
      )}

      {tierKey === 'lab' && (
        // ANIMATION: "The Heatmap" - White/Transparent grid
        <div className="relative w-24 h-24 grid grid-cols-4 grid-rows-4 gap-1">
             {[...Array(16)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="bg-white/10 rounded-[1px]"
                    animate={{ backgroundColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.1)"] }}
                    transition={{ duration: 2, delay: Math.random(), repeat: Infinity }}
                />
             ))}
             <motion.div 
                className="absolute w-3 h-3 border border-white rounded-full bg-white z-10"
                animate={{ x: [0, 60, 20, 0], y: [0, 20, 60, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             />
        </div>
      )}

      {tierKey === 'oracle' && (
        // ANIMATION: "The Forecast" - White lines
        <div className="relative w-32 h-16">
            <svg className="w-full h-full overflow-visible">
                {/* Historical Data (Solid) */}
                <motion.path
                    d="M 0 60 L 40 40 L 70 50"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                {/* Prediction (Dashed) */}
                <motion.path
                    d="M 70 50 L 100 20 L 130 10"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-pulse" style={{ right: '-5px', top: '8px' }} />
            </svg>
        </div>
      )}

      {tierKey === 'tower' && (
        // ANIMATION: "The Control Tower" - White structure
        <div className="relative flex items-center justify-center w-24 h-24">
            {/* Center */}
            <div className="w-6 h-6 border border-white bg-[#1a1a1a] z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-white" />
            </div>
            
            {/* Connections */}
            {[0, 90, 180, 270].map((deg, i) => (
                <motion.div 
                    key={i}
                    className="absolute w-12 h-[1px] bg-white/40 origin-left left-1/2 top-1/2"
                    style={{ rotate: deg }}
                >
                    <motion.div 
                        className="w-2 h-2 bg-white rounded-full absolute right-0 -top-1"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    />
                </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  pulse: {
    id: 'pulse',
    label: "TIER 01 / PULSE",
    hook: "Stop guessing, start steering.",
    summary: "Choose this if you are flying blind. You have data in Xero, Google Ads, and CRM, but no single screen that tells you if you are winning or losing today.",
    sprint: "7-DAY SPRINT",
    specs: ['Google Tag Manager', 'Looker Studio', 'Attribution Modelling', 'Unit Economics'],
    personas: [
      {
        id: "scaler",
        icon: Activity,
        title: "The Blind Scaler",
        examples: "Multi-Site Businesses, E-commerce",
        painTitle: "The Ad-Spend Trap",
        painText: "You spend $20k/mo on ads but don't know which channel is actually driving the profit. You're flying blind. Every month you waste budget on the wrong thing.",
        solution: "I build a Revenue Pulse that shows the 'Unit Economics' of every lead. You know exactly which dollar is making you two. Ad spend becomes an investment, not a gamble."
      },
      {
        id: "wholesaler",
        icon: TrendingDown,
        title: "The Margin Squeeze",
        examples: "Distributors, Wholesalers",
        painTitle: "Operational Blindness",
        painText: "High volume, thin margins. You don't know your 'Real Profit' until the accountant finishes the books at the end of the quarter. By then, the damage is done.",
        solution: "I build Real-Time Margin Tracking. Inventory links to Finance so you see the Net Profit on every single order the moment it happens. No more quarter-end surprises."
      },
      {
        id: "visionary",
        icon: Database,
        title: "The Data Hoarder",
        examples: "Founders with Multiple Systems",
        painTitle: "Analysis Paralysis",
        painText: "You have thousands of rows of data in Xero and HubSpot, but you still can't answer: 'If I spend $1,000 more, what happens?' Data everywhere, answers nowhere.",
        solution: "I build The North Star Dashboard. Your fragmented data blends into one single screen that answers the big questions instantly. One screen, total clarity."
      }
    ]
  },
  lab: {
    id: 'lab',
    label: "TIER 02 / LAB",
    hook: "I see what your customers see.",
    summary: "Choose this if you have traffic but low conversion. We install 'Forensic' tools to watch users struggle and fix the friction points killing your sales.",
    sprint: "14-DAY SPRINT",
    specs: ['Microsoft Clarity', 'Rage-Click Analysis', 'UX Forensics', 'Conversion Rate Opt.'],
    personas: [
      {
        id: "leaky",
        icon: Droplets,
        title: "The Leaky Bucket",
        examples: "E-commerce Stores, Lead Gen Sites",
        painTitle: "Traffic Rich, Profit Poor",
        painText: "You spend huge money on ads to bring people to a site where 40% leave because the 'Contact' button is broken on mobile. You're paying for traffic that can't convert.",
        solution: "I build Forensic Session Recording. The system watches the user struggle so you don't have to, giving you a 'Fix List' to stop the bleed. Every leak found, every dollar saved."
      },
      {
        id: "blind",
        icon: EyeOff,
        title: "The Opinion Fighter",
        examples: "Marketing Teams, Designers",
        painTitle: "Aesthetic Bias",
        painText: "You argue about button colours based on 'opinion' rather than data. You're redesigning the wrong things. Meetings waste hours on guesses.",
        solution: "I build Heatmap Evidence. You see exactly where people click (and where they don't), ending the debate with cold hard facts. Data wins, opinions lose."
      },
      {
        id: "friction",
        icon: MousePointerClick,
        title: "The Form Abandonment",
        examples: "Lead Gen Agencies, Service Biz",
        painTitle: "The Drop-off Cliff",
        painText: "People start your enquiry form but never finish it. You're losing 70% of your leads at the finish line. They wanted to contact you — something stopped them.",
        solution: "I build Field-Level Telemetry. The system identifies the exact question that causes them to quit. Rewrite it, restore flow. Leads that start, finish."
      }
    ]
  },
  oracle: {
    id: 'oracle',
    label: "TIER 03 / ORACLE",
    hook: "Predict the future.",
    summary: "Choose this if you want to stop reacting to last month's bad numbers and start predicting next month's cashflow using predictive modelling.",
    sprint: "21-DAY SPRINT",
    specs: ['BigQuery + AI', 'Churn Prediction', 'LTV Forecasting', 'Propensity Modelling'],
    personas: [
      {
        id: "exit",
        icon: Flag,
        title: "The Exit Founder",
        examples: "Founders Preparing for Sale",
        painTitle: "The Valuation Discount",
        painText: "Buyers pay 4x for 'Predictable Revenue' and only 2x for 'Up and Down' revenue. You need to prove certainty. Without it, you're leaving millions on the table.",
        solution: "I build Investor-Grade Forecasting. Your 'Net Revenue Retention' and 'Churn Probability' are proven with data. The numbers justify a higher exit multiple."
      },
      {
        id: "sub",
        icon: Repeat,
        title: "The Churn Fighter",
        examples: "Subscription Businesses, Gyms",
        painTitle: "The Silent Churn",
        painText: "You don't know a customer is unhappy until they cancel. By then, it's too late to save them. You could have kept them — if you'd known.",
        solution: "I build Behavioural DNA Modelling. The system predicts who's 'At Risk' based on their usage patterns 30 days before they quit. Save them before they leave."
      },
      {
        id: "risk",
        icon: ShieldAlert,
        title: "The Cashflow Forecaster",
        examples: "CFOs, Finance Directors",
        painTitle: "Cashflow Surprises",
        painText: "You're blindsided by a bad month because your 'Leading Indicators' were actually just 'Lagging Indicators'. You're steering with a rear-view mirror.",
        solution: "I build 90-Day Propensity Forecasting. You know what your cashflow will be in 3 months with 95% accuracy. Steer forward, not backward."
      }
    ]
  },
  tower: {
    id: 'tower',
    label: "TIER 04 / TOWER",
    hook: "Total Command.",
    summary: "Choose this if you have a complex organization (Franchise, Multi-Department) and need a 'Central Nervous System' to align everyone.",
    sprint: "30+ DAY SPRINT",
    specs: ['Fractional CDO', 'Data Governance', 'Multi-Source Sync', 'Executive Control'],
    personas: [
      {
        id: "silo",
        icon: Layers,
        title: "The Siloed Exec",
        examples: "Established Businesses ($20M+)",
        painTitle: "Fragmented Truth",
        painText: "Sales doesn't know what Ops is doing. Ops doesn't know what Finance is saying. Your departments fight each other instead of working together.",
        solution: "I build The Control Tower. A single 'Nervous System' that links every department into one view. The business acts as one organism. Total alignment, total clarity."
      },
      {
        id: "governance",
        icon: Scale,
        title: "The Data Risk Manager",
        examples: "Financial Services, Medical",
        painTitle: "The Data Risk",
        painText: "You have sensitive client data scattered across 50 spreadsheets. It's a security nightmare waiting to happen. One breach and you're front-page news.",
        solution: "I build SOC2 Compliant Governance. Your data centralises into a secure Warehouse with strict access controls. Secure, auditable, compliant."
      },
      {
        id: "global",
        icon: Globe,
        title: "The HQ Director",
        examples: "Franchise Groups, Nationals",
        painTitle: "Local Blindness",
        painText: "You can't see what the Perth branch is doing until the monthly report. You're steering a giant ship with no radar. Problems grow in the dark.",
        solution: "I build a Global Command Centre. Every location, every metric, one dashboard. You see problems the moment they start, not the month they end."
      }
    ]
  }
};

const Pillar7: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('pulse');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('pulse');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar7');
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
          
          {/* NAVIGATION */}
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
               <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                   THE SYSTEM / SEE CLEARLY
                 </span>
               </div>

               {/* STANDARD H1 - ALL BLACK */}
               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Dashboards & <span className="italic font-serif text-[#1a1a1a] drop-shadow-[0_0_20px_rgba(26,26,26,0.2)]">Reporting.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#1a1a1a] pl-6 mb-8">
                 Stop guessing. I build dashboards that show revenue, margins, and pipeline on one screen — updated live — so you can steer the business with confidence.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Dashboard />
               </div>
            </div>
          </div>
        </div>

        {/* SCROLL LINE */}
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
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           {/* STANDARD H2 - ALL BLACK */}
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6">
             Select your <span className="italic text-[#1a1a1a] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               You can't manage what you can't measure. I've mapped out the 4 levels of clarity. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the one that matches your current blindness</strong> to see the dashboard solution.
             </p>
           </div>
        </div>

        {/* --- DESKTOP VIEW: TABBED DASHBOARD --- */}
        <div className="hidden md:block border border-black/10 bg-gradient-to-br from-white to-[#FFF9F0] shadow-sm mb-32 rounded-sm overflow-hidden">
           {/* TABS (BLACK HIGHLIGHTS) */}
           <div className="grid grid-cols-4 border-b border-black/10 bg-[#FAFAFA]">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTier(key as keyof typeof TIERS)}
                  className={`py-6 px-4 text-center transition-all duration-300 relative group overflow-hidden flex flex-col justify-center min-h-[100px] ${
                    activeTier === key ? 'bg-white' : 'hover:bg-white/50 text-black/40'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-2 ${activeTier === key ? 'text-[#1a1a1a]' : 'text-inherit'}`}>
                    {tier.label}
                  </span>
                  <span className={`font-serif text-lg leading-tight ${activeTier === key ? 'text-black' : 'text-inherit opacity-60'}`}>
                    "{tier.hook}"
                  </span>
                  {activeTier === key && <motion.div layoutId="tab-highlight" className="absolute top-0 left-0 w-full h-1 bg-[#1a1a1a]" />}
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
                       <HelpCircle className="w-4 h-4 text-[#1a1a1a]" />
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
                           activePersonaIndex === idx ? 'bg-white border-[#1a1a1a] shadow-md' : 'bg-transparent border-transparent hover:bg-white hover:border-black/5'
                        }`}
                      >
                         <div className={`p-2 rounded-full ${activePersonaIndex === idx ? 'bg-[#1a1a1a]/10 text-[#1a1a1a]' : 'bg-black/5 text-black/40'}`}>
                           <p.icon className="w-4 h-4" />
                         </div>
                         <div>
                           <h4 className={`font-serif text-lg leading-tight ${activePersonaIndex === idx ? 'text-black' : 'text-black/60'}`}>{p.title}</h4>
                         </div>
                         {activePersonaIndex === idx && <ChevronRight className="w-4 h-4 ml-auto text-[#1a1a1a]" />}
                      </button>
                    ))}
                 </div>

                 {/* SPECS LIST */}
                 <div className="mt-8 pt-8 border-t border-black/5">
                    <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-4 block">Included Specs</span>
                    <ul className="space-y-2">
                      {currentTier.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                          <CheckCircle className="w-3 h-3 text-[#1a1a1a]" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>

              {/* RIGHT: Solution (BLACK BACKGROUND, WHITE VISUALS) */}
              <div className="w-2/3 p-12 relative flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div 
                       key={`${activeTier}-${activePersonaIndex}`}
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                       className="flex-grow flex flex-col"
                    >
                       <div className="mb-10">
                          <span className="text-[#1a1a1a] font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block">The Problem</span>
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#1a1a1a] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                <span className="font-mono text-[9px] text-white uppercase tracking-widest block mb-4 font-bold">The Fix</span>
                                <p className="font-sans text-lg leading-relaxed mb-8">{currentPersona.solution}</p>
                                
                                <div className="w-fit">
                                  <CTAButton theme="light" onClick={() => onNavigate('contact')}>
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

        {/* --- MOBILE VIEW: VERTICAL ACCORDION (BLACK THEME) --- */}
        <div className="md:hidden space-y-4 mb-32">
          {Object.entries(TIERS).map(([key, tier]) => {
            const isTierExpanded = expandedTier === key;
            return (
              <div 
                key={key} 
                id={`tier-mobile-${key}`} 
                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isTierExpanded ? 'border-[#1a1a1a] bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
                
                {/* LEVEL 1: TIER HEADER */}
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
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-white' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    <span className={`font-serif text-lg leading-tight ${isTierExpanded ? 'text-white' : 'text-black'}`}>"{tier.hook}"</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTierExpanded ? 'rotate-180 text-white' : 'text-black/30'}`} />
                </button>

                {/* LEVEL 1 CONTENT */}
                <AnimatePresence>
                  {isTierExpanded && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden bg-[#FAFAFA]"
                    >
                      <div className="p-4 space-y-2">
                         {/* INTRO */}
                         <div className="mb-6 p-4 bg-white border border-black/5 rounded-sm">
                            <p className="font-sans text-sm text-black/70 leading-relaxed">
                               <strong className="text-[#1a1a1a] block mb-1 font-bold uppercase text-[9px] tracking-widest">Is this you?</strong>
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
                                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isPersonaExpanded ? 'border-[#1a1a1a] bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
                               
                               {/* LEVEL 2: PERSONA HEADER */}
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
                                  <div className={`p-2 rounded-full ${isPersonaExpanded ? 'bg-[#1a1a1a] text-white' : 'bg-black/5 text-black/40'}`}>
                                     <p.icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-grow">
                                     <h4 className={`font-serif text-lg leading-tight ${isPersonaExpanded ? 'text-[#1a1a1a]' : 'text-black/70'}`}>{p.title}</h4>
                                     <span className="text-[10px] text-black/40 block mt-1 line-clamp-1">{p.examples}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${isPersonaExpanded ? 'rotate-180 text-[#1a1a1a]' : 'text-black/20'}`} />
                               </button>

                               {/* LEVEL 2 CONTENT */}
                               <AnimatePresence>
                                 {isPersonaExpanded && (
                                   <motion.div
                                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                     className="border-t border-[#1a1a1a]/20 bg-white"
                                   >
                                      <div className="p-6">
                                         {/* Pain */}
                                         <div className="mb-6">
                                            <span className="text-[#1a1a1a] font-mono text-[9px] uppercase tracking-widest font-bold mb-2 block">The Problem</span>
                                            <h5 className="font-serif text-2xl mb-2 text-[#1a1a1a]">{p.painTitle}</h5>
                                            <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed italic border-l-2 border-[#1a1a1a] pl-4">"{p.painText}"</p>
                                         </div>

                                         {/* Solution */}
                                         <div className="bg-[#1a1a1a] p-6 text-white rounded-sm mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                                            <span className="font-mono text-[9px] text-white uppercase tracking-widest block mb-3 font-bold relative z-10">The Fix</span>
                                            <p className="font-sans text-base leading-relaxed mb-6 relative z-10">{p.solution}</p>
                                            
                                            {/* VISUAL ON MOBILE (CENTERED) */}
                                            <div className="w-full flex justify-center py-4 bg-transparent relative z-10">
                                               <div className="w-24 h-24 flex items-center justify-center">
                                                 <TierVisual tierKey={key} />
                                               </div>
                                            </div>
                                         </div>

                                         <div className="w-full">
                                            <CTAButton theme="light" onClick={() => onNavigate('contact')} className="w-full">
                                                [ BOOK A CALL ]
                                            </CTAButton>
                                         </div>

                                         {/* Specs List Mobile */}
                                         <div className="mt-8 pt-6 border-t border-black/10">
                                            <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-3 block">Included Specs</span>
                                            <ul className="space-y-2">
                                              {tier.specs.map((spec, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                                                  <CheckCircle className="w-3 h-3 text-[#1a1a1a]" />
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

      {/* FAQ SECTION (ACCENT BLACK #1a1a1a) */}
      <FAQSection
        faqs={pillarFAQs}
        accentColor="#1a1a1a"
        title="Questions about dashboards?"
        subtitle="Common questions about dashboards and reporting."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar7;