// Shared mock data — will be replaced with real DB queries later

export interface TaskContext {
  /** Why this task matters right now */
  reason: string;
  /** Tags that drive scoring: external-dependency, long-lead, revenue-blocker, deadline-risk */
  tags: string[];
  /** External party involved (e.g. "Avala Hospital", "Oracle") */
  externalParty?: string;
  /** Estimated lead time in days for external response */
  leadTimeDays?: number;
  /** IDs of tasks that are blocked until this one completes */
  blocks?: string[];
}

export interface MockTask {
  id: string;
  projectId: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string | null;
  assignee: string | null;
  parentTaskId: string | null;
  context?: TaskContext;
}

export interface MockProject {
  id: string;
  name: string;
  description: string;
  color: string;
  status: "Active" | "On Hold" | "Completed";
  startDate: string;
  targetDate: string;
  /** Can this project generate revenue once live? */
  revenueReady?: boolean;
  tasks: MockTask[];
}

export const mockProjects: MockProject[] = [
  {
    id: "oracle-health",
    name: "Oracle Health Integration",
    description:
      "Integration project with Oracle Health systems for health data exchange interfaces.",
    color: "#ef4444",
    status: "Active",
    startDate: "2026-02-01",
    targetDate: "2026-06-30",
    tasks: [
      {
        id: "t1",
        projectId: "oracle-health",
        title: "Requirements Gathering",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-03-01",
        assignee: "You",
        parentTaskId: null,
        context: {
          reason: "Avala Hospital contacts take 5-7 days to respond — submit requests now to stay on schedule",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Avala Hospital",
          leadTimeDays: 7,
          blocks: ["t3", "t4"],
        },
      },
      {
        id: "t2",
        projectId: "oracle-health",
        title: "Stakeholder Interviews",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-02-20",
        assignee: "You",
        parentTaskId: "t1",
      },
      {
        id: "t3",
        projectId: "oracle-health",
        title: "API Scope Definition",
        status: "TODO",
        priority: "HIGH",
        dueDate: "2026-03-15",
        assignee: "You",
        parentTaskId: null,
        context: {
          reason: "Blocked by requirements — needs Oracle API documentation access",
          tags: ["external-dependency"],
          externalParty: "Oracle",
          leadTimeDays: 10,
          blocks: ["t5"],
        },
      },
      {
        id: "t4",
        projectId: "oracle-health",
        title: "Architecture Review",
        status: "TODO",
        priority: "URGENT",
        dueDate: "2026-03-15",
        assignee: null,
        parentTaskId: null,
        context: {
          reason: "Blocks all development work — schedule review meeting this week",
          tags: ["deadline-risk"],
          blocks: ["t5", "t6"],
        },
      },
      {
        id: "t5",
        projectId: "oracle-health",
        title: "Development Sprint 1",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-04-15",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "t6",
        projectId: "oracle-health",
        title: "FHIR Endpoint Mapping",
        status: "IN_PROGRESS",
        priority: "URGENT",
        dueDate: "2026-03-10",
        assignee: "You",
        parentTaskId: null,
        context: {
          reason: "Oracle requires FHIR conformance docs before granting sandbox access — send today",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Oracle",
          leadTimeDays: 14,
          blocks: ["t7"],
        },
      },
      {
        id: "t7",
        projectId: "oracle-health",
        title: "Integration Testing",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-05-15",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "t8",
        projectId: "oracle-health",
        title: "Security Audit",
        status: "TODO",
        priority: "HIGH",
        dueDate: "2026-05-30",
        assignee: null,
        parentTaskId: null,
        context: {
          reason: "External auditor has 3-week booking lead time — schedule now",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Security Auditor",
          leadTimeDays: 21,
        },
      },
      {
        id: "t9",
        projectId: "oracle-health",
        title: "Go-Live Preparation",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-06-15",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "t10",
        projectId: "oracle-health",
        title: "Go-Live",
        status: "TODO",
        priority: "URGENT",
        dueDate: "2026-06-30",
        assignee: null,
        parentTaskId: null,
      },
    ],
  },
  {
    id: "website-redesign",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company website with new branding and improved UX.",
    color: "#8b5cf6",
    status: "Active",
    startDate: "2026-01-15",
    targetDate: "2026-04-30",
    revenueReady: true,
    tasks: [
      {
        id: "w1",
        projectId: "website-redesign",
        title: "Design System",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-02-15",
        assignee: "You",
        parentTaskId: null,
      },
      {
        id: "w2",
        projectId: "website-redesign",
        title: "Homepage Wireframes",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-02-20",
        assignee: "You",
        parentTaskId: null,
      },
      {
        id: "w3",
        projectId: "website-redesign",
        title: "Frontend Development",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-03-30",
        assignee: "You",
        parentTaskId: null,
        context: {
          reason: "Revenue-generating — site launch in 9 weeks enables new client onboarding",
          tags: ["revenue-blocker"],
          blocks: ["w4", "w6"],
        },
      },
      {
        id: "w4",
        projectId: "website-redesign",
        title: "CMS Integration",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-04-10",
        assignee: null,
        parentTaskId: null,
        context: {
          reason: "Marketing team needs CMS access to prepare launch content",
          tags: ["revenue-blocker"],
          blocks: ["w5"],
        },
      },
      {
        id: "w5",
        projectId: "website-redesign",
        title: "Content Migration",
        status: "TODO",
        priority: "LOW",
        dueDate: "2026-04-20",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "w6",
        projectId: "website-redesign",
        title: "Launch",
        status: "TODO",
        priority: "URGENT",
        dueDate: "2026-04-30",
        assignee: null,
        parentTaskId: null,
        context: {
          reason: "Revenue milestone — new site goes live, enables paid campaigns",
          tags: ["revenue-blocker", "deadline-risk"],
        },
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App MVP",
    description:
      "Build the first version of the companion mobile app for iOS and Android.",
    color: "#06b6d4",
    status: "Active",
    startDate: "2026-02-10",
    targetDate: "2026-07-31",
    tasks: [
      {
        id: "m1",
        projectId: "mobile-app",
        title: "User Research",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-02-28",
        assignee: "You",
        parentTaskId: null,
      },
      {
        id: "m2",
        projectId: "mobile-app",
        title: "UI/UX Prototyping",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-03-20",
        assignee: "You",
        parentTaskId: null,
        context: {
          reason: "Freelance designer contract ends Mar 25 — finalise prototypes before then",
          tags: ["external-dependency", "deadline-risk"],
          externalParty: "Freelance Designer",
          leadTimeDays: 5,
          blocks: ["m3", "m4"],
        },
      },
      {
        id: "m3",
        projectId: "mobile-app",
        title: "API Layer Setup",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-04-01",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "m4",
        projectId: "mobile-app",
        title: "Core Features Development",
        status: "TODO",
        priority: "HIGH",
        dueDate: "2026-05-31",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "m5",
        projectId: "mobile-app",
        title: "Beta Testing",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-06-30",
        assignee: null,
        parentTaskId: null,
      },
      {
        id: "m6",
        projectId: "mobile-app",
        title: "App Store Submission",
        status: "TODO",
        priority: "URGENT",
        dueDate: "2026-07-31",
        assignee: null,
        parentTaskId: null,
      },
    ],
  },
];

// Priority order for sorting (highest first)
const priorityOrder: Record<string, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export function getTopLevelTasks(project: MockProject): MockTask[] {
  return project.tasks.filter((t) => t.parentTaskId === null);
}

export function getAllPriorityTasks(): MockTask[] {
  return mockProjects
    .flatMap((p) => p.tasks)
    .filter((t) => t.parentTaskId === null && t.status !== "DONE" && t.status !== "CANCELLED")
    .sort((a, b) => {
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      // Secondary sort by due date
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      if (a.dueDate) return -1;
      return 1;
    });
}

export function getProjectById(id: string): MockProject | undefined {
  return mockProjects.find((p) => p.id === id);
}

// ── Today's Focus: smart task scoring ────────────────────────────

export interface FocusTask {
  task: MockTask;
  project: MockProject;
  score: number;
  reason: string;
}

/**
 * Scores and ranks tasks for "Today's Focus" based on:
 * 1. External dependencies with long lead times (act now, wait later)
 * 2. Revenue-blocking tasks on near-term projects
 * 3. Tasks that block many downstream tasks (critical path)
 * 4. Deadline proximity
 * 5. Raw priority
 */
export function getTodaysFocus(today: string = "2026-02-26"): FocusTask[] {
  const todayMs = new Date(today).getTime();
  const results: FocusTask[] = [];

  for (const project of mockProjects) {
    if (project.status !== "Active") continue;

    for (const task of project.tasks) {
      // Only surface actionable tasks
      if (task.status === "DONE" || task.status === "CANCELLED") continue;
      if (task.parentTaskId !== null) continue;

      let score = 0;
      let reason = "";
      const ctx = task.context;

      // ── 1. External dependencies with lead time ──
      // These are the highest-value actions: a 5-minute email today
      // can save weeks of delay later.
      if (ctx?.tags.includes("external-dependency")) {
        const lead = ctx.leadTimeDays ?? 5;
        score += 40 + lead * 2; // longer lead = more urgent to act now
        reason = ctx.reason;
      }

      // ── 2. Revenue-blocking tasks ──
      // If the project can generate revenue and this task is on the critical path
      if (project.revenueReady && ctx?.tags.includes("revenue-blocker")) {
        const weeksToTarget = Math.max(
          1,
          Math.round(
            (new Date(project.targetDate).getTime() - todayMs) /
              (7 * 24 * 60 * 60 * 1000)
          )
        );
        score += 35 + Math.round(20 / weeksToTarget); // closer = higher boost
        if (!reason) reason = ctx.reason;
      }

      // ── 3. Critical path: blocks other tasks ──
      if (ctx?.blocks && ctx.blocks.length > 0) {
        score += 15 * ctx.blocks.length;
        if (!reason)
          reason = `Blocks ${ctx.blocks.length} downstream task${ctx.blocks.length > 1 ? "s" : ""}`;
      }

      // ── 4. Deadline proximity ──
      if (task.dueDate) {
        const daysUntilDue = Math.round(
          (new Date(task.dueDate).getTime() - todayMs) / (24 * 60 * 60 * 1000)
        );
        if (daysUntilDue <= 3) {
          score += 30;
          if (!reason) reason = "Due in " + (daysUntilDue <= 0 ? "overdue!" : `${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"}`);
        } else if (daysUntilDue <= 7) {
          score += 15;
          if (!reason) reason = `Due in ${daysUntilDue} days`;
        } else if (daysUntilDue <= 14) {
          score += 5;
        }
      }

      // ── 5. Deadline risk tag ──
      if (ctx?.tags.includes("deadline-risk")) {
        score += 10;
      }

      // ── 6. Base priority ──
      score += priorityOrder[task.priority] !== undefined
        ? (3 - priorityOrder[task.priority]) * 5
        : 0;

      // ── 7. Already in progress gets a small boost ──
      if (task.status === "IN_PROGRESS") {
        score += 5;
      }

      if (score > 0) {
        if (!reason) reason = `${task.priority} priority task`;
        results.push({ task, project, score, reason });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
