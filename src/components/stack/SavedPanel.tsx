import { useState } from "react";
import { byId } from "@/data/resources";
import { copyText, type SavedApi } from "@/lib/saved";
import { ToolLogo } from "./ToolLogo";

export function SavedSection({ saved }: { saved: SavedApi }) {
  const [msg, setMsg] = useState("");
  const items = saved.ids.map(byId).filter((r): r is NonNullable<typeof r> => !!r);

  const copy = async () => {
    const text = "My Build Stack picks\n\n" + items.map((r) => `${r.name} — ${r.url}`).join("\n");
    setMsg((await copyText(text)) ? "Copied! Paste it anywhere." : "Couldn’t copy automatically. Select the list and copy it yourself.");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <section id="saved" aria-labelledby="saved-title" className="graph-paper border-t-2 border-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-hand text-2xl text-emerald">your shortlist</p>
        <h2 id="saved-title" className="font-display text-3xl uppercase sm:text-4xl">My saved tools</h2>
        <p className="mt-2 text-muted-foreground">
          {saved.available ? "Saves stay in this browser only. No account needed." : "This browser isn’t letting the page store saves, so your list will reset when you leave. Copy it before you go."}
        </p>

        <div className="mt-6 rounded-md border-2 border-ink bg-paper p-5 shadow-offset">
          {items.length === 0 ? (
            <p className="font-hand text-2xl">Nothing saved yet. Hit “Save” on any tool to build your list.</p>
          ) : (
            <>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((r) => (
                  <li key={r.id} className="flex items-center gap-3 rounded-md border border-ink/30 bg-cream p-3">
                    <ToolLogo resource={r} size={32} />
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex-1 font-semibold underline-offset-4 hover:underline">{r.name}</a>
                    <button type="button" onClick={() => saved.remove(r.id)} className="text-sm font-semibold underline underline-offset-4">
                      Remove<span className="sr-only"> {r.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button type="button" onClick={copy} className="rounded-sm border-2 border-ink bg-magenta px-4 py-2 font-semibold text-cream">Copy my list</button>
                <button type="button" onClick={saved.clear} className="rounded-sm border-2 border-ink bg-cream px-4 py-2 font-semibold">Clear list</button>
                <p role="status" className="font-semibold">{msg}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
