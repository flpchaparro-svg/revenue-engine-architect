import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  Zap, MessageSquare, Phone, 
  ShieldCheck, CheckCircle, ChevronDown, ChevronRight, Terminal, HelpCircle,
  BrainCircuit, Lock
} from 'lucide-react';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import PillarVisual_Brain from '../../components/PillarVisual_Brain';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (GOLD THEME: #C5A059) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'concierge' && (
        // ANIMATION: "The Smart Filter"
        <div className="relative flex flex-col items-center">
            {/* Incoming Stream */}
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
        // ANIMATION: "The Scanner"
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
        // ANIMATION: "The Waveform"
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
        // ANIMATION: "The Vault"
        <div className="relative flex items-center justify-center w-24 h-24">
            {/* The Core */}
            <div className="absolute w-3 h-3 bg-[#C5A059] rounded-sm z-10" />
            
            {/* Rotating Shield 1 */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute w-12 h-12 border-2 border-[#C5A059]/40 rounded-sm"
            />
             {/* Rotating Shield 2 */}
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
  phoneAnswering: {
    id: 'phoneAnswering',
    label: "SERVICE 01 / PHONE ANSWERING",
    hook: "I need calls answered 24/7.",
    summary: "Who this is for: Businesses missing calls",
    sprint: "",
    specs: ['24/7 phone answering', 'Lead qualification', 'Calendar booking', 'Call summaries'],
    personas: [
      {
        id: "afterhours",
        icon: MessageSquare,
        title: "The After-Hours Caller",
        examples: "Trades, emergency services",
        painTitle: "My phone rings at 9pm and I miss it. That's a $2,000 job gone to whoever answers.",
        painText: "My phone rings at 9pm and I miss it. That's a $2,000 job gone to whoever answers.",
        solution: "AI answers your phone 24/7, qualifies the lead, and books them in your calendar. You wake up to appointments, not missed calls."
      },
      {
        id: "lunch",
        icon: ShieldCheck,
        title: "The Lunch Break Problem",
        examples: "Small teams with no receptionist",
        painTitle: "When we're all on jobs or at lunch, nobody answers. Customers hang up and call someone else.",
        painText: "When we're all on jobs or at lunch, nobody answers. Customers hang up and call someone else.",
        solution: "AI catches every call. Takes messages, answers FAQs, and transfers urgent ones to your mobile."
      },
      {
        id: "volume",
        icon: Zap,
        title: "The Volume Spike",
        examples: "Seasonal or campaign-driven",
        painTitle: "We run an ad and get 50 calls in an hour. We can only answer 5. The other 45 are wasted ad spend.",
        painText: "We run an ad and get 50 calls in an hour. We can only answer 5. The other 45 are wasted ad spend.",
        solution: "AI handles unlimited concurrent calls. Every lead gets answered, no matter how many call at once."
      }
    ]
  },
  chatBooking: {
    id: 'chatBooking',
    label: "SERVICE 02 / CHAT & BOOKING",
    hook: "I need website chat automated.",
    summary: "Who this is for: Websites with visitor questions",
    sprint: "",
    specs: ['Website chatbot', 'FAQ automation', 'Calendar integration', 'Lead capture'],
    personas: [
      {
        id: "faq",
        icon: BrainCircuit,
        title: "The FAQ Repeater",
        examples: "Any business answering the same questions",
        painTitle: "I get 20 emails a day asking the same 5 questions. I've answered them 1,000 times.",
        painText: "I get 20 emails a day asking the same 5 questions. I've answered them 1,000 times.",
        solution: "Chatbot on your website answers FAQs instantly. You only handle the real questions."
      },
      {
        id: "booking",
        icon: CheckCircle,
        title: "The Booking Business",
        examples: "Appointments, consultations, demos",
        painTitle: "People want to book but they have to email me, then I reply, then we go back and forth on times.",
        painText: "People want to book but they have to email me, then I reply, then we go back and forth on times.",
        solution: "Chatbot checks your calendar and books the appointment right there. No email tennis."
      },
      {
        id: "nightowl",
        icon: Terminal,
        title: "The Night Owl Customer",
        examples: "Customers in different time zones",
        painTitle: "Half my customers are overseas. They enquire while I'm asleep and expect instant replies.",
        painText: "Half my customers are overseas. They enquire while I'm asleep and expect instant replies.",
        solution: "Chatbot engages them immediately, answers questions, captures details. You reply when you wake up with warm leads."
      }
    ]
  },
  knowledgeBots: {
    id: 'knowledgeBots',
    label: "SERVICE 03 / KNOWLEDGE BOTS",
    hook: "I need internal knowledge automated.",
    summary: "Who this is for: Teams with internal information problems",
    sprint: "",
    specs: ['Custom training on your docs', 'Internal chat interface', 'Source citations', 'Regular updates'],
    personas: [
      {
        id: "newemployee",
        icon: Phone,
        title: "The New Employee",
        examples: "Growing teams with lots of questions",
        painTitle: "Every new hire asks the same questions for their first month. It distracts the experienced staff.",
        painText: "Every new hire asks the same questions for their first month. It distracts the experienced staff.",
        solution: "Internal bot trained on your processes. New hires ask the bot first. Team stays focused."
      },
      {
        id: "policy",
        icon: CheckCircle,
        title: "The Policy Question",
        examples: "Compliance-heavy industries",
        painTitle: "Staff constantly ask HR about policies. HR spends half their day answering the same things.",
        painText: "Staff constantly ask HR about policies. HR spends half their day answering the same things.",
        solution: "Bot trained on your employee handbook. Staff get instant answers. HR handles the edge cases."
      },
      {
        id: "ops",
        icon: Zap,
        title: "The Ops Manual",
        examples: "Businesses with complex processes",
        painTitle: "We have a 200-page ops manual. Nobody reads it. They just ask Gary.",
        painText: "We have a 200-page ops manual. Nobody reads it. They just ask Gary.",
        solution: "Bot trained on your manual. Staff search in plain English, get the answer immediately."
      }
    ]
  },
  customAgents: {
    id: 'customAgents',
    label: "SERVICE 04 / CUSTOM AI AGENTS",
    hook: "I need specific AI solutions.",
    summary: "Who this is for: Businesses with specific AI needs",
    sprint: "",
    specs: ['Custom AI development', 'Data connections', 'Workflow integration', 'Ongoing training'],
    personas: [
      {
        id: "data",
        icon: Lock,
        title: "The Data Analyst",
        examples: "Data-heavy decisions",
        painTitle: "I have all this data but extracting insights takes hours. By the time I have the answer, the moment's passed.",
        painText: "I have all this data but extracting insights takes hours. By the time I have the answer, the moment's passed.",
        solution: "AI agent that queries your data and gives you plain-English answers. Ask questions, get insights."
      },
      {
        id: "outreach",
        icon: ShieldCheck,
        title: "The Outreach Machine",
        examples: "Sales teams doing cold outreach",
        painTitle: "We need to personalise 100 emails a day. It's either generic blasts or hours of research.",
        painText: "We need to personalise 100 emails a day. It's either generic blasts or hours of research.",
        solution: "AI researches each prospect and drafts personalised messages. You review and send."
      },
      {
        id: "report",
        icon: BrainCircuit,
        title: "The Report Writer",
        examples: "Regular reporting requirements",
        painTitle: "I write the same weekly report every Friday. It takes 2 hours to pull data and format it.",
        painText: "I write the same weekly report every Friday. It takes 2 hours to pull data and format it.",
        solution: "AI pulls the data, writes the report in your style, and sends it to you for approval."
      }
    ]
  }
};

const Pillar4: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('phoneAnswering');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('phoneAnswering');
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
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
      
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
        }
    }, 300); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          
          {/* NAVIGATION */}
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

               {/* STANDARD H1 */}
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

        {/* SCROLL LINE */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-[#1a1a1a]/10 overflow-hidden z-0">
          <motion.div 
            style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }}
            className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" 
          />
        </div>
      </section>

      {/* --- CONFIGURATOR --- */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-32 max-w-[1400px] mx-auto border-t border-[#1a1a1a]/10">

        {/* HEADER */}
        <div className="mb-16">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           {/* STANDARD H2 */}
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6">
             Select your <span className="italic text-[#C5A059] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               AI isn't just about writing emails. It's about cloning your best employees. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the role you need to fill</strong> to see how we engineer the digital replacement.
             </p>
           </div>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:block border border-black/10 bg-gradient-to-br from-white to-[#FFF9F0] shadow-sm mb-32 rounded-sm overflow-hidden">
           {/* TABS (GOLD HIGHLIGHTS) */}
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
           
           {/* CONTENT */}
           <div className="flex min-h-[600px]">
              {/* LEFT */}
              <div className="w-1/3 border-r border-black/10 bg-[#FAFAFA] p-8 flex flex-col">
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

              {/* RIGHT */}
              <div className="w-2/3 p-12 relative flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div 
                       key={`${activeTier}-${activePersonaIndex}`}
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                       className="flex-grow flex flex-col"
                    >
                       <div className="mb-10">
                          <span className="text-[#C5A059] font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block">The Pain</span>
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#C5A059] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-4 font-bold">The Solution</span>
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

        {/* --- MOBILE VIEW: VERTICAL ACCORDION (GOLD THEME) --- */}
        <div className="md:hidden space-y-4 mb-32">
          {Object.entries(TIERS).map(([key, tier]) => {
            const isTierExpanded = expandedTier === key;
            return (
              <div 
                key={key} 
                id={`tier-mobile-${key}`} 
                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isTierExpanded ? 'border-[#1a1a1a] bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
                
                {/* LEVEL 1: HEADER */}
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
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-[#C5A059]' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    <span className={`font-serif text-lg leading-tight ${isTierExpanded ? 'text-white' : 'text-black'}`}>"{tier.hook}"</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTierExpanded ? 'rotate-180 text-[#C5A059]' : 'text-black/30'}`} />
                </button>

                {/* LEVEL 1 CONTENT */}
                <AnimatePresence>
                  {isTierExpanded && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden bg-[#FAFAFA]"
                    >
                      <div className="p-4 space-y-2">
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
                                id={`persona-mobile-${p.id}`} 
                                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isPersonaExpanded ? 'border-[#C5A059] bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
                               
                               {/* LEVEL 2: HEADER */}
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
                                  <div className={`p-2 rounded-full ${isPersonaExpanded ? 'bg-[#C5A059] text-[#1a1a1a]' : 'bg-black/5 text-black/40'}`}>
                                     <p.icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-grow">
                                     <h4 className={`font-serif text-lg leading-tight ${isPersonaExpanded ? 'text-[#C5A059]' : 'text-black/70'}`}>{p.title}</h4>
                                     <span className="text-[10px] text-black/40 block mt-1 line-clamp-1">{p.examples}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${isPersonaExpanded ? 'rotate-180 text-[#C5A059]' : 'text-black/20'}`} />
                               </button>

                               {/* LEVEL 2 CONTENT */}
                               <AnimatePresence>
                                 {isPersonaExpanded && (
                                   <motion.div
                                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                     className="border-t border-[#C5A059]/20 bg-white"
                                   >
                                      <div className="p-6">
                                         <div className="mb-6">
                                            <span className="text-[#C5A059] font-mono text-[9px] uppercase tracking-widest font-bold mb-2 block">The Pain</span>
                                            <h5 className="font-serif text-2xl mb-2 text-[#1a1a1a]">{p.painTitle}</h5>
                                            <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed italic border-l-2 border-[#C5A059] pl-4">"{p.painText}"</p>
                                         </div>

                                         <div className="bg-[#1a1a1a] p-6 text-white rounded-sm mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/20 rounded-full blur-2xl" />
                                            <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block mb-3 font-bold relative z-10">The Solution</span>
                                            <p className="font-sans text-base leading-relaxed mb-6 relative z-10">{p.solution}</p>
                                            
                                            {/* VISUAL ON MOBILE */}
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

                                         {/* Specs List */}
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