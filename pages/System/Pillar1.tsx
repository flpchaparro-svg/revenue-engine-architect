import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  Zap, Map, Shield, 
  ShoppingBag, Box, RefreshCw, 
  Compass, Lock, BookOpen, 
  Gem, Layers, Star,
  CheckCircle, ChevronDown, ChevronRight, HelpCircle
} from 'lucide-react';
import PillarVisual_Catchment from '../../components/PillarVisual_Catchment';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- 1. VISUALS (RED THEME: #E21E3F) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'velocity' && (
        <div className="relative flex items-center gap-2">
            <motion.div
                animate={{ x: [40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#E21E3F]"
            />
            <motion.div
                animate={{ x: [40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#E21E3F] absolute left-0"
            />
            
            <div className="relative w-4 h-4 bg-[#1a1a1a] border border-[#E21E3F] rotate-45 z-10 flex items-center justify-center shadow-[0_0_15px_#E21E3F]">
                <div className="w-1.5 h-1.5 bg-[#E21E3F]" />
            </div>

            <motion.div
                animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#E21E3F]"
            />
             <motion.div
                animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#E21E3F] absolute right-0"
            />
        </div>
      )}

      {tierKey === 'retail' && (
        <div className="relative w-24 h-24 flex items-center justify-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute w-16 h-16 border border-[#E21E3F]/40 rounded-full border-t-[#E21E3F]"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="absolute w-10 h-10 border border-[#E21E3F]/60 rounded-full border-b-[#E21E3F]"
             />
             <div className="w-1.5 h-1.5 bg-[#E21E3F] rounded-full shadow-[0_0_10px_#E21E3F]" />
        </div>
      )}

      {tierKey === 'performance' && (
        <div className="flex items-end gap-2 h-16 pb-0">
            <motion.div animate={{ height: [10, 30, 10] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 bg-[#E21E3F]/30 rounded-t-sm" />
            <motion.div animate={{ height: [20, 50, 20] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} className="w-1.5 bg-[#E21E3F]/60 rounded-t-sm" />
            <motion.div animate={{ height: [30, 60, 30] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} className="w-1.5 bg-[#E21E3F] rounded-t-sm shadow-[0_0_10px_#E21E3F]" />
            <motion.div animate={{ height: [15, 40, 15] }} transition={{ duration: 1.5, delay: 0.1, repeat: Infinity }} className="w-1.5 bg-[#E21E3F]/40 rounded-t-sm" />
        </div>
      )}

      {tierKey === 'flagship' && (
        <div className="perspective-500">
            <motion.div 
              animate={{ rotateY: 360, rotateX: 180 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-[#E21E3F]/80 relative transform-style-3d flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
               <div className="absolute inset-0 border border-[#E21E3F]/20 rotate-45" />
            </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 2. DATA CONTENT ---
const TIERS = {
  leadCapture: {
    id: 'leadCapture',
    label: "SERVICE 01 / LEAD CAPTURE",
    hook: "I need leads now.",
    summary: "Who this is for: Trades, service businesses, consultants",
    sprint: "",
    specs: ['Mobile-first design', 'Lead capture forms', 'Google Analytics setup', 'Basic SEO'],
    personas: [
      {
        id: "plumber",
        icon: Zap,
        title: "The Plumber",
        examples: "Local trades (plumbers, electricians, builders)",
        painTitle: "I get calls but my website looks like it's from 2010. Customers call the competitor with the nicer site.",
        painText: "I get calls but my website looks like it's from 2010. Customers call the competitor with the nicer site.",
        solution: "I build a clean, fast website with a quote form that sends leads straight to your phone. You look professional and capture every enquiry."
      },
      {
        id: "consultant",
        icon: Map,
        title: "The Consultant",
        examples: "Coaches, advisors, accountants",
        painTitle: "I need a site that explains what I do and lets people book a call. Not a 50-page monster.",
        painText: "I need a site that explains what I do and lets people book a call. Not a 50-page monster.",
        solution: "I build a simple site with your services, testimonials, and a calendar booking link. Professional without the complexity."
      },
      {
        id: "startup",
        icon: Shield,
        title: "The Startup",
        examples: "New businesses launching their first site",
        painTitle: "I need something up fast that doesn't cost a fortune but doesn't look cheap.",
        painText: "I need something up fast that doesn't cost a fortune but doesn't look cheap.",
        solution: "I build a clean launch site in 7 days. Looks premium, captures leads, and you can grow from there."
      }
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    label: "SERVICE 02 / E-COMMERCE",
    hook: "I need to sell online.",
    summary: "Who this is for: Retailers, wholesalers, product businesses",
    sprint: "",
    specs: ['Product catalogue', 'Payment processing', 'Shipping calculator', 'Inventory tracking'],
    personas: [
      {
        id: "retailer",
        icon: ShoppingBag,
        title: "The Retailer",
        examples: "Shops going online or expanding",
        painTitle: "I'm selling on Instagram DMs and it's chaos. I need a proper store but Shopify confused me.",
        painText: "I'm selling on Instagram DMs and it's chaos. I need a proper store but Shopify confused me.",
        solution: "I set up your online store with products, payments, and shipping. You get a link to share and orders come in automatically."
      },
      {
        id: "wholesaler",
        icon: Box,
        title: "The Wholesaler",
        examples: "B2B suppliers with trade pricing",
        painTitle: "I need different prices for different customers. Retail vs trade. Nobody builds that properly.",
        painText: "I need different prices for different customers. Retail vs trade. Nobody builds that properly.",
        solution: "I build a store with customer logins and tiered pricing. Trade customers see trade prices. Everyone else sees retail."
      },
      {
        id: "maker",
        icon: RefreshCw,
        title: "The Maker",
        examples: "Craftspeople, artists, small batch producers",
        painTitle: "I make beautiful things but my website doesn't show them properly. And I'm losing sales to shipping confusion.",
        painText: "I make beautiful things but my website doesn't show them properly. And I'm losing sales to shipping confusion.",
        solution: "I build a store that showcases your work with proper photos, clear shipping, and easy checkout."
      }
    ]
  },
  highPerformance: {
    id: 'highPerformance',
    label: "SERVICE 03 / HIGH PERFORMANCE",
    hook: "I need speed & trust.",
    summary: "Who this is for: Tech companies, funded startups, agencies",
    sprint: "",
    specs: ['Sub-second load times', 'Visual content editor', 'Enterprise hosting', 'Security hardening'],
    personas: [
      {
        id: "funded",
        icon: Compass,
        title: "The Funded Startup",
        examples: "Series A/B companies",
        painTitle: "Investors judge us by our website speed. If it's slow, they think our product is slow.",
        painText: "Investors judge us by our website speed. If it's slow, they think our product is slow.",
        solution: "I build on modern tech (Next.js) that loads in under a second. Your site signals you're serious."
      },
      {
        id: "tech",
        icon: Lock,
        title: "The Tech Company",
        examples: "SaaS, fintech, security-conscious",
        painTitle: "We need a site that can't be hacked and passes compliance checks.",
        painText: "We need a site that can't be hacked and passes compliance checks.",
        solution: "I build static sites with no database to attack. Bank-grade security for your public face."
      },
      {
        id: "marketing",
        icon: BookOpen,
        title: "The Marketing Director",
        examples: "Companies where marketing is blocked by developers",
        painTitle: "I wait 2 weeks for engineers to change a headline. It's killing our campaigns.",
        painText: "I wait 2 weeks for engineers to change a headline. It's killing our campaigns.",
        solution: "I build a site where you can edit content yourself without touching code. Engineers happy, marketers unblocked."
      }
    ]
  },
  landingPages: {
    id: 'landingPages',
    label: "SERVICE 04 / LANDING PAGES",
    hook: "I need campaign pages.",
    summary: "Who this is for: Marketers, event organisers, campaign runners",
    sprint: "",
    specs: ['Single-page focus', 'A/B testing ready', 'Form integration', 'Mobile optimised'],
    personas: [
      {
        id: "campaign",
        icon: Gem,
        title: "The Campaign Runner",
        examples: "Agencies, growth teams",
        painTitle: "We have a winning ad but the client's dev team says they can't build the landing page until next quarter.",
        painText: "We have a winning ad but the client's dev team says they can't build the landing page until next quarter.",
        solution: "I build standalone landing pages that bypass your main site. Launch tomorrow, test headlines, optimise fast."
      },
      {
        id: "event",
        icon: Layers,
        title: "The Event Organiser",
        examples: "Conferences, webinars, summits",
        painTitle: "I run events every month. Rebuilding the registration page each time takes hours.",
        painText: "I run events every month. Rebuilding the registration page each time takes hours.",
        solution: "I build a template you can duplicate in 5 minutes. Change the date, change the headline, publish."
      },
      {
        id: "course",
        icon: Star,
        title: "The Course Creator",
        examples: "Coaches, educators, trainers",
        painTitle: "My webinar sign-up page is slow and ugly. I'm losing people on mobile.",
        painText: "My webinar sign-up page is slow and ugly. I'm losing people on mobile.",
        solution: "I build fast landing pages that load instantly on any device. More sign-ups, less friction."
      }
    ]
  }
};

const Pillar1: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('leadCapture');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('leadCapture');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar1');
  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);

  useAnimationFrame((time, delta) => {
    const currentY = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    let newY = currentY + (speed * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);
  });

  const currentTier = TIERS[activeTier];
  const currentPersona = currentTier.personas[activePersonaIndex];

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }, 300); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      
      {/* HERO */}
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
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
                 Select your <span className="italic font-serif text-[#E21E3F] drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">Engine.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#E21E3F] pl-6 mb-8">
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

      {/* CONFIGURATOR */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-32 max-w-[1400px] mx-auto border-t border-[#1a1a1a]/10">
        <div className="mb-16">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6">
             Select your <span className="italic text-[#E21E3F] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               Every business needs a different engine. I've mapped out the 4 most common models below. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the one that matches your goal </strong> to see how we fix your specific headaches.
             </p>
           </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block border border-black/10 bg-gradient-to-br from-white to-[#FFF9F0] shadow-sm mb-32 rounded-sm overflow-hidden">
           <div className="grid grid-cols-4 border-b border-black/10 bg-[#FAFAFA]">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTier(key as keyof typeof TIERS)}
                  className={`py-6 px-4 text-center transition-all duration-300 relative group overflow-hidden flex flex-col justify-center min-h-[100px] ${
                    activeTier === key ? 'bg-white' : 'hover:bg-white/50 text-black/40'
                  }`}
                >
                  {/* FIX: Bumped to text-[10px] */}
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-2 ${activeTier === key ? 'text-[#E21E3F]' : 'text-inherit'}`}>
                    {tier.label}
                  </span>
                  <span className={`font-serif text-lg leading-tight ${activeTier === key ? 'text-black' : 'text-inherit opacity-60'}`}>
                    "{tier.hook}"
                  </span>
                  {activeTier === key && <motion.div layoutId="tab-highlight" className="absolute top-0 left-0 w-full h-1 bg-[#E21E3F]" />}
                </button>
              ))}
           </div>
           
           <div className="flex min-h-[600px]">
              <div className="w-1/3 border-r border-black/10 bg-[#FAFAFA] p-8 flex flex-col">
                 <div className="mb-8 p-4 bg-white border border-black/5 rounded-sm">
                    <div className="flex gap-2 items-center mb-2">
                       <HelpCircle className="w-4 h-4 text-[#E21E3F]" />
                       {/* FIX: Bumped to text-[10px] */}
                       <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/60">Is this you?</span>
                    </div>
                    <p className="font-sans text-sm text-black/70 leading-relaxed">
                       {currentTier.summary}
                    </p>
                 </div>

                 {/* FIX: Bumped to text-[10px] */}
                 <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest font-bold mb-4 block pl-1">Select Profile</span>
                 <div className="space-y-3 flex-grow">
                    {currentTier.personas.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePersonaIndex(idx)}
                        className={`w-full text-left p-4 border rounded-sm transition-all duration-300 flex items-center gap-4 group ${
                           activePersonaIndex === idx ? 'bg-white border-[#E21E3F] shadow-md' : 'bg-transparent border-transparent hover:bg-white hover:border-black/5'
                        }`}
                      >
                         <div className={`p-2 rounded-full ${activePersonaIndex === idx ? 'bg-[#E21E3F]/10 text-[#E21E3F]' : 'bg-black/5 text-black/40'}`}>
                           <p.icon className="w-4 h-4" />
                         </div>
                         <div>
                           <h4 className={`font-serif text-lg leading-tight ${activePersonaIndex === idx ? 'text-black' : 'text-black/60'}`}>{p.title}</h4>
                         </div>
                         {activePersonaIndex === idx && <ChevronRight className="w-4 h-4 ml-auto text-[#E21E3F]" />}
                      </button>
                    ))}
                 </div>

                 <div className="mt-8 pt-8 border-t border-black/5">
                    {/* FIX: Bumped to text-[10px] */}
                    <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest font-bold mb-4 block">Included Specs</span>
                    <ul className="space-y-2">
                      {currentTier.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                          <CheckCircle className="w-3 h-3 text-[#E21E3F]" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>

              <div className="w-2/3 p-12 relative flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div 
                       key={`${activeTier}-${activePersonaIndex}`}
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                       className="flex-grow flex flex-col"
                    >
                       <div className="mb-10">
                          {/* FIX: Bumped to text-[10px] */}
                          <span className="text-[#E21E3F] font-mono text-[10px] uppercase tracking-widest font-bold mb-3 block">The Problem</span>
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#E21E3F] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E21E3F]/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                {/* FIX: Bumped to text-[10px] */}
                                <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest block mb-4 font-bold">The Fix</span>
                                <p className="font-sans text-lg leading-relaxed mb-8">{currentPersona.solution}</p>
                                
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

        {/* MOBILE */}
        <div className="md:hidden space-y-4 mb-32">
          {Object.entries(TIERS).map(([key, tier]) => {
            const isTierExpanded = expandedTier === key;
            return (
              <div 
                key={key} 
                id={`tier-mobile-${key}`} 
                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isTierExpanded ? 'border-[#1a1a1a] bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
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
                    {/* FIX: Bumped to text-[10px] */}
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-[#E21E3F]' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    <span className={`font-serif text-lg leading-tight ${isTierExpanded ? 'text-white' : 'text-black'}`}>"{tier.hook}"</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTierExpanded ? 'rotate-180 text-[#E21E3F]' : 'text-black/30'}`} />
                </button>

                <AnimatePresence>
                  {isTierExpanded && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden bg-[#FAFAFA]"
                    >
                      <div className="p-4 space-y-2">
                         <div className="mb-6 p-4 bg-white border border-black/5 rounded-sm">
                            <p className="font-sans text-sm text-black/70 leading-relaxed">
                               {/* FIX: Bumped to text-[10px] */}
                               <strong className="text-[#E21E3F] block mb-1 font-bold uppercase text-[10px] tracking-widest">Is this you?</strong>
                               {tier.summary}
                            </p>
                         </div>

                         {/* FIX: Bumped to text-[10px] */}
                         <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest font-bold block mb-2 px-2">Select Profile:</span>
                         
                         {tier.personas.map((p) => {
                           const isPersonaExpanded = expandedPersona === p.id;
                           return (
                             <div 
                                key={p.id} 
                                id={`persona-mobile-${p.id}`} 
                                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isPersonaExpanded ? 'border-[#E21E3F] bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
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
                                  <div className={`p-2 rounded-full ${isPersonaExpanded ? 'bg-[#E21E3F] text-[#1a1a1a]' : 'bg-black/5 text-black/40'}`}>
                                     <p.icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-grow">
                                     <h4 className={`font-serif text-lg leading-tight ${isPersonaExpanded ? 'text-[#E21E3F]' : 'text-black/70'}`}>{p.title}</h4>
                                     <span className="text-[10px] text-black/40 block mt-1 line-clamp-1">{p.examples}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${isPersonaExpanded ? 'rotate-180 text-[#E21E3F]' : 'text-black/20'}`} />
                               </button>

                               <AnimatePresence>
                                 {isPersonaExpanded && (
                                   <motion.div
                                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                     className="border-t border-[#E21E3F]/20 bg-white"
                                   >
                                      <div className="p-6">
                                         <div className="mb-6">
                                            {/* FIX: Bumped to text-[10px] */}
                                            <span className="text-[#E21E3F] font-mono text-[10px] uppercase tracking-widest font-bold mb-2 block">The Problem</span>
                                            <h5 className="font-serif text-2xl mb-2 text-[#1a1a1a]">{p.painTitle}</h5>
                                            <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed italic border-l-2 border-[#E21E3F] pl-4">"{p.painText}"</p>
                                         </div>

                                         <div className="bg-[#1a1a1a] p-6 text-white rounded-sm mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E21E3F]/20 rounded-full blur-2xl" />
                                            {/* FIX: Bumped to text-[10px] */}
                                            <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest block mb-3 font-bold relative z-10">The Fix</span>
                                            <p className="font-sans text-base leading-relaxed mb-6 relative z-10">{p.solution}</p>
                                            
                                            <div className="w-full flex justify-center py-4 bg-transparent relative z-10">
                                               <div className="w-24 h-24 flex items-center justify-center">
                                                 <TierVisual tierKey={key} />
                                               </div>
                                            </div>
                                         </div>

                                         <div className="w-full">
                                            <CTAButton theme="dark" onClick={() => onNavigate('contact')} className="w-full">
                                                [ BOOK A CALL ]
                                            </CTAButton>
                                         </div>

                                         <div className="mt-8 pt-6 border-t border-black/10">
                                            {/* FIX: Bumped to text-[10px] */}
                                            <span className="font-mono text-[10px] text-black/30 uppercase tracking-widest font-bold mb-3 block">Included Specs</span>
                                            <ul className="space-y-2">
                                              {tier.specs.map((spec, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                                                  <CheckCircle className="w-3 h-3 text-[#E21E3F]" />
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