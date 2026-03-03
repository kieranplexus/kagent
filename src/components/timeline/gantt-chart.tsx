"use client";

import { useMemo, useRef, useState } from "react";
import type { MockTask } from "@/lib/mock-data";

// ── Colours ──────────────────────────────────────────────────────

const statusColor: Record<string, string> = {
  DONE: "#22c55e",
  IN_PROGRESS: "#3b82f6",
  IN_REVIEW: "#f59e0b",
  WAITING: "#f97316",
  TODO: "#64748b",
  CANCELLED: "#94a3b8",
};

const statusLabel: Record<string, string> = {
  DONE: "Done",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  WAITING: "Waiting",
  TODO: "To Do",
  CANCELLED: "Cancelled",
};

const trackLabel: Record<string, string> = {
  "track-a": "Track A — Avala Provisioning",
  "track-b": "Track B — OPN Marketplace",
};

const trackColor: Record<string, string> = {
  "track-a": "#ef4444",
  "track-b": "#8b5cf6",
};

// ── Constants ────────────────────────────────────────────────────

const ROW_HEIGHT = 40;
const LABEL_WIDTH = 320;
const DAY_WIDTH = 28;
const HEADER_HEIGHT = 48;

// ── Helpers ──────────────────────────────────────────────────────

function daysBetween(a: string, b: string): number {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (86400 * 1000)
  );
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function weekStart(date: string): string {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1)); // Monday
  return d.toISOString().split("T")[0];
}

// ── Component ────────────────────────────────────────────────────

interface GanttChartProps {
  tasks: MockTask[];
  projectColor: string;
}

export function GanttChart({ tasks, projectColor }: GanttChartProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<MockTask | null>(null);

  const { rows, timelineStart, totalDays, weeks, todayOffset } = useMemo(() => {
    // Group tasks by track, sorted by startDate within each
    const trackA = tasks
      .filter((t) => t.track === "track-a")
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
    const trackB = tasks
      .filter((t) => t.track === "track-b")
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    const allRows = [...trackA, ...trackB];

    // Calculate timeline bounds (with some padding)
    const earliest = allRows.reduce(
      (min, t) => (t.startDate < min ? t.startDate : min),
      allRows[0]?.startDate ?? "2026-02-01"
    );
    const latest = allRows.reduce(
      (max, t) => (t.endDate > max ? t.endDate : max),
      allRows[0]?.endDate ?? "2026-06-30"
    );

    const start = weekStart(addDays(earliest, -7));
    const end = addDays(latest, 14);
    const total = daysBetween(start, end);

    // Generate week markers
    const wks: { date: string; label: string; offset: number }[] = [];
    let cursor = start;
    while (cursor <= end) {
      const d = new Date(cursor);
      wks.push({
        date: cursor,
        label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        offset: daysBetween(start, cursor),
      });
      cursor = addDays(cursor, 7);
    }

    // Today marker
    const today = "2026-03-03";
    const tOffset = daysBetween(start, today);

    return {
      rows: allRows,
      timelineStart: start,
      totalDays: total,
      weeks: wks,
      todayOffset: tOffset,
    };
  }, [tasks]);

  // Track group headers
  const trackAStart = rows.findIndex((t) => t.track === "track-a");
  const trackBStart = rows.findIndex((t) => t.track === "track-b");

  // Map row indices (accounting for track header rows)
  const rowMeta: {
    type: "header" | "task";
    track?: string;
    task?: MockTask;
    y: number;
  }[] = [];
  let currentTrack = "";
  let yPos = 0;
  for (const task of rows) {
    if (task.track !== currentTrack) {
      rowMeta.push({ type: "header", track: task.track, y: yPos });
      yPos += ROW_HEIGHT;
      currentTrack = task.track;
    }
    rowMeta.push({ type: "task", task, y: yPos });
    yPos += ROW_HEIGHT;
  }

  const totalHeight = yPos;

  return (
    <div className="rounded-xl border border-border bg-card-bg overflow-hidden">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border px-5 py-2.5 text-xs text-muted">
        <span className="font-semibold text-foreground text-sm">Gantt Timeline</span>
        <span className="ml-auto" />
        {Object.entries(statusColor).filter(([k]) => k !== "CANCELLED").map(([status, color]) => (
          <span key={status} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-6 rounded-sm"
              style={{ backgroundColor: color }}
            />
            {statusLabel[status]}
          </span>
        ))}
      </div>

      <div className="flex overflow-hidden" style={{ minHeight: totalHeight + HEADER_HEIGHT }}>
        {/* ── Left: task labels ── */}
        <div
          className="shrink-0 border-r border-border bg-card-bg z-10"
          style={{ width: LABEL_WIDTH }}
        >
          {/* Header spacer */}
          <div
            className="border-b border-border px-4 flex items-center text-xs font-semibold text-muted uppercase tracking-wide"
            style={{ height: HEADER_HEIGHT }}
          >
            Task
          </div>

          {rowMeta.map((row, i) => {
            if (row.type === "header") {
              return (
                <div
                  key={`hdr-${row.track}`}
                  className="flex items-center gap-2 px-4 border-b border-border bg-border/30"
                  style={{ height: ROW_HEIGHT }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: trackColor[row.track!] }}
                  />
                  <span className="text-xs font-bold truncate">
                    {trackLabel[row.track!]}
                  </span>
                </div>
              );
            }

            const task = row.task!;
            const isHovered = hoveredTask === task.id;
            const isSelected = selectedTask?.id === task.id;

            return (
              <button
                key={task.id}
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
                onClick={() => setSelectedTask(isSelected ? null : task)}
                className={`
                  flex items-center gap-2 w-full px-4 text-left border-b border-border transition-colors
                  ${isHovered ? "bg-accent/5" : ""}
                  ${isSelected ? "bg-accent/10" : ""}
                `}
                style={{ height: ROW_HEIGHT }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: statusColor[task.status] }}
                />
                <span
                  className={`text-xs truncate flex-1 ${task.status === "DONE" ? "line-through text-muted" : "font-medium"}`}
                >
                  {task.title}
                </span>
                {task.assignee && (
                  <span className="text-[10px] text-muted shrink-0 max-w-[80px] truncate">
                    {task.assignee}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Right: Gantt bars ── */}
        <div className="flex-1 overflow-x-auto" ref={scrollRef}>
          <div
            className="relative"
            style={{
              width: totalDays * DAY_WIDTH,
              height: totalHeight + HEADER_HEIGHT,
            }}
          >
            {/* Week column headers */}
            <div
              className="sticky top-0 z-10 flex border-b border-border bg-card-bg"
              style={{ height: HEADER_HEIGHT }}
            >
              {weeks.map((wk) => (
                <div
                  key={wk.date}
                  className="shrink-0 flex items-end pb-2 px-1 text-[10px] text-muted border-l border-border/40"
                  style={{
                    width: 7 * DAY_WIDTH,
                    left: wk.offset * DAY_WIDTH,
                  }}
                >
                  {wk.label}
                </div>
              ))}
            </div>

            {/* Grid lines (weekly) */}
            {weeks.map((wk) => (
              <div
                key={`grid-${wk.date}`}
                className="absolute top-0 bottom-0 border-l border-border/20"
                style={{ left: wk.offset * DAY_WIDTH }}
              />
            ))}

            {/* Today marker */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-accent z-20"
              style={{ left: todayOffset * DAY_WIDTH }}
            >
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 rounded-b bg-accent px-1.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap"
                style={{ top: HEADER_HEIGHT - 18 }}
              >
                Today
              </div>
            </div>

            {/* Row backgrounds + bars */}
            {rowMeta.map((row, i) => {
              const y = row.y + HEADER_HEIGHT;

              if (row.type === "header") {
                return (
                  <div
                    key={`row-hdr-${row.track}`}
                    className="absolute left-0 right-0 bg-border/10 border-b border-border"
                    style={{ top: y, height: ROW_HEIGHT }}
                  />
                );
              }

              const task = row.task!;
              const barStart = daysBetween(timelineStart, task.startDate);
              const barLength = Math.max(1, daysBetween(task.startDate, task.endDate));
              const isHovered = hoveredTask === task.id;
              const isSelected = selectedTask?.id === task.id;
              const color = statusColor[task.status];

              return (
                <div
                  key={task.id}
                  className={`absolute left-0 right-0 border-b border-border/30 ${isHovered ? "bg-accent/5" : ""}`}
                  style={{ top: y, height: ROW_HEIGHT }}
                >
                  {/* Gantt bar */}
                  <div
                    className={`
                      absolute top-2 rounded cursor-pointer transition-all
                      ${isSelected ? "ring-2 ring-accent ring-offset-1 ring-offset-card-bg" : ""}
                      ${isHovered ? "brightness-110 shadow-sm" : ""}
                    `}
                    style={{
                      left: barStart * DAY_WIDTH,
                      width: barLength * DAY_WIDTH,
                      height: ROW_HEIGHT - 16,
                      backgroundColor: color,
                      opacity: task.status === "DONE" ? 0.5 : 0.85,
                    }}
                    onMouseEnter={() => setHoveredTask(task.id)}
                    onMouseLeave={() => setHoveredTask(null)}
                    onClick={() =>
                      setSelectedTask(isSelected ? null : task)
                    }
                  >
                    {/* Bar label (only if wide enough) */}
                    {barLength * DAY_WIDTH > 80 && (
                      <span className="absolute inset-0 flex items-center px-2 text-[10px] font-medium text-white truncate">
                        {task.title}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task detail panel */}
      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}

// ── Task detail panel ────────────────────────────────────────────

function TaskDetail({
  task,
  onClose,
}: {
  task: MockTask;
  onClose: () => void;
}) {
  const color = statusColor[task.status];

  return (
    <div className="border-t border-border">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-semibold text-sm">{task.title}</h3>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: color }}
          >
            {statusLabel[task.status]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg px-3 py-1 text-sm text-muted transition-colors hover:bg-border hover:text-foreground"
        >
          Close
        </button>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-3">
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-xs uppercase tracking-wide text-muted">
            Schedule
          </h4>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted">Start</span>
              <span>
                {new Date(task.startDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">End</span>
              <span>
                {new Date(task.endDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Duration</span>
              <span>{daysBetween(task.startDate, task.endDate)} days</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-xs uppercase tracking-wide text-muted">
            Details
          </h4>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted">Track</span>
              <span className="text-xs">
                {task.track === "track-a" ? "A — Avala" : "B — OPN"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Priority</span>
              <span className="font-medium">{task.priority}</span>
            </div>
            {task.assignee && (
              <div className="flex justify-between">
                <span className="text-muted">Owner</span>
                <span>{task.assignee}</span>
              </div>
            )}
          </div>
        </div>

        {task.context && (
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold text-xs uppercase tracking-wide text-muted">
              Context
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {task.context.reason}
            </p>
            {task.context.externalParty && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-accent font-medium">
                  {task.context.externalParty}
                </span>
                {task.context.leadTimeDays && (
                  <span className="text-[10px] text-muted">
                    (~{task.context.leadTimeDays}d lead time)
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
