<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Tool catalog lives only in `src/data/resources.ts` and starter paths in `src/data/stacks.ts`; tests in `src/test/resources.test.ts` guard counts — single source of truth for content.
- Site links/examples live in `src/config/site.ts`; empty values hide UI — owner edits one file.
- Frontend only, saves in localStorage via `src/lib/saved.ts` — no backend by owner request.
