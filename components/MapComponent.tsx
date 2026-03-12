'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '../lib/supabase';
import { cn } from '../lib/utils';
import L from 'leaflet';

// Create glowing icon
const createGlowIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div class="relative w-8 h-8 flex items-center justify-center pointer-events-none">
        <div class="absolute w-full h-full rounded-full opacity-30 animate-pulse pointer-events-none" style="background-color: ${color};"></div>
        <div class="relative w-3.5 h-3.5 rounded-full pointer-events-none" style="background-color: ${color}; box-shadow: 0 0 15px ${color}, 0 0 30px ${color}; border: 2px solid white;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const vibeColors: Record<string, string> = {
  chill: '#00F5C4',       // teal
  active: '#FFE03D',      // yellow
  trending: '#FF3D5A',    // coral
  underground: '#9B5DE5'  // purple
};


export default function MapComponent({ events, onEventClick }: { events: Event[], onEventClick?: (e: Event) => void }) {
  const defaultCenter: [number, number] = [12.9716, 77.5946]; // Bangalore
  
  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', background: '#050507' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {events.map((event) => (
          <Marker 
            key={event.id}
            position={[event.latitude, event.longitude]}
            icon={createGlowIcon(vibeColors[event.category] || vibeColors.trending)}
            eventHandlers={{
              click: () => onEventClick && onEventClick(event),
            }}
          >
            {!onEventClick && (
              <Popup className="premium-popup">
                <div className="p-2 min-w-[180px] bg-ravr-grey rounded-lg border border-white/5">
                  <div className="text-[0.6rem] uppercase tracking-[0.2em] font-bold mb-1 opacity-60" style={{ color: vibeColors[event.category] }}>
                    {event.category}
                  </div>
                  <h3 className="font-syne font-bold text-white text-base mb-3 leading-tight">{event.title}</h3>
                  <div className="flex justify-between items-center text-[0.65rem] font-mono border-t border-white/5 pt-2">
                    <span className="text-ravr-coral font-bold uppercase">{event.vibe_score} Vibe</span>
                    <span className="text-muted-foreground">{event.attendance} RSVP</span>
                  </div>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

