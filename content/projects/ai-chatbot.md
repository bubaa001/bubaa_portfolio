---
title: "Ember — AI Chatbot for a Restaurant"
summary: "A Claude-powered support chatbot that answers only from the business's own info and installs on any website (WordPress, Shopify, Wix) with one line of code."
date: "2026-11-24"
tags: ["AI", "Chatbot", "Concept"]
tech: ["Claude API", "Next.js", "Streaming", "Embed script"]
cover: "/projects/ai-chatbot.png"
demo: "/demos/ai-chat"
featured: true
order: 3
status: "completed"
---

## The brief
Concept project: a small business wants to stop answering the same questions on WhatsApp and the phone all day.

## What's inside
- Floating chat widget that fits any website
- Streaming "typing" replies, quick-reply chips, auto-scroll
- Answers from the business's own information (hours, menu, policies)
- Hand-off to a human when it doesn't know

## Built like a product
- **Real AI:** streams answers from Claude, grounded in a per-client knowledge file
- **Embed anywhere:** `<script src=".../embed.js" data-bot="client-id">` works on any website
- **Safe:** knowledge and API key stay on the server; rate limiting; refuses off-topic questions; hands off to a human
- **New client in hours:** copy one config (business info, colors, quick replies), deploy