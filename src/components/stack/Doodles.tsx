export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M5 45 C 35 10, 75 5, 108 28" />
      <path d="M95 14 L109 29 L90 34" />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M20 3 L24 16 L37 17 L26 25 L30 37 L20 29 L10 37 L14 25 L3 17 L16 16 Z" />
    </svg>
  );
}

export function Rings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden="true" fill="none" strokeWidth="5">
      <ellipse cx="30" cy="20" rx="22" ry="9" stroke="var(--gold)" />
      <ellipse cx="30" cy="38" rx="22" ry="9" stroke="var(--antique)" />
      <ellipse cx="30" cy="56" rx="22" ry="9" stroke="var(--gold)" />
    </svg>
  );
}

export function Circle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 70" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" preserveAspectRatio="none">
      <path d="M20 40 C 15 10, 180 5, 190 32 C 198 60, 30 70, 12 45 C 5 30, 60 12, 120 12" />
    </svg>
  );
}
