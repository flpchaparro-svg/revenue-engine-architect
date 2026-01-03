
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  Users, Radio, Video, Map, // Main Icons
  Truck, HardHat, Heart, // Tier 1 Icons
  Coffee, Package, TrendingUp, // Tier 2 Icons
  Briefcase, AlertTriangle, Calculator, // Tier 3 Icons
  Clock, Store, ShieldCheck, // Tier 4 Icons
  Check // UI Icons
} from 'lucide-react';
import PillarVisual_Helix from './PillarVisual_Helix';

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
  media: {
    id: 'media',
    label: "TIER 01 // MEDIA",
    promise: "Turn your SOPs into a Spotify Playlist. Learn while you drive.",
    sprint: "5-DAY SPRINT",
    specs: ['ElevenLabs Voice Cloning', 'Private Podcast Feeds', 'Descript Editing', 'Automated Distribution'],
    personas: [
      {
        id: "fleet",
        icon: Truck,
        title: "The Fleet Manager",
        examples: "Logistics, Removalists",
        painTitle: "The Unread Bulletin",
        painText: "Sending critical safety updates via email and knowing that 90% of your drivers never open them because they are on the road.",
        solution: "We turn your weekly bulletin into a 3-minute private podcast. They listen while they drive, and you get a dashboard proving they heard it."
      },
      {
        id: "field",
        icon: HardHat,
        title: "The Field Director",
        examples: "Solar, Electrical",
        painTitle: "The Site-Start Lag",
        painText: "Technicians sitting in their vans for 15 minutes trying to find the 'Installation Guide'. It kills billable time.",
        solution: "Pre-Arrival Briefs. As they drive to the job, they listen to the specific technical specs. They arrive ready to work."
      },
      {
        id: "care",
        icon: Heart,
        title: "The Care Leader",
        examples: "NDIS, Aged Care",
        painTitle: "Cultural Drift",
        painText: "Staff feeling like 'just a number' because they only receive cold emails from HQ. You are losing the human connection.",
        solution: "Monday Encouragement. Clone your voice to deliver personal updates. Hearing the founder's voice builds trust in a way text never can."
      }
    ]
  },
  matrix: {
    id: 'matrix',
    label: "TIER 02 // MATRIX",
    promise: "Answers in 60 seconds. The 'TikTok' for corporate training.",
    sprint: "7-DAY SPRINT",
    specs: ['HeyGen Avatars', 'QR Code Library', 'Just-in-Time Delivery', 'Mobile-First Player'],
    personas: [
      {
        id: "retail",
        icon: Coffee,
        title: "The Retail Manager",
        examples: "Cafe Groups, Gyms",
        painTitle: "Broken Record Syndrome",
        painText: "Having to repeat the 'How to close the register' speech for the 50th time this year to a new casual staff member.",
        solution: "We build a QR Code library behind the counter. A new hire scans it, watches a 60-second video of your clone explaining the task, and does it right."
      },
      {
        id: "warehouse",
        icon: Package,
        title: "The Warehouse Lead",
        examples: "Wholesale, Manufacturing",
        painTitle: "Decision Paralysis",
        painText: "A packer stopping the line because they 'forgot' how to label a dangerous good. It kills your throughput.",
        solution: "Point-of-Action Knowledge. A sticker on the bench links to a vertical video on 'Packing Protocol'. Search time becomes Pack time."
      },
      {
        id: "sales",
        icon: TrendingUp,
        title: "The Sales Director",
        examples: "Real Estate, Finance",
        painTitle: "The CRM Mess",
        painText: "Spending 5 hours a week cleaning up data because reps 'forgot' the new workflow.",
        solution: "In-App Nudges. When a rep moves a deal, a video pops up showing exactly which fields to fill. We enforce rules with video, not nagging."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "TIER 03 // VISUALS",
    promise: "One image is worth 1,000 words. We visualize the invisible.",
    sprint: "5-DAY SPRINT",
    specs: ['Napkin.ai Logic', 'Lucidchart Architecture', 'One-Page Cheat Sheets', 'Safety Iconography'],
    personas: [
      {
        id: "exec",
        icon: Briefcase,
        title: "The Non-Tech Exec",
        examples: "CEOs, Board Members",
        painTitle: "The Invisible Value",
        painText: "Rejecting a $50k automation project because the IT team explained it poorly. You can't sign off on what you don't understand.",
        solution: "We turn technical mess into a 'Napkin Sketch'. Customer Pays -> Xero Updates -> Slack Alerts. When you see the flow, you sign the cheque."
      },
      {
        id: "safety",
        icon: AlertTriangle,
        title: "The Safety Lead",
        examples: "Construction, Mining",
        painTitle: "The Ignored Manual",
        painText: "500-page safety binders that act as doorstops. Workers guess the protocol because the manual is unreadable.",
        solution: "Universal Iconography. High-contrast site posters that tell a worker exactly what to do with zero reading required."
      },
      {
        id: "estimator",
        icon: Calculator,
        title: "The Estimator",
        examples: "Civil Engineering, Fit-outs",
        painTitle: "The Pricing Error",
        painText: "A junior estimator missing a variable like 'Traffic Loading' because it was buried on page 10 of a doc.",
        solution: "Pricing Decision Trees. A visual sheet that asks 3 questions and gives the right multiplier. Juniors can't make mistakes."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "TIER 04 // ANALYST",
    promise: "The Manager doesn't need to answer 'How do I do this?' ever again.",
    sprint: "10-DAY SPRINT",
    specs: ['Private Knowledge Base', 'Slack/Teams Integration', 'RAG Architecture', 'Source Attribution'],
    personas: [
      {
        id: "billable",
        icon: Clock,
        title: "The Billable Protector",
        examples: "Lawyers, Consultants",
        painTitle: "The Interruption Drain",
        painText: "Spending 5 hours a week answering junior questions like 'Where is the precedent for X?'. It kills your billable capacity.",
        solution: "We clone your brain. The AI knows every precedent in your firm. Juniors ask the bot first, buying back your expensive time."
      },
      {
        id: "franchise",
        icon: Store,
        title: "The Franchise Guardian",
        examples: "Retail Groups, Multi-Site",
        painTitle: "Operational Drift",
        painText: "A manager in Parramatta doing things differently to the one in Bondi because the official guide is too hard to find.",
        solution: "The Franchise Brain. A manager asks 'What is the Summer Promo setup?' and gets the exact guide instantly. Consistency scales."
      },
      {
        id: "compliance",
        icon: ShieldCheck,
        title: "The Compliance Officer",
        examples: "High-Risk Trades",
        painTitle: "The Guesswork Risk",
        painText: "Living in fear of a safety breach because a worker 'guessed' a technical spec on site.",
        solution: "Technical Search. A worker asks 'What is the torque setting for X?' and gets the answer in 3 seconds. Search time becomes Safe time."
      }
    ]
  }
};

const PillarPage_Adoption: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('media');
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
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_06 // CULTURE</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 Adoption <br />
                 <span className="italic text-[#E21E3F]">Architecture.</span>
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 The best software in the world is useless if nobody uses it. <br/>
                 We engineer the <strong>Behavioral Shift</strong> required to turn "Shelfware" into culture.
               </p>
               <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
                  <span>Change the Behavior</span>
                  <ArrowRight className="w-4 h-4" />
               </div>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL */}
             <div className="relative w-full max-w-[300px] h-[300px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
                {/* The visual sits inside this strictly sized box */}
                <PillarVisual_Helix />
             </div>
        </div>

        {/* --- UNIFIED DASHBOARD CONTAINER --- */}
        <div className="mb-12">
           <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a]">Explore Learning Tiers.</h2>
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
                                  
                                  {/* TIER 1: MEDIA (Audio Waves) */}
                                  {activeTier === 'media' && (
                                    <div className="flex items-center gap-1 h-12">
                                        {[1, 2, 4, 3, 5, 4, 2, 1, 3, 5, 2].map((h, i) => (
                                            <motion.div 
                                                key={i}
                                                className="w-1.5 bg-[#1a1a1a] rounded-full"
                                                animate={{ height: [10, h * 8, 10] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                                            />
                                        ))}
                                    </div>
                                  )}

                                  {/* TIER 2: MATRIX (QR Code / Grid) */}
                                  {activeTier === 'matrix' && (
                                    <div className="grid grid-cols-4 gap-1 p-4 bg-white">
                                        {[...Array(16)].map((_, i) => (
                                            <motion.div 
                                                key={i}
                                                className="w-4 h-4 bg-[#1a1a1a]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: Math.random() > 0.3 ? 1 : 0.2 }}
                                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
                                            />
                                        ))}
                                        <div className="absolute inset-0 border-2 border-[#C5A059] opacity-50" />
                                    </div>
                                  )}

                                  {/* TIER 3: VISUALS (Flowchart) */}
                                  {activeTier === 'visuals' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="w-8 h-8 border border-[#1a1a1a] flex items-center justify-center mb-8">
                                            <div className="w-2 h-2 bg-[#1a1a1a]" />
                                        </div>
                                        <div className="absolute w-[1px] h-8 bg-[#1a1a1a] top-1/2 -translate-y-full" />
                                        <div className="absolute top-1/2 w-24 h-[1px] bg-[#1a1a1a]" />
                                        <div className="absolute top-1/2 left-[calc(50%-48px)] w-[1px] h-8 bg-[#1a1a1a]" />
                                        <div className="absolute top-1/2 right-[calc(50%-48px)] w-[1px] h-8 bg-[#1a1a1a]" />
                                        <div className="absolute top-[calc(50%+32px)] left-[calc(50%-56px)] w-6 h-6 bg-[#C5A059]" />
                                        <div className="absolute top-[calc(50%+32px)] right-[calc(50%-56px)] w-6 h-6 border border-[#1a1a1a]" />
                                    </div>
                                  )}

                                  {/* TIER 4: ANALYST (Brain Node) */}
                                  {activeTier === 'analyst' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <motion.div 
                                            className="w-12 h-12 bg-[#1a1a1a] rounded-full z-10 flex items-center justify-center"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <div className="w-4 h-4 bg-[#C5A059] rounded-full" />
                                        </motion.div>
                                        <motion.div 
                                            className="absolute w-24 h-24 border border-[#1a1a1a]/20 rounded-full"
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

export default PillarPage_Adoption;
