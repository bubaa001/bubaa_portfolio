---
title: "MURA — Personal Discipline App (Flutter + Django)"
summary: "A habits, streaks and focus app with its own publishing studio: Flutter Android app, Django REST API, and a React content studio that pushes updates and notifications."
date: "2026-09-15"
tags: ["Mobile App", "Full-Stack"]
tech: ["Flutter", "Dart", "Django", "Django REST Framework", "JWT", "React", "Push notifications"]
cover: "/projects/mura.jpg"
repo: "https://github.com/bubaa001/MURA_MOTIVE-YOUR-DAY"
featured: true
order: 2
status: "completed"
---

## What it is
MURA ("Motive Your Day") is a personal discipline operating system: Today, Habits, Plan, Wealth, Journal and Library, in light and dark themes.

## The system
| Piece | What it does |
|---|---|
| **Flutter app** | The Android product (v1.4.5) with an in-app updater |
| **Django REST API** | JWT auth, a streak engine with grace days, content lifecycle (published / draft / archived), push campaigns |
| **TheFeeder studio** (React) | Write, review and publish everything the app shows, plus a broadcast push composer |
| **Releases** | APKs published to GitHub Releases; installed apps detect, download and install updates themselves |

## Highlights
- Owns the full loop: content studio → API → app → push notification
- One-click local stack (backend + tunnel + studio) and an automated release command
- Backend test suite
