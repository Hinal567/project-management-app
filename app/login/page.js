"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {

    e.preventDefault()

    setError("")

    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {

      setError(data.error)

      return

    }

    localStorage.setItem(
      "token",
      data.token
    )
    localStorage.setItem(
  "user",
  JSON.stringify(data.user)
)

    alert("Login Successful!")

    router.push("/dashboard")

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          {error && (

            <p className="text-red-500 text-sm">
              {error}
            </p>

          )}

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">

            Don't have an account?

            <a
              href="/register"
              className="text-blue-600 ml-1"
            >
              Register
            </a>

          </p>

        </form>

      </div>

    </div>

  )

}