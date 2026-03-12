'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Type, ArrowRight, Zap } from 'lucide-react';
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
    latitude: 12.9716,  // defaulting to Bangalore
    longitude: 77.5946,
  });

  const generateRandomVibe = () => Math.floor(Math.random() * (100 - 60 + 1)) + 60; // 60-100 logic (MVP)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
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
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-ravr-coral text-[0.65rem] tracking-[0.3em] uppercase mb-4 font-bold">// Stage Management</div>
          <h1 className="font-bebas text-5xl sm:text-8xl leading-[0.9] text-white">
            Host The<br/>Moment.
          </h1>
          <p className="mt-6 text-muted-foreground text-sm sm:text-lg max-w-xl font-medium leading-relaxed">
            Drop your event on the live radar. Houses, warehouses, rooftops — if it&apos;s real, it belongs here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-ravr-grey rounded-2xl p-8 sm:p-12 border border-white/[0.05] relative shadow-2xl shadow-black/50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-ravr-coral/5 blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
            
            {/* Title Section */}
            <div className="space-y-4">
              <label className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-muted-foreground flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-ravr-coral" />
                Event Title
              </label>
              <input 
                required
                type="text" 
                placeholder="Midnight Secret Set..."
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl sm:text-4xl font-syne font-extrabold text-white placeholder:text-white/10 focus:outline-none focus:border-ravr-coral transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Category & Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-ravr-yellow" />
                  Category / Vibe
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-ravr-yellow/30 transition-all appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="chill" className="bg-[#1a1a1c]">Chill</option>
                    <option value="active" className="bg-[#1a1a1c]">Active</option>
                    <option value="trending" className="bg-[#1a1a1c]">Trending</option>
                    <option value="underground" className="bg-[#1a1a1c]">Underground</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground opacity-50">▼</div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-ravr-purple" />
                  Date & Time
                </label>
                <input 
                  required
                  type="datetime-local" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-ravr-purple/30 transition-all [color-scheme:dark] cursor-pointer"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <label className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-muted-foreground">
                Description & Entry Rules
              </label>
              <textarea 
                required
                rows={4}
                placeholder="What should people expect? Dress code? Lineup?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-5 text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-ravr-coral/30 transition-all resize-none leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-ravr-teal" />
                  Expected Crowd
                </label>
                <input 
                  type="number" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-ravr-teal/30 transition-all"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-ravr-coral" />
                  Location (Current City)
                </label>
                <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm font-bold tracking-widest uppercase opacity-50 cursor-not-allowed">
                  Bengaluru, KA (BLR)
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-10 w-full bg-ravr-coral text-black font-bebas text-3xl py-6 rounded-xl hover:bg-ravr-yellow hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-4 group"
            >
              {loading ? 'Transmitting...' : 'Drop On Map'}
              {!loading && <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

