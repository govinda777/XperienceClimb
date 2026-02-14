'use client';

import React, { useState, useEffect } from 'react';
import { cn, openWhatsApp } from '@/lib/utils';
import { NAVIGATION_ITEMS, CONTACT_INFO } from '@/lib/constants';
import { LoginButton } from '@/components/auth';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  const handleNavClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  const getItemsByGroup = (groupKey: string) => {
    return NAVIGATION_ITEMS.filter(item => item.group === groupKey);
  };

  const renderDropdownMenu = (groupKey: string, groupLabel: string) => {
    const items = getItemsByGroup(groupKey);
    const isOpen = openDropdown === groupKey;

    return (
      <div className="relative dropdown-container" key={groupKey}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : groupKey)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium",
            "hover:bg-climb-500/10 hover:scale-105 active:scale-95",
            isOpen ? "bg-climb-500/10 text-climb-700" : "text-climb-600 hover:text-climb-700"
          )}
        >
          <span className="text-sm">{groupLabel}</span>
          <span className={cn(
            "text-xs transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}>▼</span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-lg rounded-xl border border-white/30 shadow-xl py-2 min-w-[200px] z-50">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "flex items-center space-x-2 w-full px-4 py-2.5 text-left transition-all duration-200",
                  "hover:bg-climb-500/10",
                  activeSection === item.id 
                    ? "bg-climb-500 text-white" 
                    : "text-climb-600 hover:text-climb-700"
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 hidden lg:block",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl px-6 py-3">
          <div className="flex items-center space-x-1">
            {/* Main Navigation Items (always visible) */}
            <div className="flex items-center space-x-1">
              {getItemsByGroup('main').map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium",
                    "hover:bg-climb-500/10 hover:scale-105 active:scale-95",
                    activeSection === item.id 
                      ? "bg-climb-500 text-white shadow-lg scale-105" 
                      : "text-climb-600 hover:text-climb-700"
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-climb-300 to-transparent mx-3"></div>
            
            {/* Grouped Navigation Items */}
            <div className="flex items-center space-x-1">
              {renderDropdownMenu('services', 'Serviços')}
              {renderDropdownMenu('content', 'Conteúdo')}
              {renderDropdownMenu('location', 'Local')}
            </div>
            
            {/* Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-climb-300 to-transparent mx-3"></div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* WhatsApp Button */}
              <button
                onClick={() => openWhatsApp(
                  CONTACT_INFO.phone,
                  'Olá! Gostaria de mais informações sobre a XperienceClimb 🏔️'
                )}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-105 active:scale-95 font-medium"
              >
                <span className="text-base">💬</span>
                <span className="text-sm">WhatsApp</span>
              </button>
              
              {/* Login Button */}
              <LoginButton variant="outline" size="sm" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={cn(
        "fixed top-4 left-4 right-4 z-50 transition-all duration-300 lg:hidden",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <span className="text-xl">🏔️</span>
              <span className="font-bold text-climb-600">XperienceClimb</span>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-climb-500 text-white hover:bg-climb-600 transition-colors"
            >
              <span className="text-sm font-medium">Menu</span>
              <span className={cn(
                "text-xs transition-transform duration-200",
                isMobileMenuOpen ? "rotate-180" : ""
              )}>▼</span>
            </button>
          </div>
          
          {/* Mobile Menu Items */}
          {isMobileMenuOpen && (
            <div className="mt-4 pt-4 border-t border-climb-200">
              {/* Main sections */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-climb-500 mb-2 px-2">PRINCIPAL</h4>
                <div className="grid grid-cols-3 gap-2">
                  {getItemsByGroup('main').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200",
                        "hover:bg-climb-500/10 active:scale-95",
                        activeSection === item.id 
                          ? "bg-climb-500 text-white shadow-md" 
                          : "text-climb-600 hover:text-climb-700"
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Services */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-climb-500 mb-2 px-2">SERVIÇOS</h4>
                <div className="grid grid-cols-3 gap-2">
                  {getItemsByGroup('services').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200",
                        "hover:bg-climb-500/10 active:scale-95",
                        activeSection === item.id 
                          ? "bg-climb-500 text-white shadow-md" 
                          : "text-climb-600 hover:text-climb-700"
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content and Location */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-climb-500 mb-2 px-2">CONTEÚDO & LOCAL</h4>
                <div className="grid grid-cols-2 gap-2">
                  {getItemsByGroup('content').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200",
                        "hover:bg-climb-500/10 active:scale-95",
                        activeSection === item.id 
                          ? "bg-climb-500 text-white shadow-md" 
                          : "text-climb-600 hover:text-climb-700"
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                  {getItemsByGroup('location').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200",
                        "hover:bg-climb-500/10 active:scale-95",
                        activeSection === item.id 
                          ? "bg-climb-500 text-white shadow-md" 
                          : "text-climb-600 hover:text-climb-700"
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    openWhatsApp(
                      CONTACT_INFO.phone,
                      'Olá! Gostaria de mais informações sobre a XperienceClimb 🏔️'
                    );
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
                >
                  <span>💬</span>
                  <span>Falar no WhatsApp</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <LoginButton variant="outline" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}