import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutForm } from '../CheckoutForm';
import { createMockCartItem, createMockUser } from '@/__tests__/test-utils';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ArrowLeft: ({ className, ...props }: any) => (
    <svg data-testid="arrow-left-icon" className={className} {...props} />
  ),
  Calendar: ({ className, ...props }: any) => (
    <svg data-testid="calendar-icon" className={className} {...props} />
  ),
  User: ({ className, ...props }: any) => (
    <svg data-testid="user-icon" className={className} {...props} />
  ),
  Phone: ({ className, ...props }: any) => (
    <svg data-testid="phone-icon" className={className} {...props} />
  ),
  AlertTriangle: ({ className, ...props }: any) => (
    <svg data-testid="alert-triangle-icon" className={className} {...props} />
  ),
  Loader2: ({ className, ...props }: any) => (
    <svg data-testid="loader-icon" className={className} {...props} />
  ),
}));

// Mock useAuth hook
const mockUseAuth = jest.fn();
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('CheckoutForm', () => {
  const mockOnBack = jest.fn();
  const mockOnSuccess = jest.fn();
  const defaultProps = {
    cartItems: [createMockCartItem()],
    onBack: mockOnBack,
    onSuccess: mockOnSuccess,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Default auth mock
    mockUseAuth.mockReturnValue({
      user: createMockUser(),
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    // Mock window alert
    global.alert = jest.fn();
  });

  describe('initial render', () => {
    it('should render checkout form with step progress', () => {
      render(<CheckoutForm {...defaultProps} />);

      expect(
        screen.getByRole('heading', { name: '📋 Dados dos Participantes' })
      ).toBeInTheDocument();
      expect(screen.getByText('Confirmação de Data')).toBeInTheDocument();
      expect(screen.getByText('Revisão e Envio ao WhatsApp')).toBeInTheDocument();
    });

    it('should start at step 1 (participant details)', () => {
      render(<CheckoutForm {...defaultProps} />);

      expect(screen.getByText('Por que coletamos esses dados?')).toBeInTheDocument();
    });

    it('should show back to cart button', () => {
      render(<CheckoutForm {...defaultProps} />);

      expect(screen.getByText('Voltar ao Carrinho')).toBeInTheDocument();
    });
  });

  describe('participant details step', () => {
    it('should render form fields for each cart item', () => {
      const cartItems = [
        createMockCartItem({ packageName: 'Escalada Iniciante' }),
        createMockCartItem({ id: 'item-2', packageName: 'Escalada Avançada' }),
      ];

      render(<CheckoutForm {...defaultProps} cartItems={cartItems} />);

      expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      expect(screen.getByText('Escalada Avançada')).toBeInTheDocument();
    });

    it('should have required form fields', () => {
      render(<CheckoutForm {...defaultProps} />);

      expect(screen.getByLabelText(/Nome Completo \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Idade \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Nível de Experiência \*/)).toBeInTheDocument();
    });

    it('should have health declaration checkbox', () => {
      render(<CheckoutForm {...defaultProps} />);

      expect(
        screen.getByText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      ).toBeInTheDocument();
    });

    it('should disable next button when form is incomplete', () => {
      render(<CheckoutForm {...defaultProps} />);

      const nextButton = screen.getByText('Confirmar Dados e Continuar');
      expect(nextButton).toBeDisabled();
    });

    it('should enable next button when form is complete', async () => {
      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Fill required fields
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );

      const nextButton = screen.getByText('Confirmar Dados e Continuar');
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('climbing details step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Complete first step
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );
      await user.click(screen.getByText('Confirmar Dados e Continuar'));
    });

    it('should show climbing details form', () => {
      expect(
        screen.getByRole('heading', { name: '📅 Confirmação de Data e Detalhes' })
      ).toBeInTheDocument();
      expect(screen.getByText('O que acontece nesta etapa?')).toBeInTheDocument();
    });

    it('should display fixed date', () => {
      expect(screen.getByDisplayValue('16 de Agosto de 2025')).toBeInTheDocument();
      expect(screen.getByText('Disponível')).toBeInTheDocument();
    });

    it('should have special requests textarea', () => {
      expect(
        screen.getByPlaceholderText(
          'Descreva qualquer solicitação especial, restrição alimentar, preferência de horário, ou informação importante que nossa equipe deve saber...'
        )
      ).toBeInTheDocument();
    });

    it('should show important information', () => {
      expect(screen.getByText('Informações Importantes:')).toBeInTheDocument();
      expect(screen.getByText('• Atividade sujeita às condições climáticas')).toBeInTheDocument();
      expect(screen.getByText('• Equipamentos de segurança inclusos')).toBeInTheDocument();
      expect(screen.getByText('• Idade mínima: 12 anos')).toBeInTheDocument();
    });

    it('should have back and next buttons', () => {
      expect(screen.getByText('Anterior')).toBeInTheDocument();
      expect(screen.getByText('Prosseguir para Revisão')).toBeInTheDocument();
    });
  });

  describe('confirmation step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Complete first step
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );
      await user.click(screen.getByText('Confirmar Dados e Continuar'));

      // Complete second step
      await user.click(screen.getByText('Prosseguir para Revisão'));
    });

    it('should show confirmation details', () => {
      expect(screen.getByText('📱 Revisão e Envio ao WhatsApp')).toBeInTheDocument();
      expect(screen.getByText('O que acontece quando finalizar?')).toBeInTheDocument();
    });

    it('should display order summary', () => {
      expect(screen.getByText('Resumo do Pedido')).toBeInTheDocument();
      expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    it('should show total price', () => {
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getAllByText('R$ 150,00')[0]).toBeInTheDocument();
    });

    it('should display climbing date', () => {
      expect(screen.getAllByText('Data da Escalada')[0]).toBeInTheDocument();
    });

    it('should have finalize purchase button', () => {
      expect(screen.getByText('📱 Enviar para WhatsApp e Finalizar')).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('should go back to cart when back button is clicked on first step', () => {
      render(<CheckoutForm {...defaultProps} />);

      fireEvent.click(screen.getByText('Voltar ao Carrinho'));

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should navigate between steps correctly', async () => {
      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Fill first step
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );

      // Go to step 2
      await user.click(screen.getByText('Confirmar Dados e Continuar'));
      expect(screen.getByText('O que acontece nesta etapa?')).toBeInTheDocument();

      // Go back to step 1
      await user.click(screen.getByText('Anterior'));
      expect(screen.getByText('Por que coletamos esses dados?')).toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('should show alert when user is not authenticated', async () => {
      // Mock useAuth to return not logged in
      mockUseAuth.mockReturnValue({
        user: null,
        isLoggedIn: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Complete all steps
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );
      await user.click(screen.getByText('Confirmar Dados e Continuar'));
      await user.click(screen.getByText('Prosseguir para Revisão'));

      await user.click(screen.getByText('📱 Enviar para WhatsApp e Finalizar'));

      expect(global.alert).toHaveBeenCalledWith('Usuário não autenticado');
    });

    it('should disable submit button while submitting', async () => {
      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Complete all steps
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );
      await user.click(screen.getByText('Confirmar Dados e Continuar'));
      await user.click(screen.getByText('Prosseguir para Revisão'));

      const finalizeButton = screen.getByText('📱 Enviar para WhatsApp e Finalizar');

      expect(finalizeButton).not.toBeDisabled();

      // Submit the form
      fireEvent.click(finalizeButton);

      // Button should become disabled
      expect(finalizeButton).toBeDisabled();
    });
  });

  describe('step validation', () => {
    it('should validate participant details step correctly', async () => {
      const user = userEvent.setup();
      render(<CheckoutForm {...defaultProps} />);

      // Initially next should be disabled
      expect(screen.getByText('Confirmar Dados e Continuar')).toBeDisabled();

      // Fill partial form
      await user.type(screen.getByLabelText(/Nome Completo/), 'João Silva');
      await user.type(screen.getByLabelText(/Idade/), '25');

      // Still disabled
      expect(screen.getByText('Confirmar Dados e Continuar')).toBeDisabled();

      // Complete required fields
      await user.selectOptions(screen.getByLabelText(/Nível de Experiência/), 'beginner');

      await user.click(
        screen.getByLabelText(
          /Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva/
        )
      );

      // Now enabled
      expect(screen.getByText('Confirmar Dados e Continuar')).not.toBeDisabled();
    });
  });
});
