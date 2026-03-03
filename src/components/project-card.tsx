import Link from "next/link";
import type { MockProject } from "@/lib/mock-data";
import { getTopLevelTasks } from "@/lib/mock-data";

const priorityDot: Record<string, string> = {
  URGENT: "bg-danger",
  HIGH: "bg-warning",
  MEDIUM: "bg-accent",
  LOW: "bg-success",
};

const statusBadge: Record<string, string> = {
  TODO: "text-muted",
  IN_PROGRESS: "text-accent",
  IN_REVIEW: "text-warning",
  WAITING: "text-warning",
  DONE: "text-success line-through opacity-60",
  CANCELLED: "text-muted line-through opacity-40",
};

export function ProjectCard({ project }: { project: MockProject }) {
  const topTasks = getTopLevelTasks(project);
  const done = topTasks.filter((t) => t.status === "DONE").length;
  const total = topTasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  // Show the most important in-progress / upcoming tasks (max 4)
  const highlighted = topTasks
    .filter((t) => t.status !== "DONE" && t.status !== "CANCELLED")
    .slice(0, 4);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card-bg transition-shadow hover:shadow-lg"
    >
      {/* Colour accent bar */}
      <div
        className="h-1.5 rounded-t-xl"
        style={{ backgroundColor: project.color }}
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="h-3 w-3 rounded-full shrink-0"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="font-semibold leading-tight group-hover:text-accent">
              {project.name}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            {project.status}
          </span>
        </div>

        <p className="mt-2 text-xs text-muted line-clamp-2">
          {project.description}
        </p>

        {/* Top-level tasks */}
        <div className="mt-4 flex-1 space-y-1.5">
          {highlighted.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDot[task.priority]}`}
              />
              <span
                className={`truncate text-xs ${statusBadge[task.status]}`}
              >
                {task.title}
              </span>
              {task.endDate && (
                <span className="ml-auto shrink-0 text-[10px] text-muted">
                  {new Date(task.endDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>
          ))}
          {topTasks.filter((t) => t.status !== "DONE" && t.status !== "CANCELLED").length > 4 && (
            <p className="text-[10px] text-muted">
              +{topTasks.filter((t) => t.status !== "DONE" && t.status !== "CANCELLED").length - 4} more tasks
            </p>
          )}
        </div>

        {/* Footer: progress */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              {done}/{total} tasks done
            </span>
            <span>{pct}%</span>
          </div>
          <div className="mt-1.5 h-1 w-full rounded-full bg-border">
            <div
              className="h-1 rounded-full transition-all"
              style={{
                width: `${pct}%`,
                backgroundColor: project.color,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
