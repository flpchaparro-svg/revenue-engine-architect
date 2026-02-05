import { Phone, MessageSquare, Filter, Users, BrainCircuit, CheckCircle, Zap, FileText, Search, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  responder: {
    id: 'responder',
    label: "RESPONDER",
    hook: "I need to catch missed calls.",
    summary: "You miss calls. Every missed call is a missed opportunity. AI picks up when you can't.",
    sprint: "7 DAYS",
    specs: ['AI voice agent', 'Call transcription', 'SMS follow-up', 'Calendar booking'],
    personas: [
      {
        id: "missed",
        icon: Phone,
        title: "The Missed Call Business",
        examples: "Trades, Emergency Services",
        painTitle: "After-Hours Revenue",
        painText: "Your phone rings at 9pm. You're at dinner with family. That job goes to whoever picks up.",
        solution: "AI answers. Sounds human. Takes their details. Books them into your calendar. You call back in the morning with the job already half-won."
      },
      {
        id: "oneman",
        icon: MessageSquare,
        title: "The One-Man Operation",
        examples: "Solo Tradies, Consultants",
        painTitle: "On the Tools",
        painText: "You're mid-job. Hands full. Phone rings. You can't answer. Another lead gone.",
        solution: "AI handles it. Gets their name, job details, urgency. Sends you a summary when you're free."
      },
      {
        id: "overflow",
        icon: Zap,
        title: "The Overflow Handler",
        examples: "Clinics, Agencies",
        painTitle: "Peak Time Chaos",
        painText: "Monday mornings. Phones ring off the hook. Your receptionist can only answer one at a time. The rest go to voicemail.",
        solution: "AI catches the overflow. No hold music. No voicemail. Every call answered instantly."
      }
    ]
  },
  qualifier: {
    id: 'qualifier',
    label: "QUALIFIER",
    hook: "I need to filter leads.",
    summary: "Not every enquiry deserves your time. AI asks the right questions so you know who's worth calling back.",
    sprint: "14 DAYS",
    specs: ['Custom qualification scripts', 'Lead scoring', 'CRM integration', 'Smart routing'],
    personas: [
      {
        id: "tyrekicker",
        icon: Filter,
        title: "The Tyre-Kicker Filter",
        examples: "High-Ticket Sales, Coaches",
        painTitle: "Wasted Quotes",
        painText: "You quote 10 jobs. 2 convert. The other 8 were never going to buy. You wasted time on all of them.",
        solution: "AI qualifies upfront. Budget? Timeline? Urgency? You only spend time on real opportunities."
      },
      {
        id: "service",
        icon: CheckCircle,
        title: "The Service Matcher",
        examples: "Multi-Service Agencies",
        painTitle: "Wrong Enquiries",
        painText: "Half your calls are for services you don't offer. You explain this 10 times a day.",
        solution: "AI explains your services, redirects if needed, only passes through relevant enquiries."
      },
      {
        id: "urgency",
        icon: Users,
        title: "The Urgency Sorter",
        examples: "Real Estate, Finance Brokers",
        painTitle: "Everything Feels Equal",
        painText: "Hot lead and cold lead look the same in your inbox. You treat them equally. You shouldn't.",
        solution: "AI scores urgency. \"Needs it this week\" gets a different priority than \"just browsing.\""
      }
    ]
  },
  assistant: {
    id: 'assistant',
    label: "ASSISTANT",
    hook: "I need AI that knows my business.",
    summary: "Beyond answering calls. AI that knows your services, your pricing, your processes. A trained team member.",
    sprint: "21 DAYS",
    specs: ['Custom knowledge base', 'Multi-channel (voice, chat, email)', 'Internal assistant', 'Training system'],
    personas: [
      {
        id: "faq",
        icon: BrainCircuit,
        title: "The FAQ Machine",
        examples: "Service Businesses, Clinics",
        painTitle: "Repetitive Questions",
        painText: "You answer the same 20 questions every week. \"Do you service my area?\" \"What's your turnaround?\" Over and over.",
        solution: "AI knows the answers. Customers get instant responses. You never answer the same question twice."
      },
      {
        id: "internal",
        icon: CheckCircle,
        title: "The Internal Helper",
        examples: "Agency Owners, Operations",
        painTitle: "Staff Interruptions",
        painText: "Your team asks you questions all day. \"Where's that template?\" \"What's the process for X?\" You're everyone's helpdesk.",
        solution: "Internal AI assistant. Staff ask the bot. You get your time back."
      },
      {
        id: "multichannel",
        icon: MessageSquare,
        title: "The Multi-Channel Responder",
        examples: "E-commerce, Membership Sites",
        painTitle: "Platform Chaos",
        painText: "Enquiries come from Facebook, website, email, phone. Different inboxes. Easy to miss.",
        solution: "One AI across all channels. Same knowledge. Same quality. Nothing falls through."
      }
    ]
  },
  workforce: {
    id: 'workforce',
    label: "WORKFORCE",
    hook: "I need AI employees.",
    summary: "Full AI agents that work autonomously. They research, decide, and act. Digital team members.",
    sprint: "30+ DAYS",
    specs: ['Autonomous agents', 'Complex decision trees', 'Multi-step tasks', 'Human escalation'],
    personas: [
      {
        id: "researcher",
        icon: Search,
        title: "The Researcher",
        examples: "Sales Teams, BD",
        painTitle: "Manual Due Diligence",
        painText: "Before every call, someone researches the prospect. Website, LinkedIn, news. Takes 20 minutes.",
        solution: "AI researches automatically. You get a brief before the call. Context without effort."
      },
      {
        id: "outreach",
        icon: Zap,
        title: "The Outreach Agent",
        examples: "Marketing, Sales",
        painTitle: "Cold Follow-up",
        painText: "You have 500 old leads. Someone should follow up. Nobody does.",
        solution: "AI reaches out. Personalised messages based on their history. Warm leads resurface without you lifting a finger."
      },
      {
        id: "coordinator",
        icon: FileText,
        title: "The Project Coordinator",
        examples: "Agencies, Project Biz",
        painTitle: "Status Chasing",
        painText: "You spend hours chasing updates. \"Where are we on the Smith job?\" \"Has the supplier confirmed?\"",
        solution: "AI chases for you. Sends reminders, collects updates, flags delays. You see a dashboard, not a to-do list."
      }
    ]
  }
};
