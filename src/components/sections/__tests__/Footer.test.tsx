import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

describe('Footer Component', () => {
  it('should render brand and contact information from theme', () => {
    render(<Footer />);

    const footer = pedraBellaTheme.footerSection!;

    expect(screen.getByText(footer.brand.name)).toBeInTheDocument();
    expect(screen.getByText(footer.contact.whatsappFormatted)).toBeInTheDocument();
    expect(screen.getByText(footer.contact.email)).toBeInTheDocument();
    expect(screen.getByText(footer.contact.instagramHandle)).toBeInTheDocument();
    expect(screen.getByText(footer.legal.copyright)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Footer />);

    const footer = pedraBellaTheme.footerSection!;
    footer.navLinks.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });
});
