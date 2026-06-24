"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {

  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {

    e.preventDefault()

    setError("")

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName,
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

    alert("Registration Successful!")

    router.push("/login")

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

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
            Create Account
          </button>

          <p className="text-center text-sm mt-4">

            Already have an account?

            <a
              href="/login"
              className="text-blue-600 ml-1"
            >
              Login
            </a>

          </p>

        </form>

      </div>

    </div>

  )

}