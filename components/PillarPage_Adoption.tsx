
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
        examples: "Logistics Companies, Removalists, Couriers, Delivery Fleets",
        painTitle: "The Unread Bulletin",
        painText: "You send critical safety updates via email knowing 90% of your drivers never open them because they're on the road. Important information hits the bin, not the brain.",
        solution: "I turn your weekly bulletin into a 3-minute private podcast. They listen while they drive, and you get a dashboard proving they heard it. Information delivered, attention confirmed."
      },
      {
        id: "field",
        icon: HardHat,
        title: "The Field Director",
        examples: "Solar Installers, Electricians, HVAC Technicians, Plumbers",
        painTitle: "The Site-Start Lag",
        painText: "Your technicians sit in their vans for 15 minutes trying to find the 'Installation Guide'. It kills billable time. You're paying them to search, not work.",
        solution: "I build Pre-Arrival Briefs. As they drive to the job, they listen to the specific technical specs. They arrive ready to work, not ready to read."
      },
      {
        id: "care",
        icon: Heart,
        title: "The Care Leader",
        examples: "NDIS Providers, Aged Care Facilities, Disability Services, Home Care",
        painTitle: "Cultural Drift",
        painText: "Your staff feel like 'just a number' because they only receive cold emails from HQ. You're losing the human connection. Culture dies in the inbox.",
        solution: "I build Monday Encouragement. Clone your voice to deliver personal updates. Hearing the founder's voice builds trust in a way text never can. Your team feels connected, even remotely."
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
        examples: "Cafe Groups, Gyms, Retail Chains, Hospitality Venues",
        painTitle: "Broken Record Syndrome",
        painText: "You repeat the 'How to close the register' speech for the 50th time this year to a new casual. You're a manager, not a broken record.",
        solution: "I build a QR Code library behind the counter. A new hire scans it, watches a 60-second video of your clone explaining the task, and does it right. You train once, they learn forever."
      },
      {
        id: "warehouse",
        icon: Package,
        title: "The Warehouse Lead",
        examples: "Wholesale Distributors, Manufacturing, Fulfilment Centres, 3PLs",
        painTitle: "The Line Stopper",
        painText: "A packer stops the line because they 'forgot' how to label a dangerous good. It kills your throughput. One confused worker, whole team waiting.",
        solution: "I build Point-of-Action Knowledge. A sticker on the bench links to a vertical video on 'Packing Protocol'. Search time becomes pack time. The answer is where they work."
      },
      {
        id: "sales",
        icon: TrendingUp,
        title: "The CRM Police",
        examples: "Real Estate Agencies, Finance Brokers, Insurance, B2B Sales Teams",
        painTitle: "The CRM Mess",
        painText: "You spend 5 hours a week cleaning up data because reps 'forgot' the new workflow. You're the most expensive data entry clerk in the building.",
        solution: "I build In-App Nudges. When a rep moves a deal, a video pops up showing exactly which fields to fill. Rules enforced with video, not nagging. Clean data, happy director."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "TIER 03 // VISUALS",
    promise: "One image is worth 1,000 words. I visualise the invisible.",
    sprint: "5-DAY SPRINT",
    specs: ['Napkin.ai Logic', 'Lucidchart Architecture', 'One-Page Cheat Sheets', 'Safety Iconography'],
    personas: [
      {
        id: "exec",
        icon: Briefcase,
        title: "The Non-Tech Exec",
        examples: "CEOs, Board Members, Managing Directors, Business Owners",
        painTitle: "The Invisible Value",
        painText: "You reject a $50k automation project because the IT team explained it poorly. You can't sign off on what you don't understand. Good projects die in confusion.",
        solution: "I turn technical mess into a 'Napkin Sketch'. Customer Pays → Xero Updates → Slack Alerts. When you see the flow, you sign the cheque. Clarity unlocks budget."
      },
      {
        id: "safety",
        icon: AlertTriangle,
        title: "The Safety Lead",
        examples: "Construction, Mining, Manufacturing, Industrial Sites",
        painTitle: "The Ignored Manual",
        painText: "Your 500-page safety binders act as doorstops. Workers guess the protocol because the manual is unreadable. One wrong guess and someone gets hurt.",
        solution: "I build Universal Iconography. High-contrast site posters that tell a worker exactly what to do with zero reading required. Safety becomes instinct, not homework."
      },
      {
        id: "estimator",
        icon: Calculator,
        title: "The Estimator",
        examples: "Civil Engineering, Commercial Fit-outs, Construction, Project Managers",
        painTitle: "The Pricing Error",
        painText: "Your junior estimator misses a variable like 'Traffic Loading' because it was buried on page 10 of a doc. One missed line, $50k mistake.",
        solution: "I build Pricing Decision Trees. A visual sheet that asks 3 questions and gives the right multiplier. Juniors can't make mistakes. Accuracy built into the process."
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
        examples: "Senior Lawyers, Partners, Consultants, Accountants",
        painTitle: "The Interruption Drain",
        painText: "You spend 5 hours a week answering junior questions like 'Where's the precedent for X?'. It kills your billable capacity. Your $500/hr brain is doing $50/hr work.",
        solution: "I clone your brain. The AI knows every precedent in your firm. Juniors ask the bot first, buying back your expensive time. You bill more, answer less."
      },
      {
        id: "franchise",
        icon: Store,
        title: "The Franchise Guardian",
        examples: "Franchise Groups, Retail Chains, Multi-Site Operations, Restaurant Groups",
        painTitle: "Operational Drift",
        painText: "Your manager in Parramatta does things differently to the one in Bondi because the official guide is too hard to find. Every location invents its own rules.",
        solution: "I build The Franchise Brain. A manager asks 'What's the Summer Promo setup?' and gets the exact guide instantly. Consistency scales. One brand, every location."
      },
      {
        id: "compliance",
        icon: ShieldCheck,
        title: "The Compliance Guardian",
        examples: "Property Managers, Strata, Insurance, Regulated Industries",
        painTitle: "The Compliance Maze",
        painText: "Your junior PM asks 'Can we increase the bond for this tenant?' You have to stop work to look up the Residential Tenancy Act. One wrong answer and you're in court.",
        solution: "I build a Compliance Bot. Tag @CompanyBrain in Slack: 'What's the maximum bond increase in NSW?' and get the answer with a citation to the legislation. Certainty on the fly."
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
            / Return to The System
          </button>
        </div>

        {/* HERO SECTION (2-COL GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 mb-32">
             
             {/* LEFT: CONTENT */}
             <div>
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ THE SYSTEM // SCALE FASTER</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 Team Training.
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 New software only works if your team actually uses it. I build short training videos and SOPs that make adoption easy — no 3-hour Zoom calls, no confusion.
               </p>
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

export default PillarPage_Adoption;
