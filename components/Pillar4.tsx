
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FAQSection from './FAQSection';
import { getPillarFAQs } from '../constants/faqData';
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
    label: "TIER 01 // RESPONDER",
    promise: "Instant answers. Zero wait time. Your front desk, automated.",
    sprint: "5-DAY SPRINT",
    specs: ['Voiceflow Logic', 'OpenAI GPT-4o', 'Pinecone Knowledge Base', 'Human-Handoff Protocol'],
    personas: [
      {
        id: "overwhelmed",
        icon: Stethoscope,
        title: "The Overwhelmed Reception",
        examples: "Medical Clinics, Dental Practices, Physios, Allied Health",
        painTitle: "The Monday Morning Surge",
        painText: "Your phone lines are jammed. Patients sit on hold for 20 minutes, get frustrated, and hang up. Meanwhile, your receptionist is already dealing with someone at the counter.",
        solution: "I build an always-on AI that answers FAQs and books appointments instantly, freeing your staff to manage the room. Zero hold time, zero missed calls."
      },
      {
        id: "global",
        icon: Globe,
        title: "The Timezone Victim",
        examples: "E-commerce, Export Businesses, International Services, Online Retailers",
        painTitle: "The Timezone Tax",
        painText: "You're losing deals because your leads are in New York and you're asleep in Sydney. By the time you wake up, they're cold. Your competitors answered first.",
        solution: "I build Infinite Scalability. The AI qualifies leads and answers questions 24/7, turning your sleep time into sales time. You wake up to warm leads, not cold ones."
      },
      {
        id: "hotel",
        icon: UserCheck,
        title: "The Distracted Concierge",
        examples: "Boutique Hotels, Resorts, Serviced Apartments, Airbnb Managers",
        painTitle: "The Check-In Interruption",
        painText: "Your front desk staff are checking in a guest when the phone rings. They have to ignore the guest in front of them to answer 'What time is breakfast?' It kills the service vibe.",
        solution: "I build an Invisible Concierge. The AI handles all FAQs instantly — wifi passwords, parking, breakfast times. Your staff focus 100% on the guest in the lobby."
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
        examples: "Marketing Agencies, Consultancies, Creative Studios, Professional Services",
        painTitle: "Groundhog Day",
        painText: "You answer the same 5 questions every week: 'Where's the logo?', 'What's our pricing?'. You're the bottleneck to your own team. You can't do deep work because you're everyone's Google.",
        solution: "I clone your brain. The AI knows your entire Google Drive and answers staff questions instantly so you can stay in 'Deep Work'. Your team gets answers without interrupting you."
      },
      {
        id: "guardian",
        icon: FileCheck,
        title: "The Policy Guardian",
        examples: "Franchise Groups, Retail Chains, Multi-Site Operations, Hospitality Groups",
        painTitle: "The Guesswork Risk",
        painText: "Junior staff guess the answer to a compliance question because they won't read the 50-page handbook. One wrong answer and you've got a lawsuit.",
        solution: "I build a 'Truth Engine'. The AI answers with a direct citation to the policy document, ensuring 100% compliance. No guessing, no liability."
      },
      {
        id: "onboarding",
        icon: Rocket,
        title: "The Rapid Scaler",
        examples: "High-Growth Companies, Scaling Agencies, Fast-Hiring Businesses",
        painTitle: "The Training Drag",
        painText: "It takes 3 months for a new hire to be useful. Your senior staff waste hundreds of billable hours training them. You're paying $150/hr for people to answer basic questions.",
        solution: "I build Just-In-Time Learning. The AI acts as an instant mentor, reducing time-to-competency from months to weeks. New hires ask the bot, not your best people."
      }
    ]
  },
  compliance: {
    id: 'compliance',
    label: "TIER 03 // SANCTUARY",
    promise: "I architect the right brain for the right job. Safety-first.",
    sprint: "14-DAY SPRINT",
    specs: ['Private VPC Hosting', 'PII Redaction Layer', 'Model Agnostic (Llama/Claude)', 'Audit Logs'],
    personas: [
      {
        id: "compliance",
        icon: Lock,
        title: "The Shadow AI Fixer",
        examples: "Wealth Management, Financial Advisors, Accountants, Insurance",
        painTitle: "The Shadow AI Risk",
        painText: "You know your juniors are pasting sensitive client data into public ChatGPT to write reports. It's a ticking regulation time bomb. One leak and you're in front of ASIC.",
        solution: "I build a private 'Walled Garden'. Names and PII are redacted automatically before the data hits the AI. Speed without the risk. Your compliance team sleeps at night."
      },
      {
        id: "intellectual",
        icon: Book,
        title: "The IP Protector",
        examples: "Law Firms, Patent Attorneys, R&D Companies, Engineering Firms",
        painTitle: "The Data Leak",
        painText: "You're terrified that your proprietary methodology or case files will be used to train a public model. One leak destroys your competitive edge forever.",
        solution: "I architect Zero-Retention environments. Your data is processed but never stored or trained on. Your IP stays yours."
      },
      {
        id: "government",
        icon: Building,
        title: "The Data Sovereignty Lead",
        examples: "Government Contractors, Defence Suppliers, Critical Infrastructure",
        painTitle: "Data Sovereignty",
        painText: "You want to use AI, but the contract says data cannot leave Australia. Public AI models route through the US. One wrong API call and you've breached the contract.",
        solution: "I deploy Local Sovereignty. Models run on AWS Bedrock (Sydney Region) so your data never crosses the border. Australian data stays in Australia."
      }
    ]
  },
  voice: {
    id: 'voice',
    label: "TIER 04 // VOICE",
    promise: "Never miss a call again. I replace the 'robot menu' with a human-sounding agent.",
    sprint: "10-DAY SPRINT",
    specs: ['Sub-1s Latency', 'Australian Accent Cloning', 'Twilio Telephony', 'CRM Action Trigger'],
    personas: [
      {
        id: "muddy",
        icon: Wrench,
        title: "The Muddy Hands Operator",
        examples: "Emergency Plumbers, Electricians, Locksmiths, HVAC",
        painTitle: "The $500 Missed Call",
        painText: "You're under a sink or up a ladder. You miss the call. The customer calls the next plumber on Google. You lose money while you work.",
        solution: "I build a Voice AI that answers, qualifies the emergency, and texts you the details. You secure the job without washing your hands."
      },
      {
        id: "clinic",
        icon: Activity,
        title: "The After-Hours Clinic",
        examples: "Veterinary Clinics, Dental Practices, Medical Centres, Physios",
        painTitle: "The Emergency Gap",
        painText: "Patients calling at 2 AM need reassurance, not a voicemail beep. Leaving them unheard damages trust. They call your competitor next time.",
        solution: "I build AI Triage. The agent answers, assesses urgency, and books the morning slot or escalates true emergencies to the on-call doc. Every caller feels heard."
      },
      {
        id: "sales",
        icon: Headphones,
        title: "The Service Bay Director",
        examples: "Car Dealerships, Mechanics, Tyre Shops, Service Centres",
        painTitle: "The Status Check Drain",
        painText: "Mechanics are interrupted every 10 minutes by advisors asking 'Is that BMW ready?' because customers keep calling. It kills your throughput.",
        solution: "I build a Status Bot. Customers call, get a real-time update on their car, and your mechanics never stop working. Calls answered, techs uninterrupted."
      }
    ]
  }
};

const Pillar4: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('concierge');
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  
  // Get FAQ data for this pillar
  const pillarFAQs = getPillarFAQs('pillar4');
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
          <button onClick={() => onNavigate('system')} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">
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
                 AI Assistants.
               </h1>
               <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl border-l-2 border-[#C5A059] pl-6 mb-8">
                 I build AI bots that answer your phone, reply to enquiries, and qualify leads — 24/7, even while you sleep. They sound human, and they never take a sick day.
               </p>
             </div>
             
             {/* RIGHT: CONTAINED VISUAL - EXPANDED SIZE */}
             <div className="relative w-full max-w-[500px] h-[450px] mx-auto opacity-90 flex items-center justify-center overflow-hidden">
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

      {/* FAQ SECTION */}
      <FAQSection
        faqs={pillarFAQs}
        accentColor="#C5A059"
        title="Questions about AI?"
        subtitle="Common questions about AI assistants."
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar4;
