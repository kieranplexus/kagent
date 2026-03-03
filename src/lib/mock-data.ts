// Oracle Health OPN project data — based on real project plans
// Will be replaced with real DB queries later

export interface TaskContext {
  /** Why this task matters right now */
  reason: string;
  /** Tags: external-dependency, long-lead, revenue-blocker, deadline-risk, waiting */
  tags: string[];
  /** External party involved */
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
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "CANCELLED" | "WAITING";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  /** Start date for Gantt bar (ISO string) */
  startDate: string;
  /** End date for Gantt bar (ISO string) */
  endDate: string;
  assignee: string | null;
  /** Track grouping: "track-a" (Avala critical path), "track-b" (OPN Marketplace) */
  track: "track-a" | "track-b";
  /** IDs of tasks this depends on (drawn as arrows in Gantt) */
  dependsOn?: string[];
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
  revenueReady?: boolean;
  tasks: MockTask[];
}

export const mockProjects: MockProject[] = [
  {
    id: "oracle-health",
    name: "Oracle Health — Better Day Payments",
    description:
      "OPN registration and Avala Hospital provisioning for SMART-on-FHIR payment app.",
    color: "#ef4444",
    status: "Active",
    startDate: "2026-02-01",
    targetDate: "2026-06-30",
    revenueReady: true,
    tasks: [
      // ═══════════════════════════════════════════════════
      // TRACK A: Code Console → Avala Provisioning (CRITICAL PATH)
      // ═══════════════════════════════════════════════════
      {
        id: "a1",
        projectId: "oracle-health",
        title: "Register SMART-on-FHIR app on Code Console",
        status: "DONE",
        priority: "HIGH",
        startDate: "2026-02-01",
        endDate: "2026-02-03",
        assignee: "Kieran",
        track: "track-a",
      },
      {
        id: "a2",
        projectId: "oracle-health",
        title: "Test app against sandbox environment",
        status: "DONE",
        priority: "HIGH",
        startDate: "2026-02-03",
        endDate: "2026-02-10",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a1"],
      },
      {
        id: "a3",
        projectId: "oracle-health",
        title: "Update Code Console (company name, app name, URIs, contact)",
        status: "DONE",
        priority: "MEDIUM",
        startDate: "2026-02-10",
        endDate: "2026-02-14",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a1"],
      },
      {
        id: "a4",
        projectId: "oracle-health",
        title: "Setup custom domain + SSL (app.betterdaypayments.com)",
        status: "DONE",
        priority: "HIGH",
        startDate: "2026-02-10",
        endDate: "2026-02-18",
        assignee: "Kieran",
        track: "track-a",
      },
      {
        id: "a5",
        projectId: "oracle-health",
        title: "Test OAuth flow on production domain against sandbox",
        status: "DONE",
        priority: "HIGH",
        startDate: "2026-02-18",
        endDate: "2026-02-22",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a3", "a4"],
      },
      {
        id: "a6",
        projectId: "oracle-health",
        title: "Send provisioning email to Avala IT (Stephen)",
        status: "DONE",
        priority: "URGENT",
        startDate: "2026-02-24",
        endDate: "2026-02-24",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a5"],
      },
      {
        id: "a7",
        projectId: "oracle-health",
        title: "Avala: Get Millennium tenant ID from Oracle Health Hosting",
        status: "WAITING",
        priority: "URGENT",
        startDate: "2026-02-24",
        endDate: "2026-03-10",
        assignee: "Avala (Stephen)",
        track: "track-a",
        dependsOn: ["a6"],
        context: {
          reason: "Critical path blocker — follow up with Stephen if no response by Mar 3",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Avala Hospital",
          leadTimeDays: 10,
          blocks: ["a8"],
        },
      },
      {
        id: "a8",
        projectId: "oracle-health",
        title: "Avala: Log SR to Cerner Ignite APIs for Millennium",
        status: "WAITING",
        priority: "URGENT",
        startDate: "2026-03-10",
        endDate: "2026-03-14",
        assignee: "Avala (Stephen)",
        track: "track-a",
        dependsOn: ["a7"],
        context: {
          reason: "Avala must include our App ID and Client ID in the SR — confirm they have them",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Avala Hospital",
          leadTimeDays: 5,
          blocks: ["a9", "a10"],
        },
      },
      {
        id: "a9",
        projectId: "oracle-health",
        title: "Avala: Complete PECA form (if Oracle requests)",
        status: "TODO",
        priority: "MEDIUM",
        startDate: "2026-03-14",
        endDate: "2026-03-21",
        assignee: "Avala (Stephen)",
        track: "track-a",
        dependsOn: ["a8"],
        context: {
          reason: "Oracle's internal form — Avala handles it. May not be required.",
          tags: ["external-dependency"],
          externalParty: "Oracle",
        },
      },
      {
        id: "a10",
        projectId: "oracle-health",
        title: "Oracle processes SR → provides production FHIR URL",
        status: "TODO",
        priority: "URGENT",
        startDate: "2026-03-14",
        endDate: "2026-03-28",
        assignee: null,
        track: "track-a",
        dependsOn: ["a8"],
        context: {
          reason: "5-10 business days. Escalate via OPN Healthcare Track if no response by day 10",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Oracle",
          leadTimeDays: 10,
          blocks: ["a11"],
        },
      },
      {
        id: "a10b",
        projectId: "oracle-health",
        title: "Avala: Add app.betterdaypayments.com to trusted sites",
        status: "TODO",
        priority: "HIGH",
        startDate: "2026-03-14",
        endDate: "2026-03-21",
        assignee: "Avala (Stephen)",
        track: "track-a",
        dependsOn: ["a8"],
        context: {
          reason: "Required if using Citrix/VDI — check with Oracle Hosting contacts",
          tags: ["external-dependency"],
          externalParty: "Avala Hospital",
        },
      },
      {
        id: "a11",
        projectId: "oracle-health",
        title: "Configure app to Avala production FHIR URL",
        status: "TODO",
        priority: "HIGH",
        startDate: "2026-03-28",
        endDate: "2026-04-01",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a10"],
        context: {
          reason: "Quick config change once we receive the URL from Avala",
          tags: ["revenue-blocker"],
          blocks: ["a12"],
        },
      },
      {
        id: "a12",
        projectId: "oracle-health",
        title: "Pilot deployment — single department (2 week minimum)",
        status: "TODO",
        priority: "HIGH",
        startDate: "2026-04-01",
        endDate: "2026-04-15",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a11", "a10b"],
        context: {
          reason: "Revenue milestone — first live deployment at Avala",
          tags: ["revenue-blocker"],
          blocks: ["a13"],
        },
      },
      {
        id: "a13",
        projectId: "oracle-health",
        title: "Full go-live at Avala",
        status: "TODO",
        priority: "URGENT",
        startDate: "2026-04-15",
        endDate: "2026-04-30",
        assignee: "Kieran",
        track: "track-a",
        dependsOn: ["a12"],
        context: {
          reason: "Revenue generating — enables paid transaction processing",
          tags: ["revenue-blocker", "deadline-risk"],
        },
      },

      // ═══════════════════════════════════════════════════
      // TRACK B: OPN + Oracle Cloud Marketplace
      // ═══════════════════════════════════════════════════
      {
        id: "b1",
        projectId: "oracle-health",
        title: "Create Oracle account + join OPN Level 0 ($500)",
        status: "DONE",
        priority: "HIGH",
        startDate: "2026-02-01",
        endDate: "2026-02-05",
        assignee: "Kieran",
        track: "track-b",
      },
      {
        id: "b2",
        projectId: "oracle-health",
        title: "Accept OCMA (Marketplace Publisher Agreement)",
        status: "DONE",
        priority: "MEDIUM",
        startDate: "2026-02-05",
        endDate: "2026-02-07",
        assignee: "Kieran",
        track: "track-b",
        dependsOn: ["b1"],
      },
      {
        id: "b3",
        projectId: "oracle-health",
        title: "Ben: Create OCI account from US (geo-location required)",
        status: "IN_PROGRESS",
        priority: "HIGH",
        startDate: "2026-02-24",
        endDate: "2026-03-07",
        assignee: "Ben",
        track: "track-b",
        dependsOn: ["b2"],
        context: {
          reason: "Kieran blocked by geo-location — Ben must set up from Lake Charles. Needs a deadline.",
          tags: ["external-dependency"],
          externalParty: "Ben",
          leadTimeDays: 7,
          blocks: ["b4"],
        },
      },
      {
        id: "b4",
        projectId: "oracle-health",
        title: "Register as Marketplace Publisher (needs OCI tenancy OCID)",
        status: "TODO",
        priority: "HIGH",
        startDate: "2026-03-07",
        endDate: "2026-03-10",
        assignee: "Kieran",
        track: "track-b",
        dependsOn: ["b3"],
        context: {
          reason: "Blocked until Ben's OCI account is ready",
          tags: ["external-dependency"],
          externalParty: "Ben",
          blocks: ["b5"],
        },
      },
      {
        id: "b5",
        projectId: "oracle-health",
        title: "Create + submit Phase 1 Marketplace listing",
        status: "TODO",
        priority: "HIGH",
        startDate: "2026-03-10",
        endDate: "2026-03-17",
        assignee: "Kieran",
        track: "track-b",
        dependsOn: ["b4"],
        context: {
          reason: "Listing type: Standard (lead-gen) / BYOL. Submission pack is ready (28 pages).",
          tags: [],
          blocks: ["b6"],
        },
      },
      {
        id: "b6",
        projectId: "oracle-health",
        title: "Oracle reviews Phase 1 listing (2-4 weeks)",
        status: "TODO",
        priority: "MEDIUM",
        startDate: "2026-03-17",
        endDate: "2026-04-14",
        assignee: null,
        track: "track-b",
        dependsOn: ["b5"],
        context: {
          reason: "2-4 week review cycle. Can run in parallel with Track A provisioning.",
          tags: ["external-dependency", "long-lead"],
          externalParty: "Oracle",
          leadTimeDays: 28,
        },
      },
      {
        id: "b7",
        projectId: "oracle-health",
        title: "Phase 2 listing (after Phase 1 live at Avala)",
        status: "TODO",
        priority: "LOW",
        startDate: "2026-05-01",
        endDate: "2026-06-30",
        assignee: "Kieran",
        track: "track-b",
        dependsOn: ["b6", "a13"],
        context: {
          reason: "Write scopes need Phase 1 production evidence. Don't start until Avala is live.",
          tags: [],
        },
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────

const priorityOrder: Record<string, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export function getTopLevelTasks(project: MockProject): MockTask[] {
  return project.tasks;
}

export function getAllPriorityTasks(): MockTask[] {
  return mockProjects
    .flatMap((p) => p.tasks)
    .filter((t) => t.status !== "DONE" && t.status !== "CANCELLED")
    .sort((a, b) => {
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return a.startDate.localeCompare(b.startDate);
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

export function getTodaysFocus(today: string = "2026-03-03"): FocusTask[] {
  const todayMs = new Date(today).getTime();
  const results: FocusTask[] = [];

  for (const project of mockProjects) {
    if (project.status !== "Active") continue;

    for (const task of project.tasks) {
      if (task.status === "DONE" || task.status === "CANCELLED") continue;

      let score = 0;
      let reason = "";
      const ctx = task.context;

      // 1. External dependencies with lead time
      if (ctx?.tags.includes("external-dependency")) {
        const lead = ctx.leadTimeDays ?? 5;
        score += 40 + lead * 2;
        reason = ctx.reason;
      }

      // 2. Revenue-blocking tasks
      if (project.revenueReady && ctx?.tags.includes("revenue-blocker")) {
        const weeksToTarget = Math.max(
          1,
          Math.round(
            (new Date(project.targetDate).getTime() - todayMs) /
              (7 * 24 * 60 * 60 * 1000)
          )
        );
        score += 35 + Math.round(20 / weeksToTarget);
        if (!reason) reason = ctx.reason;
      }

      // 3. Critical path: blocks other tasks
      if (ctx?.blocks && ctx.blocks.length > 0) {
        score += 15 * ctx.blocks.length;
        if (!reason)
          reason = `Blocks ${ctx.blocks.length} downstream task${ctx.blocks.length > 1 ? "s" : ""}`;
      }

      // 4. Deadline proximity (using endDate)
      const daysUntilEnd = Math.round(
        (new Date(task.endDate).getTime() - todayMs) / (24 * 60 * 60 * 1000)
      );
      if (daysUntilEnd <= 3) {
        score += 30;
        if (!reason) reason = "Due in " + (daysUntilEnd <= 0 ? "overdue!" : `${daysUntilEnd} day${daysUntilEnd === 1 ? "" : "s"}`);
      } else if (daysUntilEnd <= 7) {
        score += 15;
        if (!reason) reason = `Due in ${daysUntilEnd} days`;
      } else if (daysUntilEnd <= 14) {
        score += 5;
      }

      // 5. Deadline risk tag
      if (ctx?.tags.includes("deadline-risk")) {
        score += 10;
      }

      // 6. Base priority
      score += priorityOrder[task.priority] !== undefined
        ? (3 - priorityOrder[task.priority]) * 5
        : 0;

      // 7. In progress / waiting boost
      if (task.status === "IN_PROGRESS") score += 5;
      if (task.status === "WAITING") score += 8; // waiting items need follow-up

      if (score > 0) {
        if (!reason) reason = `${task.priority} priority task`;
        results.push({ task, project, score, reason });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
