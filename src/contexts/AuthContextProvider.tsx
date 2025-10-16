import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type AuthContextType = {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [token, setToken] = useLocalStorage<string | null>('token', null)

  const isAuthenticated = !!token

  const login = (newToken: string) => {
    setToken(newToken)
  }

  const logout = () => {
    setToken(null)
  }

  const value = {
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
