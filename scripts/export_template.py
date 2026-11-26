#!/usr/bin/env python3
"""Export one template as a standalone Next.js project for a client.

    python3 scripts/export_template.py school ../client-kilele
    cd ../client-kilele && npm install && npm run dev

Templates: shoes, corporate, school, school-admin, brand-kit
The template becomes the site's home page; the preview bar is removed.
"""
import json, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = {"shoes", "corporate", "school", "school-admin", "brand-kit"}

def main():
    if len(sys.argv) != 3 or sys.argv[1] not in TEMPLATES:
        sys.exit(f"usage: export_template.py <{'|'.join(sorted(TEMPLATES))}> <out-dir>")
    name, out = sys.argv[1], Path(sys.argv[2]).resolve()
    if out.exists() and any(out.iterdir()):
        sys.exit(f"{out} is not empty")
    src = ROOT / "app/templates" / name
    (out / "app").mkdir(parents=True, exist_ok=True)

    # 1. template files → app/, preview bar stripped
    for f in src.iterdir():
        text = f.read_text()
        text = re.sub(r'import TemplateBar from "@/components/tpl/TemplateBar";\n', "", text)
        text = re.sub(r"\s*<TemplateBar[^/]*/>", "", text)
        if f.name == "layout.tsx":
            text = text.replace('import type { Metadata } from "next";', 'import type { Metadata } from "next";\nimport "./globals.css";')
            text = re.sub(r"return <div className=\{`([^`]*)`\}>\{children\}</div>;",
                          r'return <html lang="en"><body className={`\1`}>{children}</body></html>;', text)
        (out / "app" / f.name).write_text(text)
    if not (src / "layout.tsx").exists():  # templates without fonts get a plain root layout
        (out / "app/layout.tsx").write_text('import "./globals.css";\nimport { GeistSans } from "geist/font/sans";\n\nexport const metadata = { title: "Website" };\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html lang="en" className={GeistSans.variable}><body>{children}</body></html>;\n}\n')

    # 2. shared components used by templates
    for rel in ["components/Reveal.tsx", "components/tpl/CountUp.tsx"]:
        (out / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(ROOT / rel, out / rel)

    # 3. styles, config, assets
    css = (ROOT / "app/globals.css").read_text()
    css = re.sub(r"body \{[^}]*\}", "body { margin: 0; }", css, count=1)
    (out / "app/globals.css").write_text(css)
    for rel in ["tailwind.config.ts", "postcss.config.mjs", "tsconfig.json"]:
        shutil.copy(ROOT / rel, out / rel)
    tw = (out / "tailwind.config.ts").read_text().replace('"./components/**/*.{ts,tsx}"', '"./components/**/*.{ts,tsx}"')
    (out / "tailwind.config.ts").write_text(tw)
    (out / "next.config.mjs").write_text("/** @type {import('next').NextConfig} */\nexport default {};\n")
    shutil.copytree(ROOT / "public/templates/img", out / "public/templates/img")
    if name == "shoes":
        shutil.copytree(ROOT / "public/templates/shoes", out / "public/templates/shoes")
    (out / ".gitignore").write_text("node_modules\n.next\nnext-env.d.ts\n*.tsbuildinfo\n.env*.local\n.vercel\n")

    pkg = json.loads((ROOT / "package.json").read_text())
    keep = {"next", "react", "react-dom", "geist"}
    pkg_out = {
        "name": f"{name}-site", "version": "1.0.0", "private": True,
        "scripts": {"dev": "next dev", "build": "next build", "start": "next start"},
        "dependencies": {k: v for k, v in pkg["dependencies"].items() if k in keep},
        "devDependencies": {k: v for k, v in pkg["devDependencies"].items() if k in {"@tailwindcss/typography", "@types/node", "@types/react", "@types/react-dom", "autoprefixer", "postcss", "tailwindcss", "typescript"}},
    }
    (out / "package.json").write_text(json.dumps(pkg_out, indent=2) + "\n")
    (out / "README.md").write_text(f"# {name} website\n\n```bash\nnpm install\nnpm run dev\n```\n\nEdit the content in `app/data.ts` (if present) and replace the photos in `public/templates/img/`.\nDeploy: push to GitHub and import on Vercel.\n")
    print(f"✓ exported '{name}' to {out}")

if __name__ == "__main__":
    main()
