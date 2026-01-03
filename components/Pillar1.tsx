
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Zap, Map, Shield, 
  ShoppingBag, Box, RefreshCw, 
  Compass, Lock, BookOpen, 
  Gem, Layers, Star,
  CheckCircle2
} from 'lucide-react';
import PillarVisual_Catchment from './PillarVisual_Catchment';

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
  velocity: {
    id: 'velocity',
    label: "TIER 01 // VELOCITY",
    promise: "A complete lead-generation machine in 7 days.",
    sprint: "7-DAY SPRINT",
    specs: ['7-Day Turnaround', 'WordPress + Elementor Pro', 'Mobile-First Conversion Design', 'Basic SEO Foundation'],
    personas: [
      {
        id: "urgency",
        icon: Zap,
        title: "The Urgency Operator",
        examples: "Emergency Plumbers, Locksmiths",
        painTitle: "The $500 Missed Call",
        painText: "You live by the phone. If you miss a call at 11 PM because you are under a sink, that job goes to the next guy on Google. You are tired of losing money while you work.",
        solution: "We build a 'Digital Catcher'. It ensures every caller gets an instant SMS response, securing the job while you finish the work."
      },
      {
        id: "route",
        icon: Map,
        title: "The Route Operator",
        examples: "Pest Control, Solar, Cleaning",
        painTitle: "Driving for Free",
        painText: "Your biggest fear is spending an hour in Sydney traffic for a quote that goes nowhere. You are getting leads in Penrith when you are working in Bondi.",
        solution: "We implement 'Postcode Filtering'. You only get leads that are profitable and on your existing route."
      },
      {
        id: "compliance",
        icon: Shield,
        title: "The Professional",
        examples: "NDIS, Boutique Law, Allied Health",
        painTitle: "The 'Free Advice' Trap",
        painText: "You are drowning in calls from people who have no money or no case, wasting 10 hours a week giving free advice.",
        solution: "We act as 'The Gatekeeper'. Conditional logic forms pre-qualify leads so you only talk to high-value clients."
      }
    ]
  },
  retail: {
    id: 'retail',
    label: "TIER 02 // RETAIL",
    promise: "Your store is open and processing payments in 14 days.",
    sprint: "14-DAY SPRINT",
    specs: ['Shopify Architecture', 'POS Integration (Square/Vend)', 'Shipping Logic Automation', 'Automated Email Flows'],
    personas: [
      {
        id: "chaos",
        icon: ShoppingBag,
        title: "The Chaos Founder",
        examples: "Fashion Boutiques, Local Designers",
        painTitle: "The Double-Sell Disaster",
        painText: "Selling the last unique dress in-store at 10 AM and selling it again online at 10:05 AM. It kills your reputation and wastes hours on apologies.",
        solution: "A 'Single Source of Truth'. We sync your POS and your Website instantly so you never sell what you don't have."
      },
      {
        id: "logistics",
        icon: Box,
        title: "The Wholesaler",
        examples: "Auto Parts, Building Materials",
        painTitle: "Shipping Nightmares",
        painText: "Losing margin because a customer ordered a 50kg machine to a remote area with 'Free Shipping' logic that wasn't set up correctly.",
        solution: "Dimensional Shipping Logic. We calculate freight costs in real-time so you protect your margin."
      },
      {
        id: "churn",
        icon: RefreshCw,
        title: "The Subscription",
        examples: "Coffee Clubs, Pet Supplies",
        painTitle: "Involuntary Churn",
        painText: "30% of your cancellations aren't people leaving; they are just expired credit cards the system failed to update.",
        solution: "Automated Dunning Engines. We save the relationship automatically before the card fails."
      }
    ]
  },
  performance: {
    id: 'performance',
    label: "TIER 03 // PERFORMANCE",
    promise: "An instant-loading 'Digital Fortress' that commands authority.",
    sprint: "21-DAY SPRINT",
    specs: ['Headless Tech (Next.js)', '0.5s Load Times', 'Unhackable Security', 'Advanced CRM Integration'],
    personas: [
      {
        id: "precision",
        icon: Compass,
        title: "The Precision Builder",
        examples: "Luxury Homes, Commercial Architects",
        painTitle: "The Portfolio Lag",
        painText: "You have 4K photos of your work, but your site takes 5 seconds to load them. Clients assume you are 'sloppy' before they even meet you.",
        solution: "Edge Image Optimization. Your 4K portfolio loads instantly on a phone, proving your precision."
      },
      {
        id: "stakes",
        icon: Lock,
        title: "The High-Stakes Agent",
        examples: "Yacht Brokers, Private Jets",
        painTitle: "The Security Breach",
        painText: "If your site shows 'Not Secure', your elite clients will never trust you with their sensitive financial data.",
        solution: "Headless Architecture. No database to hack. A static 'Digital Fortress' that is 100% secure."
      },
      {
        id: "knowledge",
        icon: BookOpen,
        title: "The Knowledge Hub",
        examples: "Medical Clinics, Law Firms",
        painTitle: "The Search Sinkhole",
        painText: "Your site is so bloated that Google is de-ranking your best content. You are losing authority to faster, smaller competitors.",
        solution: "Core Web Vitals Dominance. We turn your knowledge library into a high-speed search weapon."
      }
    ]
  },
  flagship: {
    id: 'flagship',
    label: "TIER 04 // FLAGSHIP",
    promise: "A bespoke 'Digital Theatre' that justifies premium pricing.",
    sprint: "30+ DAY SPRINT",
    specs: ['Custom 3D / WebGL', 'Cinematic Motion Design', 'Bespoke User Journey', 'Award-Winning Aesthetics'],
    personas: [
      {
        id: "aesthetic",
        icon: Gem,
        title: "The Absolutist",
        examples: "Heritage Brands, Luxury Fashion",
        painTitle: "The Commodity Trap",
        painText: "If your website looks like a $50 template, you lose the ability to charge 10x the market rate. You fear 'Digital Cheapness'.",
        solution: "Headless Theatre. No white flashes, no lag. A cinematic journey that maintains your luxury status."
      },
      {
        id: "variant",
        icon: Layers,
        title: "The Visionary",
        examples: "Custom Furniture, Lighting",
        painTitle: "Visualization Paralysis",
        painText: "Customers won't spend $15k on a sofa if they can't see exactly how the 'Green Velvet' looks with 'Oak Legs'.",
        solution: "3D Configurators & WebAR. They place the product in their room instantly, removing the doubt."
      },
      {
        id: "hotel",
        icon: Star,
        title: "The Hotelier",
        examples: "Boutique Resorts, Safari Lodges",
        painTitle: "The Commission Drain",
        painText: "Paying 20% to Booking.com because your own website is too clunky to handle high-value direct bookings.",
        solution: "Cinematic Booking Engines. Capture the emotion and the full revenue, commission-free."
      }
    ]
  }
};

const Pillar1: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('velocity');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setActivePersonaIndex(0);
    setIsAutoPlaying(true);
  }, [activeTier]);

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

        {/* HERO SECTION (UPDATED LAYOUT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left: Text */}
          <div>
             <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_01 // ACQUISITION</span>
             <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
               Select your <span className="italic text-[#C5A059]">Engine.</span>
             </h1>
             <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6">
               Stop guessing. Identify your business model below to see the exact architecture required to scale it.
             </p>
          </div>
          
          {/* Right: Visual Animation (Restored) */}
          <div className="relative w-full max-w-[350px] h-[350px] mx-auto opacity-90">
             <PillarVisual_Catchment />
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
                                  {isActive && (!isAutoPlaying || isHovering) && (
                                       <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059]" />
                                  )}
                              </button>
                          );
                      })}
                  </div>

                  {/* --- BOTTOM ROW: SOLUTION CONTENT --- */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-black/5 pt-16">
                      
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

                      <div className="flex flex-col justify-between h-full bg-[#FAFAFA] p-10 border border-black/5 rounded-sm">
                          <div className="flex-grow">
                              <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest block mb-6">Visual Architecture</span>
                              
                              <div className="h-40 w-full mb-8 bg-white border border-black/5 rounded-sm flex items-center justify-center relative overflow-hidden shadow-inner">
                                  {activeTier === 'velocity' && (
                                    <div className="w-full px-8 relative">
                                        <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                                            <motion.div 
                                            initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }}
                                            className="h-full bg-[#C5A059]" 
                                            />
                                        </div>
                                        <div className="flex justify-between mt-4 font-mono text-[9px] uppercase tracking-widest text-[#C5A059]">
                                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Day_1<br/><span className="text-black/30">Audit</span></motion.div>
                                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>Day_3<br/><span className="text-black/30">Build</span></motion.div>
                                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>Day_7<br/><span className="text-black/30">Launch</span></motion.div>
                                        </div>
                                    </div>
                                  )}
                                  {/* [Other Tier Animations kept identical to your file] */}
                                  {activeTier === 'retail' && (
                                    <div className="flex items-center gap-4 relative">
                                        <div className="w-16 h-16 border border-[#C5A059] flex items-center justify-center font-mono text-[10px] text-[#C5A059]">POS</div>
                                        <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-[1px] bg-[#C5A059] relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C5A059]" />
                                        </motion.div>
                                        <div className="w-16 h-16 bg-[#C5A059] text-white flex items-center justify-center font-mono text-[10px]">WEB</div>
                                    </div>
                                  )}
                                  {activeTier === 'performance' && (
                                    <div className="relative w-32 h-16 overflow-hidden">
                                        <div className="w-full h-full border-t-[10px] border-l-[10px] border-r-[10px] border-black/10 rounded-t-full" />
                                        <motion.div initial={{ rotate: -90 }} animate={{ rotate: 0 }} transition={{ duration: 1, type: "spring" }} className="absolute bottom-0 left-1/2 w-full h-[10px] bg-[#1a1a1a] origin-left -translate-y-1/2" />
                                        <div className="absolute bottom-0 w-full text-center font-mono text-[10px] font-bold mt-2">100/100</div>
                                    </div>
                                  )}
                                  {activeTier === 'flagship' && (
                                    <motion.div animate={{ rotateY: 360, rotateX: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border border-[#C5A059] relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
                                        <div className="absolute inset-0 border border-[#C5A059]/30" style={{ transform: 'translateZ(20px)' }} />
                                        <div className="absolute inset-0 border border-[#C5A059]/30" style={{ transform: 'translateZ(-20px)' }} />
                                    </motion.div>
                                  )}
                              </div>

                              <ul className="space-y-4 mb-8">
                                  {currentTier.specs.map((spec, i) => (
                                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/70">
                                          <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                                          {spec}
                                      </motion.li>
                                  ))}
                              </ul>
                          </div>

                          <FillButton onClick={() => onNavigate('landing', 'booking')} className="w-full py-5 font-mono text-xs uppercase tracking-[0.2em] font-bold mt-auto">
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

export default Pillar1;
