'use client';

import { motion } from 'framer-motion';
import { Zap, Map as MapIcon, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import HeatmapBackground from '@/components/HeatmapBackground';
import Marquee from '@/components/Marquee';

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
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-10 overflow-hidden">
        <HeatmapBackground />
        
        <div className="relative z-10 max-w-6xl w-full pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase text-ravr-coral border border-ravr-coral/20 px-6 py-2.5 rounded-full mb-10 glass shadow-[0_0_30px_rgba(255,61,90,0.1)]"
          >
            <Zap className="w-3.5 h-3.5 fill-ravr-coral" />
            Live in Bangalore · Now Trending
          </motion.div>

          <h1 className="font-bebas text-[clamp(4.5rem,16vw,16rem)] leading-[0.82] select-none">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="block"
            >
              CATCH
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="block text-stroke-coral text-transparent"
            >
              THE VIBE
            </motion.span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm font-medium"
            >
              A real-time cultural radar for the city. From secret warehouse sets to rooftop jazz, see what&apos;s actually happening right now.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <Link href="/events" className="group relative bg-white text-black font-bebas text-2xl px-10 py-5 rounded-full transition-all hover:bg-ravr-coral hover:text-white hover:-translate-y-2 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                   Explore Tonight <ArrowUpRight className="w-6 h-6" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Decals */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-64 h-64 border border-white/5 rounded-full opacity-20 pointer-events-none"
        />
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
          {[
            { tag: 'Nightlife', title: 'Midnight Frequencies', vibe: 94, loc: 'Subterranean', time: '10PM', color: 'from-[#1a0030] to-ravr-purple' },
            { tag: 'Underground', title: 'Brick Lane Cypher', vibe: 89, loc: 'The Vault', time: '11PM', color: 'from-[#001a14] to-ravr-teal' },
            { tag: 'Tech', title: 'Hacker House Pop-up', vibe: 82, loc: 'Wired Studios', time: 'Now', color: 'from-[#1a1000] to-ravr-yellow' }
          ].map((card, i) => (
            <Reveal key={i}>
              <div className="group cursor-pointer">
                <div className={`aspect-[4/5] bg-gradient-to-br ${card.color} rounded-3xl overflow-hidden relative mb-6 shadow-2xl transition-transform duration-500 group-hover:-translate-y-4`}>
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                   <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-[0.6rem] font-bold tracking-widest uppercase">
                     {card.tag}
                   </div>
                   <div className="absolute bottom-8 left-8 right-8">
                     <h3 className="font-syne font-extrabold text-2xl text-white mb-2 leading-tight">{card.title}</h3>
                     <div className="flex items-center gap-4 text-[0.65rem] text-white/60 font-mono uppercase">
                        <span>{card.loc}</span>
                        <span>{card.time}</span>
                     </div>
                   </div>
                   <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center font-bebas text-lg text-ravr-coral shadow-2xl">
                     {card.vibe}
                   </div>
                </div>
              </div>
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


