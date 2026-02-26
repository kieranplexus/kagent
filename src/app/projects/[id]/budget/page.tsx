interface BudgetPageProps {
  params: Promise<{ id: string }>;
}

const budgetCategories = [
  { name: "Labour", allocated: 30000, spent: 5000, color: "#3b82f6" },
  { name: "Software Licences", allocated: 8000, spent: 2500, color: "#8b5cf6" },
  { name: "Infrastructure", allocated: 7000, spent: 800, color: "#22c55e" },
  { name: "Travel", allocated: 3000, spent: 200, color: "#f59e0b" },
  { name: "Contingency", allocated: 2000, spent: 0, color: "#6b7280" },
];

const costItems = [
  {
    description: "Senior Developer (Feb)",
    category: "Labour",
    amount: 3500,
    date: "2026-02-28",
    status: "SPENT",
  },
  {
    description: "Junior Developer (Feb)",
    category: "Labour",
    amount: 1500,
    date: "2026-02-28",
    status: "SPENT",
  },
  {
    description: "Oracle Health API licence",
    category: "Software Licences",
    amount: 2500,
    date: "2026-02-15",
    status: "COMMITTED",
  },
  {
    description: "AWS staging environment",
    category: "Infrastructure",
    amount: 800,
    date: "2026-02-01",
    status: "SPENT",
  },
  {
    description: "Senior Developer (Mar)",
    category: "Labour",
    amount: 3500,
    date: "2026-03-31",
    status: "PLANNED",
  },
  {
    description: "Stakeholder site visit",
    category: "Travel",
    amount: 200,
    date: "2026-03-10",
    status: "PLANNED",
  },
];

const statusStyle: Record<string, string> = {
  PLANNED: "bg-muted/10 text-muted",
  COMMITTED: "bg-warning/10 text-warning",
  SPENT: "bg-accent/10 text-accent",
};

export default async function BudgetPage({ params }: BudgetPageProps) {
  await params;

  const totalAllocated = budgetCategories.reduce(
    (s, c) => s + c.allocated,
    0
  );
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
  const pctUsed = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budget</h2>
          <p className="mt-1 text-sm text-muted">
            Track project costs against allocated budgets.
          </p>
        </div>
        <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          + Add Cost Item
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Total Budget</p>
          <p className="mt-1 text-2xl font-bold">
            £{totalAllocated.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Total Spent</p>
          <p className="mt-1 text-2xl font-bold text-accent">
            £{totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Remaining</p>
          <p className="mt-1 text-2xl font-bold text-success">
            £{(totalAllocated - totalSpent).toLocaleString()}
          </p>
          <div className="mt-2 h-2 w-full rounded-full bg-border">
            <div
              className="h-2 rounded-full bg-accent"
              style={{ width: `${pctUsed}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted">{pctUsed}% used</p>
        </div>
      </div>

      {/* Categories breakdown */}
      <section>
        <h3 className="mb-4 font-semibold">Budget Categories</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {budgetCategories.map((cat) => {
            const pct =
              cat.allocated > 0
                ? Math.round((cat.spent / cat.allocated) * 100)
                : 0;
            return (
              <div
                key={cat.name}
                className="rounded-xl border border-border bg-card-bg p-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-medium">{cat.name}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted">
                    £{cat.spent.toLocaleString()} / £
                    {cat.allocated.toLocaleString()}
                  </span>
                  <span className="text-muted">{pct}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-border">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cost items table */}
      <section>
        <h3 className="mb-4 font-semibold">Cost Items</h3>
        <div className="rounded-xl border border-border bg-card-bg">
          <div className="grid grid-cols-5 border-b border-border px-5 py-3 text-xs font-medium text-muted">
            <span>Description</span>
            <span>Category</span>
            <span className="text-right">Amount</span>
            <span className="text-center">Date</span>
            <span className="text-center">Status</span>
          </div>
          {costItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center border-b border-border px-5 py-3 text-sm last:border-0 hover:bg-accent/5"
            >
              <span className="font-medium">{item.description}</span>
              <span className="text-muted">{item.category}</span>
              <span className="text-right">
                £{item.amount.toLocaleString()}
              </span>
              <span className="text-center text-muted">{item.date}</span>
              <span className="text-center">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[item.status]}`}
                >
                  {item.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
