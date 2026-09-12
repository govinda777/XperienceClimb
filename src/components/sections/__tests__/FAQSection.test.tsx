import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQSection } from '../FAQSection';
import { FAQ_DATA } from '@/lib/faq-data';

// Mock UI components
jest.mock('@/components/ui', () => ({
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

// Mock utils
jest.mock('@/lib/utils', () => ({
  openWhatsApp: jest.fn(),
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('FAQSection Component', () => {
  it('should render section title and FAQ questions', () => {
    render(<FAQSection />);

    expect(
      screen.getByText('Perguntas Frequentes sobre Escalada em Pedra Bela')
    ).toBeInTheDocument();

    FAQ_DATA.forEach(item => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it('should show the first answer by default and allow toggling other items', () => {
    render(<FAQSection />);

    // First question answer is visible by default
    expect(screen.getByText(FAQ_DATA[0].answer)).toBeInTheDocument();

    // Click second question to expand it
    const secondQuestionButton = screen.getByRole('button', {
      name: new RegExp(FAQ_DATA[1].question, 'i'),
    });
    fireEvent.click(secondQuestionButton);

    expect(screen.getByText(FAQ_DATA[1].answer)).toBeInTheDocument();
  });

  it('should call openWhatsApp when clicking CTA button', () => {
    const { openWhatsApp } = require('@/lib/utils');
    render(<FAQSection />);

    const ctaButton = screen.getByText('Falar Diretamente com a Equipe');
    fireEvent.click(ctaButton);

    expect(openWhatsApp).toHaveBeenCalled();
  });
});
