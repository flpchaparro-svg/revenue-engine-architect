import { Activity, TrendingDown, Database, Droplets, EyeOff, MousePointerClick, Flag, Repeat, ShieldAlert, Layers, Scale, Globe, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  pulse: {
    id: 'pulse',
    label: "BASIC DASHBOARD",
    hook: "I want to see my numbers.",
    summary: "Choose this if your numbers are scattered across Xero, Google Ads, and your CRM. You need everything on one screen.",
    sprint: "7 DAYS",
    specs: ['Tracking setup', 'Dashboard built in Looker Studio', 'Know where leads come from', 'Know your profit per customer'],
    personas: [
      {
        id: "scaler",
        icon: Activity,
        title: "The Ad-Spend Guesser",
        examples: "Multi-Site Businesses, E-commerce",
        painTitle: "The ROI Mystery",
        painText: "You spend $20k a month on ads. You don't know which channel is actually making you money. You're guessing.",
        solution: "I build a dashboard that shows which ads are profitable. You see cost per lead, cost per sale, and ROI by channel. Guessing stops."
      },
      {
        id: "wholesaler",
        icon: TrendingDown,
        title: "The Quarter Waiter",
        examples: "Distributors, Wholesalers",
        painTitle: "The Quarterly Surprise",
        painText: "You don't know if last month was profitable until the accountant tells you. By then, it's too late to fix.",
        solution: "I build a dashboard that shows your real margin in real time. You see profit per order as it happens, not 3 months later."
      },
      {
        id: "visionary",
        icon: Database,
        title: "The Spreadsheet Addict",
        examples: "Founders with Multiple Systems",
        painTitle: "The Unanswered Question",
        painText: "You've got data everywhere. But you still can't answer \"if I spend $1,000 more on ads, what happens?\" Data without insight.",
        solution: "I build one dashboard that combines everything. Revenue, leads, margins, pipeline. One screen, all answers."
      }
    ]
  },
  lab: {
    id: 'lab',
    label: "WEBSITE ANALYTICS",
    hook: "I want to know what's happening on my site.",
    summary: "Choose this if you're getting traffic but not conversions. I install tools that show exactly where people drop off and why.",
    sprint: "14 DAYS",
    specs: ['Session recording', 'See where people get frustrated', 'Understand user behaviour', 'Fix what\'s broken'],
    personas: [
      {
        id: "leaky",
        icon: Droplets,
        title: "The Traffic Waster",
        examples: "E-commerce Stores, Lead Gen Sites",
        painTitle: "The Broken Button",
        painText: "You spend money on ads. 40% of visitors leave because the contact button doesn't work on mobile. You're paying for broken traffic.",
        solution: "I install session recording so you can watch real visitors use your site. You see exactly where they struggle. I give you a fix list."
      },
      {
        id: "blind",
        icon: EyeOff,
        title: "The Design Debater",
        examples: "Marketing Teams, Designers",
        painTitle: "The Button Colour Meeting",
        painText: "Your team argues about button colours. Nobody has data. Meetings waste hours debating opinions.",
        solution: "I install heatmaps. You see exactly where people click and where they don't. Debates end. Data wins."
      },
      {
        id: "friction",
        icon: MousePointerClick,
        title: "The Form Dropout",
        examples: "Lead Gen Agencies, Service Biz",
        painTitle: "The Abandoned Form",
        painText: "70% of people who start your form don't finish it. They wanted to contact you. Something stopped them.",
        solution: "I track which field makes people quit. You rewrite that question. More people finish the form."
      }
    ]
  },
  oracle: {
    id: 'oracle',
    label: "FORECASTING",
    hook: "I want to see what's coming.",
    summary: "Choose this if you're tired of finding out about bad months after they happen. I build dashboards that show you what's coming.",
    sprint: "21 DAYS",
    specs: ['Predictive analytics', 'Know who\'s about to leave', 'Know customer lifetime value', 'Know who\'s likely to buy'],
    personas: [
      {
        id: "exit",
        icon: Flag,
        title: "The Sale Prepper",
        examples: "Founders Preparing for Sale",
        painTitle: "The Multiple Gap",
        painText: "Buyers pay 4x for predictable revenue, 2x for unpredictable. You need to prove your numbers are solid.",
        solution: "I build dashboards that prove your revenue is predictable. Net retention, churn rates, forecasted revenue. Buyers pay more for certainty."
      },
      {
        id: "sub",
        icon: Repeat,
        title: "The Surprise Cancellation",
        examples: "Subscription Businesses, Gyms",
        painTitle: "The Sudden Goodbye",
        painText: "You don't know a customer is unhappy until they cancel. By then it's too late.",
        solution: "I build a system that spots at-risk customers 30 days before they cancel. You reach out before they leave."
      },
      {
        id: "risk",
        icon: ShieldAlert,
        title: "The Rear-View Driver",
        examples: "CFOs, Finance Directors",
        painTitle: "The Rear-View Problem",
        painText: "You find out about bad months after they happen. You're driving while looking in the rear-view mirror.",
        solution: "I build forecasts that show your cash position 90 days out. You see problems before they happen."
      }
    ]
  },
  tower: {
    id: 'tower',
    label: "COMMAND CENTRE",
    hook: "I run multiple departments or locations.",
    summary: "Choose this if you run multiple locations or departments and need to see everything in one place.",
    sprint: "30+ DAYS",
    specs: ['Strategic data leadership', 'Clean, trusted data', 'All systems connected', 'One screen for leadership'],
    personas: [
      {
        id: "silo",
        icon: Layers,
        title: "The Department Wrangler",
        examples: "Established Businesses ($20M+)",
        painTitle: "The Three Versions",
        painText: "Sales, Ops, and Finance all have different numbers. You spend meetings arguing about which is right.",
        solution: "I build one dashboard that pulls from all departments. One set of numbers. No more arguments about whose spreadsheet is right."
      },
      {
        id: "governance",
        icon: Scale,
        title: "The Spreadsheet Nightmare",
        examples: "Financial Services, Medical",
        painTitle: "The Security Gap",
        painText: "Sensitive client data is scattered across 50 spreadsheets. One breach and you're in serious trouble.",
        solution: "I centralise your data into a secure warehouse with proper access controls. Auditable, compliant, safe."
      },
      {
        id: "global",
        icon: Globe,
        title: "The Remote HQ",
        examples: "Franchise Groups, Nationals",
        painTitle: "The Monthly Lag",
        painText: "You don't know what the Perth branch is doing until the monthly report. Problems grow for weeks before you see them.",
        solution: "I build a dashboard showing every location in real time. You see problems when they start, not a month later."
      }
    ]
  }
};
