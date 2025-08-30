import { NextRequest, NextResponse } from 'next/server';
import { GenerateThemeFromTour } from '@/core/use-cases/tours/GenerateThemeFromTour';
import { TourService } from '@/infrastructure/services/TourService';
import { TourRepository } from '@/infrastructure/repositories/TourRepository';

// Initialize dependencies
const tourRepository = TourRepository.getInstance();
const tourService = new TourService(tourRepository);
const generateThemeUseCase = new GenerateThemeFromTour(tourService);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await generateThemeUseCase.execute(params.id);

    if (!result.success) {
      const status = result.error === 'Tour not found' ? 404 : 500;
      return NextResponse.json(
        { error: result.error },
        { status }
      );
    }

    return NextResponse.json({ theme: result.theme });
  } catch (error) {
    console.error('Error generating theme:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
