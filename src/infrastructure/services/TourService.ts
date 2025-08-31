import { ITourService, ValidationResult, ValidationError } from '../../core/services/ITourService';
import { Tour, CreateTourRequest, UpdateTourRequest } from '../../core/entities/Tour';
import { ThemeConfig } from '../../themes/types';
import { ITourRepository } from '../../core/repositories/ITourRepository';

export class TourService implements ITourService {
  constructor(private tourRepository: ITourRepository) {}

  async createTour(request: CreateTourRequest): Promise<Tour> {
    // Validate the request
    const validation = await this.validateTourData(request);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }

    // Check uniqueness
    const isNameUnique = await this.isTourNameUnique(request.name);
    if (!isNameUnique) {
      throw new Error('Tour name must be unique');
    }

    const isThemeUnique = await this.isThemeIdUnique(request.themeId);
    if (!isThemeUnique) {
      throw new Error('Theme ID must be unique');
    }

    // Generate tour ID from name
    const tourId = this.generateTourId(request.name);

    // Process directions to add step numbers
    const processedDirections = request.location.directions?.map((direction, index) => ({
      ...direction,
      step: index + 1
    })) || [];

    // Process activities to add IDs
    const processedActivities = request.activities.map((activity, index) => ({
      ...activity,
      id: this.generateActivityId(activity.name, index)
    }));

    // Process gallery images to add IDs and order
    const processedImages = request.gallery?.images?.map((image, index) => ({
      ...image,
      id: this.generateImageId(image.title || image.alt, index),
      order: index + 1
    })) || [];

    // Create the tour object
    const tour: Tour = {
      id: tourId,
      name: request.name,
      themeId: request.themeId,
      location: {
        ...request.location,
        directions: processedDirections
      },
      description: request.description,
      activities: processedActivities,
      logistics: request.logistics,
      pricing: request.pricing,
      availability: {
        available: true,
        weatherDependent: false,
        restrictions: []
      },
      gallery: {
        images: processedImages,
        videos: [],
        categories: request.gallery?.categories || { all: 'All' }
      },
      seo: request.seo,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    // Save to repository
    return await this.tourRepository.create(tour);
  }

  async updateTour(request: UpdateTourRequest): Promise<Tour> {
    const existingTour = await this.tourRepository.findById(request.id);
    if (!existingTour) {
      throw new Error('Tour not found');
    }

    // Validate the request
    const validation = await this.validateTourData(request);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
    }

    // Check uniqueness if name or themeId changed
    if (request.name && request.name !== existingTour.name) {
      const isNameUnique = await this.isTourNameUnique(request.name, request.id);
      if (!isNameUnique) {
        throw new Error('Tour name must be unique');
      }
    }

    if (request.themeId && request.themeId !== existingTour.themeId) {
      const isThemeUnique = await this.isThemeIdUnique(request.themeId, request.id);
      if (!isThemeUnique) {
        throw new Error('Theme ID must be unique');
      }
    }

    // Process updates similar to create
    const updatedTour: Tour = {
      ...existingTour,
      ...request,
      updatedAt: new Date(),
      location: {
        ...existingTour.location,
        ...request.location,
        directions: request.location?.directions 
          ? request.location.directions.map((direction, index) => ({
              ...direction,
              step: index + 1
            }))
          : existingTour.location.directions || []
      },
      activities: request.activities 
        ? request.activities.map((activity, index) => ({
            ...activity,
            id: (activity as any).id || this.generateActivityId(activity.name, index)
          }))
        : existingTour.activities,
      gallery: {
        ...existingTour.gallery,
        ...request.gallery,
        images: request.gallery?.images 
          ? request.gallery.images.map((image, index) => ({
              ...image,
              id: image.id || this.generateImageId(image.title || image.alt, index),
              order: index + 1
            }))
          : existingTour.gallery.images
      }
    };

 



    return await this.tourRepository.update(updatedTour);
  }

  async getTourById(id: string): Promise<Tour | null> {
    return await this.tourRepository.findById(id);
  }

  async getAllTours(): Promise<Tour[]> {
    return await this.tourRepository.findAll();
  }

  async getActiveTours(): Promise<Tour[]> {
    return await this.tourRepository.findByActive(true);
  }

  async deleteTour(id: string): Promise<boolean> {
    const tour = await this.tourRepository.findById(id);
    if (!tour) {
      return false;
    }

    tour.isActive = false;
    tour.updatedAt = new Date();
    
    await this.tourRepository.update(tour);
    return true;
  }

  generateThemeFromTour(tour: Tour): ThemeConfig {
    return {
      id: tour.themeId,
      name: tour.name,
      location: {
        name: tour.location.name,
        address: tour.location.address,
        city: tour.location.city,
        state: tour.location.state,
        distance: tour.location.distance || `Distance from ${tour.location.city}`,
        coordinates: tour.location.coordinates,
        mapsUrl: tour.location.mapsUrl || '',
        directions: tour.location.directions
      },
      content: {
        hero: {
          title: tour.seo.title,
          subtitle: tour.description,
          description: tour.description
        },
        about: {
          title: `About ${tour.name}`,
          description: tour.description,
          highlights: tour.activities.slice(0, 3).map(activity => ({
            icon: activity.icon,
            title: activity.name,
            description: activity.description
          })),
          infoBox: {
            title: `About ${tour.location.name}`,
            content: tour.description
          }
        }
      },
      gallery: {
        images: tour.gallery.images.map(image => ({
          src: image.src,
          alt: image.alt,
          title: image.title,
          category: image.category
        })),
        categories: tour.gallery.categories
      },
      activities: tour.activities.map(activity => ({
        id: activity.id,
        name: activity.name,
        description: activity.description,
        icon: activity.icon,
        difficulty: activity.difficulty,
        duration: activity.duration,
        price: activity.price
      })),
      logistics: {
        schedule: tour.logistics.schedule,
        meetingPoint: tour.logistics.meetingPoint,
        importantNotes: tour.logistics.importantNotes,
        tips: tour.logistics.tips
      },
      seo: tour.seo
    };
  }

  async validateTourData(request: CreateTourRequest | UpdateTourRequest): Promise<ValidationResult> {
    const errors: ValidationError[] = [];

    // Validate required fields for create requests
    if ('name' in request && !request.name?.trim()) {
      errors.push({
        field: 'name',
        message: 'Tour name is required',
        code: 'REQUIRED'
      });
    }

    if ('themeId' in request && !request.themeId?.trim()) {
      errors.push({
        field: 'themeId',
        message: 'Theme ID is required',
        code: 'REQUIRED'
      });
    }

    if ('description' in request && !request.description?.trim()) {
      errors.push({
        field: 'description',
        message: 'Tour description is required',
        code: 'REQUIRED'
      });
    }

    // Validate theme ID format (kebab-case)
    if ('themeId' in request && request.themeId) {
      const themeIdRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
      if (!themeIdRegex.test(request.themeId)) {
        errors.push({
          field: 'themeId',
          message: 'Theme ID must be in kebab-case format (e.g., "pedra-grande")',
          code: 'INVALID_FORMAT'
        });
      }
    }

    // Validate coordinates
    if ('location' in request && request.location) {
      const { coordinates } = request.location;
      if (coordinates) {
        if (typeof coordinates.lat !== 'number' || coordinates.lat < -90 || coordinates.lat > 90) {
          errors.push({
            field: 'location.coordinates.lat',
            message: 'Latitude must be a number between -90 and 90',
            code: 'INVALID_RANGE'
          });
        }

        if (typeof coordinates.lng !== 'number' || coordinates.lng < -180 || coordinates.lng > 180) {
          errors.push({
            field: 'location.coordinates.lng',
            message: 'Longitude must be a number between -180 and 180',
            code: 'INVALID_RANGE'
          });
        }
      }
    }

    // Validate pricing
    if ('pricing' in request && request.pricing) {
      if (request.pricing.basePrice <= 0) {
        errors.push({
          field: 'pricing.basePrice',
          message: 'Base price must be greater than 0',
          code: 'INVALID_RANGE'
        });
      }
    }

    // Validate logistics
    if ('logistics' in request && request.logistics) {
      if (request.logistics.groupSize) {
        if (request.logistics.groupSize.min < 1) {
          errors.push({
            field: 'logistics.groupSize.min',
            message: 'Minimum group size must be at least 1',
            code: 'INVALID_RANGE'
          });
        }

        if (request.logistics.groupSize.max < request.logistics.groupSize.min) {
          errors.push({
            field: 'logistics.groupSize.max',
            message: 'Maximum group size must be greater than or equal to minimum',
            code: 'INVALID_RANGE'
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async isTourNameUnique(name: string, excludeId?: string): Promise<boolean> {
    const tours = await this.tourRepository.findByName(name);
    if (tours.length === 0) return true;
    if (excludeId) return tours.every(tour => tour.id === excludeId);
    return false;
  }

  async isThemeIdUnique(themeId: string, excludeId?: string): Promise<boolean> {
    const tours = await this.tourRepository.findByThemeId(themeId);
    return tours.length === 0 || (excludeId && tours.every(tour => tour.id === excludeId));
  }

  private generateTourId(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  private generateActivityId(name: string, index: number): string {
    const baseId = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    return `${baseId}-${index + 1}`;
  }

  private generateImageId(title: string, index: number): string {
    const baseId = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    return `img-${baseId}-${index + 1}`;
  }
}
