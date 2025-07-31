'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { ArrowLeft, Calendar, User, Phone, AlertTriangle } from 'lucide-react';
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
      selectedDate: new Date(AVAILABLE_DATES.singleDateISO),
      specialRequests: '',
      dietaryRestrictions: []
    }
  });

  const steps = [
    'Detalhes dos Participantes',
    'Data da Escalada',
    'Confirmação'
  ];

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleParticipantDetailsChange = (itemId: string, field: keyof ParticipantDetails | string, value: any) => {
    setFormData(prev => ({
      ...prev,
      participantDetails: {
        ...prev.participantDetails,
        [itemId]: {
          ...prev.participantDetails[itemId],
          [field]: value
        }
      }
    }));
  };

  const handleClimbingDetailsChange = (field: keyof ClimbingDetails, value: any) => {
    setFormData(prev => ({
      ...prev,
      climbingDetails: {
        ...prev.climbingDetails,
        [field]: value
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Participant details
        return cartItems.every(item => {
          const details = formData.participantDetails[item.id];
          return details && 
                 details.name && 
                 details.emergencyContact?.name && 
                 details.emergencyContact?.phone &&
                 details.healthDeclaration;
        });
      case 1: // Climbing details
        return formData.climbingDetails.selectedDate &&
               formData.climbingDetails.selectedDate.toISOString().split('T')[0] === AVAILABLE_DATES.singleDateISO;
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
        climbingDetails: formData.climbingDetails
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
    <div className="flex flex-col h-full">
      {/* Progress Steps */}
      <div className="px-4 py-3 border-b border-neutral-200">
        <div className="flex items-center justify-between text-sm">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index === currentStep ? 'text-climb-600 font-medium' : 
                index < currentStep ? 'text-climb-500' : 'text-neutral-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs mr-2 ${
                index === currentStep ? 'border-climb-600 bg-climb-50' :
                index < currentStep ? 'border-climb-500 bg-climb-500 text-white' : 'border-neutral-300'
              }`}>
                {index + 1}
              </div>
              <span className="hidden sm:inline">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="border-t border-neutral-200 p-4 flex items-center justify-between">
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
        <h3 className="text-lg font-semibold mb-2">Detalhes dos Participantes</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Preencha os dados de cada participante para garantir a segurança da atividade.
        </p>
      </div>

      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="border border-neutral-200 rounded-lg p-4">
          <h4 className="font-medium mb-3">{item.packageName}</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.name || ''}
                onChange={(e) => onChange(item.id, 'name', e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Idade *
              </label>
              <input
                type="number"
                min="12"
                max="99"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.age || ''}
                onChange={(e) => onChange(item.id, 'age', parseInt(e.target.value))}
                placeholder="Idade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Nível de Experiência *
              </label>
              <select
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.experienceLevel || ''}
                onChange={(e) => onChange(item.id, 'experienceLevel', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Contato de Emergência - Nome *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.emergencyContact?.name || ''}
                onChange={(e) => onChange(item.id, 'emergencyContact', { 
                  ...participantDetails[item.id]?.emergencyContact, 
                  name: e.target.value 
                })}
                placeholder="Nome do contato de emergência"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Contato de Emergência - Telefone *
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500"
                value={participantDetails[item.id]?.emergencyContact?.phone || ''}
                onChange={(e) => onChange(item.id, 'emergencyContact', { 
                  ...participantDetails[item.id]?.emergencyContact, 
                  phone: e.target.value 
                })}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id={`health-${item.id}`}
                className="mt-1"
                checked={participantDetails[item.id]?.healthDeclaration || false}
                onChange={(e) => onChange(item.id, 'healthDeclaration', e.target.checked)}
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
        <h3 className="text-lg font-semibold mb-2">Data da Escalada</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Data única disponível para sua experiência de escalada.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          <Calendar className="inline h-4 w-4 mr-1" />
          Data da Escalada *
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-neutral-50 text-neutral-700 cursor-not-allowed"
            value={AVAILABLE_DATES.singleDateDisplay}
            disabled
            readOnly
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Disponível
            </div>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Data única disponível: {AVAILABLE_DATES.singleDateDisplay}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Solicitações Especiais (Opcional)
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500"
          value={climbingDetails.specialRequests || ''}
          onChange={(e) => onChange('specialRequests', e.target.value)}
          placeholder="Alguma solicitação especial ou informação importante?"
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 mb-1">Informações Importantes:</p>
            <ul className="text-amber-700 space-y-1">
              <li>• Atividade sujeita às condições climáticas</li>
              <li>• Cancelamento gratuito até 24h antes</li>
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
        <h3 className="text-lg font-semibold mb-2">Confirmação do Pedido</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Revise todos os detalhes antes de finalizar sua compra.
        </p>
      </div>

      {/* Order Summary */}
      <div className="border border-neutral-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">Resumo do Pedido</h4>
        {cartItems.map((item: CartItem) => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div>
              <p className="font-medium">{item.packageName}</p>
              <p className="text-sm text-neutral-600">
                {participantDetails[item.id]?.name}
              </p>
            </div>
            <p className="font-semibold text-climb-600">{formatPrice(item.price)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center pt-3 font-semibold text-lg">
          <span>Total:</span>
          <span className="text-climb-600">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Climbing Date */}
      <div className="border border-neutral-200 rounded-lg p-4">
        <h4 className="font-medium mb-2">Data da Escalada</h4>
        <p className="text-neutral-700">
          {climbingDetails.selectedDate?.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
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