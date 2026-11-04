import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)

  function login(name: string) {
    setUsername(name)
  }

  function logout() {
    setUsername(null)
  }

  const value = {
    username,
    isLoggedIn: username !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}