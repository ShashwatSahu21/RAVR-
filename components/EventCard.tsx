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

  // Vibe colors mapping
  const vibeColors: Record<string, string> = {
    chill: 'text-ravr-teal',
    active: 'text-ravr-yellow',
    trending: 'text-ravr-coral',
    underground: 'text-ravr-purple',
  };

  const currentVibeColor = vibeColors[event.category] || vibeColors.trending;
  
  // Format the date
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'MMM d, h:mm a');

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative bg-ravr-grey border border-white/[0.05] rounded-xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500",
        featured ? "md:col-span-2 lg:col-span-2 shadow-black/40" : "shadow-black/20"
      )}
    >
      {/* Visual Header / Image Placeholder */}
      <div className={cn(
        "relative overflow-hidden aspect-video w-full",
        featured ? "aspect-[21/9]" : "aspect-video"
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
          event.category === 'chill' && "from-[#001a14] to-ravr-teal",
          event.category === 'active' && "from-[#1a1000] to-ravr-yellow",
          event.category === 'trending' && "from-[#1a0005] to-ravr-coral",
          event.category === 'underground' && "from-[#0d001a] to-ravr-purple"
        )} />
        
        {/* Glow Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ravr-grey to-transparent z-10" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
           <span className={cn(
             "px-3 py-1 rounded-full text-[0.6rem] font-bold tracking-[0.2em] uppercase border backdrop-blur-md",
             event.category === 'chill' && "border-ravr-teal/30 text-ravr-teal bg-ravr-teal/10",
             event.category === 'active' && "border-ravr-yellow/30 text-ravr-yellow bg-ravr-yellow/10",
             event.category === 'trending' && "border-ravr-coral/30 text-ravr-coral bg-ravr-coral/10",
             event.category === 'underground' && "border-ravr-purple/30 text-ravr-purple bg-ravr-purple/10"
           )}>
             {event.category}
           </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10 -mt-10">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className={cn(
            "font-syne font-extrabold text-white leading-tight transition-colors group-hover:text-ravr-coral",
            featured ? "text-3xl" : "text-xl"
          )}>
            {event.title}
          </h3>
          <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-white/10 rounded-full glass">
            <span className={cn("font-bebas text-lg", currentVibeColor)}>{event.vibe_score}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-medium leading-relaxed">
          {event.description}
        </p>

        {/* Footer Meta */}
        <div className="pt-5 border-t border-white/[0.05] flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-5 text-[0.65rem] tracking-wider text-muted-foreground font-mono uppercase">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formattedDate}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.attendance}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-[0.65rem] font-bold tracking-widest uppercase transition-all duration-300",
            isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
          )}>
            Details <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Hover Highlight Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className={cn("absolute bottom-0 left-0 right-0 h-1 origin-left", currentVibeColor.replace('text-', 'bg-'))}
      />
    </motion.div>
  );
}

