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
    body: "Your team will actually use what I build. Not fight against it.",
    icon: CheckCircle2
  }
];

export const STEPS = [
  {
    id: '01',
    phase: '01 / DIAGNOSE',
    title: 'Find the Leaks',
    text: "Where does your data get typed twice? Where do your leads go cold? Where does profit disappear? I find it.",
    icon: Search,
    color: 'text-red-text',
    borderColor: 'border-red-solid'
  },
  {
    id: '02',
    phase: '02 / DESIGN',
    title: 'Pick the Right Tools',
    text: "No platform lock-in. I pick what fits your business. We design the logic before writing a single line of code.",
    icon: PenTool,
    color: 'text-gold',
    borderColor: 'border-gold'
  },
  {
    id: '03',
    phase: '03 / BUILD',
    title: 'Build in Sprints',
    text: "No 6-month projects that drain your budget. Short sprints. You see progress in weeks, not quarters.",
    icon: Hammer,
    color: 'text-gold',
    borderColor: 'border-gold'
  },
  {
    id: '04',
    phase: '04 / HANDOVER',
    title: 'Make It Stick',
    text: "Software fails when people don't use it. Training materials, support, and check-ins until your team actually adopts it.",
    icon: Flag,
    color: 'text-gold',
    borderColor: 'border-gold'
  }
];
