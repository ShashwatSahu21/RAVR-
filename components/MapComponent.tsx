'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '../lib/supabase';
import { useEffect } from 'react';
import L from 'leaflet';

// Create glowing icon
const createGlowIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div class="relative w-6 h-6 flex items-center justify-center pointer-events-none">
        <div class="absolute w-full h-full rounded-full opacity-50 animate-glow pointer-events-none" style="background-color: ${color};"></div>
        <div class="relative w-3 h-3 rounded-full pointer-events-none" style="background-color: ${color}; box-shadow: 0 0 10px ${color}, 0 0 20px ${color};"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const vibeColors: Record<string, string> = {
  chill: '#10b981',       // green
  active: '#f97316',      // orange
  trending: '#ec4899',    // pink
  underground: '#8b5cf6'  // purple
};


export default function MapComponent({ events, onEventClick }: { events: Event[], onEventClick?: (e: Event) => void }) {
  const defaultCenter: [number, number] = [40.7128, -74.0060]; // NYC
  
  return (
    <div className="w-full h-full w-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
        zoomControl={false}
      >
        {/* Dark theme tiles without labels (or dark matter) */}
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
              <Popup className="glass-popup">
                <div className="p-1 min-w-[150px]">
                  <h3 className="font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-xs text-gray-300 mb-2">{event.category.toUpperCase()}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-ravr-pink font-bold">{event.vibe_score} Vibe</span>
                    <span className="text-gray-400">{event.attendance} RSVP</span>
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
