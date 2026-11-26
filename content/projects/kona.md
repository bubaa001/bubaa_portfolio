---
title: "Kona — AI Sales Agent for a Digital Products Store"
summary: "A Django + React marketplace with a local, zero-cost AI sales agent that understands intent, recommends products, builds bundles and walks buyers to checkout."
date: "2026-05-09"
tags: ["AI", "E-commerce"]
tech: ["Python", "Django", "NumPy", "React", "Docker"]
cover: "/projects/kona.svg"
repo: "https://github.com/bubaa001/kona-digital-marketplace"
featured: false
status: "in-progress"
---

## Idea
An online store for digital products (eBooks, templates, courses) where a chat agent does the selling: answering questions, recommending, bundling and closing.

## The agent
- Intent classification with confidence scoring
- Semantic product matching with NumPy vectors
- Conversation state machine: greeting → discovery → recommendation → checkout → fulfillment
- Dynamic bundles with real discounts and per-session memory
- Runs 100% locally (no paid API), with a path to a hosted LLM later

## Status
The agent core is built and self-tested; the full REST API and React storefront are in progress.
