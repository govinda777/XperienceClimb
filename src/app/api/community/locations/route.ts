import { NextRequest, NextResponse } from 'next/server';
import { VISITED_LOCATIONS } from '@/lib/community-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const region = searchParams.get('region');
    const minPopularity = searchParams.get('minPopularity');
    const difficulty = searchParams.get('difficulty');
    const active = searchParams.get('active');

    let filteredLocations = VISITED_LOCATIONS;

    // Filter by state
    if (state) {
      filteredLocations = filteredLocations.filter(location => 
        location.state.toLowerCase() === state.toLowerCase()
      );
    }

    // Filter by region
    if (region) {
      filteredLocations = filteredLocations.filter(location => 
        location.region === region
      );
    }

    // Filter by minimum popularity
    if (minPopularity) {
      const popularity = parseInt(minPopularity);
      filteredLocations = filteredLocations.filter(location => 
        location.popularity >= popularity
      );
    }

    // Filter by access difficulty
    if (difficulty) {
      filteredLocations = filteredLocations.filter(location => 
        location.access.difficulty === difficulty
      );
    }

    // Filter by active status
    if (active !== null) {
      const isActive = active === 'true';
      filteredLocations = filteredLocations.filter(location => 
        location.isActive === isActive
      );
    }

    // Sort by popularity (highest first) and then by visit count
    filteredLocations.sort((a, b) => {
      if (b.popularity !== a.popularity) {
        return b.popularity - a.popularity;
      }
      return b.visitCount - a.visitCount;
    });

    return NextResponse.json({
      success: true,
      data: filteredLocations,
      total: filteredLocations.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch locations',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
