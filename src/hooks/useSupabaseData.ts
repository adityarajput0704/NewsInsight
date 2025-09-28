import { useState, useEffect } from 'react'
import { 
  getNewsItems, 
  getTrustMetrics, 
  getUserProfiles, 
  getRumors,
  subscribeToNewsUpdates,
  subscribeToTrustMetrics,
  NewsItem,
  TrustMetric,
  UserProfile,
  Rumor
} from '../lib/supabase'

export const useNewsItems = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await getNewsItems()
      if (error) {
        setError(error.message)
      } else {
        setNewsItems(data || [])
      }
      setLoading(false)
    }

    fetchNews()

    // Subscribe to real-time updates
    const subscription = subscribeToNewsUpdates((payload) => {
      if (payload.eventType === 'INSERT') {
        setNewsItems(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setNewsItems(prev => prev.map(item => 
          item.id === payload.new.id ? payload.new : item
        ))
      } else if (payload.eventType === 'DELETE') {
        setNewsItems(prev => prev.filter(item => item.id !== payload.old.id))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { newsItems, loading, error }
}

export const useTrustMetrics = () => {
  const [trustMetrics, setTrustMetrics] = useState<TrustMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data, error } = await getTrustMetrics()
      if (error) {
        setError(error.message)
      } else {
        setTrustMetrics(data || [])
      }
      setLoading(false)
    }

    fetchMetrics()

    // Subscribe to real-time updates
    const subscription = subscribeToTrustMetrics((payload) => {
      if (payload.eventType === 'INSERT') {
        setTrustMetrics(prev => [payload.new, ...prev.slice(0, 9)])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { trustMetrics, loading, error }
}

export const useLeaderboard = () => {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await getUserProfiles()
      if (error) {
        setError(error.message)
      } else {
        setUsers(data || [])
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}

export const useRumors = () => {
  const [rumors, setRumors] = useState<Rumor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRumors = async () => {
      const { data, error } = await getRumors()
      if (error) {
        setError(error.message)
      } else {
        setRumors(data || [])
      }
      setLoading(false)
    }

    fetchRumors()
  }, [])

  return { rumors, loading, error }
}