import { describe, expect, it } from "vitest";
import { RESOURCES, byId } from "@/data/resources";
import { STARTER_STACKS } from "@/data/stacks";
import { filterResources } from "@/lib/filter";

describe("resource catalog", () => {
  it("has exactly 42 unique resources", () => {
    expect(RESOURCES).toHaveLength(42);
    expect(new Set(RESOURCES.map((r) => r.id)).size).toBe(42);
    expect(new Set(RESOURCES.map((r) => r.name)).size).toBe(42);
  });

  it("matches the category counts", () => {
    const count = (c: string) => RESOURCES.filter((r) => r.category === c).length;
    expect(count("think")).toBe(6);
    expect(count("build")).toBe(7);
    expect(count("data")).toBe(10);
    expect(count("organize")).toBe(5);
    expect(count("connect")).toBe(6);
    expect(count("design")).toBe(3);
    expect(count("publish")).toBe(3);
    expect(count("paid")).toBe(2);
  });

  it("includes Tableau and Wix as My go-to and excludes Bitwarden", () => {
    expect(byId("tableau")?.status).toBe("My go-to");
    expect(byId("wix")?.status).toBe("My go-to");
    expect(RESOURCES.some((r) => /bitwarden/i.test(r.name))).toBe(false);
  });

  it("every starter stack points to real tools", () => {
    expect(STARTER_STACKS).toHaveLength(7);
    for (const s of STARTER_STACKS) for (const t of s.tools) expect(byId(t.id), t.id).toBeDefined();
  });

  it("combines search and filters", () => {
    const r = filterResources(RESOURCES, { q: "dashboard", category: "data", audience: "all", status: "My go-to" });
    expect(r.map((x) => x.id)).toEqual(["tableau"]);
  });
});
