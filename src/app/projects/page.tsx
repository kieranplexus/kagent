import Link from "next/link";

const projects = [
  {
    id: "oracle-health",
    name: "Oracle Health Integration",
    description: "Integration project with Oracle Health systems",
    color: "#ef4444",
    members: 3,
    tasksTotal: 12,
    tasksDone: 2,
    budget: 50000,
    spent: 8500,
    status: "Active",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="mt-1 text-sm text-muted">
            Manage and track all your projects.
          </p>
        </div>
        <Link
          href="/projects/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          + New Project
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group rounded-xl border border-border bg-card-bg p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h3 className="font-semibold group-hover:text-accent">
                  {project.name}
                </h3>
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                {project.status}
              </span>
            </div>

            <p className="mt-3 text-sm text-muted">{project.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted">Tasks</p>
                <p className="font-medium">
                  {project.tasksDone}/{project.tasksTotal}
                </p>
              </div>
              <div>
                <p className="text-muted">Members</p>
                <p className="font-medium">{project.members}</p>
              </div>
              <div>
                <p className="text-muted">Budget</p>
                <p className="font-medium">
                  £{project.budget.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted">Spent</p>
                <p className="font-medium">
                  £{project.spent.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 h-1.5 w-full rounded-full bg-border">
              <div
                className="h-1.5 rounded-full bg-accent"
                style={{
                  width: `${(project.tasksDone / project.tasksTotal) * 100}%`,
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
