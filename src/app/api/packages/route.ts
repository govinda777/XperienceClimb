import { NextResponse } from 'next/server';
import { PACKAGES } from '@/lib/constants';

export async function GET(_request: Request) {
  try {
    const packages = Object.values(PACKAGES);

    if (!packages || !Array.isArray(packages)) {
      throw new Error('Invalid packages data');
    }

    const mappedPackages = packages.map((pkg: any) => {
      const mapped: any = {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price / 100, // Convert cents to reais
        description: pkg.description,
        features: pkg.features || [],
        shape: pkg.shape || 'hexagon',
        color: pkg.color || 'climb-300',
        duration: pkg.duration || '1 dia',
        maxParticipants: pkg.maxParticipants || 8,
        popular: pkg.popular || false,
        disabled: pkg.disabled || false,
        requiresExperience: pkg.requiresExperience || false,
        minAge: pkg.minAge || 12,
        cancellationPolicy: pkg.cancellationPolicy || '',
      };

      if (pkg.originalPrice !== undefined) {
        mapped.originalPrice = pkg.originalPrice / 100; // Convert cents to reais
      }

      if (pkg.bonus !== undefined) {
        mapped.bonus = pkg.bonus;
      }

      return mapped;
    });

    return NextResponse.json({
      success: true,
      data: mappedPackages,
    });
  } catch (error) {
    console.error('Error serving packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
