"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Topbar() {

  const router = useRouter()

  const [search, setSearch] = useState("")

  function handleSearch(e) {

    if (e.key === "Enter" && search.trim()) {

      router.push(
        `/dashboard/search?q=${encodeURIComponent(search)}`
      )

    }

  }

  return (

    <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">

        <span className="text-slate-400">
          Search
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={handleSearch}
          placeholder="Search projects or tasks"
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

      </div>

      <div className="flex items-center gap-3">

        <button className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50">
          🔔
        </button>

        <button
          onClick={() => {

            localStorage.removeItem("token")

            window.location.href = "/login"

          }}
          className="rounded-lg border px-4 py-2"
        >
          Logout
        </button>

      </div>

    </div>

  )

}