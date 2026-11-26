import { siteConfig } from "@/site.config";
import { SocialIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-zinc-500">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js & Tailwind.</p>
        <div className="flex gap-2">
          {siteConfig.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition hover:border-white/25 hover:text-white">
              <SocialIcon label={s.label} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
