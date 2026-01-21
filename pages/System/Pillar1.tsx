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
  ArrowLeft, Zap, Map, Shield, 
  ShoppingBag, Box, RefreshCw, 
  Compass, Lock, BookOpen, 
  Gem, Layers, Star,
  CheckCircle, ChevronDown, ChevronRight, Terminal, HelpCircle
} from 'lucide-react';
import PillarVisual_Catchment from '../../components/PillarVisual_Catchment';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../../components/BackButton'; // STANDARDIZED BACK LINK

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'velocity' && (
        // ANIMATION: "The Lead Stream"
        <div className="relative flex items-center gap-2">
            <motion.div
                animate={{ x: [40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#C5A059]"
            />
            <motion.div
                animate={{ x: [40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#C5A059] absolute left-0"
            />
            
            <div className="relative w-4 h-4 bg-[#1a1a1a] border border-[#C5A059] rotate-45 z-10 flex items-center justify-center shadow-[0_0_15px_#C5A059]">
                <div className="w-1.5 h-1.5 bg-[#C5A059]" />
            </div>

            <motion.div
                animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#C5A059]"
            />
             <motion.div
                animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#C5A059] absolute right-0"
            />
        </div>
      )}

      {tierKey === 'retail' && (
        // ANIMATION: Orbit
        <div className="relative w-24 h-24 flex items-center justify-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute w-16 h-16 border border-[#C5A059]/40 rounded-full border-t-[#C5A059]"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="absolute w-10 h-10 border border-[#C5A059]/60 rounded-full border-b-[#C5A059]"
             />
             <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full shadow-[0_0_10px_#C5A059]" />
        </div>
      )}

      {tierKey === 'performance' && (
        // ANIMATION: Power Spike
        <div className="flex items-end gap-2 h-16 pb-0">
            <motion.div animate={{ height: [10, 30, 10] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 bg-[#C5A059]/30 rounded-t-sm" />
            <motion.div animate={{ height: [20, 50, 20] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} className="w-1.5 bg-[#C5A059]/60 rounded-t-sm" />
            <motion.div animate={{ height: [30, 60, 30] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} className="w-1.5 bg-[#C5A059] rounded-t-sm shadow-[0_0_10px_#C5A059]" />
            <motion.div animate={{ height: [15, 40, 15] }} transition={{ duration: 1.5, delay: 0.1, repeat: Infinity }} className="w-1.5 bg-[#C5A059]/40 rounded-t-sm" />
        </div>
      )}

      {tierKey === 'flagship' && (
        // ANIMATION: Rotating Structure
        <div className="perspective-500">
            <motion.div 
              animate={{ rotateY: 360, rotateX: 180 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-[#C5A059]/80 relative transform-style-3d flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
               <div className="absolute inset-0 border border-[#C5A059]/20 rotate-45" />
            </motion.div>
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  velocity: {
    id: 'velocity',
    label: "VELOCITY",
    hook: "I need leads now.",
    summary: "Choose this if you are a Tradesman, Emergency Service, or Local Professional (Plumbers, Locksmiths) who is losing money because you can't answer the phone while working.",
    sprint: "7-DAY SPRINT",
    specs: ['7-Day Turnaround', 'WordPress + Elementor Pro', 'Mobile-First Conversion Design', 'Basic SEO Foundation'],
    personas: [
      {
        id: "urgency",
        icon: Zap,
        title: "The Urgency Operator",
        examples: "Emergency Plumbers, Locksmiths",
        painTitle: "The $500 Missed Call",
        painText: "You live by the phone. If you miss a call at 11 PM because you're under a sink, that job goes to the next guy on Google. You're tired of losing money while you work.",
        solution: "I build a 'Digital Catcher'. Every caller gets an instant SMS response, securing the job while you finish the work. No more lost leads at 2 AM."
      },
      {
        id: "route",
        icon: Map,
        title: "The Route Operator",
        examples: "Pest Control, Solar Installers",
        painTitle: "The Qualification Time Sink",
        painText: "You're driving 45 minutes to quote a job only to discover they wanted 'free advice' or their budget is $200 for a $2,000 job. You're burning diesel and daylight on tyre-kickers.",
        solution: "I act as 'The Gatekeeper'. Conditional logic forms pre-qualify leads so you only talk to high-value clients. Your calendar fills with jobs worth driving to."
      },
      {
        id: "compliance",
        icon: Shield,
        title: "The Professional",
        examples: "NDIS, Boutique Law, Allied Health",
        painTitle: "The 'Free Advice' Trap",
        painText: "You're drowning in calls from people who have no money or no case, wasting 10 hours a week giving free advice.",
        solution: "I act as 'The Gatekeeper'. Conditional logic forms pre-qualify leads so you only talk to high-value clients."
      }
    ]
  },
  retail: {
    id: 'retail',
    label: "RETAIL",
    hook: "I need to sync my stock.",
    summary: "Choose this if you sell physical products (Fashion, Parts, Supplies) and you are tired of overselling, manual inventory updates, or fighting with shipping calculators.",
    sprint: "14-DAY SPRINT",
    specs: ['Shopify Architecture', 'POS Integration (Square/Vend)', 'Shipping Logic Automation', 'Automated Email Flows'],
    personas: [
      {
        id: "chaos",
        icon: ShoppingBag,
        title: "The Chaos Founder",
        examples: "Fashion Boutiques, Local Designers",
        painTitle: "The Double-Sell Disaster",
        painText: "You sell the last unique dress in-store at 10 AM and sell it again online at 10:05 AM. It kills your reputation and wastes hours on apology emails. You're terrified of overselling.",
        solution: "I build a 'Single Source of Truth'. Your POS and your website sync instantly — you never sell what you don't have. Real-time inventory across every channel."
      },
      {
        id: "logistics",
        icon: Box,
        title: "The Wholesaler",
        examples: "Auto Parts, Building Materials",
        painTitle: "Shipping Nightmares",
        painText: "You're losing margin because a customer ordered a 50kg machine to a remote area with 'Free Shipping' logic that wasn't set up correctly. Every miscalculated freight cost eats your profit.",
        solution: "I build Dimensional Shipping Logic. The site calculates freight costs in real-time based on weight, size, and postcode. You protect your margin on every order."
      },
      {
        id: "churn",
        icon: RefreshCw,
        title: "The Subscription",
        examples: "Coffee Clubs, Pet Supplies",
        painTitle: "Involuntary Churn",
        painText: "30% of your cancellations aren't people leaving — they're just expired credit cards the system failed to update. You're losing customers who wanted to stay.",
        solution: "I install Automated Dunning Engines. The system retries failed cards, sends update reminders, and saves the relationship automatically — before you even know there was a problem."
      }
    ]
  },
  performance: {
    id: 'performance',
    label: "PERFORMANCE",
    hook: "I need speed & trust.",
    summary: "Choose this if you sell high-ticket services (Luxury Homes, Medical, Finance) where a slow or insecure website makes you look 'cheap' and loses you the deal.",
    sprint: "21-DAY SPRINT",
    specs: ['Headless Tech (Next.js)', '0.5s Load Times', 'Unhackable Security', 'Advanced CRM Integration'],
    personas: [
      {
        id: "precision",
        icon: Compass,
        title: "The Precision Builder",
        examples: "Luxury Home Builders, Architects",
        painTitle: "The Portfolio Lag",
        painText: "You have 4K photos of stunning work, but your site takes 5 seconds to load them. Clients assume you're 'sloppy' before they even meet you. Your website is destroying the first impression you've spent 20 years building.",
        solution: "I build Edge Image Optimization. Your 4K portfolio loads instantly on any device. Your work proves your precision — your website finally matches your craftsmanship."
      },
      {
        id: "stakes",
        icon: Lock,
        title: "The High-Stakes Agent",
        examples: "Yacht Brokers, Private Jets",
        painTitle: "The Security Breach",
        painText: "If your site shows 'Not Secure', your elite clients will never trust you with their sensitive financial data. One warning message and you've lost a $500k deal.",
        solution: "I build Headless Architecture. No database to hack. A static 'Digital Fortress' that's 100% secure. Your clients see the padlock, not the warning."
      },
      {
        id: "knowledge",
        icon: BookOpen,
        title: "The Knowledge Hub",
        examples: "Medical Clinics, Financial Advisors",
        painTitle: "The Search Sinkhole",
        painText: "Your site is so bloated that Google is de-ranking your best content. You're losing authority to faster, smaller competitors. The advice you spent years writing is invisible.",
        solution: "I build Core Web Vitals Dominance. Your knowledge library becomes a high-speed search weapon. Google rewards fast sites with visibility — your expertise finally gets seen."
      }
    ]
  },
  flagship: {
    id: 'flagship',
    label: "FLAGSHIP",
    hook: "I need to show off.",
    summary: "Choose this if you are a Heritage Brand, Luxury Hotel, or Visionary where 'Standard' isn't enough. You need 3D, Motion, and Cinema to justify premium pricing.",
    sprint: "30+ DAY SPRINT",
    specs: ['Custom 3D / WebGL', 'Cinematic Motion Design', 'Bespoke User Journey', 'Award-Winning Aesthetics'],
    personas: [
      {
        id: "aesthetic",
        icon: Gem,
        title: "The Absolutist",
        examples: "Heritage Brands, Luxury Fashion",
        painTitle: "The Commodity Trap",
        painText: "If your website looks like a $50 template, you lose the ability to charge 10x the market rate. You fear 'Digital Cheapness' — a generic site destroys the mystique you've spent decades building.",
        solution: "I build Headless Theatre. No white flashes, no lag, no template smell. A cinematic journey that maintains your luxury status from the first pixel to the final purchase."
      },
      {
        id: "variant",
        icon: Layers,
        title: "The Visionary",
        examples: "Custom Furniture Makers, Lighting",
        painTitle: "Visualization Paralysis",
        painText: "Customers won't spend $15k on a sofa if they can't see exactly how the 'Green Velvet' looks with 'Oak Legs' in their lounge room. Imagination isn't enough — they need to see it to buy it.",
        solution: "I build 3D Configurators and WebAR. Customers place your product in their room instantly, choose every option, and remove all doubt. Configuration becomes conversion."
      },
      {
        id: "hotel",
        icon: Star,
        title: "The Hotelier",
        examples: "Boutique Resorts, Safari Lodges",
        painTitle: "The Commission Drain",
        painText: "You're paying 20% to Booking.com because your own website is too clunky to handle high-value direct bookings. The OTAs are eating your margin while you handle the service.",
        solution: "I build Cinematic Booking Engines. Capture the emotion and the full revenue, commission-free. Your guests book direct because the experience demands it."
      }
    ]
  }
};

const Pillar1: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('velocity');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('velocity');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar1');
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
                   THE SYSTEM / GET CLIENTS
                 </span>
               </div>

               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Select your <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Engine.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 Stop guessing. Identify your business model below to see the exact architecture required to scale it.
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
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-none mb-6">
             Select your <span className="italic text-[#C5A059] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               Every business needs a different engine. I've mapped out the 4 most common models below. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the one that matches your goal </strong> to see how we fix your specific headaches.
             </p>
             <p className="text-base text-[#1a1a1a]/50 italic">
               (If you feel like a mix of two, don't worry—we can build a hybrid. Just pick your main one to start).
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
        title="Questions about websites?"
        subtitle="Common questions about websites and e-commerce."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar1;