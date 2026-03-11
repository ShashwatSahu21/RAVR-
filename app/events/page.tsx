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
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="w-12 h-12 text-ravr-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ravr-purple to-ravr-pink">
          Trending Now.
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          The best parties, raves, and pop-ups happening near you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
