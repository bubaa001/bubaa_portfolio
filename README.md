# Bubaa — Portfolio

Personal portfolio built with **Next.js 15 + Tailwind CSS**. Fully static, dark mode, SEO-ready.

## Quick start
```bash
npm install
npm run dev   # http://localhost:3000
```

## Personalise
Everything about you lives in **`site.config.ts`**: name, title, bio, email, socials, skills, experience, résumé link and nav.

## Add a project (no code needed)
1. Copy `content/projects/_template.md` to `content/projects/my-project.md`.
2. Fill in the frontmatter (`title`, `summary`, `date`, `tags`, `tech`, `cover`, `repo`, `demo`, `featured`, `status`) and write the case study in Markdown.
3. Put the cover image in `public/projects/`.

It automatically appears on `/projects`, gets its own page at `/projects/my-project`, its tags become filters, and `featured: true` shows it on the home page.

## Deploy
Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — zero config. Then set `url` in `site.config.ts` to your domain.

## Structure
```
app/              pages (home, /projects, /projects/[slug], sitemap, robots)
components/       UI components
content/projects/ one Markdown file per project
lib/projects.ts   loads + renders project files
site.config.ts    your details
```
