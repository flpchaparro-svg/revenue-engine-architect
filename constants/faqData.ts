// =============================================================================
// FAQ DATA — UPDATED STRUCTURE
// =============================================================================
// 
// STRATEGY:
// - System Page (SystemPage.tsx) → Universal Q&A (12 questions)
// - Pillar Pages → Pillar-specific Q&A ONLY (5 questions each)
// 
// This avoids duplicate content and puts the right questions in the right place.
// =============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// =============================================================================
// SYSTEM PAGE QUESTIONS
// =============================================================================
// These appear ONLY on SystemPage.tsx (The System page)
// They answer the big "should I do this?" questions
// =============================================================================

export const systemPageFAQs: FAQ[] = [
  {
    id: 'need-all-pillars',
    question: 'Do I need all 7 pillars?',
    answer: `No. Most businesses start with just one or two. Each pillar is designed to work standalone — you pick what you need now, and add more later if it makes sense.

Think of it like renovating a house — you don't have to redo the kitchen, bathroom, AND bedroom at once. Start where the pain is worst.`
  },
  {
    id: 'which-pillar-first',
    question: 'Which pillar should I start with?',
    answer: `It depends on where you're losing the most time or money:

• Losing leads? Start with Pillar 01 (Website) or Pillar 02 (CRM)
• Drowning in admin? Start with Pillar 03 (Automation)
• Missing calls or enquiries? Start with Pillar 04 (AI Assistants)
• No time for marketing? Start with Pillar 05 (Content Systems)
• Team not using your tools? Start with Pillar 06 (Training)
• Flying blind on numbers? Start with Pillar 07 (Dashboards)

Not sure? Book a call and I'll help you figure it out.`
  },
  {
    id: 'combine-services',
    question: 'Can I combine multiple services into one project?',
    answer: `Yes, and it's often smarter to do so. For example, if you need a new website AND a CRM to capture leads, building them together means they're connected from day one — no awkward integration later.

I'll tell you honestly if combining makes sense or if you should do one first.`
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical project take?',
    answer: `Most projects are delivered in sprints:

• Quick wins: 3-7 days (lead capture, basic automations)
• Core builds: 7-14 days (websites, CRM setup, AI bots)
• Complex projects: 21-30+ days (custom builds, multi-system integration)

I don't do 6-month projects that drain your budget before you see results. You'll see progress in weeks, not quarters.`
  },
  {
    id: 'pricing',
    question: 'How much does this cost?',
    answer: `Every project is different, so I don't list prices. But I'll give you a fixed quote after a 15-minute call — no "estimate ranges" that triple later.

Generally, quick sprints (3-7 days) are accessible for most small businesses. Larger builds (14-30+ days) are an investment, but designed to pay for themselves in saved time or new revenue.

I'll tell you honestly if the ROI doesn't make sense for your situation.`
  },
  {
    id: 'who-does-work',
    question: 'Who actually does the work?',
    answer: `I do. Felipe Chaparro. One person, not a faceless agency with junior handoffs.

You talk directly to the person building your system. No account managers in between, no explaining the same thing twice to different people.

I use automation and AI to deliver what agencies need a whole team for — but the thinking, the strategy, and the quality control is all me.`
  },
  {
    id: 'what-you-provide',
    question: 'What do I need to provide?',
    answer: `I do the heavy lifting. You provide:

• Access to your existing systems (logins, admin rights)
• 1-2 hours for a kickoff call to understand your business
• Quick responses to questions as we build
• Feedback during the review stages

You don't need to prepare documents, write briefs, or project manage. That's my job.`
  },
  {
    id: 'existing-systems',
    question: 'Will this work with my existing tools?',
    answer: `Almost certainly yes. I'm tool-agnostic — I don't force you into HubSpot or Salesforce if something else fits better. I work with whatever you've got (Xero, MYOB, Shopify, WordPress, Google Sheets, you name it) and build bridges between them.

If something truly can't connect, I'll tell you upfront before you spend money.`
  },
  {
    id: 'after-project',
    question: 'What happens after the project is done?',
    answer: `You own everything. I hand over:

• Full access to all systems I build
• Training videos so your team knows how to use it
• Documentation for future reference

I'm not trying to lock you in. If you want ongoing support, we can arrange that. If you want to run it yourself, you'll be fully equipped.`
  },
  {
    id: 'burned-before',
    question: "I've been burned by tech projects before. How is this different?",
    answer: `I get it. Most tech projects fail because:

1. The scope creeps and the budget explodes
2. The team doesn't use the new system
3. You get locked into a vendor who disappears

Here's how I'm different:
• Fixed sprints: Scope is locked, price is locked
• Adoption built-in: I don't leave until your team actually uses it
• You own everything: No lock-in, no ongoing fees unless you want support`
  },
  {
    id: 'small-test',
    question: 'Can we start with a small test project?',
    answer: `Absolutely. In fact, I recommend it.

Start with something contained — a lead capture form, a simple automation, a quick dashboard. See how I work, how fast things move, and whether the results are real.

If it works, we do more. If it doesn't, you've risked very little.`
  },
  {
    id: 'how-systems-connect',
    question: 'How do the 3 systems work together?',
    answer: `Think of it as a flow:

• GET CLIENTS (Pillars 1-3): Brings people in and captures their details
• SCALE FASTER (Pillars 4-6): Multiplies your output without multiplying your hours
• SEE CLEARLY (Pillar 7): Shows you what's working and what's not

You don't need all three to start. But when they're connected, your business runs smoother — leads flow in, work gets done automatically, and you see the results in real-time.`
  }
];


// =============================================================================
// PILLAR-SPECIFIC QUESTIONS
// =============================================================================
// These appear ONLY on their respective pillar page
// They answer the "tell me more about THIS service" questions
// =============================================================================

export const pillarFAQs = {
  // -------------------------------------------------------------------------
  // PILLAR 1: WEBSITES & E-COMMERCE
  // File: Pillar1.tsx | View ID: pillar1
  // -------------------------------------------------------------------------
  pillar1: [
    {
      id: 'p1-tiers',
      question: "What's the difference between your website tiers?",
      answer: `It comes down to complexity and timeline:

• Velocity (7 days): Simple service business site — you need to be found and capture leads fast
• Retail (14 days): E-commerce with inventory, payments, shipping logic
• Performance (21 days): High-performance sites for businesses where speed and security matter
• Flagship (30+ days): Custom experiences — 3D configurators, cinematic design, bespoke builds

I'll help you pick the right tier based on your business, not upsell you.`
    },
    {
      id: 'p1-mobile',
      question: 'Will my website work properly on mobile?',
      answer: `Yes — and not as an afterthought. I design mobile-first because that's where most of your visitors are (often 70%+).

Your site will load fast, look good, and work properly on phones. If someone fills out a form on their phone at 11pm, it works.`
    },
    {
      id: 'p1-seo',
      question: 'Do you handle SEO?',
      answer: `I build with SEO foundations baked in — fast loading, proper structure, local business tags, mobile-friendly.

I don't do ongoing SEO campaigns (content writing, link building, monthly reporting). But if you need that, I can recommend specialists who do it properly.`
    },
    {
      id: 'p1-accounting',
      question: 'Can my website connect to Xero / MYOB?',
      answer: `Yes. That's one of the most valuable integrations I build.

When someone buys from your site, the order can flow directly into your accounting system — no re-typing, no manual invoices. For e-commerce especially, this saves hours every week.`
    },
    {
      id: 'p1-platform',
      question: 'Do you use WordPress, Shopify, or something else?',
      answer: `It depends on your needs:

• WordPress: Great for service businesses, content-heavy sites, flexibility
• Shopify: Best for e-commerce, inventory management, payments
• Headless (Next.js/Astro): For high-performance, security-critical, or custom experiences

I don't push one platform because I get commission — I recommend what fits your business.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 2: CRM & LEAD TRACKING
  // File: Pillar2.tsx | View ID: pillar2
  // -------------------------------------------------------------------------
  pillar2: [
    {
      id: 'p2-team-hated',
      question: "My team hated our last CRM. What's different?",
      answer: `Most CRM setups fail because they add MORE work instead of removing it.

I design systems where data enters automatically (from forms, emails, calls) so your team isn't typing things twice. When the CRM saves them time instead of costing it, they actually use it.

Plus, I include training. Your team will know exactly what to do — no guessing.`
    },
    {
      id: 'p2-xero',
      question: 'Can you connect the CRM to Xero / MYOB?',
      answer: `Yes. That's one of the most common automations I build.

When a deal closes in your CRM, it can automatically create an invoice in Xero — no re-typing names, amounts, or details. One source of truth, no double-entry.`
    },
    {
      id: 'p2-which-crm',
      question: 'Which CRM do you recommend?',
      answer: `I'm tool-agnostic, but my go-to is usually HubSpot for small-to-medium businesses. It's powerful, has a free tier, and integrates with almost everything.

For larger or more complex needs, we might look at Salesforce, Pipedrive, or industry-specific tools. I'll recommend what fits your situation, not what pays me the biggest commission.`
    },
    {
      id: 'p2-staff-leaves',
      question: 'What happens to our data if a staff member quits?',
      answer: `This is exactly why CRM matters. If leads live in someone's personal notebook or email, they leave when that person does.

With a proper CRM, every lead, every conversation, every deal is logged in the system. Staff come and go — your data stays.`
    },
    {
      id: 'p2-migration',
      question: 'Can you migrate my existing contacts from spreadsheets?',
      answer: `Yes. Data migration is part of the setup.

I'll help you consolidate contacts from wherever they live — spreadsheets, old systems, email exports — and clean them up before importing. You start with a tidy database, not a mess.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 3: AUTOMATION
  // File: Pillar3.tsx | View ID: pillar3
  // -------------------------------------------------------------------------
  pillar3: [
    {
      id: 'p3-what-automate',
      question: 'What kinds of things can you actually automate?',
      answer: `Anything repetitive. Common examples:

• Sending follow-up emails after an enquiry
• Creating invoices when a job is marked complete
• Notifying your team when a high-value lead comes in
• Syncing data between systems (CRM → accounting → project management)
• Sending appointment reminders via SMS
• Generating quotes from form submissions

If you're doing the same task more than 5 times a week, it's probably automatable.`
    },
    {
      id: 'p3-breaks',
      question: 'What happens if the automation breaks?',
      answer: `It can — which is why I build with monitoring and alerts.

If something fails (like an API connection drops), you'll know immediately. Most issues are quick fixes. And because you own the system, you can hire anyone to maintain it — including me if you want ongoing support.`
    },
    {
      id: 'p3-what-first',
      question: 'How do I know which task to automate first?',
      answer: `We start with the highest-impact, lowest-risk automation:

• High impact: Saves the most time or prevents the most errors
• Low risk: Won't break critical business processes if something goes wrong

Usually that's something like auto-replies to enquiries, invoice generation, or data sync between two systems. Quick wins build confidence.`
    },
    {
      id: 'p3-robotic-emails',
      question: 'Will automated emails sound generic and robotic?',
      answer: `Not if they're written properly. I write email sequences that sound like a human wrote them — because the content comes from you, I just automate the delivery.

We can personalise based on name, company, what page they visited, how they enquired. The recipient won't know it was automated.`
    },
    {
      id: 'p3-tools',
      question: 'What automation tools do you work with?',
      answer: `My go-to stack is:

• Make.com (formerly Integromat) — Visual workflow builder
• Zapier — Simple integrations
• n8n — For more complex, custom workflows
• Native integrations — Direct connections built into tools like HubSpot

I pick the tool that fits the job. Sometimes a $20/month Zapier plan is enough. Sometimes you need something more powerful.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 4: AI ASSISTANTS
  // File: Pillar4.tsx | View ID: pillar4
  // -------------------------------------------------------------------------
  pillar4: [
    {
      id: 'p4-chatbot-vs-ai',
      question: "What's the difference between a chatbot and an AI assistant?",
      answer: `Old chatbots followed scripts: "Press 1 for sales, press 2 for support." They felt robotic because they were.

AI assistants understand language. They can answer "What time do you open on weekends?" even if you never programmed that exact question. They learn from your FAQ, your website, and your business rules.

The difference is frustrating vs helpful.`
    },
    {
      id: 'p4-book-appointments',
      question: 'Can the AI actually book real appointments?',
      answer: `Yes. It connects to your calendar (Google, Outlook, Calendly, etc.) and books real appointments in real-time.

A customer asks "Can I see you Tuesday afternoon?" — the AI checks your availability and confirms the booking. No back-and-forth, no manual entry.`
    },
    {
      id: 'p4-phone-calls',
      question: 'Can I have an AI that answers my phone?',
      answer: `Yes — this is one of the most powerful applications.

An AI voice agent can answer your phone 24/7, handle FAQs, qualify leads, and book appointments. It sounds human (not robotic) and hands off to a real person when needed.

It's like having a receptionist who never sleeps, never gets sick, and never puts someone on hold.`
    },
    {
      id: 'p4-cant-answer',
      question: "What happens if someone asks something the AI doesn't know?",
      answer: `It hands off gracefully. I build "escape routes" so the AI knows when to say:

• "Let me connect you with [Name] who can help with that"
• "I'll have someone call you back within [timeframe]"
• "Here's a form to submit your question for a human response"

The AI isn't trying to fake knowledge — it knows its limits.`
    },
    {
      id: 'p4-train-ai',
      question: 'How does the AI learn about my specific business?',
      answer: `I feed it your:

• FAQ document (or I create one from your answers)
• Website content
• Product/service information
• Common questions you get asked
• Business rules (hours, pricing, policies)

We test it together, find gaps, and refine. Most businesses are "launch-ready" within a few days of setup.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 5: CONTENT SYSTEMS
  // File: Pillar5.tsx | View ID: pillar5
  // -------------------------------------------------------------------------
  pillar5: [
    {
      id: 'p5-hate-camera',
      question: 'Do I have to be on camera for this to work?',
      answer: `No. Content systems work with whatever you're comfortable with:

• Voice notes: You talk, I turn it into blogs and social posts
• Written notes: You send bullet points, I expand them
• Interviews: I ask questions, you answer, we create from that

The goal is extracting your expertise with minimum friction. If you hate video, we won't do video.`
    },
    {
      id: 'p5-voice-style',
      question: 'Can you create content that sounds like me?',
      answer: `Yes — that's the whole point. AI can now clone your voice (for audio) and writing style (for text) so content sounds like you, not a generic marketing agency.

We'll calibrate the tone based on examples you like. If something doesn't sound right, we adjust.`
    },
    {
      id: 'p5-how-much',
      question: 'How much content can this system produce?',
      answer: `From a single 30-minute interview or voice note, we can create:

• 1 long-form blog post
• 5-10 social media posts
• 1 email newsletter
• 1 YouTube script or podcast episode
• Quote graphics and snippets

One input → many outputs. That's the "supply chain" approach to content.`
    },
    {
      id: 'p5-replace-marketing',
      question: 'Does this replace my marketing team or agency?',
      answer: `It depends on what they do:

• Content creation: This system handles that
• Strategy and planning: You still need a human brain for that
• Paid ads: Separate skillset, not covered here
• Social engagement: Responding to comments is still human work

Think of this as a content production line, not a full marketing department.`
    },
    {
      id: 'p5-platforms',
      question: 'Which social platforms can this post to?',
      answer: `Most major platforms:

• LinkedIn, Facebook, Instagram, Twitter/X
• YouTube (videos and shorts)
• TikTok
• Your blog/website
• Email newsletters

We set up auto-posting so you approve once and it distributes everywhere.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 6: TEAM TRAINING
  // File: Pillar6.tsx | View ID: pillar6
  // -------------------------------------------------------------------------
  pillar6: [
    {
      id: 'p6-resists-change',
      question: 'My team hates new software. How do you get them to use it?',
      answer: `Resistance usually comes from fear, not laziness. People worry they'll look stupid, or that the new system is just more work.

I handle this by:
• Making it easy: Bite-sized videos, not 3-hour training sessions
• Showing the benefit: "This saves you 2 hours a week" not "This is the new process"
• Supporting the rollout: I don't disappear after the training — I check that it sticks

Change is hard. But people adopt tools that make their life easier, and resist tools that don't. I build for adoption.`
    },
    {
      id: 'p6-who-trained',
      question: 'Do you train everyone, or just the manager?',
      answer: `Everyone who needs to use the system gets trained.

Usually that means:
• Managers get the full picture (strategy, reporting, admin)
• Staff get their specific workflows (what they do day-to-day)
• You get documentation to onboard future hires

Nobody gets left behind wondering "what button do I click?"`
    },
    {
      id: 'p6-format',
      question: 'Is training live, or videos, or documents?',
      answer: `Mix of all three:

• Short videos (2-5 min): For specific tasks, rewatchable anytime
• Live walkthrough: For initial rollout, Q&A, edge cases
• Documentation: Step-by-step guides for reference

I don't do 3-hour webinars. Bite-sized is better. Your team can watch a 3-minute video when they're stuck, not schedule a meeting.`
    },
    {
      id: 'p6-new-hires',
      question: 'What happens when I hire someone new after the project?',
      answer: `They get the same training materials:

• Video library
• Documentation
• Access to the knowledge base

You can onboard new staff without re-hiring me. The training is yours to keep and reuse.`
    },
    {
      id: 'p6-how-long',
      question: 'How long until my team is comfortable with new systems?',
      answer: `For simple tools: 1-2 weeks of regular use.
For complex systems: 4-6 weeks with ongoing support.

The key is starting with the minimum they need to do their job, then adding features over time. Don't overwhelm them with everything on day one.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 7: DASHBOARDS & REPORTING
  // File: Pillar7.tsx | View ID: pillar7
  // -------------------------------------------------------------------------
  pillar7: [
    {
      id: 'p7-vs-accounting',
      question: 'How is a dashboard different from reports in Xero or MYOB?',
      answer: `Accounting software shows you money in, money out. That's history.

A dashboard shows you:
• Where leads are coming from (so you know what marketing works)
• How long deals take to close (so you spot bottlenecks)
• Who your best customers are (so you focus on them)
• Forecasts based on your pipeline (so you plan ahead)

It's the difference between looking in the rearview mirror and looking through the windshield.`
    },
    {
      id: 'p7-mobile',
      question: 'Can I check my dashboard from my phone?',
      answer: `Yes. I build dashboards that work on desktop, tablet, and mobile.

You can check your business health from anywhere — on the train, at a café, on holiday (if you must). Real-time numbers, no laptop required.`
    },
    {
      id: 'p7-data-sources',
      question: 'What systems can feed into the dashboard?',
      answer: `Almost anything:

• CRM (HubSpot, Salesforce, Pipedrive)
• Accounting (Xero, MYOB, QuickBooks)
• E-commerce (Shopify, WooCommerce)
• Marketing (Google Analytics, Meta Ads, Mailchimp)
• Spreadsheets (Google Sheets, Excel)
• Custom databases

If it has an API or exports data, it can feed your dashboard.`
    },
    {
      id: 'p7-update-frequency',
      question: 'Is the data live, or does it update once a day?',
      answer: `It depends on the source and your needs:

• Real-time: For sales pipelines, website traffic, critical metrics
• Hourly: For most business metrics
• Daily: For slower-moving data like financial summaries

We decide together what needs to be instant vs what can be daily. More frequent updates = higher complexity/cost.`
    },
    {
      id: 'p7-role-views',
      question: 'Can I have different views for different people?',
      answer: `Yes. Role-based dashboards are common:

• Owner/CEO: High-level metrics, cash flow, overall health
• Sales manager: Pipeline, deals, rep performance
• Marketing: Lead sources, campaign performance
• Operations: Workload, capacity, delivery metrics

Everyone sees what they need — no more, no less.`
    }
  ]
};


// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Get FAQs for System Page (SystemPage.tsx)
export const getSystemPageFAQs = () => systemPageFAQs;

// Get FAQs for a specific Pillar Page
export const getPillarFAQs = (pillarId: string): FAQ[] => {
  const pillarKey = pillarId as keyof typeof pillarFAQs;
  return pillarFAQs[pillarKey] || [];
};


// =============================================================================
// SEO: Generate FAQPage Schema
// =============================================================================

export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\n/g, ' ').replace(/•/g, '-')
      }
    }))
  };
};
