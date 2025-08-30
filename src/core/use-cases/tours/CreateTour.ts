import { ITourService } from '../../services/ITourService';
import { CreateTourRequest, Tour } from '../../entities/Tour';

export interface CreateTourResult {
  success: boolean;
  tour?: Tour;
  error?: string;
  validationErrors?: string[];
}

export class CreateTour {
  constructor(private tourService: ITourService) {}

  async execute(request: CreateTourRequest): Promise<CreateTourResult> {
    try {
      // Validate the request
      const validation = await this.tourService.validateTourData(request);
      
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          validationErrors: validation.errors.map(e => e.message)
        };
      }

      // Create the tour
      const tour = await this.tourService.createTour(request);

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
