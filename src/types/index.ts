// Re-export Prisma types for convenience
export type {
  User,
  Project,
  Task,
  Milestone,
  Document,
  DocumentVersion,
  Folder,
  Comment,
  BudgetCategory,
  CostItem,
  PersonalBudget,
  Expense,
} from "@/generated/prisma/client";

export {
  TaskStatus,
  Priority,
  ProjectRole,
  CostStatus,
  ExpenseCategory,
  ReimbursementStatus,
} from "@/generated/prisma/client";

// UI-specific types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  type: "task" | "milestone";
  startDate?: Date;
  endDate?: Date;
  date?: Date;
  status?: string;
  color?: string;
}
