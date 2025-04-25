"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import axios from "@/lib/api" // Make sure this file exists and uses your .env correctly

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post("/auth/login", { email, password })
      const { token } = res.data
      if (token) {
        localStorage.setItem("admin_token", token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        setIsAuthenticated(true)
        router.push("/fr/admin/dashboard")
        return true
      }
      return false
    } catch (err) {
      console.error("Login error:", err)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    delete axios.defaults.headers.common["Authorization"]
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/admin/login")
      }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )
    }

    if (!isAuthenticated) return null

    return <Component {...props} />
  }
}
