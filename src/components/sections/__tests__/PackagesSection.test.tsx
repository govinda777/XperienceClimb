import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PackagesSection } from '../PackagesSection';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

const mockAddItem = jest.fn();
const mockOpenCart = jest.fn();
const mockOpenCheckout = jest.fn();
const mockLogin = jest.fn();
let mockIsLoggedIn = true;

jest.mock('@/store/useCartStore', () => ({
  useCartStore: () => ({
    addItem: mockAddItem,
    openCart: mockOpenCart,
    openCheckout: mockOpenCheckout,
  }),
}));

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isLoggedIn: mockIsLoggedIn,
    login: mockLogin,
  }),
}));

describe('PackagesSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsLoggedIn = true;
  });

  it('should render section title and packages from theme', () => {
    render(<PackagesSection />);

    expect(screen.getByText('ESCOLHA SUA')).toBeInTheDocument();
    expect(screen.getByText('via de aventura')).toBeInTheDocument();

    const packages = pedraBellaTheme.packagesSection?.items || [];
    packages.forEach(pkg => {
      expect(screen.getByText(pkg.name)).toBeInTheDocument();
      expect(screen.getByText(pkg.description)).toBeInTheDocument();
    });
  });

  it('should allow adding available package to cart with correct price in Reais', () => {
    // Mock window.open
    window.open = jest.fn();

    render(<PackagesSection />);

    const agarraoButton = screen.getByRole('button', { name: /Adicionar ao Carrinho/i });
    expect(agarraoButton).toBeInTheDocument();
    expect(agarraoButton).not.toBeDisabled();

    fireEvent.click(agarraoButton);

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        packageId: 'agarrao',
        packageName: 'PACOTE AGARRÃO',
        price: 277,
        quantity: 1,
      })
    );
    expect(mockOpenCheckout).toHaveBeenCalledTimes(1);
  });

  it('should trigger login when unauthenticated user adds package to cart', () => {
    mockIsLoggedIn = false;

    render(<PackagesSection />);

    const agarraoButton = screen.getByRole('button', { name: /Adicionar ao Carrinho/i });
    fireEvent.click(agarraoButton);

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        packageId: 'agarrao',
        price: 277,
      })
    );
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockOpenCheckout).toHaveBeenCalledTimes(1);
  });

  it('should render waitlist links for unavailable packages', () => {
    render(<PackagesSection />);

    const waitlistLinks = screen.getAllByRole('link', { name: /Entrar na Lista de Espera/i });
    expect(waitlistLinks.length).toBe(2);
    waitlistLinks.forEach(link => {
      expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/5511995413539'));
    });
  });

  it('should render package features and bonus', () => {
    render(<PackagesSection />);

    expect(screen.getAllByText('Escalada em rocha natural').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Coach de vida').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('R$ 330,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 277,00')).toBeInTheDocument();
  });

  it('should render annual program banner with benefits and VIP waitlist CTA', () => {
    render(<PackagesSection />);

    expect(screen.getByText('12 VAGAS / ANO')).toBeInTheDocument();
    const annualVipLink = screen.getByRole('link', { name: /Entrar na Lista VIP WhatsApp/i });
    expect(annualVipLink).toBeInTheDocument();
    expect(annualVipLink).toHaveAttribute('href', expect.stringContaining('wa.me/5511995413539'));
  });

  it('should render next confirmed date banner and WhatsApp request button', () => {
    render(<PackagesSection />);

    expect(screen.getByText(/Próxima Saída Confirmada:/i)).toBeInTheDocument();
    expect(screen.getByText('28 de Novembro de 2026')).toBeInTheDocument();

    const otherDateBtn = screen.getByRole('link', { name: /Solicitar Outra Data/i });
    expect(otherDateBtn).toBeInTheDocument();
    expect(otherDateBtn).toHaveAttribute('href', expect.stringContaining('wa.me/5511995413539'));

    // Card Agarrão permanece limpo, sem o bloco repetido de data
    expect(screen.queryByText(/Precisa de outra data\?/i)).not.toBeInTheDocument();
  });
});
