import { Truck, HardHat, Heart, Coffee, Package, TrendingUp, Briefcase, AlertTriangle, Calculator, Clock, Store, ShieldCheck, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  media: {
    id: 'media',
    label: "TIER 01 / MEDIA",
    hook: "I need them to listen.",
    summary: "Choose this if your team is 'On the Road' (Logistics, Trade, Sales) and ignores written emails. Turn dead time (driving) into learning time.",
    sprint: "5-DAY SPRINT",
    specs: ['ElevenLabs Voice Cloning', 'Private Podcast Feeds', 'Descript Editing', 'Automated Distribution'],
    personas: [
      {
        id: "fleet",
        icon: Truck,
        title: "The Fleet Manager",
        examples: "Logistics Companies, Removalists, Couriers",
        painTitle: "The Unread Bulletin",
        painText: "You send critical safety updates via email knowing 90% of your drivers never open them because they're on the road. Important information hits the bin, not the brain.",
        solution: "I turn your weekly bulletin into a 3-minute private podcast. They listen while they drive, and you get a dashboard proving they heard it. Information delivered, attention confirmed."
      },
      {
        id: "field",
        icon: HardHat,
        title: "The Field Director",
        examples: "Solar Installers, Electricians, HVAC",
        painTitle: "The Site-Start Lag",
        painText: "Your technicians sit in their vans for 15 minutes trying to find the 'Installation Guide'. It kills billable time. You're paying them to search, not work.",
        solution: "I build Pre-Arrival Briefs. As they drive to the job, they listen to the specific technical specs. They arrive ready to work, not ready to read."
      },
      {
        id: "care",
        icon: Heart,
        title: "The Care Leader",
        examples: "NDIS, Aged Care, Disability Services",
        painTitle: "Cultural Drift",
        painText: "Your staff feel like 'just a number' because they only receive cold emails from HQ. You're losing the human connection. Culture dies in the inbox.",
        solution: "I build Monday Encouragement. Clone your voice to deliver personal updates. Hearing the founder's voice builds trust in a way text never can. Your team feels connected, even remotely."
      }
    ]
  },
  matrix: {
    id: 'matrix',
    label: "TIER 02 / MATRIX",
    hook: "I need them to do it right.",
    summary: "Choose this if you have high staff turnover (Retail, Hospitality, Warehousing) and are tired of repeating the same 60-second training speech.",
    sprint: "7-DAY SPRINT",
    specs: ['HeyGen Avatars', 'QR Code Library', 'Just-in-Time Delivery', 'Mobile-First Player'],
    personas: [
      {
        id: "retail",
        icon: Coffee,
        title: "The Retail Manager",
        examples: "Cafe Groups, Gyms, Retail Chains",
        painTitle: "Broken Record Syndrome",
        painText: "You repeat the 'How to close the register' speech for the 50th time this year to a new casual. You're a manager, not a broken record.",
        solution: "I build a QR Code library behind the counter. A new hire scans it, watches a 60-second video of your clone explaining the task, and does it right. You train once, they learn forever."
      },
      {
        id: "warehouse",
        icon: Package,
        title: "The Warehouse Lead",
        examples: "Wholesale Distributors, Manufacturing, 3PLs",
        painTitle: "The Line Stopper",
        painText: "A packer stops the line because they 'forgot' how to label a dangerous good. It kills your throughput. One confused worker, whole team waiting.",
        solution: "I build Point-of-Action Knowledge. A sticker on the bench links to a vertical video on 'Packing Protocol'. Search time becomes pack time. The answer is where they work."
      },
      {
        id: "sales",
        icon: TrendingUp,
        title: "The CRM Police",
        examples: "Real Estate, Finance Brokers, B2B Sales",
        painTitle: "The CRM Mess",
        painText: "You spend 5 hours a week cleaning up data because reps 'forgot' the new workflow. You're the most expensive data entry clerk in the building.",
        solution: "I build In-App Nudges. When a rep moves a deal, a video pops up showing exactly which fields to fill. Rules enforced with video, not nagging. Clean data, happy director."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "TIER 03 / VISUALS",
    hook: "I need to explain the complex.",
    summary: "Choose this if you sell complex services or have dangerous sites where text manuals are ignored. We make safety and sales 'Visually Obvious'.",
    sprint: "5-DAY SPRINT",
    specs: ['Napkin.ai Logic', 'Lucidchart Architecture', 'One-Page Cheat Sheets', 'Safety Iconography'],
    personas: [
      {
        id: "exec",
        icon: Briefcase,
        title: "The Non-Tech Exec",
        examples: "CEOs, Board Members, Business Owners",
        painTitle: "The Invisible Value",
        painText: "You reject a $50k automation project because the IT team explained it poorly. You can't sign off on what you don't understand. Good projects die in confusion.",
        solution: "I turn technical mess into a 'Napkin Sketch'. Customer Pays → Xero Updates → Slack Alerts. When you see the flow, you sign the cheque. Clarity unlocks budget."
      },
      {
        id: "safety",
        icon: AlertTriangle,
        title: "The Safety Lead",
        examples: "Construction, Mining, Industrial Sites",
        painTitle: "The Ignored Manual",
        painText: "Your 500-page safety binders act as doorstops. Workers guess the protocol because the manual is unreadable. One wrong guess and someone gets hurt.",
        solution: "I build Universal Iconography. High-contrast site posters that tell a worker exactly what to do with zero reading required. Safety becomes instinct, not homework."
      },
      {
        id: "estimator",
        icon: Calculator,
        title: "The Estimator",
        examples: "Civil Engineering, Commercial Fit-outs",
        painTitle: "The Pricing Error",
        painText: "Your junior estimator misses a variable like 'Traffic Loading' because it was buried on page 10 of a doc. One missed line, $50k mistake.",
        solution: "I build Pricing Decision Trees. A visual sheet that asks 3 questions and gives the right multiplier. Juniors can't make mistakes. Accuracy built into the process."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "TIER 04 / ANALYST",
    hook: "I need them to stop asking me.",
    summary: "Choose this if you are the bottleneck. Your staff ask you 20 questions a day that are already answered in the company handbook (which they don't read).",
    sprint: "10-DAY SPRINT",
    specs: ['Private Knowledge Base', 'Slack/Teams Integration', 'RAG Architecture', 'Source Attribution'],
    personas: [
      {
        id: "billable",
        icon: Clock,
        title: "The Billable Protector",
        examples: "Senior Lawyers, Consultants, Accountants",
        painTitle: "The Interruption Drain",
        painText: "You spend 5 hours a week answering junior questions like 'Where's the precedent for X?'. It kills your billable capacity. Your $500/hr brain is doing $50/hr work.",
        solution: "I clone your brain. The AI knows every precedent in your firm. Juniors ask the bot first, buying back your expensive time. You bill more, answer less."
      },
      {
        id: "franchise",
        icon: Store,
        title: "The Franchise Guardian",
        examples: "Franchise Groups, Retail Chains",
        painTitle: "Operational Drift",
        painText: "Your manager in Parramatta does things differently to the one in Bondi because the official guide is too hard to find. Every location invents its own rules.",
        solution: "I build The Franchise Brain. A manager asks 'What's the Summer Promo setup?' and gets the exact guide instantly. Consistency scales. One brand, every location."
      },
      {
        id: "compliance",
        icon: ShieldCheck,
        title: "The Compliance Guardian",
        examples: "Property Managers, Strata, Insurance",
        painTitle: "The Compliance Maze",
        painText: "Your junior PM asks 'Can we increase the bond for this tenant?' You have to stop work to look up the Residential Tenancy Act. One wrong answer and you're in court.",
        solution: "I build a Compliance Bot. Tag @CompanyBrain in Slack: 'What's the maximum bond increase in NSW?' and get the answer with a citation to the legislation. Certainty on the fly."
      }
    ]
  }
};
