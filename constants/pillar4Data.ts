import { MessageSquare, ShieldCheck, Zap, BrainCircuit, CheckCircle, Terminal, Phone, Lock, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  concierge: {
    id: 'concierge',
    label: "CHAT & QUALIFY",
    hook: "I'm drowning in enquiries.",
    summary: "Choose this if you're wasting hours answering the same questions. \"How much?\" \"Where are you located?\" \"Do you do X?\" The AI handles that.",
    sprint: "7 DAYS",
    specs: ['AI chat on your website', 'Qualifies leads before they reach you', 'Books appointments directly', 'Trained on your FAQs'],
    personas: [
      {
        id: "tirekicker",
        icon: MessageSquare,
        title: "The Time Waster Magnet",
        examples: "Real Estate, Yacht Brokers, High-Ticket Sales",
        painTitle: "The Saturday Browsers",
        painText: "You spend Saturday morning replying to \"Is this available?\" messages from people who were never going to buy. You're doing customer service for free.",
        solution: "I build a chat AI that asks qualifying questions. Budget? Timeline? If they're serious, they get booked. If not, they get a polite goodbye. You only talk to real buyers."
      },
      {
        id: "clinic",
        icon: ShieldCheck,
        title: "The Busy Clinic",
        examples: "Dental, Cosmetic, Allied Health",
        painTitle: "The Ignored Chat",
        painText: "Your receptionist is busy with patients. The website chat goes unanswered. You're paying for ads but losing leads because nobody's there to reply.",
        solution: "I install AI chat that answers FAQs about pricing, availability, and procedures. It books consultations straight into your calendar. 24/7."
      },
      {
        id: "founder",
        icon: Zap,
        title: "The 11pm Replier",
        examples: "Coaches, Designers, Architects",
        painTitle: "The Always-On Trap",
        painText: "You feel like you have to reply instantly or you'll lose the job. So you're answering emails at midnight. No boundaries.",
        solution: "The AI handles the first reply. It answers questions, builds rapport, and books a call for a time that suits you. You get your evenings back."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "COMPANY BRAIN",
    hook: "My team keeps asking me questions.",
    summary: "Choose this if your team asks you the same questions every week. \"Where's the logo?\" \"What's our pricing for X?\" \"How do I do this?\" The AI knows.",
    sprint: "7 DAYS",
    specs: ['AI trained on your company info', 'Learns your processes', 'Works in your chat app', 'Only answers from your documents'],
    personas: [
      {
        id: "bottleneck",
        icon: BrainCircuit,
        title: "The Repeat Answerer",
        examples: "Agency Owners, Engineering Leads",
        painTitle: "The Same 5 Questions",
        painText: "Every week you answer the same questions. \"Where's the logo?\" \"What's our pricing?\" \"Do we have a case study for this?\" You're wasting hours.",
        solution: "I build an AI trained on your documents. Your team asks it instead of you. It gives them the answer and links to the file. You stop repeating yourself."
      },
      {
        id: "franchise",
        icon: CheckCircle,
        title: "The Manual Nobody Reads",
        examples: "Gym Groups, Retail Chains",
        painTitle: "The Ignored Manual",
        painText: "You've got 10 locations. Every manager does things differently. The operations manual exists, but nobody reads 100 pages of PDF.",
        solution: "I turn your manual into a chatbot. A manager asks \"How do I process a refund?\" and gets the exact steps on their phone. They actually use it."
      },
      {
        id: "onboarding",
        icon: Terminal,
        title: "The Slow Onboarder",
        examples: "High-Growth Startups",
        painTitle: "The 3-Month Ramp",
        painText: "New hires take 3 months to become useful. They're constantly asking how to do things. You're paying them to learn.",
        solution: "I build an AI they can ask anything. \"How do I log a support ticket?\" \"Where's the pricing sheet?\" They learn without distracting their manager."
      }
    ]
  },
  voice: {
    id: 'voice',
    label: "PHONE AI",
    hook: "I need someone to answer the phone.",
    summary: "Choose this if you miss calls and lose jobs because of it. The AI answers your phone, qualifies the caller, and books them in. 24/7.",
    sprint: "10 DAYS",
    specs: ['Sounds like a real person', 'Updates your CRM automatically', 'Never misses a call', 'Books jobs into your calendar'],
    personas: [
      {
        id: "muddy",
        icon: Phone,
        title: "The Tradie On The Tools",
        examples: "Emergency Plumbers, Locksmiths",
        painTitle: "The Missed Call",
        painText: "You're up a ladder. Phone rings. You can't answer. They call the next guy. You lost the job.",
        solution: "I replace your voicemail with AI that sounds human. It answers, takes their details, and texts them to you. You get the job without stopping work."
      },
      {
        id: "afterhours",
        icon: CheckCircle,
        title: "The Weekend Clinic",
        examples: "Vets, Emergency Dental",
        painTitle: "The After-Hours Gap",
        painText: "Patients call on weekends. Your reception is closed. The answering service knows nothing about your clinic.",
        solution: "I build phone AI that knows your clinic. It can triage, book appointments, or escalate real emergencies to the on-call doctor. 24/7."
      },
      {
        id: "sales",
        icon: Zap,
        title: "The Burnt Out SDR",
        examples: "Solar Sales, Home Improvements",
        painTitle: "The Cold Call Grind",
        painText: "Your sales team calls 100 leads to find 1 interested person. They're burnt out. They quit. You start over.",
        solution: "I build AI that calls your leads and asks qualifying questions. It only books the interested ones. Your sales team talks to warm leads, not cold ones."
      }
    ]
  },
  custom: {
    id: 'custom',
    label: "PRIVATE AI",
    hook: "I need AI but my data is sensitive.",
    summary: "Choose this if you're in finance, law, or healthcare where data privacy matters. You need AI that doesn't send your data to the cloud.",
    sprint: "CUSTOM TIMELINE",
    specs: ['Runs on your own servers', 'Strips sensitive data automatically', 'AI runs locally, not in the cloud', 'Your data stays in Australia'],
    personas: [
      {
        id: "compliance",
        icon: Lock,
        title: "The Shadow AI Problem",
        examples: "Wealth Managers, FinTech",
        painTitle: "The ChatGPT Leak",
        painText: "Your junior staff are pasting client data into ChatGPT. You know it's happening. It's a data breach waiting to happen.",
        solution: "I build a private AI that works like ChatGPT but runs on your servers. Your staff get the speed. You keep the control."
      },
      {
        id: "ip",
        icon: ShieldCheck,
        title: "The Secret Recipe",
        examples: "Biotech, Patent Law, R&D",
        painTitle: "The Training Data Fear",
        painText: "You want AI to analyse your research, but you can't risk that data training a public model. Your competitors could benefit from your IP.",
        solution: "I set up AI with zero retention. It reads your data, gives you the answer, and forgets everything. Your IP never trains anyone else's model."
      },
      {
        id: "complex",
        icon: BrainCircuit,
        title: "The Specialist Need",
        examples: "Legal Case Analysis, Medical Diagnosis Support",
        painTitle: "The Too-General Problem",
        painText: "Standard AI gives generic answers. You need AI that knows Australian case law, or your specific medical protocols, or your industry regulations.",
        solution: "I fine-tune a model on your data. It stops giving generic answers and starts sounding like a senior partner who knows your field."
      }
    ]
  }
};
