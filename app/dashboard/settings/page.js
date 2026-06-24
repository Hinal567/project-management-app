"use client"
import { useEffect, useState } from "react"
export default function SettingsPage() {

 const [user, setUser] = useState(null)

useEffect(() => {

  const storedUser =
    localStorage.getItem("user")

  if (storedUser) {

    setUser(
      JSON.parse(storedUser)
    )

  }

}, [])
if (!user) {

  return (
    <p>Loading...</p>
  )

}

  return (

    <div>

      <h1 className="text-3xl font-bold mb-2">
        Settings
      </h1>

      <p className="text-gray-500 mb-8">
        Manage your account preferences
      </p>

      {/* Profile Section */}

      <div className="bg-white p-6 rounded-xl shadow border mb-6">

        <h2 className="text-xl font-bold mb-4">
          Profile Information
        </h2>

        <div className="space-y-4">

          <div>

            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>

            <input
              type="text"
              value={user.fullName}
              className="w-full border rounded-lg p-2"
              readOnly
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={user.email}
              className="w-full border rounded-lg p-2"
              readOnly
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Role
            </label>

            <input
              type="text"
              value={user.role}
              className="w-full border rounded-lg p-2"
              readOnly
            />

          </div>

        </div>

      </div>

      {/* Notifications */}

      <div className="bg-white p-6 rounded-xl shadow border mb-6">

        <h2 className="text-xl font-bold mb-4">
          Notifications
        </h2>

        <div className="space-y-3">

          <label className="flex items-center gap-3">

            <input type="checkbox" defaultChecked />

            Email Notifications

          </label>

          <label className="flex items-center gap-3">

            <input type="checkbox" defaultChecked />

            Task Reminders

          </label>

        </div>

      </div>

      {/* Appearance */}

     

    </div>

  )

}