import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PackagesSection } from '../PackagesSection';
import { createCartStoreState } from '@/__tests__/test-utils';

// Mock the cart store
const mockCartStore = createCartStoreState();

jest.mock('@/store/useCartStore', () => ({
  useCartStore: () => mockCartStore,
}));

// Mock UI components
jest.mock('@/components/ui', () => ({
  Card: ({ children, className, interactive }: any) => (
    <div className={className} data-interactive={interactive}>
      {children}
    </div>
  ),
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardDescription: ({ children }: any) => <p>{children}</p>,
  CardFooter: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>,
  Button: ({ children, onClick, disabled, variant, size }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  ),
}));

// Mock utils
jest.mock('@/lib/utils', () => ({
  formatPrice: (price: number) => `R$ ${price.toFixed(2)}`,
  openWhatsApp: jest.fn(),
}));

// Mock constants
jest.mock('@/lib/constants', () => ({
  CONTACT_INFO: {
    phone: '+5511999999999',
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('PackagesSection Component', () => {
  const mockPackages = [
    {
      id: 'pkg-1',
      name: 'Escalada Iniciante',
      price: 150,
      originalPrice: 200,
      description: 'Perfeito para iniciantes',
      features: ['Instrução básica', 'Equipamentos inclusos'],
      bonus: ['Lanche', 'Fotos'],
      shape: 'circle' as const,
      color: 'climb-500',
      duration: '4 horas',
      maxParticipants: 8,
      popular: false,
      disabled: false,
    },
    {
      id: 'pkg-2',
      name: 'Escalada Avançada',
      price: 250,
      description: 'Para escaladores experientes',
      features: ['Rotas desafiadoras', 'Equipamentos profissionais'],
      bonus: ['Almoço', 'Certificado'],
      shape: 'hexagon' as const,
      color: 'orange-400',
      duration: '6 horas',
      maxParticipants: 6,
      popular: true,
      disabled: false,
    },
    {
      id: 'pkg-3',
      name: 'Escalada Premium',
      price: 350,
      description: 'Experiência exclusiva',
      features: ['Instrutor particular', 'Equipamentos premium'],
      bonus: ['Jantar', 'Vídeo profissional'],
      shape: 'triangle' as const,
      color: 'purple-500',
      duration: '8 horas',
      maxParticipants: 4,
      popular: false,
      disabled: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({
        success: true,
        data: mockPackages,
      }),
    });
  });

  describe('loading state', () => {
    it('should show loading skeleton initially', async () => {
      render(<PackagesSection />);
      
      expect(screen.getByText('Pacotes de Escalada')).toBeInTheDocument();
      
      // Should show loading skeleton
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should hide loading state after data loads', async () => {
      render(<PackagesSection />);
      
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
      
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons).toHaveLength(0);
    });
  });

  describe('package rendering', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
    });

    it('should render all packages', () => {
      expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      expect(screen.getByText('Escalada Avançada')).toBeInTheDocument();
      expect(screen.getByText('Escalada Premium')).toBeInTheDocument();
    });

    it('should display package descriptions', () => {
      expect(screen.getByText('Perfeito para iniciantes')).toBeInTheDocument();
      expect(screen.getByText('Para escaladores experientes')).toBeInTheDocument();
      expect(screen.getByText('Experiência exclusiva')).toBeInTheDocument();
    });

    it('should show package prices', () => {
      expect(screen.getByText('R$ 150.00')).toBeInTheDocument();
      expect(screen.getByText('R$ 250.00')).toBeInTheDocument();
      expect(screen.getByText('R$ 350.00')).toBeInTheDocument();
    });

    it('should show original prices when available', () => {
      expect(screen.getByText('R$ 200.00')).toBeInTheDocument();
    });

    it('should display package duration', () => {
      expect(screen.getByText('4 horas')).toBeInTheDocument();
      expect(screen.getByText('6 horas')).toBeInTheDocument();
      expect(screen.getByText('8 horas')).toBeInTheDocument();
    });

    it('should show package features', () => {
      expect(screen.getByText('Instrução básica')).toBeInTheDocument();
      expect(screen.getByText('Equipamentos inclusos')).toBeInTheDocument();
      expect(screen.getByText('Rotas desafiadoras')).toBeInTheDocument();
      expect(screen.getByText('Equipamentos profissionais')).toBeInTheDocument();
    });

    it('should display bonus items', () => {
      expect(screen.getAllByText('🎁 BÔNUS EXCLUSIVOS:')).toHaveLength(3);
      expect(screen.getByText('Lanche')).toBeInTheDocument();
      expect(screen.getByText('Fotos')).toBeInTheDocument();
      expect(screen.getByText('Almoço')).toBeInTheDocument();
      expect(screen.getByText('Certificado')).toBeInTheDocument();
    });
  });

  describe('popular package highlighting', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Avançada')).toBeInTheDocument();
      });
    });

    it('should show popular badge for popular packages', () => {
      expect(screen.getByText('Mais Popular')).toBeInTheDocument();
    });

    it('should apply special styling to popular packages', () => {
      const popularCard = screen.getByText('Mais Popular').closest('div');
      const parentCard = popularCard?.parentElement;
      expect(parentCard).toHaveClass('scale-105', 'ring-2', 'ring-orange-400');
    });
  });

  describe('disabled package handling', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Premium')).toBeInTheDocument();
      });
    });

    it('should show unavailable badge for disabled packages', () => {
      expect(screen.getByText('Indisponível')).toBeInTheDocument();
    });

    it('should apply disabled styling', () => {
      const disabledCard = screen.getByText('Indisponível').closest('div');
      const parentCard = disabledCard?.parentElement;
      expect(parentCard).toHaveClass('cursor-not-allowed', 'opacity-60');
    });

    it('should show disabled button text', () => {
      expect(screen.getByText('Pacote Indisponível')).toBeInTheDocument();
    });

    it('should disable button for unavailable packages', () => {
      const disabledButton = screen.getByText('Pacote Indisponível');
      expect(disabledButton).toBeDisabled();
    });
  });

  describe('add to cart functionality', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
    });

    it('should add item to cart when button is clicked', () => {
      const addButton = screen.getAllByText('Adicionar ao Carrinho')[0];
      fireEvent.click(addButton);

      expect(mockCartStore.addItem).toHaveBeenCalledWith({
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'Participante',
      });
    });

    it('should open cart after adding item', () => {
      const addButton = screen.getAllByText('Adicionar ao Carrinho')[0];
      fireEvent.click(addButton);

      expect(mockCartStore.openCart).toHaveBeenCalledTimes(1);
    });

    it('should not add disabled packages to cart', () => {
      const disabledButton = screen.getByText('Pacote Indisponível');
      fireEvent.click(disabledButton);

      expect(mockCartStore.addItem).not.toHaveBeenCalled();
      expect(mockCartStore.openCart).not.toHaveBeenCalled();
    });

    it('should handle multiple add to cart clicks', () => {
      const addButton = screen.getAllByText('Adicionar ao Carrinho')[0];
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      expect(mockCartStore.addItem).toHaveBeenCalledTimes(2);
      expect(mockCartStore.openCart).toHaveBeenCalledTimes(2);
    });
  });

  describe('package shapes and styling', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
    });

    it('should render different shapes for packages', () => {
      // Circle shape (👑)
      expect(screen.getByText('👑')).toBeInTheDocument();
      // Hexagon shape (🏔️)
      expect(screen.getByText('🏔️')).toBeInTheDocument();
      // Triangle shape (⭐)
      expect(screen.getByText('⭐')).toBeInTheDocument();
    });

    it('should apply correct shape classes', () => {
      const circleIcon = screen.getByText('👑').closest('div');
      expect(circleIcon).toHaveClass('rounded-full');

      const hexagonIcon = screen.getByText('🏔️').closest('div');
      expect(hexagonIcon).toHaveClass('clip-hexagon');

      const triangleIcon = screen.getByText('⭐').closest('div');
      expect(triangleIcon).toHaveClass('clip-triangle');
    });
  });

  describe('error handling', () => {
    it('should show error message when API fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      render(<PackagesSection />);

      await waitFor(() => {
        expect(screen.getByText('Erro ao carregar pacotes. Verifique a conexão.')).toBeInTheDocument();
      });
    });

    it('should show error message when API returns success: false', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve({
          success: false,
          data: [],
        }),
      });

      render(<PackagesSection />);

      await waitFor(() => {
        expect(screen.getByText('Erro ao carregar pacotes. Verifique a conexão.')).toBeInTheDocument();
      });
    });

    it('should provide retry functionality', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve({
          success: false,
          data: [],
        }),
      });

      // Mock window.location.reload
      const mockReload = jest.fn();
      const originalLocation = window.location;
      
      // @ts-ignore
      delete window.location;
      // @ts-ignore
      window.location = { ...originalLocation, reload: mockReload };

      render(<PackagesSection />);

      await waitFor(() => {
        expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Tentar novamente'));
      expect(mockReload).toHaveBeenCalledTimes(1);
    });
  });

  describe('WhatsApp contact', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
    });

    it('should show contact section', () => {
      expect(screen.getByText('Dúvidas sobre qual pacote escolher?')).toBeInTheDocument();
      expect(screen.getByText('📞 Fale Conosco')).toBeInTheDocument();
    });

    it('should open WhatsApp when contact button is clicked', () => {
      const { openWhatsApp } = require('@/lib/utils');
      
      const contactButton = screen.getByText('📞 Fale Conosco');
      fireEvent.click(contactButton);

      expect(openWhatsApp).toHaveBeenCalledWith(
        '+5511999999999',
        'Olá! Gostaria de saber mais sobre os pacotes de escalada da XperienceClimb 🏔️'
      );
    });
  });

  describe('accessibility', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
    });

    it('should have proper heading structure', () => {
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Pacotes de Escalada');

      const packageHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(packageHeadings).toHaveLength(3);
    });

    it('should have accessible buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach(button => {
        expect(button).toHaveTextContent(/adicionar ao carrinho|pacote indisponível|fale conosco/i);
      });
    });

    it('should have proper button states', () => {
      const enabledButtons = screen.getAllByText('Adicionar ao Carrinho');
      enabledButtons.forEach(button => {
        expect(button).not.toBeDisabled();
      });

      const disabledButton = screen.getByText('Pacote Indisponível');
      expect(disabledButton).toBeDisabled();
    });
  });

  describe('responsive design', () => {
    beforeEach(async () => {
      render(<PackagesSection />);
      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });
    });

    it('should have responsive grid classes', () => {
      const grid = document.querySelector('.grid-cols-1.md\\:grid-cols-3');
      expect(grid).toBeInTheDocument();
    });

    it('should have responsive text classes', () => {
      const heading = screen.getByText('Pacotes de Escalada');
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl');
    });
  });

  describe('console logging', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log fetch process', async () => {
      render(<PackagesSection />);

      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });

      expect(consoleSpy).toHaveBeenCalledWith('🔍 useEffect executado - iniciando fetch dos pacotes');
      expect(consoleSpy).toHaveBeenCalledWith('📡 Iniciando fetch para /api/packages');
    });

    it('should log add to cart process', async () => {
      render(<PackagesSection />);

      await waitFor(() => {
        expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      });

      const addButton = screen.getAllByText('Adicionar ao Carrinho')[0];
      fireEvent.click(addButton);

      expect(consoleSpy).toHaveBeenCalledWith('Button clicked for package:', 'pkg-1');
      expect(consoleSpy).toHaveBeenCalledWith('Adding to cart:', 'pkg-1');
    });
  });
});
