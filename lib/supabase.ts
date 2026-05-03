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
  image_url?: string
}

// Fallback mock data when Supabase is not connected
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Midnight Frequencies",
    description: "The ultimate underground techno session. High-end sounds, low-end frequencies.",
    category: "underground",
    latitude: 12.9784,
    longitude: 77.6408,
    date: new Date(Date.now() + 86400000).toISOString(),
    vibe_score: 98,
    attendance: 400,
    image_url: "/techno_party_vibe_1_1773324322303.png"
  },
  {
    id: "2",
    title: "Brick Lane Sypher",
    description: "Exclusive urban pop-up featuring street art, music, and the best of city culture.",
    category: "trending",
    latitude: 12.9352,
    longitude: 77.6245,
    date: new Date(Date.now() + 172800000).toISOString(),
    vibe_score: 92,
    attendance: 250,
    image_url: "/brick_lane_vibe_1_1773324403736.png"
  },
  {
    id: "3",
    title: "SYPHER: Red Room",
    description: "Minimalist clubbing experience. Deep beats and sharp visuals in the Red Room.",
    category: "underground",
    latitude: 12.9745,
    longitude: 77.6006,
    date: new Date(Date.now() + 3600000).toISOString(),
    vibe_score: 88,
    attendance: 180,
    image_url: "/sypher_vibe_1_1773324459982.png"
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
