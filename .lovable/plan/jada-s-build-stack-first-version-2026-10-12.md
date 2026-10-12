# Jada's Build Stack — first version

Name: the newest file says to keep the title "Jada's Build Stack", which overrides "Jada Data Toolkit" from your earlier answer. You can switch it back with a one-line change.

A one-page resource guide with no backend. Saved tools stay in the visitor's browser.

## What gets built
1. **Sticky top menu**: Explore tools, Find my starting stack, See examples (hidden until you send screenshots), My saved tools. Profile and GitHub links show up only after real web addresses are added.
2. **Opening section**: big JADA'S BUILD STACK headline, the tagline, your intro text, two buttons, and the handwritten note "You don't need every tool…". On computer screens, five cards (Idea, Build, Data, Design, Automate) overlap slightly. On phones they stack in reading order.
3. **Find my starting stack**: two questions (your goal, from 7 options, and how comfortable you are with code). It recommends the tools in your starter table, explains what each one does, and gives one first step. Visitors can change their answers anytime.
4. **Explore the tools**: all 42 tools in your 8 categories. Visitors can search and filter by category, audience (New to tech, Creator, Small business, Data, App builder) and label (My go-to, Expanded toolkit, Worth exploring). Concept stays a tool type, not a label. The section shows how many tools match, the active filters, a "Clear all" button, and a message when nothing matches. Each card shows a logo (or initials if the logo doesn't load), the tool name, its type, its label, its description, a Visit link, a Learn more button, and a Save button.
5. **Learn more panel**: what the tool is, what it's good for, your description, who it's for, and one suggested beginner activity, clearly labeled as a suggestion, plus the official link. It closes with Escape and returns visitors to where they were.
6. **My saved tools**: remove one tool, clear the whole list, or copy a plain list of names and links, with a "Copied" confirmation. A note explains that saves stay in this browser, and the page still works if the browser blocks saving.
7. **Footer**: your curator line and closing quote, the date the list was reviewed (Oct 2026), and a reminder that tool features and pricing can change.

## Look and feel
- Your exact colors, with cream and ink black dominant. Fonts: Archivo Black for headlines, Work Sans for text, Caveat for short handwritten notes.
- Light graph-paper texture, hand-drawn arrows, circles and stars, stacked gold rings, crisp black outlines and small offset shadows.
- Logos load from each tool's official website and keep their original colors, on a neutral tile. If a logo fails, the tool's initials show instead.
- Motion is gentle and turns off for visitors who prefer reduced motion. Text is at least 16px, everything works by keyboard, and the layout fits phones, tablets and desktops.

## Not added (per your brief)
- No made-up prices, project results or endorsements.
- The examples section stays hidden until you send real screenshots.
- Bitwarden is left out. Tableau and Wix are in, labeled My go-to.

## Technical details
- One typed tool list in `src/data/resources.ts` (stable IDs, category, status, type, uses, description, URL, audiences, suggested activity). Starter paths go in `src/data/stacks.ts`, and links and settings in `src/config/site.ts`.
- Colors go in `src/styles.css`, and fonts load through `__root.tsx`. Logos come from a favicon service on each official domain, with an initials fallback.
- Built from small components in `src/components/`. The page itself is `src/routes/index.tsx`, with its own page title and description.
- Saving uses a small helper that remembers your list in the browser and has a fallback. Copying uses the clipboard, with a backup method if that fails.
- Tests check: 42 tools with no duplicates, the count in each category, Tableau and Wix present, Bitwarden absent, and that every starter path points to real tools.
- Includes a GitHub-ready README with setup steps, where to edit things, how to add examples, and how to publish.
