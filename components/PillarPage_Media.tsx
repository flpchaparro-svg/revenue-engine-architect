
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  MonitorPlay, Mic, Share2, Rocket, // Main Icons
  User, Video, Globe, // Tier 1 Icons (Synthetic)
  Search, Award, Linkedin, // Tier 2 Icons (Authority)
  Layers, Instagram, Calendar, // Tier 3 Icons (Distribution)
  Zap, Ticket, Split, // Tier 4 Icons (Terminal)
  Check // UI Icons
} from 'lucide-react';
import PillarVisual_Broadcast from './PillarVisual_Broadcast';

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
  synthetic: {
    id: 'synthetic',
    label: "TIER 01 // SYNTHETIC",
    promise: "Your presence is everywhere, but you are nowhere.",
    sprint: "7-DAY SPRINT",
    specs: ['Voice Cloning (ElevenLabs)', 'Video Synthesis (HeyGen)', 'Script-to-Screen Logic', 'Anti-Uncanny Protocols'],
    personas: [
      {
        id: "timepoor",
        icon: User,
        title: "The Time-Poor Partner",
        examples: "Legal, Finance, M&A",
        painTitle: "The Opportunity Cost",
        painText: "You know video drives trust, but spending 4 hours filming a monthly update costs you $2,000 in billable time.",
        solution: "We clone your voice and visual persona. You send a text script, and the studio produces the video. You never leave your desk."
      },
      {
        id: "awkward",
        icon: Video,
        title: "The Camera-Shy Founder",
        examples: "SaaS, Engineering",
        painTitle: "The Charisma Gap",
        painText: "You are brilliant at code but freeze in front of a lens. You avoid marketing because you hate how you look on camera.",
        solution: "Perfect delivery, every time. The AI avatar never stutters, never blinks at the wrong time, and always looks professional."
      },
      {
        id: "global",
        icon: Globe,
        title: "The Global CEO",
        examples: "International Trade",
        painTitle: "The Language Barrier",
        painText: "You need to speak to stakeholders in Tokyo and Berlin, but you only speak English.",
        solution: "Instant Translation. We generate your video updates in 10 languages instantly, keeping your voice and lip-sync perfect."
      }
    ]
  },
  authority: {
    id: 'authority',
    label: "TIER 02 // AUTHORITY",
    promise: "Own the search results for your clients' deepest fears.",
    sprint: "14-DAY SPRINT",
    specs: ['Video-Led SEO', 'Topic Cluster Protocol', 'YouTube-to-Blog Pipeline', 'Semantic Authority'],
    personas: [
      {
        id: "frustrated",
        icon: Search,
        title: "The Frustrated Specialist",
        examples: "Surgeons, Family Law",
        painTitle: "The Expertise Void",
        painText: "Seeing a competitor with 1/10th of your skill ranking higher on Google because they have a better FAQ page.",
        solution: "We turn your answers into a 50-video 'Knowledge Graph'. Google has no choice but to rank you as the definitive expert."
      },
      {
        id: "cowboy",
        icon: Award,
        title: "The Quality Tradie",
        examples: "Solar, Construction",
        painTitle: "The Trust Deficit",
        painText: "Clients compare your premium quote to a 'Cowboy's' cheap quote because they don't understand the technical difference.",
        solution: "Pre-Emptive Education. Your video library explains the risks of 'Cheap Solar' before you even arrive at the house."
      },
      {
        id: "gatekeeper",
        icon: Linkedin,
        title: "The B2B Consultant",
        examples: "Change Management, HR",
        painTitle: "The LinkedIn Void",
        painText: "You rely on referrals because nobody knows your methodology. You are the 'Best Kept Secret' in your industry.",
        solution: "Automated Thought Leadership. We flood your niche with high-value clips that prove your methodology works."
      }
    ]
  },
  distribution: {
    id: 'distribution',
    label: "TIER 03 // DISTRIBUTION",
    promise: "Create once, publish everywhere. Zero manual uploading.",
    sprint: "7-DAY SPRINT",
    specs: ['Omni-Channel API', 'Auto-Resizing Logic', 'Caption Automation', 'Approval Workflows'],
    personas: [
      {
        id: "sunday",
        icon: Layers,
        title: "The Sunday Victim",
        examples: "Solos, Coaches",
        painTitle: "The Burnout Loop",
        painText: "Spending your entire Sunday evening fighting with Instagram hashtags and resizing photos. It feels like a waste of life.",
        solution: "The 'Drop Zone'. You drop a video in Drive, and the Grid handles resizing, captions, and posting automatically."
      },
      {
        id: "franchise",
        icon: Globe,
        title: "The Franchise Lead",
        examples: "Gym Groups, Retail",
        painTitle: "Brand Dilution",
        painText: "Local franchisees posting low-quality, off-brand content because they don't have access to the good stuff.",
        solution: "Centralized Command. You publish to 50 local pages instantly from one dashboard, ensuring perfect brand control."
      },
      {
        id: "ghost",
        icon: Calendar,
        title: "The Ghost",
        examples: "Agencies",
        painTitle: "Algorithm Punishment",
        painText: "You post brilliantly for 3 weeks, then get busy and disappear for 2 months. The algorithm hates you for it.",
        solution: "Automated Buffering. We build a content queue that drips your content out consistently, even when you are on holiday."
      }
    ]
  },
  terminal: {
    id: 'terminal',
    label: "TIER 04 // TERMINAL",
    promise: "Launch a world-class offer in 24 hours. Zero developer dependency.",
    sprint: "24-HOUR LAUNCH",
    specs: ['Framer / Unbounce', 'High-Velocity Templates', 'Stripe Integration', 'Subdomain Isolation'],
    personas: [
      {
        id: "adspend",
        icon: Zap,
        title: "The Ad Optimizer",
        examples: "Growth Marketers",
        painTitle: "The DevOps Wall",
        painText: "Having a winning ad idea but being told 'We can't update the website until next quarter.' You lose money every day you wait.",
        solution: "Speedboat Pages. We launch on a subdomain (offer.brand.com) in 24 hours. You never ask IT for permission again."
      },
      {
        id: "event",
        icon: Ticket,
        title: "The Event Runner",
        examples: "Workshops, Webinars",
        painTitle: "The Ticket Lag",
        painText: "Trying to sell tickets via a clunky Eventbrite page that doesn't match your brand. It kills the premium vibe.",
        solution: "Cinematic Microsites. A branded, high-conversion page dedicated purely to selling out your event."
      },
      {
        id: "tester",
        icon: Split,
        title: "The A/B Tester",
        examples: "E-com Managers",
        painTitle: "Statistical Blindness",
        painText: "You argue with your team about which headline is better. Nobody knows because you can't test it fast enough.",
        solution: "Rapid Variant Testing. We launch 4 versions of the offer simultaneously and let the data decide the winner."
      }
    ]
  }
};

const PillarPage_Media: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('synthetic');
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
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_05 // PRESENCE</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 Media <br />
                 <span className="italic text-[#E21E3F]">Logistics.</span>
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 We decouple your authority from your physical time. <br/>
                 We turn one hour of expertise into a month of <strong>Omnipresence</strong> through supply chain engineering.
               </p>
               <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
                  <span>Select your Channel</span>
                  <ArrowRight className="w-4 h-4" />
               </div>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL */}
             <div className="relative w-full max-w-[350px] h-[300px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
                {/* The visual sits inside this strictly sized box */}
                <PillarVisual_Broadcast />
             </div>
        </div>

        {/* --- UNIFIED DASHBOARD CONTAINER --- */}
        <div className="mb-12">
           <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a]">Choose your Broadcast.</h2>
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
                                  
                                  {/* TIER 1: SYNTHETIC (Voice Wave / Scan) */}
                                  {activeTier === 'synthetic' && (
                                    <div className="relative w-full h-full flex items-center justify-center gap-4">
                                        <div className="relative w-16 h-16 border border-[#C5A059] rounded-full flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-[#C5A059]/10 animate-pulse" />
                                            <MonitorPlay className="w-6 h-6 text-[#C5A059]" />
                                            <motion.div 
                                                className="absolute top-0 left-0 w-full h-[2px] bg-[#E21E3F]"
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {[1, 0.6, 0.8, 0.4, 1, 0.7].map((h, i) => (
                                                <motion.div 
                                                    key={i}
                                                    className="h-1 bg-black/20 rounded-full"
                                                    animate={{ width: [10, h * 40, 10] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                  )}

                                  {/* TIER 2: AUTHORITY (Ranking Graph) */}
                                  {activeTier === 'authority' && (
                                    <div className="relative w-full h-full flex items-center justify-center px-12">
                                        <div className="w-full flex items-end gap-2 h-16">
                                            {[0.3, 0.5, 0.4, 0.7, 0.6, 1].map((h, i) => (
                                                <motion.div 
                                                    key={i}
                                                    className={`w-full rounded-t-sm ${i === 5 ? 'bg-[#C5A059]' : 'bg-black/10'}`}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h * 100}%` }}
                                                    transition={{ duration: 1, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                        <div className="absolute top-4 right-12 bg-white px-2 py-1 shadow-sm border border-black/10 rounded-sm">
                                            <div className="w-16 h-2 bg-black/10 rounded-full mb-1" />
                                            <div className="w-10 h-2 bg-[#C5A059] rounded-full" />
                                        </div>
                                    </div>
                                  )}

                                  {/* TIER 3: DISTRIBUTION (1 to Many) */}
                                  {activeTier === 'distribution' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="w-8 h-8 bg-[#1a1a1a] rounded-full z-10 flex items-center justify-center">
                                            <Share2 className="w-4 h-4 text-white" />
                                        </div>
                                        {[0, 1, 2, 3, 4, 5].map(i => {
                                            const angle = (i / 6) * Math.PI * 2;
                                            return (
                                                <motion.div 
                                                    key={i}
                                                    className="absolute w-2 h-2 bg-[#C5A059] rounded-full"
                                                    animate={{ 
                                                        x: [0, Math.cos(angle) * 60],
                                                        y: [0, Math.sin(angle) * 60],
                                                        opacity: [0, 1, 0]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                />
                                            );
                                        })}
                                    </div>
                                  )}

                                  {/* TIER 4: TERMINAL (Launch) */}
                                  {activeTier === 'terminal' && (
                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                        <motion.div 
                                            className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-[#E21E3F] to-transparent"
                                            animate={{ y: [-100, 100] }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div className="relative z-10 bg-white p-4 border border-black/10 rounded-sm shadow-sm flex items-center gap-4">
                                            <Rocket className="w-6 h-6 text-[#1a1a1a]" />
                                            <div className="space-y-2">
                                                <div className="w-20 h-2 bg-black/10 rounded-full" />
                                                <div className="w-12 h-2 bg-[#C5A059] rounded-full" />
                                            </div>
                                        </div>
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

export default PillarPage_Media;
