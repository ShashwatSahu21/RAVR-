'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Zap, PlusSquare, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Radar', href: '/events', icon: <Zap className="w-4 h-4" /> },
    { name: 'Map', href: '/map', icon: <Map className="w-4 h-4" /> },
    { name: 'Create', href: '/create', icon: <PlusSquare className="w-4 h-4" /> },
    { name: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl px-2 py-2 flex justify-between items-center glass rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Logo */}
      <Link href="/" className="pl-4 font-bebas text-2xl tracking-[0.2em] text-white hover:text-ravr-coral transition-colors select-none">
        R<span className="text-ravr-coral">A</span>VR
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-1 pr-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-5 py-2.5 rounded-full text-[0.6rem] tracking-[0.2em] uppercase font-bold flex items-center gap-2 transition-colors duration-300 ${
                isActive ? 'text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-ravr-coral rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden pr-4 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-[calc(100%+12px)] left-0 right-0 glass rounded-3xl p-6 md:hidden flex flex-col gap-4 border border-white/10"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-6 py-4 rounded-xl text-sm tracking-[0.2em] uppercase font-bold transition-all ${
                  pathname === item.href ? 'bg-ravr-coral text-black' : 'bg-white/5 text-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                {pathname === item.href && <Zap className="w-4 h-4 fill-black" />}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


