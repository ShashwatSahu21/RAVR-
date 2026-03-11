'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchEvents, Event } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-ravr-black">
      <Loader2 className="w-12 h-12 animate-spin text-ravr-purple" />
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
    <div className="w-full h-[calc(100vh-64px)] relative">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 glass px-6 py-2 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Live City.
        </h1>
      </div>
      <MapView events={events} />
    </div>
  );
}
