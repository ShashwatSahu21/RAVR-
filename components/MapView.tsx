'use client';

import dynamic from 'next/dynamic';
import { Event } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

// Dynamically import MapComponent to disable server-side rendering for leaflet
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-ravr-black/50">
      <Loader2 className="w-8 h-8 animate-spin text-ravr-purple" />
    </div>
  ),
});

interface MapViewProps {
  events: Event[];
  onEventClick?: (e: Event) => void;
}

export default function MapView({ events, onEventClick }: MapViewProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 glass shadow-2xl shadow-ravr-purple/5">
      {/* Glossy overlay on map edges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ravr-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ravr-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ravr-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ravr-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapComponent events={events} onEventClick={onEventClick} />
      </div>
    </div>
  );
}
