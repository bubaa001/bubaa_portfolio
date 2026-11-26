# Fiverr launch kit: premium templates

**What we sell:** premium, animated templates, customised for each buyer (name, logo, colours, photos, content) and deployed for them.
Every gig has a live demo on the portfolio's `/templates` page, and covers in `public/templates/covers/` to use as gig images.

## Why these four (gig-optimizer data, 1,257 Fiverr gigs, Jun–Nov 2026)
| Keyword | Competing gigs | Demand | Market median (Basic / Standard / Premium) |
|---|---|---|---|
| school website / company website | 62,386 | **100** | $98 / $243 / $475 (websites, n=190) |
| ecommerce website | 62,386 | **100** | $100 / $250 / $500 (n=61) |
| brand guidelines / identity kit | 18,434 | **100** | $120 / $203 / $310 (n=39) |
| school / management system | (no exact match) | — | $45 / $300 / $585 (n=16) |

Demand is maxed in all of them. The edge isn't the category, it's **quality you can see before buying**: live, animated demos instead of static screenshots, plus fast delivery because the product already exists.

## The line-up
**Flagships (lead with these):** STRYDE shoe store and Meridian corporate site.

| # | Gig | Basic / Standard / Premium | Demo |
|---|---|---|---|
| ★ | [Premium shoe & sneaker store](gig-0-shoe-store.md) | $129 / $299 / $599 | `/templates/shoes` |
| ★ | [Corporate / official website](gig-3-corporate-website.md) | $99 / $229 / $449 | `/templates/corporate` |
| 1 | [Premium school website](gig-1-school-website.md) | $79 / $179 / $349 | `/templates/school` |
| 2 | [School management system](gig-2-school-management-system.md) | $149 / $349 / $699 | `/templates/school-admin` |
| 4 | [Brand guidelines toolkit](gig-4-brand-guidelines.md) | $69 / $149 / $299 | `/templates/brand-kit` |

All Basic prices are at or above your $50 floor, and below the market median so a new seller still looks like a good deal.

## Delivering an order (hours, not weeks)
1. `python3 scripts/export_template.py <shoes|corporate|school|school-admin|brand-kit> ../client-name`
2. Edit the client's content in `app/data.ts` (school, corporate) or the component text (brand kit, admin), swap photos in `public/templates/img/`, change colours.
3. `npm install && npm run dev` to check, push to a new GitHub repo, import on Vercel, connect their domain.
4. Deliver: live link + source code zip + a 3-minute screen recording showing how to edit.

## Fiverr rules (important)
- Don't put links to your portfolio, phone or email in gig text or messages. Show demos as **gig gallery images and a gig video** (screen-record scrolling the live demo; Fiverr allows up to 75 seconds).
- Photos in the demos are Unsplash (free commercial licence). Clients' own photos replace them on delivery.
- The School Management System Basic/Standard tiers are front-end with browser storage; a real multi-user backend (logins per teacher, database) is the Premium tier. Say this clearly so nobody expects a full ERP for $149.

The earlier AI-services gigs are kept in `archive/`.
