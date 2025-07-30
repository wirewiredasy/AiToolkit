import React, { createContext, useContext } from 'react'
import { useSupabaseAuth, AuthState } from '@/hooks/useSupabaseAuth'
import { UserProfile } from '@/lib/supabase-client'

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, userData?: { full_name?: string }) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data: any; error: any }>
  trackToolUsage: (toolId: string, metadata: any) => Promise<{ data: any; error: any }>
  isAuthenticated: boolean
  hasProfile: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a SupabaseAuthProvider')
  }
  return context
}

// Loading component
export const AuthLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Loading Suntyn AI...</p>
    </div>
  </div>
)

// Authentication guard component
export const RequireAuth: React.FC<{ 
  children: React.ReactNode
  fallback?: React.ReactNode 
}> = ({ children, fallback }) => {
  const { isAuthenticated, loading, initialized } = useAuth()

  if (!initialized || loading) {
    return <AuthLoader />
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please sign in to access Suntyn AI tools.
          </p>
          <a 
            href="/login" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}