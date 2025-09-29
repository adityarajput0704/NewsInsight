import { createClient } from '@supabase/supabase-js'
import { supabase as mockSupabase } from './mockSupabase'

// Replace with your actual Supabase URL and anon key
// In production, these should come from environment variables
const supabaseUrl = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || 'https://your-project.supabase.co'
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || 'your-anon-key-here'

// Use mock Supabase if no real credentials are provided
const isUsingMock = supabaseUrl === 'https://your-project.supabase.co' || supabaseAnonKey === 'your-anon-key-here'

export const supabase = isUsingMock ? mockSupabase : createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface NewsItem {
  id: string
  title: string
  content: string
  source: string
  verified: boolean
  trust_score: number
  category: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  username: string
  trust_points: number
  verifications_count: number
  created_at: string
  avatar_url?: string
}

export interface TrustMetric {
  id: string
  metric_name: string
  score: number
  timestamp: string
}

export interface Rumor {
  id: string
  content: string
  source: string
  status: 'pending' | 'verified' | 'debunked'
  trust_score: number
  votes_count: number
  created_at: string
}

// Authentication helpers
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Database operations
export const getNewsItems = async () => {
  return supabase
    .from('news_items')
    .select('*')
    .order('created_at', { ascending: false })
}

export const getTrustMetrics = async () => {
  return supabase
    .from('trust_metrics')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(10)
}

export const getUserProfiles = async () => {
  return supabase
    .from('user_profiles')
    .select('*')
    .order('trust_points', { ascending: false })
    .limit(10)
}

export const getRumors = async () => {
  return supabase
    .from('rumors')
    .select('*')
    .order('created_at', { ascending: false })
}

export const submitVerification = async (newsId: string, isVerified: boolean, userId: string) => {
  const { data, error } = await supabase
    .from('verifications')
    .insert([
      {
        news_item_id: newsId,
        user_id: userId,
        is_verified: isVerified,
        created_at: new Date().toISOString()
      }
    ])
  return { data, error }
}

// Real-time subscriptions
export const subscribeToNewsUpdates = (callback: (payload: any) => void) => {
  return supabase
    .channel('news_updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'news_items'
    }, callback)
    .subscribe()
}

export const subscribeToTrustMetrics = (callback: (payload: any) => void) => {
  return supabase
    .channel('trust_metrics')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'trust_metrics'
    }, callback)
    .subscribe()
}