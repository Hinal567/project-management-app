"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditTaskModal({
  task,
}) {

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [title, setTitle] =
    useState(task.title)

  const [status, setStatus] =
    useState(task.status)

  const [priority, setPriority] =
    useState(task.priority)

  const [dueDate, setDueDate] =
    useState(
      new Date(task.dueDate)
        .toISOString()
        .split("T")[0]
    )

  async function handleUpdate(e) {

    e.preventDefault()

    const response = await fetch(
      `/api/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          title,
          status,
          priority,
          dueDate,

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
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg">

            <h2 className="text-xl font-bold mb-4">
              Edit Task
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-3"
            >

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
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
                <option>Todo</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="border p-2 w-full rounded"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
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