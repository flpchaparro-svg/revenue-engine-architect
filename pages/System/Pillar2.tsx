import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  ArrowLeft, CheckCircle,
  Magnet, Filter, MessageSquare, 
  Users, UserPlus, FileText, 
  RefreshCw, Calendar, Phone, 
  ChevronDown, ChevronRight, HelpCircle
} from 'lucide-react';
import PillarVisual_Magnet from '../../components/PillarVisual_Magnet';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (RED THEME: #E21E3F) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'capture' && (
        // ANIMATION: "The Funnel"
        <div className="relative flex flex-col items-center">
            {/* Particles falling in */}
            {[...Array(6)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#E21E3F] rounded-full"
                    initial={{ y: -40, x: (Math.random() - 0.5) * 40, opacity: 0 }}
                    animate={{ y: [ -40, 0, 40 ], x: [ (Math.random() - 0.5) * 40, 0, 0 ], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}
            {/* Funnel Shape */}
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#E21E3F]/20 mb-1" />
            <div className="w-1.5 h-10 bg-[#E21E3F]/40 rounded-sm" />
        </div>
      )}

      {tierKey === 'nurture' && (
        // ANIMATION: "The Tag"
        <div className="relative flex items-center gap-2">
             <div className="w-10 h-10 border border-[#E21E3F] rounded-full flex items-center justify-center bg-[#1a1a1a]">
                <Users className="w-4 h-4 text-[#E21E3F]" />
             </div>
             {/* Tag appearing */}
             <motion.div 
               animate={{ x: [ -10, 0 ], opacity: [0, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
               className="px-2 py-1 bg-[#E21E3F] text-[8px] font-mono text-[#1a1a1a] font-bold rounded-sm"
             >
                TAG: VIP
             </motion.div>
        </div>
      )}

      {tierKey === 'pipeline' && (
        // ANIMATION: "The Stages"
        <div className="flex gap-2 items-center">
            <div className="w-8 h-12 border border-[#E21E3F]/20 rounded-sm" />
            <div className="w-8 h-12 border border-[#E21E3F]/40 rounded-sm flex items-center justify-center">
                <motion.div 
                    className="w-4 h-4 bg-[#E21E3F] rounded-sm"
                    animate={{ x: [ -40, 0, 40 ], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="w-8 h-12 border border-[#E21E3F] rounded-sm shadow-[0_0_10px_#E21E3F]" />
        </div>
      )}

      {tierKey === 'revops' && (
        // ANIMATION: "The Sync"
        <div className="relative w-16 h-16">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-[#E21E3F]/30 rounded-full border-t-[#E21E3F]"
            />
            <div className="absolute inset-2 border border-[#E21E3F]/10 rounded-full flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-[#E21E3F]" />
            </div>
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  capture: {
    id: 'capture',
    label: "TIER 01 / CAPTURE",
    hook: "Stop losing leads.",
    summary: "Choose this if you have a website but no idea where your leads go. We replace generic contact forms with a database that tracks every person.",
    sprint: "5-DAY SPRINT",
    specs: ['HubSpot / Pipedrive Setup', 'Lead Source Tracking', 'Auto-Reply Email', 'Admin Notification'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Inbox Manager",
        examples: "Solo Consultants, Small Agencies",
        painTitle: "The Gmail Black Hole",
        painText: "You run your business from an inbox. You forget to reply to a $5k lead because it got buried under newsletters. You have no list, no history, just email chaos.",
        solution: "I install a CRM. Every lead from your site goes into a structured database, not your inbox. You see exactly who they are and if you've replied. No more lost money."
      },
      {
        id: "blind",
        icon: Filter,
        title: "The Blind Advertiser",
        examples: "Local Services, Tradies",
        painTitle: "Unknown ROI",
        painText: "You spend $1,000 on ads but don't know if the phone rang because of the ad or a referral. You're guessing with your wallet.",
        solution: "I build Source Tracking. The CRM tells you: 'John Smith came from Google Ads'. Now you know exactly which marketing channel pays your bills."
      },
      {
        id: "slow",
        icon: Magnet,
        title: "The Slow Responder",
        examples: "Real Estate, Finance Brokers",
        painTitle: "The Speed to Lead Fail",
        painText: "A lead emails you on Saturday. You reply on Monday. They already hired someone else. Speed kills competition, and you're too slow.",
        solution: "I build Instant Acknowledgment. They get a professional SMS and Email 10 seconds after submitting. You look 'always on' even when you're off."
      }
    ]
  },
  nurture: {
    id: 'nurture',
    label: "TIER 02 / NURTURE",
    hook: "Warm them up.",
    summary: "Choose this if you have leads who aren't ready to buy yet. We build automated email sequences that educate them until they are ready to pay.",
    sprint: "10-DAY SPRINT",
    specs: ['5-Email Nurture Sequence', 'Audience Segmentation', 'Newsletter Architecture', 'Lead Scoring'],
    personas: [
      {
        id: "educator",
        icon: Users,
        title: "The Expert",
        examples: "Coaches, Course Creators",
        painTitle: "The Cold Pitch",
        painText: "You try to sell on the first call, but they don't trust you yet. You waste hours explaining your methodology to cold leads who ghost you.",
        solution: "I build a 'Value Sequence'. The system sends them your best advice for 2 weeks before you ever ask for a sale. When they finally book, they already trust you."
      },
      {
        id: "lister",
        icon: UserPlus,
        title: "The List Builder",
        examples: "E-commerce, Authors",
        painTitle: "The Dead List",
        painText: "You have 5,000 emails in Mailchimp but you never email them because you don't know what to say. Your biggest asset is gathering dust.",
        solution: "I build Automated Re-Engagement. The system identifies who hasn't opened an email in 90 days and wakes them up with a specific offer. Dead leads become cash."
      },
      {
        id: "segment",
        icon: FileText,
        title: "The Generalist",
        examples: "Multi-Service Agencies",
        painTitle: "The Wrong Message",
        painText: "You send a 'Website Design' offer to a client who only wants 'SEO'. They unsubscribe because you're irrelevant. You're blasting, not targeting.",
        solution: "I build Behavioural Segmentation. If they click on 'SEO', they get the SEO sequence. Relevance protects your open rates."
      }
    ]
  },
  pipeline: {
    id: 'pipeline',
    label: "TIER 03 / PIPELINE",
    hook: "Manage the deal.",
    summary: "Choose this if you have a sales team (or just yourself) managing high-ticket deals. We visualize your revenue and automate the follow-up tasks.",
    sprint: "14-DAY SPRINT",
    specs: ['Visual Deal Board', 'Task Automation', 'Contract Integration', 'Sales Reporting'],
    personas: [
      {
        id: "closer",
        icon: Calendar,
        title: "The Busy Closer",
        examples: "Solar Sales, Enterprise SaaS",
        painTitle: "The Follow-Up Fail",
        painText: "You have 20 active deals. You promised to call Mike back on Tuesday, but you forgot. Mike signs with a competitor. Disorganization cost you $10k.",
        solution: "I build Automated Task Queues. The CRM reminds you: 'Call Mike'. If you don't call, it nags you. No deal slips through the cracks."
      },
      {
        id: "manager",
        icon: Phone,
        title: "The Sales Manager",
        examples: "Teams of 3+ Reps",
        painTitle: "The Black Box",
        painText: "You ask your rep 'How's the pipeline?' and they say 'Good'. You have no data. You can't forecast revenue on 'Good'.",
        solution: "I build Visual Pipelines. You see every deal, its value, and its stage on one screen. 'Good' becomes '$450k weighted pipeline closing next month'."
      },
      {
        id: "admin",
        icon: FileText,
        title: "The Paperwork Hater",
        examples: "Construction, Events",
        painTitle: "Contract Hell",
        painText: "You spend 45 minutes copy-pasting details into a Word doc contract. It's boring, slow, and prone to errors.",
        solution: "I build One-Click Contracting. Move a deal to 'Won', and the system generates the PDF, pre-fills the data, and sends it for e-signature. 45 minutes becomes 4 seconds."
      }
    ]
  },
  revops: {
    id: 'revops',
    label: "TIER 04 / REVOPS",
    hook: "Align the business.",
    summary: "Choose this if your Marketing, Sales, and Support teams are fighting. We connect your systems so data flows seamlessly from 'Click' to 'Cash'.",
    sprint: "21-DAY SPRINT",
    specs: ['Cross-Department Sync', 'Customer Journey Mapping', 'Attribution Modelling', 'Data Hygiene'],
    personas: [
      {
        id: "silo",
        icon: RefreshCw,
        title: "The Siloed Director",
        examples: "Mid-Market Companies ($5M+)",
        painTitle: "The Handover Drop",
        painText: "Sales closes the deal, but forgets to tell Onboarding. The new client sits in silence for 3 days and gets angry. Your internal disconnect hurts the customer.",
        solution: "I build Department Handshakes. When a deal closes, a project is auto-created in Asana for the delivery team. Sales stops emailing Operations. The system does the talking."
      },
      {
        id: "leak",
        icon: Filter,
        title: "The Leak Hunter",
        examples: "SaaS, Membership Sites",
        painTitle: "The Retention Leak",
        painText: "Marketing brings in 100 leads, Sales closes 20, but Churn loses 10. You're filling a bucket with a hole in it.",
        solution: "I build Lifecycle Feedback Loops. When a customer churns, the reason is tagged and fed back to Marketing. You stop paying to acquire bad-fit customers."
      },
      {
        id: "data",
        icon: Users,
        title: "The Data Purist",
        examples: "Financial Services, Insurance",
        painTitle: "Dirty Data",
        painText: "You have 'John Smith' in Xero, 'J. Smith' in HubSpot, and 'John' in your support desk. You can't get a single view of the customer.",
        solution: "I build Data Normalization. We treat the CRM as the 'Single Source of Truth', pushing clean data to finance and support. One customer, one record."
      }
    ]
  }
};

const Pillar2: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('capture');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('capture');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar2');
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
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          
          {/* NAV BACK */}
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
               <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                   THE SYSTEM / CAPTURE CORE
                 </span>
               </div>

               {/* STANDARD H1: 5xl -> 6xl -> 7xl -> 8xl */}
               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 CRM & <span className="italic font-serif text-[#E21E3F] drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">Sales Logic.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#E21E3F] pl-6 mb-8">
                 Most businesses lose money not because of bad ads, but because of a leaky bucket. I build the CRM infrastructure that catches, tags, and nurtures every single lead.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[220px] md:h-[280px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Magnet />
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

      {/* --- ENGINE CONFIGURATOR --- */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-32 max-w-[1400px] mx-auto border-t border-[#1a1a1a]/10">

        {/* HEADER */}
        <div className="mb-16">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           {/* STANDARD H2: 4xl -> 5xl -> 7xl */}
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6">
             Select your <span className="italic text-[#E21E3F] font-serif">Situation.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               A CRM isn't just an address book; it's your revenue engine. I've mapped out the 4 stages of sales maturity. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the problem you have</strong> to see the solution.
             </p>
           </div>
        </div>

        {/* --- DESKTOP VIEW: TABBED DASHBOARD --- */}
        <div className="hidden md:block border border-black/10 bg-gradient-to-br from-white to-[#FFF9F0] shadow-sm mb-32 rounded-sm overflow-hidden">
           {/* TABS (RED HIGHLIGHTS) */}
           <div className="grid grid-cols-4 border-b border-black/10 bg-[#FAFAFA]">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTier(key as keyof typeof TIERS)}
                  className={`py-6 px-4 text-center transition-all duration-300 relative group overflow-hidden flex flex-col justify-center min-h-[100px] ${
                    activeTier === key ? 'bg-white' : 'hover:bg-white/50 text-black/40'
                  }`}
                >
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
           
           {/* CONTENT: SPLIT VIEW */}
           <div className="flex min-h-[600px]">
              {/* LEFT: Persona List */}
              <div className="w-1/3 border-r border-black/10 bg-[#FAFAFA] p-8 flex flex-col">
                 
                 {/* INTRO SUMMARY */}
                 <div className="mb-8 p-4 bg-white border border-black/5 rounded-sm">
                    <div className="flex gap-2 items-center mb-2">
                       <HelpCircle className="w-4 h-4 text-[#E21E3F]" />
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

                 {/* SPECS LIST */}
                 <div className="mt-8 pt-8 border-t border-black/5">
                    <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-4 block">Included Specs</span>
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
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#E21E3F] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E21E3F]/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                <span className="font-mono text-[9px] text-[#E21E3F] uppercase tracking-widest block mb-4 font-bold">The Fix</span>
                                <p className="font-sans text-lg leading-relaxed mb-8">{currentPersona.solution}</p>
                                
                                <div className="w-fit">
                                  <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                                    [ BOOK A CALL ]
                                  </CTAButton>
                                </div>
                             </div>
                             {/* VISUAL ON DESKTOP */}
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

        {/* --- MOBILE VIEW: VERTICAL ACCORDION (RED THEME) --- */}
        <div className="md:hidden space-y-4 mb-32">
          {Object.entries(TIERS).map(([key, tier]) => {
            const isTierExpanded = expandedTier === key;
            return (
              <div 
                key={key} 
                id={`tier-mobile-${key}`} 
                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isTierExpanded ? 'border-[#1a1a1a] bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
                
                {/* LEVEL 1: TIER HEADER */}
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
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-[#E21E3F]' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    <span className={`font-serif text-lg leading-tight ${isTierExpanded ? 'text-white' : 'text-black'}`}>"{tier.hook}"</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTierExpanded ? 'rotate-180 text-[#E21E3F]' : 'text-black/30'}`} />
                </button>

                {/* LEVEL 1 CONTENT */}
                <AnimatePresence>
                  {isTierExpanded && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden bg-[#FAFAFA]"
                    >
                      <div className="p-4 space-y-2">
                         {/* INTRO */}
                         <div className="mb-6 p-4 bg-white border border-black/5 rounded-sm">
                            <p className="font-sans text-sm text-black/70 leading-relaxed">
                               <strong className="text-[#E21E3F] block mb-1 font-bold uppercase text-[9px] tracking-widest">Is this you?</strong>
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
                                className={`border rounded-sm overflow-hidden transition-all duration-300 ${isPersonaExpanded ? 'border-[#E21E3F] bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
                               
                               {/* LEVEL 2: PERSONA HEADER */}
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

                               {/* LEVEL 2 CONTENT */}
                               <AnimatePresence>
                                 {isPersonaExpanded && (
                                   <motion.div
                                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                     className="border-t border-[#E21E3F]/20 bg-white"
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
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E21E3F]/20 rounded-full blur-2xl" />
                                            <span className="font-mono text-[9px] text-[#E21E3F] uppercase tracking-widest block mb-3 font-bold relative z-10">The Fix</span>
                                            <p className="font-sans text-base leading-relaxed mb-6 relative z-10">{p.solution}</p>
                                            
                                            {/* VISUAL ON MOBILE (CENTERED) */}
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

                                         {/* Specs List Mobile */}
                                         <div className="mt-8 pt-6 border-t border-black/10">
                                            <span className="font-mono text-[9px] text-black/30 uppercase tracking-widest font-bold mb-3 block">Included Specs</span>
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

      {/* FAQ SECTION: KEPT GOLD (#C5A059) AS REQUESTED */}
      <FAQSection
        faqs={pillarFAQs}
        accentColor="#C5A059"
        title="Questions about CRM?"
        subtitle="Common questions about sales pipelines and automation."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar2;