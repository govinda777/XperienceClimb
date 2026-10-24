import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';
import { fazendaIpanemaTheme } from '@/themes/configs/fazenda-ipanema';

const mockSetTheme = jest.fn();
let mockCurrentTheme = pedraBellaTheme;

jest.mock('@/themes/ThemeProvider', () => ({
  useTheme: () => ({
    currentTheme: mockCurrentTheme,
    availableThemes: [pedraBellaTheme, fazendaIpanemaTheme],
    setTheme: mockSetTheme,
    isLoading: false,
    refreshThemes: jest.fn(),
  }),
}));

describe('Navigation - Destination Switcher & Fazenda Ipanema Data Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentTheme = pedraBellaTheme;
  });

  it('should open destination list in menu and call setTheme("fazenda-ipanema") when Fazenda Ipanema is clicked', () => {
    render(<Navigation />);

    const triggerButton = screen.getByRole('button', {
      name: /Selecionar destino\. Destino atual: Pedra Bela/i,
    });
    expect(triggerButton).toBeInTheDocument();

    // Open destinations dropdown
    fireEvent.click(triggerButton);

    const listbox = screen.getByRole('listbox', { name: /Lista de destinos/i });
    expect(listbox).toBeInTheDocument();

    const fazendaOption = screen.getByRole('option', { name: /Fazenda Ipanema/i });
    expect(fazendaOption).toBeInTheDocument();

    // Click Fazenda Ipanema
    fireEvent.click(fazendaOption);

    expect(mockSetTheme).toHaveBeenCalledWith('fazenda-ipanema');
  });

  it('should load Fazenda Ipanema data across sections when currentTheme is fazendaIpanemaTheme', () => {
    mockCurrentTheme = fazendaIpanemaTheme;

    render(
      <>
        <Navigation />
        <HeroSection />
        <AboutSection />
        <LocationSection />
        <FAQSection />
      </>
    );

    // Header tagline updates to Fazenda Ipanema
    expect(screen.getByText('Fazenda Ipanema · SP')).toBeInTheDocument();

    // HeroSection loads Fazenda Ipanema data
    expect(screen.getByText('FAZENDA IPANEMA')).toBeInTheDocument();
    expect(screen.getByText(/MORRO ARAÇOIABA · 120 KM DE SP/i)).toBeInTheDocument();

    // AboutSection loads Fazenda Ipanema cards
    expect(screen.getByText('Unidade de Conservação Federal')).toBeInTheDocument();

    // LocationSection loads Fazenda Ipanema meeting point
    expect(screen.getByText('Centro de Visitantes da FLONA')).toBeInTheDocument();

    // FAQSection loads Fazenda Ipanema FAQ
    expect(
      screen.getByText('Preciso ter experiência prévia para escalar na Fazenda Ipanema?')
    ).toBeInTheDocument();
  });
});
