"use client"

import { useRouter } from "next/navigation"
import EditProjectModal from "./EditProjectModal"

export default function ProjectsTable({ projects }) {

  const router = useRouter()

 async function handleDelete(id) {

  console.log("Delete button clicked", id)

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  )

  if (!confirmDelete) return

  try {

    const response = await fetch(
      `/api/projects/${id}`,
      {
        method: "DELETE",
      }
    )

    console.log("Status:", response.status)

    const data = await response.text()

    console.log("Response:", data)

    router.refresh()

  } catch (error) {

    console.error("Delete Error:", error)

  }

}
  return (

    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Project
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Priority
            </th>

            <th className="text-left p-4">
              Due Date
            </th>

            <th className="text-left p-4">
              Progress
            </th>

            <th className="text-left p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {projects.map((project) => (

            <tr
              key={project.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">

                <div>

                  <p className="font-semibold">
                    {project.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {project.description}
                  </p>

                </div>

              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      project.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : project.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {project.status}

                </span>

              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      project.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : project.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >

                  {project.priority}

                </span>

              </td>

              <td className="p-4">
                {project.dueDate}
              </td>

              <td className="p-4">

                <div className="w-32">

                  <div className="bg-gray-200 rounded-full h-2">

                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${project.progress}%`
                      }}
                    />

                  </div>

                  <p className="text-sm mt-1">
                    {project.progress}%
                  </p>

                </div>

              </td>

              <td className="p-4">

  <div className="flex gap-2">

    <EditProjectModal
      project={project}
    />

    <button
      onClick={() =>
        handleDelete(project.id)
      }
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>

  </div>

</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}