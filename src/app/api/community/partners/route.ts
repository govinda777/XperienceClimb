import { NextRequest, NextResponse } from 'next/server';
import { PARTNERS } from '@/lib/community-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const active = searchParams.get('active');

    let filteredPartners = PARTNERS;

    // Filter by category
    if (category) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.category === category
      );
    }

    // Filter by state
    if (state) {
      filteredPartners = filteredPartners.filter(partner => 
        partner.location.state.toLowerCase() === state.toLowerCase()
      );
    }

    // Filter by active status
    if (active !== null) {
      const isActive = active === 'true';
      filteredPartners = filteredPartners.filter(partner => 
        partner.isActive === isActive
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredPartners,
      total: filteredPartners.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch partners',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
