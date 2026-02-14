import { NextResponse } from 'next/server';
import { PACKAGES } from '@/lib/constants';

export async function GET() {
  try {
    const packages = Object.values(PACKAGES).map(pkg => ({
      ...pkg,
      price: pkg.price / 100, // Convert cents to reais
      originalPrice: pkg.originalPrice ? pkg.originalPrice / 100 : undefined,
    }));

    return NextResponse.json({
      success: true,
      data: packages
    });
  } catch (error) {
    console.error('Error serving packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
