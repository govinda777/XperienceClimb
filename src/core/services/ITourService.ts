import { Tour, CreateTourRequest, UpdateTourRequest } from '../entities/Tour';
import { ThemeConfig } from '../../themes/types';

export interface ITourService {
  /**
   * Create a new tour
   */
  createTour(request: CreateTourRequest): Promise<Tour>;

  /**
   * Update an existing tour
   */
  updateTour(request: UpdateTourRequest): Promise<Tour>;

  /**
   * Get tour by ID
   */
  getTourById(id: string): Promise<Tour | null>;

  /**
   * Get all tours
   */
  getAllTours(): Promise<Tour[]>;

  /**
   * Get active tours only
   */
  getActiveTours(): Promise<Tour[]>;

  /**
   * Delete a tour (soft delete - sets isActive to false)
   */
  deleteTour(id: string): Promise<boolean>;

  /**
   * Generate theme configuration from tour data
   */
  generateThemeFromTour(tour: Tour): ThemeConfig;

  /**
   * Validate tour data
   */
  validateTourData(request: CreateTourRequest | UpdateTourRequest): Promise<ValidationResult>;

  /**
   * Check if tour name is unique
   */
  isTourNameUnique(name: string, excludeId?: string): Promise<boolean>;

  /**
   * Check if theme ID is unique
   */
  isThemeIdUnique(themeId: string, excludeId?: string): Promise<boolean>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
