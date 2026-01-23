import { MessageSquare, ShieldCheck, Zap, BrainCircuit, CheckCircle, Terminal, Phone, Lock, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
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
