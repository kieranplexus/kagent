import Link from "next/link";
import { mockProjects, getAllPriorityTasks } from "@/lib/mock-data";
import { ProjectCard } from "@/components/project-card";

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

const statusLabel: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
};

function getProjectName(projectId: string) {
  return mockProjects.find((p) => p.id === projectId)?.name ?? projectId;
}

export default function DashboardPage() {
  const priorityTasks = getAllPriorityTasks();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-1 text-sm text-muted">
          Your top priorities and active projects at a glance.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ── Left column: Priority Tasks ──────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Priority Tasks
            </h3>
            <span className="text-xs text-muted">{priorityTasks.length} open</span>
          </div>

          <div className="rounded-xl border border-border bg-card-bg divide-y divide-border">
            {priorityTasks.map((task) => (
              <Link
                key={task.id}
                href={`/projects/${task.projectId}`}
                className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-accent/5"
              >
                {/* Traffic light priority dot */}
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
                      {getProjectName(task.projectId)}
                    </span>
                    <span>·</span>
                    <span className={priorityLabel[task.priority]}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[11px] text-muted">
                    {statusLabel[task.status] ?? task.status}
                  </span>
                  {task.dueDate && (
                    <p className="mt-0.5 text-[11px] text-muted">
                      {new Date(task.dueDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
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

        {/* ── Right column: Project Cards ──────────────────── */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Projects
            </h3>
            <Link
              href="/projects"
              className="text-xs text-accent hover:text-accent-hover"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* New project placeholder */}
            <Link
              href="/projects/new"
              className="flex items-center justify-center rounded-xl border-2 border-dashed border-border text-muted transition-colors hover:border-accent hover:text-accent min-h-[180px]"
            >
              <div className="text-center">
                <span className="text-2xl leading-none">+</span>
                <p className="mt-1 text-sm font-medium">New Project</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
