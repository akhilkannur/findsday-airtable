"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simple password check - you can change this password
    const adminPassword = "findsday2024" // Change this to your desired password

    if (password === adminPassword) {
      // Set a simple session indicator
      localStorage.setItem("adminLoggedIn", "true")
      localStorage.setItem("adminLoginTime", Date.now().toString())
      router.push("/admin")
    } else {
      setError("Invalid password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#A052DE] rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-[#A052DE] font-serif">Findsday Admin</h2>
          <p className="text-gray-600 mt-2">Enter your admin password</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A052DE]"
              placeholder="Enter admin password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A052DE] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#A052DE]">
            ← Back to Website
          </Link>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> For better content management, you can edit tools, makers, and sponsors directly in
            your
            <a
              href="https://airtable.com/appgGYEPnBcA7THzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A052DE] hover:text-purple-700 ml-1"
            >
              Airtable base
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
