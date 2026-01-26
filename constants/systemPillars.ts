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
    body: 'Your website should catch leads, not just look pretty.',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'When someone fills out your website form, their details go straight into your CRM. No copy-pasting. No lost leads.' },
      { title: 'How it helps the whole system', description: 'Your dashboard can only show you what\'s working if the website is tracking where leads come from. This is where the data starts.' },
      { title: 'What you get', description: 'Leads captured while you sleep. You stop losing jobs to competitors who replied faster.' }
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
    body: 'If it\'s not in the CRM, it didn\'t happen.',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'The CRM holds everything the website captures. When you win a deal, it tells the automation to send the invoice.' },
      { title: 'How it helps the whole system', description: 'Your AI assistant reads the CRM to know who\'s calling. Without it, the AI is useless.' },
      { title: 'What you get', description: 'You see exactly where every deal is. No more "I think we followed up on that."' }
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
    body: 'The boring stuff runs itself.',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'When you mark a deal as won in the CRM, the system sends the invoice and contract automatically. No delay.' },
      { title: 'How it helps the whole system', description: 'Data moves between your apps automatically. No more typing the same thing into three different systems.' },
      { title: 'What you get', description: 'Your team stops doing data entry and starts doing real work.' }
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
    body: 'AI that answers your phone at 2am.',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'When your marketing works and leads spike, the AI handles all the calls at once. No missed opportunities.' },
      { title: 'How it helps the whole system', description: 'The AI reads from your CRM before the call and updates it after. Everything stays in sync.' },
      { title: 'What you get', description: 'You handle twice the leads without hiring anyone.' }
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
    body: 'One voice note becomes a month of content.',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'Content brings people to your website. The website captures their details. The CRM tracks them. Automation follows up. Full loop.' },
      { title: 'How it helps the whole system', description: 'Without content, your website has no traffic. Without traffic, the rest of the system has nothing to work with.' },
      { title: 'What you get', description: 'You look like the expert in your field without spending hours on social media.' }
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
    body: 'Training that sticks. No more shelfware.',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'The best CRM in the world is useless if your team won\'t use it. Training protects your investment in everything else.' },
      { title: 'How it helps the whole system', description: 'When your team uses the tools properly, the data stays clean. Clean data means your dashboard tells the truth.' },
      { title: 'What you get', description: 'The tools you paid for actually get used.' }
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
    body: 'Know your real margin right now.',
    systemPurpose: 'Know your numbers.',
    subServices: [
      { title: 'How it connects', description: 'The dashboard pulls data from all 6 other pillars and shows you what\'s working and what\'s not.' },
      { title: 'How it helps the whole system', description: 'It tells you which marketing is paying off, which sales rep is closing, and where the bottlenecks are.' },
      { title: 'What you get', description: 'You know your real margin right now, not next month when the accountant tells you.' }
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
