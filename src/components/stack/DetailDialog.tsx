import { useEffect, useRef } from "react";
import { byId, categoryTitle } from "@/data/resources";
import type { SavedApi } from "@/lib/saved";
import { StatusBadge, ToolLogo } from "./ToolLogo";

export function DetailDialog({ id, onClose, saved }: { id: string | null; onClose: () => void; saved: SavedApi }) {
  const ref = useRef<HTMLDialogElement>(null);
  const r = id ? byId(id) : undefined;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (r && !d.open) d.showModal();
    if (!r && d.open) d.close();
  }, [r]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="detail-title"
      className="m-auto w-[min(92vw,36rem)] max-h-[90vh] rounded-md border-2 border-ink bg-cream p-0 text-ink shadow-offset"
    >
      {r && (
        <div className="p-6">
          <div className="flex items-start gap-3">
            <ToolLogo resource={r} size={48} />
            <div className="flex-1">
              <h2 id="detail-title" className="font-display text-2xl leading-tight">{r.name}</h2>
              <p className="text-muted-foreground">{categoryTitle(r.category)}</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} className="rounded-sm border-2 border-ink px-2 font-semibold" aria-label="Close">×</button>
          </div>
          <div className="mt-3"><StatusBadge status={r.status} /></div>
          <dl className="mt-5 space-y-4">
            <div><dt className="font-display text-sm uppercase">What it is</dt><dd>{r.type}</dd></div>
            <div><dt className="font-display text-sm uppercase">Good for</dt><dd>{r.goodFor}</dd></div>
            <div><dt className="font-display text-sm uppercase">My take</dt><dd className="font-serif text-lg italic">{r.description}</dd></div>
            <div>
              <dt className="font-display text-sm uppercase">Who it’s for</dt>
              <dd className="mt-1 flex flex-wrap gap-2">{r.audiences.map((a) => <span key={a} className="rounded-sm border border-ink bg-paper px-2 py-0.5 text-sm">{a}</span>)}</dd>
            </div>
            <div className="rounded-md bg-lime/60 p-4">
              <dt className="font-display text-sm uppercase">Suggested beginner activity</dt>
              <dd className="mt-1">{r.activity}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-sm border-2 border-ink bg-ink px-4 py-2 font-semibold text-cream">Visit official site<span className="sr-only"> (opens in a new tab)</span></a>
            <button type="button" aria-pressed={saved.isSaved(r.id)} onClick={() => saved.toggle(r.id)} className="rounded-sm border-2 border-ink bg-paper px-4 py-2 font-semibold">
              {saved.isSaved(r.id) ? "Saved ✓" : "Save this tool"}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
