
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  LineChart, Eye, Building2, // Main Icons
  Activity, TrendingDown, Database, // Tier 1 Icons
  Droplets, EyeOff, MousePointerClick, // Tier 2 Icons
  Flag, Repeat, ShieldAlert, // Tier 3 Icons
  Layers, Scale, Globe, // Tier 4 Icons
  Check // UI Icons
} from 'lucide-react';
import PillarVisual_Radar from './PillarVisual_Radar';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- HELPER COMPONENT: FILL BUTTON ---
const FillButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
  <button 
    onClick={onClick} 
    className={`relative overflow-hidden group bg-[#C5A059] text-white border border-[#C5A059] ${className}`}
  >
    <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
    <span className="relative z-10 flex items-center justify-center gap-3">{children}</span>
  </button>
);

const TIERS = {
  pulse: {
    id: 'pulse',
    label: "TIER 01 // PULSE",
    promise: "Stop guessing, start steering. Your business health on one screen.",
    sprint: "7-DAY SPRINT",
    specs: ['Google Tag Manager', 'Looker Studio', 'Attribution Modeling', 'Unit Economics'],
    personas: [
      {
        id: "scaler",
        icon: Activity,
        title: "The Blind Scaler",
        examples: "Multi-site Groups, E-com > $5M",
        painTitle: "The Ad-Spend Trap",
        painText: "Spending $20k/mo on ads but not knowing which channel (Google vs FB) is actually driving the profit. You are flying without a dashboard.",
        solution: "We build a Revenue Pulse that shows the 'Unit Economics' of every lead. You know exactly which dollar is making you two."
      },
      {
        id: "wholesaler",
        icon: TrendingDown,
        title: "The Margin Squeeze",
        examples: "Distributors, Wholesalers",
        painTitle: "Operational Blindness",
        painText: "High volume, thin margins. You don't know your 'Real Profit' until the accountant finishes the books at the end of the quarter.",
        solution: "Real-Time Margin Tracking. We link Inventory to Finance so you see the Net Profit on every single order the moment it happens."
      },
      {
        id: "visionary",
        icon: Database,
        title: "The Data Hoarder",
        examples: "Founders with 'Messy Data'",
        painTitle: "Analysis Paralysis",
        painText: "You have thousands of rows of data in Xero and HubSpot, but you still can't answer: 'If I spend $1,000 more, what happens?'",
        solution: "The North Star Dashboard. We blend your fragmented data into one single screen that answers the big questions instantly."
      }
    ]
  },
  lab: {
    id: 'lab',
    label: "TIER 02 // LAB",
    promise: "We see what your customers see. We kill the friction.",
    sprint: "14-DAY SPRINT",
    specs: ['Microsoft Clarity', 'Rage-Click Analysis', 'UX Forensics', 'Conversion Rate Opt.'],
    personas: [
      {
        id: "leaky",
        icon: Droplets,
        title: "The Leaky Bucket",
        examples: "E-com Stores, Law Firms",
        painTitle: "Traffic Rich, Profit Poor",
        painText: "Spending huge money on ads to bring people to a site where 40% of them leave because the 'Contact' button is broken on mobile.",
        solution: "Forensic Session Recording. We watch the user struggle so you don't have to, giving you a 'Fix List' to stop the bleed."
      },
      {
        id: "blind",
        icon: EyeOff,
        title: "The Guessing Designer",
        examples: "Marketing Teams",
        painTitle: "Aesthetic Bias",
        painText: "Arguing about button colors based on 'opinion' rather than data. You are redesigning the wrong things.",
        solution: "Heatmap Evidence. We show you exactly where people are clicking (and where they aren't), ending the debate with cold hard facts."
      },
      {
        id: "friction",
        icon: MousePointerClick,
        title: "The Form Hater",
        examples: "Lead Gen Agencies",
        painTitle: "The Drop-off Cliff",
        painText: "People start your enquiry form but never finish it. You are losing 70% of your leads at the finish line.",
        solution: "Field-Level Telemetry. We identify the exact question that causes them to quit and rewrite it to restore flow."
      }
    ]
  },
  oracle: {
    id: 'oracle',
    label: "TIER 03 // ORACLE",
    promise: "Predict the Future. Stop reacting, start anticipating.",
    sprint: "21-DAY SPRINT",
    specs: ['BigQuery + AI', 'Churn Prediction', 'LTV Forecasting', 'Propensity Modeling'],
    personas: [
      {
        id: "exit",
        icon: Flag,
        title: "The Exit Founder",
        examples: "Founders selling in 2 years",
        painTitle: "The Valuation Discount",
        painText: "Buyers pay 4x for 'Predictable Revenue' and only 2x for 'Up and Down' revenue. You need to prove certainty.",
        solution: "Investor-Grade Forecasting. We prove your 'Net Revenue Retention' and 'Churn Probability' to justify a 10x exit."
      },
      {
        id: "sub",
        icon: Repeat,
        title: "The Subscription Ops",
        examples: "SaaS, Retainers, Gyms",
        painTitle: "The Silent Churn",
        painText: "You don't know a customer is unhappy until they cancel. By then, it is too late to save them.",
        solution: "Behavioral DNA Modeling. We predict who is 'At Risk' based on their usage patterns 30 days before they quit."
      },
      {
        id: "risk",
        icon: ShieldAlert,
        title: "The Risk Manager",
        examples: "CFOs, Boards",
        painTitle: "Cashflow Surprises",
        painText: "Being blindsided by a bad month because your 'Leading Indicators' were actually just 'Lagging Indicators'.",
        solution: "90-Day Propensity Forecasting. We tell you what your cashflow will be in 3 months with 95% accuracy."
      }
    ]
  },
  tower: {
    id: 'tower',
    label: "TIER 04 // TOWER",
    promise: "Total Command. The business steers itself while you watch.",
    sprint: "30+ DAY SPRINT",
    specs: ['Fractional CDO', 'Data Governance', 'Multi-Source Sync', 'Executive Control'],
    personas: [
      {
        id: "silo",
        icon: Layers,
        title: "The Siloed Exec",
        examples: "Mature Firms ($20M+)",
        painTitle: "Fragmented Truth",
        painText: "Sales doesn't know what Ops is doing. Ops doesn't know what Finance is saying. Your departments are fighting each other.",
        solution: "The Control Tower. A single 'Nervous System' that links every department into one view. The business acts as one organism."
      },
      {
        id: "governance",
        icon: Scale,
        title: "The Compliance Lead",
        examples: "FinTech, Medical",
        painTitle: "The Data Risk",
        painText: "Having sensitive client data scattered across 50 spreadsheets. It's a security nightmare waiting to happen.",
        solution: "SOC2 Compliant Governance. We centralize your data into a secure Warehouse with strict access controls."
      },
      {
        id: "global",
        icon: Globe,
        title: "The HQ Director",
        examples: "Franchise Groups",
        painTitle: "Local Blindness",
        painText: "You can't see what the Perth branch is doing until the monthly report. You are steering a giant ship with no radar.",
        solution: "Global Command Center. Real-time visibility into every location, allowing you to spot issues instantly."
      }
    ]
  }
};

const PillarPage_Intelligence: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('pulse');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Reset persona and restart autoplay when tier changes
  useEffect(() => {
    setActivePersonaIndex(0);
    setIsAutoPlaying(true);
  }, [activeTier]);

  // Auto-Rotation Logic
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;

    const interval = setInterval(() => {
      setActivePersonaIndex((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, activeTier]);

  const currentTier = TIERS[activeTier];
  const currentPersona = currentTier.personas[activePersonaIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col pt-32 lg:pt-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="mb-12">
          <button onClick={() => onNavigate('architecture')} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Architecture
          </button>
        </div>

        {/* HERO SECTION (2-COL GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 mb-32">
             
             {/* LEFT: CONTENT */}
             <div>
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_07 // VISION</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 Intelligence <br />
                 <span className="italic text-[#E21E3F]">Architecture.</span>
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 The Eyes of the Business. <br/>
                 We replace "Gut Feeling" with a <strong>Control Tower</strong> that shows you exactly where your profit is coming from.
               </p>
               <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
                  <span>Activate Sensors</span>
                  <ArrowRight className="w-4 h-4" />
               </div>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL */}
             <div className="relative w-full max-w-[350px] h-[300px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
                {/* The visual sits inside this strictly sized box */}
                <PillarVisual_Radar />
             </div>
        </div>

        {/* --- UNIFIED DASHBOARD CONTAINER --- */}
        <div className="mb-12">
           <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a]">Gain Clarity.</h2>
        </div>

        <div className="border border-black/10 bg-white shadow-sm mb-32">
           
           {/* 1. TABS ROW */}
           <div className="grid grid-cols-2 md:grid-cols-4 border-b border-black/10 bg-[#FAFAFA]">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTier(key as keyof typeof TIERS)}
                  className={`py-6 px-4 text-center transition-all duration-300 relative group overflow-hidden ${
                    activeTier === key ? 'bg-white' : 'hover:bg-white/50 text-black/40'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${activeTier === key ? 'text-[#C5A059]' : 'text-inherit'}`}>
                    {tier.label.split('//')[1]}
                  </span>
                  <span className={`text-[10px] block ${activeTier === key ? 'text-black/60' : 'text-inherit opacity-60'}`}>
                    {tier.sprint}
                  </span>
                  
                  {/* Active Indicator Top Line */}
                  {activeTier === key && (
                    <motion.div layoutId="tab-highlight" className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]" />
                  )}
                </button>
              ))}
           </div>

           {/* 2. CONTENT AREA */}
           <div className="p-8 md:p-12 lg:p-16">
             <AnimatePresence mode='wait'>
               <motion.div
                 key={activeTier}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.4 }}
               >
                  
                  {/* --- MIDDLE ROW: PERSONA CARDS --- */}
                  <div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                      {currentTier.personas.map((p, index) => {
                          const isActive = activePersonaIndex === index;
                          return (
                              <button
                                  key={p.id}
                                  onClick={() => { setActivePersonaIndex(index); setIsAutoPlaying(false); }}
                                  className={`p-6 text-left border rounded-sm transition-all duration-300 relative overflow-hidden group h-full flex flex-col ${
                                      isActive
                                      ? `border-[#C5A059] bg-[#FFF9F0] shadow-md scale-[1.02]` 
                                      : 'border-black/5 hover:border-[#C5A059]/30 bg-white opacity-60 hover:opacity-100'
                                  }`}
                              >
                                  <div className={`mb-4 ${isActive ? 'text-[#C5A059]' : 'text-black/40'}`}>
                                      <p.icon className="w-6 h-6" />
                                  </div>
                                  <h3 className={`font-serif text-xl mb-2 ${isActive ? 'text-black' : 'text-black/60'}`}>
                                      {p.title}
                                  </h3>
                                  <p className="font-sans text-xs text-black/40 leading-relaxed mb-4 flex-grow">
                                      e.g. {p.examples}
                                  </p>
                                  
                                  {/* Progress Bar for Auto-Rotation */}
                                  {isActive && isAutoPlaying && !isHovering && (
                                      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059]/20">
                                          <motion.div 
                                              initial={{ width: "0%" }}
                                              animate={{ width: "100%" }}
                                              transition={{ duration: 5, ease: "linear" }}
                                              className="h-full bg-[#C5A059]"
                                          />
                                      </div>
                                  )}
                                  {/* Static Active Line */}
                                  {isActive && (!isAutoPlaying || isHovering) && (
                                       <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059]" />
                                  )}
                              </button>
                          );
                      })}
                  </div>

                  {/* --- BOTTOM ROW: SOLUTION CONTENT --- */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-black/5 pt-16">
                      
                      {/* LEFT COL: TEXT (Vertically Centered) */}
                      <div className="flex flex-col justify-center">
                          <AnimatePresence mode="wait">
                              <motion.div
                                key={currentPersona.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.3 }}
                              >
                                  <div className="mb-10">
                                    <span className="text-[#E21E3F] font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block">Diagnosis // The Pain Point</span>
                                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a] leading-tight">
                                        {currentPersona.painTitle}
                                    </h2>
                                    <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#E21E3F] pl-6 italic">
                                        "{currentPersona.painText}"
                                    </p>
                                  </div>

                                  <div className="bg-[#1a1a1a] p-8 text-[#FFF2EC] relative overflow-hidden rounded-sm">
                                      <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059]" />
                                      <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-4 font-bold">The Solution Protocol</span>
                                      <p className="font-sans text-lg leading-relaxed">
                                          {currentPersona.solution}
                                      </p>
                                  </div>
                              </motion.div>
                          </AnimatePresence>
                      </div>

                      {/* RIGHT COL: VISUALS & CTA */}
                      <div className="flex flex-col justify-between h-full bg-[#FAFAFA] p-10 border border-black/5 rounded-sm">
                          
                          <div className="flex-grow">
                              <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest block mb-6">Visual Architecture</span>
                              
                              {/* MICRO-VISUALS */}
                              <div className="h-40 w-full mb-8 bg-white border border-black/5 rounded-sm flex items-center justify-center relative overflow-hidden shadow-inner">
                                  
                                  {/* TIER 1: PULSE (Graph) */}
                                  {activeTier === 'pulse' && (
                                    <div className="relative w-full h-full flex items-center justify-center px-12">
                                        <div className="w-full h-16 flex items-end justify-between gap-1">
                                            {[0.2, 0.4, 0.3, 0.6, 0.5, 0.8, 0.7, 0.9, 0.4, 0.6].map((h, i) => (
                                                <motion.div 
                                                    key={i}
                                                    className="w-full bg-[#C5A059]"
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h * 100}%` }}
                                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/20" />
                                    </div>
                                  )}

                                  {/* TIER 2: LAB (Heatmap) */}
                                  {activeTier === 'lab' && (
                                    <div className="relative w-full h-full grid grid-cols-6 grid-rows-4 gap-1 p-4">
                                        {[...Array(24)].map((_, i) => (
                                            <motion.div 
                                                key={i}
                                                className="rounded-sm"
                                                animate={{ 
                                                    backgroundColor: ['#f0f0f0', Math.random() > 0.7 ? '#E21E3F' : '#f0f0f0', '#f0f0f0'] 
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                                            />
                                        ))}
                                        <MousePointerClick className="absolute top-1/2 left-1/2 w-6 h-6 text-[#1a1a1a] animate-bounce" />
                                    </div>
                                  )}

                                  {/* TIER 3: ORACLE (Prediction Line) */}
                                  {activeTier === 'oracle' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <svg className="w-full h-full overflow-visible">
                                            <motion.path
                                                d="M 20 80 Q 60 70 100 50 T 180 20"
                                                fill="none"
                                                stroke="#1a1a1a"
                                                strokeWidth="2"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2 }}
                                            />
                                            <motion.path
                                                d="M 180 20 Q 220 10 260 -10"
                                                fill="none"
                                                stroke="#C5A059"
                                                strokeWidth="2"
                                                strokeDasharray="4 4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 2, duration: 1 }}
                                            />
                                        </svg>
                                    </div>
                                  )}

                                  {/* TIER 4: TOWER (Central Node) */}
                                  {activeTier === 'tower' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-full z-10 flex items-center justify-center text-white text-[8px]">
                                            HQ
                                        </div>
                                        {[0, 1, 2, 3].map(i => (
                                            <motion.div 
                                                key={i}
                                                className="absolute w-4 h-4 bg-[#C5A059] rounded-full"
                                                animate={{ 
                                                    x: [0, Math.cos(i * 1.57) * 50], 
                                                    y: [0, Math.sin(i * 1.57) * 50]
                                                }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        ))}
                                        <motion.div 
                                            className="absolute w-32 h-32 border border-[#1a1a1a]/10 rounded-full"
                                            animate={{ scale: [0.8, 1.2], opacity: [1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                  )}
                              </div>

                              <ul className="space-y-4 mb-8">
                                  {currentTier.specs.map((spec, i) => (
                                      <motion.li 
                                          key={i} 
                                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/70"
                                      >
                                          <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                                          {spec}
                                      </motion.li>
                                  ))}
                              </ul>
                          </div>

                          {/* ANCHORED BOTTOM CTA (FILL ANIMATION) */}
                          <FillButton 
                              onClick={() => onNavigate('landing', 'booking')}
                              className="w-full py-5 font-mono text-xs uppercase tracking-[0.2em] font-bold mt-auto"
                          >
                              [ INITIALIZE_PROTOCOL ]
                              <ArrowRight className="w-3 h-3 ml-2" />
                          </FillButton>
                      </div>

                  </div>
               </motion.div>
             </AnimatePresence>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default PillarPage_Intelligence;
