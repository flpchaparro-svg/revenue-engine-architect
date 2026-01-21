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
  ArrowLeft, ArrowRight, Zap, Video, Share2, Globe, 
  Mic, Search, Grid, Layout,
  CheckCircle, ChevronDown, ChevronRight, Terminal, HelpCircle,
  Clapperboard, Repeat
} from 'lucide-react';
import PillarVisual_MediaGrid from '../../components/PillarVisual_MediaGrid';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../../components/BackButton'; // STANDARDIZED BACK LINK

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (Service Level - Media Specific) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'synthetic' && (
        // ANIMATION: "The Clone" (Synthetic Studio)
        <div className="relative flex items-center justify-center gap-4">
            {/* The Source (Real) */}
            <div className="w-8 h-8 border border-[#C5A059] rounded-full flex items-center justify-center bg-[#1a1a1a] z-10">
               <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            </div>
            
            {/* The Transfer */}
            <div className="w-12 h-[1px] bg-[#C5A059]/30 overflow-hidden relative">
               <motion.div 
                 animate={{ x: [-48, 48] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-1/3 bg-[#C5A059]"
               />
            </div>

            {/* The Clone (Digital) */}
            <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-8 h-8 border border-[#C5A059] border-dashed rounded-full flex items-center justify-center bg-[#1a1a1a] z-10"
            >
               <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            </motion.div>
        </div>
      )}

      {tierKey === 'authority' && (
        // ANIMATION: "The Network" (SEO Matrix)
        <div className="relative w-24 h-24 flex items-center justify-center">
             {/* Center Node */}
             <div className="w-3 h-3 bg-[#C5A059] rounded-full z-10" />
             
             {/* Satellite Nodes */}
             {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ rotate: `${deg}deg` }}
                >
                   <div className="w-[1px] h-8 bg-[#C5A059]/30 absolute top-1/2 left-1/2 origin-top -translate-x-1/2" />
                   <div className="w-1.5 h-1.5 border border-[#C5A059] rounded-full absolute top-[85%] bg-[#1a1a1a]" />
                </motion.div>
             ))}
        </div>
      )}

      {tierKey === 'distribution' && (
        // ANIMATION: "The Broadcast" (Distribution Grid)
        <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-[#C5A059] rounded-sm z-10" />
            
            {[0, 1, 2].map((i) => (
                <motion.div 
                   key={i}
                   initial={{ width: 10, height: 10, opacity: 1 }}
                   animate={{ width: 80, height: 80, opacity: 0 }}
                   transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
                   className="absolute border border-[#C5A059] rounded-sm"
                />
            ))}
        </div>
      )}

      {tierKey === 'terminal' && (
        // ANIMATION: "The Launch" (Conversion Terminal)
        <div className="relative h-20 w-12 border-x border-[#C5A059]/20 flex justify-center overflow-hidden">
            <motion.div 
               animate={{ y: [-80, 80] }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="w-1 h-8 bg-[#C5A059]"
            />
            {/* Landing Pad */}
            <div className="absolute bottom-0 w-8 h-[2px] bg-[#C5A059]" />
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  synthetic: {
    id: 'synthetic',
    label: "SYNTHETIC STUDIO",
    hook: "I hate being on camera.",
    summary: "Choose this if you are a 'Time-Poor' Expert who wants the authority of video but hates the 'Production Circus' of cameras, lights, and retakes.",
    sprint: "7-DAY SPRINT",
    specs: ['AI Voice Cloning', 'Video Synthesis', 'Script-to-Video', 'No-Camera Production'],
    personas: [
      {
        id: "camera-shy",
        icon: Mic,
        title: "The Camera-Shy Expert",
        examples: "Lawyers, Finance Partners, Consultants",
        painTitle: "The Opportunity Cost",
        painText: "You know video drives trust, but you 'don't have time to look perfect' for a camera. If you spend 4 hours filming, you lose $2,000 in billable time.",
        solution: "I clone your voice and visual persona. You send me a text script, and my studio produces a video that looks and sounds like you in a professional setting. You never leave your desk."
      },
      {
        id: "founder",
        icon: Video,
        title: "The Awkward Founder",
        examples: "SaaS CEOs, Civil Engineers",
        painTitle: "The Performance Anxiety",
        painText: "You are brilliant at code or engineering, but freeze up when the red light turns on. Your videos look stiff and awkward, damaging your brand.",
        solution: "We remove the camera. We use a 'Synthetic Avatar' or high-end B-roll with your cloned voice. You sound confident and articulate every single time, without the anxiety."
      },
      {
        id: "scale",
        icon: Clapperboard,
        title: "The Content Scaling Team",
        examples: "Marketing Agencies, News Publishers",
        painTitle: "Production Bottleneck",
        painText: "You need to post daily, but your founder is only available for 1 hour a month. Your social channels are starving for content.",
        solution: "We decouple the face from the time. The marketing team writes the scripts, the AI generates the videos using the founder's likeness. Volume goes up 10x, founder effort stays at zero."
      }
    ]
  },
  authority: {
    id: 'authority',
    label: "AUTHORITY MATRIX",
    hook: "I'm invisible on Google.",
    summary: "Choose this if you are a Specialist (Medical, Legal, Trade) and want to dominate search results by answering client fears with video precision.",
    sprint: "14-DAY SPRINT",
    specs: ['Topic Cluster Protocol', 'Video-Led SEO', 'Blog Automation', 'Search Dominance'],
    personas: [
      {
        id: "frustrated",
        icon: Search,
        title: "The Frustrated Specialist",
        examples: "Orthopaedic Surgeons, Family Lawyers",
        painTitle: "The Expertise Void",
        painText: "You are the best in Sydney, but you are on page 3 of Google. You watch competitors with 1/10th of your skill get all the leads because they have a better FAQ page.",
        solution: "I turn your answers into a 'Knowledge Graph.' We record you answering 50 niche questions. Google sees you as the ultimate authority and has no choice but to rank you #1."
      },
      {
        id: "cowboy",
        icon: Zap,
        title: "The Cowboy Fighter",
        examples: "Solar Installers, Cosmetic Injectors",
        painTitle: "The Trust Deficit",
        painText: "Your industry is full of cowboys. Clients are scared. They need reassurance before they even call you.",
        solution: "We build an 'Education Wall.' When they search for 'Solar Risks,' they find your video explaining exactly what to watch out for. You win the trust before you even speak to them."
      },
      {
        id: "educator",
        icon: Globe,
        title: "The Industry Educator",
        examples: "RTOs, Training Academies",
        painTitle: "The Content Black Hole",
        painText: "You have great content inside your course, but nobody sees it on the outside. Your marketing doesn't reflect the quality of your product.",
        solution: "We extract your curriculum into public-facing SEO assets. We give the market a 'Free Sample' of your genius that leads directly to a purchase."
      }
    ]
  },
  distribution: {
    id: 'distribution',
    label: "DISTRIBUTION GRID",
    hook: "Posting takes forever.",
    summary: "Choose this if you have the content but are drowning in the 'Admin' of resizing, captioning, and uploading to 5 different platforms.",
    sprint: "7-DAY SPRINT",
    specs: ['Auto-Captioning', 'Multi-Channel Posting', 'Asset Resizing', 'Schedule Automation'],
    personas: [
      {
        id: "sunday",
        icon: Repeat,
        title: "The Sunday Grind Victim",
        examples: "Solo Consultants, Coaches",
        painTitle: "The Burnout Loop",
        painText: "You spend your entire Sunday evening fighting with Instagram hashtags and resizing videos instead of resting. You feel like a social media intern.",
        solution: "I build a 'Drop Zone.' You drop one video into Google Drive. The Grid automatically captions it, resizes it for TikTok/LinkedIn, and schedules it. You get your Sunday back."
      },
      {
        id: "franchise",
        icon: Share2,
        title: "The Franchise Coordinator",
        examples: "Gym Groups, Retail Chains",
        painTitle: "Brand Dilution",
        painText: "Your franchisees are posting low-quality, off-brand content because they don't have the right assets. It looks messy.",
        solution: "We centralize distribution. HQ drops the high-quality assets into the engine, and it pushes them to the local pages of every franchisee automatically. Perfect brand consistency."
      },
      {
        id: "podcast",
        icon: Mic,
        title: "The Podcaster",
        examples: "Audio-First Creators",
        painTitle: "The Visibility Gap",
        painText: "You have a great audio podcast, but no video clips for social media. You are invisible on TikTok and Instagram Reels.",
        solution: "We connect your RSS feed to the Grid. Every new episode automatically triggers the creation of 'Audiograms' and quote cards for social media."
      }
    ]
  },
  terminal: {
    id: 'terminal',
    label: "CONVERSION TERMINAL",
    hook: "I need a page fast.",
    summary: "Choose this if you have a new offer or ad campaign and need a high-speed landing page live in 24 hours, without waiting for your IT team.",
    sprint: "24-HOUR LAUNCH",
    specs: ['Framer/Webflow Dev', 'High-Speed Load', 'Stripe Integration', 'Ad-Optimised'],
    personas: [
      {
        id: "ad-spend",
        icon: Grid,
        title: "The Ad-Spend Optimiser",
        examples: "Growth Marketers, E-com Managers",
        painTitle: "The DevOps Wall",
        painText: "You have a winning ad idea, but IT says they can't update the website for 2 weeks. You are losing money every day you wait.",
        solution: "I build a 'Speedboat' page on a subdomain. It launches in 24 hours, loads instantly, and is designed purely for conversion. You don't need IT's permission."
      },
      {
        id: "event",
        icon: Layout,
        title: "The Event Runner",
        examples: "Conference Organizers, Webinar Hosts",
        painTitle: "The Ticket Lag",
        painText: "You are running an event, but your main website is too cluttered to sell tickets effectively. People get lost in the menu.",
        solution: "We deploy a single-page 'Terminal.' No menu, no distractions. Just the event details and a Stripe checkout. Conversion rates double immediately."
      },
      {
        id: "testing",
        icon: Terminal,
        title: "The Offer Tester",
        examples: "Startups, Serial Entrepreneurs",
        painTitle: "The Validation Trap",
        painText: "You want to test a new product idea, but building a whole Shopify store feels like overkill. You need to know if it sells *now*.",
        solution: "We launch a 'Validation Terminal.' A simple, beautiful page that takes pre-orders. If it sells, you build the business. If not, you saved months of work."
      }
    ]
  }
};

const Pillar5: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('synthetic');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('synthetic');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar5');
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
          
          {/* NAVIGATION - STANDARDIZED */}
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
               <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                   THE SYSTEM / THE PRESENCE
                 </span>
               </div>

               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Media <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Logistics.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 Content is a supply chain, not an art project. We industrialize the production of authority assets, using AI to turn one hour of your expertise into a month of presence.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_MediaGrid />
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
               Most experts are "Time-Poor." You have the knowledge, but you lack the bandwidth to be a creator. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the problem you want to solve</strong> to see the production line.
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
        title="Questions about Media?"
        subtitle="Common questions about video, SEO, and content scaling."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar5;