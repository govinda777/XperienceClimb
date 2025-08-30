import { NextRequest, NextResponse } from 'next/server';
import { GetTourById } from '@/core/use-cases/tours/GetTourById';
import { TourService } from '@/infrastructure/services/TourService';
import { TourRepository } from '@/infrastructure/repositories/TourRepository';

// Initialize dependencies
const tourRepository = TourRepository.getInstance();
const tourService = new TourService(tourRepository);
const getTourByIdUseCase = new GetTourById(tourService);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getTourByIdUseCase.execute(params.id);

    if (!result.success) {
      const status = result.error === 'Tour not found' ? 404 : 500;
      return NextResponse.json(
        { error: result.error },
        { status }
      );
    }

    return NextResponse.json({ tour: result.tour });
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
