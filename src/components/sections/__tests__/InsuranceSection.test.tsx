import React from 'react';
import { render, screen } from '@testing-library/react';
import { InsuranceSection } from '../InsuranceSection';

// Mock constants
jest.mock('@/lib/constants', () => ({
  CONTACT_INFO: {
    phone: '(11) 99541-3539',
  },
}));

describe('InsuranceSection', () => {
  it('renders the contact button with correct WhatsApp link', () => {
    render(<InsuranceSection />);

    const button = screen.getByText('Falar com Especialista').closest('a');
    // Expected link uses the mocked phone number: 5511995413539
    expect(button).toHaveAttribute('href', 'https://wa.me/5511995413539?text=Olá! Gostaria de mais informações sobre o seguro das aventuras.');
  });

  it('does not render email and phone text', () => {
    render(<InsuranceSection />);

    expect(screen.queryByText(/Email:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/WhatsApp:/)).not.toBeInTheDocument();
  });
});
