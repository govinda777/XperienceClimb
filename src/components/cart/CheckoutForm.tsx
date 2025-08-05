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

  const steps = ['Dados dos Participantes', 'Confirmação de Data', 'Revisão e Envio ao WhatsApp'];

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

        {/* Step Progress Description */}
        <div className="text-xs text-neutral-600">
          {currentStep === 0 && (
            <p>📝 Coletando informações de segurança e contato dos participantes</p>
          )}
          {currentStep === 1 && <p>📅 Confirmando detalhes da escalada e solicitações especiais</p>}
          {currentStep === 2 && (
            <p>📱 Revisando dados que serão enviados ao WhatsApp para finalizar reserva</p>
          )}
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
          <Button onClick={handleNext} disabled={!validateStep(currentStep)}>
            {currentStep === 0 ? 'Confirmar Dados e Continuar' : 'Prosseguir para Revisão'}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!validateStep(currentStep)}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Enviando para WhatsApp...' : '📱 Enviar para WhatsApp e Finalizar'}
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
        <h3 className="mb-2 text-lg font-semibold">📋 Dados dos Participantes</h3>
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-2 text-sm font-medium text-blue-800">Por que coletamos esses dados?</p>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>
              • <strong>Segurança:</strong> Contato de emergência e condições de saúde
            </li>
            <li>
              • <strong>Planejamento:</strong> Nível de experiência para adequar a atividade
            </li>
            <li>
              • <strong>Comunicação:</strong> Dados serão enviados ao nosso WhatsApp para
              coordenação
            </li>
          </ul>
        </div>
        <p className="mb-4 text-sm text-neutral-600">
          ⚠️ Todos esses dados serão incluídos na mensagem enviada ao nosso WhatsApp para finalizar
          sua reserva.
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
                <option value="minha_primeira_vez">Minha primeira vez</option>
              </select>
            </div>

            {/* WhatsApp */}
            <label
              htmlFor={`whatsapp-${item.id}`}
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              WhatsApp
            </label>
            <input
              id={`whatsapp-${item.id}`}
              type="text"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
              value={participantDetails[item.id]?.whatsapp || ''}
              onChange={e => onChange(item.id, 'whatsapp', e.target.value)}
              placeholder="(11) 99999-9999"
            />

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
        <h3 className="mb-2 text-lg font-semibold">📅 Confirmação de Data e Detalhes</h3>
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="mb-2 text-sm font-medium text-green-800">O que acontece nesta etapa?</p>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Confirmação da data única disponível</li>
            <li>• Solicitações especiais (dietas, limitações, etc.)</li>
            <li>• Essas informações serão enviadas ao WhatsApp junto com seus dados</li>
          </ul>
        </div>
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
        <textarea
          rows={4}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-climb-500"
          value={climbingDetails.specialRequests || ''}
          onChange={e => onChange('specialRequests', e.target.value)}
          placeholder="Descreva qualquer solicitação especial, restrição alimentar, preferência de horário, ou informação importante que nossa equipe deve saber..."
        />

        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Solicitações Especiais (Opcional)
        </label>
        <div className="mb-2 mt-2 text-xs text-neutral-600">
          <p className="mb-1">💡 Exemplos do que você pode incluir:</p>
          <ul className="ml-4 list-disc space-y-0.5">
            <li>Restrições alimentares ou alergias</li>
            <li>Limitações físicas temporárias</li>
            <li>Preferências sobre nivel de dificuldade</li>
            <li>Outras informações importantes</li>
          </ul>
        </div>
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
  // Simula a mensagem que será enviada ao WhatsApp
  const generateWhatsAppPreview = () => {
    let preview = `🧗‍♂️ NOVA RESERVA CONFIRMADA 🧗‍♂️\n\n`;
    preview += `📋 Dados do Pedido:\n`;
    preview += `• Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}\n`;
    preview += `• Status: Aguardando Pagamento\n\n`;

    preview += `📅 Detalhes da Escalada:\n`;
    preview += `• Data: ${climbingDetails.selectedDate?.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}\n`;
    if (climbingDetails.specialRequests) {
      preview += `• Solicitações especiais: ${climbingDetails.specialRequests}\n`;
    }
    preview += '\n';

    preview += `👥 Participantes (${cartItems.length}):\n`;
    cartItems.forEach((item: any, index: number) => {
      const participant = participantDetails[item.id];
      if (participant) {
        preview += `\n${index + 1}. ${participant.name}\n`;
        preview += `   • Pacote: ${item.packageName}\n`;
        preview += `   • Idade: ${participant.age || 'Não informado'} anos\n`;
        preview += `   • Nível: ${participant.experienceLevel || 'Não informado'}\n`;
        preview += `   • Declaração saúde: ${participant.healthDeclaration ? '✅ Sim' : '❌ Não'}\n`;
      }
    });

    return preview;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">📱 Revisão e Envio ao WhatsApp</h3>
        <div className="mb-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <p className="mb-2 text-sm font-medium text-purple-800">
            O que acontece quando finalizar?
          </p>
          <ul className="space-y-1 text-sm text-purple-700">
            <li>•⁠ ⁠Seu pedido será direcionado ao nosso WhatsApp automaticamente.</li>
            <li>•⁠ ⁠Nossa equipe receberá todas as informações de sua reserva.</li>
            <li>
              •⁠ ⁠Confirmaremos contigo os detalhes de sua reserva. Nesse momento você poderá
              esclarecer dúvidas e poderemos nos conhecer melhor!
            </li>
            <li>•⁠ ⁠Assim que tudo estiver ok, enviaremos um link de pagamento.</li>
          </ul>
        </div>
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

      {/* WhatsApp Message Preview */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <h4 className="mb-3 font-medium text-green-800">
          📱 Preview da Mensagem que será enviada ao WhatsApp:
        </h4>
        <div className="max-h-64 overflow-y-auto whitespace-pre-line rounded-md border bg-white p-3 font-mono text-xs">
          {generateWhatsAppPreview()}
        </div>
        <p className="mt-2 text-xs text-green-700">
          ✅ Esta mensagem será enviada automaticamente para nossa equipe quando você finalizar a
          compra.
        </p>
      </div>
    </div>
  );
}
