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
  ArrowLeft, Zap, Bot, Mail, Clapperboard, 
  Settings, CheckCircle, ChevronDown, ChevronRight, Terminal, HelpCircle,
  FileText, Mic, Users, Repeat
} from 'lucide-react';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import PillarVisual_Turbine from '../../components/PillarVisual_Turbine';
import CTAButton from '../../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../../components/BackButton'; // STANDARDIZED BACK LINK

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- VISUALIZATIONS (Pillar 3 Specific - Gold/Transparent) ---
const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'bridge' && (
        // ANIMATION: "The Compact Bridge" (Hard-Wired Connection)
        <div className="relative flex items-center justify-center gap-1">
            {/* System A */}
            <div className="w-10 h-10 border border-[#C5A059]/40 rounded-sm flex items-center justify-center bg-[#1a1a1a] z-10">
                <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
            </div>
            
            {/* The Bridge */}
            <div className="relative w-16 h-[1px] bg-[#C5A059]/20 overflow-hidden">
                <motion.div 
                   animate={{ x: [-64, 64] }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent h-full"
                />
            </div>

            {/* System B */}
            <div className="w-10 h-10 border border-[#C5A059]/40 rounded-sm flex items-center justify-center bg-[#1a1a1a] z-10">
                <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
            </div>
        </div>
      )}

      {tierKey === 'email' && (
        // ANIMATION: "Stimulus Response" (Triggered Action)
        <div className="relative flex items-center justify-center w-24 h-24">
             {/* The Trigger (Incoming) */}
             <motion.div 
               animate={{ y: [30, 0], opacity: [0, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
               className="absolute w-[2px] h-6 bg-[#C5A059] bottom-1/2 rounded-full"
             />
             
             {/* The Reaction (Outgoing Ring) */}
             <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 2, opacity: [1, 0] }}
               transition={{ duration: 1.5, delay: 1.4, repeat: Infinity, ease: "easeOut" }}
               className="absolute w-8 h-8 border border-[#C5A059] rounded-full"
             />
             
             {/* Core */}
             <div className="w-3 h-3 bg-[#1a1a1a] border border-[#C5A059] rounded-full z-10 shadow-[0_0_10px_#C5A059]" />
        </div>
      )}

      {tierKey === 'content' && (
        // ANIMATION: "The Prism" (Multiplication)
        <div className="relative flex items-center">
            {/* Input Beam */}
            <motion.div 
               animate={{ x: [20, 0], opacity: [0, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-8 h-[1px] bg-[#C5A059] mr-1"
            />
            
            {/* The Prism */}
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-[#C5A059]/20 backdrop-blur-sm relative z-10" />
            
            {/* Output Beams (Fan) */}
            <div className="relative ml-1">
                {[ -20, 0, 20 ].map((deg, i) => (
                    <motion.div 
                       key={i}
                       animate={{ width: [0, 24], opacity: [1, 0] }}
                       transition={{ duration: 2, delay: 1, repeat: Infinity }}
                       className="h-[1px] bg-[#C5A059] absolute left-0 top-0 origin-left"
                       style={{ rotate: deg }}
                    />
                ))}
            </div>
        </div>
      )}

      {tierKey === 'autopilot' && (
        // ANIMATION: "Self-Assembly" (Automated Fulfillment)
        <div className="flex flex-col-reverse gap-1 h-16 w-12 items-center justify-end pb-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.5, 
                    repeat: Infinity, 
                    repeatDelay: 2 
                  }}
                  className="w-8 h-2 border border-[#C5A059] bg-[#C5A059]/10 rounded-sm"
                />
            ))}
            <div className="w-12 h-[1px] bg-[#C5A059]/30 mt-1" />
        </div>
      )}
    </div>
  );
};

// --- DATA: DECISION TREE ---
const TIERS = {
  bridge: {
    id: 'bridge',
    label: "COGNITIVE BRIDGE",
    hook: "I need to stop data entry.",
    summary: "Choose this if you have expensive staff (Lawyers, Brokers, Consultants) wasting billable hours copy-pasting data from emails into systems.",
    sprint: "7-DAY SPRINT",
    specs: ['Messy-Text-to-JSON Logic', 'PDF Parsing', 'Inbox Scraping', 'Database Injection'],
    personas: [
      {
        id: "paperwork",
        icon: FileText,
        title: "The Paperwork Prisoner",
        examples: "Family Law, Mortgage Broking, Financial Planning",
        painTitle: "The Narrative Inbox",
        painText: "Clients send you 500-word emotional emails. You have to read the whole thing just to extract a 'Date of Birth' or 'Asset Value.' It kills your focus and costs you $300/hr in lost time.",
        solution: "I build an AI Bridge. It reads the emotional 'noise,' extracts the specific facts (Signal), and pushes them directly into your Case Management system. You only see the clean data."
      },
      {
        id: "recruiter",
        icon: Users,
        title: "The Resume Drowning",
        examples: "Recruitment Agencies, HR Departments",
        painTitle: "The Parsing Hell",
        painText: "You get 100 PDFs a day. Every resume is formatted differently. You spend 3 hours a day manually typing 'Skills' and 'Years of Experience' into your database.",
        solution: "We automate the intake. The system reads the PDF, standardises the format, and ranks the candidate against your criteria before you even open the file."
      },
      {
        id: "invoices",
        icon: Bot,
        title: "The Accounts Payable Victim",
        examples: "Construction, Logistics, Hospitality",
        painTitle: "Invoice Chaos",
        painText: "Suppliers email invoices as PDFs, JPEGs, and inline text. Your bookkeeper spends 2 days a week just entering bills into Xero.",
        solution: "We deploy an Extraction Agent. It monitors the 'Accounts' inbox, reads the bill regardless of format, and creates the draft bill in Xero for approval."
      }
    ]
  },
  email: {
    id: 'email',
    label: "BEHAVIORAL EMAIL",
    hook: "I need to convert automatically.",
    summary: "Choose this if you have traffic or leads but are missing the 'Perfect Moment' to sell because you can't watch every user 24/7.",
    sprint: "7-DAY SPRINT",
    specs: ['Intent Signal Tracking', 'Segment.com Setup', 'Dynamic Email Content', 'CRM Integration'],
    personas: [
      {
        id: "blind",
        icon: Zap,
        title: "The Blind Signal Hunter",
        examples: "High-Ticket Consultants, Wealth Managers",
        painTitle: "The Opportunity Gap",
        painText: "A past prospect visited your 'Pricing' page three times this morning, but you didn't know. You missed the 'Hot Window' to call them.",
        solution: "I build a 'Hot List' Alert. When a prospect shows intent (visits key pages), you get a Slack notification instantly, or the system sends a perfectly timed email: 'Thinking of starting?'"
      },
      {
        id: "abandon",
        icon: Mail,
        title: "The Abandonment Victim",
        examples: "Course Creators, Online Services",
        painTitle: "The Tire Kicker",
        painText: "You see 100 people start your application form, but only 10 finish it. You are losing 90% of your potential revenue to distraction.",
        solution: "We install 'Save Logic'. If they type their email but don't hit submit, we capture it. 15 minutes later, they get a personal email: 'Did your wifi drop out? Here is a link to finish.'"
      },
      {
        id: "nurture",
        icon: Repeat,
        title: "The Manual Nurturer",
        examples: "Real Estate, B2B Sales",
        painTitle: "The Follow-Up Fail",
        painText: "You promised to send a case study, but you got busy. The lead went cold. You rely on your memory to nurture leads, which is a broken system.",
        solution: "We build Behavioral Nurture. The system watches what they click. If they click 'Commercial,' they get the Commercial Case Study sequence. Relevant, automatic, and reliable."
      }
    ]
  },
  content: {
    id: 'content',
    label: "CONTENT VELOCITY",
    hook: "I need to be everywhere.",
    summary: "Choose this if you are an Expert or Thought Leader who has the knowledge but lacks the time to spend 10 hours a week on social media.",
    sprint: "5-DAY SPRINT",
    specs: ['Video Slicing (Opus/Munch)', 'Transcript-to-Blog Logic', 'Auto-Scheduling', 'Asset Management'],
    personas: [
      {
        id: "expert",
        icon: Clapperboard,
        title: "The Time-Poor Expert",
        examples: "Surgeons, Architects, Boutique Founders",
        painTitle: "The Creator Conflict",
        painText: "You know you need to post to build authority, but switching from 'CEO Mode' to 'Canva Creator Mode' ruins your day. You have zero time for editing.",
        solution: "I build a Content Supply Chain. You record a 5-minute voice note on your drive home. My system transcribes it, writes the LinkedIn post, and creates the blog. You speak; the machine publishes."
      },
      {
        id: "podcaster",
        icon: Mic,
        title: "The Omni-Presence Seeker",
        examples: "Podcast Hosts, Speakers",
        painTitle: "Legacy Waste",
        painText: "You have hours of video content sitting on a hard drive doing nothing. You are 'Rich' in content but 'Poor' in distribution.",
        solution: "We build a Slicing Engine. We connect your Google Drive to AI slicers. Every time you upload an episode, it automatically generates 10 viral shorts and schedules them."
      },
      {
        id: "writer",
        icon: FileText,
        title: "The Blank Page Victim",
        examples: "Newsletter Writers, LinkedIn Creators",
        painTitle: "Writer's Block",
        painText: "Staring at a blank screen waiting for inspiration. It takes you 4 hours to write one good article.",
        solution: "We build an Idea Factory. The system scrapes trending news in your niche every morning and drafts 3 unique angles for you to review. You start with a draft, never a blank page."
      }
    ]
  },
  autopilot: {
    id: 'autopilot',
    label: "FULFILLMENT AUTOPILOT",
    hook: "I need to onboard instantly.",
    summary: "Choose this if you run an Agency or Service business where the gap between 'Contract Signed' and 'Project Started' is messy and slow.",
    sprint: "7-DAY SPRINT",
    specs: ['Stripe-to-Jira Automation', 'Slack Channel Creation', 'Welcome Sequence', 'Contract Logic'],
    personas: [
      {
        id: "agency",
        icon: Settings,
        title: "The Bottleneck Agency",
        examples: "Marketing, Design, Dev Shops",
        painTitle: "The Onboarding Lag",
        painText: "You close a deal on Friday, but the client doesn't get their folder or Slack invite until Tuesday because you are busy. They feel ignored immediately after paying.",
        solution: "I build Zero-Lag Onboarding. The second the contract is signed, the project board is created, the Slack channel opens, and the Welcome Kit is sent. You look professional while you sleep."
      },
      {
        id: "service",
        icon: CheckCircle,
        title: "The High-Volume Service",
        examples: "Accounting, Compliance, Cleaning",
        painTitle: "Setup Fatigue",
        painText: "Setting up a new client takes 2 hours of admin (Folders, logins, emails). Your team dreads new sales because it means more paperwork.",
        solution: "We automate the Setup. One form fill triggers the entire ecosystem setup. Folders, permissions, and accounts are provisioned in 30 seconds, not 2 hours."
      },
      {
        id: "membership",
        icon: Users,
        title: "The Community Manager",
        examples: "Masterminds, Coaching Groups",
        painTitle: "Access Friction",
        painText: "A new member joins but can't access the course or the community circle because you have to manually approve them.",
        solution: "We build Instant Access Logic. Payment triggers an invite. If payment fails, access is revoked. The gatekeeping is fully automated."
      }
    ]
  }
};

const Pillar3: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('bridge');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Mobile States
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>('bridge');
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const pillarFAQs = getPillarFAQs('pillar3');
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
                   THE SYSTEM / THE MUSCLE
                 </span>
               </div>

               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
                 Automation <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Architecture.</span>
               </h1>

               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 Code is the cheapest employee you will ever hire. We use automation to move data, generate documents, and scale your output without increasing your headcount.
               </p>
            </div>
            
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Turbine />
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
               Every business has a different bottleneck. I've mapped out the 4 most common "Manual Labour" traps. 
               <strong className="text-[#1a1a1a] font-medium"> Tap the one that matches your pain</strong> to see how we automate it away.
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
        title="Questions about CRM?"
        subtitle="Common questions about data, pipelines, and cleaning up the mess."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar3;
