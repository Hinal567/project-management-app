"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateProjectForm() {

  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Pending")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState("")
  const [progress, setProgress] = useState(0)

  async function handleSubmit(e) {

    e.preventDefault()

    const res = await fetch("/api/projects", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        description,
        status,
        priority,
        dueDate,
        progress,
      }),

    })

    const data = await res.json()

    console.log(data)

    router.refresh()

    setName("")
    setDescription("")
    setStatus("Pending")
    setPriority("Medium")
    setDueDate("")
    setProgress(0)

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <h2 className="text-2xl font-bold">
        Create Project
      </h2>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option>Pending</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded"
      >
        Create Project
      </button>

    </form>

  )
}