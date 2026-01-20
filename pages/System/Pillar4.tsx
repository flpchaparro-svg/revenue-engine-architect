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
  ArrowLeft, ArrowRight, Zap, Bot, MessageSquare, Phone, 
  ShieldCheck, CheckCircle, ChevronDown, ChevronRight, Terminal, HelpCircle,
  BrainCircuit, Lock
} from 'lucide-react';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import PillarVisual_Brain from '../../components/PillarVisual_Brain';
import CTAButton from '../../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../../components/BackButton'; // STANDARDIZED BACK LINK

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (AI & Agent Concepts) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'concierge' && (
        // ANIMATION: "The Smart Filter" (Qualifying Leads)
        <div className="relative flex flex-col items-center">
            {/* Incoming Stream (Mixed) */}
            <div className="relative h-12 w-24 overflow-hidden mb-2">
                {[...Array(6)].map((_, i) => (
                   <motion.div
                     key={i}
                     initial={{ y: -20, opacity: 0 }}
                     animate={{ y: 40, opacity: [0, 1, 0] }}
                     transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                     className={`absolute w-1.5 h-1.5 rounded-full left-[${20 + i * 10}%] ${i % 2 === 0 ? 'bg-[#1a1a1a]/20' : 'bg-[#C5A059]'}`}
                     style={{ left: `${20 + i * 12}%` }}
                   />
                ))}
            </div>
            
            {/* The Filter Gate */}
            <div className="w-16 h-1 bg-[#C5A059] rounded-full shadow-[0_0_15px_#C5A059]" />
            
            {/* Outgoing Stream (Pure Gold) */}
            <div className="relative h-12 w-24 overflow-hidden mt-2">
                 <motion.div
                     animate={{ y: [0, 30], opacity: [1, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity }}
                     className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C5A059] rounded-full"
                 />
            </div>
        </div>
      )}

      {tierKey === 'analyst' && (
        // ANIMATION: "The Scanner" (Knowledge Retrieval)
        <div className="relative w-24 h-16 grid grid-cols-6 gap-1">
             {[...Array(18)].map((_, i) => (
                <div key={i} className="w-full h-full bg-[#C5A059]/10 rounded-[1px]" />
             ))}
             {/* The Scanning Beam */}
             <motion.div 
               animate={{ left: ["0%", "100%", "0%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent"
             />
             {/* The "Found" Answer */}
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#C5A059] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#C5A059]"
             />
        </div>
      )}

      {tierKey === 'voice' && (
        // ANIMATION: "The Waveform" (Voice Agent)
        <div className="flex gap-1 items-center h-16">
            {[...Array(5)].map((_, i) => (
                <motion.div 
                   key={i}
                   animate={{ height: [10, 40, 10] }}
                   transition={{ 
                     duration: 0.8, 
                     repeat: Infinity, 
                     delay: i * 0.1,
                     ease: "easeInOut"
                   }}
                   className="w-2 bg-[#C5A059] rounded-full"
                />
            ))}
        </div>
      )}

      {tierKey === 'custom' && (
        // ANIMATION: "The Vault" (Security)
        <div className="relative flex items-center justify-center w-24 h-24">
            {/* The Core */}
            <div className="absolute w-3 h-3 bg-[#C5A059] rounded-sm z-10" />
            
            {/* Rotating Shield 1 */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute w-12 h-12 border-2 border-[#C5A059]/40 rounded-sm"
            />
             {/* Rotating Shield 2 (Reverse) */}
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute w-16 h-16 border border-[#C5A059]/20 rounded-full border-t-[#C5A059]"
            />
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  concierge: {
    id: 'concierge',
    label: "GROWTH CONCIERGE",
    hook: "I am overwhelmed by inquiries.",
    summary: "Choose this if you are getting leads but wasting hours answering the same basic questions ('How much?', 'Where are you?') instead of closing deals.",
    sprint: "7-DAY SPRINT",
    specs: ['24/7 Web Chat Agent', 'Lead Qualification Logic', 'Calendar Booking', 'Knowledge Base Training'],
    personas: [
      {
        id: "tirekicker",
        icon: MessageSquare,
        title: "The Tire Kicker Victim",
        examples: "Real Estate, Yacht Brokers, High-Ticket Sales",
        painTitle: "The 'Just Looking' Drain",
        painText: "You spend your Saturday morning replying to 'Is this still available?' messages from people with zero budget. You are an expensive customer service rep.",
        solution: "I build a Gatekeeper AI. It chats with every lead instantly, asks for their budget/timeline, and only books a meeting if they are qualified. You only talk to serious buyers."
      },
      {
        id: "clinic",
        icon: ShieldCheck,
        title: "The Practice Manager",
        examples: "Dental, Cosmetic, Allied Health",
        painTitle: "The Front Desk Bottleneck",
        painText: "Your receptionist is great with people in the room, but terrible at answering the web chat. You are paying for ads, but potential patients are being ignored online.",
        solution: "We install a 24/7 Concierge. It answers FAQs about pricing and procedure recovery times instantly, and books the consultation directly into your practice software."
      },
      {
        id: "founder",
        icon: Zap,
        title: "The Solo Consultant",
        examples: "Coaches, Designers, Architects",
        painTitle: "The 11 PM Reply",
        painText: "You feel you have to reply instantly to win the job, so you are emailing at midnight. You have no boundaries between 'Work' and 'Life'.",
        solution: "The Concierge handles the 'First Touch' perfectly. It answers questions, builds rapport, and books the Discovery Call for a time that suits YOU. You get your evenings back."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "INTERNAL ANALYST",
    hook: "My team asks me everything.",
    summary: "Choose this if you are the 'Bottleneck Boss'—your staff constantly interrupts you to ask where files are or how to do basic tasks.",
    sprint: "7-DAY SPRINT",
    specs: ['Private Company Brain', 'SOP Ingestion', 'Slack/Teams Integration', 'Zero-Hallucination Guardrails'],
    personas: [
      {
        id: "bottleneck",
        icon: BrainCircuit,
        title: "The Bottleneck Founder",
        examples: "Agency Owners, Engineering Leads",
        painTitle: "The Groundhog Day",
        painText: "You answer the same 5 questions every week: 'Where is the logo?', 'What is our pricing for X?', 'Do we have a case study for this?'. Your genius is wasted on repetition.",
        solution: "I build a 'Company Brain'. We feed it every PDF, SOP, and past proposal you have ever written. Your staff ask the AI, not you. It answers instantly with a link to the file."
      },
      {
        id: "franchise",
        icon: CheckCircle,
        title: "The Franchise Guardian",
        examples: "Gym Groups, Retail Chains",
        painTitle: "The Rogue Franchisee",
        painText: "You have 10 locations, and every manager is doing things differently. They ignore the operations manual because it's a boring 100-page PDF.",
        solution: "We turn the manual into a Chatbot. A manager can ask: 'How do I process a refund?' and get the exact step-by-step guide instantly on their phone. Compliance becomes easy."
      },
      {
        id: "onboarding",
        icon: Terminal,
        title: "The Rapid Scaler",
        examples: "High-Growth Startups",
        painTitle: "The New Hire Drag",
        painText: "It takes 3 months for a new hire to become useful because they have to learn 'The Way We Do Things'. You lose money on every new employee for 90 days.",
        solution: "The Analyst reduces 'Time-to-Competency'. New hires can ask the AI how to use the software or file a report. They learn in real-time without distracting their manager."
      }
    ]
  },
  voice: {
    id: 'voice',
    label: "VOICE INTERFACE",
    hook: "I need a phone receptionist.",
    summary: "Choose this if you run a high-volume service business where missing a phone call means losing a $500 job to a competitor.",
    sprint: "10-DAY SPRINT",
    specs: ['Human-Sounding AI Voice', 'CRM Integration', '24/7 Availability', 'Appointment Booking'],
    personas: [
      {
        id: "muddy",
        icon: Phone,
        title: "The Muddy Hands Operator",
        examples: "Emergency Plumbers, Locksmiths",
        painTitle: "The Missed Emergency",
        painText: "You are under a sink or up a ladder. The phone rings. You can't answer. That customer calls the next plumber on Google. You just lost $500.",
        solution: "I replace your voicemail with a Voice AI. It answers instantly, sounds human, takes the address and problem details, and texts them to you. You secure the job without washing your hands."
      },
      {
        id: "afterhours",
        icon: CheckCircle,
        title: "The After-Hours Clinic",
        examples: "Vets, Emergency Dental",
        painTitle: "The Weekend Gap",
        painText: "Crises happen on weekends when your reception is closed. You rely on an expensive answering service that knows nothing about your business.",
        solution: "The Voice Agent works 24/7/365. It can triage emergencies, book appointments for Monday morning, or escalate true crises to the on-call doctor."
      },
      {
        id: "sales",
        icon: Zap,
        title: "The Lead Qualifier",
        examples: "Solar Sales, Home Improvements",
        painTitle: "The Cold Call Grind",
        painText: "Your sales team burns out calling 100 leads to find 1 interested person. They hate their job and churn quickly.",
        solution: "The Voice AI does the 'First Pass'. It calls the leads, asks the qualifying questions, and books the interested ones into your closer's calendar. Your team only talks to people who want to buy."
      }
    ]
  },
  custom: {
    id: 'custom',
    label: "CUSTOM & SECURE",
    hook: "I need AI, but private.",
    summary: "Choose this if you are in Finance, Law, or IP-heavy industries where data privacy is non-negotiable and 'Public AI' is a risk.",
    sprint: "BESPOKE SCOPE",
    specs: ['Private Cloud Hosting', 'PII Redaction', 'Local LLMs', 'Data Sovereignty'],
    personas: [
      {
        id: "compliance",
        icon: Lock,
        title: "The Compliance Officer",
        examples: "Wealth Managers, FinTech",
        painTitle: "The Shadow AI Risk",
        painText: "You know your junior staff are pasting sensitive client data into ChatGPT to write reports faster. It is a ticking time bomb for a data breach lawsuit.",
        solution: "I build a 'Walled Garden'. A private AI interface that works like ChatGPT but is hosted on your secure servers. No data ever leaves your control."
      },
      {
        id: "ip",
        icon: ShieldCheck,
        title: "The IP Guardian",
        examples: "Biotech, Patent Law, R&D",
        painTitle: "The Leak Fear",
        painText: "You want to use AI to analyze your research, but you can't risk that data training a public model that your competitors might use.",
        solution: "We deploy 'Zero-Retention' models. The AI reads your data, gives you the answer, and then instantly 'forgets' everything. Your IP remains exclusively yours."
      },
      {
        id: "complex",
        icon: BrainCircuit,
        title: "The Complex Reasoner",
        examples: "Legal Case Analysis, Medical Diagnosis Support",
        painTitle: "The Generic Answer",
        painText: "Standard AI is too generic. It gives 'average' advice. You need an AI trained specifically on Australian Case Law or specific medical protocols.",
        solution: "We fine-tune a model on your specific dataset. It stops sounding like a generic robot and starts sounding like a Senior Partner in your firm."
      }
    ]
  }
};

const Pillar4: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('concierge');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('concierge');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar4');
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
                   THE SYSTEM / THE VOICE
                 </span>
               </div>

               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Cognitive <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Infrastructure.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 We build "Digital Employees" that can speak, reason, and act. From answering the phone at 2 AM to finding answers in your company handbook instantly.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Brain />
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
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              SYSTEM CONFIGURATION
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-none mb-6">
             Select your <span className="italic text-[#C5A059] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               AI isn't just about writing emails. It's about cloning your best employees. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the role you need to fill</strong> to see how we engineer the digital replacement.
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
        title="Questions about AI?"
        subtitle="Common questions about privacy, accuracy, and replacing humans."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar4;