import { NextResponse } from 'next/server';
import { getContentRepository } from '@/infrastructure/repositories/ContentRepositoryFactory';

export async function GET(_request: Request) {
  try {
    const repository = getContentRepository();
    const publishedPackages = await repository.listPublishedPackages();

    const mappedPackages = publishedPackages.map((pkg: any) => {
      const priceAmount = typeof pkg.price === 'number' ? pkg.price : pkg.price?.amount || 0;
      return {
        id: pkg.id,
        name: pkg.name,
        price: priceAmount / 100, // Convert cents to reais
        originalPrice: pkg.originalPrice ? pkg.originalPrice / 100 : undefined,
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
