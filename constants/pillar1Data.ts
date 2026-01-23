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
    label: "VELOCITY",
    hook: "I need leads now.",
    summary: "Choose this if you are a Tradesman, Emergency Service, or Local Professional (Plumbers, Locksmiths) who is losing money because you can't answer the phone while working.",
    sprint: "7-DAY SPRINT",
    specs: ['7-Day Turnaround', 'WordPress + Elementor Pro', 'Mobile-First Conversion Design', 'Basic SEO Foundation'],
    personas: [
      {
        id: "urgency",
        icon: Zap,
        title: "The Urgency Operator",
        examples: "Emergency Plumbers, Locksmiths",
        painTitle: "The $500 Missed Call",
        painText: "You live by the phone. If you miss a call at 11 PM because you're under a sink, that job goes to the next guy on Google. You're tired of losing money while you work.",
        solution: "I build a 'Digital Catcher'. Every caller gets an instant SMS response, securing the job while you finish the work. No more lost leads at 2 AM."
      },
      {
        id: "route",
        icon: Map,
        title: "The Route Operator",
        examples: "Pest Control, Solar Installers",
        painTitle: "The Qualification Time Sink",
        painText: "You're driving 45 minutes to quote a job only to discover they wanted 'free advice' or their budget is $200 for a $2,000 job. You're burning diesel and daylight on tyre-kickers.",
        solution: "I act as 'The Gatekeeper'. Conditional logic forms pre-qualify leads so you only talk to high-value clients. Your calendar fills with jobs worth driving to."
      },
      {
        id: "compliance",
        icon: Shield,
        title: "The Professional",
        examples: "NDIS, Boutique Law, Allied Health",
        painTitle: "The 'Free Advice' Trap",
        painText: "You're drowning in calls from people who have no money or no case, wasting 10 hours a week giving free advice.",
        solution: "I act as 'The Gatekeeper'. Conditional logic forms pre-qualify leads so you only talk to high-value clients."
      }
    ]
  },
  retail: {
    id: 'retail',
    label: "RETAIL",
    hook: "I need to sync my stock.",
    summary: "Choose this if you sell physical products (Fashion, Parts, Supplies) and you are tired of overselling, manual inventory updates, or fighting with shipping calculators.",
    sprint: "14-DAY SPRINT",
    specs: ['Shopify Architecture', 'POS Integration (Square/Vend)', 'Shipping Logic Automation', 'Automated Email Flows'],
    personas: [
      {
        id: "chaos",
        icon: ShoppingBag,
        title: "The Chaos Founder",
        examples: "Fashion Boutiques, Local Designers",
        painTitle: "The Double-Sell Disaster",
        painText: "You sell the last unique dress in-store at 10 AM and sell it again online at 10:05 AM. It kills your reputation and wastes hours on apology emails. You're terrified of overselling.",
        solution: "I build a 'Single Source of Truth'. Your POS and your website sync instantly — you never sell what you don't have. Real-time inventory across every channel."
      },
      {
        id: "logistics",
        icon: Box,
        title: "The Wholesaler",
        examples: "Auto Parts, Building Materials",
        painTitle: "Shipping Nightmares",
        painText: "You're losing margin because a customer ordered a 50kg machine to a remote area with 'Free Shipping' logic that wasn't set up correctly. Every miscalculated freight cost eats your profit.",
        solution: "I build Dimensional Shipping Logic. The site calculates freight costs in real-time based on weight, size, and postcode. You protect your margin on every order."
      },
      {
        id: "churn",
        icon: RefreshCw,
        title: "The Subscription",
        examples: "Coffee Clubs, Pet Supplies",
        painTitle: "Involuntary Churn",
        painText: "30% of your cancellations aren't people leaving — they're just expired credit cards the system failed to update. You're losing customers who wanted to stay.",
        solution: "I install Automated Dunning Engines. The system retries failed cards, sends update reminders, and saves the relationship automatically — before you even know there was a problem."
      }
    ]
  },
  performance: {
    id: 'performance',
    label: "PERFORMANCE",
    hook: "I need speed & trust.",
    summary: "Choose this if you sell high-ticket services (Luxury Homes, Medical, Finance) where a slow or insecure website makes you look 'cheap' and loses you the deal.",
    sprint: "21-DAY SPRINT",
    specs: ['Headless Tech (Next.js)', '0.5s Load Times', 'Unhackable Security', 'Advanced CRM Integration'],
    personas: [
      {
        id: "precision",
        icon: Compass,
        title: "The Precision Builder",
        examples: "Luxury Home Builders, Architects",
        painTitle: "The Portfolio Lag",
        painText: "You have 4K photos of stunning work, but your site takes 5 seconds to load them. Clients assume you're 'sloppy' before they even meet you. Your website is destroying the first impression you've spent 20 years building.",
        solution: "I build Edge Image Optimization. Your 4K portfolio loads instantly on any device. Your work proves your precision — your website finally matches your craftsmanship."
      },
      {
        id: "stakes",
        icon: Lock,
        title: "The High-Stakes Agent",
        examples: "Yacht Brokers, Private Jets",
        painTitle: "The Security Breach",
        painText: "If your site shows 'Not Secure', your elite clients will never trust you with their sensitive financial data. One warning message and you've lost a $500k deal.",
        solution: "I build Headless Architecture. No database to hack. A static 'Digital Fortress' that's 100% secure. Your clients see the padlock, not the warning."
      },
      {
        id: "knowledge",
        icon: BookOpen,
        title: "The Knowledge Hub",
        examples: "Medical Clinics, Financial Advisors",
        painTitle: "The Search Sinkhole",
        painText: "Your site is so bloated that Google is de-ranking your best content. You're losing authority to faster, smaller competitors. The advice you spent years writing is invisible.",
        solution: "I build Core Web Vitals Dominance. Your knowledge library becomes a high-speed search weapon. Google rewards fast sites with visibility — your expertise finally gets seen."
      }
    ]
  },
  flagship: {
    id: 'flagship',
    label: "FLAGSHIP",
    hook: "I need to show off.",
    summary: "Choose this if you are a Heritage Brand, Luxury Hotel, or Visionary where 'Standard' isn't enough. You need 3D, Motion, and Cinema to justify premium pricing.",
    sprint: "30+ DAY SPRINT",
    specs: ['Custom 3D / WebGL', 'Cinematic Motion Design', 'Bespoke User Journey', 'Award-Winning Aesthetics'],
    personas: [
      {
        id: "aesthetic",
        icon: Gem,
        title: "The Absolutist",
        examples: "Heritage Brands, Luxury Fashion",
        painTitle: "The Commodity Trap",
        painText: "If your website looks like a $50 template, you lose the ability to charge 10x the market rate. You fear 'Digital Cheapness' — a generic site destroys the mystique you've spent decades building.",
        solution: "I build Headless Theatre. No white flashes, no lag, no template smell. A cinematic journey that maintains your luxury status from the first pixel to the final purchase."
      },
      {
        id: "variant",
        icon: Layers,
        title: "The Visionary",
        examples: "Custom Furniture Makers, Lighting",
        painTitle: "Visualization Paralysis",
        painText: "Customers won't spend $15k on a sofa if they can't see exactly how the 'Green Velvet' looks with 'Oak Legs' in their lounge room. Imagination isn't enough — they need to see it to buy it.",
        solution: "I build 3D Configurators and WebAR. Customers place your product in their room instantly, choose every option, and remove all doubt. Configuration becomes conversion."
      },
      {
        id: "hotel",
        icon: Star,
        title: "The Hotelier",
        examples: "Boutique Resorts, Safari Lodges",
        painTitle: "The Commission Drain",
        painText: "You're paying 20% to Booking.com because your own website is too clunky to handle high-value direct bookings. The OTAs are eating your margin while you handle the service.",
        solution: "I build Cinematic Booking Engines. Capture the emotion and the full revenue, commission-free. Your guests book direct because the experience demands it."
      }
    ]
  }
};
