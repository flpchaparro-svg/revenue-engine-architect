import { Link, Mail, FileText, Split, GitMerge, RefreshCw, Workflow, Layers, CheckCircle, MessageSquare, Cpu, HelpCircle, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  linear: {
    id: 'linear',
    label: "LINEAR",
    hook: "I need things to connect.",
    summary: "You're copying and pasting data between apps. Email, spreadsheet, phone contacts. System A doesn't talk to System B.",
    sprint: "7 DAYS",
    specs: ['App connections via Make.com', 'Data sync', 'Notifications', 'Basic triggers'],
    personas: [
      {
        id: "admin",
        icon: Link,
        title: "The Copy-Paster",
        examples: "Solo Founders, Consultants",
        painTitle: "The Data Entry Tax",
        painText: "You spend 5 hours a week moving data from website forms into your phone contacts or a spreadsheet. Boring, prone to error, and a waste of your talent.",
        solution: "Linear bridges. Someone fills a form? They instantly appear in your contacts, your spreadsheet, and you get a Slack notification. One entry. Three places."
      },
      {
        id: "alert",
        icon: Mail,
        title: "The Late Responder",
        examples: "Trades, Emergency Services",
        painTitle: "Delayed Replies",
        painText: "Someone enquires at 9pm. You see it at 8am. By then, they've moved on.",
        solution: "Instant auto-reply. They get acknowledgment in seconds. You follow up when you're ready."
      },
      {
        id: "lost",
        icon: FileText,
        title: "The Paper Shuffler",
        examples: "Event Planners, Admin",
        painTitle: "Manual Documents",
        painText: "You type the same client details into quotes, invoices, and contracts. Over and over.",
        solution: "One entry, documents auto-populate. Client name, address, scope. All filled automatically."
      }
    ]
  },
  logic: {
    id: 'logic',
    label: "LOGIC",
    hook: "I need rules and routing.",
    summary: "Not every lead is the same. Some need urgent calls. Some need nurturing. You need smart routing.",
    sprint: "14 DAYS",
    specs: ['Conditional logic', 'Lead scoring', 'Smart routing', 'Escalation rules'],
    personas: [
      {
        id: "router",
        icon: Split,
        title: "The Overwhelmed Responder",
        examples: "Agencies, Multi-Service Biz",
        painTitle: "Everything Feels Urgent",
        painText: "You treat every enquiry the same. But a $50k project and a $500 job shouldn't get the same response time.",
        solution: "Lead scoring. Big deal? Instant SMS to you. Small enquiry? Auto-email and queue for later."
      },
      {
        id: "filter",
        icon: GitMerge,
        title: "The Manual Router",
        examples: "High-Ticket Sales, Coaches",
        painTitle: "Wrong Person Gets It",
        painText: "Leads land in a shared inbox. Someone claims it. Sometimes two people claim it. Sometimes nobody does.",
        solution: "Smart routing. Sydney enquiry goes to the Sydney rep. Commercial job goes to commercial team. Automatically."
      },
      {
        id: "fairness",
        icon: RefreshCw,
        title: "The Approval Bottleneck",
        examples: "Real Estate, Sales Teams",
        painTitle: "Everything Waits for You",
        painText: "Every quote needs your sign-off. You're the bottleneck. Deals wait while you're in meetings.",
        solution: "Auto-approval for quotes under $5k. Only big deals need your eyes. You focus on what matters."
      }
    ]
  },
  engine: {
    id: 'engine',
    label: "ENGINE",
    hook: "I need full workflows.",
    summary: "You need end-to-end automation. Lead comes in, gets qualified, gets quoted, gets invoiced. Minimal human touch.",
    sprint: "21 DAYS",
    specs: ['Multi-step workflows', 'CRM to accounting sync', 'Document generation', 'Handoff automation'],
    personas: [
      {
        id: "builder",
        icon: Workflow,
        title: "The Workflow Builder",
        examples: "Agencies, Contractors",
        painTitle: "Too Many Steps",
        painText: "A deal closes. Someone updates the CRM. Someone creates a project. Someone sends an invoice. Someone notifies the team. Four people, four chances to forget.",
        solution: "One trigger, everything happens. Deal closes. Project created. Invoice sent. Team notified. Zero manual steps."
      },
      {
        id: "onboard",
        icon: Layers,
        title: "The Invoice Chaser",
        examples: "SaaS, Service Providers",
        painTitle: "Late Payments",
        painText: "You send invoices. You forget to follow up. You check the bank in 60 days and wonder why they haven't paid.",
        solution: "Auto-reminders at day 7, 14, 21. Escalation at 30 days. You never chase an invoice manually again."
      },
      {
        id: "finance",
        icon: CheckCircle,
        title: "The Handoff Fumbler",
        examples: "Subscription Biz, Retainers",
        painTitle: "Lost in Transition",
        painText: "Sales closes a deal. Operations doesn't know. Client waits. Everyone looks bad.",
        solution: "Automatic handoff. Deal closes, operations gets the brief, client gets onboarding email. Same minute."
      }
    ]
  },
  agentic: {
    id: 'agentic',
    label: "AGENTIC",
    hook: "I need intelligent workers.",
    summary: "Beyond simple automations. You need AI that reads, thinks, and acts. Intelligent workers that make decisions.",
    sprint: "30+ DAYS",
    specs: ['AI decision-making', 'Document parsing', 'Adaptive workflows', 'Continuous learning'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Document Processor",
        examples: "Founders, Consultants",
        painTitle: "Manual Extraction",
        painText: "You receive purchase orders by email. Someone reads them, types the details into your system. Hours every week.",
        solution: "AI reads the PDF, extracts the data, creates the order in your system. You just approve."
      },
      {
        id: "analyst",
        icon: Cpu,
        title: "The Exception Handler",
        examples: "Legal, Medical, Research",
        painTitle: "Edge Cases",
        painText: "Your automations break when something unexpected happens. You end up fixing things manually anyway.",
        solution: "Adaptive logic. AI spots the exception, flags it, suggests a fix. It learns from every edge case."
      },
      {
        id: "support",
        icon: HelpCircle,
        title: "The Night Shift",
        examples: "E-commerce, Tech Support",
        painTitle: "After-Hours Gaps",
        painText: "Business happens 24/7. Your team works 9-5. Opportunities slip through overnight.",
        solution: "Intelligent workers that operate around the clock. They qualify, respond, and escalate. You sleep."
      }
    ]
  }
};
