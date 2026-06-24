"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditProjectModal({
  project,
}) {

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [name, setName] = useState(project.name)

  const [description, setDescription] = useState(
    project.description
  )

  const [status, setStatus] = useState(
    project.status
  )

  const [priority, setPriority] = useState(
    project.priority
  )

  const [progress, setProgress] = useState(
    project.progress
  )

  async function handleUpdate(e) {

    e.preventDefault()

    const response = await fetch(
      `/api/projects/${project.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          name,
          description,
          status,
          priority,

          dueDate:
            project.originalDueDate,

          progress,

        }),

      }
    )

    if (response.ok) {

      setOpen(false)

      router.refresh()

    }

  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg">

            <h2 className="text-xl font-bold mb-4">
              Edit Project
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-3"
            >

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="border p-2 w-full rounded"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="border p-2 w-full rounded"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border p-2 w-full rounded"
              >
                <option>
                  Pending
                </option>

                <option>
                  Active
                </option>

                <option>
                  Completed
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
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) =>
                  setProgress(
                    e.target.value
                  )
                }
                className="border p-2 w-full rounded"
              />

              <div className="flex gap-2">

                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}
    </>
  )

}