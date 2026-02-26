# Kagent — AI Context Guide

## What is this project?
Kagent is a **task management and project collaboration platform** built with Next.js. It features a **timeline-centric UI** where tasks, deadlines, documents, and budgets converge.

## Quick Reference
- **Full plan:** `PROJECT_PLAN.md` — architecture, schema, phases, routes
- **Tech:** Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui, Prisma + PostgreSQL, NextAuth
- **DB Schema:** Defined in `prisma/schema.prisma`
- **Oracle Health project data:** `data/projects/oracle-health/`

## Core Modules
1. **Timeline & Tasks** — Gantt-style timeline with drag-and-drop tasks and milestones
2. **Document Hub** — Versioned files (docs, images, media, spreadsheets) attached to timeline nodes, accessed via drawer
3. **Collaboration** — Simple accounts, project-level roles (owner/editor/viewer), activity feed
4. **Project Budgets** — Categories, cost items, budget-vs-actual charts
5. **Personal Finance** (private) — Personal budgets, business expense tracking with receipts

## Project Structure
```
kagent/
├── CLAUDE.md                  # This file — AI session context
├── PROJECT_PLAN.md            # Full architecture & roadmap
├── data/projects/             # Project-specific data & requirements
│   └── oracle-health/         # Oracle Health integration project
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (auth)/            # Login, register
│   │   ├── (dashboard)/       # Main dashboard
│   │   ├── projects/[id]/     # Project views (timeline, docs, budget)
│   │   └── personal/          # Private finance section
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── timeline/          # Timeline components
│   │   ├── documents/         # Document hub components
│   │   └── budget/            # Budget components
│   ├── lib/                   # Utilities, db client, auth config
│   └── types/                 # TypeScript type definitions
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

## Commands
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Lint
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
```

## Implementation Status
- Phase 1 (Foundation): **In progress**
- Phase 2 (Timeline & Tasks): Not started
- Phase 3 (Document Hub): Not started
- Phase 4 (Collaboration): Not started
- Phase 5 (Budgets): Not started
- Phase 6 (Polish & Deploy): Not started
