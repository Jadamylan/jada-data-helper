import { useMemo, useState } from "react";
import { AUDIENCES, CATEGORIES, RESOURCES, STATUSES, categoryTitle, type Resource } from "@/data/resources";
import { EMPTY_FILTERS, filterResources, type Filters } from "@/lib/filter";
import type { SavedApi } from "@/lib/saved";
import { StatusBadge, ToolLogo } from "./ToolLogo";

function ToolCard({ r, saved, onLearnMore }: { r: Resource; saved: SavedApi; onLearnMore: (id: string, el: HTMLElement) => void }) {
  const isSaved = saved.isSaved(r.id);
  return (
    <article className="flex flex-col rounded-md border-2 border-ink bg-paper p-4 transition-transform hover:-translate-y-0.5 hover:shadow-offset">
      <div className="flex items-start gap-3">
        <ToolLogo resource={r} />
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-base leading-tight">{r.name}</h4>
          <p className="text-sm text-muted-foreground">{r.type}</p>
        </div>
        <button
          type="button"
          aria-pressed={isSaved}
          onClick={() => saved.toggle(r.id)}
          className={`rounded-sm border-2 border-ink px-2 py-1 text-sm font-semibold ${isSaved ? "bg-magenta text-cream" : "bg-cream"}`}
        >
          {isSaved ? "Saved" : "Save"}<span className="sr-only"> {r.name}</span>
        </button>
      </div>
      <div className="mt-3"><StatusBadge status={r.status} /></div>
      <p className="mt-3 flex-1">{r.description}</p>
      <div className="mt-4 flex items-center gap-3">
        <a href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-sm border-2 border-ink bg-ink px-3 py-1.5 text-sm font-semibold text-cream">
          Visit tool<span className="sr-only"> {r.name} (opens in a new tab)</span>
        </a>
        <button type="button" onClick={(e) => onLearnMore(r.id, e.currentTarget)} className="text-sm font-semibold underline underline-offset-4">
          Learn more<span className="sr-only"> about {r.name}</span>
        </button>
      </div>
    </article>
  );
}

const selectCls = "w-full rounded-sm border-2 border-ink bg-paper px-3 py-2 text-base";

export function DirectorySection({ saved, onLearnMore }: { saved: SavedApi; onLearnMore: (id: string, el: HTMLElement) => void }) {
  const [f, setF] = useState<Filters>(EMPTY_FILTERS);
  const results = useMemo(() => filterResources(RESOURCES, f), [f]);
  const active = [
    f.q && { k: "q" as const, label: `“${f.q}”` },
    f.category !== "all" && { k: "category" as const, label: categoryTitle(f.category) },
    f.audience !== "all" && { k: "audience" as const, label: f.audience },
    f.status !== "all" && { k: "status" as const, label: f.status },
  ].filter(Boolean) as { k: keyof Filters; label: string }[];

  return (
    <section id="tools" aria-labelledby="tools-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-hand text-2xl text-magenta">the whole workbench</p>
      <h2 id="tools-title" className="font-display text-3xl uppercase sm:text-4xl">Explore the tools</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        <strong className="text-ink">My go-to</strong> = in my stack. <strong className="text-ink">Expanded toolkit</strong> = from my broader project and workshop work. <strong className="text-ink">Worth exploring</strong> = suggestions, not personal endorsements. The AI notes reflect my workflow preferences, not rankings.
      </p>

      <div className="mt-6 grid gap-3 rounded-md border-2 border-ink bg-muted p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sm:col-span-2 lg:col-span-1">
          <span className="text-sm font-semibold">Search</span>
          <input type="search" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="dashboards, forms, AI…" className={selectCls} />
        </label>
        <label>
          <span className="text-sm font-semibold">Category</span>
          <select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value as Filters["category"] })} className={selectCls}>
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold">Who it’s for</span>
          <select value={f.audience} onChange={(e) => setF({ ...f, audience: e.target.value as Filters["audience"] })} className={selectCls}>
            <option value="all">Everyone</option>
            {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold">Label</span>
          <select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as Filters["status"] })} className={selectCls}>
            <option value="all">All labels</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
        <p className="font-semibold">{results.length} {results.length === 1 ? "tool" : "tools"}</p>
        {active.map((a) => (
          <button key={a.k} type="button" onClick={() => setF({ ...f, [a.k]: EMPTY_FILTERS[a.k] })} className="rounded-sm border border-ink bg-lime px-2 py-0.5 text-sm">
            {a.label} <span aria-hidden="true">×</span><span className="sr-only">remove filter</span>
          </button>
        ))}
        {active.length > 0 && (
          <button type="button" onClick={() => setF(EMPTY_FILTERS)} className="text-sm font-semibold underline underline-offset-4">Clear all</button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-md border-2 border-dashed border-ink p-10 text-center">
          <p className="font-display text-xl">Nothing matches that combo.</p>
          <p className="mt-2 text-muted-foreground">Try a different word or loosen a filter.</p>
          <button type="button" onClick={() => setF(EMPTY_FILTERS)} className="mt-4 rounded-sm border-2 border-ink bg-ink px-4 py-2 font-semibold text-cream">Clear all filters</button>
        </div>
      ) : (
        CATEGORIES.map((c) => {
          const items = results.filter((r) => r.category === c.id);
          if (!items.length) return null;
          return (
            <div key={c.id} className="mt-10">
              <h3 className="font-display text-xl uppercase">{c.title} <span className="font-sans text-base font-normal normal-case text-muted-foreground">· {c.subtitle}</span></h3>
              {c.note && <p className="mt-2 max-w-3xl border-l-4 border-cyan pl-3 text-muted-foreground">{c.note}</p>}
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => <ToolCard key={r.id} r={r} saved={saved} onLearnMore={onLearnMore} />)}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
