'use client';

import { useEffect, useState } from 'react';
import EventCard from '@/components/EventCard';
import { fetchEvents, Event } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    }
    getEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-ravr-coral animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-ravr-coral text-[0.65rem] tracking-[0.3em] uppercase mb-4 font-bold">// Live Feed</div>
          <h1 className="font-bebas text-5xl sm:text-8xl leading-[0.9] text-white">
            Trending<br/>Now.
          </h1>
          <p className="mt-6 text-muted-foreground text-sm sm:text-lg max-w-xl font-medium leading-relaxed">
            The best parties, raves, and underground pop-ups happening in your city right now. Don&apos;t look back — just go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <EventCard event={event} featured={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

