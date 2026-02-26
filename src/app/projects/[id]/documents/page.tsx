interface DocumentsPageProps {
  params: Promise<{ id: string }>;
}

const folders = [
  {
    name: "Requirements",
    files: [
      {
        name: "Requirements_v1.docx",
        type: "document",
        size: "245 KB",
        versions: 2,
        updated: "2026-02-24",
      },
      {
        name: "Stakeholder_Notes.md",
        type: "document",
        size: "12 KB",
        versions: 1,
        updated: "2026-02-20",
      },
    ],
  },
  {
    name: "Architecture",
    files: [
      {
        name: "Architecture_Diagram.png",
        type: "image",
        size: "1.2 MB",
        versions: 1,
        updated: "2026-02-22",
      },
      {
        name: "Tech_Stack_Decision.md",
        type: "document",
        size: "8 KB",
        versions: 3,
        updated: "2026-02-25",
      },
    ],
  },
  {
    name: "API Specifications",
    files: [
      {
        name: "API_Endpoints.xlsx",
        type: "spreadsheet",
        size: "56 KB",
        versions: 1,
        updated: "2026-02-23",
      },
    ],
  },
];

const typeIcons: Record<string, string> = {
  document: "📄",
  image: "🖼",
  spreadsheet: "📊",
  media: "🎬",
  pdf: "📑",
};

export default async function DocumentsPage({ params }: DocumentsPageProps) {
  await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Documents</h2>
          <p className="mt-1 text-sm text-muted">
            Browse and manage project files. All documents are versioned.
          </p>
        </div>
        <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          + Upload File
        </button>
      </div>

      {/* Folder tree */}
      <div className="space-y-4">
        {folders.map((folder) => (
          <div
            key={folder.name}
            className="rounded-xl border border-border bg-card-bg"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-3">
              <span>📁</span>
              <h3 className="font-semibold">{folder.name}</h3>
              <span className="text-xs text-muted">
                {folder.files.length} files
              </span>
            </div>
            <div>
              {folder.files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between border-b border-border px-5 py-3 last:border-0 hover:bg-accent/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {typeIcons[file.type] || "📄"}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted">
                        {file.size} — v{file.versions}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted">{file.updated}</span>
                    <button className="text-xs text-accent hover:text-accent-hover">
                      View versions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
