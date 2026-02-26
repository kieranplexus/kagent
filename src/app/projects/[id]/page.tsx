import Link from "next/link";
import { getProjectById, getTopLevelTasks, mockProjects } from "@/lib/mock-data";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

const tabs = [
  { label: "Overview", href: "" },
  { label: "Timeline", href: "/timeline" },
  { label: "Documents", href: "/documents" },
  { label: "Budget", href: "/budget" },
];

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id) ?? mockProjects[0];
  const topTasks = getTopLevelTasks(project);
  const done = topTasks.filter((t) => t.status === "DONE").length;
  const inProgress = topTasks.filter((t) => t.status === "IN_PROGRESS").length;
  const todo = topTasks.filter(
    (t) => t.status !== "DONE" && t.status !== "IN_PROGRESS" && t.status !== "CANCELLED"
  ).length;

  return (
    <div className="space-y-6">
      {/* Project header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p className="mt-1 text-sm text-muted">{project.description}</p>
          </div>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
          {project.status}
        </span>
      </div>

      {/* Tabs */}
      <nav className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={`/projects/${id}${tab.href}`}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab.href === ""
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:border-border hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* Overview content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Key dates */}
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <h3 className="font-semibold">Key Dates</h3>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Start Date</span>
              <span>{project.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Target Completion</span>
              <span>{project.targetDate}</span>
            </div>
          </div>
        </div>

        {/* Task summary */}
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <h3 className="font-semibold">Tasks</h3>
          <div className="mt-3 space-y-2 text-sm">
            {[
              { label: "To Do", count: todo, color: "bg-muted" },
              { label: "In Progress", count: inProgress, color: "bg-accent" },
              { label: "Done", count: done, color: "bg-success" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${s.color}`} />
                  <span className="text-muted">{s.label}</span>
                </div>
                <span className="font-medium">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget summary */}
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <h3 className="font-semibold">Budget</h3>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Allocated</span>
              <span className="font-medium">&pound;50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Spent</span>
              <span className="font-medium">&pound;8,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Remaining</span>
              <span className="font-medium text-success">&pound;41,500</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-border">
              <div
                className="h-1.5 rounded-full bg-accent"
                style={{ width: "17%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <section>
        <h3 className="mb-4 font-semibold">Recent Activity</h3>
        <div className="rounded-xl border border-border bg-card-bg">
          {[
            {
              action: "Requirements document uploaded",
              user: "You",
              time: "2 hours ago",
            },
            {
              action: "Task 'API scope definition' created",
              user: "You",
              time: "1 day ago",
            },
            {
              action: "Project created",
              user: "You",
              time: "3 days ago",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border px-5 py-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm">{activity.action}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span>{activity.user}</span>
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
