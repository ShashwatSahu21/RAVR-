'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Map as MapIcon, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section Container */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ravr-purple/30 rounded-full blur-[120px] pointer-events-none animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-ravr-pink/20 rounded-full blur-[150px] pointer-events-none animate-glow" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Pill Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-ravr-pink" />
              <span className="text-sm font-medium text-gray-300">Live in NYC • 240+ Events</span>
            </motion.div>

            {/* Typography */}
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
              Don&apos;t miss <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ravr-purple via-ravr-pink to-ravr-purple bg-[length:200%_auto] animate-glow">
                the moment.
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-gray-400 font-medium">
              RAVR is your ticket to the best underground raves, pop-ups, and spontaneous meetups happening around you right now. 
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link href="/events" className="group">
                <button className="relative px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-ravr-purple to-ravr-pink hover:scale-105 transition-transform duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,0,128,0.4)] hover:shadow-[0_0_40px_rgba(255,0,128,0.6)]">
                  Explore Events
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/map">
                <button className="px-8 py-4 rounded-full font-bold text-white glass hover:bg-white/10 transition-colors flex items-center gap-2">
                  <MapIcon className="w-5 h-5" />
                  Live Map
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Section Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-4"
          >
             <div className="w-12 h-12 rounded-2xl bg-ravr-chill/20 flex items-center justify-center text-ravr-chill mb-2">
               <MapIcon className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold">Live City Heatmap</h3>
             <p className="text-gray-400">See exactly where the city is buzzing right now. No more dead parties.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-4"
          >
             <div className="w-12 h-12 rounded-2xl bg-ravr-trending/20 flex items-center justify-center text-ravr-trending mb-2">
               <Zap className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold">Vibe Score</h3>
             <p className="text-gray-400">Our algorithm measures RSVP velocity to show you the most trending events in real-time.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-4"
          >
             <div className="w-12 h-12 rounded-2xl bg-ravr-active/20 flex items-center justify-center text-ravr-active mb-2">
               <Users className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold">Join with Friends</h3>
             <p className="text-gray-400">See where your crew is heading and roll up together. Everything is better with squad.</p>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
