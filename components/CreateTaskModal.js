"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTaskModal({
  projects = [],
}) {

  console.log(projects)

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState("")
  const [projectId, setProjectId] = useState("")
  const [status, setStatus] = useState("Todo")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {

    e.preventDefault()

    setError("")

    const response = await fetch(
      "/api/tasks",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          projectId,
          status,
          priority,
          dueDate,
        }),
      }
    )

    if (!response.ok) {

      const data = await response.json().catch(() => ({}))

      setError(data.error || "Failed to create task")

      return

    }

    if (response.ok) {

      setOpen(false)

      setTitle("")
      setProjectId("")
      setStatus("Todo")
      setPriority("Medium")
      setDueDate("")
      setError("")

      router.refresh()

    }

  }

  return (

    <>

      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        + New Task
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg">

            <h2 className="text-xl font-bold mb-4">
              Create Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >

              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="border p-2 w-full rounded"
                required
              />

              <select
                value={projectId}
                onChange={(e) =>
                  setProjectId(e.target.value)
                }
                className="border p-2 w-full rounded"
                required
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (

                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>

                ))}

              </select>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border p-2 w-full rounded"
              >

                <option>
                  Todo
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Done
                </option>

              </select>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="border p-2 w-full rounded"
              >

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                className="border p-2 w-full rounded"
                required
              />

              {error && (

                <p className="text-sm text-red-600">
                  {error}
                </p>

              )}

              <div className="flex gap-3 justify-end">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-black text-white"
                >
                  Create
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>

  )

}