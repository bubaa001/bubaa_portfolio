// The brand mark: a rising sun over a horizon line. Pure SVG, recolourable.
export function Mark({ fg = "#141018", accent = "#ff6a2b", size = 48 }: { fg?: string; accent?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M12 40a20 20 0 0 1 40 0z" fill={accent} />
      <rect x="6" y="44" width="52" height="5" rx="2.5" fill={fg} />
      <rect x="16" y="53" width="32" height="5" rx="2.5" fill={fg} opacity=".45" />
    </svg>
  );
}
export function Wordmark({ fg = "#141018", accent = "#ff6a2b", h = 48 }: { fg?: string; accent?: string; h?: number }) {
  return (
    <span className="inline-flex items-center gap-3" style={{ height: h }}>
      <Mark fg={fg} accent={accent} size={h} />
      <span className="font-[family-name:var(--font-display)] font-bold tracking-tight" style={{ color: fg, fontSize: h * 0.78, lineHeight: 1 }}>nuru</span>
    </span>
  );
}
