// Mock Supabase implementation for development
// This provides all the same interfaces as the real Supabase client

export interface MockUser {
  id: string
  email: string
  created_at: string
}

export interface MockSession {
  user: MockUser
  access_token: string
}

// Mock data
const mockUsers = [
  { id: '1', email: 'demo@newsinsight.com', password: 'demo123' },
  { id: '2', email: 'alice@example.com', password: 'password123' },
  { id: '3', email: 'bob@example.com', password: 'password123' }
]

const mockUserProfiles = [
  { id: '1', email: 'demo@newsinsight.com', username: 'Demo User', trust_points: 2500, verifications_count: 45 },
  { id: '2', email: 'alice@example.com', username: 'Alice Johnson', trust_points: 1890, verifications_count: 32 },
  { id: '3', email: 'bob@example.com', username: 'Bob Smith', trust_points: 1650, verifications_count: 28 }
]

const mockNewsItems = [
  {
    id: '1',
    title: 'Breaking: New Climate Research Shows Promising Results',
    content: 'Scientists at leading universities have published groundbreaking research...',
    source: 'Nature Climate Journal',
    verified: true,
    trust_score: 94.5,
    category: 'Science',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Tech Giants Announce Joint AI Safety Initiative',
    content: 'Major technology companies have formed an alliance...',
    source: 'Tech News Daily',
    verified: true,
    trust_score: 89.2,
    category: 'Technology',
    created_at: new Date().toISOString()
  }
]

const mockTrustMetrics = [
  { id: '1', metric_name: 'Source Reliability', score: 96.0, timestamp: new Date().toISOString() },
  { id: '2', metric_name: 'Fact Verification', score: 92.0, timestamp: new Date().toISOString() },
  { id: '3', metric_name: 'Content Accuracy', score: 95.0, timestamp: new Date().toISOString() },
  { id: '4', metric_name: 'Detection Rate', score: 94.0, timestamp: new Date().toISOString() }
]

const mockRumors = [
  {
    id: '1',
    content: 'Major tech company planning massive layoffs next quarter',
    source: 'Anonymous insider',
    status: 'pending' as const,
    trust_score: 45.2,
    votes_count: 156,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    content: 'New vaccine side effects discovered in recent study',
    source: 'Unverified medical source',
    status: 'debunked' as const,
    trust_score: 15.8,
    votes_count: 89,
    created_at: new Date().toISOString()
  }
]

// Mock authentication state
let currentUser: MockUser | null = null
let authListeners: Array<(event: string, session: MockSession | null) => void> = []

export const mockSupabase = {
  auth: {
    getUser: async () => {
      return { 
        data: { user: currentUser }, 
        error: null 
      }
    },
    
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      const user = mockUsers.find(u => u.email === email && u.password === password)
      if (user) {
        currentUser = {
          id: user.id,
          email: user.email,
          created_at: new Date().toISOString()
        }
        const session = { user: currentUser, access_token: 'mock-token' }
        
        // Notify listeners
        setTimeout(() => {
          authListeners.forEach(listener => listener('SIGNED_IN', session))
        }, 100)
        
        return { 
          data: { user: currentUser, session }, 
          error: null 
        }
      }
      return { 
        data: { user: null, session: null }, 
        error: { message: 'Invalid credentials' } 
      }
    },
    
    signUp: async ({ email, password }: { email: string; password: string }) => {
      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        created_at: new Date().toISOString()
      }
      currentUser = newUser
      const session = { user: newUser, access_token: 'mock-token' }
      
      setTimeout(() => {
        authListeners.forEach(listener => listener('SIGNED_IN', session))
      }, 100)
      
      return { 
        data: { user: newUser, session }, 
        error: null 
      }
    },
    
    signOut: async () => {
      currentUser = null
      setTimeout(() => {
        authListeners.forEach(listener => listener('SIGNED_OUT', null))
      }, 100)
      return { error: null }
    },
    
    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => {
      authListeners.push(callback)
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              authListeners = authListeners.filter(l => l !== callback)
            }
          }
        }
      }
    }
  },
  
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          if (table === 'user_profiles') {
            const profile = mockUserProfiles.find(p => p[column as keyof typeof p] === value)
            return { data: profile || null, error: profile ? null : { message: 'Not found' } }
          }
          return { data: null, error: { message: 'Not found' } }
        }
      }),
      order: (column: string, options?: any) => ({
        limit: (count: number) => ({
          then: async (resolve: any) => {
            let data: any[] = []
            switch (table) {
              case 'news_items':
                data = mockNewsItems
                break
              case 'trust_metrics':
                data = mockTrustMetrics
                break
              case 'user_profiles':
                data = mockUserProfiles
                break
              case 'rumors':
                data = mockRumors
                break
            }
            resolve({ data, error: null })
          }
        })
      }),
      then: async (resolve: any) => {
        let data: any[] = []
        switch (table) {
          case 'news_items':
            data = mockNewsItems
            break
          case 'trust_metrics':
            data = mockTrustMetrics
            break
          case 'user_profiles':
            data = mockUserProfiles
            break
          case 'rumors':
            data = mockRumors
            break
        }
        resolve({ data, error: null })
      }
    }),
    insert: (values: any[]) => ({
      then: async (resolve: any) => {
        resolve({ data: values, error: null })
      }
    })
  }),
  
  channel: (name: string) => ({
    on: (event: string, config: any, callback: (payload: any) => void) => ({
      subscribe: () => ({
        unsubscribe: () => {}
      })
    })
  })
}

// Export the same interface as real Supabase
export const supabase = mockSupabase