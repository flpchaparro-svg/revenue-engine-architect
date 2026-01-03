
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2,
  Brain, MessageSquare, Shield, Phone, // Main Icons
  UserCheck, Stethoscope, Globe, // Tier 1 Icons
  Users, FileCheck, Rocket, // Tier 2 Icons
  Lock, Book, Building, // Tier 3 Icons
  Wrench, Activity, Headphones, // Tier 4 Icons
  Check // UI Icons
} from 'lucide-react';
import PillarVisual_Brain from './PillarVisual_Brain';

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
  concierge: {
    id: 'concierge',
    label: "TIER 01 // CONCIERGE",
    promise: "Customer service that never sleeps and never has a bad day.",
    sprint: "7-DAY SPRINT",
    specs: ['Voiceflow Logic', 'OpenAI GPT-4o', 'Pinecone Knowledge Base', 'Human-Handoff Protocol'],
    personas: [
      {
        id: "tirekicker",
        icon: UserCheck,
        title: "The Tire Kicker Victim",
        examples: "Real Estate, Yacht Brokers",
        painTitle: "The Availability Loop",
        painText: "Spending hours replying to 'Is this still available?' texts from people with no budget. You hate wasting Saturdays on window shoppers.",
        solution: "A 'Gatekeeper AI' that demands proof of funds or specific requirements before it ever books a viewing."
      },
      {
        id: "overwhelmed",
        icon: Stethoscope,
        title: "The Practice Manager",
        examples: "Medical Clinics, Salons",
        painTitle: "The Reception Bottleneck",
        painText: "The phone is ringing off the hook while you are trying to check in patients. You miss revenue because you can't be in two places.",
        solution: "An always-on AI that answers FAQs and books appointments instantly, freeing your staff to manage the room."
      },
      {
        id: "global",
        icon: Globe,
        title: "The 24/7 Exporter",
        examples: "SaaS, E-commerce",
        painTitle: "The Timezone Tax",
        painText: "Losing deals because your leads are in New York and you are asleep in Sydney. By the time you wake up, they are cold.",
        solution: "Infinite Scalability. The agent qualifies leads and answers questions 24/7, turning your sleep time into sales time."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "TIER 02 // ANALYST",
    promise: "Your team's collective brain, searchable in seconds.",
    sprint: "7-DAY SPRINT",
    specs: ['Private Company Brain', 'Slack/Teams Integration', 'Zero-Hallucination Guard', 'SOP Ingestion'],
    personas: [
      {
        id: "bottleneck",
        icon: Users,
        title: "The Bottleneck Founder",
        examples: "Agencies, Consultancies",
        painTitle: "Groundhog Day",
        painText: "Answering the same 5 questions every week: 'Where is the logo?', 'What is our pricing?'. You are the bottleneck to your own team.",
        solution: "We clone your brain. The AI knows your entire Google Drive and answers staff questions instantly so you can stay in 'Deep Work'."
      },
      {
        id: "guardian",
        icon: FileCheck,
        title: "The Operations Lead",
        examples: "Franchises, Retail Groups",
        painTitle: "The Guesswork Risk",
        painText: "Junior staff guessing the answer to a compliance question because they are too lazy to read the 50-page handbook.",
        solution: "The 'Truth Engine'. The AI answers with a direct citation to the policy document, ensuring 100% compliance."
      },
      {
        id: "onboarding",
        icon: Rocket,
        title: "The Rapid Scaler",
        examples: "High-Growth Tech",
        painTitle: "The Training Drag",
        painText: "It takes 3 months for a new hire to be useful. Senior staff waste hundreds of billable hours training them.",
        solution: "Just-In-Time Learning. The Analyst acts as an instant mentor, reducing time-to-competency from months to weeks."
      }
    ]
  },
  compliance: {
    id: 'compliance',
    label: "TIER 03 // COMPLIANCE",
    promise: "We architect the right brain for the right job. Safety-first.",
    sprint: "14-DAY SPRINT",
    specs: ['Private VPC Hosting', 'PII Redaction Layer', 'Model Agnostic (Llama/Claude)', 'Audit Logs'],
    personas: [
      {
        id: "compliance",
        icon: Lock,
        title: "The Compliance CTO",
        examples: "FinTech, Wealth Management",
        painTitle: "The Shadow AI Risk",
        painText: "Knowing your juniors are pasting sensitive client data into public ChatGPT to write reports. It's a ticking regulation time bomb.",
        solution: "A private 'Walled Garden'. We redact names and PII automatically before the data hits the AI. Speed without the risk."
      },
      {
        id: "intellectual",
        icon: Book,
        title: "The IP Partner",
        examples: "Law Firms, R&D",
        painTitle: "The Data Leak",
        painText: "Terrified that your proprietary methodology or case files will be used to train a public model, destroying your competitive edge.",
        solution: "Zero-Retention APIs. We architect environments where your data is processed but never stored or trained on."
      },
      {
        id: "government",
        icon: Building,
        title: "The Tender Lead",
        examples: "Government Contractors",
        painTitle: "Data Sovereignty",
        painText: "You want to use AI, but the contract says data cannot leave Australia. Public AI models often route through the US.",
        solution: "Local Sovereignty. We deploy models on AWS Bedrock (Sydney Region) so your data never crosses the border."
      }
    ]
  },
  voice: {
    id: 'voice',
    label: "TIER 04 // VOICE",
    promise: "Never miss a call again. Replaced the 'robot menu' with a human.",
    sprint: "10-DAY SPRINT",
    specs: ['Sub-1s Latency', 'Australian Accent Cloning', 'Twilio Telephony', 'CRM Action Trigger'],
    personas: [
      {
        id: "muddy",
        icon: Wrench,
        title: "The Muddy Hands Operator",
        examples: "Emergency Trades",
        painTitle: "The $500 Missed Call",
        painText: "You are under a sink or up a ladder. You miss the call, and the customer calls the next plumber on Google. You lose money while you work.",
        solution: "The AI answers, qualifies the emergency, and texts you the details. You secure the job without washing your hands."
      },
      {
        id: "clinic",
        icon: Activity,
        title: "The After-Hours Clinic",
        examples: "Vets, Dentists",
        painTitle: "The Emergency Gap",
        painText: "Patients calling at 2 AM need reassurance, not a voicemail beep. Leaving them unheard damages trust.",
        solution: "AI Triage. The agent answers, assesses urgency, and books the morning slot or escalates true emergencies to the on-call doc."
      },
      {
        id: "sales",
        icon: Headphones,
        title: "The High-Volume Desk",
        examples: "Car Dealerships, Solar",
        painTitle: "The Burnout",
        painText: "Sales reps burning out answering 50 'junk' calls a day, leaving them no energy to close the real deals.",
        solution: "The Filter. The AI handles the 90% of noise, passing only the warm, qualified leads to your human team."
      }
    ]
  }
};

const PillarPage_Cognitive: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('concierge');
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
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_04 // COGNITION</span>
               <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                 Cognitive <br />
                 <span className="italic text-[#E21E3F]">Infrastructure.</span>
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 The Voice & Reason of the business. <br/>
                 We don't just build chatbots; we engineer <strong>Digital Employees</strong> that can reason, speak, and act 24/7.
               </p>
               <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
                  <span>Meet your new team</span>
                  <ArrowRight className="w-4 h-4" />
               </div>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL */}
             <div className="relative w-full max-w-[350px] h-[300px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
                {/* The visual sits inside this strictly sized box */}
                <PillarVisual_Brain />
             </div>
        </div>

        {/* --- UNIFIED DASHBOARD CONTAINER --- */}
        <div className="mb-12">
           <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a]">Choose your Agent.</h2>
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
                                  
                                  {/* TIER 1: GATEKEEPER FILTER (Concierge) */}
                                  {activeTier === 'concierge' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Incoming Particles */}
                                        {[0, 1, 2].map(i => (
                                            <motion.div 
                                                key={i}
                                                className={`absolute w-3 h-3 rounded-full ${i === 1 ? 'bg-[#C5A059]' : 'bg-black/20'}`}
                                                animate={{ 
                                                    x: [-60, 0, i === 1 ? 60 : 0],
                                                    opacity: [0, 1, i === 1 ? 1 : 0]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                                            />
                                        ))}
                                        {/* The Gate */}
                                        <div className="h-16 w-1 bg-[#1a1a1a] mx-auto relative">
                                            <div className="absolute top-1/2 -left-2 w-5 h-1 bg-[#1a1a1a]" />
                                        </div>
                                    </div>
                                  )}

                                  {/* TIER 2: SEARCH NETWORK (Analyst) */}
                                  {activeTier === 'analyst' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="w-12 h-12 border border-[#C5A059] rounded-full flex items-center justify-center z-10 bg-white">
                                            <Brain className="w-6 h-6 text-[#C5A059]" />
                                        </div>
                                        {/* Satellites */}
                                        {[0, 1, 2, 3].map(i => (
                                            <motion.div 
                                                key={i}
                                                className="absolute w-2 h-2 bg-[#1a1a1a] rounded-full"
                                                animate={{ 
                                                    x: [0, Math.cos(i * 1.57) * 40],
                                                    y: [0, Math.sin(i * 1.57) * 40],
                                                    scale: [0, 1]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                                            />
                                        ))}
                                    </div>
                                  )}

                                  {/* TIER 3: SHIELD PULSE (Compliance) */}
                                  {activeTier === 'compliance' && (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Shield className="w-10 h-10 text-[#1a1a1a] z-10" />
                                        <motion.div 
                                            className="absolute w-12 h-12 border border-[#C5A059] rounded-full"
                                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.div 
                                            className="absolute w-16 h-16 border border-[#C5A059] rounded-full"
                                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        />
                                    </div>
                                  )}

                                  {/* TIER 4: WAVEFORM (Voice) */}
                                  {activeTier === 'voice' && (
                                    <div className="flex items-center gap-1 h-12">
                                        {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                                            <motion.div 
                                                key={i}
                                                className="w-2 bg-[#E21E3F] rounded-full"
                                                animate={{ height: [10, h * 8, 10] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                            />
                                        ))}
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

export default PillarPage_Cognitive;
