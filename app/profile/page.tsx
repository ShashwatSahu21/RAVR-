'use client';

import { motion } from 'framer-motion';
import { Settings, LogOut, Heart, MapPin, Zap } from 'lucide-react';
import { Event, mockEvents } from '@/lib/supabase';
import EventCard from '@/components/EventCard';

export default function ProfilePage() {
  // Mock User Data for MVP
  const user = {
    username: '@techno_kid',
    name: 'Alex Rivera',
    joined: '2024',
    vibeRating: 98,
    following: 124,
    followers: 890,
  };

  const myEvents = mockEvents.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden mb-12 shadow-2xl shadow-ravr-purple/5"
      >
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-ravr-purple/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-ravr-purple to-ravr-pink">
            <div className="w-full h-full bg-ravr-black rounded-full flex items-center justify-center border-4 border-black">
              <span className="text-4xl font-bold text-white tracking-wider">A</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full justify-between">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-ravr-purple to-ravr-pink font-semibold">
                  {user.username}
                </p>
              </div>
              
              <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/5">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-red-400 flex items-center gap-2 text-sm font-medium">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-400 mt-2">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-white">{user.vibeRating}%</span>
                <span className="flex items-center gap-1 text-xs uppercase tracking-wider"><Zap className="w-3 h-3 text-ravr-trending" /> Vibe Match</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-white">{user.followers}</span>
                <span className="text-xs uppercase tracking-wider">Followers</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-white">{user.following}</span>
                <span className="text-xs uppercase tracking-wider">Following</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Saved Events */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-ravr-pink" /> 
            Upcoming Saved Events
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myEvents.map((e: Event, i: number) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <EventCard event={e} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-ravr-purple" /> 
            Recent Activity
          </h2>

          <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                {i !== 2 && <div className="absolute top-8 left-3 w-px h-[calc(100%-8px)] bg-white/10" />}
                <div className="w-6 h-6 rounded-full bg-ravr-black border-2 border-ravr-pink z-10 flex-shrink-0" />
                <div className="flex flex-col mt-[-2px]">
                  <p className="text-white text-sm">
                    RSVP&apos;d to <span className="font-bold text-ravr-pink">Secret Warehouse Pitch</span>
                  </p>
                  <span className="text-xs text-gray-500 mt-1">{i + 1} day{i !== 0 ? 's' : ''} ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
