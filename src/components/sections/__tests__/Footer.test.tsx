import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from '../Footer';
import { AVAILABLE_DATES } from '@/lib/constants';

// Mock UI components
jest.mock('@/components/ui', () => ({
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
  openWhatsApp: jest.fn(),
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock Image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}));

// Mock constants
jest.mock('@/lib/constants', () => ({
  CONTACT_INFO: {
    address: 'Test Address',
    distance: 'Test Distance',
    phone: '(11) 99999-9999',
    email: 'test@example.com',
    instagram: '@test',
  },
  AVAILABLE_DATES: {
    singleDate: '01/01/2026',
    singleDateISO: '2026-01-01',
    singleDateDisplay: '1 de Janeiro de 2026',
  },
}));

describe('Footer Component', () => {
  it('should render contact information correctly', () => {
    render(<Footer />);

    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Test Address/)).toBeInTheDocument();
  });

  it('should call openWhatsApp with the correct message when WhatsApp button is clicked', () => {
    const { openWhatsApp } = require('@/lib/utils');
    render(<Footer />);

    const whatsappButton = screen.getByText('💬 WhatsApp');
    fireEvent.click(whatsappButton);

    const expectedMessage = `Olá! Gostaria de mais informações sobre os pacotes de escalada para o dia ${AVAILABLE_DATES.singleDate}`;

    expect(openWhatsApp).toHaveBeenCalledWith(
      '(11) 99999-9999',
      expectedMessage
    );
  });
});
