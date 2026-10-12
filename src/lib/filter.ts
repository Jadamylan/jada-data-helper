import type { Audience, CategoryId, Resource, Status } from "@/data/resources";

export interface Filters {
  q: string;
  category: CategoryId | "all";
  audience: Audience | "all";
  status: Status | "all";
}

export const EMPTY_FILTERS: Filters = { q: "", category: "all", audience: "all", status: "all" };

export function filterResources(list: Resource[], f: Filters) {
  const q = f.q.trim().toLowerCase();
  return list.filter(
    (r) =>
      (f.category === "all" || r.category === f.category) &&
      (f.audience === "all" || r.audiences.includes(f.audience)) &&
      (f.status === "all" || r.status === f.status) &&
      (!q || [r.name, r.description, r.goodFor, r.type].join(" ").toLowerCase().includes(q)),
  );
}
