import { Truck, HardHat, ShieldCheck, Coffee, Package, TrendingUp, Briefcase, AlertTriangle, MessageSquare, BookOpen, HelpCircle, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  media: {
    id: 'media',
    label: "MEDIA",
    hook: "I need them to listen.",
    summary: "Your team is on the road. They ignore written emails. You need training they can consume while driving.",
    sprint: "7 DAYS",
    specs: ['Audio training', 'Podcast-style updates', 'Mobile-first delivery', 'Bite-sized content'],
    personas: [
      {
        id: "fleet",
        icon: Truck,
        title: "The Fleet Manager",
        examples: "Logistics Companies, Removalists, Couriers",
        painTitle: "The Unread Bulletin",
        painText: "You send critical safety updates via email knowing 90% of your drivers never open them. Important information hits the bin, not the brain.",
        solution: "Audio bulletins they listen to in the truck. Same information, actually consumed."
      },
      {
        id: "field",
        icon: HardHat,
        title: "The Field Director",
        examples: "Solar Installers, Multi-Site Teams",
        painTitle: "Scattered Teams",
        painText: "Your team is spread across 10 sites. Getting everyone in one room is impossible.",
        solution: "Training that travels with them. On their phone, in their ear, on their schedule."
      },
      {
        id: "safety",
        icon: ShieldCheck,
        title: "The Safety Officer",
        examples: "Construction, Industrial",
        painTitle: "Compliance Theatre",
        painText: "You tick the box on training but nobody actually learns. It's paperwork, not education.",
        solution: "Engaging content they actually remember. Quizzes that prove they understood it."
      }
    ]
  },
  matrix: {
    id: 'matrix',
    label: "MATRIX",
    hook: "I need them to do it right.",
    summary: "Your team needs clear step-by-step processes. No confusion. No variation.",
    sprint: "14 DAYS",
    specs: ['Screen recordings', 'SOPs', 'Process documentation', 'Knowledge base'],
    personas: [
      {
        id: "process",
        icon: Coffee,
        title: "The Process Owner",
        examples: "Cafe Groups, Gyms, Retail",
        painTitle: "Tribal Knowledge",
        painText: "Only one person knows how to run the billing process. If they're sick, everything stops.",
        solution: "Documented SOPs with recordings. Anyone can follow the steps. No single point of failure."
      },
      {
        id: "quality",
        icon: Package,
        title: "The Quality Controller",
        examples: "Manufacturing, 3PLs",
        painTitle: "Inconsistent Work",
        painText: "Same task, 5 different approaches. Quality depends on who's working that day.",
        solution: "One documented method. Everyone follows the same steps. Consistent output."
      },
      {
        id: "frustrated",
        icon: TrendingUp,
        title: "The Frustrated Manager",
        examples: "Operations, Team Leads",
        painTitle: "Repeated Mistakes",
        painText: "You've explained the same process 50 times. They still get it wrong.",
        solution: "Video they can rewatch. Reference they can check. You explain once. They learn forever."
      }
    ]
  },
  visuals: {
    id: 'visuals',
    label: "VISUALS",
    hook: "I need to explain the complex.",
    summary: "Complex systems need clear explanations. Diagrams. Animations. Visual guides that make sense.",
    sprint: "21 DAYS",
    specs: ['Animated explainers', 'Interactive guides', 'Visual SOPs', 'System maps'],
    personas: [
      {
        id: "launcher",
        icon: Briefcase,
        title: "The System Launcher",
        examples: "IT, Change Management",
        painTitle: "Rollout Resistance",
        painText: "You're launching new software. Staff are already dreading it. They don't understand why things are changing.",
        solution: "Launch video that explains the \"why.\" Visual walkthrough of the \"how.\" Buy-in before day one."
      },
      {
        id: "technical",
        icon: AlertTriangle,
        title: "The Technical Trainer",
        examples: "CRM, ERP Implementations",
        painTitle: "Glazed Eyes",
        painText: "You explain the CRM. Their eyes glaze over. A week later, they're asking the same questions.",
        solution: "Animated walkthrough they can pause and replay. Visual memory beats verbal explanation."
      },
      {
        id: "integrator",
        icon: MessageSquare,
        title: "The Integrator",
        examples: "Multi-Tool Businesses",
        painTitle: "System Confusion",
        painText: "You have 5 tools. They connect somehow. Nobody knows how data flows between them.",
        solution: "System map that shows how everything connects. One visual. Total clarity."
      }
    ]
  },
  analyst: {
    id: 'analyst',
    label: "ANALYST",
    hook: "I need them to stop asking me.",
    summary: "Your team relies on you for every answer. You need to build their independence.",
    sprint: "30+ DAYS",
    specs: ['Q&A library', 'Decision trees', 'Self-serve resources', 'Ongoing support'],
    personas: [
      {
        id: "answer",
        icon: BookOpen,
        title: "The Answer Machine",
        examples: "Managers, Team Leads",
        painTitle: "Constant Questions",
        painText: "Your day is interrupted 20 times with questions your team could answer themselves.",
        solution: "Searchable knowledge base. They type the question, they get the answer. You do real work."
      },
      {
        id: "escalation",
        icon: HelpCircle,
        title: "The Escalation Point",
        examples: "Support, Operations",
        painTitle: "False Escalations",
        painText: "Every problem lands on your desk. 80% could be solved without you.",
        solution: "Decision trees that guide them to solutions. Only real problems reach you."
      },
      {
        id: "bottleneck",
        icon: TrendingUp,
        title: "The Bottleneck Boss",
        examples: "Founders, Senior Leaders",
        painTitle: "Dependence",
        painText: "Nothing moves without your input. You can't take a holiday without your phone blowing up.",
        solution: "Team capability that lets you step back. They handle problems. You handle strategy."
      }
    ]
  }
};
