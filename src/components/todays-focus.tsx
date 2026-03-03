import Link from "next/link";
import type { FocusTask } from "@/lib/mock-data";

const priorityDot: Record<string, string> = {
  URGENT: "bg-danger",
  HIGH: "bg-warning",
  MEDIUM: "bg-accent",
  LOW: "bg-success",
};

const tagIcon: Record<string, string> = {
  "external-dependency": "~",
  "long-lead": "~",
  "revenue-blocker": "$",
  "deadline-risk": "!",
};

const tagLabel: Record<string, string> = {
  "external-dependency": "External",
  "long-lead": "Long Lead",
  "revenue-blocker": "Revenue",
  "deadline-risk": "Deadline",
};

export function TodaysFocus({ items }: { items: FocusTask[] }) {
  // Show top 3-4 most impactful tasks
  const top = items.slice(0, 4);

  if (top.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card-bg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15">
            <span className="text-xs font-bold text-accent">!</span>
          </div>
          <h3 className="text-sm font-semibold">Today&apos;s Focus</h3>
          <span className="text-xs text-muted">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted">
          {top.length} action{top.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Task strips */}
      <div className="divide-y divide-border">
        {top.map(({ task, project, reason, score }, i) => {
          const tags = task.context?.tags ?? [];

          return (
            <Link
              key={task.id}
              href={`/projects/${task.projectId}/timeline`}
              className="flex items-start gap-4 px-5 py-3.5 transition-colors hover:bg-accent/5"
            >
              {/* Rank + priority dot */}
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <span className="text-[10px] font-bold text-muted">
                  {i + 1}
                </span>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${priorityDot[task.priority]}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold truncate">
                    {task.title}
                  </span>
                  {/* Context tags */}
                  <div className="flex gap-1 shrink-0">
                    {tags.filter((t, idx, arr) => {
                      // Deduplicate: if both external-dependency and long-lead, show just one icon
                      if (t === "long-lead" && arr.includes("external-dependency")) return false;
                      return true;
                    }).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-0.5 rounded-full bg-border/60 px-1.5 py-0.5 text-[9px] font-medium text-muted"
                        title={tagLabel[tag] ?? tag}
                      >
                        <span className="font-mono">{tagIcon[tag] ?? "*"}</span>
                        {tagLabel[tag] ?? tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reason */}
                <p className="mt-0.5 text-xs text-muted leading-relaxed">
                  {reason}
                </p>
              </div>

              {/* Project + meta */}
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-[11px] text-muted truncate max-w-[120px]">
                    {project.name}
                  </span>
                </div>
                {task.endDate && (
                  <p className="mt-0.5 text-[10px] text-muted">
                    {new Date(task.endDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                )}
                {task.context?.externalParty && (
                  <p className="mt-0.5 text-[10px] text-accent">
                    {task.context.externalParty}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
