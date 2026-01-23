# Ghost Copy Report - Unused/Hidden Copy in Codebase

## Summary
This report identifies copy that exists in the code but is not displayed on screen, which may interfere with website analysis tools.

---

## 1. SYMPTOM QUESTIONS (Hidden due to bug in Modal.tsx)

**Location:** `constants.ts` (lines 19, 34, 49, 64, 79, 94, 109)  
**Status:** ❌ BROKEN - Never displayed due to bug  
**Issue:** `Modal.tsx` line 121 uses `service.question` but should use `service.symptom`

### Unused Copy:
- Pillar 1: "Are you losing leads in spreadsheets?" (This one shows as default fallback)
- Pillar 2: "Do you know exactly where every deal is stuck?"
- Pillar 3: "Are you manually typing invoices and contracts?"
- Pillar 4: "Is your team answering the same 5 questions all day?"
- Pillar 5: "Is content creation taking hours instead of minutes?"
- Pillar 6: "Did you buy software that nobody uses?"
- Pillar 7: "Are you steering the business by gut feeling?"

**Current Behavior:** All modals show the default: "Are you losing leads in spreadsheets?"

**Fix Required:** Change `Modal.tsx` line 121 from `service.question` to `service.symptom`

---

## 2. TECHNICAL LABELS (Defined but never used)

**Location:** `constants.ts` (lines 16-17, 31-32, 46-47, 61-62, 76-77, 91-92, 106-107)  
**Status:** ❌ NOT IMPLEMENTED - Defined in constants but never rendered  
**Issue:** `SystemPage.tsx` ALL_PILLARS array has `technicalLabel: ''` (empty strings) instead of using values from constants.ts

### Unused Copy:
- Pillar 1: `[ YOUR ONLINE STOREFRONT ]` / `[ STOREFRONT ]`
- Pillar 2: `[ NEVER LOSE A LEAD ]` / `[ TRACK LEADS ]`
- Pillar 3: `[ ADMIN ON AUTOPILOT ]` / `[ AUTOPILOT ]`
- Pillar 4: `[ BOTS THAT TALK & THINK ]` / `[ ALWAYS ON ]`
- Pillar 5: `[ CREATE ONCE, POST EVERYWHERE ]` / `[ CREATE ONCE ]`
- Pillar 6: `[ MAKE YOUR TEAM USE IT ]` / `[ ADOPTION ]`
- Pillar 7: `[ YOUR NUMBERS IN REAL TIME ]` / `[ LIVE DATA ]`

**Current Behavior:** Technical labels are defined in `constants.ts` but `SystemPage.tsx` uses empty strings, so they never appear. The code at `SystemPage.tsx` line 303 checks `if (pillar.technicalLabel)` but since all values are empty, nothing renders.

**Note:** There IS a conditional render for technicalLabel at line 303-309 in SystemPage.tsx, but it never triggers because all values are empty strings.

---

## 3. DESKTOP GRID DESCRIPTIONS (Hidden by empty span)

**Location:** `pages/System/SystemPage.tsx` line 331  
**Status:** ❌ HIDDEN - Empty span tag hides desktop body text  
**Issue:** Line 331 has `<span className="hidden md:inline"></span>` which is empty, hiding the body text on desktop

### Hidden Copy (only visible on mobile):
- Pillar 1: "Capture every visitor as a trackable lead."
- Pillar 2: "Know exactly where every opportunity sits."
- Pillar 3: "Act fast without lifting a finger."
- Pillar 4: "Handle more leads without hiring."
- Pillar 5: "Reach more people on autopilot."
- Pillar 6: "Make sure your team actually uses it."
- Pillar 7: "See all your numbers on one screen."

**Current Behavior:** These descriptions appear on mobile (line 330) but are hidden on desktop due to empty span at line 331.

**Fix Required:** Change line 331 from `<span className="hidden md:inline"></span>` to `<span className="hidden md:inline">{pillar.body}</span>`

---

## 4. ADDITIONAL UNUSED DATA

### Small Card Body Text
**Location:** `constants.ts` (lines 21, 36, 51, 66, 81, 96, 111)  
**Status:** ✅ USED - These are used in SystemPhases.tsx for small cards  
**Note:** These are actually being used, so they're not ghost copy.

---

## Recommendations

1. **Fix Modal.tsx bug** - Change `service.question` to `service.symptom` to display correct symptom questions
2. **Fix SystemPage.tsx desktop body text** - Add `{pillar.body}` to the empty span on line 331
3. **Remove or use Technical Labels** - Either:
   - Remove the technicalLabel definitions from constants.ts if not needed, OR
   - Update SystemPage.tsx ALL_PILLARS to use technicalLabel values from constants.ts

**Important:** The user requested NO CHANGES to visible copy. The fixes above will:
- Fix the Modal bug (will show correct symptom questions instead of default)
- Show desktop body text (currently hidden)
- Technical labels are already not showing, so removing them won't change visible copy
