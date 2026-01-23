import { Globe, Database, Zap, Bot, Video, Users, BarChart3, LucideIcon } from 'lucide-react';
import { SystemPillarDetail } from '../types';
import { SERVICES } from '../constants';

// SystemPage-specific view data that extends SERVICES
const SYSTEM_PILLAR_VIEW_DATA: Record<string, {
  number: string;
  icon: LucideIcon;
  displayTitle: string; // SystemPage-specific display title (e.g., "THE FACE")
  subtitle: string; // SystemPage-specific subtitle (different from SERVICES subtitle)
  subtitleMobile?: string;
  categoryHex: string;
  categoryLabel: string;
  body: string;
  systemPurpose: string;
  subServices: Array<{ title: string; description: string }>;
}> = {
  pillar1: {
    number: '01',
    icon: Globe,
    displayTitle: 'THE FACE',
    subtitle: 'Websites & E-commerce',
    subtitleMobile: 'Websites',
    categoryHex: '#E21E3F',
    categoryLabel: 'GET CLIENTS',
    body: 'Capture every visitor as a trackable lead.',
    systemPurpose: 'Capture demand and structure data.',
    subServices: [
      { title: 'How it connects', description: 'The Face feeds the Brain. Every visitor who fills out a form or makes a purchase gets logged in your CRM automatically.' },
      { title: 'How it helps the whole system', description: 'Without the Face capturing data properly, you can\'t track where leads come from. The dashboard needs this data to show what\'s working.' },
      { title: 'What you get', description: 'You stop losing customers to slower competitors. Leads get captured while you sleep.' }
    ]
  },
  pillar2: {
    number: '02',
    icon: Database,
    displayTitle: 'THE BRAIN',
    subtitle: 'CRM & Lead Tracking',
    subtitleMobile: 'CRM',
    categoryHex: '#E21E3F',
    categoryLabel: 'GET CLIENTS',
    body: 'Know exactly where every opportunity sits.',
    systemPurpose: 'Capture demand and structure data.',
    subServices: [
      { title: 'How it connects', description: 'The Brain stores what the Face captures and tells the Muscle what to do next. When a deal is won, automation kicks in.' },
      { title: 'How it helps the whole system', description: 'The AI assistants (Pillar 4) need CRM data to speak intelligently to customers. Without it, they\'re guessing.' },
      { title: 'What you get', description: 'Pipeline visibility. You stop managing by memory and start managing by data.' }
    ]
  },
  pillar3: {
    number: '03',
    icon: Zap,
    displayTitle: 'THE MUSCLE',
    subtitle: 'Automation',
    subtitleMobile: 'Automation',
    categoryHex: '#E21E3F',
    categoryLabel: 'GET CLIENTS',
    body: 'Act fast without lifting a finger.',
    systemPurpose: 'Capture demand and structure data.',
    subServices: [
      { title: 'How it connects', description: 'When the Brain signals a won deal, the Muscle sends the invoice and contract instantly. No human delay.' },
      { title: 'How it helps the whole system', description: 'Data moves between Marketing, Sales, and Ops in real time. No more copy-paste between three apps.' },
      { title: 'What you get', description: 'Time back. Your team focuses on high-value work, not low-value admin.' }
    ]
  },
  pillar4: {
    number: '04',
    icon: Bot,
    displayTitle: 'THE VOICE',
    subtitle: 'AI Assistants',
    subtitleMobile: 'AI Bots',
    categoryHex: '#C5A059',
    categoryLabel: 'SCALE FASTER',
    body: 'Handle more leads without hiring.',
    systemPurpose: 'Multiply output without multiplying hours.',
    subServices: [
      { title: 'How it connects', description: 'The Voice handles 100 calls at once. When you run a marketing campaign and leads spike, it doesn\'t buckle.' },
      { title: 'How it helps the whole system', description: 'It reads CRM data to know the customer\'s history. After the call, it updates the record automatically.' },
      { title: 'What you get', description: 'Scalability. Double your lead volume without doubling your staff.' }
    ]
  },
  pillar5: {
    number: '05',
    icon: Video,
    displayTitle: 'THE PRESENCE',
    subtitle: 'Content Systems',
    subtitleMobile: 'Content',
    categoryHex: '#C5A059',
    categoryLabel: 'SCALE FASTER',
    body: 'Reach more people on autopilot.',
    systemPurpose: 'Multiply output without multiplying hours.',
    subServices: [
      { title: 'How it connects', description: 'Content drives traffic to your website (Pillar 1), which captures leads, which feeds the CRM, which triggers automation.' },
      { title: 'How it helps the whole system', description: 'High-quality content keeps the top of the funnel full. The AI and automation have leads to process.' },
      { title: 'What you get', description: 'Authority. You become the go-to expert without spending your life on social media.' }
    ]
  },
  pillar6: {
    number: '06',
    icon: Users,
    displayTitle: 'THE SOUL',
    subtitle: 'Team Training',
    subtitleMobile: 'Training',
    categoryHex: '#C5A059',
    categoryLabel: 'SCALE FASTER',
    body: 'Make sure your team actually uses it.',
    systemPurpose: 'Multiply output without multiplying hours.',
    subServices: [
      { title: 'How it connects', description: 'The fastest car is useless if the driver doesn\'t know how to shift gears. The Soul protects your investment in the other 6 pillars.' },
      { title: 'How it helps the whole system', description: 'When the team adopts the tools properly, data is clean and the system works as designed.' },
      { title: 'What you get', description: 'ROI assurance. No more expensive shelfware that nobody uses.' }
    ]
  },
  pillar7: {
    number: '07',
    icon: BarChart3,
    displayTitle: 'THE EYES',
    subtitle: 'Dashboards & Reporting',
    subtitleMobile: 'Dashboards',
    categoryHex: '#1a1a1a',
    categoryLabel: 'SEE CLEARLY',
    body: 'See all your numbers on one screen.',
    systemPurpose: 'Navigate with clarity.',
    subServices: [
      { title: 'How it connects', description: 'The Eyes take data from every other pillar and show you where to steer next. It\'s the feedback loop.' },
      { title: 'How it helps the whole system', description: 'It tells you if Acquisition is profitable, if Velocity is efficient, and what needs fixing.' },
      { title: 'What you get', description: 'Certainty. You sleep better knowing exactly where your profit is coming from.' }
    ]
  }
};

/**
 * Merges SERVICES data with SystemPage-specific view data
 * This creates a single source of truth by combining base service data with view-specific properties
 */
export const getAllPillars = (): SystemPillarDetail[] => {
  return SERVICES.map(service => {
    const viewData = SYSTEM_PILLAR_VIEW_DATA[service.id];
    if (!viewData) {
      throw new Error(`Missing view data for pillar: ${service.id}`);
    }
    
    return {
      ...service,
      number: viewData.number,
      icon: viewData.icon,
      title: viewData.displayTitle, // Use SystemPage-specific display title
      subtitle: viewData.subtitle, // Override with SystemPage-specific subtitle
      subtitleMobile: viewData.subtitleMobile,
      categoryHex: viewData.categoryHex,
      categoryLabel: viewData.categoryLabel,
      body: viewData.body,
      systemPurpose: viewData.systemPurpose,
      subServices: viewData.subServices,
    };
  });
};
