const defaultActivities = [
  {
    id: 1,
    action: "Created project 'Dashboard App'",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Completed task 'Login Page'",
    time: "4 hours ago",
  },
  {
    id: 3,
    action: "Updated project settings",
    time: "Yesterday",
  },
  {
    id: 4,
    action: "Added team member Rahul",
    time: "2 days ago",
  },
]

export default function RecentActivity({
  activities = defaultActivities,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Activity feed
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Recent Activity
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Live
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
          >
            <div className="mt-1 flex h-3 w-3 shrink-0 rounded-full bg-sky-500" />

            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">
                {activity.action}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {activity.time}
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-400">
              #{index + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}