import { NextRequest, NextResponse } from 'next/server';
import { PACKAGES } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Convert packages object to array format for easier consumption
    const packagesArray = Object.values(PACKAGES).map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price / 100, // Convert from cents to reais
      originalPrice: pkg.originalPrice ? pkg.originalPrice / 100 : undefined, // Convert from cents to reais
      description: pkg.description,
      features: pkg.features,
      bonus: pkg.bonus || [], // Include bonus field
      shape: pkg.shape,
      color: pkg.color,
      duration: pkg.duration,
      maxParticipants: pkg.maxParticipants,
      popular: pkg.popular || false
    }));

    return NextResponse.json({
      success: true,
      data: packagesArray,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch packages' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // For future use - e.g., checking availability
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}