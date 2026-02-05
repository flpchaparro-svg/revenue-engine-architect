# Copy Audit — FIXED vs Website (Final)

**Audit date:** After applying all FIXED copy from your `*_FIXED.md` files.  
**Scope:** architect, contact, home, process, proof, system, pillar1–7.

---

## ✅ Pages fully aligned with FIXED

### Architect
- Nav: "Return to Home" ✓
- THE ARCHITECT: headline, subhead, timeline (No Templates, No Shortcuts, Enterprise Tools, Your Time Back), credentials ✓
- THE HUMAN: headline "Not just **consulted** them.", subhead, timeline ✓
- Footer CTA ✓

### Contact
- Back "Back", eyebrow, headline, Body 1 & 2, footer "DIRECT LINE OPEN" ✓
- Form: eyebrow, headline, sub "Fill this out. I'll get back to you within 24 hours.", placeholders, YOUR NAME/EMAIL/BUSINESS/WHAT DO YOU NEED HELP WITH/ANYTHING ELSE ✓
- DIAGNOSIS_OPTIONS match FIXED ✓
- Submit "[ SEND ]" / "SENDING...", success "Got It.", body, "BACK TO HOME" ✓

### Process
- Back "Return to Home" ✓
- Hero: eyebrow THE PROCESS, "How I Work.", "Clear path. No mystery. No jargon. Just results." ✓
- Section "/ HOW I THINK", "Two Rules." ✓
- Principles 01 CLARITY / 02 PEOPLE body ✓
- "/ THE 4 PHASES", "How Every Project Works." ✓
- STEPS (DIAGNOSE, DESIGN, BUILD, HANDOVER) titles and text ✓
- Bottom CTA "/ READY?", "Let's Talk.", "[ BOOK A CALL ]", "NOW ACCEPTING PROJECTS" ✓

### Proof
- Back "Return to Home", hero eyebrow CASE STUDY, "Results You Can Verify.", sub ✓
- The Brief: CLIENT: GROUP 7 SECURITY, INDUSTRY/SCOPE/TIMELINE, body ✓
- The Problem: "/ THE PROBLEM", "The Old Site.", badge, problem items (proofData), "Impact:" ✓
- The Solution: "/ THE SOLUTION", "The New Standard.", badge, solution items (proofData) ✓
- Build log: header "BUILD LOG / WHAT I DID", lines from proofData TERMINAL_LINES ✓
- The Evidence "/ THE RESULTS", "The Evidence." ✓
- Visual Evidence "/ VISUAL EVIDENCE", "Before & After.", LEGACY SITE | NEW STANDARD, captions ✓
- Bottom CTA "/ YOUR TURN", "Want Results Like This?", body, "[ BOOK A CALL ]" ✓

### System
- Hero: Back "Return to Home", "/ THE SYSTEM", "How It All Connects.", sub ✓
- Section "/ THE 3 SYSTEMS", "Where Are You Right Now?" (italic gold) ✓
- SystemArchitecture Phase 01/02/03 titles and bodies (including "your leads", "Where did your leads come from?") ✓
- Grid "/ THE 7 PILLARS", "Pick What You Need.", sub ✓
- systemPillars body/subServices wording (Your CRM, Your dashboard, etc.) ✓
- FAQ "Questions?" / "Common questions about how this works." ✓

### Home
- Hero: eyebrow, H1 "Stop Doing" / "Everyone's Job.", subhead (Your time is worth more…), CTAs ✓
- Ticker: WEBSITES / CRM / AUTOMATION / AI ASSISTANTS / CONTENT / DASHBOARDS ✓
- Problem: 01 headline (administrative hostage), 02 symptoms (Bottleneck Boss, Double-Entry Tax, Sunday Dread), 03 "YOUR BEST PEOPLE ARE BORED" + body, 04 body + "SEE THE SYSTEM" ✓
- Friction Audit: "/ THE FRICTION AUDIT", "Where your week disappears.", intro, AUDIT PROGRESS, audit cards 01–04 text, CTA "You've seen the leak." + "SEE THE FIX" ✓
- The System (7 Pillars): "/ THE SYSTEM", "7 Pillars. 3 Outcomes.", intro "Some businesses need everything built from scratch…" ✓
- Phase headers (Capture Loop, Multiplier, Control Room) and bodies ✓
- SERVICES (constants.ts) descriptions, smallCardBody, features (incl. "Clean Data" for pillar2) ✓
- The Architect: VIEW MODE, THE ARCHITECT | THE HUMAN, both headlines and bodies ✓
- Case Study: "/ REAL RESULTS", "See It In Action.", intro, WEBSITE REBUILD, SEE THE TRANSFORMATION, BEFORE/AFTER, VIEW TRANSFORMATION, SEE FULL CASE STUDY ✓
- Modal: Case Study: Group 7 Security, WEBSITE + SEO OVERHAUL, BEFORE: Old .com Site / AFTER: New .com.au Site ✓
- Booking CTA: "Now Accepting Projects", "Ready to stop the grind?", body, meta, Availability TAKING PROJECTS, "[ BOOK A 15-MIN CALL ]", sub ✓

---

## ⚠️ Intentional / structural differences (not copy errors)

1. **Black Cards ("Starting Out?" / "Already Got Clients?" / "Growing But Can't Keep Up?")**  
   In FIXED these are "tab" teasers for GET CLIENTS / SCALE FASTER / SEE CLEARLY. The live site uses the phase **header** cards in SystemPhases (The Capture Loop, The Multiplier, The Control Room) with "VIEW SYSTEM". The FIXED tab copy is not implemented as separate tabs; the phase headers carry the narrative. To add the exact FIXED tab titles and bodies you’d need a small UI change (e.g. tabs or a second block of copy).

2. **Pillar 2–7 tier/persona copy (pillar*Data.ts)**  
   Only **pillar1** had partial updates (e.g. STARTER/E-COMMERCE summaries, a few persona pain/solution lines). **Pillar 2–7** tier labels, hooks, summaries, sprint, specs, and all persona pain/solution text in `constants/pillar2Data.ts` … `pillar7Data.ts` still follow the **pre**-FIXED wording. Aligning them would mean replacing the content of those files with the full pillar2–7_FIXED.md tier and persona copy.

3. **Proof Attribution card**  
   FIXED: "No tracking. No automation." Current: "No tracking, no automation." (comma). Left as-is; trivial.

---

## Summary

- **Architect, Contact, Process, Proof, System, and Home** are aligned with your FIXED copy, including the corrections applied in this audit (HUMAN "consulted", System intro paragraph, pillar2 "Clean Data", Phase 3 "your leads").
- **Pillar 1:** Partially updated; remaining tier/persona lines can be brought in from pillar1_FIXED.md.
- **Pillars 2–7:** Copy in the pillar data files is still the old version; updating would require applying the full pillar2_FIXED … pillar7_FIXED.md content into `constants/pillar2Data.ts` … `pillar7Data.ts`.

If you want, the next step is to update **pillar2Data.ts through pillar7Data.ts** line-by-line from your pillar*_FIXED.md files so every pillar page matches the FIXED copy.
