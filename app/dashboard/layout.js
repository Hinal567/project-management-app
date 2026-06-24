
import Link from "next/link"
import Topbar from "../../components/Topbar"
import AuthGuard from "../../components/AuthGuard"
export default function DashboardLayout({
  children,
}) {

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="flex min-h-screen">

        <aside className="w-72 border-r border-slate-800 bg-slate-950 px-6 py-8 text-white">

          <div className="mb-10">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Workspace
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Dashboard
            </h2>

          </div>

          <nav className="space-y-2 text-sm font-medium">

            <Link
              href="/dashboard"
              className="block rounded-xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15"
            >
              Overview
            </Link>

            <Link
              href="/dashboard/projects"
              className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Projects
            </Link>

            <Link
              href="/dashboard/tasks"
              className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Tasks
            </Link>

            <Link
              href="/dashboard/settings"
              className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Settings
            </Link>

          </nav>

        </aside>

        <main className="flex-1 px-6 py-6">

  <AuthGuard>

    <Topbar />

    {children}

  </AuthGuard>

</main>

      </div>

    </div>

  )
}