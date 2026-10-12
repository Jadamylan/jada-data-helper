import { useCallback, useEffect, useState } from "react";

const KEY = "jada-build-stack:saved";

function read(): { ids: string[]; ok: boolean } {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return { ids: Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [], ok: true };
  } catch {
    return { ids: [], ok: false };
  }
}

export function useSaved() {
  const [ids, setIds] = useState<string[]>([]);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const r = read();
    setIds(r.ids);
    setAvailable(r.ok);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      setAvailable(false);
    }
  }, []);

  return {
    ids,
    available,
    isSaved: (id: string) => ids.includes(id),
    toggle: (id: string) => persist(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]),
    remove: (id: string) => persist(ids.filter((x) => x !== id)),
    clear: () => persist([]),
  };
}

export type SavedApi = ReturnType<typeof useSaved>;

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
