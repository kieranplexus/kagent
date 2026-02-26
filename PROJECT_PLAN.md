# Kagent — Project & Task Management Platform

## Overview

Kagent is a web application for managing daily tasks, project documentation, budgets, and collaboration. It provides a **timeline-centric** interface where tasks, deadlines, and documents converge into a single visual workspace.

---

## Core Modules

### 1. Timeline & Task Management
- **Timeline View** — Gantt-style horizontal timeline showing tasks, milestones, and deadlines
- **Task Cards** — Each task has status, assignee, priority, due date, tags, and linked documents
- **Milestones** — Key deliverables pinned on the timeline
- **Filters** — By project, assignee, status, date range, priority
- **Drag & drop** rescheduling directly on the timeline

### 2. Document Hub (accessed from Timeline)
Documents are **attached to timeline nodes** (tasks, milestones, date markers). Clicking a timeline node opens a **document drawer/panel** showing all related files.

- **Document versioning** — Full version history for every file
- **Supported types:**
  - Rich text / Markdown documents
  - Images and media (with preview)
  - Spreadsheets (CSV/Excel viewer + editor)
  - PDFs and general file attachments
- **Folder structure** — Projects have a folder tree for organising documents
- **Inline preview** — View documents without leaving the timeline
- **Upload & attach** — Drag files onto timeline items to link them

### 3. Collaboration & Accounts
- **Simple sign-up** — Email + password (or magic link)
- **Project-level access** — Invite collaborators to specific projects
- **Roles:** Owner, Editor, Viewer
- **Activity feed** — See who changed what and when
- **Comments** — On tasks and documents

### 4. Project Budget & Cost Planning
- **Budget categories** — Labour, software, hardware, travel, misc
- **Cost items** — Line items with amount, category, date, status (planned/committed/spent)
- **Budget vs Actual** — Visual comparison charts
- **Forecasting** — Project remaining budget at current burn rate
- **Linked to timeline** — Costs can be tied to milestones/tasks

### 5. Personal Finance Section (Private)
- **Personal budgets** — Separate from project budgets, visible only to the owner
- **Business expenses** — Log receipts, categorise, track reimbursement status
- **Expense categories** — Travel, meals, equipment, subscriptions, etc.
- **Monthly/quarterly views** — Spending trends and summaries
- **Receipt attachments** — Upload photos/scans of receipts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| Database | **PostgreSQL** via **Prisma ORM** |
| Auth | **NextAuth.js** (credentials + magic link) |
| File Storage | **Local / S3-compatible** (abstracted) |
| Timeline | Custom React component (using `date-fns`) |
| Charts | **Recharts** |
| State | **React Context** + server components |
| Deployment | **Vercel** / Docker |

---

## Database Schema (High Level)

```
User
  id, email, name, passwordHash, role, createdAt

Project
  id, name, description, ownerId, color, createdAt

ProjectMember
  id, projectId, userId, role (owner/editor/viewer)

Task
  id, projectId, title, description, status, priority,
  assigneeId, startDate, dueDate, completedAt, parentTaskId

Milestone
  id, projectId, title, date, description

Document
  id, projectId, taskId?, milestoneId?, folderId?,
  name, type, currentVersionId

DocumentVersion
  id, documentId, versionNumber, filePath, fileSize,
  mimeType, uploadedById, createdAt, notes

Folder
  id, projectId, parentFolderId?, name

Comment
  id, taskId?, documentId?, authorId, body, createdAt

BudgetCategory
  id, projectId, name, allocatedAmount

CostItem
  id, budgetCategoryId, description, amount, date,
  status (planned/committed/spent), taskId?, milestoneId?

PersonalBudget
  id, userId, name, month, year, allocatedAmount

Expense
  id, userId, personalBudgetId?, category, description,
  amount, date, receiptPath, reimbursementStatus

ActivityLog
  id, projectId, userId, action, entityType, entityId, createdAt
```

---

## Application Routes

```
/                         → Dashboard (project list, upcoming deadlines)
/login                    → Sign in
/register                 → Create account

/projects                 → All projects
/projects/[id]            → Project overview
/projects/[id]/timeline   → Timeline view (primary workspace)
/projects/[id]/documents  → Document browser (folder tree)
/projects/[id]/budget     → Budget & cost planning
/projects/[id]/settings   → Project settings & members

/personal                 → Personal finance dashboard
/personal/budgets         → Personal budgets
/personal/expenses        → Business expense tracker

/settings                 → User profile & preferences
```

---

## Page Layouts

### Timeline View (`/projects/[id]/timeline`)
```
┌─────────────────────────────────────────────────────┐
│  Header: Project Name  |  Filters  |  View Toggle   │
├────────┬────────────────────────────────────────────┤
│        │                                            │
│  Side  │   ◆━━━━━━━━━━━━━━◆━━━━━━━━◆              │
│  Panel │   Task A          Task B   Milestone       │
│        │      ◆━━━━━━━━━━━━━━━━━━━━━━━━◆           │
│ (task  │      Task C                    Task D      │
│  list) │                                            │
│        │   ▼ Click a node to open Document Drawer   │
│        │                                            │
├────────┴────────────────────────────────────────────┤
│  Document Drawer (slides up from bottom or right)   │
│  ┌──────────┬──────────────────────────────────┐    │
│  │ File List │  Preview / Version History       │    │
│  │ + Upload  │                                  │    │
│  └──────────┴──────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Budget View (`/projects/[id]/budget`)
```
┌─────────────────────────────────────────────────────┐
│  Budget Overview                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ Total: £50,000   │  │  ██████████░░░ 67% used  │ │
│  │ Spent: £33,500   │  │                          │ │
│  │ Remaining: £16.5k│  │  [Bar chart by category] │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                      │
│  Cost Items Table                                    │
│  ┌────────┬──────┬────────┬────────┬───────┐        │
│  │ Item   │ Cat  │ Amount │ Date   │ Status│        │
│  ├────────┼──────┼────────┼────────┼───────┤        │
│  │ ...    │ ...  │ ...    │ ...    │ ...   │        │
│  └────────┴──────┴────────┴────────┴───────┘        │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1 — Foundation (Current)
- [x] Project plan and architecture
- [ ] Next.js project scaffolding
- [ ] Database schema with Prisma
- [ ] Authentication (NextAuth)
- [ ] Basic layout, navigation, and dashboard

### Phase 2 — Timeline & Tasks
- [ ] Timeline component (Gantt-style)
- [ ] Task CRUD (create, read, update, delete)
- [ ] Drag & drop on timeline
- [ ] Task detail panel

### Phase 3 — Document Hub
- [ ] File upload and storage
- [ ] Document versioning
- [ ] Folder structure
- [ ] Document drawer on timeline
- [ ] Inline previews (images, PDFs, markdown, spreadsheets)

### Phase 4 — Collaboration
- [ ] User registration and login
- [ ] Project member invitations
- [ ] Role-based access control
- [ ] Activity feed and comments

### Phase 5 — Budgets
- [ ] Project budget categories and cost items
- [ ] Budget vs actual charts
- [ ] Personal budgets (private)
- [ ] Business expense tracker with receipts

### Phase 6 — Polish & Deploy
- [ ] Responsive design
- [ ] Search (global and per-project)
- [ ] Notifications
- [ ] Export (CSV, PDF reports)
- [ ] Production deployment

---

## Active Projects

### Oracle Health Integration
- **Status:** Planning / Requirements Gathering
- **Description:** Integration project with Oracle Health systems
- **Details:** See `/projects/oracle-health/` for full requirements and gathered data
- **Notes:** Requirements being migrated from external notes into this system

---

## Key Design Decisions

1. **Timeline-first UX** — The timeline is the primary workspace, not a secondary view
2. **Documents live on the timeline** — Every file is linked to a task or milestone, accessed via a drawer
3. **Personal finance is isolated** — Completely separate data model, no project-level visibility
4. **Progressive complexity** — Start simple, add features per phase
5. **Server-first with Next.js** — Use server components and server actions where possible to minimise client JS
