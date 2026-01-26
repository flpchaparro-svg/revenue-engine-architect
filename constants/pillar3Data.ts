import { Link, Mail, FileJson, Split, GitMerge, RefreshCw, Workflow, Layers, CheckCircle, MessageSquare, Cpu, HelpCircle, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  linear: {
    id: 'linear',
    label: "CONNECT",
    hook: "I want my apps to talk to each other.",
    summary: "Choose this if you're copying and pasting between apps. A lead comes in, you type it into a spreadsheet, then into your phone. I connect them so it happens automatically.",
    sprint: "7 DAYS",
    specs: ['App connections (Zapier / Make)', 'Forms sync to your email', 'Get a text when a lead comes in', 'Log everything to a spreadsheet'],
    personas: [
      {
        id: "admin",
        icon: Link,
        title: "The Copy-Paster",
        examples: "Solo Founders, Consultants",
        painTitle: "The Copy-Paste Life",
        painText: "You spend 5 hours a week copying data from website forms into a spreadsheet. It's boring, you make mistakes, and you're too expensive for this work.",
        solution: "I connect your form to your spreadsheet and your phone. Someone fills it out, everything updates automatically. No copying."
      },
      {
        id: "alert",
        icon: Mail,
        title: "The Slow Replier",
        examples: "Trades, Emergency Services",
        painTitle: "The 4-Hour Gap",
        painText: "An enquiry comes in at 2pm. You see it at 6pm. By then, they've already hired someone else.",
        solution: "I set it up so your phone buzzes the moment a lead comes in. You call them while they're still on your website."
      },
      {
        id: "lost",
        icon: FileJson,
        title: "The Memory Reliant",
        examples: "Event Planners, Admin",
        painTitle: "The Forgotten Detail",
        painText: "You rely on memory and sticky notes to track client details. One day you forget something important. The client is not happy.",
        solution: "I set up automatic logging. Every interaction saves to a central place. Nothing gets lost."
      }
    ]
  },
  logic: {
    id: 'logic',
    label: "LOGIC",
    hook: "I need rules and routing.",
    summary: "Choose this if you have a team and need leads to go to the right person automatically. If it's a big job, it goes to senior. If it's support, it goes to the helpdesk.",
    sprint: "14 DAYS",
    specs: ['Smart routing rules', 'If-this-then-that rules', 'Filter out bad leads', 'Fair distribution to your team'],
    personas: [
      {
        id: "router",
        icon: Split,
        title: "The Bottleneck",
        examples: "Agencies, Multi-Service Biz",
        painTitle: "The Human Router",
        painText: "Every enquiry comes to you. You read it, decide where it goes, forward it. If you take a day off, nothing moves.",
        solution: "I set up rules. \"If budget is over $10k, send to senior sales. If it's a support question, create a ticket.\" The system routes, not you."
      },
      {
        id: "filter",
        icon: GitMerge,
        title: "The Tyre-Kicker Magnet",
        examples: "High-Ticket Sales, Coaches",
        painTitle: "The Unqualified Calendar",
        painText: "Your calendar is full of calls with people who can't afford you. Your booking link is open to anyone. You're wasting hours.",
        solution: "I add qualifying questions to your booking form. If they don't meet your criteria, they don't get on your calendar."
      },
      {
        id: "fairness",
        icon: RefreshCw,
        title: "The Peacekeeper",
        examples: "Real Estate, Sales Teams",
        painTitle: "The \"He Got The Good One\"",
        painText: "Your sales team fights about who got the good lead. You're manually assigning leads to keep the peace. It's a waste of your time.",
        solution: "I set up round-robin distribution. Leads go to the team in order, or weighted by performance. Fair, automatic, no arguments."
      }
    ]
  },
  engine: {
    id: 'engine',
    label: "AUTOMATE",
    hook: "I want things to happen automatically.",
    summary: "Choose this if you want the system to actually do the work. Send the invoice, create the project folder, trigger the onboarding email. All automatic.",
    sprint: "21 DAYS",
    specs: ['Automatic document creation', 'Contracts sent for signature automatically', 'Folders and tasks created automatically', 'Invoices created automatically'],
    personas: [
      {
        id: "builder",
        icon: Workflow,
        title: "The Proposal Dragger",
        examples: "Agencies, Contractors",
        painTitle: "The 2-Day Delay",
        painText: "You finish a great call. You're excited. Then it takes you 2 days to write the proposal. By then, the client has cooled off.",
        solution: "I set up one-click proposals. You click a button, the system generates the document, sends it, and follows up. 2 days becomes 2 minutes."
      },
      {
        id: "onboard",
        icon: Layers,
        title: "The Setup Slave",
        examples: "SaaS, Service Providers",
        painTitle: "The 20-Step Start",
        painText: "Every new client means 20 manual steps. Create folder. Add to Slack. Send welcome email. Create invoice. It takes an hour and kills your energy.",
        solution: "I connect everything. Client signs, and the folder appears, the invoice is created, and the welcome email is sent. Zero manual steps."
      },
      {
        id: "finance",
        icon: CheckCircle,
        title: "The Invoice Chaser",
        examples: "Subscription Biz, Retainers",
        painTitle: "The Friday Chase",
        painText: "You spend every Friday chasing unpaid invoices. It's awkward, it wastes time, and you didn't start a business to be a debt collector.",
        solution: "I set up automatic payment reminders. 3 days overdue, they get a nudge. 7 days, another one. You only hear about it if they ghost."
      }
    ]
  },
  autonomous: {
    id: 'autonomous',
    label: "AI WORKERS",
    hook: "I need AI that thinks and acts.",
    summary: "Choose this if you need AI that actually thinks. Reading emails, drafting replies, sorting applications. Not just \"if this then that\" but real decision-making.",
    sprint: "30+ DAYS",
    specs: ['AI that reads and writes', 'AI that makes decisions', 'AI that understands tone', 'AI that handles support tickets'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Email Prisoner",
        examples: "Founders, Consultants",
        painTitle: "The 3-Hour Inbox",
        painText: "You spend 3 hours a day replying to emails. Auto-responders don't work because every email needs a different answer.",
        solution: "I build an AI that reads your emails, checks your calendar and knowledge base, and drafts replies in your voice. You just approve and send."
      },
      {
        id: "analyst",
        icon: Cpu,
        title: "The Application Reviewer",
        examples: "Legal, Medical, Research",
        painTitle: "The 200 Applications",
        painText: "You've got 200 applications to review. Reading them takes 10 hours. Your eyes glaze over. You miss good ones.",
        solution: "I build an AI that reads all 200, scores them against your criteria, and gives you the top 20 to review. 10 hours becomes 1."
      },
      {
        id: "support",
        icon: HelpCircle,
        title: "The Support Burnout",
        examples: "E-commerce, Tech Support",
        painTitle: "The Same Question",
        painText: "Customers ask the same questions over and over. Chatbots can't handle the complexity. Humans are too expensive to run 24/7.",
        solution: "I build AI support that actually reads your documentation, understands the question, and solves it. Not a script. Real thinking."
      }
    ]
  }
};
