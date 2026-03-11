import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key'

// We create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock data types for the MVP
export type Event = {
  id: string
  title: string
  description: string
  category: string
  latitude: number
  longitude: number
  date: string
  vibe_score: number
  attendance: number
}

// Fallback mock data when Supabase is not connected
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Midnight Rooftop Rave",
    description: "Underground techno and house music all night.",
    category: "underground",
    latitude: 40.7128,
    longitude: -74.0060,
    date: new Date(Date.now() + 86400000).toISOString(),
    vibe_score: 95,
    attendance: 400
  },
  {
    id: "2",
    title: "Sunset Chillout Session",
    description: "Relaxing lo-fi beats with the best view of the city.",
    category: "chill",
    latitude: 40.7140,
    longitude: -74.0080,
    date: new Date(Date.now() + 172800000).toISOString(),
    vibe_score: 82,
    attendance: 120
  },
  {
    id: "3",
    title: "Pop-up Sneaker Drop",
    description: "Exclusive sneaker release and streetwear market.",
    category: "trending",
    latitude: 40.7155,
    longitude: -74.0040,
    date: new Date(Date.now() + 3600000).toISOString(),
    vibe_score: 88,
    attendance: 250
  },
  {
    id: "4",
    title: "Central Park Run Club",
    description: "5k run followed by smoothies and networking.",
    category: "active",
    latitude: 40.7115,
    longitude: -74.0055,
    date: new Date(Date.now() + 432000000).toISOString(),
    vibe_score: 75,
    attendance: 85
  }
]

export const fetchEvents = async (): Promise<Event[]> => {
  // If we don't have real Supabase keys, use mock data
  if (supabaseUrl === 'https://mock.supabase.co') {
    return mockEvents
  }

  const { data, error } = await supabase
    .from('Events')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return mockEvents // fallback to mock data on error for demo purposes
  }

  return data as Event[]
}
