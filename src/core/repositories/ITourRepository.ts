import { Tour } from '../entities/Tour';

export interface ITourRepository {
  /**
   * Create a new tour
   */
  create(_tour: Tour): Promise<Tour>;

  /**
   * Update an existing tour
   */
  update(_tour: Tour): Promise<Tour>;

  /**
   * Find tour by ID
   */
  findById(_id: string): Promise<Tour | null>;

  /**
   * Find all tours
   */
  findAll(): Promise<Tour[]>;

  /**
   * Find tours by active status
   */
  findByActive(_isActive: boolean): Promise<Tour[]>;

  /**
   * Find tours by name (for uniqueness check)
   */
  findByName(_name: string): Promise<Tour[]>;

  /**
   * Find tours by theme ID (for uniqueness check)
   */
  findByThemeId(_themeId: string): Promise<Tour[]>;

  /**
   * Delete a tour (hard delete)
   */
  delete(_id: string): Promise<boolean>;

  /**
   * Check if tour exists
   */
  exists(_id: string): Promise<boolean>;
}
