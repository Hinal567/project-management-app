import { prisma } from "../../../lib/prisma"

export default async function SearchPage({
  searchParams,
}) {

  const query =
    searchParams.q || ""

  const projects =
    await prisma.project.findMany({

      where: {
        name: {
          contains: query,
        },
      },

    })

  const tasks =
    await prisma.task.findMany({

      where: {
        title: {
          contains: query,
        },
      },

    })

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">

        Search Results

      </h1>

      <p className="mb-8 text-gray-500">

        Query: "{query}"

      </p>

      <div className="mb-10">

        <h2 className="text-xl font-bold mb-4">

          Projects

        </h2>

        {projects.length === 0 ? (

          <p>No projects found</p>

        ) : (

          <div className="space-y-3">

            {projects.map(project => (

              <div
                key={project.id}
                className="bg-white border rounded-lg p-4"
              >

                <h3 className="font-semibold">

                  {project.name}

                </h3>

                <p className="text-sm text-gray-500">

                  {project.status}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      <div>

        <h2 className="text-xl font-bold mb-4">

          Tasks

        </h2>

        {tasks.length === 0 ? (

          <p>No tasks found</p>

        ) : (

          <div className="space-y-3">

            {tasks.map(task => (

              <div
                key={task.id}
                className="bg-white border rounded-lg p-4"
              >

                <h3 className="font-semibold">

                  {task.title}

                </h3>

                <p className="text-sm text-gray-500">

                  {task.status}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )

}