'use client';

import { motion } from 'framer-motion';
import { Settings, LogOut, Heart, MapPin, Zap } from 'lucide-react';
import { Event, mockEvents } from '@/lib/supabase';
import EventCard from '@/components/EventCard';
import { cn } from '@/lib/utils';

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
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-ravr-coral text-[0.65rem] tracking-[0.3em] uppercase mb-4 font-bold">// My Space</div>
          <h1 className="font-bebas text-5xl sm:text-8xl leading-[0.9] text-white">
            Personal<br/>Radar.
          </h1>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ravr-grey rounded-2xl p-8 sm:p-12 border border-white/[0.05] relative overflow-hidden mb-20 shadow-2xl shadow-black/50"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-ravr-purple/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-ravr-purple via-ravr-coral to-ravr-yellow flex-shrink-0">
              <div className="w-full h-full bg-ravr-black rounded-full flex items-center justify-center border-8 border-ravr-grey">
                <span className="text-5xl font-bebas text-white tracking-wider">AR</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start justify-center">
              <div className="flex flex-col md:flex-row md:items-center gap-6 w-full justify-between mb-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl font-syne font-extrabold text-white">{user.name}</h2>
                  <p className="text-ravr-coral font-mono tracking-widest text-sm mt-1">
                    {user.username}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="glass p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all text-muted-foreground hover:text-white">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="glass px-6 py-3 rounded-xl border border-white/5 hover:border-red-500/30 transition-all text-sm font-bold tracking-widest uppercase flex items-center gap-2 group text-muted-foreground hover:text-red-500">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 sm:gap-16">
                {[
                  { label: 'Vibe Match', value: `${user.vibeRating}%`, sub: <Zap className="w-3 h-3 text-ravr-yellow" /> },
                  { label: 'Followers', value: user.followers },
                  { label: 'Following', value: user.following }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center md:items-start">
                    <span className="text-3xl font-bebas text-white">{stat.value}</span>
                    <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                       {stat.sub && <span>{stat.sub}</span>}
                       {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Saved Events */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="font-bebas text-3xl text-white tracking-widest flex items-center gap-4">
              <Heart className="w-6 h-6 text-ravr-coral fill-ravr-coral/20" /> 
              Upcoming Plans
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {myEvents.map((e: Event, i: number) => (
                <motion.div key={e.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                  <EventCard event={e} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Feed */}
          <div className="space-y-8">
            <h3 className="font-bebas text-3xl text-white tracking-widest flex items-center gap-4">
              <MapPin className="w-6 h-6 text-ravr-purple" /> 
              Recent Activity
            </h3>

            <div className="bg-ravr-grey border border-white/[0.05] p-8 rounded-2xl flex flex-col gap-6 relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-ravr-purple" />
              {[
                { type: 'RSVP', target: 'Secret Warehouse Pitch', time: '1d ago' },
                { type: 'SAVED', target: 'Midnight Frequencies', time: '3d ago' },
                { type: 'JOINED', target: 'Techno Tribe', time: '1w ago' }
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                  {i !== 2 && <div className="absolute top-6 left-[11px] w-[2px] h-[calc(100%-8px)] bg-white/5" />}
                  <div className="w-6 h-6 rounded-full bg-ravr-black border-2 border-ravr-coral flex-shrink-0 z-10" />
                  <div>
                    <p className="text-white text-xs font-medium leading-relaxed">
                      {activity.type === 'RSVP' && 'Confirmed presence for '}
                      {activity.type === 'SAVED' && 'Pinned '}
                      {activity.type === 'JOINED' && 'Joined the squad for '}
                      <span className="text-ravr-coral font-bold">{activity.target}</span>
                    </p>
                    <span className="text-[0.6rem] text-muted-foreground uppercase tracking-widest mt-1 block font-mono">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

