'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { ArrowLeft, Calendar, AlertTriangle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { CreateOrder } from '@/core/use-cases/orders/CreateOrder';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';
import { CartItem } from '@/types';
import { ParticipantDetails, ClimbingDetails } from '@/core/entities/Order';
import { PaymentMethod } from '@/core/entities/Coupon';
import { AVAILABLE_DATES } from '@/lib/constants';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CouponInput } from './CouponInput';
import { CouponService } from '@/infrastructure/services/CouponService';
import { ValidateCoupon } from '@/core/use-cases/coupons/ValidateCoupon';
import { PaymentProcessingModal } from './PaymentProcessingModal';
import { PaymentRetryModal } from './PaymentRetryModal';

interface CheckoutFormProps {
  cartItems: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

interface FormData {
  participantDetails: Record<string, ParticipantDetails>;
  climbingDetails: ClimbingDetails;
  paymentMethod: PaymentMethod | null;
  appliedCoupon?: {
    code: string;
    discountAmount: number;
    finalAmount: number;
  };
}

interface PixModalData {
  qr_code_base64: string;
  ticket_url: string;
  expires_at: Date;
  amount: number;
}

interface CryptoModalData {
  address: string;
  amount: number;
  amountFiat: number;
  cryptoType: 'bitcoin' | 'usdt';
  exchangeRate: number;
  expiresAt: Date;
}

export function CheckoutForm({ cartItems, onBack, onSuccess }: CheckoutFormProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [pixModalData, setPixModalData] = useState<PixModalData | null>(null);
  const [cryptoModalData, setCryptoModalData] = useState<CryptoModalData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [processingError, setProcessingError] = useState<string | undefined>();
  const [retryCount, setRetryCount] = useState(0);
  const [lastOrderData, setLastOrderData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    participantDetails: {},
    climbingDetails: {
      selectedDate: new Date(AVAILABLE_DATES.singleDateISO + 'T12:00:00'),
      specialRequests: '',
      dietaryRestrictions: [],
    },
    paymentMethod: null,
  });

  const steps = [
    'Dados dos Participantes', 
    'Confirmação de Data', 
    'Cupom de Desconto',
    'Método de Pagamento',
    'Revisão Final'
  ];

  const subtotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalPrice = formData.appliedCoupon?.finalAmount || subtotalPrice;

  // Coupon service instance
  const couponService = new CouponService();
  const validateCouponUseCase = new ValidateCoupon(couponService);

  const handleParticipantDetailsChange = (
    itemId: string,
    field: keyof ParticipantDetails | string,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      participantDetails: {
        ...prev.participantDetails,
        [itemId]: {
          ...prev.participantDetails[itemId],
          [field]: value,
        },
      },
    }));
  };

  const handleClimbingDetailsChange = (field: keyof ClimbingDetails, value: any) => {
    setFormData(prev => ({
      ...prev,
      climbingDetails: {
        ...prev.climbingDetails,
        [field]: value,
      },
    }));
  };

  const handleCouponApply = async (couponCode: string) => {
    try {
      const result = await validateCouponUseCase.execute({
        couponCode,
        orderAmount: subtotalPrice,
        paymentMethod: formData.paymentMethod || undefined,
        userId: user?.id
      });

      if (result.isValid && result.discountAmount && result.finalAmount) {
        setFormData(prev => ({
          ...prev,
          appliedCoupon: {
            code: couponCode,
            discountAmount: result.discountAmount!,
            finalAmount: result.finalAmount!
          }
        }));

        return {
          success: true,
          discountAmount: result.discountAmount,
          finalAmount: result.finalAmount
        };
      } else {
        return {
          success: false,
          error: result.error || 'Erro ao aplicar cupom'
        };
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      return {
        success: false,
        error: 'Erro interno ao aplicar cupom'
      };
    }
  };

  const handleCouponRemove = () => {
    setFormData(prev => ({
      ...prev,
      appliedCoupon: undefined
    }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Participant details
        return cartItems.every(item => {
          const details = formData.participantDetails[item.id];
          return (
            details &&
            details.name &&
            details.age &&
            details.experienceLevel &&
            details.healthDeclaration
          );
        });
      case 1: // Climbing details
        return (
          formData.climbingDetails.selectedDate &&
          formData.climbingDetails.selectedDate.toISOString().split('T')[0] ===
            AVAILABLE_DATES.singleDateISO
        );
      case 2: // Coupon (optional step)
        return true;
      case 3: // Payment method
        return formData.paymentMethod !== null;
      case 4: // Final review
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Validate payment data before submission
  const validatePaymentData = (): { isValid: boolean; error?: string } => {
    if (!user) {
      return { isValid: false, error: 'Usuário não autenticado. Por favor, faça login novamente.' };
    }

    if (!formData.paymentMethod) {
      return { isValid: false, error: 'Por favor, selecione um método de pagamento.' };
    }

    if (finalPrice <= 0) {
      return { isValid: false, error: 'Valor total inválido. Por favor, verifique os itens do carrinho.' };
    }

    // Validate participant details
    for (const item of cartItems) {
      const details = formData.participantDetails[item.id];
      if (!details?.name || !details?.age || !details?.experienceLevel || !details?.healthDeclaration) {
        return { isValid: false, error: 'Por favor, preencha todos os dados dos participantes.' };
      }
    }

    // Validate climbing details
    if (!formData.climbingDetails.selectedDate) {
      return { isValid: false, error: 'Por favor, selecione uma data para a escalada.' };
    }

    return { isValid: true };
  };

  // Handle payment method specific validation and processing
  const processPayment = async (result: any): Promise<{ success: boolean; error?: string }> => {
    if (!result.success || !formData.paymentMethod) {
      return { success: false, error: result.error || 'Erro ao processar pagamento.' };
    }

    try {
      switch (formData.paymentMethod) {
        case 'whatsapp':
          if (!result.whatsappUrl) {
            return { success: false, error: 'Link do WhatsApp não gerado.' };
          }
          onSuccess();
          window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
          return { success: true };

        case 'mercadopago':
          if (!result.checkoutUrl) {
            return { success: false, error: 'URL de checkout não gerada.' };
          }
          window.location.href = result.checkoutUrl;
          return { success: true };

        case 'pix':
          if (!result.pixPayment?.qr_code_base64) {
            return { success: false, error: 'QR Code PIX não gerado.' };
          }
          // Show PIX QR code modal
          setPixModalData(result.pixPayment);
          setShowPixModal(true);
          return { success: true };

        case 'bitcoin':
        case 'usdt':
          if (!result.cryptoPayment?.address || !result.cryptoPayment?.amount) {
            return { success: false, error: 'Dados de pagamento em crypto não gerados.' };
          }
          // Show crypto payment modal
          setCryptoModalData(result.cryptoPayment);
          setShowCryptoModal(true);
          return { success: true };

        case 'github':
          if (!result.githubPayment?.sponsorshipUrl) {
            return { success: false, error: 'URL do GitHub Sponsors não gerada.' };
          }
          onSuccess();
          window.open(result.githubPayment.sponsorshipUrl, '_blank', 'noopener,noreferrer');
          return { success: true };

        default:
          return { success: false, error: 'Método de pagamento não suportado.' };
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return { success: false, error: 'Erro ao processar pagamento. Por favor, tente novamente.' };
    }
  };

  const createAndProcessOrder = async (orderData: any) => {
    const orderRepository = new OrderRepository();
    const createOrderUseCase = new CreateOrder(orderRepository);

    // Create order
    const result = await createOrderUseCase.execute(orderData);

    // Process payment
    const paymentResult = await processPayment(result);
    if (!paymentResult.success) {
      throw new Error(paymentResult.error);
    }

    return result;
  };

  const handlePaymentRetry = async () => {
    if (!lastOrderData) return;

    setShowRetryModal(false);
    setShowProcessingModal(true);
    setPaymentStatus('processing');
    setIsSubmitting(true);

    try {
      const result = await createAndProcessOrder(lastOrderData);

      // Payment initiated successfully
      setPaymentStatus('success');
      setRetryCount(0); // Reset retry count on success
      
      // For payment methods that don't redirect immediately
      if (['pix', 'bitcoin', 'usdt'].includes(formData.paymentMethod!)) {
        setTimeout(() => {
          setShowProcessingModal(false);
        }, 2000);
      }

    } catch (error) {
      console.error('Error retrying payment:', error);
      setRetryCount(prev => prev + 1);
      setPaymentStatus('error');
      setProcessingError(error instanceof Error ? error.message : 'Erro ao processar pedido. Por favor, tente novamente.');
      setShowProcessingModal(false);
      setShowRetryModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePaymentMethod = () => {
    setShowRetryModal(false);
    setCurrentStep(3); // Go back to payment method selection
    setRetryCount(0); // Reset retry count
  };

  const handleSubmit = async () => {
    // Validate payment data
    const validation = validatePaymentData();
    if (!validation.isValid) {
      setPaymentStatus('error');
      setProcessingError(validation.error);
      setShowProcessingModal(true);
      return;
    }

    setIsSubmitting(true);
    setPaymentStatus('processing');
    setShowProcessingModal(true);

    try {
      // Prepare order data
      const orderData = {
        userId: user!.id,
        cartItems,
        participantDetails: formData.participantDetails,
        climbingDetails: formData.climbingDetails,
        paymentMethod: formData.paymentMethod!,
        appliedCoupon: formData.appliedCoupon ? {
          code: formData.appliedCoupon.code,
          discountAmount: formData.appliedCoupon.discountAmount
        } : undefined
      };

      // Store order data for potential retries
      setLastOrderData(orderData);

      const result = await createAndProcessOrder(orderData);

      // Payment initiated successfully
      setPaymentStatus('success');
      
      // For payment methods that don't redirect immediately
      if (['pix', 'bitcoin', 'usdt'].includes(formData.paymentMethod!)) {
        // Keep the processing modal open briefly to show success state
        setTimeout(() => {
          setShowProcessingModal(false);
          // Redirect to confirmation page
          window.location.href = `/checkout/confirmation?orderId=${result.orderId}&method=${formData.paymentMethod}&status=pending`;
        }, 2000);
      } else if (formData.paymentMethod === 'whatsapp') {
        // WhatsApp payments are handled through chat
        window.location.href = `/checkout/confirmation?orderId=${result.orderId}&method=whatsapp&status=pending`;
      } else if (formData.paymentMethod === 'github') {
        // GitHub payments redirect to GitHub Sponsors
        window.location.href = `/checkout/confirmation?orderId=${result.orderId}&method=github&status=pending`;
      } else if (formData.paymentMethod === 'mercadopago') {
        // MercadoPago redirects to their checkout
        window.location.href = `/checkout/confirmation?orderId=${result.orderId}&method=mercadopago&status=pending`;
      }

    } catch (error) {
      console.error('Error in payment flow:', error);
      setPaymentStatus('error');
      setProcessingError(error instanceof Error ? error.message : 'Erro ao processar pedido. Por favor, tente novamente.');
      setShowProcessingModal(false);
      setShowRetryModal(true);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ParticipantDetailsStep
            cartItems={cartItems}
            participantDetails={formData.participantDetails}
            onChange={handleParticipantDetailsChange}
          />
        );
      case 1:
        return (
          <ClimbingDetailsStep
            climbingDetails={formData.climbingDetails}
            onChange={handleClimbingDetailsChange}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">🎟️ Cupom de Desconto (Opcional)</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Tem um cupom de desconto? Aplique agora para economizar!
              </p>
            </div>
            <CouponInput
              onCouponApply={handleCouponApply}
              onCouponRemove={handleCouponRemove}
              appliedCoupon={formData.appliedCoupon}
            />
          </div>
        );
      case 3:
        return (
          <PaymentMethodSelector
            selectedMethod={formData.paymentMethod}
            onMethodChange={handlePaymentMethodChange}
            totalAmount={subtotalPrice}
            discountedAmount={finalPrice}
          />
        );
      case 4:
        return (
          <FinalReviewStep
            cartItems={cartItems}
            participantDetails={formData.participantDetails}
            climbingDetails={formData.climbingDetails}
            paymentMethod={formData.paymentMethod}
            subtotalPrice={subtotalPrice}
            appliedCoupon={formData.appliedCoupon}
            finalPrice={finalPrice}
          />
        );
      default:
        return null;
    }
  };

  const handleProcessingModalClose = () => {
    setShowProcessingModal(false);
    setPaymentStatus('processing');
    setProcessingError(undefined);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Payment Processing Modal */}
      <PaymentProcessingModal
        isOpen={showProcessingModal}
        status={paymentStatus}
        paymentMethod={formData.paymentMethod || ''}
        errorMessage={processingError}
        onClose={handleProcessingModalClose}
      />

      {/* Payment Retry Modal */}
      <PaymentRetryModal
        isOpen={showRetryModal}
        onClose={() => setShowRetryModal(false)}
        onRetry={handlePaymentRetry}
        onChangeMethod={handleChangePaymentMethod}
        paymentMethod={formData.paymentMethod!}
        error={processingError || 'Erro desconhecido'}
        retryCount={retryCount}
        maxRetries={3}
      />

      {/* Progress Steps */}
      <div className="border-b border-neutral-200 px-4 py-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index === currentStep
                  ? 'font-medium text-climb-600'
                  : index < currentStep
                    ? 'text-climb-500'
                    : 'text-neutral-400'
              }`}
            >
              <div
                className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs ${
                  index === currentStep
                    ? 'border-climb-600 bg-climb-50'
                    : index < currentStep
                      ? 'border-climb-500 bg-climb-500 text-white'
                      : 'border-neutral-300'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="hidden sm:inline">{step}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-2 w-full rounded-full bg-neutral-200">
          <div
            className="h-2 rounded-full bg-climb-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-4">{renderStepContent()}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-neutral-200 p-4">
        <Button
          variant="ghost"
          onClick={currentStep === 0 ? onBack : handlePrevious}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          {currentStep === 0 ? 'Voltar ao Carrinho' : 'Anterior'}
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button 
            onClick={handleNext} 
            disabled={!validateStep(currentStep)}
          >
            {currentStep === 2 ? 'Continuar' : 'Próximo'}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!validateStep(currentStep)}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Processando...' : '🚀 Finalizar Pedido'}
          </Button>
        )}
      </div>
    </div>
  );
}

// Step Components (reusing existing ones with minor modifications)
function ParticipantDetailsStep({ cartItems, participantDetails, onChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">📋 Dados dos Participantes</h3>
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-2 text-sm font-medium text-blue-800">Por que coletamos esses dados?</p>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• <strong>Segurança:</strong> Contato de emergência e condições de saúde</li>
            <li>• <strong>Planejamento:</strong> Nível de experiência para adequar a atividade</li>
            <li>• <strong>Comunicação:</strong> Dados serão enviados ao nosso WhatsApp para coordenação</li>
          </ul>
        </div>
      </div>

      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="rounded-lg border border-neutral-200 p-4">
          <h4 className="mb-3 font-medium">{item.packageName}</h4>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Nome Completo *
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.name || ''}
                onChange={e => onChange(item.id, 'name', e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Idade *
              </label>
              <input
                type="number"
                min="12"
                max="99"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.age || ''}
                onChange={e => onChange(item.id, 'age', parseInt(e.target.value))}
                placeholder="Idade"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Nível de Experiência *
              </label>
              <select
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.experienceLevel || ''}
                onChange={e => onChange(item.id, 'experienceLevel', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
                <option value="minha_primeira_vez">Minha primeira vez</option>
              </select>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id={`health-${item.id}`}
                className="mt-1"
                checked={participantDetails[item.id]?.healthDeclaration || false}
                onChange={e => onChange(item.id, 'healthDeclaration', e.target.checked)}
              />
              <label htmlFor={`health-${item.id}`} className="text-sm text-neutral-700">
                Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva. *
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClimbingDetailsStep({ climbingDetails, onChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">📅 Confirmação de Data e Detalhes</h3>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          <Calendar className="mr-1 inline h-4 w-4" />
          Data da Escalada *
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full cursor-not-allowed rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-neutral-700"
            value={AVAILABLE_DATES.singleDateDisplay}
            disabled
            readOnly
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Disponível
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Solicitações Especiais (Opcional)
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
          value={climbingDetails.specialRequests || ''}
          onChange={e => onChange('specialRequests', e.target.value)}
          placeholder="Descreva qualquer solicitação especial, restrição alimentar, preferência de horário, ou informação importante que nossa equipe deve saber..."
        />
      </div>
    </div>
  );
}

function FinalReviewStep({ 
  cartItems, 
  participantDetails, 
  climbingDetails, 
  paymentMethod, 
  subtotalPrice, 
  appliedCoupon, 
  finalPrice 
}: any) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount / 100);
  };

  const getPaymentMethodName = (method: PaymentMethod | null) => {
    switch (method) {
      case 'mercadopago': return 'Cartão de Crédito';
      case 'pix': return 'PIX';
      case 'bitcoin': return 'Bitcoin';
      case 'usdt': return 'USDT';
      case 'whatsapp': return 'WhatsApp';
      default: return 'Não selecionado';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">📋 Revisão Final</h3>
        <p className="text-sm text-neutral-600">
          Revise todos os dados antes de finalizar seu pedido.
        </p>
      </div>

      {/* Order Summary */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h4 className="mb-3 font-medium">Resumo do Pedido</h4>
        {cartItems.map((item: CartItem) => (
          <div key={item.id} className="flex items-center justify-between border-b py-2 last:border-b-0">
            <div>
              <p className="font-medium">{item.packageName}</p>
              <p className="text-sm text-neutral-600">{participantDetails[item.id]?.name}</p>
            </div>
            <p className="font-semibold text-climb-600">{formatPrice(item.price)}</p>
          </div>
        ))}
        
        <div className="mt-3 space-y-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotalPrice)}</span>
          </div>
          
          {appliedCoupon && (
            <div className="flex items-center justify-between text-green-600">
              <span>Desconto ({appliedCoupon.code}):</span>
              <span>-{formatPrice(appliedCoupon.discountAmount)}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-climb-600">{formatPrice(finalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h4 className="mb-2 font-medium">Método de Pagamento</h4>
        <p className="text-neutral-700">{getPaymentMethodName(paymentMethod)}</p>
      </div>

      {/* Climbing Date */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h4 className="mb-2 font-medium">Data da Escalada</h4>
        <p className="text-neutral-700">
          {climbingDetails.selectedDate?.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {climbingDetails.specialRequests && (
          <div className="mt-2">
            <p className="text-sm font-medium text-neutral-700">Solicitações Especiais:</p>
            <p className="text-sm text-neutral-600">{climbingDetails.specialRequests}</p>
          </div>
        )}
      </div>
    </div>
  );
}
