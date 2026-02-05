import { Headphones, Radio, Video, FileText, Layout, BarChart3, Mic, Share2, Grid, PieChart, Search, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  media: {
    id: 'media',
    label: "MEDIA",
    hook: "I need them to listen.",
    summary: "Your team is on the road. They ignore written emails. You need training they can consume while driving.",
    sprint: "7 DAYS",
    specs: ['Audio/video production', 'Podcast setup', 'Distribution', 'Basic editing'],
    personas: [
      {
        id: "fleet",
        icon: Headphones,
        title: "The Fleet Manager",
        examples: "Logistics, Couriers, Removalists",
        painTitle: "The Unread Bulletin",
        painText: "You send critical safety updates via email knowing 90% of your drivers never open them. Important information hits the bin, not the brain.",
        solution: "Audio bulletins they can listen to in the truck. Same information, actually consumed."
      },
      {
        id: "field",
        icon: Radio,
        title: "The Field Director",
        examples: "Construction, Site Managers",
        painTitle: "Site Briefings",
        painText: "Your site managers need updates but they're never at a desk. Emails pile up unread.",
        solution: "Short voice updates they play on the drive to site. Information that actually lands."
      },
      {
        id: "trainer",
        icon: Video,
        title: "The Trainer",
        examples: "RTOs, Induction Programs",
        painTitle: "Training Fatigue",
        painText: "You run the same induction 20 times a year. Same slides. Same questions. Same waste of your time.",
        solution: "Record once. New staff watch on demand. You do the interesting parts, not the repetition."
      }
    ]
  },
  matrix: {
    id: 'matrix',
    label: "MATRIX",
    hook: "I need them to do it right.",
    summary: "Your team needs step-by-step guides. Visual instructions for complex processes.",
    sprint: "14 DAYS",
    specs: ['SOP creation', 'Screen recording', 'Visual guides', 'Knowledge base'],
    personas: [
      {
        id: "process",
        icon: FileText,
        title: "The Process Owner",
        examples: "Operations, Finance",
        painTitle: "Tribal Knowledge",
        painText: "Only Sarah knows how to run the end-of-month process. If Sarah's sick, everyone waits.",
        solution: "Documented SOPs with screen recordings. Anyone can follow the process. Sarah takes a holiday."
      },
      {
        id: "quality",
        icon: Layout,
        title: "The Quality Controller",
        examples: "Manufacturing, Services",
        painTitle: "Inconsistent Output",
        painText: "Your team does things 5 different ways. Some good. Some terrible. Quality depends on who's working.",
        solution: "One documented way. Visual guides that show exactly how it's done. Consistency improves overnight."
      },
      {
        id: "onboard",
        icon: Video,
        title: "The Onboarder",
        examples: "HR, Growth Companies",
        painTitle: "Slow Ramp-up",
        painText: "New hires take 3 months to get productive. You don't have capacity to train them properly.",
        solution: "Self-serve training library. They watch, they practice, they ask questions. Productive in weeks, not months."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "VISUALS",
    hook: "I need to explain the complex.",
    summary: "You need to communicate complex ideas simply. Visuals, animations, explainers that make sense.",
    sprint: "21 DAYS",
    specs: ['Motion graphics', 'Explainer videos', 'Infographics', 'Presentation design'],
    personas: [
      {
        id: "technical",
        icon: Grid,
        title: "The Technical Seller",
        examples: "B2B, SaaS, Engineering",
        painTitle: "Lost in Translation",
        painText: "Your product is complex. By the time you explain it, their eyes have glazed over.",
        solution: "Animated explainer that shows the value in 60 seconds. They get it before you start talking."
      },
      {
        id: "proposal",
        icon: FileText,
        title: "The Proposal Writer",
        examples: "Agencies, Consultants",
        painTitle: "Boring Documents",
        painText: "Your proposals are walls of text. Clients skim them. Your best work gets ignored.",
        solution: "Visual proposals with infographics and clear sections. They actually read it."
      },
      {
        id: "internal",
        icon: Share2,
        title: "The Internal Communicator",
        examples: "Change Management, IT",
        painTitle: "Change Resistance",
        painText: "You're rolling out a new system. Staff are skeptical. They don't understand why.",
        solution: "Internal launch video that explains the \"why\" not just the \"what.\" Buy-in before rollout."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "ANALYST",
    hook: "I need them to stop asking me.",
    summary: "Your team keeps asking for updates. You need self-serve reporting that answers their questions.",
    sprint: "30+ DAYS",
    specs: ['Interactive dashboards', 'Automated reports', 'Custom views', 'Training on data'],
    personas: [
      {
        id: "report",
        icon: BarChart3,
        title: "The Report Generator",
        examples: "Finance, Operations",
        painTitle: "Monthly Dread",
        painText: "Every month you build the same reports. Hours of copy-paste from 5 different systems.",
        solution: "Automated reports that build themselves. You review and send. No more building from scratch."
      },
      {
        id: "question",
        icon: PieChart,
        title: "The Question Fielder",
        examples: "Leadership, Managers",
        painTitle: "Data Requests",
        painText: "\"What were sales last week?\" \"How many jobs did we complete?\" You're everyone's report machine.",
        solution: "Self-serve dashboards. They log in, they see the numbers. You stop answering the same questions."
      },
      {
        id: "insight",
        icon: Search,
        title: "The Insight Hunter",
        examples: "Strategy, Growth",
        painTitle: "Data Overload",
        painText: "You have data everywhere but no insights. Numbers without meaning.",
        solution: "Dashboards that highlight what matters. Anomalies flagged. Trends visible. Action, not just data."
      }
    ]
  }
};
