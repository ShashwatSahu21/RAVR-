'use client';

import React from 'react';

const ITEMS = [
  'Concerts', 'Open Mics', 'Underground', 'College Fests', 
  'Nightlife', 'Pop-up Markets', 'Tech Meetups', 'Art Shows'
];

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-ravr-coral py-3.5 relative select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-5 px-10 text-ravr-black font-bebas text-lg tracking-[0.15em] uppercase">
                {item}
                <span className="w-1.5 h-1.5 bg-ravr-black rounded-full opacity-40 shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
