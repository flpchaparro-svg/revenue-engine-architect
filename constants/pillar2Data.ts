import { MessageSquare, Filter, Magnet, Users, UserPlus, FileText, Calendar, Phone, RefreshCw, LucideIcon } from 'lucide-react';
import { Persona, Tier } from './pillar1Data';

export const TIERS: Record<string, Tier> = {
  capture: {
    id: 'capture',
    label: "TIER 01 / CAPTURE",
    hook: "Stop losing leads.",
    summary: "Choose this if you have a website but no idea where your leads go. We replace generic contact forms with a database that tracks every person.",
    sprint: "5-DAY SPRINT",
    specs: ['HubSpot / Pipedrive Setup', 'Lead Source Tracking', 'Auto-Reply Email', 'Admin Notification'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Inbox Manager",
        examples: "Solo Consultants, Small Agencies",
        painTitle: "The Gmail Black Hole",
        painText: "You run your business from an inbox. You forget to reply to a $5k lead because it got buried under newsletters. You have no list, no history, just email chaos.",
        solution: "I install a CRM. Every lead from your site goes into a structured database, not your inbox. You see exactly who they are and if you've replied. No more lost money."
      },
      {
        id: "blind",
        icon: Filter,
        title: "The Blind Advertiser",
        examples: "Local Services, Tradies",
        painTitle: "Unknown ROI",
        painText: "You spend $1,000 on ads but don't know if the phone rang because of the ad or a referral. You're guessing with your wallet.",
        solution: "I build Source Tracking. The CRM tells you: 'John Smith came from Google Ads'. Now you know exactly which marketing channel pays your bills."
      },
      {
        id: "slow",
        icon: Magnet,
        title: "The Slow Responder",
        examples: "Real Estate, Finance Brokers",
        painTitle: "The Speed to Lead Fail",
        painText: "A lead emails you on Saturday. You reply on Monday. They already hired someone else. Speed kills competition, and you're too slow.",
        solution: "I build Instant Acknowledgment. They get a professional SMS and Email 10 seconds after submitting. You look 'always on' even when you're off."
      }
    ]
  },
  nurture: {
    id: 'nurture',
    label: "TIER 02 / NURTURE",
    hook: "Warm them up.",
    summary: "Choose this if you have leads who aren't ready to buy yet. We build automated email sequences that educate them until they are ready to pay.",
    sprint: "10-DAY SPRINT",
    specs: ['5-Email Nurture Sequence', 'Audience Segmentation', 'Newsletter Architecture', 'Lead Scoring'],
    personas: [
      {
        id: "educator",
        icon: Users,
        title: "The Expert",
        examples: "Coaches, Course Creators",
        painTitle: "The Cold Pitch",
        painText: "You try to sell on the first call, but they don't trust you yet. You waste hours explaining your methodology to cold leads who ghost you.",
        solution: "I build a 'Value Sequence'. The system sends them your best advice for 2 weeks before you ever ask for a sale. When they finally book, they already trust you."
      },
      {
        id: "lister",
        icon: UserPlus,
        title: "The List Builder",
        examples: "E-commerce, Authors",
        painTitle: "The Dead List",
        painText: "You have 5,000 emails in Mailchimp but you never email them because you don't know what to say. Your biggest asset is gathering dust.",
        solution: "I build Automated Re-Engagement. The system identifies who hasn't opened an email in 90 days and wakes them up with a specific offer. Dead leads become cash."
      },
      {
        id: "segment",
        icon: FileText,
        title: "The Generalist",
        examples: "Multi-Service Agencies",
        painTitle: "The Wrong Message",
        painText: "You send a 'Website Design' offer to a client who only wants 'SEO'. They unsubscribe because you're irrelevant. You're blasting, not targeting.",
        solution: "I build Behavioural Segmentation. If they click on 'SEO', they get the SEO sequence. Relevance protects your open rates."
      }
    ]
  },
  pipeline: {
    id: 'pipeline',
    label: "TIER 03 / PIPELINE",
    hook: "Manage the deal.",
    summary: "Choose this if you have a sales team (or just yourself) managing high-ticket deals. We visualize your revenue and automate the follow-up tasks.",
    sprint: "14-DAY SPRINT",
    specs: ['Visual Deal Board', 'Task Automation', 'Contract Integration', 'Sales Reporting'],
    personas: [
      {
        id: "closer",
        icon: Calendar,
        title: "The Busy Closer",
        examples: "Solar Sales, Enterprise SaaS",
        painTitle: "The Follow-Up Fail",
        painText: "You have 20 active deals. You promised to call Mike back on Tuesday, but you forgot. Mike signs with a competitor. Disorganization cost you $10k.",
        solution: "I build Automated Task Queues. The CRM reminds you: 'Call Mike'. If you don't call, it nags you. No deal slips through the cracks."
      },
      {
        id: "manager",
        icon: Phone,
        title: "The Sales Manager",
        examples: "Teams of 3+ Reps",
        painTitle: "The Black Box",
        painText: "You ask your rep 'How's the pipeline?' and they say 'Good'. You have no data. You can't forecast revenue on 'Good'.",
        solution: "I build Visual Pipelines. You see every deal, its value, and its stage on one screen. 'Good' becomes '$450k weighted pipeline closing next month'."
      },
      {
        id: "admin",
        icon: FileText,
        title: "The Paperwork Hater",
        examples: "Construction, Events",
        painTitle: "Contract Hell",
        painText: "You spend 45 minutes copy-pasting details into a Word doc contract. It's boring, slow, and prone to errors.",
        solution: "I build One-Click Contracting. Move a deal to 'Won', and the system generates the PDF, pre-fills the data, and sends it for e-signature. 45 minutes becomes 4 seconds."
      }
    ]
  },
  revops: {
    id: 'revops',
    label: "TIER 04 / REVOPS",
    hook: "Align the business.",
    summary: "Choose this if your Marketing, Sales, and Support teams are fighting. We connect your systems so data flows seamlessly from 'Click' to 'Cash'.",
    sprint: "21-DAY SPRINT",
    specs: ['Cross-Department Sync', 'Customer Journey Mapping', 'Attribution Modelling', 'Data Hygiene'],
    personas: [
      {
        id: "silo",
        icon: RefreshCw,
        title: "The Siloed Director",
        examples: "Mid-Market Companies ($5M+)",
        painTitle: "The Handover Drop",
        painText: "Sales closes the deal, but forgets to tell Onboarding. The new client sits in silence for 3 days and gets angry. Your internal disconnect hurts the customer.",
        solution: "I build Department Handshakes. When a deal closes, a project is auto-created in Asana for the delivery team. Sales stops emailing Operations. The system does the talking."
      },
      {
        id: "leak",
        icon: Filter,
        title: "The Leak Hunter",
        examples: "SaaS, Membership Sites",
        painTitle: "The Retention Leak",
        painText: "Marketing brings in 100 leads, Sales closes 20, but Churn loses 10. You're filling a bucket with a hole in it.",
        solution: "I build Lifecycle Feedback Loops. When a customer churns, the reason is tagged and fed back to Marketing. You stop paying to acquire bad-fit customers."
      },
      {
        id: "data",
        icon: Users,
        title: "The Data Purist",
        examples: "Financial Services, Insurance",
        painTitle: "Dirty Data",
        painText: "You have 'John Smith' in Xero, 'J. Smith' in HubSpot, and 'John' in your support desk. You can't get a single view of the customer.",
        solution: "I build Data Normalization. We treat the CRM as the 'Single Source of Truth', pushing clean data to finance and support. One customer, one record."
      }
    ]
  }
};
