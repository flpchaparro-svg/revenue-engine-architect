import { 
  ShieldCheck, Activity, Database, ArrowRight, Zap, 
  MapPin, Globe, AlertTriangle, Target 
} from 'lucide-react';

export const TERMINAL_LINES = [
  "> Audited old site... [4.2s load, 42/100 PageSpeed]",
  "> Migrated domain: .com → .com.au... [DONE]",
  "> Rebuilt site from scratch... [DONE]",
  "> Added Sydney location tags... [DONE]",
  "> Compressed images: 8.2MB → 0.9MB... [89% SMALLER]",
  "> Enabled fast global delivery... [DONE]",
  "> Final PageSpeed score... [94/100]",
  "> Load time: 4.2s → 0.4s... [10x FASTER]",
  "> Launched... [LIVE]",
  "> Status: COMPLETE"
];

export const PROBLEM_ITEMS = [
  { 
    icon: Activity, 
    title: "Speed Was Killing Conversions", 
    metric: "4.2 seconds", 
    label: "Load Time", 
    desc: "Google says anything over 3 seconds loses half your mobile visitors. They were losing leads before the page even loaded.",
    impact: "Lost contracts."
  },
  { 
    icon: Globe, 
    title: "No Local Visibility", 
    metric: "Near Zero", 
    label: "Sydney Ranking", 
    desc: "The .com domain had no location signals. Google thought they were an American company, not a Sydney business.",
    impact: "Invisible market."
  },
  { 
    icon: AlertTriangle, 
    title: "Amateur Perception", 
    metric: "Template", 
    label: "Trust Score", 
    desc: "For a company protecting $3.2B in assets, the site looked like a weekend project. First impressions were killing them.",
    impact: "Failed due diligence."
  },
  { 
    icon: Database, 
    title: "No Lead Capture", 
    metric: "0%", 
    label: "Attribution", 
    desc: "Enquiries went to a generic inbox. No tracking, no automation. They had no idea which marketing was working.",
    impact: "Marketing blindness."
  }
];

export const SOLUTION_ITEMS = [
  {
    title: "Domain Migration",
    what: "Migrated to .com.au with proper redirects.",
    why: "Google now knows this is an Australian business. Essential for local search.",
    icon: MapPin
  },
  {
    title: "Performance Architecture",
    what: "Custom-built. No WordPress bloat.",
    why: "Page weight dropped 89%. Load time went from 4.2 seconds to 0.4 seconds.",
    icon: Zap
  },
  {
    title: "Local SEO Schema",
    what: "Added Sydney location tags throughout.",
    why: "Google now knows exactly where they operate. Local searches find them.",
    icon: Globe
  },
  {
    title: "Lead Intelligence",
    what: "Smart forms with source tracking.",
    why: "They now know exactly which marketing is generating enquiries.",
    icon: Target
  }
];

export const EVIDENCE_METRICS = [
  { label: "PageSpeed Score", val: 94, suffix: "/100", icon: Activity, note: "Top 5% of websites", color: "text-green-600" },
  { label: "Load Time", val: 0.4, suffix: "s", prefix: "", icon: Zap, note: "Was 4.2s. Now 0.4s.", color: "text-[#C5A059]" },
  { label: "Lead Attribution", val: 100, suffix: "%", icon: Database, note: "Every enquiry tracked", color: "text-[#C5A059]" },
  { label: "Sydney Visibility", val: 1, suffix: "", prefix: "Page ", icon: MapPin, note: "Ranking for Sydney searches", color: "text-[#C5A059]" },
  { label: "Core Web Vitals", val: 100, suffix: "%", icon: ShieldCheck, note: "All Google speed tests passed", color: "text-green-600" },
  { label: "Page Weight", val: 89, suffix: "%", prefix: "-", icon: ArrowRight, note: "Site is 89% lighter", color: "text-[#C5A059]" },
];
