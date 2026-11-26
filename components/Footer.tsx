import { siteConfig } from "@/site.config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 text-sm dark:border-slate-800">
      <div className="container-x flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-4">
          {siteConfig.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-accent">{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
