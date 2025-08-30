import { ITourService } from '../../services/ITourService';
import { ThemeConfig } from '../../../themes/types';

export interface GenerateThemeResult {
  success: boolean;
  theme?: ThemeConfig;
  error?: string;
}

export class GenerateThemeFromTour {
  constructor(private tourService: ITourService) {}

  async execute(tourId: string): Promise<GenerateThemeResult> {
    try {
      if (!tourId || tourId.trim() === '') {
        return {
          success: false,
          error: 'Tour ID is required'
        };
      }

      const tour = await this.tourService.getTourById(tourId);

      if (!tour) {
        return {
          success: false,
          error: 'Tour not found'
        };
      }

      const theme = this.tourService.generateThemeFromTour(tour);

      return {
        success: true,
        theme
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
