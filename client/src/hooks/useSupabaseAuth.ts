import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, authHelpers, dbHelpers, UserProfile } from '@/lib/supabase-client'

export interface AuthState {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  initialized: boolean
}

export const useSupabaseAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    initialized: false
  })

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    async function initAuth() {
      try {
        // Get current session
        const { session, error: sessionError } = await authHelpers.getCurrentSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          if (mounted) {
            setAuthState(prev => ({ ...prev, loading: false, initialized: true }))
          }
          return
        }

        if (session?.user && mounted) {
          // Get user profile
          const { data: profile, error: profileError } = await dbHelpers.getUserProfile(session.user.id)
          
          if (profileError) {
            console.error('Profile error:', profileError)
          }

          setAuthState({
            user: session.user,
            profile: profile,
            session: session,
            loading: false,
            initialized: true
          })
        } else if (mounted) {
          setAuthState(prev => ({ ...prev, loading: false, initialized: true }))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setAuthState(prev => ({ ...prev, loading: false, initialized: true }))
        }
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        if (event === 'SIGNED_IN' && session?.user) {
          // Get user profile
          const { data: profile } = await dbHelpers.getUserProfile(session.user.id)
          
          setAuthState({
            user: session.user,
            profile: profile,
            session: session,
            loading: false,
            initialized: true
          })
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            profile: null,
            session: null,
            loading: false,
            initialized: true
          })
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Sign up function
  const signUp = async (email: string, password: string, userData?: { full_name?: string }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))
      
      const { data, error } = await authHelpers.signUp(email, password, userData)
      
      if (error) {
        setAuthState(prev => ({ ...prev, loading: false }))
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }))
      return { data: null, error }
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))
      
      const { data, error } = await authHelpers.signIn(email, password)
      
      if (error) {
        setAuthState(prev => ({ ...prev, loading: false }))
        return { data: null, error }
      }

      // Profile will be loaded by auth state change listener
      return { data, error: null }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }))
      return { data: null, error }
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))
      
      const { error } = await authHelpers.signOut()
      
      if (error) {
        setAuthState(prev => ({ ...prev, loading: false }))
        return { error }
      }

      // State will be cleared by auth state change listener
      return { error: null }
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }))
      return { error }
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) {
      return { data: null, error: new Error('No authenticated user') }
    }

    try {
      const { data, error } = await dbHelpers.updateUserProfile(authState.user.id, updates)
      
      if (!error && data) {
        setAuthState(prev => ({ ...prev, profile: data }))
      }

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Track tool usage
  const trackToolUsage = async (toolId: string, metadata: any) => {
    if (!authState.user) return { data: null, error: new Error('No authenticated user') }

    try {
      const toolCategory = getToolCategory(toolId)
      
      const { data, error } = await dbHelpers.trackToolUsage({
        user_id: authState.user.id,
        tool_id: toolId,
        tool_category: toolCategory,
        processing_time: metadata.processingTime,
        success: metadata.success,
        file_size: metadata.fileSize,
        input_format: metadata.inputFormat,
        output_format: metadata.outputFormat,
        metadata: metadata
      })

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Helper function to determine tool category
  const getToolCategory = (toolId: string): 'pdf' | 'image' | 'media' | 'government' | 'developer' => {
    if (toolId.includes('pdf')) return 'pdf'
    if (toolId.includes('image') || toolId.includes('bg-remover') || toolId.includes('resize')) return 'image'
    if (toolId.includes('audio') || toolId.includes('video') || toolId.includes('vocal')) return 'media'
    if (toolId.includes('pan') || toolId.includes('gst') || toolId.includes('aadhaar')) return 'government'
    return 'developer'
  }

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    updateProfile,
    trackToolUsage,
    isAuthenticated: !!authState.user,
    hasProfile: !!authState.profile
  }
}