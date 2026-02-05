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
    answer: `No. Most start with one or two.

Each pillar works alone. You pick what you need. Add more later. Think of it like a renovation. You don't redo the whole house at once. Start with the pain.`
  },
  {
    id: 'which-pillar-first',
    question: 'Which pillar should I start with?',
    answer: `Start where you lose money.

- Losing leads? Fix the Website or CRM.
- Drowning in admin? Automation.
- Missing calls? AI Assistants.
- No time for marketing? Content.
- Team confused? Training.
- Flying blind? Dashboards.

If you aren't sure, book a call. We will figure it out.`
  },
  {
    id: 'combine-services',
    question: 'Can I combine services into one project?',
    answer: `Yes. It is often smarter.

Building a website and CRM together makes sense. They connect from day one. No awkward integration later. I will tell you if combining helps or hurts.`
  },
  {
    id: 'project-timeline',
    question: 'How long does a project take?',
    answer: `I work in sprints.

- Quick wins: 3 to 7 days.
- Core builds: 7 to 14 days.
- Complex projects: 21 to 30+ days.

I don't do 6-month projects. You see results in weeks. Not quarters.`
  },
  {
    id: 'pricing',
    question: 'How much does this cost?',
    answer: `I don't list prices because every project varies.

But I work in fixed-price sprints. You know the cost before we start. It doesn't change. Book a call. Tell me what you need. I'll give you a number.`
  },
  {
    id: 'after-project',
    question: 'Do I own the systems you build?',
    answer: `You own everything.

I hand over access. I hand over training. I hand over docs. I don't lock you in. You will be fully equipped to run it yourself.`
  },
  {
    id: 'burned-before',
    question: "I've been burned by tech projects before. How is this different?",
    answer: `Most projects fail because of scope creep. Or the vendor disappears.

I work differently.
- Fixed sprints. Price is locked.
- Adoption is built-in. I stay until you use it.
- No lock-in. You own it.`
  },
  {
    id: 'small-test',
    question: 'Can we start with a small test project?',
    answer: `Absolutely. I recommend it.

Start small. A lead form. A simple bot. See how I work. Verify the results. If it works, we do more. If not, you risked very little.`
  },
  {
    id: 'how-systems-connect',
    question: 'How do the 3 systems work together?',
    answer: `It is a flow.

- GET CLIENTS: Brings people in.
- SCALE FASTER: Multiplies output.
- SEE CLEARLY: Shows what works.

You don't need all three to start. But when they connect, work gets done automatically.`
  },
  {
    id: 'existing-systems',
    question: 'What if I already have a CRM or website?',
    answer: `I work with what you have.

If your CRM is good, we keep it. I just add automation. If your website works, I just fix the tracking. I fix what is broken. I don't replace what works.`
  },
  {
    id: 'how-involved',
    question: 'How involved do I need to be?',
    answer: `At the start, I need you. I need to learn your business.

After that, it is up to you. Weekly check-ins? Fine. Just want it done? Also fine.`
  },
  {
    id: 'after-project-done',
    question: 'What happens after the project is done?',
    answer: `Three options.

1. You run it yourself.
2. Monthly support.
3. Ad-hoc support.

Most clients start with option 1. Many move to option 2 when they see the value.`
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
      answer: `It comes down to speed and need. You pick based on your deadline.

• Starter (7 days): Captures leads. Simple. For tradies and local service businesses.
• E-commerce (14 days): Inventory. Payments. Shipping. The full store.
• Professional (21 days): Fast. Secure. Built for high-ticket services.
• Flagship (30+ days): Custom builds. 3D features. Animation.

I help you choose. I never upsell.`
    },
    {
      id: 'p1-mobile',
      question: 'Will my website work properly on mobile?',
      answer: `Yes. I design for phones first.

Most visitors are on mobile. Often 70% or more. So we start there. Your site will load fast. It will look good. If someone fills out a form at 11pm on an iPhone, it works.`
    },
    {
      id: 'p1-seo',
      question: 'Do you handle SEO?',
      answer: `I build the foundation. Fast loading. Proper structure. Local tags.

I do not do ongoing campaigns. No monthly link building or blog writing. I build the race car. You drive it. If you need a driver, I can introduce you to a specialist.`
    },
    {
      id: 'p1-accounting',
      question: 'Can my website connect to Xero / MYOB?',
      answer: `Yes. This integration saves massive amounts of time.

Someone buys from your site. The order flows straight into your accounting system. No re-typing. No manual invoices. It just happens.`
    },
    {
      id: 'p1-platform',
      question: 'Do you use WordPress, Shopify, or something else?',
      answer: `I use the right tool for the job.

• WordPress: Best for service businesses.
• Shopify: Best for selling products.
• Custom builds: Best for high performance.

I recommend what fits your business. Not what pays me a commission.`
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
      answer: `Most CRMs fail because they create work. I design systems that remove it.

Data enters automatically. From forms. From emails. From calls. Your team won't type things twice. When the system saves them time, they use it.

And I include training. Everyone will know what to do. No guessing.`
    },
    {
      id: 'p2-xero',
      question: 'Can you connect the CRM to Xero / MYOB?',
      answer: `Yes. It is a standard automation.

A deal closes in your CRM. The system creates an invoice in Xero. No re-typing names. No error. One source of truth.`
    },
    {
      id: 'p2-which-crm',
      question: 'Which CRM do you recommend?',
      answer: `I use what works. Usually HubSpot for small-to-medium businesses.

It is powerful. It has a free tier. It integrates with everything. For complex needs, we might look at Pipedrive or Salesforce. I recommend the best fit for you.`
    },
    {
      id: 'p2-staff-leaves',
      question: 'What happens to our data if a staff member quits?',
      answer: `This is why you need a CRM.

If leads live in a notebook or personal email, they leave when the person leaves. With a proper system, every lead is logged. Staff come and go. Your data stays.`
    },
    {
      id: 'p2-migration',
      question: 'Can you migrate my existing contacts from spreadsheets?',
      answer: `Yes. Migration is part of the deal.

I help you consolidate contacts. We pull them from spreadsheets or old systems. We clean them up. Then we import. You start with a tidy database.`
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
      answer: `Anything repetitive.

• Sending follow-up emails.
• Creating invoices.
• Notifying your team of new leads.
• Syncing data between systems.
• SMS reminders.

If you do it more than 5 times a week, a bot should do it.`
    },
    {
      id: 'p3-breaks',
      question: 'What happens if the automation breaks?',
      answer: `It can happen. So I build with monitoring.

If a connection drops, I get an alert. We fix it immediately. You own the system. You can hire anyone to maintain it. Or I can handle it.`
    },
    {
      id: 'p3-what-first',
      question: 'How do I know which task to automate first?',
      answer: `We look for high impact and low risk.

High impact saves time. Low risk means your business won't stop if the bot pauses. We usually start with auto-replies or invoice generation. Quick wins build confidence.`
    },
    {
      id: 'p3-robotic-emails',
      question: 'Will automated emails sound generic and robotic?',
      answer: `Only if you write like a robot.

The content comes from you. I just automate the delivery. We personalize based on names and actions. The recipient won't know a machine sent it.`
    },
    {
      id: 'p3-tools',
      question: 'What automation tools do you work with?',
      answer: `I use the best stack for the job.

• Make.com (formerly Integromat).
• Zapier.
• n8n.
• Native integrations.

Sometimes a cheap Zapier plan is enough. Sometimes you need power. I choose what fits.`
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
      answer: `Old chatbots were dumb. They followed scripts. "Press 1 for sales."

AI assistants understand language. They answer specific questions. "What time do you open on Sunday?" They learn from your business rules. One is frustrating. The other is helpful.`
    },
    {
      id: 'p4-book-appointments',
      question: 'Can the AI actually book real appointments?',
      answer: `Yes.

It connects to your calendar. Google. Outlook. Calendly. It checks availability in real-time. A customer asks for a slot. The AI confirms it. No back-and-forth.`
    },
    {
      id: 'p4-phone-calls',
      question: 'Can I have an AI that answers my phone?',
      answer: `Yes. This is powerful.

An AI voice agent answers 24/7. It handles FAQs. It qualifies leads. It books meetings. It sounds human. And it hands off to a real person when needed. It is a receptionist that never sleeps.`
    },
    {
      id: 'p4-cant-answer',
      question: "What happens if someone asks something the AI doesn't know?",
      answer: `It hands off. Gracefully.

I build escape routes. The AI knows its limits. It will say: "Let me connect you with someone who can help." It does not fake knowledge.`
    },
    {
      id: 'p4-train-ai',
      question: 'How does the AI learn about my specific business?',
      answer: `I feed it your data.

• FAQ documents.
• Website content.
• Pricing and policies.

We test it. We find gaps. We refine. Most businesses are ready to launch in a few days.`
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
      answer: `No. We work with your strengths.

• Voice notes: You talk. I turn it into text.
• Written notes: You send bullets. I expand them.
• Interviews: I ask. You answer.

We extract your expertise. If you hate video, we don't do video.`
    },
    {
      id: 'p5-voice-style',
      question: 'Can you create content that sounds like me?',
      answer: `Yes. That is the point.

AI can clone your voice and your writing style. The content will sound like you. Not like a marketing agency. We calibrate the tone until it fits.`
    },
    {
      id: 'p5-how-much',
      question: 'How much content can this system produce?',
      answer: `A lot. Fast.

One 30-minute interview can become:
• 1 blog post.
• 5 social posts.
• 1 newsletter.
• 1 script.

One input. Many outputs. It is a supply chain for content.`
    },
    {
      id: 'p5-replace-marketing',
      question: 'Does this replace my marketing team or agency?',
      answer: `It depends.

It replaces the grunt work of creation. It does not replace high-level strategy. It does not replace community management. Think of this as a production line. Not a department.`
    },
    {
      id: 'p5-platforms',
      question: 'Which social platforms can this post to?',
      answer: `Most of them.

• LinkedIn.
• Facebook.
• Instagram.
• Twitter/X.
• YouTube.
• Your blog.

We set up auto-posting. You approve once. It goes everywhere.`
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
      answer: `Resistance comes from fear. They worry it means more work.

I make it easy. Bite-sized videos. No long seminars. I show them the benefit. "This saves you two hours a week." I don't disappear after training. I make sure it sticks.`
    },
    {
      id: 'p6-who-trained',
      question: 'Do you train everyone, or just the manager?',
      answer: `Everyone who uses the system gets trained.

Managers get the strategy view. Staff get the workflow view. You get documentation for new hires. No one gets left behind.`
    },
    {
      id: 'p6-format',
      question: 'Is training live, or videos, or documents?',
      answer: `A mix.

• Short videos: Rewatchable. Specific.
• Live walkthrough: For Q&A and rollout.
• Documentation: For reference.

I don't do 3-hour webinars. Your team can watch a 3-minute video when they are stuck.`
    },
    {
      id: 'p6-new-hires',
      question: 'What happens when I hire someone new after the project?',
      answer: `They use the same materials.

• Video library.
• Docs.
• Knowledge base.

You onboard new staff without paying me again. The training is yours.`
    },
    {
      id: 'p6-how-long',
      question: 'How long until my team is comfortable with new systems?',
      answer: `Simple tools take a week or two. Complex systems take a month.

We start small. We add features over time. We don't overwhelm them on day one.`
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
      answer: `Accounting software shows history. Money in. Money out.

A dashboard shows the future. It shows where leads come from. It shows bottlenecks. It shows pipeline forecasts. It is the windshield. Not the rearview mirror.`
    },
    {
      id: 'p7-mobile',
      question: 'Can I check my dashboard from my phone?',
      answer: `Yes.

I build for desktop, tablet, and mobile. Check your numbers from a café. Or the train. Real-time data. No laptop needed.`
    },
    {
      id: 'p7-data-sources',
      question: 'What systems can feed into the dashboard?',
      answer: `Almost anything.

• CRM (HubSpot, Salesforce).
• Accounting (Xero, MYOB).
• Ads (Google, Meta).
• Spreadsheets.

If it has data, we can visualize it.`
    },
    {
      id: 'p7-update-frequency',
      question: 'Is the data live, or does it update once a day?',
      answer: `It depends on you.

Sales pipelines should be real-time. Financial summaries can be daily. We decide what needs to be instant. More frequency means more complexity.`
    },
    {
      id: 'p7-role-views',
      question: 'Can I have different views for different people?',
      answer: `Yes. Role-based dashboards are standard.

The CEO sees cash flow. The Sales Manager sees deals. Marketing sees lead sources. Everyone sees what they need. Nothing more.`
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
