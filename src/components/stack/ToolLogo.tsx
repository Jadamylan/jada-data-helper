import { useState } from "react";
import { initials, logoUrl, type Resource } from "@/data/resources";

export function ToolLogo({ resource, size = 40 }: { resource: Resource; size?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-sm border border-ink/20 bg-paper"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {failed ? (
        <span className="font-display text-xs text-ink">{initials(resource.name)}</span>
      ) : (
        <img
          src={logoUrl(resource)}
          alt=""
          width={size * 0.6}
          height={size * 0.6}
          loading="lazy"
          onError={() => setFailed(true)}
          className="object-contain"
          style={{ width: size * 0.6, height: size * 0.6 }}
        />
      )}
    </span>
  );
}

const statusStyle: Record<string, string> = {
  "My go-to": "bg-lime text-ink",
  "Expanded toolkit": "bg-cyan/25 text-ink",
  "Worth exploring": "bg-gold/35 text-ink",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border border-ink px-2 py-0.5 text-xs font-semibold ${statusStyle[status]}`}>
      {status === "My go-to" && <span aria-hidden="true">★</span>}
      {status}
    </span>
  );
}
