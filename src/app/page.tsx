import Link from "next/link";

const mockProjects = [
  {
    id: "oracle-health",
    name: "Oracle Health Integration",
    description: "Integration project with Oracle Health systems",
    color: "#ef4444",
    tasksTotal: 12,
    tasksDone: 2,
    nextDeadline: "2026-03-15",
  },
];

const upcomingDeadlines = [
  {
    title: "Requirements finalisation",
    project: "Oracle Health Integration",
    date: "2026-03-01",
    status: "IN_PROGRESS",
  },
  {
    title: "Architecture review",
    project: "Oracle Health Integration",
    date: "2026-03-15",
    status: "TODO",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="mt-1 text-muted">
          Here&apos;s an overview of your projects and upcoming deadlines.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Projects", value: "1", color: "bg-accent" },
          { label: "Open Tasks", value: "10", color: "bg-warning" },
          { label: "Due This Week", value: "3", color: "bg-danger" },
          { label: "Completed", value: "2", color: "bg-success" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card-bg p-5"
          >
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${stat.color}`} />
              <span className="text-sm text-muted">{stat.label}</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Projects list */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Projects</h3>
          <Link
            href="/projects"
            className="text-sm text-accent hover:text-accent-hover"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-xl border border-border bg-card-bg p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h4 className="font-semibold group-hover:text-accent">
                  {project.name}
                </h4>
              </div>
              <p className="mt-2 text-sm text-muted">{project.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>
                  {project.tasksDone}/{project.tasksTotal} tasks done
                </span>
                <span>Next: {project.nextDeadline}</span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1.5 w-full rounded-full bg-border">
                <div
                  className="h-1.5 rounded-full bg-accent"
                  style={{
                    width: `${(project.tasksDone / project.tasksTotal) * 100}%`,
                  }}
                />
              </div>
            </Link>
          ))}

          {/* New project card */}
          <Link
            href="/projects/new"
            className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <span className="text-2xl">+</span>
            <span className="ml-2 text-sm font-medium">New Project</span>
          </Link>
        </div>
      </section>

      {/* Upcoming deadlines */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Upcoming Deadlines</h3>
        <div className="rounded-xl border border-border bg-card-bg">
          {upcomingDeadlines.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border px-5 py-4 last:border-0"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted">{item.project}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.status === "IN_PROGRESS"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted/10 text-muted"
                  }`}
                >
                  {item.status.replace("_", " ")}
                </span>
                <span className="text-sm text-muted">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
