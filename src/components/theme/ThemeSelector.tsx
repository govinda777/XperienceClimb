'use client';

import React, { useState } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { currentTheme, availableThemes, setTheme, isLoading } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Show loading state with fallback to prevent infinite loading
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-400 border-t-transparent"></div>
        <span className="text-sm text-neutral-600">
          {currentTheme?.name ? currentTheme.name : 'Carregando...'}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border-climb-400/30 text-climb-600 hover:bg-climb-50 font-medium"
      >
        <span className="text-base">🏔️</span>
        <span className="text-sm">{currentTheme.name}</span>
        <span className={cn(
          "text-xs transition-transform duration-200",
          isOpen ? "rotate-180" : ""
        )}>▼</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-neutral-200 bg-white shadow-lg">
            <div className="p-3">
              <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                Escolha o Destino
              </h3>
              
              <div className="space-y-2">
                {availableThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full rounded-lg border p-3 text-left transition-all hover:shadow-md ${
                      currentTheme.id === theme.id
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-orange-200 hover:bg-orange-25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-xs text-neutral-500">
                          {theme.location.city}, {theme.location.state}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {theme.location.distance}
                        </div>
                      </div>
                      {currentTheme.id === theme.id && (
                        <div className="text-orange-500">
                          <span className="text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-3 border-t border-neutral-200 pt-3">
                <p className="text-xs text-neutral-500">
                  A mudança de tema altera todo o conteúdo do site para o destino selecionado.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
