<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

**Codebase map (single source of truth):** All routes and visible UI come from `src/App.tsx` (routes) and the `pages/` and `components/` they import. There are no unused/ghost components. Copy docs live in `copy/` only as reference; they are not imported by the app.

View your app in AI Studio: https://ai.studio/apps/drive/1G_ebFCKG9R1SJQyo6BG085NhxKYy_rg0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
