import { Truck, HardHat, Heart, Coffee, Package, TrendingUp, Briefcase, AlertTriangle, Calculator, Clock, Store, ShieldCheck, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  media: {
    id: 'media',
    label: "AUDIO TRAINING",
    hook: "My team doesn't read emails.",
    summary: "Choose this if your team is on the road and never reads emails. They can listen while they drive.",
    sprint: "5 DAYS",
    specs: ['Your voice, cloned', 'Private podcast for your team', 'Professional editing', 'Sent automatically'],
    personas: [
      {
        id: "fleet",
        icon: Truck,
        title: "The Fleet Manager",
        examples: "Logistics Companies, Removalists, Couriers",
        painTitle: "The Ignored Email",
        painText: "You send important updates by email. 90% of your drivers never open them because they're on the road. The information never lands.",
        solution: "I turn your updates into a 3-minute podcast. They listen while they drive. You can see who listened."
      },
      {
        id: "field",
        icon: HardHat,
        title: "The Tech Lead",
        examples: "Solar Installers, Electricians, HVAC",
        painTitle: "The Van Search",
        painText: "Your techs sit in their vans for 15 minutes looking for the installation guide. That's billable time wasted.",
        solution: "I create audio briefs they listen to on the way to the job. They arrive knowing what to do."
      },
      {
        id: "care",
        icon: Heart,
        title: "The Remote Manager",
        examples: "NDIS, Aged Care, Disability Services",
        painTitle: "The Disconnected Team",
        painText: "Your remote team only gets cold emails from HQ. They feel disconnected. Culture fades.",
        solution: "I clone your voice and create weekly updates. Hearing the founder builds connection in a way email never can."
      }
    ]
  },
  matrix: {
    id: 'matrix',
    label: "VIDEO GUIDES",
    hook: "I'm sick of explaining the same thing.",
    summary: "Choose this if you're explaining the same thing to every new hire. I record it once so you never have to say it again.",
    sprint: "7 DAYS",
    specs: ['AI presenter videos', 'Scan to watch', 'Watch when needed', 'Works on phones'],
    personas: [
      {
        id: "retail",
        icon: Coffee,
        title: "The Repeat Trainer",
        examples: "Cafe Groups, Gyms, Retail Chains",
        painTitle: "The 50th Explanation",
        painText: "You've explained how to close the register 50 times this year. Every new casual. Same speech. You're a manager, not a trainer.",
        solution: "I create a QR code behind the counter. New hire scans it, watches the video, does it right. You never explain it again."
      },
      {
        id: "warehouse",
        icon: Package,
        title: "The Line Stopper",
        examples: "Wholesale Distributors, Manufacturing, 3PLs",
        painTitle: "The Forgotten Process",
        painText: "A packer forgets how to label a dangerous good. The line stops. Everyone waits.",
        solution: "I put a QR code on the bench. They scan, watch the 30-second video, and keep packing. No line stoppage."
      },
      {
        id: "sales",
        icon: TrendingUp,
        title: "The Data Cleaner",
        examples: "Real Estate, Finance Brokers, B2B Sales",
        painTitle: "The Dirty Data",
        painText: "You spend 5 hours a week cleaning up CRM data because reps forget the process. That's not your job.",
        solution: "I create pop-up video guides inside your CRM. When a rep moves a deal, they see exactly what to fill in. Clean data without nagging."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "VISUAL EXPLAINERS",
    hook: "I need to explain something complicated.",
    summary: "Choose this if you need to explain something complicated and text isn't working. I turn complexity into simple visuals.",
    sprint: "5 DAYS",
    specs: ['Simple diagrams', 'Process flowcharts', 'Quick reference guides', 'Visual safety guides'],
    personas: [
      {
        id: "exec",
        icon: Briefcase,
        title: "The Confused Approver",
        examples: "CEOs, Board Members, Business Owners",
        painTitle: "The Rejected Proposal",
        painText: "IT pitches a $50k automation project. You don't understand what it does. You reject it. A good project dies because of bad explanation.",
        solution: "I turn the technical mess into a simple diagram. \"Customer pays → Invoice created → Team notified.\" When you see it, you approve it."
      },
      {
        id: "safety",
        icon: AlertTriangle,
        title: "The Safety Lead",
        examples: "Construction, Mining, Industrial Sites",
        painTitle: "The Unread Binder",
        painText: "Your 500-page safety manual is a doorstop. Nobody reads it. They guess the protocol. One day someone guesses wrong.",
        solution: "I create visual posters with icons. A worker sees exactly what to do without reading anything. Safety becomes obvious."
      },
      {
        id: "estimator",
        icon: Calculator,
        title: "The Junior Estimator",
        examples: "Civil Engineering, Commercial Fit-outs",
        painTitle: "The Missed Variable",
        painText: "Your junior estimator misses a variable buried on page 10. One missed line costs you $50k.",
        solution: "I create a visual decision tree. 3 questions, one answer. Juniors can't miss a variable."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "KNOWLEDGE BOT",
    hook: "My team keeps asking me questions.",
    summary: "Choose this if you're answering the same questions every day. The answers are in the handbook but nobody reads it. An AI will.",
    sprint: "10 DAYS",
    specs: ['AI trained on your docs', 'Works in your chat app', 'Only answers from your docs', 'Shows where it found the answer'],
    personas: [
      {
        id: "billable",
        icon: Clock,
        title: "The Expensive Answerer",
        examples: "Senior Lawyers, Consultants, Accountants",
        painTitle: "The $500/hr Question",
        painText: "Your $500/hr time gets eaten by questions like \"Where's the precedent for X?\" That's $50/hr work.",
        solution: "I build an AI that knows every document in your firm. Juniors ask the bot, not you. You get your billable hours back."
      },
      {
        id: "franchise",
        icon: Store,
        title: "The Consistency Keeper",
        examples: "Franchise Groups, Retail Chains",
        painTitle: "The Rogue Location",
        painText: "Every location does things differently because the official guide is too hard to find. Consistency is impossible.",
        solution: "I build an AI that knows your operations manual. Any manager can ask \"How do I set up the promo?\" and get the exact answer. One way, everywhere."
      },
      {
        id: "compliance",
        icon: ShieldCheck,
        title: "The Regulation Expert",
        examples: "Property Managers, Strata, Insurance",
        painTitle: "The Risky Answer",
        painText: "Your junior asks a compliance question. You stop work to look it up. One wrong answer and you're in trouble.",
        solution: "I build a bot that knows the legislation. Your junior asks in Slack, gets the answer with a citation. No guessing, no risk."
      }
    ]
  }
};
