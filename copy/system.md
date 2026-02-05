# System Page — Copy

All copy below is taken from the actual System page components (SystemPage.tsx, SystemArchitecture.tsx, SystemGrid.tsx, SystemGridItem.tsx, systemPillars.ts, constants.ts). FAQ copy lives in `copy/faq-system.md`.

---

## Nav
- Back: `Return to Home`

---

## Hero
- Eyebrow: `/` — `THE SYSTEM`
- Headline: `How It All Connects.` ("Connects." italic, gold)
- Sub: `Every service works alone. But they're built to connect. Depending on where your business is right now, you might need one piece, one group, or the full system.`
- Visual: HeroVisual_Suspension (right). Scroll line at bottom.

---

## Section: The 3 Systems (intro above scrollytelling)
- Eyebrow: `/ THE 3 SYSTEMS`
- Headline: `Where Are You Right Now?` ("Right Now?" italic, gold)
- Sub: `Most businesses fit into one of three stages. Find yours.`

---

## Scrollytelling (SystemArchitecture) — exact body copy

### PHASE 01 / GET CLIENTS
- Title: `The Capture` + `Loop.` (red)
- Body: `Right now, your leads land in an inbox and sit there. You reply when you can. Sometimes that's too late. Here's how it should work. Someone fills out your form. They land in your CRM instantly. The system texts them within seconds. You get a reminder to call. Website catches. CRM holds. Automation chases. No more lost leads.`
- Visual: VisualGetClientsEngine (left)

### PHASE 02 / SCALE FASTER
- Title: `The` + `Multiplier.` (gold)
- Body: `Your marketing works. More calls come in. But you can't answer them all. Here's how it should work. Content brings people to you without posting every day. AI picks up, qualifies, and books the good ones. Training keeps your team using the tools properly. Content fills. AI handles. Training keeps everyone moving. You grow without burning out.`
- Visual: VisualScaleFasterEngine (right)

### PHASE 03 / SEE CLEARLY
- Title: `The Control` + `Room.` (dark)
- Body: `Right now, you find out about problems after the damage is done. Here's how it should work. Every part of your system feeds into one dashboard. Where did your leads come from? Which ones converted? All on one screen. Updated live. You see what's working. You fix what's broken. Before it costs you money.`
- Visual: VisualSeeClearlyEngine (left)

---

## Grid: The 7 Pillars
- Header eyebrow: gold square + `/ THE 7 PILLARS`
- Headline: `Pick What You Need.` ("Need." italic, gold)
- Sub: `Click any pillar to see how it works and how it connects to the others.`

### Card closed state (each pillar)
- Number (top-right, muted): `01` … `07`
- Icon, then title (display title), subtitle, body (one line).
- Footer: `PILLAR 01` … `PILLAR 07` + Plus icon.

### Card expanded state
- Close button (Minus icon).
- Header: `{number} / {categoryLabel}` (e.g. `01 / GET CLIENTS`) — then title (display title) — then description (long paragraph from SERVICES).
- Two subService blocks: **How it connects** + **What this unlocks** (title + description each).
- Side panel: **WHAT THIS SOLVES** — `"{systemPurpose}"` in quotes — Button: `SEE HOW IT WORKS` (with arrow).

### Pillar 01 — THE FACE — Websites & E-commerce
- Category: GET CLIENTS
- Body (short): `Your website is the front door.`
- System purpose: `Stop losing leads.`
- **How it connects:** `Your website is the front door. When someone fills out a form, that data goes straight to your CRM. No inbox. No copy-pasting. The lead exists in your system before they've closed the browser.`
- **What this unlocks:** `Your CRM knows where they came from. Your automation can respond instantly. Your dashboard can track which pages actually bring in money.`
- Description (expanded, from SERVICES): `Most websites just sit there. Yours should be catching leads while you sleep. I build sites that capture enquiries, process sales, and feed your CRM automatically.`
- Subtitle mobile: `Websites`

### Pillar 02 — THE BRAIN — CRM & Lead Tracking
- Category: GET CLIENTS
- Body: `Your CRM is the memory.`
- System purpose: `Stop losing leads.`
- **How it connects:** `Your CRM is the memory. Everything your website catches lands here. When you move a deal forward, automation knows. When you win a job, invoices get sent. When something stalls, you get reminded.`
- **What this unlocks:** `Your AI assistant can read the CRM before a call and know who's ringing. Your dashboard can show pipeline and forecast. Nothing lives in your head anymore.`
- Description: `How many leads slipped through last month? If you don't know, that's the problem. Every lead, every call, every deal logged in one place.`
- Subtitle mobile: `CRM`

### Pillar 03 — THE MUSCLE — Automation
- Category: GET CLIENTS
- Body: `Automation is the speed.`
- System purpose: `Stop losing leads.`
- **How it connects:** `Automation is the speed. When a lead comes in, it replies. When a deal closes, it invoices. When someone forgets to follow up, it chases. It watches your CRM and acts without you lifting a finger.`
- **What this unlocks:** `Your website and CRM become a machine that runs while you sleep. You stop doing admin. Your team stops forgetting things.`
- Description: `Still typing the same data into three different apps? There's a better way. Invoices, follow-ups, data entry. All running without you.`
- Subtitle mobile: `Automation`

### Pillar 04 — THE VOICE — AI Assistants
- Category: SCALE FASTER
- Body: `AI handles overflow.`
- System purpose: `Do more without hiring more.`
- **How it connects:** `AI handles overflow. When your content brings traffic and your website captures leads, AI picks up the phone. It reads your CRM to know who's calling. After the call, it updates the record. You never touched it.`
- **What this unlocks:** `You double your lead volume without hiring. Your CRM stays updated without your team doing data entry. Nights and weekends are covered.`
- Description: `How many calls did you miss last month? Each one could've been a job. AI answers your phone, qualifies leads, and books appointments. 24/7. Sounds human. Never gets sick.`
- Subtitle mobile: `AI Bots`

### Pillar 05 — THE PRESENCE — Content Systems
- Category: SCALE FASTER
- Body: `Content fills the top of the funnel.`
- System purpose: `Do more without hiring more.`
- **How it connects:** `Content fills the top of the funnel. More content means more traffic. More traffic means more leads hitting your website. More leads means more work for your CRM, automation, and AI to handle.`
- **What this unlocks:** `You stay visible without posting every day. Your website has something to catch. The rest of the system has fuel to run on.`
- Description: `You know you should be posting. But when? Talk for 10 minutes. Get a month of posts, blogs, and emails. The system does the rest.`
- Subtitle mobile: `Content`

### Pillar 06 — THE SOUL — Team Training
- Category: SCALE FASTER
- Body: `Training protects everything else.`
- System purpose: `Do more without hiring more.`
- **How it connects:** `Training protects everything else. Your CRM only works if your team uses it. Your automation only works if your data is clean. Your AI only works if people trust it. Training makes sure they do.`
- **What this unlocks:** `The tools you paid for actually get used. Data stays clean. Your dashboard tells the truth. Nothing becomes expensive shelfware.`
- Description: `Bought software your team never uses? You're not alone. Most tech fails here. Short videos. Clear guides. Support until they actually use it.`
- Subtitle mobile: `Training`

### Pillar 07 — THE EYES — Dashboards & Reporting
- Category: SEE CLEARLY
- Body: `Your dashboard pulls from everything.`
- System purpose: `Know your numbers.`
- **How it connects:** `Your dashboard pulls from everything. Website traffic. CRM pipeline. Automation logs. AI call stats. Training adoption. It shows you the whole system on one screen.`
- **What this unlocks:** `You see problems before they cost you money. You know which marketing works. You stop guessing and start steering.`
- Description: `Do you actually know your margin right now? Or are you waiting for the accountant? Revenue, margin, and pipeline on one screen. Updated live.`
- Subtitle mobile: `Dashboards`

---

## FAQ (bottom of page)
- Title: `Questions?`
- Subtitle: `Common questions about how this works.`
- Q&A: **Full copy in `copy/faq-system.md`** · Data: `constants/faqData.ts` → `systemPageFAQs`

---

## Footer
- GlobalFooter component (shared). See `copy/footer.md`.
