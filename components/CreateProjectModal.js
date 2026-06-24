"use client"

import { useState } from "react"
import CreateProjectForm from "./CreateProjectForm"

export default function CreateProjectModal() {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        + New Project
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-xl"
            >
              ✕
            </button>

            <CreateProjectForm />

          </div>

        </div>
      )}
    </>
  )
}