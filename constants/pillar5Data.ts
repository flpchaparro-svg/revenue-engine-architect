import { Mic, Video, Clapperboard, Search, Zap, Globe, Repeat, Share2, Grid, Layout, Terminal, LucideIcon } from 'lucide-react';
import { Persona, Tier } from '../types';

export const TIERS: Record<string, Tier> = {
  synthetic: {
    id: 'synthetic',
    label: "SYNTHETIC STUDIO",
    hook: "I hate being on camera.",
    summary: "Choose this if you are a 'Time-Poor' Expert who wants the authority of video but hates the 'Production Circus' of cameras, lights, and retakes.",
    sprint: "7-DAY SPRINT",
    specs: ['AI Voice Cloning', 'Video Synthesis', 'Script-to-Video', 'No-Camera Production'],
    personas: [
      {
        id: "camera-shy",
        icon: Mic,
        title: "The Camera-Shy Expert",
        examples: "Lawyers, Finance Partners, Consultants",
        painTitle: "The Opportunity Cost",
        painText: "You know video drives trust, but you 'don't have time to look perfect' for a camera. If you spend 4 hours filming, you lose $2,000 in billable time.",
        solution: "I clone your voice and visual persona. You send me a text script, and my studio produces a video that looks and sounds like you in a professional setting. You never leave your desk."
      },
      {
        id: "founder",
        icon: Video,
        title: "The Awkward Founder",
        examples: "SaaS CEOs, Civil Engineers",
        painTitle: "The Performance Anxiety",
        painText: "You are brilliant at code or engineering, but freeze up when the red light turns on. Your videos look stiff and awkward, damaging your brand.",
        solution: "We remove the camera. We use a 'Synthetic Avatar' or high-end B-roll with your cloned voice. You sound confident and articulate every single time, without the anxiety."
      },
      {
        id: "scale",
        icon: Clapperboard,
        title: "The Content Scaling Team",
        examples: "Marketing Agencies, News Publishers",
        painTitle: "Production Bottleneck",
        painText: "You need to post daily, but your founder is only available for 1 hour a month. Your social channels are starving for content.",
        solution: "We decouple the face from the time. The marketing team writes the scripts, the AI generates the videos using the founder's likeness. Volume goes up 10x, founder effort stays at zero."
      }
    ]
  },
  authority: {
    id: 'authority',
    label: "AUTHORITY MATRIX",
    hook: "I'm invisible on Google.",
    summary: "Choose this if you are a Specialist (Medical, Legal, Trade) and want to dominate search results by answering client fears with video precision.",
    sprint: "14-DAY SPRINT",
    specs: ['Topic Cluster Protocol', 'Video-Led SEO', 'Blog Automation', 'Search Dominance'],
    personas: [
      {
        id: "frustrated",
        icon: Search,
        title: "The Frustrated Specialist",
        examples: "Orthopaedic Surgeons, Family Lawyers",
        painTitle: "The Expertise Void",
        painText: "You are the best in Sydney, but you are on page 3 of Google. You watch competitors with 1/10th of your skill get all the leads because they have a better FAQ page.",
        solution: "I turn your answers into a 'Knowledge Graph.' We record you answering 50 niche questions. Google sees you as the ultimate authority and has no choice but to rank you #1."
      },
      {
        id: "cowboy",
        icon: Zap,
        title: "The Cowboy Fighter",
        examples: "Solar Installers, Cosmetic Injectors",
        painTitle: "The Trust Deficit",
        painText: "Your industry is full of cowboys. Clients are scared. They need reassurance before they even call you.",
        solution: "We build an 'Education Wall.' When they search for 'Solar Risks,' they find your video explaining exactly what to watch out for. You win the trust before you even speak to them."
      },
      {
        id: "educator",
        icon: Globe,
        title: "The Industry Educator",
        examples: "RTOs, Training Academies",
        painTitle: "The Content Black Hole",
        painText: "You have great content inside your course, but nobody sees it on the outside. Your marketing doesn't reflect the quality of your product.",
        solution: "We extract your curriculum into public-facing SEO assets. We give the market a 'Free Sample' of your genius that leads directly to a purchase."
      }
    ]
  },
  distribution: {
    id: 'distribution',
    label: "DISTRIBUTION GRID",
    hook: "Posting takes forever.",
    summary: "Choose this if you have the content but are drowning in the 'Admin' of resizing, captioning, and uploading to 5 different platforms.",
    sprint: "7-DAY SPRINT",
    specs: ['Auto-Captioning', 'Multi-Channel Posting', 'Asset Resizing', 'Schedule Automation'],
    personas: [
      {
        id: "sunday",
        icon: Repeat,
        title: "The Sunday Grind Victim",
        examples: "Solo Consultants, Coaches",
        painTitle: "The Burnout Loop",
        painText: "You spend your entire Sunday evening fighting with Instagram hashtags and resizing videos instead of resting. You feel like a social media intern.",
        solution: "I build a 'Drop Zone.' You drop one video into Google Drive. The Grid automatically captions it, resizes it for TikTok/LinkedIn, and schedules it. You get your Sunday back."
      },
      {
        id: "franchise",
        icon: Share2,
        title: "The Franchise Coordinator",
        examples: "Gym Groups, Retail Chains",
        painTitle: "Brand Dilution",
        painText: "Your franchisees are posting low-quality, off-brand content because they don't have the right assets. It looks messy.",
        solution: "We centralize distribution. HQ drops the high-quality assets into the engine, and it pushes them to the local pages of every franchisee automatically. Perfect brand consistency."
      },
      {
        id: "podcast",
        icon: Mic,
        title: "The Podcaster",
        examples: "Audio-First Creators",
        painTitle: "The Visibility Gap",
        painText: "You have a great audio podcast, but no video clips for social media. You are invisible on TikTok and Instagram Reels.",
        solution: "We connect your RSS feed to the Grid. Every new episode automatically triggers the creation of 'Audiograms' and quote cards for social media."
      }
    ]
  },
  terminal: {
    id: 'terminal',
    label: "CONVERSION TERMINAL",
    hook: "I need a page fast.",
    summary: "Choose this if you have a new offer or ad campaign and need a high-speed landing page live in 24 hours, without waiting for your IT team.",
    sprint: "24-HOUR LAUNCH",
    specs: ['Framer/Webflow Dev', 'High-Speed Load', 'Stripe Integration', 'Ad-Optimised'],
    personas: [
      {
        id: "ad-spend",
        icon: Grid,
        title: "The Ad-Spend Optimiser",
        examples: "Growth Marketers, E-com Managers",
        painTitle: "The DevOps Wall",
        painText: "You have a winning ad idea, but IT says they can't update the website for 2 weeks. You are losing money every day you wait.",
        solution: "I build a 'Speedboat' page on a subdomain. It launches in 24 hours, loads instantly, and is designed purely for conversion. You don't need IT's permission."
      },
      {
        id: "event",
        icon: Layout,
        title: "The Event Runner",
        examples: "Conference Organizers, Webinar Hosts",
        painTitle: "The Ticket Lag",
        painText: "You are running an event, but your main website is too cluttered to sell tickets effectively. People get lost in the menu.",
        solution: "We deploy a single-page 'Terminal.' No menu, no distractions. Just the event details and a Stripe checkout. Conversion rates double immediately."
      },
      {
        id: "testing",
        icon: Terminal,
        title: "The Offer Tester",
        examples: "Startups, Serial Entrepreneurs",
        painTitle: "The Validation Trap",
        painText: "You want to test a new product idea, but building a whole Shopify store feels like overkill. You need to know if it sells *now*.",
        solution: "We launch a 'Validation Terminal.' A simple, beautiful page that takes pre-orders. If it sells, you build the business. If not, you saved months of work."
      }
    ]
  }
};
