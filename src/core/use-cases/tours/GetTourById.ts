import { ITourService } from '../../services/ITourService';
import { Tour } from '../../entities/Tour';

export interface GetTourByIdResult {
  success: boolean;
  tour?: Tour;
  error?: string;
}

export class GetTourById {
  constructor(private tourService: ITourService) {}

  async execute(id: string): Promise<GetTourByIdResult> {
    try {
      if (!id || id.trim() === '') {
        return {
          success: false,
          error: 'Tour ID is required'
        };
      }

      const tour = await this.tourService.getTourById(id);

      if (!tour) {
        return {
          success: false,
          error: 'Tour not found'
        };
      }

      return {
        success: true,
        tour
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
