export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}
