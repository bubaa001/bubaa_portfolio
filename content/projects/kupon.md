---
title: "Kupon — Campus Food Payments for Tanzanian Universities"
summary: "A mobile-first platform that replaces paper meal coupons: students scan the counter QR, order and pay, and get a vendor-verified coupon on one auditable ledger."
date: "2026-11-19"
tags: ["Web App", "Fintech", "SaaS"]
tech: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Recharts", "PWA"]
cover: "/projects/kupon.jpg"
demo: "https://kupon-rust.vercel.app"
repo: "https://github.com/bubaa001/kupon"
featured: true
order: 1
status: "in-progress"
---

## The problem
University cafeterias in Tanzania run on paper notebooks and coupons. Records get lost, claims are hard to verify, and owners have no reliable view of their sales.

## What I built
A multi-tenant platform with four roles, each with its own experience:

- **Students** (installable PWA): Google sign-in, scan the cafeteria's counter QR, browse today's menu with photos, pay, and receive a **QR meal coupon** once the order is confirmed. Full history and credit requests.
- **Vendors** (mobile POS): order desk with bulk accept, **coupon scanning** (QR or 6-digit code, single-use), menu management with a live student preview, team invitations, payment history.
- **University admins**: dashboards, transactions and reports.
- **Super admin**: tenants, revenue and platform health across campuses.

![University admin dashboard](/projects/kupon-admin.jpg)

## Engineering highlights
- Append-only transaction and coupon records with audit history
- Vendor-scoped data and role boundaries so it scales from one cafeteria to many universities
- Payment state machine (`INITIATED → RECEIVED → CONFIRMED`) behind a test gateway, ready for mobile-money integration
- Automated screenshot suite at mobile and desktop widths from real seeded data

## Status
Live demo on Vercel; mobile-money checkout is the next milestone.
