import { 
  ShieldCheck, Activity, Database, ArrowRight, Zap, 
  MapPin, Globe, AlertTriangle, Target 
} from 'lucide-react';

export const TERMINAL_LINES = [
  "> Auditing old site... [4.2s load, 42/100 PSI]",
  "> Migrating domain: .com → .com.au... [DONE]",
  "> Rebuilding in React + Tailwind... [DONE]",
  "> Adding Sydney location schema... [47 SIGNALS]",
  "> Compressing images: 8.2MB → 0.9MB... [SAVED 89%]",
  "> Enabling CDN distribution... [DONE]",
  "> Running final PageSpeed audit... [94/100]",
  "> Load time: 4.2s → 0.4s... [10x FASTER]",
  "> Deploying to production... [LIVE]",
  "> Status: TRANSFORMATION_COMPLETE"
];

export const PROBLEM_ITEMS = [
  { 
    icon: Activity, 
    title: "Speed Was Killing Conversions", 
    metric: "4.2 seconds", 
    label: "Load Time", 
    desc: "Google says anything over 3 seconds loses 53% of mobile visitors. They were haemorrhaging leads.",
    impact: "Lost contracts."
  },
  { 
    icon: Globe, 
    title: "No Local Visibility", 
    metric: "Near Zero", 
    label: "Sydney Ranking", 
    desc: "The .com domain had no location signals. Google thought they were in Texas, not Parramatta.",
    impact: "Invisible market."
  },
  { 
    icon: AlertTriangle, 
    title: "Amateur Perception", 
    metric: "Template", 
    label: "Trust Score", 
    desc: "For a company protecting $3.2B in assets, the site looked like a side hustle. Trust destroyed instantly.",
    impact: "Failed due diligence."
  },
  { 
    icon: Database, 
    title: "No Lead Capture", 
    metric: "0%", 
    label: "Attribution", 
    desc: "Enquiries went to a generic inbox. No tracking. No automation. No data on what worked.",
    impact: "Marketing blindness."
  }
];

export const SOLUTION_ITEMS = [
  {
    title: "Domain Migration",
    what: "Moved to .com.au with 301 redirects.",
    why: "Instant geographic signal for Google. Essential for local ranking.",
    icon: MapPin
  },
  {
    title: "Performance Architecture",
    what: "React + Tailwind. No WordPress bloat.",
    why: "Page weight dropped 89%. Load time hit 0.4s. Instant interactions.",
    icon: Zap
  },
  {
    title: "Local SEO Schema",
    what: "47 specific location signals injected.",
    why: "Google now explicitly knows this is a 'Sydney' security company.",
    icon: Globe
  },
  {
    title: "Lead Intelligence",
    what: "Smart forms with source tracking.",
    why: "100% attribution. We know exactly which page generates the money.",
    icon: Target
  }
];

export const EVIDENCE_METRICS = [
  { label: "PageSpeed Score", val: 94, suffix: "/100", icon: Activity, note: "Top Tier Performance", color: "text-green-600" },
  { label: "Load Time", val: 0.4, suffix: "s", prefix: "", icon: Zap, note: "10x Faster", color: "text-[#C5A059]" },
  { label: "Lead Attribution", val: 100, suffix: "%", icon: Database, note: "Total Visibility", color: "text-[#C5A059]" },
  { label: "Sydney Visibility", val: 1, suffix: "st", prefix: "Pg ", icon: MapPin, note: "Indexed & Ranking", color: "text-[#C5A059]" },
  { label: "Core Web Vitals", val: 100, suffix: "%", icon: ShieldCheck, note: "All Passed (Green)", color: "text-green-600" },
  { label: "Page Weight", val: 89, suffix: "%", prefix: "↓ ", icon: ArrowRight, note: "Reduction in Size", color: "text-[#C5A059]" },
];
