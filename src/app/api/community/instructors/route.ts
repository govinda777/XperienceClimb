import { NextRequest, NextResponse } from 'next/server';
import { CERTIFIED_INSTRUCTORS } from '@/lib/community-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const specialty = searchParams.get('specialty');
    const available = searchParams.get('available');
    const minRating = searchParams.get('minRating');

    let filteredInstructors = CERTIFIED_INSTRUCTORS;

    // Filter by state
    if (state) {
      filteredInstructors = filteredInstructors.filter(instructor => 
        instructor.location.state.toLowerCase() === state.toLowerCase()
      );
    }

    // Filter by specialty
    if (specialty) {
      filteredInstructors = filteredInstructors.filter(instructor => 
        instructor.specialties.includes(specialty as any)
      );
    }

    // Filter by availability
    if (available !== null) {
      const isAvailable = available === 'true';
      filteredInstructors = filteredInstructors.filter(instructor => 
        instructor.availability.isActive === isAvailable
      );
    }

    // Filter by minimum rating
    if (minRating) {
      const rating = parseFloat(minRating);
      filteredInstructors = filteredInstructors.filter(instructor => 
        instructor.rating.average >= rating
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredInstructors,
      total: filteredInstructors.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching instructors:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch instructors',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
