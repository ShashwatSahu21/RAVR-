'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Map as MapIcon, Calendar, ArrowUpRight, Activity, TrendingUp, Radio } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Marquee from '@/components/Marquee';
import { useRef, useEffect, useState } from 'react';
import { mockEvents } from '@/lib/supabase';
import EventCard from '@/components/EventCard';

// Dynamically import Three.js scene to avoid SSR issues
const VibeScene = dynamic(() => import('@/components/VibeScene'), { ssr: false });

const Reveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center px-6 sm:px-10 overflow-hidden">
        {/* Three.js Interactive Background */}
        <VibeScene />
        
        <div className="relative z-10 max-w-7xl w-full pt-20">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase text-ravr-coral border border-ravr-coral/20 px-6 py-2.5 rounded-full mb-10 glass shadow-[0_0_30px_rgba(255,61,90,0.1)]"
          >
            <Zap className="w-3.5 h-3.5 fill-ravr-coral" />
            Live in Bangalore · Now Trending
          </motion.div>

          <div className="relative">
            <h1 className="font-bebas text-[clamp(4.8rem,18vw,18rem)] leading-[0.8] select-none perspective-1000 tracking-[-0.03em]">
              <motion.span 
                style={{ y: y2, opacity }}
                className="block mb-4"
              >
                CATCH
              </motion.span>
              <motion.span 
                style={{ y: y1, opacity }}
                className="block text-stroke-coral text-transparent relative group drop-shadow-[0_0_40px_rgba(255,61,90,0.2)]"
              >
                THE VIBE
                <span className="absolute inset-0 text-ravr-coral opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 animate-pulse">THE VIBE</span>
              </motion.span>
            </h1>
            
            {/* Decal Background Text */}
            <div className="absolute -top-10 -left-10 text-[20rem] font-bebas text-white/[0.02] -z-10 select-none hidden lg:block uppercase">
              RAVR
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-10">
            <motion.div style={{ opacity }}>
              <p className="text-white/60 text-sm sm:text-lg leading-relaxed max-w-sm font-medium mb-8">
                The city&apos;s heartbeat, visualized. Locate the energy, skip the line, and own the night. No placeholders, just pure vibe.
              </p>
              
              {/* Gen-Z Metrics Bar */}
              <div className="flex gap-8 items-center border-t border-white/5 pt-8">
                {[
                  { label: 'ENERGY', value: '4.8kW', icon: <Radio className="w-3 h-3" /> },
                  { label: 'MOOD', value: 'TECHNO', icon: <Activity className="w-3 h-3" /> },
                  { label: 'TREND', value: '+24%', icon: <TrendingUp className="w-3 h-3" /> }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[0.55rem] tracking-[0.2em] text-muted-foreground font-bold flex items-center gap-1.5">
                      {stat.icon} {stat.label}
                    </span>
                    <span className="text-xl font-bebas text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              style={{ opacity, scale }}
              className="flex items-center gap-4"
            >
              <Link href="/events" className="group relative bg-white text-black font-bebas text-3xl px-12 py-6 rounded-2xl transition-all hover:bg-ravr-coral hover:text-white hover:-translate-y-2 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <span className="relative z-10 flex items-center gap-4">
                   Explore Tonight <ArrowUpRight className="w-8 h-8" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-ravr-coral to-ravr-purple opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[0.6rem] tracking-[0.4em] uppercase font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── LIVE FEED SECTION ── */}
      <section className="py-24 sm:py-40 px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 border-b border-white/5 pb-12">
            <div>
              <div className="text-ravr-coral text-[0.65rem] tracking-[0.4em] uppercase mb-4 font-bold">// Pulse Check</div>
              <h2 className="font-bebas text-6xl sm:text-8xl leading-none">The Radar</h2>
            </div>
            <Link href="/events" className="text-sm font-bold tracking-[0.2em] uppercase text-ravr-coral hover:text-white transition-colors flex items-center gap-2">
              View All Events <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockEvents.slice(0, 3).map((event, i) => (
            <Reveal key={event.id}>
              <EventCard event={event} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE APP SECTION ── */}
      <section className="py-24 sm:py-40 px-6 sm:px-10 bg-ravr-grey/20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <Reveal>
             <div className="space-y-10">
                <div className="text-ravr-coral text-[0.65rem] tracking-[0.4em] uppercase font-bold">// Experience</div>
                <h2 className="font-bebas text-6xl sm:text-9xl leading-[0.85]">City<br/><span className="text-ravr-coral">In Real</span><br/>Time.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   {[
                     { icon: <MapIcon className="w-5 h-5" />, title: 'Live Map', desc: 'Real-time heatmaps of city activity.' },
                     { icon: <Zap className="w-5 h-5" />, title: 'Vibe Score', desc: 'AI-driven trending event tracking.' },
                     { icon: <Calendar className="w-5 h-5" />, title: 'Flash RSVP', desc: 'One-tap entry to underground raves.' }
                   ].map((item, i) => (
                     <div key={i} className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-ravr-coral/10 border border-ravr-coral/20 flex items-center justify-center text-ravr-coral">
                           {item.icon}
                        </div>
                        <h4 className="font-syne font-bold text-lg">{item.title}</h4>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </Reveal>

          <Reveal>
             <div className="relative">
                <div className="aspect-square bg-gradient-to-tr from-ravr-purple/20 via-transparent to-ravr-coral/10 rounded-full blur-[100px] absolute inset-0 animate-pulse" />
                <div className="relative z-10 glass border-white/10 rounded-[3rem] p-4 shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                   <div className="bg-black rounded-[2.5rem] overflow-hidden aspect-[9/16] w-full max-w-[340px] mx-auto relative">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="w-20 h-20 rounded-full bg-ravr-coral/30 animate-ping" />
                      </div>
                      <div className="absolute bottom-10 left-6 right-6 space-y-3">
                         <div className="h-4 w-24 bg-ravr-coral rounded-full" />
                         <div className="h-3 w-40 bg-white/10 rounded-full" />
                         <div className="h-3 w-32 bg-white/10 rounded-full" />
                      </div>
                   </div>
                </div>
             </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 sm:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="font-bebas text-4xl tracking-[0.2em] text-white">
            R<span className="text-ravr-coral">A</span>VR
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[0.65rem] tracking-[0.3em] font-bold uppercase text-white/40">
             <Link href="/events" className="hover:text-ravr-coral transition-colors">Radar</Link>
             <Link href="/map" className="hover:text-ravr-coral transition-colors">Live Map</Link>
             <Link href="/create" className="hover:text-ravr-coral transition-colors">Host</Link>
             <Link href="#" className="hover:text-ravr-coral transition-colors">Terms</Link>
          </div>
          <div className="text-[0.6rem] text-white/20 tracking-[0.2em] uppercase font-mono">
             © 2026 RAVR. Built for the city.
          </div>
        </div>
      </footer>
    </div>
  );
}


