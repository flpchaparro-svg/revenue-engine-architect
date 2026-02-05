import { Globe, Database, Zap, Bot, Video, Users, BarChart3, LucideIcon } from 'lucide-react';
import { SystemPillarDetail } from '../types';
import { SERVICES } from '../constants';
import { colors } from './theme';

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
    categoryHex: colors.redSolid,
    categoryLabel: 'GET CLIENTS',
    body: 'Your website is the front door.',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'Your website is the front door. When someone fills out a form, that data goes straight to your CRM. No inbox. No copy-pasting. The lead exists in your system before they\'ve closed the browser.' },
      { title: 'What this unlocks', description: 'Your CRM knows where they came from. Your automation can respond instantly. Your dashboard can track which pages actually bring in money.' }
    ]
  },
  pillar2: {
    number: '02',
    icon: Database,
    displayTitle: 'THE BRAIN',
    subtitle: 'CRM & Lead Tracking',
    subtitleMobile: 'CRM',
    categoryHex: colors.redSolid,
    categoryLabel: 'GET CLIENTS',
    body: 'Your CRM is the memory.',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'Your CRM is the memory. Everything your website catches lands here. When you move a deal forward, automation knows. When you win a job, invoices get sent. When something stalls, you get reminded.' },
      { title: 'What this unlocks', description: 'Your AI assistant can read the CRM before a call and know who\'s ringing. Your dashboard can show pipeline and forecast. Nothing lives in your head anymore.' }
    ]
  },
  pillar3: {
    number: '03',
    icon: Zap,
    displayTitle: 'THE MUSCLE',
    subtitle: 'Automation',
    subtitleMobile: 'Automation',
    categoryHex: colors.redSolid,
    categoryLabel: 'GET CLIENTS',
    body: 'Automation is the speed.',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'Automation is the speed. When a lead comes in, it replies. When a deal closes, it invoices. When someone forgets to follow up, it chases. It watches your CRM and acts without you lifting a finger.' },
      { title: 'What this unlocks', description: 'Your website and CRM become a machine that runs while you sleep. You stop doing admin. Your team stops forgetting things.' }
    ]
  },
  pillar4: {
    number: '04',
    icon: Bot,
    displayTitle: 'THE VOICE',
    subtitle: 'AI Assistants',
    subtitleMobile: 'AI Bots',
    categoryHex: colors.gold,
    categoryLabel: 'SCALE FASTER',
    body: 'AI handles overflow.',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'AI handles overflow. When your content brings traffic and your website captures leads, AI picks up the phone. It reads your CRM to know who\'s calling. After the call, it updates the record. You never touched it.' },
      { title: 'What this unlocks', description: 'You double your lead volume without hiring. Your CRM stays updated without your team doing data entry. Nights and weekends are covered.' }
    ]
  },
  pillar5: {
    number: '05',
    icon: Video,
    displayTitle: 'THE PRESENCE',
    subtitle: 'Content Systems',
    subtitleMobile: 'Content',
    categoryHex: colors.gold,
    categoryLabel: 'SCALE FASTER',
    body: 'Content fills the top of the funnel.',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'Content fills the top of the funnel. More content means more traffic. More traffic means more leads hitting your website. More leads means more work for your CRM, automation, and AI to handle.' },
      { title: 'What this unlocks', description: 'You stay visible without posting every day. Your website has something to catch. The rest of the system has fuel to run on.' }
    ]
  },
  pillar6: {
    number: '06',
    icon: Users,
    displayTitle: 'THE SOUL',
    subtitle: 'Team Training',
    subtitleMobile: 'Training',
    categoryHex: colors.gold,
    categoryLabel: 'SCALE FASTER',
    body: 'Training protects everything else.',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'Training protects everything else. Your CRM only works if your team uses it. Your automation only works if your data is clean. Your AI only works if people trust it. Training makes sure they do.' },
      { title: 'What this unlocks', description: 'The tools you paid for actually get used. Data stays clean. Your dashboard tells the truth. Nothing becomes expensive shelfware.' }
    ]
  },
  pillar7: {
    number: '07',
    icon: BarChart3,
    displayTitle: 'THE EYES',
    subtitle: 'Dashboards & Reporting',
    subtitleMobile: 'Dashboards',
    categoryHex: colors.dark,
    categoryLabel: 'SEE CLEARLY',
    body: 'Your dashboard pulls from everything.',
    systemPurpose: 'Know your numbers.',
    subServices: [
      { title: 'How it connects', description: 'Your dashboard pulls from everything. Website traffic. CRM pipeline. Automation logs. AI call stats. Training adoption. It shows you the whole system on one screen.' },
      { title: 'What this unlocks', description: 'You see problems before they cost you money. You know which marketing works. You stop guessing and start steering.' }
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
