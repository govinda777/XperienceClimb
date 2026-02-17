import { TourService } from '../TourService';
import { ITourRepository } from '@/core/repositories/ITourRepository';
import { Tour, CreateTourRequest, UpdateTourRequest } from '@/core/entities/Tour';

// Mock repository
const mockTourRepository: jest.Mocked<ITourRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByActive: jest.fn(),
  findByName: jest.fn(),
  findByThemeId: jest.fn(),
  exists: jest.fn(),
  delete: jest.fn(),
};

describe('TourService', () => {
  let tourService: TourService;

  beforeEach(() => {
    jest.clearAllMocks();
    tourService = new TourService(mockTourRepository);
  });

  describe('createTour', () => {
    const mockCreateRequest: CreateTourRequest = {
      name: 'Pedra Grande Adventure',
      themeId: 'pedra-grande',
      description: 'Amazing climbing experience',
      location: {
        name: 'Pedra Grande',
        address: 'Atibaia, SP',
        city: 'Atibaia',
        state: 'SP',
        country: 'Brazil',
        coordinates: { lat: -23.1234, lng: -46.5678 },
        mapsUrl: 'https://maps.google.com/test',
        directions: [{ title: 'Departure', description: 'Take highway BR-381' }],
      },
      activities: [
        {
          name: 'Rock Climbing',
          description: 'Climb the main rock face',
          icon: '🧗‍♂️',
          difficulty: 'medium',
          duration: '4 hours',
          price: 150,
          included: true,
        },
      ],
      logistics: {
        schedule: {
          openTime: '08:00',
          closeTime: '18:00',
        },
        meetingPoint: 'Central Station',
        duration: '10 hours',
        groupSize: { min: 4, max: 12 },
        importantNotes: ['Bring water', 'Wear appropriate shoes'],
        tips: ['Check weather conditions'],
        requirements: [],
        included: [],
        notIncluded: [],
      },
      pricing: {
        basePrice: 150,
        currency: 'BRL',
        cancellationPolicy: 'flexible',
        seasonalPricing: [],
        groupDiscounts: [],
      },
      gallery: {
        images: [
          {
            src: '/images/pedra1.jpg',
            alt: 'Pedra Grande view',
            title: 'Main View',
            category: 'landscape',
          },
        ],
        categories: { landscape: 'Landscape', action: 'Action' },
      },
      seo: {
        title: 'Pedra Grande Climbing Tour',
        description: 'Experience the best climbing in Atibaia',
        keywords: ['climbing', 'adventure', 'atibaia'],
        ogImage: '/images/og-pedra.jpg',
      },
    };

    const mockCreatedTour: Tour = {
      id: 'pedra-grande-adventure',
      ...mockCreateRequest,
      location: {
        ...mockCreateRequest.location,
        directions: [{ step: 1, title: 'Departure', description: 'Take highway BR-381' }],
      },
      activities: [
        {
          id: 'rock-climbing-1',
          name: 'Rock Climbing',
          description: 'Climb the main rock face',
          icon: '🧗‍♂️',
          difficulty: 'medium',
          duration: '4 hours',
          price: 150,
          included: true,
        },
      ],
      availability: {
        available: true,
        weatherDependent: false,
        restrictions: [],
      },
      gallery: {
        images: [
          {
            id: 'img-main-view-1',
            src: '/images/pedra1.jpg',
            alt: 'Pedra Grande view',
            title: 'Main View',
            category: 'landscape',
            order: 1,
          },
        ],
        videos: [],
        categories: { landscape: 'Landscape', action: 'Action' },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      pricing: {
        basePrice: 150,
        currency: 'BRL',
        cancellationPolicy: 'flexible',
      },
      logistics: mockCreateRequest.logistics,
      seo: mockCreateRequest.seo,
    };

    beforeEach(() => {
      mockTourRepository.findByName.mockResolvedValue([]);
      mockTourRepository.findByThemeId.mockResolvedValue([]);
      mockTourRepository.create.mockResolvedValue(mockCreatedTour);
    });

    it('should create tour successfully', async () => {
      const result = await tourService.createTour(mockCreateRequest);

      expect(result).toEqual(mockCreatedTour);
      expect(mockTourRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'pedra-grande-adventure',
          name: 'Pedra Grande Adventure',
          themeId: 'pedra-grande',
        })
      );
    });

    it('should generate correct tour ID from name', async () => {
      await tourService.createTour(mockCreateRequest);

      expect(mockTourRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'pedra-grande-adventure',
        })
      );
    });

    it('should process directions with step numbers', async () => {
      await tourService.createTour(mockCreateRequest);

      const createCall = mockTourRepository.create.mock.calls[0][0];
      expect(createCall.location.directions[0]).toMatchObject({
        step: 1,
        title: 'Departure',
        description: 'Take highway BR-381',
      });
    });

    it('should process activities with generated IDs', async () => {
      await tourService.createTour(mockCreateRequest);

      const createCall = mockTourRepository.create.mock.calls[0][0];
      expect(createCall.activities[0]).toMatchObject({
        id: 'rock-climbing-1',
        name: 'Rock Climbing',
      });
    });

    it('should process gallery images with IDs and order', async () => {
      await tourService.createTour(mockCreateRequest);

      const createCall = mockTourRepository.create.mock.calls[0][0];
      expect(createCall.gallery.images[0]).toMatchObject({
        id: 'img-main-view-1',
        order: 1,
        title: 'Main View',
      });
    });

    it('should throw error for duplicate tour name', async () => {
      mockTourRepository.findByName.mockResolvedValue([mockCreatedTour]);

      await expect(tourService.createTour(mockCreateRequest)).rejects.toThrow(
        'Tour name must be unique'
      );
    });

    it('should throw error for duplicate theme ID', async () => {
      mockTourRepository.findByThemeId.mockResolvedValue([mockCreatedTour]);

      await expect(tourService.createTour(mockCreateRequest)).rejects.toThrow(
        'Theme ID must be unique'
      );
    });

    it('should validate tour data before creation', async () => {
      const invalidRequest = {
        ...mockCreateRequest,
        name: '', // Invalid empty name
      };

      await expect(tourService.createTour(invalidRequest)).rejects.toThrow(
        'Validation failed: Tour name is required'
      );
    });

    it('should handle missing optional fields', async () => {
      const minimalRequest: CreateTourRequest = {
        name: 'Minimal Tour',
        themeId: 'minimal-tour',
        description: 'Basic tour',
        location: {
          name: 'Test Location',
          address: 'Test Address',
          city: 'Test City',
          state: 'TS',
          country: 'Test Country',
          coordinates: { lat: 0, lng: 0 },
        },
        activities: [],
        logistics: {
          schedule: {
            openTime: '08:00',
            closeTime: '18:00',
          },
          meetingPoint: 'Test Point',
          duration: '10 hours',
          groupSize: { min: 4, max: 12 },
          requirements: [],
          included: [],
          notIncluded: [],
          importantNotes: [],
          tips: [],
        },
        pricing: {
          basePrice: 100,
          currency: 'BRL',
          cancellationPolicy: 'flexible',
        },
        seo: {
          title: 'Minimal Tour',
          description: 'Basic tour description',
          keywords: [],
          ogImage: '',
        },
      };

      await tourService.createTour(minimalRequest);

      expect(mockTourRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Minimal Tour',
          activities: [],
        })
      );
    });
  });

  describe('updateTour', () => {
    const existingTour: Tour = {
      id: 'existing-tour',
      name: 'Existing Tour',
      themeId: 'existing-theme',
      description: 'Existing description',
      location: {
        name: 'Existing Location',
        address: 'Existing Address',
        city: 'Existing City',
        state: 'EX',
        country: 'Existing Country',
        coordinates: { lat: 0, lng: 0 },
        directions: [],
      },
      activities: [],
      logistics: {
        schedule: {
          openTime: '08:00',
          closeTime: '18:00',
        },
        meetingPoint: 'Existing Point',
        duration: '10 hours',
        groupSize: { min: 4, max: 12 },
        requirements: [],
        included: [],
        notIncluded: [],
        importantNotes: [],
        tips: [],
      },
      pricing: {
        basePrice: 100,
        currency: 'BRL',
        cancellationPolicy: 'flexible',
      },
      availability: {
        available: true,
        weatherDependent: false,
        restrictions: [],
      },
      gallery: {
        images: [],
        videos: [],
        categories: {},
      },
      seo: {
        title: 'Existing Tour',
        description: 'Existing description',
        keywords: [],
        ogImage: '',
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isActive: true,
    };

    const updateRequest: UpdateTourRequest = {
      id: 'existing-tour',
      name: 'Updated Tour Name',
      description: 'Updated description',
    };

    beforeEach(() => {
      mockTourRepository.findById.mockResolvedValue(existingTour);
      mockTourRepository.findByName.mockResolvedValue([]);
      mockTourRepository.findByThemeId.mockResolvedValue([]);
      mockTourRepository.update.mockResolvedValue({
        ...existingTour,
        ...updateRequest,
        updatedAt: new Date(),
      } as Tour);
    });

    it('should update tour successfully', async () => {
      const result = await tourService.updateTour(updateRequest);

      expect(result.name).toBe('Updated Tour Name');
      expect(result.description).toBe('Updated description');
      expect(mockTourRepository.update).toHaveBeenCalled();
    });

    it('should throw error if tour not found', async () => {
      mockTourRepository.findById.mockResolvedValue(null);

      await expect(tourService.updateTour(updateRequest)).rejects.toThrow('Tour not found');
    });

    it('should validate uniqueness when name changes', async () => {
      const updateWithNewName = {
        ...updateRequest,
        name: 'Completely New Name',
      };

      mockTourRepository.findByName.mockResolvedValue([
        { ...existingTour, id: 'different-tour', name: 'Completely New Name' },
      ]);

      await expect(tourService.updateTour(updateWithNewName)).rejects.toThrow(
        'Tour name must be unique'
      );
    });

    it('should allow keeping the same name', async () => {
      const updateKeepingName = {
        ...updateRequest,
        name: existingTour.name, // Same name
        description: 'New description',
      };

      mockTourRepository.findByName.mockResolvedValue([existingTour]);

      await expect(tourService.updateTour(updateKeepingName)).resolves.not.toThrow();
    });

    it('should validate uniqueness when theme ID changes', async () => {
      const updateWithNewTheme = {
        ...updateRequest,
        themeId: 'new-theme-id',
      };

      mockTourRepository.findByThemeId.mockResolvedValue([
        { ...existingTour, id: 'different-tour', themeId: 'new-theme-id' },
      ]);

      await expect(tourService.updateTour(updateWithNewTheme)).rejects.toThrow(
        'Theme ID must be unique'
      );
    });

    it('should process activities when provided in update', async () => {
      const updateWithActivities = {
        ...updateRequest,
        activities: [
          {
            name: 'New Activity',
            description: 'New activity description',
            icon: '🎯',
            difficulty: 'easy' as const,
            duration: '2 hours',
            price: 75,
            included: true,
          },
        ],
      };

      await tourService.updateTour(updateWithActivities);

      const updateCall = mockTourRepository.update.mock.calls[0][0];
      expect(updateCall.activities[0]).toMatchObject({
        id: 'new-activity-1',
        name: 'New Activity',
      });
    });
  });

  describe('getTourById', () => {
    it('should return tour when found', async () => {
      const mockTour: Tour = {
        id: 'test-tour',
        name: 'Test Tour',
      } as Tour;

      mockTourRepository.findById.mockResolvedValue(mockTour);

      const result = await tourService.getTourById('test-tour');

      expect(result).toEqual(mockTour);
      expect(mockTourRepository.findById).toHaveBeenCalledWith('test-tour');
    });

    it('should return null when tour not found', async () => {
      mockTourRepository.findById.mockResolvedValue(null);

      const result = await tourService.getTourById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getAllTours', () => {
    it('should return all tours', async () => {
      const mockTours: Tour[] = [
        { id: 'tour1', name: 'Tour 1' } as Tour,
        { id: 'tour2', name: 'Tour 2' } as Tour,
      ];

      mockTourRepository.findAll.mockResolvedValue(mockTours);

      const result = await tourService.getAllTours();

      expect(result).toEqual(mockTours);
      expect(mockTourRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('getActiveTours', () => {
    it('should return only active tours', async () => {
      const mockActiveTours: Tour[] = [
        { id: 'tour1', name: 'Active Tour 1', isActive: true } as Tour,
      ];

      mockTourRepository.findByActive.mockResolvedValue(mockActiveTours);

      const result = await tourService.getActiveTours();

      expect(result).toEqual(mockActiveTours);
      expect(mockTourRepository.findByActive).toHaveBeenCalledWith(true);
    });
  });

  describe('deleteTour', () => {
    const mockTour: Tour = {
      id: 'test-tour',
      name: 'Test Tour',
      isActive: true,
      updatedAt: new Date('2024-01-01'),
    } as Tour;

    it('should soft delete tour successfully', async () => {
      mockTourRepository.findById.mockResolvedValue(mockTour);
      mockTourRepository.update.mockResolvedValue({
        ...mockTour,
        isActive: false,
      });

      const result = await tourService.deleteTour('test-tour');

      expect(result).toBe(true);
      expect(mockTourRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'test-tour',
          isActive: false,
        })
      );
    });

    it('should return false when tour not found', async () => {
      mockTourRepository.findById.mockResolvedValue(null);

      const result = await tourService.deleteTour('non-existent');

      expect(result).toBe(false);
      expect(mockTourRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('generateThemeFromTour', () => {
    const mockTour: Tour = {
      id: 'test-tour',
      name: 'Test Tour',
      themeId: 'test-theme',
      description: 'Test description',
      location: {
        name: 'Test Location',
        address: 'Test Address',
        city: 'Test City',
        state: 'TS',
        country: 'Test Country',
        coordinates: { lat: -23.1234, lng: -46.5678 },
        mapsUrl: 'https://maps.test.com',
        directions: [{ step: 1, title: 'Go straight', description: 'Go straight' }],
      },
      activities: [
        {
          id: 'activity-1',
          name: 'Test Activity',
          description: 'Test activity description',
          icon: '🎯',
          difficulty: 'medium',
          duration: '2 hours',
          price: 100,
          included: true,
        },
      ],
      logistics: {
        schedule: {
          openTime: '08:00',
          closeTime: '18:00',
        },
        meetingPoint: 'Test Point',
        duration: '10 hours',
        groupSize: { min: 4, max: 12 },
        importantNotes: ['Note 1'],
        tips: ['Tip 1'],
        requirements: [],
        included: [],
        notIncluded: [],
      },
      gallery: {
        images: [
          {
            id: 'img-1',
            src: '/test.jpg',
            alt: 'Test image',
            title: 'Test Image',
            category: 'landscape',
            order: 1,
          },
        ],
        videos: [],
        categories: { landscape: 'Landscape' },
      },
      seo: {
        title: 'Test Tour SEO',
        description: 'Test SEO description',
        keywords: [],
        ogImage: '',
      },
      pricing: {
        basePrice: 100,
        currency: 'BRL',
        cancellationPolicy: 'flexible',
      },
      availability: {
        available: true,
        weatherDependent: false,
        restrictions: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    } as Tour;

    it('should generate theme config from tour', () => {
      const theme = tourService.generateThemeFromTour(mockTour);

      expect(theme).toMatchObject({
        id: 'test-theme',
        name: 'Test Tour',
        location: {
          name: 'Test Location',
          address: 'Test Address',
          city: 'Test City',
          state: 'TS',
          coordinates: { lat: -23.1234, lng: -46.5678 },
        },
        content: {
          hero: {
            title: 'Test Tour SEO',
            subtitle: 'Test description',
            description: 'Test description',
          },
          about: {
            title: 'About Test Tour',
            description: 'Test description',
          },
        },
        activities: [
          {
            id: 'activity-1',
            name: 'Test Activity',
            description: 'Test activity description',
            icon: '🎯',
            difficulty: 'medium',
            duration: '2 hours',
            price: 100,
          },
        ],
        seo: {
          title: 'Test Tour SEO',
          description: 'Test SEO description',
          keywords: [],
          ogImage: '',
        },
      });
    });

    it('should include gallery and categories', () => {
      const theme = tourService.generateThemeFromTour(mockTour);

      expect(theme.gallery).toMatchObject({
        images: [
          {
            src: '/test.jpg',
            alt: 'Test image',
            title: 'Test Image',
            category: 'landscape',
          },
        ],
        categories: { landscape: 'Landscape' },
      });
    });

    it('should include logistics information', () => {
      const theme = tourService.generateThemeFromTour(mockTour);

      expect(theme.logistics).toMatchObject({
        schedule: {
          openTime: '08:00',
          closeTime: '18:00',
        },
        meetingPoint: 'Test Point',
        importantNotes: ['Note 1'],
        tips: ['Tip 1'],
      });
    });
  });

  describe('validateTourData', () => {
    const validRequest: CreateTourRequest = {
      name: 'Valid Tour',
      themeId: 'valid-theme',
      description: 'Valid description',
      location: {
        name: 'Valid Location',
        address: 'Valid Address',
        city: 'Valid City',
        state: 'VS',
        country: 'Valid Country',
        coordinates: { lat: -23.1234, lng: -46.5678 },
      },
      activities: [],
      logistics: {
        schedule: {
          openTime: '08:00',
          closeTime: '18:00',
        },
        meetingPoint: 'Valid Point',
        duration: '10 hours',
        groupSize: { min: 2, max: 10 },
        requirements: [],
        included: [],
        notIncluded: [],
        importantNotes: [],
        tips: [],
      },
      pricing: {
        basePrice: 150,
        currency: 'BRL',
        cancellationPolicy: 'flexible',
      },
      seo: {
        title: 'Valid SEO Title',
        description: 'Valid SEO description',
        keywords: [],
        ogImage: '',
      },
    };

    it('should validate successfully with valid data', async () => {
      const result = await tourService.validateTourData(validRequest);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate required fields', async () => {
      const invalidRequest = {
        ...validRequest,
        name: '',
        themeId: '',
        description: '',
      };

      const result = await tourService.validateTourData(invalidRequest);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
      expect(result.errors.map(e => e.field)).toContain('name');
      expect(result.errors.map(e => e.field)).toContain('themeId');
      expect(result.errors.map(e => e.field)).toContain('description');
    });

    it('should validate theme ID format', async () => {
      const invalidRequest = {
        ...validRequest,
        themeId: 'Invalid Theme ID!',
      };

      const result = await tourService.validateTourData(invalidRequest);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toMatchObject({
        field: 'themeId',
        code: 'INVALID_FORMAT',
      });
    });

    it('should validate coordinates range', async () => {
      const invalidRequest = {
        ...validRequest,
        location: {
          ...validRequest.location,
          coordinates: { lat: 100, lng: -200 }, // Invalid ranges
        },
      };

      const result = await tourService.validateTourData(invalidRequest);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors.map(e => e.field)).toContain('location.coordinates.lat');
      expect(result.errors.map(e => e.field)).toContain('location.coordinates.lng');
    });

    it('should validate pricing', async () => {
      const invalidRequest = {
        ...validRequest,
        pricing: {
          ...validRequest.pricing,
          basePrice: 0, // Invalid price
        },
      };

      const result = await tourService.validateTourData(invalidRequest);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toMatchObject({
        field: 'pricing.basePrice',
        code: 'INVALID_RANGE',
      });
    });

    it('should validate group size logic', async () => {
      const invalidRequest = {
        ...validRequest,
        logistics: {
          ...validRequest.logistics,
          groupSize: { min: 0, max: 5 }, // Invalid min
        },
      };

      const result = await tourService.validateTourData(invalidRequest);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toMatchObject({
        field: 'logistics.groupSize.min',
        code: 'INVALID_RANGE',
      });
    });

    it('should validate max group size vs min group size', async () => {
      const invalidRequest = {
        ...validRequest,
        logistics: {
          ...validRequest.logistics,
          groupSize: { min: 10, max: 5 }, // Max < Min
        },
      };

      const result = await tourService.validateTourData(invalidRequest);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toMatchObject({
        field: 'logistics.groupSize.max',
        code: 'INVALID_RANGE',
      });
    });
  });

  describe('uniqueness checks', () => {
    it('should check tour name uniqueness', async () => {
      mockTourRepository.findByName.mockResolvedValue([]);

      const isUnique = await tourService.isTourNameUnique('New Tour');

      expect(isUnique).toBe(true);
      expect(mockTourRepository.findByName).toHaveBeenCalledWith('New Tour');
    });

    it('should detect non-unique tour name', async () => {
      const existingTour = { id: 'existing', name: 'Existing Tour' } as Tour;
      mockTourRepository.findByName.mockResolvedValue([existingTour]);

      const isUnique = await tourService.isTourNameUnique('Existing Tour');

      expect(mockTourRepository.findByName).toHaveBeenCalledWith('Existing Tour');
      expect(isUnique).toBe(false);
    });

    it('should allow same name for same tour during update', async () => {
      mockTourRepository.findByName.mockResolvedValue([
        { id: 'tour-1', name: 'Tour Name' } as Tour,
      ]);

      const isUnique = await tourService.isTourNameUnique('Tour Name', 'tour-1');

      expect(isUnique).toBe(true);
    });

    it('should check theme ID uniqueness', async () => {
      mockTourRepository.findByThemeId.mockResolvedValue([]);

      const isUnique = await tourService.isThemeIdUnique('new-theme');

      expect(isUnique).toBe(true);
      expect(mockTourRepository.findByThemeId).toHaveBeenCalledWith('new-theme');
    });
  });

  describe('ID generation', () => {
    it('should generate tour ID from name', () => {
      const service = new TourService(mockTourRepository);

      // Access private method through any casting for testing
      const generateTourId = (service as any).generateTourId;

      expect(generateTourId('Pedra Grande Adventure')).toBe('pedra-grande-adventure');
      expect(generateTourId('Tour with Special Characters!')).toBe('tour-with-special-characters');
      expect(generateTourId('Multiple   Spaces')).toBe('multiple-spaces');
      expect(generateTourId('---Leading-and-Trailing---')).toBe('leading-and-trailing');
    });

    it('should generate activity ID with index', () => {
      const service = new TourService(mockTourRepository);

      const generateActivityId = (service as any).generateActivityId;

      expect(generateActivityId('Rock Climbing', 0)).toBe('rock-climbing-1');
      expect(generateActivityId('Via Ferrata', 1)).toBe('via-ferrata-2');
    });

    it('should generate image ID with index', () => {
      const service = new TourService(mockTourRepository);

      const generateImageId = (service as any).generateImageId;

      expect(generateImageId('Main View', 0)).toBe('img-main-view-1');
      expect(generateImageId('Action Shot', 1)).toBe('img-action-shot-2');
    });
  });
});
