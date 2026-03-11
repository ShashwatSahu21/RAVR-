'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Type, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'chill',
    date: '',
    attendance: 0,
    latitude: 40.7128,  // defaulting to NYC
    longitude: -74.0060,
  });

  const generateRandomVibe = () => Math.floor(Math.random() * (100 - 60 + 1)) + 60; // 60-100 logic (MVP)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate MVP Save to Supabase
    // Using simple mock insertion if real table exists, else just log and redirect
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock.supabase.co') {
        const { error } = await supabase.from('Events').insert([
          {
            ...formData,
            vibe_score: generateRandomVibe()
          }
        ]);
        if (error) throw error;
      } else {
        console.log('Mock saved:', formData);
      }
      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden shadow-2xl shadow-ravr-purple/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-ravr-purple/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ravr-pink/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2 mb-8 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Host the moment.
          </h1>
          <p className="text-gray-400">
            Add a new event to the live city map. Let people know where the vibe is.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
          {/* Title input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-ravr-purple" />
              Event Title
            </label>
            <input 
              required
              type="text" 
              placeholder="Midnight Secret Set..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-ravr-purple/50 focus:border-transparent transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ravr-pink" />
                Category / Vibe
              </label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-ravr-pink/50 transition-all appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="chill" className="text-black">Chill</option>
                <option value="active" className="text-black">Active</option>
                <option value="trending" className="text-black">Trending</option>
                <option value="underground" className="text-black">Underground</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ravr-purple" />
                Date & Time
              </label>
              <input 
                required
                type="datetime-local" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-ravr-purple/50 transition-all [color-scheme:dark]"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <span className="w-4 h-4 text-ravr-pink font-bold flex items-center justify-center">?</span>
              Description
            </label>
            <textarea 
              required
              rows={4}
              placeholder="What should people expect? Dress code? Lineup?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-ravr-pink/50 focus:border-transparent transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-ravr-purple" />
              Expected Crowd Size (MVP fake data)
            </label>
            <input 
              type="number" 
              min="1"
              max="5000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ravr-purple/50 transition-all"
              value={formData.attendance}
              onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value) || 0})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 w-full relative px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-ravr-purple to-ravr-pink hover:scale-[1.02] transition-transform duration-300 flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(255,0,128,0.3)] hover:shadow-[0_0_40px_rgba(255,0,128,0.5)] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Creating...' : 'Drop Event on Map'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
