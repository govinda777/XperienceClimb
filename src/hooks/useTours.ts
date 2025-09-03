'use client';

import { useState, useEffect } from 'react';
import { Tour } from '@/core/entities/Tour';

interface UseToursResult {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  getTourById: (id: string) => Tour | undefined;
  getToursByThemeId: (themeId: string) => Tour[];
  refreshTours: () => Promise<void>;
}

export function useTours(): UseToursResult {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/tours?active=true');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tours: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTours(data.tours || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tours';
      setError(errorMessage);
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getTourById = (id: string): Tour | undefined => {
    return tours.find(tour => tour.id === id);
  };

  const getToursByThemeId = (themeId: string): Tour[] => {
    return tours.filter(tour => tour.themeId === themeId);
  };

  const refreshTours = async () => {
    await fetchTours();
  };

  return {
    tours,
    loading,
    error,
    getTourById,
    getToursByThemeId,
    refreshTours,
  };
}
