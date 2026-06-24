export default function StatCard({
  title,
  value,
  subtitle,
  tone = "slate",
}) {

  const toneStyles = {
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
  }

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>

          {subtitle ? (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          ) : null}

        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneStyles[tone] || toneStyles.slate}`}>
          {title}
        </span>

      </div>

    </div>

  )
}