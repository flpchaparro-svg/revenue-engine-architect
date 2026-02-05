import { MessageSquare, Filter, Magnet, Users, UserPlus, FileText, Calendar, Phone, RefreshCw, LucideIcon } from 'lucide-react';
import { Persona, Tier } from './pillar1Data';

export const TIERS: Record<string, Tier> = {
  capture: {
    id: 'capture',
    label: "CAPTURE",
    hook: "I keep losing leads.",
    summary: "You have a website but no idea where your leads go. They land in an inbox. Sometimes you remember to check it.",
    sprint: "7 DAYS",
    specs: ['HubSpot or Pipedrive setup', 'Lead source tracking', 'Auto-reply email', 'Admin notification'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Inbox Manager",
        examples: "Solo Consultants, Small Agencies",
        painTitle: "Unknown ROI",
        painText: "You spend $1,000 on ads but don't know if the phone rang because of the ad or a referral. You're guessing with your wallet.",
        solution: "Source tracking. The CRM tells you \"John Smith came from Google Ads.\" You know exactly which marketing pays your bills."
      },
      {
        id: "blind",
        icon: Filter,
        title: "The Blind Advertiser",
        examples: "Local Services, Tradies",
        painTitle: "Lost Attribution",
        painText: "You run Facebook ads, Google ads, referrals, and word of mouth. Something works. You just don't know what.",
        solution: "Every lead tagged with where they came from. You stop wasting money on channels that don't convert."
      },
      {
        id: "slow",
        icon: Magnet,
        title: "The Slow Responder",
        examples: "Real Estate, Finance Brokers",
        painTitle: "Cold Leads",
        painText: "Leads come in. You reply when you can. Sometimes that's 3 days later. By then, they've hired someone else.",
        solution: "Auto-reply within 10 seconds. They know you got their message. You get time to call back properly."
      }
    ]
  },
  nurture: {
    id: 'nurture',
    label: "NURTURE",
    hook: "My leads go cold.",
    summary: "You capture leads but they go quiet. No follow-up system. Deals die in silence.",
    sprint: "14 DAYS",
    specs: ['Email sequences', 'Task reminders', 'Deal pipeline', 'Activity tracking'],
    personas: [
      {
        id: "educator",
        icon: Calendar,
        title: "The Forgetter",
        examples: "Solar Sales, Enterprise SaaS",
        painTitle: "Lost Follow-ups",
        painText: "You quoted someone last month. Meant to follow up. Forgot. They went with your competitor.",
        solution: "Automatic reminders. If you haven't touched a deal in 7 days, the system nudges you. Nothing falls through."
      },
      {
        id: "lister",
        icon: FileText,
        title: "The Spreadsheet Warrior",
        examples: "E-commerce, Authors",
        painTitle: "Chaos Management",
        painText: "Your leads live in a spreadsheet, your emails, sticky notes, and your head. Good luck finding that quote from March.",
        solution: "One place. Every lead, every email, every note. Search \"plumber Bondi\" and find them in 2 seconds."
      },
      {
        id: "segment",
        icon: Users,
        title: "The Ghost Hunter",
        examples: "Multi-Service Agencies",
        painTitle: "Silent Prospects",
        painText: "People enquire, you send a quote, then silence. You don't know if they're thinking or they've moved on.",
        solution: "Automatic follow-up emails at day 3, 7, and 14. Gentle nudges that bring deals back from the dead."
      }
    ]
  },
  pipeline: {
    id: 'pipeline',
    label: "PIPELINE",
    hook: "I can't see my deals.",
    summary: "You have leads but no visibility. How much is in your pipeline? What's closing this month? You're guessing.",
    sprint: "14 DAYS",
    specs: ['Visual pipeline', 'Revenue forecasting', 'Win/loss tracking', 'Team visibility'],
    personas: [
      {
        id: "closer",
        icon: Calendar,
        title: "The Revenue Guesser",
        examples: "Solar Sales, Enterprise SaaS",
        painTitle: "No Forecast",
        painText: "\"How much will we close this month?\" You shrug. You genuinely don't know.",
        solution: "A pipeline that shows every deal, its value, and its probability. You know what's coming before it lands."
      },
      {
        id: "manager",
        icon: Phone,
        title: "The Manager in the Dark",
        examples: "Teams of 3+ Reps",
        painTitle: "Team Blindness",
        painText: "Your sales team says they're busy. But are they? You have no idea what they're actually working on.",
        solution: "Full visibility. See every deal, every activity, every conversation. No more \"trust me, I'm on it.\""
      },
      {
        id: "admin",
        icon: FileText,
        title: "The One-Man Band",
        examples: "Construction, Events",
        painTitle: "Head Storage",
        painText: "Everything lives in your head. If you got hit by a bus tomorrow, the business stops.",
        solution: "Everything documented. Deals, contacts, history. Your business survives without your memory."
      }
    ]
  },
  revops: {
    id: 'revops',
    label: "REVOPS",
    hook: "I need everything connected.",
    summary: "You have systems but they don't talk to each other. CRM here, accounting there, operations somewhere else.",
    sprint: "21 DAYS",
    specs: ['CRM to accounting sync', 'Inventory integration', 'Custom dashboards', 'Multi-team workflows'],
    personas: [
      {
        id: "silo",
        icon: RefreshCw,
        title: "The Double-Entry Victim",
        examples: "Mid-Market Companies ($5M+)",
        painTitle: "Data Everywhere",
        painText: "A deal closes in the CRM. Someone types it into Xero. Someone else types it into the project system. Three chances for error.",
        solution: "Close a deal, invoice auto-generates in Xero, project auto-creates in Monday. One entry. Zero mistakes."
      },
      {
        id: "leak",
        icon: Filter,
        title: "The Information Silo",
        examples: "SaaS, Membership Sites",
        painTitle: "Disconnected Teams",
        painText: "Sales doesn't know what operations promised. Operations doesn't know what sales sold. Clients get caught in the middle.",
        solution: "One source of truth. Deal notes flow to operations. Everyone sees the same information."
      },
      {
        id: "data",
        icon: Users,
        title: "The Scaling Business",
        examples: "Financial Services, Insurance",
        painTitle: "Breaking Systems",
        painText: "What worked with 5 staff breaks with 15. Your processes can't handle the growth.",
        solution: "Systems built to scale. Add staff, add deals, add complexity. The CRM handles it."
      }
    ]
  }
};
