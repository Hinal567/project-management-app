import { prisma } from "../../lib/prisma"
import Link from "next/link"

import StatCard from "../../components/StatCard"
import RecentActivity from "../../components/RecentActivity"

function formatDate(date) {

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)

}




export default async function DashboardPage() {

  const projects = await prisma.project.findMany({
  include: {
    tasks: true,
  },
})
  const totalTasks = await prisma.task.count()

const completedTasks =
  await prisma.task.count({
    where: {
      status: "Done",
    },
  })

const todoTasks =
  await prisma.task.count({
    where: {
      status: "Todo",
    },
  })

const inProgressTasks =
  await prisma.task.count({
    where: {
      status: "In Progress",
    },
  })

const completionRate =
  totalTasks > 0
    ? Math.round(
        (completedTasks / totalTasks) * 100
      )
    : 0
  const activeProjects = projects.filter((project) => project.status === "Active").length
  const completedProjects = projects.filter((project) => project.status === "Completed").length
  const pendingProjects = projects.filter((project) => project.status === "Pending").length
  const averageProgress = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)
    : 0
  const featuredProjects = projects.slice(0, 3)

  return (

    <div className="space-y-8">

      <section className="rounded-3xl bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-200/60">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Project dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Run projects with clarity.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Track delivery, monitor progress, and keep your team aligned from one polished overview.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/dashboard/projects"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View projects
            </Link>

            <Link
              href="/dashboard/tasks"
              className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Open tasks
            </Link>

          </div>

        </div>

      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Projects"
          value={projects.length}
          subtitle="Total tracked initiatives"
          tone="blue"
        />

      <StatCard
  title="Tasks"
  value={totalTasks}
  subtitle="Total tasks"
  tone="emerald"
/>

<StatCard
  title="Completed"
  value={completedTasks}
  subtitle="Finished tasks"
  tone="amber"
/>

<StatCard
  title="Completion Rate"
  value={`${completionRate}%`}
  subtitle="Task completion"
  tone="slate"
/>

      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Project snapshot
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Your latest projects
              </h2>

            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {pendingProjects} pending
            </span>

          </div>

          <div className="mt-6 space-y-4">

            {featuredProjects.map((project) => (

              <div
                key={project.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
              >

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <p className="text-lg font-semibold text-slate-950">
                      {project.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {project.description}
                    </p>

                  </div>

                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    {project.status}
                  </span>

                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">

                  <span>
                    Due {formatDate(project.dueDate)}
                  </span>

                  <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-flex" />

                  <span>
                    Priority: {project.priority}
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-flex" />

<span>
  Tasks: {project.tasks.length}
</span>
                  </span>

                </div>

                <div className="mt-4">

                  <div className="mb-2 flex items-center justify-between text-sm text-slate-500">

                    <span>Progress</span>

                    <span>{project.progress}%</span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-sky-500"
                      style={{ width: `${project.progress}%` }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        <RecentActivity />

      </section>

    </div>

  )
}