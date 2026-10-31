import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextValue {
  username: string | null
  isLoggedIn: boolean
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)

  function login(name: string) {
    setUsername(name)
  }

  function logout() {
    setUsername(null)
  }

  const value: AuthContextValue = {
    username,
    isLoggedIn: username !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}