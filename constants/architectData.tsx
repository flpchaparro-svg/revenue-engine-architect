import React from 'react';
import { 
  FlaskConical, Award, Wrench, Target, 
  Coffee, Globe, Code2, Database, Zap 
} from 'lucide-react';

export const ARCHITECT_CONTENT = {
  architect: {
    label: '/ THE ARCHITECT',
    accent: 'text-[#9A1730]',
    // Storing JSX directly in data allows for rich text formatting
    headline: (
      <>
        One person. <br className="hidden md:block" />
        <span className="italic font-serif text-[#8B6914]">Ten person output.</span>
      </>
    ),
    subhead: "No account managers. No junior handoffs. No endless meetings. You talk directly to the person building your system. I use automation and AI to deliver what agencies charge a team for.",
    timeline: [
      { id: 'a1', icon: FlaskConical, title: 'Custom Processes, Not Templates', text: "Real solutions are engineered for the specific situation — never copy-pasted." },
      { id: 'a2', icon: Award, title: 'High Standards, No Shortcuts', text: "In chemistry, if you miss a step, the reaction fails. Same applies to business systems." },
      { id: 'a3', icon: Wrench, title: 'Enterprise-Grade', text: "I use the same tools as large agencies — HubSpot, Make.com — but for real-world businesses." },
      { id: 'a4', icon: Target, title: 'Freedom to Do Your Actual Job', text: "If your sales team is doing data entry, something is broken. I fix that." }
    ],
    credentials: [
      { label: '24+ Certifications', icon: Award },
      { label: 'HubSpot Certified', icon: Database },
      { label: 'Sydney Based', icon: Globe },
      { label: 'Same-Day Response', icon: Zap }
    ]
  },
  human: {
    label: '/ THE HUMAN',
    accent: 'text-[#8B6914]',
    headline: (
      <>
        I've run businesses. <br className="hidden md:block" />
        <span className="italic font-serif text-[#8B6914]">Not just consulted them.</span>
      </>
    ),
    subhead: "Before I built systems for others, I ran my own café, managed international franchises, and worked factory floors. I know what it's like to chase invoices at midnight. I don't give you theory. I give you what actually works.",
    timeline: [
      { id: 'h1', icon: FlaskConical, title: 'Trained as a Chemist', text: "In Chile, I learned that every problem needs a custom process. No templates. Just problem-solving." },
      { id: 'h2', icon: Coffee, title: 'Ran My Own Café', text: "I did everything — hiring, payroll, marketing, chasing invoices. I know what running a business actually costs." },
      { id: 'h3', icon: Globe, title: 'Managed a Franchise', text: "I ran a fitness franchise in Southeast Asia. I learned to adapt systems to people, not force people into systems." },
      { id: 'h4', icon: Code2, title: 'Now I Build Systems', text: "I build the systems I wish I'd had when I was running my café. So you can focus on the work that matters." }
    ]
  }
};
