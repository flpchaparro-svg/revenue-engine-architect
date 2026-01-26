import { MessageSquare, Filter, Magnet, Users, UserPlus, FileText, Calendar, Phone, RefreshCw, LucideIcon } from 'lucide-react';
import { Persona, Tier } from './pillar1Data';

export const TIERS: Record<string, Tier> = {
  capture: {
    id: 'capture',
    label: "CAPTURE",
    hook: "I keep losing leads.",
    summary: "Choose this if leads come in but disappear into your inbox. You need a system that catches every enquiry in one place.",
    sprint: "5 DAYS",
    specs: ['CRM setup (HubSpot or Pipedrive)', 'Track where leads come from', 'Automatic reply to every enquiry', 'Get notified when a lead comes in'],
    personas: [
      {
        id: "inbox",
        icon: MessageSquare,
        title: "The Inbox Juggler",
        examples: "Solo Consultants, Small Agencies",
        painTitle: "The Buried Enquiry",
        painText: "You run your business from your inbox. Last month you forgot to reply to an enquiry worth $5k because it got buried under newsletters.",
        solution: "I set up a CRM. Every lead goes into one place. You can see who's enquired, when, and whether you've replied. Nothing gets buried."
      },
      {
        id: "blind",
        icon: Filter,
        title: "The Ad Spender",
        examples: "Local Services, Tradies",
        painTitle: "The Guessing Game",
        painText: "You spend $1,000 a month on ads. Someone calls. You have no idea if they came from the ad or a referral. You're guessing where your money goes.",
        solution: "I set up tracking so you know exactly where each lead came from. Google Ads, Facebook, referral, whatever. You stop guessing."
      },
      {
        id: "slow",
        icon: Magnet,
        title: "The Monday Replier",
        examples: "Real Estate, Finance Brokers",
        painTitle: "The Weekend Delay",
        painText: "Someone enquires on Saturday. You reply Monday. By then, they've already hired your competitor.",
        solution: "I set up instant auto-replies. They enquire, they get a text and email within 10 seconds. You look responsive even when you're offline."
      }
    ]
  },
  nurture: {
    id: 'nurture',
    label: "NURTURE",
    hook: "My leads go cold.",
    summary: "Choose this if people enquire but don't buy straight away. You need a system that keeps in touch until they're ready.",
    sprint: "10 DAYS",
    specs: ['5-email follow-up sequence', 'Separate lists for different types', 'Newsletter setup', 'Flag hot leads automatically'],
    personas: [
      {
        id: "educator",
        icon: Users,
        title: "The Trusted Advisor",
        examples: "Coaches, Course Creators",
        painTitle: "The First-Call Flop",
        painText: "You get on a call and try to sell. But they don't trust you yet. They ghost you. You wasted an hour on someone who was never going to buy.",
        solution: "I build an email sequence that sends your best advice over 2 weeks. By the time they get on a call, they already trust you."
      },
      {
        id: "lister",
        icon: UserPlus,
        title: "The Dusty List",
        examples: "E-commerce, Authors",
        painTitle: "The Ignored Database",
        painText: "You have 5,000 emails in your list. You never email them because you don't know what to say. That's money sitting there doing nothing.",
        solution: "I set up a re-engagement sequence. People who haven't opened in 90 days get a \"still interested?\" email. Dead leads come back to life."
      },
      {
        id: "segment",
        icon: FileText,
        title: "The Blaster",
        examples: "Multi-Service Agencies",
        painTitle: "The Unsubscribe",
        painText: "You send your whole list the same email. Half of them don't care about that topic. They unsubscribe.",
        solution: "I set up segments based on what people click. If they clicked \"SEO\", they get SEO emails. Relevant emails don't get unsubscribes."
      }
    ]
  },
  pipeline: {
    id: 'pipeline',
    label: "PIPELINE",
    hook: "I forget to follow up.",
    summary: "Choose this if you're managing deals worth thousands and things fall through the cracks. You need to see where every deal is and get reminded to follow up.",
    sprint: "14 DAYS",
    specs: ['See all your deals on one screen', 'Automatic reminders to follow up', 'Contracts sent automatically', 'See what\'s closing and what\'s stuck'],
    personas: [
      {
        id: "closer",
        icon: Calendar,
        title: "The Forgetter",
        examples: "Solar Sales, Enterprise SaaS",
        painTitle: "The Missed Callback",
        painText: "You promised to call Mike on Tuesday. You forgot. Mike signed with your competitor. That's $10k gone because of a missed reminder.",
        solution: "I set up automatic reminders. The CRM tells you to call Mike. If you don't, it reminds you again. Nothing slips."
      },
      {
        id: "manager",
        icon: Phone,
        title: "The Pipeline Blind",
        examples: "Teams of 3+ Reps",
        painTitle: "The \"It's Going Well\"",
        painText: "You ask your sales rep how things are going. They say \"good.\" You have no idea what that means in dollars.",
        solution: "I set up a visual pipeline. You see every deal, its value, and its stage. \"Good\" becomes \"$450k closing next month.\""
      },
      {
        id: "admin",
        icon: FileText,
        title: "The Contract Dragger",
        examples: "Construction, Events",
        painTitle: "The Proposal Delay",
        painText: "You win the deal. Then you spend 45 minutes copying details into a Word doc to send the contract. By then, the excitement has faded.",
        solution: "I set up one-click contracts. You mark a deal as won, the system generates the contract and sends it. 45 minutes becomes 4 seconds."
      }
    ]
  },
  revops: {
    id: 'revops',
    label: "OPERATIONS",
    hook: "My team works in silos.",
    summary: "Choose this if your departments don't talk to each other. Sales doesn't tell delivery. Marketing doesn't know what's closing. You need one source of truth.",
    sprint: "21 DAYS",
    specs: ['Connect your departments', 'See the full customer journey', 'Know which marketing is working', 'Clean up your messy data'],
    personas: [
      {
        id: "silo",
        icon: RefreshCw,
        title: "The Handover Mess",
        examples: "Mid-Market Companies ($5M+)",
        painTitle: "The Angry Customer",
        painText: "Sales closes the deal on Friday. Nobody tells delivery. The customer waits 3 days wondering what's happening. They're already annoyed before you start.",
        solution: "I connect sales to delivery. When a deal closes, the project is automatically created and assigned. No more \"did anyone tell the team?\""
      },
      {
        id: "leak",
        icon: Filter,
        title: "The Churn Fighter",
        examples: "SaaS, Membership Sites",
        painTitle: "The Revolving Door",
        painText: "Marketing brings 100 leads. Sales closes 20. But you lose 10 customers out the back door. You're filling a leaky bucket.",
        solution: "I track why customers leave and feed that back to marketing. You stop paying to acquire people who were never going to stay."
      },
      {
        id: "data",
        icon: Users,
        title: "The Duplicate Nightmare",
        examples: "Financial Services, Insurance",
        painTitle: "The Three Johns",
        painText: "You've got \"John Smith\" in Xero, \"J. Smith\" in HubSpot, and \"John\" in your help desk. Is that 3 customers or 1? You have no idea.",
        solution: "I clean up your data and make the CRM the single source of truth. One customer, one record, everywhere."
      }
    ]
  }
};
