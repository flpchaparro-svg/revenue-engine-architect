# Contact Page — Copy

All copy from ContactPage.tsx and constants/contactData.ts.

---

## Layout
- Two columns: left cream (the promise), right dark (form). Mobile: stacked, cream first.

---

## Left column (cream)
- Back: `Back`
- Eyebrow: `/ THE PROMISE`
- Headline: `This is not a` (line break) `Sales Call.` (italic, gold)
- Body 1: `No salespeople here. When you fill this out, you're starting a conversation directly with me.`
- Body 2: `I'll personally review your situation and tell you honestly if I can help.`
- Footer (desktop only): line + `DIRECT LINE OPEN`

---

## Right column (form)
- Eyebrow: `/ YOUR DETAILS`
- Headline: `Tell Me About Your` (space) `Business.` (italic, gold)
- Sub: `Fill this out. I'll get back to you within 24 hours.`

### Form fields
- **YOUR NAME** — placeholder: `Your name`
- **EMAIL** — placeholder: `Your email`
- **BUSINESS** — placeholder: `Company name or website`
- **WHAT DO YOU NEED HELP WITH?** — dropdown options (from contactData DIAGNOSIS_OPTIONS):
  - `Website & Leads — I need more enquiries`
  - `CRM & Sales — I'm losing track of leads`
  - `Automation — Too much manual work`
  - `AI — I want bots to handle things`
  - `Content — I can't keep up with posting`
  - `Training — My team won't use the tools`
  - `Dashboards — I can't see my numbers`
  - `Not sure — I just know something's broken`
- **ANYTHING ELSE?** — placeholder: `Tell me a bit about your situation.`

### Submit
- Button (idle): `[ SEND ]`
- Button (submitting): `SENDING...`

---

## Success state (after submit)
- Icon: Check in gold circle
- Headline: `Got It.` ("It." italic, gold)
- Body: `Thanks for reaching out. I'll review your details and get back to you within 24 hours.`
- Button: `BACK TO HOME`
