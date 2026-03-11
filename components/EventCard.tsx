'use client';

import { motion } from 'framer-motion';
import { Event } from '../lib/supabase';
import { Users, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  featured?: boolean;
}

export default function EventCard({ event, onClick, featured = false }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Vibe colors
  const vibeColors: Record<string, string> = {
    chill: 'from-ravr-chill/30 to-ravr-chill/5 text-ravr-chill border-ravr-chill/30',
    active: 'from-ravr-active/30 to-ravr-active/5 text-ravr-active border-ravr-active/30',
    trending: 'from-ravr-trending/30 to-ravr-trending/5 text-ravr-trending border-ravr-trending/30',
    underground: 'from-ravr-underground/30 to-ravr-underground/5 text-ravr-underground border-ravr-underground/30',
  };

  const currentVibe = vibeColors[event.category] || vibeColors.trending;
  
  // Format the date
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'MMM d, h:mm a');

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl glass border p-5 cursor-pointer flex flex-col gap-4 group transition-all duration-300",
        currentVibe,
        featured ? "col-span-1 md:col-span-2 shadow-lg shadow-ravr-purple/10 border-white/20" : "shadow-md hover:shadow-xl hover:shadow-white/5"
      )}
    >
      {/* Glow Effect */}
      <div className={cn(
        "absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition duration-500",
        event.category === 'chill' && "bg-ravr-chill/10",
        event.category === 'active' && "bg-ravr-active/10",
        event.category === 'trending' && "bg-ravr-trending/10",
        event.category === 'underground' && "bg-ravr-underground/10"
      )} />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider font-semibold opacity-80">
            {event.category}
          </span>
          <h3 className={cn("font-bold text-white", featured ? "text-2xl" : "text-xl")}>
            {event.title}
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full glass border border-white/10 shrink-0">
          <span className="text-lg font-bold text-white">{event.vibe_score}</span>
          <span className="text-[10px] text-gray-400 -mt-1">Vibe</span>
        </div>
      </div>

      {/* Details */}
      <div className="relative z-10 mt-auto flex flex-col gap-3">
        <p className="text-sm text-gray-300 line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{event.attendance} RSVP</span>
          </div>
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className={cn(
        "absolute bottom-4 right-4 text-white/50 transition-all duration-300 transform",
        isHovered ? "translate-x-0 opacity-100 text-white" : "-translate-x-4 opacity-0"
      )}>
        <ChevronRight className="w-5 h-5" />
      </div>

      {/* Background Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
}
