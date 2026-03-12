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
    title: "Indiranagar Underground Rave",
    description: "Warehouse techno and house music in the heart of Indiranagar.",
    category: "underground",
    latitude: 12.9784,
    longitude: 77.6408,
    date: new Date(Date.now() + 86400000).toISOString(),
    vibe_score: 95,
    attendance: 400
  },
  {
    id: "2",
    title: "Koramangala Jazz Session",
    description: "Relaxing live jazz and lo-fi beats at a rooftop lounge.",
    category: "chill",
    latitude: 12.9352,
    longitude: 77.6245,
    date: new Date(Date.now() + 172800000).toISOString(),
    vibe_score: 82,
    attendance: 120
  },
  {
    id: "3",
    title: "MG Road Pop-up Drop",
    description: "Exclusive sneaker release and streetwear market at MG Road.",
    category: "trending",
    latitude: 12.9745,
    longitude: 77.6006,
    date: new Date(Date.now() + 3600000).toISOString(),
    vibe_score: 88,
    attendance: 250
  },
  {
    id: "4",
    title: "Cubbon Park Morning Run",
    description: "Community 5k run followed by breakfast and networking.",
    category: "active",
    latitude: 12.9764,
    longitude: 77.5929,
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
