import { ITourService } from '../../services/ITourService';
import { Tour } from '../../entities/Tour';

export interface GetAllToursResult {
  success: boolean;
  tours: Tour[];
  error?: string;
}

export class GetAllTours {
  constructor(private tourService: ITourService) {}

  async execute(activeOnly: boolean = true): Promise<GetAllToursResult> {
    try {
      const tours = activeOnly 
        ? await this.tourService.getActiveTours()
        : await this.tourService.getAllTours();

      return {
        success: true,
        tours
      };
    } catch (error) {
      return {
        success: false,
        tours: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
