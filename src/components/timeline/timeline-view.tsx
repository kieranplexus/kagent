"use client";

import { useState } from "react";
import type { MockTask } from "@/lib/mock-data";

// ── Traffic light priority colours ───────────────────────────────
const priorityBg: Record<string, string> = {
  URGENT: "bg-danger/15 border-danger/40",
  HIGH: "bg-warning/15 border-warning/40",
  MEDIUM: "bg-accent/15 border-accent/40",
  LOW: "bg-success/15 border-success/40",
};

const priorityDot: Record<string, string> = {
  URGENT: "bg-danger",
  HIGH: "bg-warning",
  MEDIUM: "bg-accent",
  LOW: "bg-success",
};

const priorityText: Record<string, string> = {
  URGENT: "text-danger",
  HIGH: "text-warning",
  MEDIUM: "text-accent",
  LOW: "text-success",
};

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  TODO: { bg: "bg-muted/15", text: "text-muted", label: "To Do" },
  IN_PROGRESS: { bg: "bg-accent/15", text: "text-accent", label: "In Progress" },
  IN_REVIEW: { bg: "bg-warning/15", text: "text-warning", label: "In Review" },
  DONE: { bg: "bg-success/15", text: "text-success", label: "Done" },
  CANCELLED: { bg: "bg-muted/15", text: "text-muted", label: "Cancelled" },
};

interface TimelineViewProps {
  projectId: string;
  tasks: MockTask[];
  projectColor: string;
}

export function TimelineView({ tasks, projectColor }: TimelineViewProps) {
  const [selectedTask, setSelectedTask] = useState<MockTask | null>(null);

  // Only show top-level tasks, ordered by due date
  const topLevelTasks = tasks
    .filter((t) => t.parentTaskId === null)
    .sort((a, b) => {
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      if (a.dueDate) return -1;
      return 1;
    });

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="font-medium">Priority:</span>
        {(["URGENT", "HIGH", "MEDIUM", "LOW"] as const).map((p) => (
          <span key={p} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${priorityDot[p]}`} />
            {p.charAt(0) + p.slice(1).toLowerCase()}
          </span>
        ))}
      </div>

      {/* Scrollable timeline track */}
      <div className="relative rounded-xl border border-border bg-card-bg">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 mx-6 pointer-events-none" />

        <div className="flex overflow-x-auto gap-4 p-6 scroll-smooth">
          {topLevelTasks.map((task, i) => {
            const isDone = task.status === "DONE";
            const status = statusStyles[task.status] ?? statusStyles.TODO;
            const isSelected = selectedTask?.id === task.id;

            return (
              <button
                key={task.id}
                onClick={() =>
                  setSelectedTask(isSelected ? null : task)
                }
                className={`
                  relative flex flex-col shrink-0 w-52 rounded-lg border p-4 text-left
                  transition-all hover:shadow-md
                  ${priorityBg[task.priority]}
                  ${isSelected ? "ring-2 ring-accent shadow-md" : ""}
                  ${isDone ? "opacity-60" : ""}
                `}
              >
                {/* Sequence connector dot */}
                <div
                  className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-card-bg"
                  style={{ backgroundColor: projectColor }}
                />

                {/* Task number */}
                <span className="text-[10px] font-mono text-muted mb-1">
                  #{i + 1}
                </span>

                {/* Title */}
                <h4
                  className={`text-sm font-semibold leading-snug ${isDone ? "line-through" : ""}`}
                >
                  {task.title}
                </h4>

                {/* Priority + status row */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span
                      className={`h-2 w-2 rounded-full ${priorityDot[task.priority]}`}
                    />
                    <span className={`text-[10px] font-medium ${priorityText[task.priority]}`}>
                      {task.priority}
                    </span>
                  </span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>

                {/* Due date */}
                {task.dueDate && (
                  <p className="mt-2 text-[11px] text-muted">
                    Due{" "}
                    {new Date(task.dueDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task detail panel */}
      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          subtasks={tasks.filter((t) => t.parentTaskId === selectedTask.id)}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

function TaskDetailPanel({
  task,
  subtasks,
  onClose,
}: {
  task: MockTask;
  subtasks: MockTask[];
  onClose: () => void;
}) {
  const status = statusStyles[task.status] ?? statusStyles.TODO;

  return (
    <div className="rounded-xl border border-border bg-card-bg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${priorityDot[task.priority]}`} />
          <h3 className="font-semibold">{task.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg px-3 py-1 text-sm text-muted transition-colors hover:bg-border hover:text-foreground"
        >
          Close
        </button>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-2">
        {/* Info */}
        <div className="space-y-3 text-sm">
          <h4 className="font-semibold text-xs uppercase tracking-wide text-muted">
            Details
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Priority</span>
              <span className={`font-medium ${priorityText[task.priority]}`}>
                {task.priority}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Status</span>
              <span className={status.text}>{status.label}</span>
            </div>
            {task.dueDate && (
              <div className="flex justify-between">
                <span className="text-muted">Due Date</span>
                <span>
                  {new Date(task.dueDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            {task.assignee && (
              <div className="flex justify-between">
                <span className="text-muted">Assignee</span>
                <span>{task.assignee}</span>
              </div>
            )}
          </div>
        </div>

        {/* Subtasks */}
        <div className="space-y-3 text-sm">
          <h4 className="font-semibold text-xs uppercase tracking-wide text-muted">
            Subtasks ({subtasks.length})
          </h4>
          {subtasks.length > 0 ? (
            <div className="space-y-2">
              {subtasks.map((st) => {
                const stStatus = statusStyles[st.status] ?? statusStyles.TODO;
                return (
                  <div
                    key={st.id}
                    className="flex items-center gap-2 rounded-lg border border-border p-2.5"
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${priorityDot[st.priority]}`}
                    />
                    <span className={`flex-1 text-xs ${st.status === "DONE" ? "line-through text-muted" : ""}`}>
                      {st.title}
                    </span>
                    <span className={`text-[10px] font-medium ${stStatus.text}`}>
                      {stStatus.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted">No subtasks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
