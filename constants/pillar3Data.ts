import { Link, Mail, FileJson, Split, GitMerge, RefreshCw, Workflow, Layers, CheckCircle, MessageSquare, Cpu, HelpCircle, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  linear: {
    id: 'linear',
    label: "TIER 01 / LINEAR",
    hook: "I need things to connect.",
    summary: "Choose this if you are copying and pasting data between emails, spreadsheets, and your phone. You just need System A to talk to System B.",
    sprint: "7-DAY SPRINT",
    specs: ['Zapier / Make.com Setup', 'Form-to-Email Sync', 'Lead Notification SMS', 'Google Sheets Logging'],
    personas: [
      {
        id: "admin",
        icon: Link,
        title: "The Copy-Paster",
        examples: "Solo Founders, Consultants",
        painTitle: "The Data Entry Tax",
        painText: "You spend 5 hours a week moving data from website forms into your phone contacts or a spreadsheet. It's boring, prone to error, and a waste of your talent.",
        solution: "I build Linear Bridges. Someone fills a form? They instantly appear in your contacts, your spreadsheet, and you get a Slack notification. Zero manual entry."
      },
      {
        id: "alert",
        icon: Mail,
        title: "The Late Responder",
        examples: "Trades, Emergency Services",
        painTitle: "Cold Leads",
        painText: "You don't see the email enquiry until 4 hours later. By then, they've hired someone else. Speed is the only advantage you have, and you're losing it.",
        solution: "I build Instant SMS Alerts. When a lead arrives, your phone buzzes with their details immediately. You call them while they are still looking at your website."
      },
      {
        id: "lost",
        icon: FileJson,
        title: "The Paper Shuffler",
        examples: "Event Planners, Admin",
        painTitle: "Lost Details",
        painText: "You rely on your memory or sticky notes to remember client details. Eventually, you forget one, and it costs you the relationship.",
        solution: "I build Digital Logging. Every interaction is automatically saved to a central sheet or database. You never lose a detail again."
      }
    ]
  },
  logic: {
    id: 'logic',
    label: "TIER 02 / LOGIC",
    hook: "I need rules & routing.",
    summary: "Choose this if you have a team or multiple services. You need 'If This, Then That' logic to send the right lead to the right person automatically.",
    sprint: "14-DAY SPRINT",
    specs: ['Advanced Routers', 'Conditional Logic', 'Lead Qualification', 'Round-Robin Assignment'],
    personas: [
      {
        id: "router",
        icon: Split,
        title: "The Traffic Cop",
        examples: "Agencies, Multi-Service Biz",
        painTitle: "Manual Dispatch",
        painText: "You personally read every enquiry to decide if it goes to Sales, Support, or Accounts. You are the bottleneck. If you take a day off, the business freezes.",
        solution: "I build Logic Routers. 'If budget > $10k, alert Senior Sales. If Support, create Ticket.' The system reads the lead and routes it instantly without you."
      },
      {
        id: "filter",
        icon: GitMerge,
        title: "The Qualifier",
        examples: "High-Ticket Sales, Coaches",
        painTitle: "Junk Lead Fatigue",
        painText: "Your calendar is full of people who can't afford you. You waste hours on calls with unqualified prospects because your booking link is open to everyone.",
        solution: "I build Gatekeeper Logic. The system analyzes their answers. If they don't meet criteria, they get a polite email. If they do, they get your calendar."
      },
      {
        id: "fairness",
        icon: RefreshCw,
        title: "The Team Leader",
        examples: "Real Estate, Sales Teams",
        painTitle: "The Fairness Fight",
        painText: "Your sales team complains that 'he got the good lead'. You're manually assigning leads to keep peace, wasting time on politics.",
        solution: "I build Round-Robin Distributors. Leads are assigned strictly in turns, or weighted by performance. Fair, instant, and automatic."
      }
    ]
  },
  engine: {
    id: 'engine',
    label: "TIER 03 / ENGINE",
    hook: "I need fulfillment.",
    summary: "Choose this if you want the system to actually DO the work. Generating contracts, creating invoices, and setting up project folders automatically.",
    sprint: "21-DAY SPRINT",
    specs: ['Document Generation', 'E-Signature Automation', 'Project Onboarding', 'Finance Sync'],
    personas: [
      {
        id: "builder",
        icon: Workflow,
        title: "The Document Creator",
        examples: "Agencies, Contractors",
        painTitle: "Proposal Lag",
        painText: "You finish a call, but it takes you 2 days to write the proposal and contract. The client's excitement fades. You lose the deal to momentum.",
        solution: "I build One-Click Contracts. You click a button in your CRM, and the system generates a PDF proposal, sends it for e-signature, and follows up until signed."
      },
      {
        id: "onboard",
        icon: Layers,
        title: "The Onboarder",
        examples: "SaaS, Service Providers",
        painTitle: "Setup Fatigue",
        painText: "Every new client requires 20 manual steps: create folder, add to Slack, send welcome email, create invoice. It kills the joy of winning a deal.",
        solution: "I build Instant Onboarding. Client signs -> System creates Google Drive folders, Slack channels, Xero invoices, and sends the Welcome Pack. Zero touch."
      },
      {
        id: "finance",
        icon: CheckCircle,
        title: "The Collector",
        examples: "Subscription Biz, Retainers",
        painTitle: "Chasing Money",
        painText: "You spend Fridays chasing unpaid invoices. It's awkward and wastes time. You feel like a debt collector, not a CEO.",
        solution: "I build Automated Accounts Receivable. The system detects an unpaid invoice, sends polite reminders at 3, 7, and 14 days, and alerts you only if they ghost."
      }
    ]
  },
  autonomous: {
    id: 'autonomous',
    label: "TIER 04 / AGENTIC",
    hook: "I need intelligent workers.",
    summary: "Choose this if you want AI Agents to perform complex cognitive tasks—reading emails, drafting responses, and making decisions based on context.",
    sprint: "30+ DAY SPRINT",
    specs: ['OpenAI / Claude API', 'Cognitive Agents', 'Sentiment Analysis', 'Autonomous Support'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Inbox Slave",
        examples: "Founders, Consultants",
        painTitle: "Email Prison",
        painText: "You spend 3 hours a day replying to emails that require 'thinking'. Standard auto-responders won't work because the answers vary.",
        solution: "I build AI Correspondence Agents. The system reads the email, checks your calendar/knowledge base, drafts a perfect reply in your tone, and leaves it as a 'Draft' for you to approve."
      },
      {
        id: "analyst",
        icon: Cpu,
        title: "The Data Reader",
        examples: "Legal, Medical, Research",
        painTitle: "Information Overload",
        painText: "You have to read hundreds of applications or forms to find the 'good ones'. It's tedious, high-focus work that burns you out.",
        solution: "I build Cognitive Classifiers. The AI reads the applications, scores them based on your criteria, extracts key data, and summarizes the top 10% for your review."
      },
      {
        id: "support",
        icon: HelpCircle,
        title: "The 24/7 Rep",
        examples: "E-commerce, Tech Support",
        painTitle: "Support Burnout",
        painText: "Customers ask the same complex questions 24/7. Chatbots are too dumb; humans are too expensive to scale.",
        solution: "I build Autonomous Support Agents. They don't just follow a script; they read your documentation, troubleshoot the user's issue, and solve the ticket without human intervention."
      }
    ]
  }
};
