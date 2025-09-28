import { useState, useEffect } from 'react'
import { supabase, getCurrentUser, signIn, signOut, UserProfile } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    getCurrentUser().then((user) => {
      setUser(user)
      if (user) {
        fetchUserProfile(user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUserProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      if (authListener?.data?.subscription?.unsubscribe) {
        authListener.data.subscription.unsubscribe()
      }
    }
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (data && !error) {
        setUserProfile(data)
      }
    } catch (err) {
      console.warn('Failed to fetch user profile:', err)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await signIn(email, password)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      const { error } = await signOut()
      if (error) throw error
      setUser(null)
      setUserProfile(null)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    userProfile,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }
}