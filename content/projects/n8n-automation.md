---
title: "AI Lead Qualifier & Price Monitor — n8n Automations"
summary: "Two ready-to-import n8n workflows: Claude scores every website lead and emails you the hot ones with a reply drafted; a daily scraper alerts you when competitor prices change."
date: "2026-11-26"
tags: ["Automation", "AI", "n8n"]
tech: ["n8n", "Claude API", "Google Sheets", "Webhooks", "SMTP"]
cover: "/projects/n8n-automation.png"
demo: "/demos/automation"
featured: true
order: 4
status: "completed"
---

## The problem
Small businesses lose leads because nobody answers fast enough, and they track competitors by hand.

## Workflow 1 — AI Lead Qualifier
Website form → **Claude** reads the message and returns a structured verdict (score 0–100, hot/warm/cold, intent, budget fit, urgency, next step and a ready-to-send reply) → every lead logged to **Google Sheets** → hot leads trigger an **email alert** with the reply draft.

## Workflow 2 — Competitor Price Monitor
Every morning → scrape the competitor's page → compare with yesterday (stored inside n8n) → email a list of what changed and by how much.

## Delivery
Importable `.json` workflows, credentials connected for the client, tested end-to-end, plus a short Loom-style walkthrough.
