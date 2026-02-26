export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-1 text-sm text-muted">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border border-border bg-card-bg p-6">
        <h3 className="font-semibold">Profile</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-muted">Name</label>
            <input
              type="text"
              defaultValue="User"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">Email</label>
            <input
              type="email"
              defaultValue="user@example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          Save Changes
        </button>
      </section>

      {/* Preferences */}
      <section className="rounded-xl border border-border bg-card-bg p-6">
        <h3 className="font-semibold">Preferences</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Currency</p>
              <p className="text-xs text-muted">
                Default currency for budgets and expenses
              </p>
            </div>
            <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent">
              <option>GBP (£)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Date Format</p>
              <p className="text-xs text-muted">How dates are displayed</p>
            </div>
            <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent">
              <option>YYYY-MM-DD</option>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
