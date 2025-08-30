'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from './types';
import { fazendaIpanemaTheme, pedraBellaTheme } from './configs';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  'fazenda-ipanema': fazendaIpanemaTheme,
  'pedra-bela': pedraBellaTheme,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(fazendaIpanemaTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Check for theme in URL query parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const themeFromUrl = urlParams.get('theme');
        
        let selectedTheme: ThemeConfig | null = null;
        
        // Priority: URL param > localStorage > default
        if (themeFromUrl) {
          // First check if it's a static theme
          if (themes[themeFromUrl as keyof typeof themes]) {
            selectedTheme = themes[themeFromUrl as keyof typeof themes];
          } else {
            // Try to load dynamic theme from tour API
            try {
              const response = await fetch(`/api/tours/${themeFromUrl}/theme`);
              if (response.ok) {
                const data = await response.json();
                selectedTheme = data.theme;
              }
            } catch (error) {
              console.warn('Failed to load dynamic theme:', error);
            }
          }
          
          // Save to localStorage for future visits if theme was found
          if (selectedTheme) {
            localStorage.setItem('xperience-theme', themeFromUrl);
          }
        } else {
          // Fallback to saved theme from localStorage
          const savedTheme = localStorage.getItem('xperience-theme');
          if (savedTheme) {
            // Check static themes first
            if (themes[savedTheme as keyof typeof themes]) {
              selectedTheme = themes[savedTheme as keyof typeof themes];
            } else {
              // Try to load dynamic theme
              try {
                const response = await fetch(`/api/tours/${savedTheme}/theme`);
                if (response.ok) {
                  const data = await response.json();
                  selectedTheme = data.theme;
                }
              } catch (error) {
                console.warn('Failed to load saved dynamic theme:', error);
              }
            }
          }
        }
        
        if (selectedTheme) {
          setCurrentTheme(selectedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes[themeId as keyof typeof themes];
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('xperience-theme', themeId);
      
      // Update document title and meta tags
      document.title = theme.seo.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', theme.seo.description);
      }
      
      // Update og:title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', theme.seo.title);
      }
      
      // Update og:description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', theme.seo.description);
      }
      
      // Update og:image
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', theme.seo.ogImage);
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes: Object.values(themes),
        setTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
