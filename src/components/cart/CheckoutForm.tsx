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
import { AVAILABLE_DATES } from '@/lib/constants';

interface CheckoutFormProps {
  cartItems: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

interface FormData {
  participantDetails: Record<string, ParticipantDetails>;
  climbingDetails: ClimbingDetails;
}

export function CheckoutForm({ cartItems, onBack, onSuccess }: CheckoutFormProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    participantDetails: {},
    climbingDetails: {
      selectedDate: new Date(AVAILABLE_DATES.singleDateISO + 'T12:00:00'),
      specialRequests: '',
      dietaryRestrictions: [],
    },
  });

  const steps = ['Detalhes dos Participantes', 'Data da Escalada', 'Confirmação'];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Participant details
        return cartItems.every(item => {
          const details = formData.participantDetails[item.id];
          return (
            details &&
            details.name &&
            details.emergencyContact?.name &&
            details.emergencyContact?.phone &&
            details.healthDeclaration
          );
        });
      case 1: // Climbing details
        return (
          formData.climbingDetails.selectedDate &&
          formData.climbingDetails.selectedDate.toISOString().split('T')[0] ===
            AVAILABLE_DATES.singleDateISO
        );
      case 2: // Confirmation
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

  const handleSubmit = async () => {
    if (!user) {
      alert('Usuário não autenticado');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderRepository = new OrderRepository();
      const createOrderUseCase = new CreateOrder(orderRepository);

      const result = await createOrderUseCase.execute({
        userId: user.id,
        cartItems,
        participantDetails: formData.participantDetails,
        climbingDetails: formData.climbingDetails,
      });

      if (result.success) {
        if (result.whatsappUrl) {
          // Close checkout modal first
          onSuccess();

          // Create invisible link and auto-click to avoid popup blockers
          const link = document.createElement('a');
          link.href = result.whatsappUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (result.checkoutUrl) {
          // Fallback to Mercado Pago if WhatsApp fails
          window.location.href = result.checkoutUrl;
        }
      } else {
        alert(result.error || 'Erro ao processar pedido');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erro ao processar pedido. Tente novamente.');
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
          <ConfirmationStep
            cartItems={cartItems}
            participantDetails={formData.participantDetails}
            climbingDetails={formData.climbingDetails}
            totalPrice={totalPrice}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Progress Steps */}
      <div className="border-b border-neutral-200 px-4 py-3">
        <div className="flex items-center justify-between text-sm">
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
                {index + 1}
              </div>
              <span className="hidden sm:inline">{step}</span>
            </div>
          ))}
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
          <Button onClick={handleNext} disabled={!validateStep(currentStep)}>
            Próximo
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!validateStep(currentStep)}
          >
            Finalizar Compra
          </Button>
        )}
      </div>
    </div>
  );
}

// Step Components
function ParticipantDetailsStep({ cartItems, participantDetails, onChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Detalhes dos Participantes</h3>
        <p className="mb-4 text-sm text-neutral-600">
          Preencha os dados de cada participante para garantir a segurança da atividade.
        </p>
      </div>

      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="rounded-lg border border-neutral-200 p-4">
          <h4 className="mb-3 font-medium">{item.packageName}</h4>

          <div className="space-y-4">
            <div>
              <label
                htmlFor={`name-${item.id}`}
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Nome Completo *
              </label>
              <input
                id={`name-${item.id}`}
                type="text"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.name || ''}
                onChange={e => onChange(item.id, 'name', e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label
                htmlFor={`age-${item.id}`}
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Idade *
              </label>
              <input
                id={`age-${item.id}`}
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
              <label
                htmlFor={`experience-${item.id}`}
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Nível de Experiência *
              </label>
              <select
                id={`experience-${item.id}`}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.experienceLevel || ''}
                onChange={e => onChange(item.id, 'experienceLevel', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`emergency-name-${item.id}`}
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Contato de Emergência - Nome *
              </label>
              <input
                id={`emergency-name-${item.id}`}
                type="text"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.emergencyContact?.name || ''}
                onChange={e =>
                  onChange(item.id, 'emergencyContact', {
                    ...participantDetails[item.id]?.emergencyContact,
                    name: e.target.value,
                  })
                }
                placeholder="Nome do contato de emergência"
              />
            </div>

            <div>
              <label
                htmlFor={`emergency-phone-${item.id}`}
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Contato de Emergência - Telefone *
              </label>
              <input
                id={`emergency-phone-${item.id}`}
                type="tel"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.emergencyContact?.phone || ''}
                onChange={e =>
                  onChange(item.id, 'emergencyContact', {
                    ...participantDetails[item.id]?.emergencyContact,
                    phone: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
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
                Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva.
                *
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
        <h3 className="mb-2 text-lg font-semibold">Data da Escalada</h3>
        <p className="mb-4 text-sm text-neutral-600">
          Data única disponível para sua experiência de escalada.
        </p>
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
        <p className="mt-1 text-xs text-neutral-500">
          Data única disponível: {AVAILABLE_DATES.singleDateDisplay}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Solicitações Especiais (Opcional)
        </label>
        <textarea
          rows={3}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
          value={climbingDetails.specialRequests || ''}
          onChange={e => onChange('specialRequests', e.target.value)}
          placeholder="Alguma solicitação especial ou informação importante?"
        />
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
          <div className="text-sm">
            <p className="mb-1 font-medium text-amber-800">Informações Importantes:</p>
            <ul className="space-y-1 text-amber-700">
              <li>• Atividade sujeita às condições climáticas</li>
              <li>• Equipamentos de segurança inclusos</li>
              <li>• Idade mínima: 12 anos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationStep({ cartItems, participantDetails, climbingDetails, totalPrice }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Confirmação do Pedido</h3>
        <p className="mb-4 text-sm text-neutral-600">
          Revise todos os detalhes antes de finalizar sua compra.
        </p>
      </div>

      {/* Order Summary */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h4 className="mb-3 font-medium">Resumo do Pedido</h4>
        {cartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-2 last:border-b-0"
          >
            <div>
              <p className="font-medium">{item.packageName}</p>
              <p className="text-sm text-neutral-600">{participantDetails[item.id]?.name}</p>
            </div>
            <p className="font-semibold text-climb-600">{formatPrice(item.price)}</p>
          </div>
        ))}
        <div className="flex items-center justify-between pt-3 text-lg font-semibold">
          <span>Total:</span>
          <span className="text-climb-600">{formatPrice(totalPrice)}</span>
        </div>
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
