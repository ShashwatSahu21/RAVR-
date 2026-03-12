'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchEvents, Event } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 animate-spin text-ravr-coral" />
    </div>
  ),
});

export default function MapPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchEvents();
      setEvents(data);
    }
    load();
  }, []);

  return (
    <div className="w-full h-screen relative pt-[88px] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <h1 className="font-bebas text-2xl sm:text-4xl tracking-[0.2em] text-center text-white glass px-10 py-4 rounded-xl border border-white/5 shadow-2xl">
          Live <span className="text-ravr-coral">City</span> Radar
        </h1>
      </motion.div>
      
      <div className="w-full h-full">
        <MapView events={events} />
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-10 left-6 sm:left-10 z-20 flex flex-col gap-2">
        {[
          { color: 'bg-ravr-coral', label: 'Trending' },
          { color: 'bg-ravr-yellow', label: 'Active' },
          { color: 'bg-ravr-teal', label: 'Chill' },
          { color: 'bg-ravr-purple', label: 'Underground' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 glass px-4 py-2 rounded-lg border border-white/5">
            <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
            <span className="text-[0.6rem] font-bold tracking-widest uppercase text-white/60">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

