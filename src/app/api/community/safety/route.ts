import { NextRequest, NextResponse } from 'next/server';
import { SAFETY_PROCEDURES } from '@/lib/community-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const active = searchParams.get('active');

    let filteredProcedures = SAFETY_PROCEDURES;

    // Filter by category
    if (category) {
      filteredProcedures = filteredProcedures.filter(procedure => 
        procedure.category === category
      );
    }

    // Filter by priority
    if (priority) {
      filteredProcedures = filteredProcedures.filter(procedure => 
        procedure.priority === priority
      );
    }

    // Filter by active status
    if (active !== null) {
      const isActive = active === 'true';
      filteredProcedures = filteredProcedures.filter(procedure => 
        procedure.isActive === isActive
      );
    }

    // Sort by priority (critical first) and then by last updated
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    filteredProcedures.sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });

    return NextResponse.json({
      success: true,
      data: filteredProcedures,
      total: filteredProcedures.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching safety procedures:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch safety procedures',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
