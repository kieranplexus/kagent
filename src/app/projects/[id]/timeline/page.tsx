import { TimelineView } from "@/components/timeline/timeline-view";
import { getProjectById, mockProjects } from "@/lib/mock-data";

interface TimelinePageProps {
  params: Promise<{ id: string }>;
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { id } = await params;
  const project = getProjectById(id) ?? mockProjects[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Timeline</h2>
          <p className="mt-1 text-sm text-muted">
            Scroll through tasks sequentially. Click any card for details.
          </p>
        </div>
      </div>

      <TimelineView
        projectId={project.id}
        tasks={project.tasks}
        projectColor={project.color}
      />
    </div>
  );
}
