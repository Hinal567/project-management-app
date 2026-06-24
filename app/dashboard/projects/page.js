import { prisma } from "../../../lib/prisma"
import ProjectsTable from "../../../components/ProjectsTable"
import CreateProjectModal from "../../../components/CreateProjectModal"

export default async function ProjectsPage() {

  const dbProjects = await prisma.project.findMany({
    orderBy: {
      id: "asc",
    },
  })

  const projects = dbProjects.map(
  (project) => ({

    id: project.id,

    name: project.name,

    description:
      project.description || "",

    status: project.status,

    priority: project.priority,

    dueDate:
      project.dueDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),

    originalDueDate:
      project.dueDate,

    progress: project.progress,

  })
)
  return (

    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-gray-500">
            Manage and track all projects
          </p>

        </div>

       <CreateProjectModal />
      </div>

      <ProjectsTable
        projects={projects}
      />

    </div>

  )

}