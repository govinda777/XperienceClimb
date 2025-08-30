import { Tour } from '../entities/Tour';

export interface ITourRepository {
  /**
   * Create a new tour
   */
  create(tour: Tour): Promise<Tour>;

  /**
   * Update an existing tour
   */
  update(tour: Tour): Promise<Tour>;

  /**
   * Find tour by ID
   */
  findById(id: string): Promise<Tour | null>;

  /**
   * Find all tours
   */
  findAll(): Promise<Tour[]>;

  /**
   * Find tours by active status
   */
  findByActive(isActive: boolean): Promise<Tour[]>;

  /**
   * Find tours by name (for uniqueness check)
   */
  findByName(name: string): Promise<Tour[]>;

  /**
   * Find tours by theme ID (for uniqueness check)
   */
  findByThemeId(themeId: string): Promise<Tour[]>;

  /**
   * Delete a tour (hard delete)
   */
  delete(id: string): Promise<boolean>;

  /**
   * Check if tour exists
   */
  exists(id: string): Promise<boolean>;
}
