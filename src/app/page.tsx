import Link from "next/link";
import { mockProjects, getAllPriorityTasks, getTodaysFocus } from "@/lib/mock-data";
import { TodaysFocus } from "@/components/todays-focus";

const statusColor: Record<string, string> = {
  DONE: "#22c55e",
  IN_PROGRESS: "#3b82f6",
  IN_REVIEW: "#f59e0b",
  WAITING: "#f97316",
  TODO: "#64748b",
};

const statusLabel: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  WAITING: "Waiting",
  DONE: "Done",
};

const priorityColor: Record<string, string> = {
  URGENT: "bg-danger",
  HIGH: "bg-warning",
  MEDIUM: "bg-accent",
  LOW: "bg-success",
};

const priorityLabel: Record<string, string> = {
  URGENT: "text-danger",
  HIGH: "text-warning",
  MEDIUM: "text-accent",
  LOW: "text-success",
};

export default function DashboardPage() {
  const project = mockProjects[0];
  const priorityTasks = getAllPriorityTasks();
  const focusItems = getTodaysFocus();

  // Stats
  const total = project.tasks.length;
  const done = project.tasks.filter((t) => t.status === "DONE").length;
  const waiting = project.tasks.filter((t) => t.status === "WAITING").length;
  const inProgress = project.tasks.filter((t) => t.status === "IN_PROGRESS").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {project.description}
          </p>
        </div>
        <Link
          href={`/projects/${project.id}/timeline`}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Open Gantt Timeline
        </Link>
      </div>

      {/* ── Today's Focus: 15% of viewport height ──────── */}
      <div style={{ minHeight: "15vh" }}>
        <TodaysFocus items={focusItems} />
      </div>

      {/* ── Project stats ── */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", value: total, color: "text-foreground" },
          { label: "Done", value: done, color: "text-success" },
          { label: "In Progress", value: inProgress, color: "text-accent" },
          { label: "Waiting on Others", value: waiting, color: "text-warning" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card-bg p-4"
          >
            <p className="text-xs text-muted uppercase tracking-wide">
              {stat.label}
            </p>
            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Priority Tasks list ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            All Open Tasks
          </h3>
          <span className="text-xs text-muted">{priorityTasks.length} open</span>
        </div>

        <div className="rounded-xl border border-border bg-card-bg divide-y divide-border">
          {priorityTasks.map((task) => (
            <Link
              key={task.id}
              href={`/projects/${task.projectId}/timeline`}
              className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-accent/5"
            >
              <span
                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${priorityColor[task.priority]}`}
                title={task.priority}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight truncate">
                  {task.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span className="truncate">
                    {task.track === "track-a" ? "Track A — Avala" : "Track B — OPN"}
                  </span>
                  <span>·</span>
                  <span className={priorityLabel[task.priority]}>
                    {task.priority}
                  </span>
                  {task.assignee && (
                    <>
                      <span>·</span>
                      <span>{task.assignee}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                  style={{ backgroundColor: statusColor[task.status] }}
                >
                  {statusLabel[task.status] ?? task.status}
                </span>
                <p className="mt-0.5 text-[11px] text-muted">
                  {new Date(task.endDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </Link>
          ))}

          {priorityTasks.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted">
              No open tasks. Nice work!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
