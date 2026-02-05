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
    summary: "You're a tradie or local service business. You need a website that captures enquiries while you're on the tools.",
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
        solution: "Instant SMS replies. When you miss a call, they get a text saying you'll call back within the hour. The job stays yours."
      },
      {
        id: "route",
        icon: Map,
        title: "The Quote Runner",
        examples: "Pest control, solar installers, cleaners, pool guys",
        painTitle: "The Wasted Quote",
        painText: "You drive 45 minutes to quote a job. Turns out their budget is $200 for a $2,000 job. Half a day wasted on a tyre-kicker.",
        solution: "Forms that ask the right questions before they book. Budget, job size, timeline. You only quote jobs worth quoting."
      },
      {
        id: "compliance",
        icon: Shield,
        title: "The Local Expert",
        examples: "NDIS providers, physios, accountants, lawyers",
        painTitle: "The Free Advice Trap",
        painText: "You spend 10 hours a week on calls with people who can't afford you or don't actually need you.",
        solution: "Intake forms that filter out time-wasters before they reach your phone."
      }
    ]
  },
  retail: {
    id: 'retail',
    label: "E-COMMERCE",
    hook: "I sell products online.",
    summary: "You sell physical products online. You need a store that syncs with your stock and calculates shipping properly.",
    sprint: "14 DAYS",
    specs: ['Built on Shopify', 'Syncs with your till system', 'Calculates shipping automatically', 'Sends order updates automatically'],
    personas: [
      {
        id: "chaos",
        icon: ShoppingBag,
        title: "The Boutique Owner",
        examples: "Fashion boutiques, homewares, gift shops",
        painTitle: "The Oversell",
        painText: "Customer orders online. You check the shelf. Already sold in-store. Now you're apologising and refunding.",
        solution: "Your shop floor syncs to your website. Sell something in-store, the website updates instantly. No more double-selling."
      },
      {
        id: "logistics",
        icon: Box,
        title: "The Heavy Goods Seller",
        examples: "Auto parts, building supplies, equipment, machinery",
        painTitle: "The Shipping Problem",
        painText: "Flat-rate shipping kills your margins on big items. You're either overcharging small orders or losing money on large ones.",
        solution: "Shipping that calculates based on weight, size, and postcode. Accurate quotes. Protected margins."
      },
      {
        id: "churn",
        icon: RefreshCw,
        title: "The Subscription Box",
        examples: "Coffee subscriptions, pet food, meal kits, supplements",
        painTitle: "The Failed Payment",
        painText: "Card expires. Payment fails. Customer churns. You had no idea until they were already gone.",
        solution: "Automatic payment retries and reminder emails. You catch failed payments before you lose the customer."
      }
    ]
  },
  performance: {
    id: 'performance',
    label: "PROFESSIONAL",
    hook: "I sell high-ticket services.",
    summary: "You sell expensive services. Your website needs to match. Slow or dated sites cost you deals before you even get the call.",
    sprint: "21 DAYS",
    specs: ['Custom-built, not a template', 'Loads in under a second', 'Bank-level security', 'Connects to your CRM'],
    personas: [
      {
        id: "precision",
        icon: Compass,
        title: "The High-End Builder",
        examples: "Luxury home builders, architects, high-end renovators",
        painTitle: "The Slow Portfolio",
        painText: "Your portfolio is full of stunning work. But the photos take 8 seconds to load. Potential clients leave before they see it.",
        solution: "A site that loads your high-res photos instantly. Your work speaks. They stay."
      },
      {
        id: "stakes",
        icon: Lock,
        title: "The Prestige Seller",
        examples: "Yacht brokers, prestige cars, luxury real estate",
        painTitle: "The Trust Killer",
        painText: "You're asking clients to trust you with millions. Your WordPress site got hacked last month. They found out.",
        solution: "Sites with no database to hack. Static, fast, secure. Nothing to break into."
      },
      {
        id: "knowledge",
        icon: BookOpen,
        title: "The Authority Site",
        examples: "Medical clinics, financial advisors, specialist consultants",
        painTitle: "The Google Problem",
        painText: "You've written 50 blog posts. Google ignores them because your site is slow and poorly structured.",
        solution: "Site rebuilt so it loads fast, structured so Google understands it. Your content finally ranks."
      }
    ]
  },
  flagship: {
    id: 'flagship',
    label: "FLAGSHIP",
    hook: "I need something special.",
    summary: "A normal website isn't enough. You need something that makes people stop and stare.",
    sprint: "30+ DAYS",
    specs: ['3D and animation', 'Cinematic feel', 'Custom experience for your customers', 'Built to impress'],
    personas: [
      {
        id: "aesthetic",
        icon: Gem,
        title: "The Luxury Brand",
        examples: "Luxury fashion, fine jewellery, heritage brands",
        painTitle: "The Template Problem",
        painText: "You sell $50,000 watches. Your website looks like every other Shopify store.",
        solution: "A site that feels like an experience, not a catalogue. People remember it."
      },
      {
        id: "variant",
        icon: Layers,
        title: "The Customiser",
        examples: "Custom furniture, kitchens, lighting, bespoke interiors",
        painTitle: "The Imagination Gap",
        painText: "You sell custom furniture. Customers can't picture what they want. They hesitate. They leave.",
        solution: "A configurator where they pick the fabric, the legs, the size. They see it before they buy it."
      },
      {
        id: "hotel",
        icon: Star,
        title: "The Boutique Hotelier",
        examples: "Boutique hotels, retreats, safari lodges, destination spas",
        painTitle: "The Booking.com Tax",
        painText: "OTAs take 15-20% of every booking. Your own website looks boring, so guests don't trust it.",
        solution: "A booking experience so smooth that guests want to book direct. You keep the margin."
      }
    ]
  }
};
