# Jada’s Build Stack

From idea to “I built that.” A personal guide by Jada Mylan Smith to the 42 tools she uses and recommends for apps, data, content, design, and automation. Shared during workshops.

## Local setup

```bash
bun install      # or npm install
bun run dev      # http://localhost:8080
bun run build    # production build
bun run test     # catalog checks (42 tools, category counts, etc.)
```

## Where to edit

- **Tools:** `src/data/resources.ts` holds one typed list with stable IDs.
- **Starter stacks:** `src/data/stacks.ts`.
- **Links, name, review date, examples:** `src/config/site.ts`. Empty links stay hidden.
- **Colors and fonts:** `src/styles.css` (brand tokens). Fonts load in `src/routes/__root.tsx`.

## Adding example screenshots

Add entries to `EXAMPLES` in `src/config/site.ts` with an image URL, alt text, tool names, a one-sentence result, and an optional link. The “See what you can make” section appears once the list has at least one entry.

## Deploying

The site is built and hosted with Lovable. Click **Publish** in the editor. The code can sync to GitHub through Lovable’s GitHub integration.
