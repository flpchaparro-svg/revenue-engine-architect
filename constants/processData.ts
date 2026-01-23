import { Search, PenTool, Hammer, Flag, CheckCircle2 } from 'lucide-react';

export const PRINCIPLES = [
  {
    id: 'p1',
    label: 'RULE 01 / CLARITY',
    title: 'Clarity Over Complexity',
    body: "If I can't explain it to you at a pub, it's too complex. You'll understand every part of your system, and if you don't, I haven't done my job.",
    icon: Search
  },
  {
    id: 'p2',
    label: 'RULE 02 // EMPATHY',
    title: 'People Before Technology',
    body: "If a new tool makes your team's day harder, it's failed. I build systems that save time, not add more admin.",
    icon: CheckCircle2
  }
];

export const STEPS = [
  {
    id: '01',
    phase: 'PHASE I',
    title: 'Find the Leaks',
    text: "I don't guess. I look for the repetitive tasks burning your team, the stuff that eats 15 hours a week. I find where data gets typed twice, where leads go cold, and where profit disappears.",
    icon: Search,
    color: 'text-[#E21E3F]',
    borderColor: 'border-[#E21E3F]'
  },
  {
    id: '02',
    phase: 'PHASE II',
    title: 'Pick the Right Tools',
    text: "I'm not locked into HubSpot or Salesforce, so I find what actually fits your business. We design the logic before we write a single line of code.",
    icon: PenTool,
    color: 'text-[#C5A059]',
    borderColor: 'border-[#C5A059]'
  },
  {
    id: '03',
    phase: 'PHASE III',
    title: 'Ship Fast & Iterate',
    text: "No 6-month projects that drain your budget. I build in sprints so you start seeing progress in weeks, not quarters.",
    icon: Hammer,
    color: 'text-[#C5A059]',
    borderColor: 'border-[#C5A059]'
  },
  {
    id: '04',
    phase: 'PHASE IV',
    title: 'Make It Stick',
    text: "Software fails when people don't use it. I build the training materials and run the workshops so your team actually prefers the new way.",
    icon: Flag,
    color: 'text-[#C5A059]',
    borderColor: 'border-[#C5A059]'
  }
];
