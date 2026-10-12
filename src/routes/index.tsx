import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { EXAMPLES, SITE } from "@/config/site";
import jadaPortrait from "@/assets/jada-portrait.jpg.asset.json";
import jadaAvatar from "@/assets/jada-avatar.jpg.asset.json";
import { useSaved } from "@/lib/saved";
import { StarterStackSection } from "@/components/stack/StarterStack";
import { DirectorySection } from "@/components/stack/Directory";
import { DetailDialog } from "@/components/stack/DetailDialog";
import { SavedSection } from "@/components/stack/SavedPanel";
import { Arrow, Circle, Rings, Star } from "@/components/stack/Doodles";

const DESC = "Jada Mylan Smith’s guide to 42 tools for apps, data, design, content, and automation. Find your starting stack and save your picks.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jada’s Build Stack — From idea to “I built that.”" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Jada’s Build Stack" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO_CARDS = [
  { label: "Idea", note: "Think it through", cls: "bg-paper -rotate-3" },
  { label: "Build", note: "Make it real", cls: "bg-lime rotate-2 lg:-ml-6" },
  { label: "Data", note: "Find the story", cls: "bg-cyan/30 -rotate-1 lg:-ml-6" },
  { label: "Design", note: "Make it yours", cls: "bg-gold/50 rotate-3 lg:-ml-6" },
  { label: "Automate", note: "Take it off your plate", cls: "bg-paper -rotate-2 lg:-ml-6" },
];

function Index() {
  const saved = useSaved();
  const [detail, setDetail] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const openDetail = (id: string, el: HTMLElement) => {
    trigger.current = el;
    setDetail(id);
  };
  const closeDetail = () => {
    setDetail(null);
    trigger.current?.focus();
  };

  const nav = [
    { href: "#tools", label: "Explore tools" },
    { href: "#start", label: "Find my starting stack" },
    ...(EXAMPLES.length ? [{ href: "#examples", label: "See examples" }] : []),
    { href: "#saved", label: `My saved tools${saved.ids.length ? ` (${saved.ids.length})` : ""}` },
  ];

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-lime focus:p-2">Skip to content</a>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-3 sm:px-6">
          <a href="#top" className="shrink-0 font-display text-sm uppercase">JBS<span className="text-magenta">.</span></a>
          <ul className="flex gap-4 whitespace-nowrap text-sm font-semibold sm:gap-6">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="underline-offset-4 hover:underline">{n.label}</a></li>)}
            {SITE.links.github && <li><a href={SITE.links.github} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">GitHub</a></li>}
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="graph-paper relative overflow-hidden border-b-2 border-ink">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-24">
            <div className="reveal relative">
              <Star className="absolute -left-2 -top-8 h-8 w-8 text-magenta" />
              <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
                Jada’s<br />Build <span className="relative inline-block text-magenta">Stack<Circle className="absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)] text-ink" /></span>
              </h1>
              <p className="mt-6 font-serif text-2xl italic sm:text-3xl">From idea to “I built that.”</p>
              <p className="mt-4 max-w-xl text-lg">The tools I use to turn ideas into apps, data projects, visuals, and workflows. Pick what you’re trying to do, and let’s find your starting point.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#start" className="rounded-md border-2 border-ink bg-magenta px-5 py-3 font-semibold text-cream shadow-offset transition-transform hover:-translate-y-0.5">Find my starting stack</a>
                <a href="#tools" className="rounded-md border-2 border-ink bg-paper px-5 py-3 font-semibold shadow-offset transition-transform hover:-translate-y-0.5">Explore the tools</a>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <Arrow className="h-8 w-16 rotate-180 text-emerald" />
                <p className="font-hand text-2xl text-emerald">You don’t need every tool. Start with what you need.</p>
              </div>
            </div>
            <div className="relative">
              <Rings className="absolute -right-2 -top-6 hidden h-20 w-14 lg:block" />
              <figure className="reveal relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:mb-8">
                <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-gold/70" />
                <img
                  src={jadaPortrait.url}
                  alt="Jada Mylan Smith smiling outdoors, wearing a brightly patterned jacket"
                  width={960}
                  height={1200}
                  className="w-full rotate-1 rounded-md border-2 border-ink object-cover shadow-offset"
                />
                <figcaption className="mt-2 text-center font-hand text-2xl text-emerald">Hi — I’m Jada.</figcaption>
              </figure>
              <ol className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-y-6" aria-label="How a build comes together">
                {HERO_CARDS.map((c, i) => (
                  <li key={c.label} className={`reveal rounded-md border-2 border-ink p-4 shadow-offset lg:w-36 ${c.cls}`} style={{ animationDelay: `${i * 80}ms` }}>
                    <span className="font-hand text-lg text-muted-foreground">0{i + 1}</span>
                    <p className="font-display text-xl uppercase">{c.label}</p>
                    <p className="text-sm">{c.note}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <StarterStackSection onLearnMore={openDetail} />
        <DirectorySection saved={saved} onLearnMore={openDetail} />

        {EXAMPLES.length > 0 && (
          <section id="examples" aria-labelledby="ex-title" className="border-t-2 border-ink bg-ink text-cream">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
              <h2 id="ex-title" className="font-display text-3xl uppercase sm:text-4xl">See what you can make</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {EXAMPLES.map((ex) => (
                  <figure key={ex.id} className="rounded-md border-4 border-magenta bg-cream p-3 text-ink">
                    <img src={ex.image} alt={ex.alt} loading="lazy" width={800} height={500} className="aspect-[8/5] w-full rounded-sm object-cover" />
                    <figcaption className="mt-3">
                      <p className="font-display">{ex.name}</p>
                      <p className="text-sm text-muted-foreground">{ex.tools.join(" + ")}</p>
                      <p className="mt-1">{ex.result}</p>
                      {ex.link && <a href={ex.link} target="_blank" rel="noopener noreferrer" className="font-semibold underline">View project</a>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <SavedSection saved={saved} />
      </main>

      <footer className="border-t-2 border-ink bg-emerald text-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={jadaAvatar.url}
              alt=""
              width={512}
              height={512}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-full border-2 border-cream object-cover"
            />
            <div>
              <p className="font-serif text-2xl italic">“Start with the problem. Pick the tools that help you solve it.”</p>
              <p className="mt-2 font-semibold">Curated by {SITE.curator}.</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-cream/85">List reviewed {SITE.reviewedOn}. Tool features and pricing can change, so check each official site before you commit.</p>
        </div>
      </footer>

      <DetailDialog id={detail} onClose={closeDetail} saved={saved} />
    </>
  );
}
