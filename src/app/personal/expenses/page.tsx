export default function ExpensesPage() {
  const expenses = [
    {
      description: "Train ticket — London to Manchester",
      category: "Travel",
      amount: 85.0,
      date: "2026-02-25",
      reimbursement: "PENDING",
      receipt: true,
    },
    {
      description: "Adobe Creative Cloud",
      category: "Subscriptions",
      amount: 52.99,
      date: "2026-02-20",
      reimbursement: "NOT_APPLICABLE",
      receipt: false,
    },
    {
      description: "Client lunch meeting",
      category: "Meals",
      amount: 45.5,
      date: "2026-02-18",
      reimbursement: "SUBMITTED",
      receipt: true,
    },
    {
      description: "USB-C dock",
      category: "Equipment",
      amount: 79.99,
      date: "2026-02-15",
      reimbursement: "REIMBURSED",
      receipt: true,
    },
    {
      description: "GitHub Copilot",
      category: "Software",
      amount: 19.0,
      date: "2026-02-10",
      reimbursement: "NOT_APPLICABLE",
      receipt: false,
    },
  ];

  const reimbursementStyle: Record<string, string> = {
    NOT_APPLICABLE: "bg-muted/10 text-muted",
    PENDING: "bg-warning/10 text-warning",
    SUBMITTED: "bg-accent/10 text-accent",
    APPROVED: "bg-success/10 text-success",
    REIMBURSED: "bg-success/10 text-success",
    DENIED: "bg-danger/10 text-danger",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Expenses</h2>
          <p className="mt-1 text-sm text-muted">
            Track business expenses and reimbursement status. Attach receipts
            for record keeping.
          </p>
        </div>
        <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          + Log Expense
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card-bg p-4">
          <p className="text-xs text-muted">Total (Feb)</p>
          <p className="mt-1 text-xl font-bold">£282.48</p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-4">
          <p className="text-xs text-muted">Reimbursable</p>
          <p className="mt-1 text-xl font-bold text-accent">£210.49</p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-4">
          <p className="text-xs text-muted">Reimbursed</p>
          <p className="mt-1 text-xl font-bold text-success">£79.99</p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-4">
          <p className="text-xs text-muted">Pending</p>
          <p className="mt-1 text-xl font-bold text-warning">£130.50</p>
        </div>
      </div>

      {/* Expense list */}
      <div className="rounded-xl border border-border bg-card-bg">
        <div className="grid grid-cols-6 border-b border-border px-5 py-3 text-xs font-medium text-muted">
          <span className="col-span-2">Description</span>
          <span>Category</span>
          <span className="text-right">Amount</span>
          <span className="text-center">Date</span>
          <span className="text-center">Status</span>
        </div>
        {expenses.map((exp, i) => (
          <div
            key={i}
            className="grid grid-cols-6 items-center border-b border-border px-5 py-3 text-sm last:border-0 hover:bg-accent/5"
          >
            <div className="col-span-2 flex items-center gap-2">
              <span className="font-medium">{exp.description}</span>
              {exp.receipt && (
                <span className="text-xs text-muted" title="Receipt attached">
                  📎
                </span>
              )}
            </div>
            <span className="text-muted">{exp.category}</span>
            <span className="text-right font-medium">
              £{exp.amount.toFixed(2)}
            </span>
            <span className="text-center text-muted">{exp.date}</span>
            <span className="text-center">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${reimbursementStyle[exp.reimbursement]}`}
              >
                {exp.reimbursement.replace("_", " ")}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
