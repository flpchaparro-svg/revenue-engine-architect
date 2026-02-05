import { Activity, TrendingDown, Database, Droplets, EyeOff, MousePointerClick, Flag, Repeat, Layers, BarChart3, Globe, Scale, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  pulse: {
    id: 'pulse',
    label: "PULSE",
    hook: "I need to stop guessing.",
    summary: "You're flying blind. You have data in Xero, Google Ads, and your CRM but no single screen that tells you if you're winning or losing today.",
    sprint: "7 DAYS",
    specs: ['Google Tag Manager', 'Looker Studio', 'Attribution modelling', 'Basic KPIs'],
    personas: [
      {
        id: "scaler",
        icon: Activity,
        title: "The Blind Scaler",
        examples: "High-Volume Businesses",
        painTitle: "Operational Blindness",
        painText: "High volume, thin margins. You don't know your real profit until the accountant finishes the books at end of quarter. By then, the damage is done.",
        solution: "Real-time margin tracking. Inventory links to finance so you see the net profit on every single order the moment it happens. No more quarter-end surprises."
      },
      {
        id: "wholesaler",
        icon: TrendingDown,
        title: "The Margin Squeeze",
        examples: "Distributors, Wholesalers",
        painTitle: "Hidden Costs",
        painText: "Revenue is up. Profit isn't. Something is eating your margin but you don't know what.",
        solution: "Margin breakdown by product, service, and customer. You see where money disappears."
      },
      {
        id: "visionary",
        icon: Database,
        title: "The Data Hoarder",
        examples: "Founders with Multiple Systems",
        painTitle: "Too Many Numbers",
        painText: "You have 12 reports across 5 systems. Information overload. No clarity.",
        solution: "One dashboard. The 6 numbers that actually matter. Everything else is noise."
      }
    ]
  },
  lab: {
    id: 'lab',
    label: "LAB",
    hook: "I see what your customers see.",
    summary: "You need to understand customer behaviour. What are they clicking? Where do they drop off? What converts?",
    sprint: "14 DAYS",
    specs: ['Heat mapping', 'Funnel analysis', 'A/B testing', 'Conversion tracking'],
    personas: [
      {
        id: "leaky",
        icon: Droplets,
        title: "The Conversion Hunter",
        examples: "E-commerce, Lead Gen Sites",
        painTitle: "Website Leaks",
        painText: "People visit your site. Most leave without enquiring. You don't know why.",
        solution: "Heat maps show where they click. Funnel analysis shows where they drop off. You fix the leaks."
      },
      {
        id: "blind",
        icon: EyeOff,
        title: "The Ad Spender",
        examples: "Marketing Teams, Advertisers",
        painTitle: "Wasted Budget",
        painText: "You spend $5k/month on ads. Something works. You don't know what.",
        solution: "Attribution tracking. You see which ad, which keyword, which audience actually generates revenue."
      },
      {
        id: "friction",
        icon: MousePointerClick,
        title: "The Price Tester",
        examples: "E-commerce, Service Biz",
        painTitle: "Pricing Guesswork",
        painText: "You think you could charge more. But you're scared to test it.",
        solution: "A/B testing. Show different prices to different visitors. Data tells you the answer."
      }
    ]
  },
  oracle: {
    id: 'oracle',
    label: "ORACLE",
    hook: "I need to predict the future.",
    summary: "Looking backwards isn't enough. You need to see what's coming. Forecasting, projections, early warnings.",
    sprint: "21 DAYS",
    specs: ['Revenue forecasting', 'Pipeline predictions', 'Trend analysis', 'Alert systems'],
    personas: [
      {
        id: "exit",
        icon: Flag,
        title: "The Cash Flow Guesser",
        examples: "CFOs, Finance Directors",
        painTitle: "Runway Anxiety",
        painText: "\"Will we make payroll next month?\" You're never quite sure.",
        solution: "Cash flow projection based on pipeline, payment terms, and seasonal trends. You see problems before they hit."
      },
      {
        id: "sub",
        icon: Repeat,
        title: "The Pipeline Dreamer",
        examples: "Sales Leaders, RevOps",
        painTitle: "Wishful Forecasting",
        painText: "Your sales forecast is fiction. Deals that were \"closing this week\" last month are still \"closing this week.\"",
        solution: "Reality-based forecasting. Weighted by probability, adjusted by historical conversion. Numbers you can trust."
      },
      {
        id: "risk",
        icon: Layers,
        title: "The Trend Spotter",
        examples: "Strategy, Leadership",
        painTitle: "Late Reactions",
        painText: "You notice problems after they've hurt you. Slow sales, rising costs, churn. Always reactive.",
        solution: "Early warning indicators. Spot downturns before they become disasters. Act while you can still fix it."
      }
    ]
  },
  tower: {
    id: 'tower',
    label: "TOWER",
    hook: "I need total command.",
    summary: "Full operational visibility. Every team, every metric, every system. Command centre view.",
    sprint: "30+ DAYS",
    specs: ['Multi-source integration', 'Real-time feeds', 'Executive dashboards', 'Team scorecards'],
    personas: [
      {
        id: "silo",
        icon: Globe,
        title: "The Multi-Location Owner",
        examples: "Multi-Site Businesses",
        painTitle: "Site Blindness",
        painText: "You have 5 locations. Each runs differently. You only see problems when you visit.",
        solution: "Location-by-location dashboards. Compare performance. Spot issues from your desk."
      },
      {
        id: "governance",
        icon: BarChart3,
        title: "The Team Manager",
        examples: "Sales Directors, Ops",
        painTitle: "Performance Guessing",
        painText: "Who's your best performer? Who's struggling? You go by gut, not data.",
        solution: "Team scorecards. Activity, outcomes, trends. You manage with facts, not feelings."
      },
      {
        id: "global",
        icon: Scale,
        title: "The Acquisition Target",
        examples: "Founders, Exit Planning",
        painTitle: "Due Diligence Readiness",
        painText: "You want to sell in 3 years. But you can't prove your numbers clearly.",
        solution: "Investor-ready dashboards. Clean data. Clear trends. You look professional when it matters."
      }
    ]
  }
};
