// Shared mock data — will be replaced with real DB queries later

export interface MockTask {
  id: string;
  projectId: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string | null;
  assignee: string | null;
  parentTaskId: string | null;
}

export interface MockProject {
  id: string;
  name: string;
  description: string;
  color: string;
  status: "Active" | "On Hold" | "Completed";
  startDate: string;
  targetDate: string;
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
