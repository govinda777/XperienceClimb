'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { LoginButton } from '@/components/auth';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      // Hide navigation when scrolling down, show when scrolling up
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn(
      "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    )}>
      <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 px-4 py-2">
        <div className="flex items-center space-x-2">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200",
                "hover:bg-white/20 active:scale-95",
                activeSection === item.id 
                  ? "bg-climb-500 text-white shadow-lg" 
                  : "text-white hover:text-climb-100"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium hidden sm:inline">{item.label}</span>
            </button>
          ))}
          
          {/* Login Button */}
          <div className="border-l border-white/20 pl-2 ml-2">
            <LoginButton variant="outline" size="sm" />
          </div>
        </div>
      </div>
    </nav>
  );
}