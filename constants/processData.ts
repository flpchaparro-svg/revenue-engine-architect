import { Search, PenTool, Hammer, Flag, CheckCircle2 } from 'lucide-react';

export const PRINCIPLES = [
  {
    id: 'p1',
    label: '01 / CLARITY',
    title: "If I can't explain it at a pub, it's too complex.",
    body: "You'll understand every part of your system. If you don't, I haven't done my job.",
    icon: Search
  },
  {
    id: 'p2',
    label: '02 / PEOPLE',
    title: "If a tool makes your team's day harder, it's failed.",
    body: "I build systems that save time, not add admin. Your team will actually use what I build.",
    icon: CheckCircle2
  }
];

export const STEPS = [
  {
    id: '01',
    phase: '01 / DIAGNOSE',
    title: 'Find the Leaks',
    text: "I don't guess. I look for the repetitive tasks burning your team. Where data gets typed twice. Where leads go cold. Where profit disappears.",
    icon: Search,
    color: 'text-red-text',
    borderColor: 'border-red-solid'
  },
  {
    id: '02',
    phase: '02 / DESIGN',
    title: 'Pick the Right Tools',
    text: "I'm not locked into any platform. I pick what actually fits your business. We design the logic before writing a single line of code.",
    icon: PenTool,
    color: 'text-gold',
    borderColor: 'border-gold'
  },
  {
    id: '03',
    phase: '03 / BUILD',
    title: 'Build in Sprints',
    text: "No 6-month projects that drain your budget. I build in short sprints. You see progress in weeks, not quarters.",
    icon: Hammer,
    color: 'text-gold',
    borderColor: 'border-gold'
  },
  {
    id: '04',
    phase: '04 / HANDOVER',
    title: 'Make It Stick',
    text: "Software fails when people don't use it. I build training materials and support your team until they actually adopt it.",
    icon: Flag,
    color: 'text-gold',
    borderColor: 'border-gold'
  }
];
