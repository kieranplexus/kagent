import Link from "next/link";

export default function PersonalPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Personal Finance</h2>
        <p className="mt-1 text-sm text-muted">
          Private section for managing personal budgets and business expenses.
          Only visible to you.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Monthly Budget</p>
          <p className="mt-1 text-2xl font-bold">£5,000</p>
          <p className="mt-1 text-xs text-muted">February 2026</p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Spent This Month</p>
          <p className="mt-1 text-2xl font-bold text-accent">£2,340</p>
          <p className="mt-1 text-xs text-success">46.8% of budget</p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Pending Reimbursement</p>
          <p className="mt-1 text-2xl font-bold text-warning">£780</p>
          <p className="mt-1 text-xs text-muted">3 items</p>
        </div>
        <div className="rounded-xl border border-border bg-card-bg p-5">
          <p className="text-sm text-muted">Total Expenses (YTD)</p>
          <p className="mt-1 text-2xl font-bold">£4,890</p>
          <p className="mt-1 text-xs text-muted">Since Jan 2026</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/personal/budgets"
          className="group rounded-xl border border-border bg-card-bg p-6 transition-shadow hover:shadow-md"
        >
          <h3 className="text-lg font-semibold group-hover:text-accent">
            Personal Budgets
          </h3>
          <p className="mt-2 text-sm text-muted">
            Set monthly and project budgets. Track spending against allocations.
          </p>
        </Link>

        <Link
          href="/personal/expenses"
          className="group rounded-xl border border-border bg-card-bg p-6 transition-shadow hover:shadow-md"
        >
          <h3 className="text-lg font-semibold group-hover:text-accent">
            Business Expenses
          </h3>
          <p className="mt-2 text-sm text-muted">
            Log receipts, categorise expenses, and track reimbursement status.
          </p>
        </Link>
      </div>

      {/* Recent expenses */}
      <section>
        <h3 className="mb-4 font-semibold">Recent Expenses</h3>
        <div className="rounded-xl border border-border bg-card-bg">
          {[
            {
              desc: "Train ticket — London to Manchester",
              cat: "Travel",
              amount: 85,
              date: "2026-02-25",
              status: "Pending",
            },
            {
              desc: "Adobe Creative Cloud",
              cat: "Subscriptions",
              amount: 52.99,
              date: "2026-02-20",
              status: "Not applicable",
            },
            {
              desc: "Client lunch meeting",
              cat: "Meals",
              amount: 45.5,
              date: "2026-02-18",
              status: "Submitted",
            },
            {
              desc: "USB-C dock",
              cat: "Equipment",
              amount: 79.99,
              date: "2026-02-15",
              status: "Reimbursed",
            },
          ].map((expense, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border px-5 py-3 last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{expense.desc}</p>
                <p className="text-xs text-muted">{expense.cat}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  £{expense.amount.toFixed(2)}
                </span>
                <span className="text-xs text-muted">{expense.date}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    expense.status === "Reimbursed"
                      ? "bg-success/10 text-success"
                      : expense.status === "Pending"
                        ? "bg-warning/10 text-warning"
                        : expense.status === "Submitted"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted/10 text-muted"
                  }`}
                >
                  {expense.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
