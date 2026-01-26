import { Mic, Video, Clapperboard, Search, Zap, Globe, Repeat, Share2, Grid, Layout, Terminal, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  synthetic: {
    id: 'synthetic',
    label: "VIDEO WITHOUT CAMERA",
    hook: "I hate being on camera.",
    summary: "Choose this if you know video builds trust, but you hate being on camera. I create videos using your voice and likeness without you ever filming.",
    sprint: "7 DAYS",
    specs: ['Your voice, cloned', 'Videos created without filming', 'You write it, AI makes it', 'No filming required'],
    personas: [
      {
        id: "camera-shy",
        icon: Mic,
        title: "The Camera-Shy Expert",
        examples: "Lawyers, Finance Partners, Consultants",
        painTitle: "The Time vs Video Trade-off",
        painText: "You know video builds trust. But 4 hours of filming is 4 hours of lost billable work. The maths doesn't make sense.",
        solution: "I clone your voice. You send me a script, I produce a video that looks and sounds like you. No camera, no studio, no wasted time."
      },
      {
        id: "founder",
        icon: Video,
        title: "The Stiff Presenter",
        examples: "SaaS CEOs, Civil Engineers",
        painTitle: "The Freeze-Up",
        painText: "You're great at your job. But put a camera on you and you freeze. Your videos come out stiff and awkward.",
        solution: "I create videos using B-roll and your cloned voice. You sound confident every time because you're not actually on camera."
      },
      {
        id: "scale",
        icon: Clapperboard,
        title: "The Bottleneck Founder",
        examples: "Marketing Agencies, News Publishers",
        painTitle: "The Founder's Face Problem",
        painText: "Your marketing team needs content. But the founder is only available for an hour a month. Your channels are starving.",
        solution: "The marketing team writes scripts, the AI creates videos using the founder's voice and likeness. 10x more content, zero founder time."
      }
    ]
  },
  authority: {
    id: 'authority',
    label: "SEO CONTENT",
    hook: "I want to rank on Google.",
    summary: "Choose this if you want to show up when people Google questions about your field. I create content that answers their questions and ranks.",
    sprint: "14 DAYS",
    specs: ['Content organised by topic', 'Videos that rank on Google', 'Blogs created from your expertise', 'Rank for questions in your field'],
    personas: [
      {
        id: "frustrated",
        icon: Search,
        title: "The Buried Expert",
        examples: "Orthopaedic Surgeons, Family Lawyers",
        painTitle: "The Page 3 Problem",
        painText: "You're the best in Sydney. But you're on page 3 of Google. A competitor with half your skill gets the leads because they actually answer questions online.",
        solution: "I record you answering 50 questions your customers actually ask. Google sees you as the authority. You start ranking."
      },
      {
        id: "cowboy",
        icon: Zap,
        title: "The Trust Builder",
        examples: "Solar Installers, Cosmetic Injectors",
        painTitle: "The Industry Sceptic",
        painText: "Your industry is full of dodgy operators. Clients are sceptical before they even call. They need to trust you first.",
        solution: "I create content that answers their fears. When they Google \"solar panel scams\" they find your video explaining what to look out for. Trust before the call."
      },
      {
        id: "educator",
        icon: Globe,
        title: "The Course Creator",
        examples: "RTOs, Training Academies",
        painTitle: "The Hidden Course",
        painText: "You've built a great course. But nobody knows it exists. Your best content is locked behind a paywall that nobody finds.",
        solution: "I extract the best bits and turn them into free content that ranks. People find you, trust you, then buy the full course."
      }
    ]
  },
  distribution: {
    id: 'distribution',
    label: "AUTO-POSTING",
    hook: "I don't have time to post.",
    summary: "Choose this if you have content but don't have time to resize it, caption it, and post it to 5 platforms. I automate all of that.",
    sprint: "7 DAYS",
    specs: ['Captions added automatically', 'Posts to all your platforms', 'Resized for each platform', 'Scheduled automatically'],
    personas: [
      {
        id: "sunday",
        icon: Repeat,
        title: "The Sunday Scheduler",
        examples: "Solo Consultants, Coaches",
        painTitle: "The Sunday Dread",
        painText: "You spend Sunday night scheduling posts, resizing videos, and fighting with hashtags. You're doing an intern's job.",
        solution: "I build a system where you drop one video into a folder. It gets captioned, resized, and scheduled to all platforms automatically. Sundays back."
      },
      {
        id: "franchise",
        icon: Share2,
        title: "The Brand Police",
        examples: "Gym Groups, Retail Chains",
        painTitle: "The Rogue Poster",
        painText: "Your franchisees post whatever they want. Different fonts, different messages, off-brand photos. It looks like 10 different companies.",
        solution: "I build a system where HQ creates the content and it automatically posts to every franchisee's page. One brand, everywhere."
      },
      {
        id: "podcast",
        icon: Mic,
        title: "The Audio-Only Host",
        examples: "Audio-First Creators",
        painTitle: "The Missing Clips",
        painText: "You have a podcast. But without video clips, you're invisible on TikTok and Instagram. Audio doesn't cut through.",
        solution: "I connect your podcast feed to the system. Every episode automatically creates video clips and quote cards for social."
      }
    ]
  },
  terminal: {
    id: 'terminal',
    label: "LANDING PAGES",
    hook: "I need a page for my campaign.",
    summary: "Choose this if you need a landing page for a campaign and can't wait 2 weeks for IT. I build fast, focused pages that convert.",
    sprint: "24 HOURS",
    specs: ['Fast-loading page', 'Loads instantly', 'Takes payments', 'Built to convert ad traffic'],
    personas: [
      {
        id: "ad-spend",
        icon: Grid,
        title: "The Waiting Advertiser",
        examples: "Growth Marketers, E-com Managers",
        painTitle: "The IT Queue",
        painText: "You've got a winning ad idea. IT says the website update takes 2 weeks. Every day you wait, you lose money.",
        solution: "I build a landing page on a subdomain. Live in 24 hours. No IT required. Your ad starts converting tomorrow."
      },
      {
        id: "event",
        icon: Layout,
        title: "The Event Runner",
        examples: "Conference Organizers, Webinar Hosts",
        painTitle: "The Cluttered Path",
        painText: "You're running an event. But your website is cluttered. People click around, get lost, and leave without buying a ticket.",
        solution: "I build a single-page event site. No menu, no distractions. Just the event info and a buy button. Conversion doubles."
      },
      {
        id: "testing",
        icon: Terminal,
        title: "The Idea Validator",
        examples: "Startups, Serial Entrepreneurs",
        painTitle: "The Premature Build",
        painText: "You've got a product idea. But building a full store before you know if it sells is a waste. You need to test it first.",
        solution: "I build a simple page that takes pre-orders. If it sells, you build the business. If not, you've saved months of work."
      }
    ]
  }
};
