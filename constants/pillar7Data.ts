import { Activity, TrendingDown, Database, Droplets, EyeOff, MousePointerClick, Flag, Repeat, ShieldAlert, Layers, Scale, Globe, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  pulse: {
    id: 'pulse',
    label: "TIER 01 / PULSE",
    hook: "Stop guessing, start steering.",
    summary: "Choose this if you are flying blind. You have data in Xero, Google Ads, and CRM, but no single screen that tells you if you are winning or losing today.",
    sprint: "7-DAY SPRINT",
    specs: ['Google Tag Manager', 'Looker Studio', 'Attribution Modelling', 'Unit Economics'],
    personas: [
      {
        id: "scaler",
        icon: Activity,
        title: "The Blind Scaler",
        examples: "Multi-Site Businesses, E-commerce",
        painTitle: "The Ad-Spend Trap",
        painText: "You spend $20k/mo on ads but don't know which channel is actually driving the profit. You're flying blind. Every month you waste budget on the wrong thing.",
        solution: "I build a Revenue Pulse that shows the 'Unit Economics' of every lead. You know exactly which dollar is making you two. Ad spend becomes an investment, not a gamble."
      },
      {
        id: "wholesaler",
        icon: TrendingDown,
        title: "The Margin Squeeze",
        examples: "Distributors, Wholesalers",
        painTitle: "Operational Blindness",
        painText: "High volume, thin margins. You don't know your 'Real Profit' until the accountant finishes the books at the end of the quarter. By then, the damage is done.",
        solution: "I build Real-Time Margin Tracking. Inventory links to Finance so you see the Net Profit on every single order the moment it happens. No more quarter-end surprises."
      },
      {
        id: "visionary",
        icon: Database,
        title: "The Data Hoarder",
        examples: "Founders with Multiple Systems",
        painTitle: "Analysis Paralysis",
        painText: "You have thousands of rows of data in Xero and HubSpot, but you still can't answer: 'If I spend $1,000 more, what happens?' Data everywhere, answers nowhere.",
        solution: "I build The North Star Dashboard. Your fragmented data blends into one single screen that answers the big questions instantly. One screen, total clarity."
      }
    ]
  },
  lab: {
    id: 'lab',
    label: "TIER 02 / LAB",
    hook: "I see what your customers see.",
    summary: "Choose this if you have traffic but low conversion. We install 'Forensic' tools to watch users struggle and fix the friction points killing your sales.",
    sprint: "14-DAY SPRINT",
    specs: ['Microsoft Clarity', 'Rage-Click Analysis', 'UX Forensics', 'Conversion Rate Opt.'],
    personas: [
      {
        id: "leaky",
        icon: Droplets,
        title: "The Leaky Bucket",
        examples: "E-commerce Stores, Lead Gen Sites",
        painTitle: "Traffic Rich, Profit Poor",
        painText: "You spend huge money on ads to bring people to a site where 40% leave because the 'Contact' button is broken on mobile. You're paying for traffic that can't convert.",
        solution: "I build Forensic Session Recording. The system watches the user struggle so you don't have to, giving you a 'Fix List' to stop the bleed. Every leak found, every dollar saved."
      },
      {
        id: "blind",
        icon: EyeOff,
        title: "The Opinion Fighter",
        examples: "Marketing Teams, Designers",
        painTitle: "Aesthetic Bias",
        painText: "You argue about button colours based on 'opinion' rather than data. You're redesigning the wrong things. Meetings waste hours on guesses.",
        solution: "I build Heatmap Evidence. You see exactly where people click (and where they don't), ending the debate with cold hard facts. Data wins, opinions lose."
      },
      {
        id: "friction",
        icon: MousePointerClick,
        title: "The Form Abandonment",
        examples: "Lead Gen Agencies, Service Biz",
        painTitle: "The Drop-off Cliff",
        painText: "People start your enquiry form but never finish it. You're losing 70% of your leads at the finish line. They wanted to contact you — something stopped them.",
        solution: "I build Field-Level Telemetry. The system identifies the exact question that causes them to quit. Rewrite it, restore flow. Leads that start, finish."
      }
    ]
  },
  oracle: {
    id: 'oracle',
    label: "TIER 03 / ORACLE",
    hook: "Predict the future.",
    summary: "Choose this if you want to stop reacting to last month's bad numbers and start predicting next month's cashflow using predictive modelling.",
    sprint: "21-DAY SPRINT",
    specs: ['BigQuery + AI', 'Churn Prediction', 'LTV Forecasting', 'Propensity Modelling'],
    personas: [
      {
        id: "exit",
        icon: Flag,
        title: "The Exit Founder",
        examples: "Founders Preparing for Sale",
        painTitle: "The Valuation Discount",
        painText: "Buyers pay 4x for 'Predictable Revenue' and only 2x for 'Up and Down' revenue. You need to prove certainty. Without it, you're leaving millions on the table.",
        solution: "I build Investor-Grade Forecasting. Your 'Net Revenue Retention' and 'Churn Probability' are proven with data. The numbers justify a higher exit multiple."
      },
      {
        id: "sub",
        icon: Repeat,
        title: "The Churn Fighter",
        examples: "Subscription Businesses, Gyms",
        painTitle: "The Silent Churn",
        painText: "You don't know a customer is unhappy until they cancel. By then, it's too late to save them. You could have kept them — if you'd known.",
        solution: "I build Behavioural DNA Modelling. The system predicts who's 'At Risk' based on their usage patterns 30 days before they quit. Save them before they leave."
      },
      {
        id: "risk",
        icon: ShieldAlert,
        title: "The Cashflow Forecaster",
        examples: "CFOs, Finance Directors",
        painTitle: "Cashflow Surprises",
        painText: "You're blindsided by a bad month because your 'Leading Indicators' were actually just 'Lagging Indicators'. You're steering with a rear-view mirror.",
        solution: "I build 90-Day Propensity Forecasting. You know what your cashflow will be in 3 months with 95% accuracy. Steer forward, not backward."
      }
    ]
  },
  tower: {
    id: 'tower',
    label: "TIER 04 / TOWER",
    hook: "Total Command.",
    summary: "Choose this if you have a complex organization (Franchise, Multi-Department) and need a 'Central Nervous System' to align everyone.",
    sprint: "30+ DAY SPRINT",
    specs: ['Fractional CDO', 'Data Governance', 'Multi-Source Sync', 'Executive Control'],
    personas: [
      {
        id: "silo",
        icon: Layers,
        title: "The Siloed Exec",
        examples: "Established Businesses ($20M+)",
        painTitle: "Fragmented Truth",
        painText: "Sales doesn't know what Ops is doing. Ops doesn't know what Finance is saying. Your departments fight each other instead of working together.",
        solution: "I build The Control Tower. A single 'Nervous System' that links every department into one view. The business acts as one organism. Total alignment, total clarity."
      },
      {
        id: "governance",
        icon: Scale,
        title: "The Data Risk Manager",
        examples: "Financial Services, Medical",
        painTitle: "The Data Risk",
        painText: "You have sensitive client data scattered across 50 spreadsheets. It's a security nightmare waiting to happen. One breach and you're front-page news.",
        solution: "I build SOC2 Compliant Governance. Your data centralises into a secure Warehouse with strict access controls. Secure, auditable, compliant."
      },
      {
        id: "global",
        icon: Globe,
        title: "The HQ Director",
        examples: "Franchise Groups, Nationals",
        painTitle: "Local Blindness",
        painText: "You can't see what the Perth branch is doing until the monthly report. You're steering a giant ship with no radar. Problems grow in the dark.",
        solution: "I build a Global Command Centre. Every location, every metric, one dashboard. You see problems the moment they start, not the month they end."
      }
    ]
  }
};
