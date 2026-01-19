import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValueEvent, 
  useAnimationFrame, 
  useMotionValue, 
  useTransform 
} from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  Bot, Mail, Share2, Workflow, 
  FileText, Briefcase, FileJson, 
  Target, ShoppingCart, UserX, 
  Mic, Video, CalendarClock, 
  Briefcase as Case, CheckSquare, Server, 
  Check 
} from 'lucide-react';
import PillarVisual_Turbine from '../../components/PillarVisual_Turbine';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';

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
    label: "TIER 01 / BRIDGE",
    promise: "I turn messy text into clean data, automatically.",
    sprint: "7-DAY SPRINT",
    specs: ['Intelligent Routing', 'Make.com + Claude AI', 'Unstructured Data Parsing', 'Zero-Entry CRM Sync'],
    personas: [
      {
        id: "prisoner",
        icon: FileText,
        title: "The Paperwork Prisoner",
        examples: "Lawyers, Mortgage Brokers, Conveyancers, Migration Agents",
        painTitle: "The Narrative Inbox",
        painText: "Clients send 500-word emotional emails. You spend billable hours reading them just to extract a date or an asset value. You're billing $400/hr to do admin.",
        solution: "I build an 'Intelligent Paralegal'. An AI Bridge that reads the noise, extracts the facts, and updates your case file instantly. You bill for thinking, not reading."
      },
      {
        id: "recruiter",
        icon: Briefcase,
        title: "The Drowning Recruiter",
        examples: "Recruitment Agencies, HR Departments, Labour Hire, Executive Search",
        painTitle: "Resume Parsing Hell",
        painText: "You live in fear of missing a great candidate because their CV is buried in a generic 'Info@' inbox. The perfect hire is sitting unread while you scroll.",
        solution: "I build Resume Extraction Logic. The AI reads every PDF, grades the candidate against your criteria, and creates the profile in your CRM. No more inbox archaeology."
      },
      {
        id: "admin",
        icon: FileJson,
        title: "The Admin Victim",
        examples: "Property Managers, Logistics Companies, Strata Managers, Fleet Operators",
        painTitle: "The Data Entry Trap",
        painText: "You're manually typing invoice data from PDF attachments into Xero. It's slow, boring, and error-prone. One wrong digit and your BAS is wrong.",
        solution: "I build Zero-Touch Invoicing. The system detects the invoice, reads the line items, and creates the bill in Xero automatically. You approve, not type."
      }
    ]
  },
  behavior: {
    id: 'behavior',
    label: "TIER 02 / BEHAVIOUR",
    promise: "The right message, to the right person, at the exact moment of influence.",
    sprint: "7-DAY SPRINT",
    specs: ['Intent Signal Tracking', 'Segment + HubSpot', 'Dynamic Personalisation', 'Event-Driven Logic'],
    personas: [
      {
        id: "hunter",
        icon: Target,
        title: "The Signal Hunter",
        examples: "Consultants, Wealth Managers, Financial Advisors, Business Coaches",
        painTitle: "The Opportunity Gap",
        painText: "A past prospect visited your Pricing page 3 times this morning. You have no idea, so you don't call them. They sign with your competitor by lunch.",
        solution: "I build a 'Hot List'. Every morning, you get an alert showing the 5 people who are obsessed with your content right now. You call them first."
      },
      {
        id: "abandon",
        icon: ShoppingCart,
        title: "The Course Creator",
        examples: "Online Course Creators, Training Institutes, Coaches, RTOs",
        painTitle: "The Cold Cart",
        painText: "100 people start your checkout form, but only 10 finish. You're losing 90% of your revenue at the finish line. They wanted to buy — something stopped them.",
        solution: "I build Behavioural Recovery. If they type their email but don't pay, the system triggers a personalised recovery sequence. You win back sales you already earned."
      },
      {
        id: "nurture",
        icon: UserX,
        title: "The List Bomber",
        examples: "B2B Services, Marketing Agencies, Software Companies, Consultancies",
        painTitle: "The Silent List",
        painText: "You have 5,000 leads but you treat them all the same. You spam them with generic newsletters until they unsubscribe. Your list is dying from boredom.",
        solution: "I build Intent Segmentation. The system only emails people about what they clicked on. If they read about 'SEO', they get SEO case studies. Relevance, not spam."
      }
    ]
  },
  content: {
    id: 'content',
    label: "TIER 03 / CONTENT",
    promise: "Create once, publish everywhere. I multiply your voice.",
    sprint: "5-DAY SPRINT",
    specs: ['Asset Multiplier', 'Make.com + GPT-4o', 'Omni-Channel Distribution', 'Voice-to-Social Pipeline'],
    personas: [
      {
        id: "thought",
        icon: Mic,
        title: "The Time-Poor Expert",
        examples: "Surgeons, M&A Partners, Senior Lawyers, Specialist Consultants",
        painTitle: "The Deep Work Conflict",
        painText: "You have the expertise, but switching from 'Strategy Mode' to 'Creator Mode' ruins your day. You won't spend Sunday on Canva. Your knowledge stays locked in your head.",
        solution: "You provide the 'Signal' — a voice note. I turn it into a blog, 5 posts, and a newsletter. Your expertise gets out without you becoming a content creator."
      },
      {
        id: "omni",
        icon: Video,
        title: "The Content Hoarder",
        examples: "Speakers, Podcasters, YouTubers, Conference Presenters",
        painTitle: "Legacy Waste",
        painText: "You have hours of video sitting on a hard drive doing nothing. You're 'wasting' your best assets. Content you already made, collecting dust.",
        solution: "I build a 'Slicer' Engine. The system cuts your long-form video into shorts and schedules them across all channels. Your archive becomes your content calendar."
      },
      {
        id: "inconsistent",
        icon: CalendarClock,
        title: "The Ghost",
        examples: "Boutique Agencies, Solo Consultants, Small Teams, Busy Founders",
        painTitle: "Algorithm Punishment",
        painText: "You post brilliantly for 3 weeks, then get busy and disappear for 2 months. The algorithm hates you for it. You start from zero every time.",
        solution: "I build Automated Buffering. A content queue that drips your posts out consistently, even when you're on holiday. You stay visible without staying online."
      }
    ]
  },
  autopilot: {
    id: 'autopilot',
    label: "TIER 04 / AUTOPILOT",
    promise: "Zero-Lag Onboarding. Professionalism on autopilot.",
    sprint: "7-DAY SPRINT",
    specs: ['Zero-Lag Onboarding', 'Stripe + Jira + Slack', 'Auto-Project Creation', 'Client Portal Sync'],
    personas: [
      {
        id: "bottleneck",
        icon: Case,
        title: "The Bottleneck Owner",
        examples: "Marketing Agencies, IT Providers (MSPs), Consultancies, Creative Studios",
        painTitle: "The Onboarding Lag",
        painText: "It takes 3 days to get a new client their folder, Slack invite, and invoice. They feel 'ignored' immediately after paying. You've already damaged the relationship.",
        solution: "I build Instant Launch. The second the contract is signed, the project board is created and the client gets a 'Welcome' video. First impressions, automated."
      },
      {
        id: "dataheavy",
        icon: CheckSquare,
        title: "The Compliance Chaser",
        examples: "Construction Recruitment, Healthcare Recruitment, Labour Hire, Mining",
        painTitle: "The Compliance Chase",
        painText: "You're chasing candidates for 5 different ID documents via email. It slows down placement and frustrates the talent. Your best candidates drop out of the process.",
        solution: "I build Automated Collection. The system chases documents via SMS and only alerts you when the file is 100% complete. You place candidates, not paperwork."
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

const Pillar3: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('bridge');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Get FAQ data for this pillar
  const pillarFAQs = getPillarFAQs('pillar3');
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

  // --- SCROLL LINE ANIMATION ---
  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);
  const { scrollY } = useScroll();
  
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useAnimationFrame((time, delta) => {
    const currentY = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    let newY = currentY + (speed * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const scrollDelta = Math.abs(latest - lastScrollYRef.current);
      if (scrollDelta > 0) {
        const velocity = scrollDelta / timeDelta;
        scrollVelocityRef.current = velocity;
        const baseSpeed = 0.067;
        const maxSpeed = 0.5;
        const newSpeed = Math.min(baseSpeed + (velocity * 0.0001), maxSpeed);
        scrollLineSpeed.set(newSpeed);
        if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
        decayTimeoutRef.current = setTimeout(() => {
          const currentSpeed = scrollLineSpeed.get();
          if (currentSpeed > baseSpeed) {
            scrollLineSpeed.set(baseSpeed);
          }
        }, 100);
        scrollVelocityRef.current = 0;
      }
    }
    lastScrollYRef.current = latest;
    lastTimeRef.current = now;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      
      {/* --- HERO SECTION (100dvh) --- */}
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          
          {/* RETURN NAV */}
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <button 
              onClick={() => onNavigate('system')}
              className="group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              / Return to The System
            </button>
          </div>

          {/* HERO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
             
             {/* LEFT: CONTENT */}
             <div className="flex flex-col justify-center">
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-4 lg:mb-6 block uppercase font-bold">/ THE SYSTEM / GET CLIENTS</span>
               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-6 lg:mb-8">
                 Automation.
               </h1>
               <p className="font-sans text-lg lg:text-xl text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6">
                 Invoices, follow-ups, and data entry — the boring stuff that eats your week. I make it run on autopilot so your team can do real work.
               </p>
             </div>
             
             {/* RIGHT: VISUAL */}
             <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                   <PillarVisual_Turbine />
                </div>
             </div>
          </div>
        </div>

        {/* SCROLL LINE ANIMATION */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-[#1a1a1a]/10 overflow-hidden z-0">
          <motion.div 
            style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }}
            className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" 
          />
        </div>
      </section>

      {/* --- DASHBOARD SECTION --- */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-32 max-w-[1400px] mx-auto border-t border-[#1a1a1a]/10">
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
                    {tier.label.split('/')[1]}
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
                                    <span className="text-[#E21E3F] font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block">Diagnosis / The Pain Point</span>
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
      </section>

      {/* FAQ SECTION */}
      <FAQSection
        faqs={pillarFAQs}
        accentColor="#C5A059"
        title="Questions about automation?"
        subtitle="Common questions about business automation."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar3;
