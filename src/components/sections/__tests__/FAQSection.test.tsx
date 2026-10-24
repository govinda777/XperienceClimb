import React from 'react';
import { render, screen } from '@testing-library/react';
import { FAQSection } from '../FAQSection';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

describe('FAQSection Component', () => {
  it('should render section title and FAQ questions from theme', () => {
    render(<FAQSection />);

    expect(screen.getByText('PERGUNTAS')).toBeInTheDocument();
    expect(screen.getByText('frequentes')).toBeInTheDocument();

    const faqItems = pedraBellaTheme.faqSection?.items || [];
    faqItems.forEach(item => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    });
  });
});
