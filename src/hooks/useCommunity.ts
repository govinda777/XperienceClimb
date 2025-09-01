'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  CommunityData, 
  Partner, 
  CertifiedInstructor, 
  SafetyProcedure, 
  VisitedLocation 
} from '@/core/entities/Community';

interface UseCommunityOptions {
  type?: 'partners' | 'instructors' | 'safety' | 'locations';
  state?: string;
  category?: string;
  autoFetch?: boolean;
}

interface UseCommunityReturn {
  data: CommunityData | null;
  partners: Partner[];
  instructors: CertifiedInstructor[];
  safetyProcedures: SafetyProcedure[];
  visitedLocations: VisitedLocation[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  fetchPartners: (filters?: { category?: string; state?: string; active?: boolean }) => Promise<Partner[]>;
  fetchInstructors: (filters?: { state?: string; specialty?: string; available?: boolean; minRating?: number }) => Promise<CertifiedInstructor[]>;
  fetchLocations: (filters?: { state?: string; region?: string; minPopularity?: number; difficulty?: string; active?: boolean }) => Promise<VisitedLocation[]>;
  fetchSafetyProcedures: (filters?: { category?: string; priority?: string; active?: boolean }) => Promise<SafetyProcedure[]>;
}

export function useCommunity(options: UseCommunityOptions = {}): UseCommunityReturn {
  const { type, state, category, autoFetch = true } = options;
  
  const [data, setData] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (state) params.append('state', state);
      if (category) params.append('category', category);

      const response = await fetch(`/api/community?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch community data');
      }

      setData(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching community data:', err);
    } finally {
      setLoading(false);
    }
  }, [type, state, category]);

  const fetchPartners = async (filters: { category?: string; state?: string; active?: boolean } = {}): Promise<Partner[]> => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.state) params.append('state', filters.state);
      if (filters.active !== undefined) params.append('active', filters.active.toString());

      const response = await fetch(`/api/community/partners?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch partners');
      }

      return result.data;
    } catch (err) {
      console.error('Error fetching partners:', err);
      throw err;
    }
  };

  const fetchInstructors = async (filters: { 
    state?: string; 
    specialty?: string; 
    available?: boolean; 
    minRating?: number 
  } = {}): Promise<CertifiedInstructor[]> => {
    try {
      const params = new URLSearchParams();
      if (filters.state) params.append('state', filters.state);
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.available !== undefined) params.append('available', filters.available.toString());
      if (filters.minRating !== undefined) params.append('minRating', filters.minRating.toString());

      const response = await fetch(`/api/community/instructors?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch instructors');
      }

      return result.data;
    } catch (err) {
      console.error('Error fetching instructors:', err);
      throw err;
    }
  };

  const fetchLocations = async (filters: { 
    state?: string; 
    region?: string; 
    minPopularity?: number; 
    difficulty?: string; 
    active?: boolean 
  } = {}): Promise<VisitedLocation[]> => {
    try {
      const params = new URLSearchParams();
      if (filters.state) params.append('state', filters.state);
      if (filters.region) params.append('region', filters.region);
      if (filters.minPopularity !== undefined) params.append('minPopularity', filters.minPopularity.toString());
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.active !== undefined) params.append('active', filters.active.toString());

      const response = await fetch(`/api/community/locations?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch locations');
      }

      return result.data;
    } catch (err) {
      console.error('Error fetching locations:', err);
      throw err;
    }
  };

  const fetchSafetyProcedures = async (filters: { 
    category?: string; 
    priority?: string; 
    active?: boolean 
  } = {}): Promise<SafetyProcedure[]> => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.active !== undefined) params.append('active', filters.active.toString());

      const response = await fetch(`/api/community/safety?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch safety procedures');
      }

      return result.data;
    } catch (err) {
      console.error('Error fetching safety procedures:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchCommunityData();
    }
  }, [type, state, category, autoFetch, fetchCommunityData]);

  return {
    data,
    partners: data?.partners || [],
    instructors: data?.instructors || [],
    safetyProcedures: data?.safetyProcedures || [],
    visitedLocations: data?.visitedLocations || [],
    loading,
    error,
    refetch: fetchCommunityData,
    fetchPartners,
    fetchInstructors,
    fetchLocations,
    fetchSafetyProcedures
  };
}
