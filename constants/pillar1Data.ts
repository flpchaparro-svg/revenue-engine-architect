import { Zap, Map, Shield, ShoppingBag, Box, RefreshCw, Compass, Lock, BookOpen, Gem, Layers, Star, LucideIcon } from 'lucide-react';

export interface Persona {
  id: string;
  icon: LucideIcon;
  title: string;
  examples: string;
  painTitle: string;
  painText: string;
  solution: string;
}

export interface Tier {
  id: string;
  label: string;
  hook: string;
  summary: string;
  sprint: string;
  specs: string[];
  personas: Persona[];
}

export const TIERS: Record<string, Tier> = {
  velocity: {
    id: 'velocity',
    label: "STARTER",
    hook: "I need a website that actually works.",
    summary: "Choose this if you're a tradie or local service business. You need a website that captures enquiries while you're on the tools.",
    sprint: "7 DAYS",
    specs: ['Ready in 7 days', 'Built on WordPress', 'Works perfectly on phones', 'Shows up on Google'],
    personas: [
      {
        id: "urgency",
        icon: Zap,
        title: "The After-Hours Tradie",
        examples: "Emergency plumbers, locksmiths, after-hours electricians",
        painTitle: "The Missed Call",
        painText: "You're under a sink at 11pm. Phone rings. You can't answer. That job goes to the next bloke on Google.",
        solution: "I set up instant SMS replies. When you miss a call, they get a text saying you'll call back within the hour. The job stays yours."
      },
      {
        id: "route",
        icon: Map,
        title: "The Quote Runner",
        examples: "Pest control, solar installers, cleaners, pool guys",
        painTitle: "The Wasted Quote",
        painText: "You drive 45 minutes to quote a job. Turns out their budget is $200 for a $2,000 job. You just wasted half a day on a tyre-kicker.",
        solution: "I build forms that ask the right questions before they book. Budget, job size, timeline. You only quote jobs worth quoting."
      },
      {
        id: "compliance",
        icon: Shield,
        title: "The Local Expert",
        examples: "NDIS providers, physios, accountants, lawyers",
        painTitle: "The Free Advice Trap",
        painText: "You spend 10 hours a week on calls with people who can't afford you or don't actually need you.",
        solution: "I build intake forms that filter out the time-wasters before they reach your phone."
      }
    ]
  },
  retail: {
    id: 'retail',
    label: "E-COMMERCE",
    hook: "I sell products online.",
    summary: "Choose this if you sell physical products online. You need a store that syncs with your stock and calculates shipping properly.",
    sprint: "14 DAYS",
    specs: ['Built on Shopify', 'Syncs with your till system', 'Calculates shipping automatically', 'Sends order updates automatically'],
    personas: [
      {
        id: "chaos",
        icon: ShoppingBag,
        title: "The Boutique Owner",
        examples: "Fashion boutiques, homewares, gift shops",
        painTitle: "The Oversell",
        painText: "You sell the last dress in-store at 10am. Someone buys it online at 10:05am. Now you're writing apology emails and refunding money.",
        solution: "I connect your shop floor to your website. When something sells in-store, it disappears online instantly. No more overselling."
      },
      {
        id: "logistics",
        icon: Box,
        title: "The Heavy Goods Seller",
        examples: "Auto parts, building supplies, equipment, machinery",
        painTitle: "The Shipping Problem",
        painText: "Someone orders a 50kg machine to a remote postcode. Your shipping calculator says $15. Real cost is $150. That's your margin gone.",
        solution: "I set up shipping that calculates based on weight, size, and postcode. You never lose money on freight again."
      },
      {
        id: "churn",
        icon: RefreshCw,
        title: "The Subscription Box",
        examples: "Coffee subscriptions, pet food, meal kits, supplements",
        painTitle: "The Failed Payment",
        painText: "30% of your cancellations aren't people who wanted to leave. Their card just expired and nobody followed up.",
        solution: "I set up automatic payment retries and reminder emails. When a card fails, the system chases it up before you even know there was a problem."
      }
    ]
  },
  performance: {
    id: 'performance',
    label: "PROFESSIONAL",
    hook: "I sell high-ticket services.",
    summary: "Choose this if you sell expensive services and your website needs to match. Slow or dated sites cost you deals before you even get the call.",
    sprint: "21 DAYS",
    specs: ['Custom-built, not a template', 'Loads in under a second', 'Bank-level security', 'Connects to your CRM'],
    personas: [
      {
        id: "precision",
        icon: Compass,
        title: "The High-End Builder",
        examples: "Luxury home builders, architects, high-end renovators",
        painTitle: "The Slow Portfolio",
        painText: "You've got beautiful photos of your work. But your website takes 5 seconds to load them. Clients assume you're sloppy before they call.",
        solution: "I build a site that loads your high-res photos instantly. Your online presence finally matches the quality of your work."
      },
      {
        id: "stakes",
        icon: Lock,
        title: "The Prestige Seller",
        examples: "Yacht brokers, prestige cars, luxury real estate",
        painTitle: "The Trust Killer",
        painText: "Your client is about to enquire about a $2M yacht. The browser shows \"Not Secure.\" They close the tab. You never hear from them.",
        solution: "I build sites with no database to hack. Your clients see the padlock, not a warning."
      },
      {
        id: "knowledge",
        icon: BookOpen,
        title: "The Authority Site",
        examples: "Medical clinics, financial advisors, specialist consultants",
        painTitle: "The Google Problem",
        painText: "You've written 50 articles answering every question your clients ask. But your site is so slow that Google buries you on page 3.",
        solution: "I rebuild your site so it loads fast. Google rewards speed with rankings. Your articles finally get seen."
      }
    ]
  },
  flagship: {
    id: 'flagship',
    label: "FLAGSHIP",
    hook: "I need something special.",
    summary: "Choose this if a normal website isn't enough. You need something that makes people stop and stare.",
    sprint: "30+ DAYS",
    specs: ['3D and animation', 'Cinematic feel', 'Custom experience for your customers', 'Built to impress'],
    personas: [
      {
        id: "aesthetic",
        icon: Gem,
        title: "The Luxury Brand",
        examples: "Luxury fashion, fine jewellery, heritage brands",
        painTitle: "The Template Problem",
        painText: "Your product costs 10x more than competitors. But your website looks like a $50 template. The site is killing the perception you've spent decades building.",
        solution: "I build a site that feels like an experience, not a webpage. No templates. No lag. Just a smooth journey that justifies your price."
      },
      {
        id: "variant",
        icon: Layers,
        title: "The Customiser",
        examples: "Custom furniture, kitchens, lighting, bespoke interiors",
        painTitle: "The Imagination Gap",
        painText: "Your customer wants to spend $15k on a custom sofa. But they can't picture how the green velvet looks with oak legs in their lounge. They hesitate. They leave.",
        solution: "I build a configurator where they pick the fabric, the legs, the size, and see it in their room through their phone camera. Doubt disappears. They buy."
      },
      {
        id: "hotel",
        icon: Star,
        title: "The Boutique Hotelier",
        examples: "Boutique hotels, retreats, safari lodges, destination spas",
        painTitle: "The Booking.com Tax",
        painText: "You're paying 20% to Booking.com on every reservation. That's because your own website is clunky and people don't trust it to book direct.",
        solution: "I build a booking experience so smooth and beautiful that guests want to book direct. You keep the 20%."
      }
    ]
  }
};
