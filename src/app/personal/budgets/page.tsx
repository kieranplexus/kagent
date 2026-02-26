export default function PersonalBudgetsPage() {
  const budgets = [
    {
      name: "Oracle Health Project",
      month: "February",
      year: 2026,
      allocated: 3000,
      spent: 1540,
    },
    {
      name: "General Operations",
      month: "February",
      year: 2026,
      allocated: 2000,
      spent: 800,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Budgets</h2>
          <p className="mt-1 text-sm text-muted">
            Manage monthly and project-based personal budgets.
          </p>
        </div>
        <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          + New Budget
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {budgets.map((budget) => {
          const pct = Math.round((budget.spent / budget.allocated) * 100);
          const remaining = budget.allocated - budget.spent;

          return (
            <div
              key={budget.name}
              className="rounded-xl border border-border bg-card-bg p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{budget.name}</h3>
                <span className="text-xs text-muted">
                  {budget.month} {budget.year}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Allocated</span>
                  <span className="font-medium">
                    £{budget.allocated.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Spent</span>
                  <span className="font-medium text-accent">
                    £{budget.spent.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Remaining</span>
                  <span className="font-medium text-success">
                    £{remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-border">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">{pct}% used</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
