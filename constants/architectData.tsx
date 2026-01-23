import React from 'react';
import { 
  FlaskConical, Award, Wrench, Target, 
  Coffee, Globe, Code2, Database, Zap 
} from 'lucide-react';

export const ARCHITECT_CONTENT = {
  architect: {
    label: '/ THE ARCHITECT',
    accent: 'text-[#E21E3F]',
    // Storing JSX directly in data allows for rich text formatting
    headline: (
      <>
        I build the systems that give your team <br className="hidden md:block" />
        <span className="italic font-serif text-[#C5A059]">their time back.</span>
      </>
    ),
    subhead: "Most consultants sell ideas. I build infrastructure. The kind that runs while you sleep and stops your best people from drowning in admin.",
    timeline: [
      { id: 'a1', icon: FlaskConical, title: 'Custom Processes, Not Templates', text: "Real solutions are engineered for the specific situation — never copy-pasted." },
      { id: 'a2', icon: Award, title: 'High Standards, No Shortcuts', text: "In chemistry, if you miss a step, the reaction fails. Same applies to business systems." },
      { id: 'a3', icon: Wrench, title: 'Enterprise-Grade', text: "I use the same tools as large agencies — HubSpot, Make.com — but for real-world businesses." },
      { id: 'a4', icon: Target, title: 'Freedom to Do Your Actual Job', text: "If your sales team is doing data entry, something is broken. I fix that." }
    ],
    credentials: [
      { label: '24+ Certifications', icon: Award },
      { label: 'HubSpot Expert', icon: Database },
      { label: 'Based in Sydney', icon: Globe },
      { label: 'Same-Day Response', icon: Zap }
    ]
  },
  human: {
    label: '/ THE ARCHITECT',
    accent: 'text-[#C5A059]',
    headline: (
      <>
        From lab coats <br className="md:hidden" /> to spreadsheets <br className="hidden md:block" />
        <span className="italic font-serif text-[#C5A059]">to freedom.</span>
      </>
    ),
    subhead: "I've been the person doing the admin at midnight. Running payroll, chasing invoices. That's why I build systems that actually work for real people.",
    timeline: [
      { id: 'h1', icon: FlaskConical, title: 'Started in the Lab', text: "I trained as a chemist in Chile. Every project needed a custom process — no templates, just problem-solving." },
      { id: 'h2', icon: Coffee, title: 'Built My Own Business', text: "I opened a café in Santiago. I did everything: hiring, payroll, marketing. I know what it costs to run a business." },
      { id: 'h3', icon: Globe, title: 'Managed Across Cultures', text: "I ran a fitness franchise in Southeast Asia. I learned to adapt systems to people — not force people into systems." },
      { id: 'h4', icon: Code2, title: 'Now I Build for Others', text: "After studying marketing automation and business analytics, I put it all together. I build the systems I wish I'd had when I was running my café — so you can focus on the work that matters." }
    ]
  }
};
