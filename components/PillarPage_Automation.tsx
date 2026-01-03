
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  Bot, Mail, Share2, Workflow, // Main Icons
  FileText, Briefcase, FileJson, // Tier 1 Icons
  Target, ShoppingCart, UserX, // Tier 2 Icons
  Mic, Video, CalendarClock, // Tier 3 Icons
  Briefcase as Case, CheckSquare, Server, // Tier 4 Icons
  Check // UI Icons
} from 'lucide-react';
import PillarVisual_Turbine from './PillarVisual_Turbine';

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
  bridge: {
    id: 'bridge',
    label: "TIER 01 // BRIDGE",
    promise: "We turn messy text into clean data, automatically.",
    sprint: "7-DAY SPRINT",
    specs: ['Intelligent Routing', 'Make.com + Claude AI', 'Unstructured Data Parsing', 'Zero-Entry CRM Sync'],
    personas: [
      {
        id: "prisoner",
        icon: FileText,
        title: "The Paperwork Prisoner",
        examples: "Lawyers, Mortgage Brokers",
        painTitle: "The Narrative Inbox",
        painText: "Clients send 500-word emotional emails. You spend billable hours reading them just to extract a date or an asset value.",
        solution: "An 'Intelligent Paralegal'. We build an AI Bridge that reads the noise, extracts the facts, and updates your case file instantly."
      },
      {
        id: "recruiter",
        icon: Briefcase,
        title: "The Drowning Recruiter",
        examples: "Niche Agencies, HR Depts",
        painTitle: "Resume Parsing Hell",
        painText: "You live in fear of missing a great candidate because their CV is buried in a generic 'Info@' inbox.",
        solution: "Resume Extraction Logic. The AI reads every PDF, grades the candidate against your criteria, and creates the profile in your CRM."
      },
      {
        id: "admin",
        icon: FileJson,
        title: "The Admin Victim",
        examples: "Property Managers, Logistics",
        painTitle: "The Data Entry Trap",
        painText: "Manually typing invoice data from PDF attachments into Xero. It's slow, boring, and error-prone.",
        solution: "Zero-Touch Invoicing. The Bridge detects the invoice, reads the line items, and creates the bill to pay automatically."
      }
    ]
  },
  behavior: {
    id: 'behavior',
    label: "TIER 02 // BEHAVIOR",
    promise: "The right message, to the right person, at the exact moment of influence.",
    sprint: "7-DAY SPRINT",
    specs: ['Intent Signal Tracking', 'Segment + HubSpot', 'Dynamic Personalization', 'Event-Driven Logic'],
    personas: [
      {
        id: "hunter",
        icon: Target,
        title: "The Signal Hunter",
        examples: "Consultants, Wealth Managers",
        painTitle: "The Opportunity Gap",
        painText: "A past prospect visited your Pricing page 3 times this morning, but you have no idea, so you don't call them.",
        solution: "We build a 'Hot List'. Every morning, you get an alert showing the 5 people who are obsessed with your content right now."
      },
      {
        id: "abandon",
        icon: ShoppingCart,
        title: "The Course Creator",
        examples: "Training Institutes, Educators",
        painTitle: "The Cold Cart",
        painText: "100 people start your checkout form, but only 10 finish. You are losing 90% of your revenue at the finish line.",
        solution: "Behavioral Recovery. If they type their email but don't pay, the system triggers a hyper-personalized recovery sequence."
      },
      {
        id: "nurture",
        icon: UserX,
        title: "The Nurture Failure",
        examples: "B2B SaaS, Agencies",
        painTitle: "The Silent List",
        painText: "You have 5,000 leads but you treat them all the same. You spam them with generic newsletters until they unsubscribe.",
        solution: "Intent Segmentation. We only email people about what they clicked on. If they read about 'SEO', we send them SEO case studies."
      }
    ]
  },
  content: {
    id: 'content',
    label: "TIER 03 // CONTENT",
    promise: "Create once, publish everywhere. We multiply your voice.",
    sprint: "5-DAY SPRINT",
    specs: ['Asset Multiplier', 'Make.com + GPT-4o', 'Omni-Channel Distribution', 'Voice-to-Social Pipeline'],
    personas: [
      {
        id: "thought",
        icon: Mic,
        title: "The Time-Poor Leader",
        examples: "Surgeons, M&A Partners",
        painTitle: "The Deep Work Conflict",
        painText: "You have the expertise, but switching from 'Strategy Mode' to 'Creator Mode' ruins your day. You won't spend Sunday on Canva.",
        solution: "You provide the 'Signal' (Voice Note). My system provides the 'Noise' (Distribution), turning it into a blog, 5 posts, and a newsletter."
      },
      {
        id: "omni",
        icon: Video,
        title: "The Omnipresence Seeker",
        examples: "Speakers, Podcasters",
        painTitle: "Legacy Waste",
        painText: "You have hours of video sitting on a hard drive doing nothing. You feel like you are 'wasting' your best assets.",
        solution: "The 'Slicer' Engine. We automatically cut your long-form video into viral shorts and schedule them across all channels."
      },
      {
        id: "inconsistent",
        icon: CalendarClock,
        title: "The Ghost",
        examples: "Boutique Agencies",
        painTitle: "Algorithm Punishment",
        painText: "You post brilliantly for 3 weeks, then get busy and disappear for 2 months. The algorithm hates you for it.",
        solution: "Automated Buffering. We build a content queue that drips your content out consistently, even when you are on holiday."
      }
    ]
  },
  autopilot: {
    id: 'autopilot',
    label: "TIER 04 // AUTOPILOT",
    promise: "Zero-Lag Onboarding. Professionalism on Autopilot.",
    sprint: "7-DAY SPRINT",
    specs: ['Zero-Lag Onboarding', 'Stripe + Jira + Slack', 'Auto-Project Creation', 'Client Portal Sync'],
    personas: [
      {
        id: "bottleneck",
        icon: Case,
        title: "The Bottleneck Owner",
        examples: "Agencies, MSPs",
        painTitle: "The Onboarding Lag",
        painText: "It takes 3 days to get a new client their folder, Slack invite, and invoice. They feel 'ignored' immediately after paying.",
        solution: "Instant Launch. The second the contract is signed, the project board is created and the client gets a 'Welcome' video."
      },
      {
        id: "dataheavy",
        icon: CheckSquare,
        title: "The Recruiter",
        examples: "Construction, Nursing",
        painTitle: "The Compliance Chase",
        painText: "Chasing candidates for 5 different ID documents via email. It slows down placement and frustrates the talent.",
        solution: "Automated Collection. The system chases the documents via SMS and only alerts you when the file is 100% complete."
      },
      {
        id: "provision",
        icon: Server,
        title: "The SaaS Founder",
        examples: "Software Tools, Platforms",
        painTitle: "Access Delay",
        painText: "A customer pays for your tool, but a human has to manually create their account. They want to use it NOW.",
        solution: "The Provisioning Hook. Payment triggers Account Creation instantly. Revenue is decoupled from human effort."
      }
    ]
  }
};

const PillarPage_Automation: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('bridge');
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
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_03 // VELOCITY</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 Fulfillment <br />
                 <span className="italic text-[#E21E3F]">Architecture.</span>
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 Revenue should not depend on Headcount. <br/>
                 We build the digital workforce that handles the admin, so your human team can focus on the <strong>High-Value</strong> work.
               </p>
               <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
                  <span>Select your Automation</span>
                  <ArrowRight className="w-4 h-4" />
               </div>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL */}
             <div className="relative w-full max-w-[350px] h-[300px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
                {/* The visual sits inside this strictly sized box */}
                <PillarVisual_Turbine />
             </div>
        </div>

        {/* --- UNIFIED DASHBOARD CONTAINER --- */}
        <div className="mb-12">
           <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a]">Choose your Engine.</h2>
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
                                  
                                  {/* TIER 1: CHAOS TO ORDER (Bridge) */}
                                  {activeTier === 'bridge' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Chaos Particles Left */}
                                        {[0,1,2].map(i => (
                                            <motion.div 
                                                key={i}
                                                className="absolute w-2 h-2 bg-[#E21E3F] rounded-full"
                                                animate={{ 
                                                    x: [-50, -20, -50], 
                                                    y: [Math.random()*40-20, Math.random()*40-20, Math.random()*40-20],
                                                    opacity: [1, 0]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i*0.5 }}
                                            />
                                        ))}
                                        
                                        {/* Funnel/Filter */}
                                        <div className="w-1 h-12 bg-black/10 mx-4" />

                                        {/* Ordered Grid Right */}
                                        <div className="grid grid-cols-2 gap-2">
                                            {[0,1,2,3].map(i => (
                                                <motion.div 
                                                    key={i}
                                                    className="w-4 h-4 border border-[#C5A059] bg-[#C5A059]/20"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5, delay: 1 + i*0.2, repeat: Infinity, repeatDelay: 2 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                  )}

                                  {/* TIER 2: RADAR BLIP (Behavior) */}
                                  {activeTier === 'behavior' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <motion.div 
                                            className="absolute w-32 h-32 border border-[#C5A059]/30 rounded-full"
                                            animate={{ scale: [0.5, 1.2], opacity: [1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.div 
                                            className="absolute w-20 h-20 border border-[#C5A059]/50 rounded-full"
                                            animate={{ scale: [0.5, 1.2], opacity: [1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        />
                                        <div className="w-2 h-2 bg-[#C5A059] rounded-full shadow-[0_0_10px_#C5A059]" />
                                        {/* Blip */}
                                        <motion.div 
                                            className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
                                            animate={{ opacity: [0, 1, 0], x: [20, 30], y: [-20, -30] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        />
                                    </div>
                                  )}

                                  {/* TIER 3: MULTIPLIER (Content) */}
                                  {activeTier === 'content' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Center Node */}
                                        <div className="w-8 h-8 bg-[#1a1a1a] rounded-full z-10 flex items-center justify-center text-white text-[8px]">
                                            IN
                                        </div>
                                        {/* Spawning Nodes */}
                                        {[0, 1, 2, 3].map(i => (
                                            <motion.div 
                                                key={i}
                                                className="absolute w-6 h-6 bg-[#C5A059] rounded-full flex items-center justify-center text-[6px] text-white"
                                                animate={{ 
                                                    x: [0, Math.cos(i * 1.57) * 40], 
                                                    y: [0, Math.sin(i * 1.57) * 40],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            >
                                                x{i+1}
                                            </motion.div>
                                        ))}
                                    </div>
                                  )}

                                  {/* TIER 4: HANDSHAKE GEARS (Autopilot) */}
                                  {activeTier === 'autopilot' && (
                                    <div className="relative w-full h-full flex items-center justify-center gap-1">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="w-12 h-12 border-2 border-dashed border-[#1a1a1a] rounded-full"
                                        />
                                        <motion.div 
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="w-12 h-12 border-2 border-dashed border-[#C5A059] rounded-full"
                                        />
                                        <div className="absolute">
                                            <Check className="w-6 h-6 text-[#C5A059] drop-shadow-md" />
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

export default PillarPage_Automation;
