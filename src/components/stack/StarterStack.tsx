import { useState } from "react";
import { byId } from "@/data/resources";
import { CODE_LEVELS, STARTER_STACKS, levelAllows, type CodeLevel } from "@/data/stacks";
import { ToolLogo } from "./ToolLogo";
import { Arrow } from "./Doodles";

export function StarterStackSection({ onLearnMore }: { onLearnMore: (id: string, el: HTMLElement) => void }) {
  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState<CodeLevel | null>(null);
  const stack = STARTER_STACKS.find((s) => s.id === goal);
  const tools = stack && level ? stack.tools.filter((t) => levelAllows(level, t.minLevel)) : [];

  const chip = (active: boolean) =>
    `rounded-md border-2 border-ink px-3 py-2 text-left text-base font-medium transition-transform hover:-translate-y-0.5 ${active ? "bg-lime shadow-offset-sm" : "bg-paper"}`;

  return (
    <section id="start" aria-labelledby="start-title" className="border-y-2 border-ink bg-emerald text-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-hand text-2xl text-lime">start here</p>
        <h2 id="start-title" className="font-display text-3xl uppercase sm:text-4xl">Find my starting stack</h2>
        <p className="mt-2 max-w-2xl text-cream/90">Two quick questions. You’ll get two to four tools, what each one does, and one thing to try first.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            <fieldset>
              <legend className="font-display text-lg">1. What are you trying to do?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {STARTER_STACKS.map((s) => (
                  <button key={s.id} type="button" aria-pressed={goal === s.id} onClick={() => setGoal(s.id)} className={`${chip(goal === s.id)} text-ink`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display text-lg">2. How comfortable are you with code?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {CODE_LEVELS.map((l) => (
                  <button key={l.id} type="button" aria-pressed={level === l.id} onClick={() => setLevel(l.id)} className={`${chip(level === l.id)} text-ink`}>
                    <span className="block">{l.label}</span>
                    <span className="block text-sm font-normal text-muted-foreground">{l.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div aria-live="polite" className="rounded-md border-2 border-ink bg-cream p-6 text-ink shadow-offset">
            {stack && level ? (
              <div className="reveal">
                <p className="font-serif text-xl italic">“{stack.goal}”</p>
                <p className="mt-2 text-muted-foreground">{stack.why}</p>
                <ul className="mt-5 space-y-3">
                  {tools.map((t) => {
                    const r = byId(t.id)!;
                    return (
                      <li key={t.id} className="flex items-start gap-3 rounded-md border border-ink/30 bg-paper p-3">
                        <ToolLogo resource={r} />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold">{r.name}</p>
                          <p className="text-muted-foreground">{t.role}</p>
                        </div>
                        <button type="button" onClick={(e) => onLearnMore(r.id, e.currentTarget)} className="shrink-0 text-sm font-semibold underline underline-offset-4">
                          Learn more<span className="sr-only"> about {r.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 rounded-md bg-lime/60 p-4">
                  <p className="font-display text-sm uppercase">Your first move</p>
                  <p className="mt-1">{stack.firstAction}</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground"><strong>What you’ll end up with:</strong> {stack.result}</p>
              </div>
            ) : (
              <div className="flex h-full min-h-48 flex-col items-center justify-center text-center">
                <Arrow className="h-12 w-24 -scale-x-100 text-magenta" />
                <p className="font-hand text-2xl">Answer both questions and your stack shows up here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
