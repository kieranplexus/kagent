"use client";

import { useState } from "react";

interface TimelineTask {
  id: string;
  title: string;
  type: "task" | "milestone";
  startDate: string;
  endDate?: string;
  status: string;
  priority: string;
  row: number;
  documents: { name: string; type: string }[];
}

const mockTasks: TimelineTask[] = [
  {
    id: "1",
    title: "Requirements Gathering",
    type: "task",
    startDate: "2026-02-01",
    endDate: "2026-03-01",
    status: "IN_PROGRESS",
    priority: "HIGH",
    row: 0,
    documents: [
      { name: "Requirements_v1.docx", type: "document" },
      { name: "Stakeholder_Notes.md", type: "document" },
    ],
  },
  {
    id: "2",
    title: "API Scope Definition",
    type: "task",
    startDate: "2026-02-15",
    endDate: "2026-03-15",
    status: "TODO",
    priority: "HIGH",
    row: 1,
    documents: [{ name: "API_Endpoints.xlsx", type: "spreadsheet" }],
  },
  {
    id: "3",
    title: "Architecture Review",
    type: "milestone",
    startDate: "2026-03-15",
    status: "TODO",
    priority: "URGENT",
    row: 2,
    documents: [
      { name: "Architecture_Diagram.png", type: "image" },
      { name: "Tech_Stack_Decision.md", type: "document" },
    ],
  },
  {
    id: "4",
    title: "Development Sprint 1",
    type: "task",
    startDate: "2026-03-16",
    endDate: "2026-04-15",
    status: "TODO",
    priority: "MEDIUM",
    row: 0,
    documents: [],
  },
  {
    id: "5",
    title: "Integration Testing",
    type: "task",
    startDate: "2026-04-16",
    endDate: "2026-05-15",
    status: "TODO",
    priority: "MEDIUM",
    row: 1,
    documents: [],
  },
  {
    id: "6",
    title: "Go-Live",
    type: "milestone",
    startDate: "2026-06-30",
    status: "TODO",
    priority: "URGENT",
    row: 2,
    documents: [],
  },
];

const statusColors: Record<string, string> = {
  TODO: "bg-gray-400",
  IN_PROGRESS: "bg-accent",
  IN_REVIEW: "bg-warning",
  DONE: "bg-success",
};

const months = [
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
  "Jun 2026",
  "Jul 2026",
];

export function TimelineView({ projectId }: { projectId: string }) {
  const [selectedTask, setSelectedTask] = useState<TimelineTask | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card-bg">
      {/* Timeline header - months */}
      <div className="flex border-b border-border">
        <div className="w-48 shrink-0 border-r border-border px-4 py-3 text-sm font-medium text-muted">
          Tasks
        </div>
        <div className="flex flex-1">
          {months.map((month) => (
            <div
              key={month}
              className="flex-1 border-r border-border px-3 py-3 text-center text-xs font-medium text-muted last:border-0"
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline rows */}
      <div className="relative">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className="flex border-b border-border last:border-0"
          >
            {/* Task label */}
            <div className="flex w-48 shrink-0 items-center gap-2 border-r border-border px-4 py-4">
              {task.type === "milestone" ? (
                <span className="text-warning">◆</span>
              ) : (
                <span
                  className={`h-2 w-2 rounded-full ${statusColors[task.status]}`}
                />
              )}
              <span className="truncate text-sm font-medium">
                {task.title}
              </span>
            </div>

            {/* Timeline bar area */}
            <button
              onClick={() =>
                setSelectedTask(selectedTask?.id === task.id ? null : task)
              }
              className="flex flex-1 items-center px-2 py-4 hover:bg-accent/5 text-left"
            >
              <div className="relative h-8 w-full">
                {task.type === "milestone" ? (
                  <div
                    className="absolute top-1 h-6 w-6 rotate-45 bg-warning"
                    style={{ left: "40%" }}
                  />
                ) : (
                  <div
                    className={`absolute top-1 h-6 rounded ${statusColors[task.status]} opacity-80`}
                    style={{
                      left: "5%",
                      width: "35%",
                    }}
                  >
                    <span className="absolute inset-0 flex items-center px-2 text-xs font-medium text-white">
                      {task.title}
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Document drawer */}
      {selectedTask && (
        <div className="border-t-2 border-accent bg-card-bg">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">
                {selectedTask.title}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs text-white ${statusColors[selectedTask.status]}`}
              >
                {selectedTask.status.replace("_", " ")}
              </span>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-muted hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 p-5">
            {/* Documents */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">
                Attached Documents ({selectedTask.documents.length})
              </h4>
              {selectedTask.documents.length > 0 ? (
                <div className="space-y-2">
                  {selectedTask.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/5"
                    >
                      <span className="text-lg">
                        {doc.type === "spreadsheet"
                          ? "📊"
                          : doc.type === "image"
                            ? "🖼"
                            : "📄"}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted">
                          v1 — uploaded today
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">
                  No documents attached yet.
                </p>
              )}
              <button className="mt-3 text-sm text-accent hover:text-accent-hover">
                + Attach document
              </button>
            </div>

            {/* Details */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Type</span>
                  <span className="capitalize">{selectedTask.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Priority</span>
                  <span>{selectedTask.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Start</span>
                  <span>{selectedTask.startDate}</span>
                </div>
                {selectedTask.endDate && (
                  <div className="flex justify-between">
                    <span className="text-muted">End</span>
                    <span>{selectedTask.endDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
