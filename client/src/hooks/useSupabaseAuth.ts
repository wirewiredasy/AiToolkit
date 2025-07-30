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
            profile: profile || null,
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

  // Auth actions
  const signUp = async (email: string, password: string, userData?: { full_name?: string }) => {
    const result = await authHelpers.signUp(email, password, userData)
    return result
  }

  const signIn = async (email: string, password: string) => {
    const result = await authHelpers.signIn(email, password)
    return result
  }

  const signOut = async () => {
    const result = await authHelpers.signOut()
    return result
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) return { data: null, error: 'Not authenticated' }

    const result = await dbHelpers.updateUserProfile(authState.user.id, updates)
    if (result.data) {
      setAuthState(prev => ({ ...prev, profile: result.data }))
    }
    return result
  }

  const trackToolUsage = async (toolId: string, metadata: any) => {
    if (!authState.user) return { data: null, error: 'Not authenticated' }

    const usage = {
      user_id: authState.user.id,
      tool_id: toolId,
      tool_category: getToolCategory(toolId),
      success: true,
      ...metadata
    }

    const result = await dbHelpers.trackToolUsage(usage)

    // Update user credits and tool count
    if (result.data && authState.profile) {
      const updatedProfile = {
        ...authState.profile,
        credits_remaining: Math.max(0, authState.profile.credits_remaining - 1),
        total_tools_used: authState.profile.total_tools_used + 1
      }
      setAuthState(prev => ({ ...prev, profile: updatedProfile }))

      // Update in database
      await dbHelpers.updateUserProfile(authState.user.id, {
        credits_remaining: updatedProfile.credits_remaining,
        total_tools_used: updatedProfile.total_tools_used
      })
    }

    return result
  }

  const getToolCategory = (toolId: string): 'pdf' | 'image' | 'media' | 'government' | 'developer' => {
    if (toolId.includes('pdf')) return 'pdf'
    if (toolId.includes('image') || toolId.includes('photo') || toolId.includes('bg-remover')) return 'image'
    if (toolId.includes('audio') || toolId.includes('video') || toolId.includes('media')) return 'media'
    if (toolId.includes('aadhaar') || toolId.includes('pan') || toolId.includes('gst') || toolId.includes('certificate')) return 'government'
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