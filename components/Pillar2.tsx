
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  Wrench, Calendar, Activity, // Tier 1 Icons
  TrendingUp, Zap, FileText, // Tier 2 Icons
  RotateCw, Coffee, CreditCard, // Tier 3 Icons
  Shuffle, Globe, Factory, // Tier 4 Icons
  User, Check // Additional UI Icons
} from 'lucide-react';
import PillarVisual_Network from './PillarVisual_Network';

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
  capture: {
    id: 'capture',
    label: "TIER 01 // CAPTURE",
    promise: "Stop the Lead Leak. Every enquiry acknowledged in seconds.",
    sprint: "3-DAY SPRINT",
    specs: ['Unified Inbox Architecture', 'Missed-Call SMS Automation', 'Google Maps Chat Sync', 'Lead Source Tracking'],
    personas: [
      {
        id: "trades",
        icon: Wrench,
        title: "The Elbow-Deep Tradie",
        examples: "Emergency Plumbers, Sparkies, HVAC, After-Hours Electricians",
        painTitle: "The Silent Competitor",
        painText: "A burst pipe emergency calls. You don't answer. That $500 job goes to the next guy on Google in 30 seconds. You're losing money while your hands are full.",
        solution: "I install a system that texts the customer back the second you miss a call, securing the job while you finish the one you're on."
      },
      {
        id: "venue",
        icon: Calendar,
        title: "The Venue Manager",
        examples: "Wedding Venues, Function Centres, Day Spas, Retreat Centres",
        painTitle: "The Ghosting Gap",
        painText: "A bride enquires on Saturday night. You don't respond until Monday. She's already booked three other venue tours. You lost a $30k wedding to a slow inbox.",
        solution: "I automate a 'VIP Acknowledge' SMS that feels personal, asking for their preferred tour date immediately. You respond in seconds without lifting a finger."
      },
      {
        id: "ndis",
        icon: Activity,
        title: "The Care Provider",
        examples: "NDIS Providers, Allied Health, Disability Services, Support Coordinators",
        painTitle: "The Audit Nightmare",
        painText: "You lose a participant's intake form in a messy inbox. Funding gets delayed. The audit fails. You're scrambling through emails at midnight looking for paperwork that should have been filed months ago.",
        solution: "I build Automated Intake. The participant fills it out on their phone, and the data lands in your secure CRM with a perfect audit trail. No more digging through emails."
      }
    ]
  },
  pipeline: {
    id: 'pipeline',
    label: "TIER 02 // PIPELINE",
    promise: "Visualise the Money. Stop flying blind.",
    sprint: "5-DAY SPRINT",
    specs: ['Kanban Deal Stages', 'Weighted Revenue Forecasting', 'Rep Accountability Logic', 'Automated Task Reminders'],
    personas: [
      {
        id: "blind",
        icon: TrendingUp,
        title: "The Blind Scaler",
        examples: "Security Firms, Marketing Agencies, Recruitment, Cleaning Companies",
        painTitle: "The Shadow Pipeline",
        painText: "You suspect reps are keeping deals in personal notebooks. If a rep leaves, the revenue leaves too. Your pipeline is held hostage by people who might quit tomorrow.",
        solution: "Your data is your equity. I build a visual Kanban board where every dollar is tracked. No more hiding deals. When a rep leaves, the pipeline stays."
      },
      {
        id: "velocity",
        icon: Zap,
        title: "The Velocity Director",
        examples: "Solar Sales, Insurance Brokers, Mortgage Brokers, Finance",
        painTitle: "The Admin Drag",
        painText: "Your reps spend 40% of their day 'updating the system' instead of selling. They hate the CRM. You hate chasing them. Everyone loses.",
        solution: "I build One-Click Automation. Meeting links, contract generation, follow-up tasks — all automatic. Reps sell more because admin takes seconds, not hours."
      },
      {
        id: "tender",
        icon: FileText,
        title: "The Estimator",
        examples: "Construction, Civil Engineering, Commercial Builders, Project Managers",
        painTitle: "The Tender Black Hole",
        painText: "You send a $100k bid and forget to follow up because you're busy on the next one. You lose millions in 'Silent No's' — jobs you could have won with one phone call.",
        solution: "I build a 'Nudge Engine'. The second a bid is sent, the system schedules 3 automated follow-ups to close the loop. No more wondering if they got it."
      }
    ]
  },
  retention: {
    id: 'retention',
    label: "TIER 03 // RETENTION",
    promise: "Maximise LTV. Stop renting customers, start owning them.",
    sprint: "7-DAY SPRINT",
    specs: ['Behavioral Email Flows', 'Churn Prevention Logic', 'VIP Segmentation', 'Cross-Sell Automation'],
    personas: [
      {
        id: "hamster",
        icon: RotateCw,
        title: "The E-commerce Merchant",
        examples: "Fashion Retailers, Homewares, Electronics, Gift Shops",
        painTitle: "The Ad-Spend Trap",
        painText: "You have 10,000 past customers but don't know how to talk to them without paying Zuckerberg for ads again. You're renting your own audience.",
        solution: "I turn your customer list into a 'Printing Press' — reselling to past customers for free via email and SMS. No ad spend required."
      },
      {
        id: "commodity",
        icon: Coffee,
        title: "The Commodity Seller",
        examples: "Coffee Roasters, Supplements, Pet Food, Consumables",
        painTitle: "The Habit Break",
        painText: "If a cafe owner forgets to order beans on Tuesday, they buy from a local wholesaler and you lose the customer. One missed order becomes permanent churn.",
        solution: "I build a 'Replenishment Engine'. The system texts them: 'Running low? Reply YES to reorder' before they run out. You stay top of mind without lifting a finger."
      },
      {
        id: "subscription",
        icon: CreditCard,
        title: "The Subscription Business",
        examples: "Subscription Boxes, Membership Sites, Retainer Services, SaaS",
        painTitle: "Involuntary Churn",
        painText: "30% of your cancellations aren't people leaving — they're just expired credit cards the system failed to update. You're losing customers who wanted to stay.",
        solution: "I build a 'Dunning Engine'. The system chases failed payments with empathy and saves the money you've already earned. Customers stay without awkward conversations."
      }
    ]
  },
  audit: {
    id: 'audit',
    label: "TIER 04 // AUDIT",
    promise: "Audit. Rebuild. Consolidate. Delete the software you don't need.",
    sprint: "7-DAY AUDIT",
    specs: ['Full Stack Audit', 'Data Migration Protocols', 'Workflow Optimization', 'Legacy System Retirement'],
    personas: [
      {
        id: "tangled",
        icon: Shuffle,
        title: "The Tangled Exec",
        examples: "Law Firms, Medical Practices, Engineering Firms, Accounting",
        painTitle: "Double Entry Hell",
        painText: "Your staff type a name into Case Management and then manually re-type it into Xero. It costs you $1M/year in lost capacity. You're paying senior people to do junior work.",
        solution: "I find the friction and automate it away, building bridges between your disconnected tools. Your team stops being data entry clerks."
      },
      {
        id: "franchise",
        icon: Globe,
        title: "The Franchise Guardian",
        examples: "Franchise Groups, Multi-Location Retail, Gym Chains, Restaurant Groups",
        painTitle: "Operational Drift",
        painText: "Every location does things differently. Some use spreadsheets, some use sticky notes. The 'Truth' is fragmented across 15 different systems. You can't see what's actually happening.",
        solution: "I build a 'Parent-Child' CRM structure. You see the health of your entire brand on one single screen. Every location, every metric, one dashboard."
      },
      {
        id: "legacy",
        icon: Factory,
        title: "The Manufacturer",
        examples: "Window Manufacturers, Cabinet Makers, Food Production, Industrial",
        painTitle: "Phantom Inventory",
        painText: "You sell something that isn't in stock because the 'Sales' computer doesn't talk to the 'Warehouse' computer. You apologise to the customer. Again.",
        solution: "I audit your ERP and CRM and build the bridge. You stop guessing and start selling with confidence. Real-time stock, real-time sales."
      }
    ]
  }
};

const Pillar2: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('capture');
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
            / Return to The System
          </button>
        </div>

        {/* HERO SECTION (2-COL GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 mb-32">
             
             {/* LEFT: CONTENT */}
             <div>
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ THE SYSTEM // GET CLIENTS</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 CRM & Lead <br />
                 <span className="italic text-[#E21E3F]">Tracking.</span>
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6">
                 If it's not in the CRM, it didn't happen.
               </p>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL */}
             <div className="relative w-full max-w-[350px] h-[300px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
                {/* The visual sits inside this strictly sized box */}
                <PillarVisual_Network />
             </div>
        </div>

        {/* --- UNIFIED DASHBOARD CONTAINER --- */}
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
                                  
                                  {/* TIER 1: THE SAFETY NET (Capture) */}
                                  {activeTier === 'capture' && (
                                    <div className="relative flex items-center justify-center w-full h-full">
                                        <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center relative z-10">
                                            <User className="w-6 h-6 text-black/40" />
                                            <motion.div 
                                              initial={{ scale: 0, opacity: 0 }}
                                              animate={{ scale: 1, opacity: 1 }}
                                              transition={{ delay: 1.5, type: "spring" }}
                                              className="absolute -top-1 -right-1 w-5 h-5 bg-[#C5A059] rounded-full flex items-center justify-center text-white"
                                            >
                                                <Check className="w-3 h-3" />
                                            </motion.div>
                                        </div>
                                        {/* Dots moving in */}
                                        {[0, 1, 2].map(i => (
                                            <motion.div 
                                                key={i}
                                                className="absolute w-2 h-2 bg-[#C5A059] rounded-full"
                                                initial={{ x: (i-1)*60, y: 60, opacity: 0 }}
                                                animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                            />
                                        ))}
                                    </div>
                                  )}

                                  {/* TIER 2: THE KANBAN (Pipeline) */}
                                  {activeTier === 'pipeline' && (
                                    <div className="flex items-center gap-6 relative">
                                        <div className="w-16 h-20 border border-black/10 rounded-sm bg-black/5 relative flex items-center justify-center">
                                            <span className="text-[8px] font-mono opacity-30 absolute top-2 left-2">IN</span>
                                        </div>
                                        <div className="w-16 h-20 border border-[#C5A059] rounded-sm bg-white relative flex items-center justify-center">
                                            <span className="text-[8px] font-mono text-[#C5A059] absolute top-2 left-2">WIN</span>
                                        </div>
                                        {/* Moving Item */}
                                        <motion.div 
                                            className="absolute w-8 h-8 bg-[#C5A059] rounded-sm shadow-md flex items-center justify-center"
                                            animate={{ x: [-44, 44], scale: [1, 0.9, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <span className="text-[6px] text-white font-mono">DEAL</span>
                                        </motion.div>
                                    </div>
                                  )}

                                  {/* TIER 3: THE LOOP (Retention) */}
                                  {activeTier === 'retention' && (
                                    <div className="relative w-24 h-24 flex items-center justify-center">
                                        <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
                                            <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="8" fill="none" />
                                            <motion.circle 
                                                cx="50" cy="50" r="40" 
                                                stroke="#C5A059" strokeWidth="8" fill="none" strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                        </svg>
                                        <div className="absolute text-center">
                                            <div className="font-mono text-[9px] text-[#C5A059] font-bold">LTV</div>
                                            <motion.div 
                                                className="text-xs font-bold"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                UP
                                            </motion.div>
                                        </div>
                                    </div>
                                  )}

                                  {/* TIER 4: CONSOLIDATION (Audit) */}
                                  {activeTier === 'audit' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Core */}
                                        <motion.div 
                                            className="w-4 h-4 bg-[#1a1a1a] rounded-full z-10"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        {/* Scattered Dots Merging */}
                                        {[0, 1, 2, 3].map(i => (
                                            <motion.div 
                                                key={i}
                                                className="absolute w-2 h-2 bg-[#C5A059] rounded-full"
                                                animate={{ 
                                                    x: [Math.cos(i * 1.57) * 50, 0],
                                                    y: [Math.sin(i * 1.57) * 50, 0],
                                                    opacity: [1, 0]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        ))}
                                        <div className="absolute bottom-2 font-mono text-[8px] text-black/30">SYNC_COMPLETE</div>
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
                              onClick={() => onNavigate('contact')}
                              className="w-full py-5 font-mono text-xs uppercase tracking-[0.2em] font-bold mt-auto"
                          >
                              [ BOOK A CALL ]
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

export default Pillar2;
