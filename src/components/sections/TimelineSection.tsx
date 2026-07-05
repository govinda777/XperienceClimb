'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';

export function TimelineSection() {
  const { currentTheme } = useTheme();
  const { timeline } = currentTheme;

  return (
    <section id="timeline" className="py-20 bg-climb-600 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Como será o seu dia</h2>
          <p className="text-xl text-climb-100">Uma jornada planejada do nascer ao pôr do sol</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20 hidden md:block"></div>

          <div className="space-y-12">
            {timeline.map((event, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full border-4 border-climb-600 z-10 hidden md:block"></div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 px-8">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                    <div className="text-orange-400 font-bold text-xl mb-2">{event.time}</div>
                    <h3 className="text-2xl font-bold">{event.activity}</h3>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
