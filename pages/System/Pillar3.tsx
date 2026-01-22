import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  Zap, GitMerge, Workflow, Cpu, 
  Link, Split, RefreshCw, Layers, 
  CheckCircle, ChevronDown, ChevronRight, HelpCircle,
  FileJson, Mail, MessageSquare
} from 'lucide-react';
import PillarVisual_Helix from '../../components/PillarVisual_Helix';
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
      
      {tierKey === 'linear' && (
        // ANIMATION: Linear Connection (A -> B)
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-[#E21E3F]/40 rounded-sm bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#E21E3F] rounded-full" />
            </div>
            <motion.div 
                className="w-16 h-[2px] bg-[#E21E3F]/20 relative overflow-hidden"
            >
                <motion.div 
                    className="absolute top-0 left-0 w-8 h-full bg-[#E21E3F]"
                    animate={{ x: [-32, 64] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
            <div className="w-8 h-8 border border-[#E21E3F] rounded-sm bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_15px_rgba(226,30,63,0.3)]">
                <Zap className="w-4 h-4 text-[#E21E3F]" />
            </div>
        </div>
      )}

      {tierKey === 'logic' && (
        // ANIMATION: Branching Logic
        <div className="relative w-32 h-20 flex items-center">
             <div className="absolute left-0 w-2 h-2 bg-[#E21E3F] rounded-full" />
             <svg className="w-full h-full overflow-visible">
                <motion.path 
                    d="M 10 40 L 40 40 L 60 10 L 100 10" 
                    fill="none" 
                    stroke="#E21E3F" 
                    strokeWidth="2"
                    strokeOpacity="0.3"
                />
                <motion.path 
                    d="M 10 40 L 40 40 L 60 70 L 100 70" 
                    fill="none" 
                    stroke="#E21E3F" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
             </svg>
             <div className="absolute right-0 top-2 w-2 h-2 border border-[#E21E3F] rounded-full" />
             <div className="absolute right-0 bottom-2 w-2 h-2 bg-[#E21E3F] rounded-full shadow-[0_0_10px_#E21E3F]" />
        </div>
      )}

      {tierKey === 'engine' && (
        // ANIMATION: The Engine (Rotating Gears/Cycle)
        <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div 
               className="absolute inset-0 border-2 border-[#E21E3F]/20 rounded-full border-t-[#E21E3F]"
               animate={{ rotate: 360 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
               className="absolute inset-4 border-2 border-[#E21E3F]/40 rounded-full border-b-[#E21E3F]"
               animate={{ rotate: -360 }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <Cpu className="w-8 h-8 text-[#E21E3F]" />
        </div>
      )}

      {tierKey === 'autonomous' && (
        // ANIMATION: AI Network
        <div className="relative w-24 h-24 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="w-full h-full bg-[#E21E3F]/10 rounded-full"
                    animate={{ backgroundColor: ["rgba(226,30,63,0.1)", "rgba(226,30,63,0.8)", "rgba(226,30,63,0.1)"] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
            ))}
        </div>
      )}
    </div>
  );
};

// --- DATA ---
const TIERS = {
  linear: {
    id: 'linear',
    label: "TIER 01 / LINEAR",
    hook: "I need things to connect.",
    summary: "Choose this if you are copying and pasting data between emails, spreadsheets, and your phone. You just need System A to talk to System B.",
    sprint: "7-DAY SPRINT",
    specs: ['Zapier / Make.com Setup', 'Form-to-Email Sync', 'Lead Notification SMS', 'Google Sheets Logging'],
    personas: [
      {
        id: "admin",
        icon: Link,
        title: "The Copy-Paster",
        examples: "Solo Founders, Consultants",
        painTitle: "The Data Entry Tax",
        painText: "You spend 5 hours a week moving data from website forms into your phone contacts or a spreadsheet. It's boring, prone to error, and a waste of your talent.",
        solution: "I build Linear Bridges. Someone fills a form? They instantly appear in your contacts, your spreadsheet, and you get a Slack notification. Zero manual entry."
      },
      {
        id: "alert",
        icon: Mail,
        title: "The Late Responder",
        examples: "Trades, Emergency Services",
        painTitle: "Cold Leads",
        painText: "You don't see the email enquiry until 4 hours later. By then, they've hired someone else. Speed is the only advantage you have, and you're losing it.",
        solution: "I build Instant SMS Alerts. When a lead arrives, your phone buzzes with their details immediately. You call them while they are still looking at your website."
      },
      {
        id: "lost",
        icon: FileJson,
        title: "The Paper Shuffler",
        examples: "Event Planners, Admin",
        painTitle: "Lost Details",
        painText: "You rely on your memory or sticky notes to remember client details. Eventually, you forget one, and it costs you the relationship.",
        solution: "I build Digital Logging. Every interaction is automatically saved to a central sheet or database. You never lose a detail again."
      }
    ]
  },
  logic: {
    id: 'logic',
    label: "TIER 02 / LOGIC",
    hook: "I need rules & routing.",
    summary: "Choose this if you have a team or multiple services. You need 'If This, Then That' logic to send the right lead to the right person automatically.",
    sprint: "14-DAY SPRINT",
    specs: ['Advanced Routers', 'Conditional Logic', 'Lead Qualification', 'Round-Robin Assignment'],
    personas: [
      {
        id: "router",
        icon: Split,
        title: "The Traffic Cop",
        examples: "Agencies, Multi-Service Biz",
        painTitle: "Manual Dispatch",
        painText: "You personally read every enquiry to decide if it goes to Sales, Support, or Accounts. You are the bottleneck. If you take a day off, the business freezes.",
        solution: "I build Logic Routers. 'If budget > $10k, alert Senior Sales. If Support, create Ticket.' The system reads the lead and routes it instantly without you."
      },
      {
        id: "filter",
        icon: GitMerge,
        title: "The Qualifier",
        examples: "High-Ticket Sales, Coaches",
        painTitle: "Junk Lead Fatigue",
        painText: "Your calendar is full of people who can't afford you. You waste hours on calls with unqualified prospects because your booking link is open to everyone.",
        solution: "I build Gatekeeper Logic. The system analyzes their answers. If they don't meet criteria, they get a polite email. If they do, they get your calendar."
      },
      {
        id: "fairness",
        icon: RefreshCw,
        title: "The Team Leader",
        examples: "Real Estate, Sales Teams",
        painTitle: "The Fairness Fight",
        painText: "Your sales team complains that 'he got the good lead'. You're manually assigning leads to keep peace, wasting time on politics.",
        solution: "I build Round-Robin Distributors. Leads are assigned strictly in turns, or weighted by performance. Fair, instant, and automatic."
      }
    ]
  },
  engine: {
    id: 'engine',
    label: "TIER 03 / ENGINE",
    hook: "I need fulfillment.",
    summary: "Choose this if you want the system to actually DO the work. Generating contracts, creating invoices, and setting up project folders automatically.",
    sprint: "21-DAY SPRINT",
    specs: ['Document Generation', 'E-Signature Automation', 'Project Onboarding', 'Finance Sync'],
    personas: [
      {
        id: "builder",
        icon: Workflow,
        title: "The Document Creator",
        examples: "Agencies, Contractors",
        painTitle: "Proposal Lag",
        painText: "You finish a call, but it takes you 2 days to write the proposal and contract. The client's excitement fades. You lose the deal to momentum.",
        solution: "I build One-Click Contracts. You click a button in your CRM, and the system generates a PDF proposal, sends it for e-signature, and follows up until signed."
      },
      {
        id: "onboard",
        icon: Layers,
        title: "The Onboarder",
        examples: "SaaS, Service Providers",
        painTitle: "Setup Fatigue",
        painText: "Every new client requires 20 manual steps: create folder, add to Slack, send welcome email, create invoice. It kills the joy of winning a deal.",
        solution: "I build Instant Onboarding. Client signs -> System creates Google Drive folders, Slack channels, Xero invoices, and sends the Welcome Pack. Zero touch."
      },
      {
        id: "finance",
        icon: CheckCircle,
        title: "The Collector",
        examples: "Subscription Biz, Retainers",
        painTitle: "Chasing Money",
        painText: "You spend Fridays chasing unpaid invoices. It's awkward and wastes time. You feel like a debt collector, not a CEO.",
        solution: "I build Automated Accounts Receivable. The system detects an unpaid invoice, sends polite reminders at 3, 7, and 14 days, and alerts you only if they ghost."
      }
    ]
  },
  autonomous: {
    id: 'autonomous',
    label: "TIER 04 / AGENTIC",
    hook: "I need intelligent workers.",
    summary: "Choose this if you want AI Agents to perform complex cognitive tasks—reading emails, drafting responses, and making decisions based on context.",
    sprint: "30+ DAY SPRINT",
    specs: ['OpenAI / Claude API', 'Cognitive Agents', 'Sentiment Analysis', 'Autonomous Support'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Inbox Slave",
        examples: "Founders, Consultants",
        painTitle: "Email Prison",
        painText: "You spend 3 hours a day replying to emails that require 'thinking'. Standard auto-responders won't work because the answers vary.",
        solution: "I build AI Correspondence Agents. The system reads the email, checks your calendar/knowledge base, drafts a perfect reply in your tone, and leaves it as a 'Draft' for you to approve."
      },
      {
        id: "analyst",
        icon: Cpu,
        title: "The Data Reader",
        examples: "Legal, Medical, Research",
        painTitle: "Information Overload",
        painText: "You have to read hundreds of applications or forms to find the 'good ones'. It's tedious, high-focus work that burns you out.",
        solution: "I build Cognitive Classifiers. The AI reads the applications, scores them based on your criteria, extracts key data, and summarizes the top 10% for your review."
      },
      {
        id: "support",
        icon: HelpCircle,
        title: "The 24/7 Rep",
        examples: "E-commerce, Tech Support",
        painTitle: "Support Burnout",
        painText: "Customers ask the same complex questions 24/7. Chatbots are too dumb; humans are too expensive to scale.",
        solution: "I build Autonomous Support Agents. They don't just follow a script; they read your documentation, troubleshoot the user's issue, and solve the ticket without human intervention."
      }
    ]
  }
};

const Pillar3: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('linear');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('linear');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar3');
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
                   THE SYSTEM / AUTOMATION
                 </span>
               </div>

               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Kill the <span className="italic font-serif text-[#E21E3F] drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">Admin.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#E21E3F] pl-6 mb-8">
                 Your business shouldn't depend on you hitting 'copy-paste'. I build the invisible muscle that moves data, creates contracts, and fulfills orders while you sleep.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Helix />
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
             Select your <span className="italic text-[#E21E3F] font-serif">Complexity.</span>
           </h2>
           <div className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl space-y-4">
             <p>
               From simple connections to cognitive AI workers. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the level that matches your operational friction</strong> to see the solution.
             </p>
           </div>
        </div>

        {/* DESKTOP VIEW */}
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
                       <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/60">Is this you?</span>
                    </div>
                    <p className="font-sans text-sm text-black/70 leading-relaxed">
                       {currentTier.summary}
                    </p>
                 </div>

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
                          <span className="text-[#E21E3F] font-mono text-[10px] uppercase tracking-widest font-bold mb-3 block">The Pain</span>
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a1a] leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#E21E3F] pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-[#1a1a1a] p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E21E3F]/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
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

        {/* MOBILE VIEW */}
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
                               <strong className="text-[#E21E3F] block mb-1 font-bold uppercase text-[10px] tracking-widest">Is this you?</strong>
                               {tier.summary}
                            </p>
                         </div>

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
                                            <span className="text-[#E21E3F] font-mono text-[10px] uppercase tracking-widest font-bold mb-2 block">The Pain</span>
                                            <h5 className="font-serif text-2xl mb-2 text-[#1a1a1a]">{p.painTitle}</h5>
                                            <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed italic border-l-2 border-[#E21E3F] pl-4">"{p.painText}"</p>
                                         </div>

                                         <div className="bg-[#1a1a1a] p-6 text-white rounded-sm mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E21E3F]/20 rounded-full blur-2xl" />
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
        accentColor="#E21E3F"
        title="Questions about automation?"
        subtitle="Common questions about workflows and bots."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar3;