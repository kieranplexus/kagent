import { TimelineView } from "@/components/timeline/timeline-view";

interface TimelinePageProps {
  params: Promise<{ id: string }>;
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Timeline</h2>
          <p className="mt-1 text-sm text-muted">
            Visualise tasks and milestones on a timeline. Click any item to view
            attached documents.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border bg-card-bg px-3 py-1.5 text-sm transition-colors hover:bg-border">
            Week
          </button>
          <button className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white">
            Month
          </button>
          <button className="rounded-lg border border-border bg-card-bg px-3 py-1.5 text-sm transition-colors hover:bg-border">
            Quarter
          </button>
        </div>
      </div>

      <TimelineView projectId={id} />
    </div>
  );
}
