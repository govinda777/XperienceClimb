import { NextRequest, NextResponse } from 'next/server';
import { CreateTour } from '@/core/use-cases/tours/CreateTour';
import { GetAllTours } from '@/core/use-cases/tours/GetAllTours';
import { TourService } from '@/infrastructure/services/TourService';
import { TourRepository } from '@/infrastructure/repositories/TourRepository';

// Initialize dependencies
const tourRepository = TourRepository.getInstance();
const tourService = new TourService(tourRepository);
const createTourUseCase = new CreateTour(tourService);
const getAllToursUseCase = new GetAllTours(tourService);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') !== 'false';

    const result = await getAllToursUseCase.execute(activeOnly);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      tours: result.tours,
      count: result.tours.length
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await createTourUseCase.execute(body);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error,
          validationErrors: result.validationErrors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { tour: result.tour },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
