"use client"

import { useRouter } from "next/navigation"
import EditTaskModal from "./EditTaskModal"

export default function TaskCard({ task }) {

  const router = useRouter()

  async function handleDelete() {

    const confirmDelete = window.confirm(
      "Delete this task?"
    )

    if (!confirmDelete) return

    const response = await fetch(
      `/api/tasks/${task.id}`,
      {
        method: "DELETE",
      }
    )

    if (response.ok) {
      router.refresh()
    }

  }

  return (

    <div className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition">

      <h3 className="font-semibold text-lg">
        {task.title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">

        Due: {
          new Date(task.dueDate)
            .toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )
        }

      </p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium
        ${
          task.priority === "High"
            ? "bg-red-100 text-red-700"
            : task.priority === "Medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}
      >

        {task.priority}

      </span>

      <div className="flex gap-2 mt-4">

       <EditTaskModal
  task={task}
/>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>

  )

}