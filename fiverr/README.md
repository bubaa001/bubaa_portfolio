# Fiverr launch kit (data-backed)

**Goal: sell what's already in demand.** Gig choice and prices come from the
[fiverr-gig-optimizer](https://github.com/Ahad690/fiverr-gig-optimizer) scoring scripts run on its
community dataset (1,257 unique gigs scraped Jun–Nov 2026), plus Fiverr's own
[June 2026 Business Trends Index](https://www.fiverr.com/news/business-trends-index-ai-2026).

## Keyword scores (optimizer output)
| Keyword | Competing gigs | Demand | Opportunity |
|---|---|---|---|
| web scraping python | 12,978 | 100 | **45** |
| ai chatbot website | 13,895 | 100 | **44** |
| n8n automation | 13,280 | 100 | **44** |
| react dashboard | 4,580 | 52 | 36 |
| claude code | 4,165 | 4 | 18 (Fiverr: searches **+938%** in 6 months; emerging) |
| nextjs landing page | 23,482 | 30 | **12** ← dropped as a gig |

## The line-up
| # | Gig | Your price (B / S / P) | Market median (B / S / P) | Live proof |
|---|---|---|---|---|
| 1 | [AI chatbot for your website](gig-1-ai-chatbot.md) | $50 / $250 / $650 | $100 / $450 / $925 | `/demos/ai-chat` |
| 2 | [n8n AI automation](gig-2-n8n-automation.md) | $40 / $150 / $400 | $55 / $275 / $500 | `/demos/automation` |
| 3 | [Web scraping → Excel / Sheets](gig-3-web-scraping.md) | $15 / $45 / $120 | $30 / $60 / $130 | `/demos/scraper` |
| 4 | [Fix & ship AI-built apps](gig-4-fix-ai-apps.md) | $40 / $150 / $450 | $105 / $475 / $1,325 (n=6, low confidence) | this portfolio + Vercel fix |

The optimizer's "new seller" suggestion is the market's 10th–25th percentile on Basic. Above, Basic sits slightly above that (so orders aren't worthless) and Premium stays below the median (so it still looks like a deal with 0 reviews). **Raise prices ~20% after every 5 five-star reviews.**

**Launch order:** Gig 1 and Gig 2 on day 1 (highest price and demand). Gig 3 (fast, cheap wins → early reviews) on day 2. Gig 4 in week 2.

**On demand = productized.** Each gig maps to a ready product in this repo, so an order is configuration plus testing, not building from scratch:
- Chatbot: copy a bot in `lib/chatbot/config.ts`, deploy, give the client the one-line embed code.
- n8n: start from `products/n8n/*.json`, swap the prompt, form fields and credentials.
- Scraping: write `products/scraper/configs/<client>.json`, run, deliver Excel.

## Rules
- Demos are labeled concept/practice work; never claim they were paid client jobs.
- Never take payment or contact outside Fiverr.
- Chatbot and n8n gigs: the client pays their own Claude API usage (usually a few $/month). Say so in the gig.
- Scraping: only public data, respect the site's terms and robots.txt, no personal data.
