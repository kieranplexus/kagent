import { GanttChart } from "@/components/timeline/gantt-chart";
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
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="mt-1 text-sm text-muted">
            Gantt timeline — Track A (Avala critical path) and Track B (OPN
            Marketplace).
          </p>
        </div>
      </div>

      <GanttChart tasks={project.tasks} projectColor={project.color} />
    </div>
  );
}
