import { NextRequest, NextResponse } from 'next/server';
import { COMMUNITY_DATA } from '@/lib/community-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const category = searchParams.get('category');

    let data = COMMUNITY_DATA;

    // Filter by type
    if (type) {
      switch (type) {
        case 'partners':
          data = {
            ...data,
            partners: data.partners,
            instructors: [],
            safetyProcedures: [],
            visitedLocations: []
          };
          break;
        case 'instructors':
          data = {
            ...data,
            partners: [],
            instructors: data.instructors,
            safetyProcedures: [],
            visitedLocations: []
          };
          break;
        case 'safety':
          data = {
            ...data,
            partners: [],
            instructors: [],
            safetyProcedures: data.safetyProcedures,
            visitedLocations: []
          };
          break;
        case 'locations':
          data = {
            ...data,
            partners: [],
            instructors: [],
            safetyProcedures: [],
            visitedLocations: data.visitedLocations
          };
          break;
      }
    }

    // Filter by state
    if (state) {
      data = {
        ...data,
        instructors: data.instructors.filter(instructor => 
          instructor.location.state.toLowerCase() === state.toLowerCase()
        ),
        visitedLocations: data.visitedLocations.filter(location => 
          location.state.toLowerCase() === state.toLowerCase()
        ),
        partners: data.partners.filter(partner => 
          partner.location.state.toLowerCase() === state.toLowerCase()
        )
      };
    }

    // Filter by category (for partners)
    if (category && type === 'partners') {
      data = {
        ...data,
        partners: data.partners.filter(partner => 
          partner.category === category
        )
      };
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching community data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch community data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST endpoint for adding new community data (future admin functionality)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // This would typically interact with a database
    // For now, we'll return a success response
    console.log(`Adding new ${type}:`, data);

    return NextResponse.json({
      success: true,
      message: `${type} data received successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error adding community data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add community data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
