# n8n workflows

Importable workflows for the "n8n AI automation" gig. `build.py` generates them; the lead-qualifier
prompt and schema are read from `lib/automation/qualify.ts`, so the website demo and the workflow stay identical.

| File | What it does |
|---|---|
| `ai-lead-qualifier.json` | Webhook form → Claude scores the lead (structured JSON) → Google Sheets log → hot leads emailed with a reply draft → form gets a JSON answer |
| `competitor-price-monitor.json` | Daily 8:00 → fetch competitor page → extract titles/prices → compare with last run → email the changes |

**Tested** in n8n 2.49.7: both import cleanly. The price monitor ran end-to-end (fetched the page, extracted 11 products, compared with the previous run). The lead qualifier's own nodes (request builder, parser, hot/not-hot branch) ran with a sample Claude response. Its live Claude call and the Sheets/email steps were not run, because they need the client's credentials.

## Client setup (10 minutes)
1. n8n → Workflows → **Import from file** → pick the `.json`.
2. Credentials:
   - **Anthropic API key (x-api-key):** type *Header Auth*, name `x-api-key`, value = the client's key from console.anthropic.com.
   - **Google Sheets account:** OAuth; create a sheet with a `Leads` tab and paste its URL into the Sheets node.
   - **SMTP account** (or swap the node for Gmail/Slack).
3. Change `toEmail` / `fromEmail`, and the competitor URL + CSS selectors for the monitor.
4. Click **Test workflow**, then **Activate**. For the lead form, POST JSON to the production webhook URL
   (`/webhook/lead`) with `name, email, company, budget, message`.

Price monitor note: "compare with last run" uses workflow static data, which n8n saves on activated (production) runs, so changes are detected from the second scheduled run on.
