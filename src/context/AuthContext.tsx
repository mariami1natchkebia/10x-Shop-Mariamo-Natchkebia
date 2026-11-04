import { createContext } from 'react'

export interface AuthContextValue {
  username: string | null
  isLoggedIn: boolean
  login: (username: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)