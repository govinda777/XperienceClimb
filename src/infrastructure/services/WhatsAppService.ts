import { CONTACT_INFO } from '@/lib/constants';

export interface WhatsAppMessage {
  to: string;
  message: string;
}

export class WhatsAppService {
  private phoneNumber: string;

  constructor() {
    // Use contact info from constants, converting to WhatsApp format
    const defaultPhone = this.formatPhoneForWhatsApp(CONTACT_INFO.phone);
    this.phoneNumber = process.env.WHATSAPP_PHONE_NUMBER || defaultPhone;
  }

  private formatPhoneForWhatsApp(phone: string): string {
    // Convert "(11) 99999-9999" to "5511999999999"
    const cleanPhone = phone.replace(/\D/g, ''); // Remove all non-digits

    // If it's a Brazilian number without country code, add 55
    if (cleanPhone.length === 11 && cleanPhone.startsWith('11')) {
      return '55' + cleanPhone;
    }

    // If it's already complete or different format, return as is
    return cleanPhone;
  }

  async sendOrderConfirmation(orderData: any): Promise<void> {
    try {
      const message = this.formatOrderMessage(orderData);
      await this.sendMessage({
        to: this.phoneNumber,
        message,
      });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      // Don't throw to avoid breaking the webhook flow
    }
  }

  private formatOrderMessage(orderData: any): string {
    const { order, paymentData } = orderData;

    let message = `🧗‍♂️ *NOVA RESERVA CONFIRMADA* 🧗‍♂️\n\n`;

    // Order info
    message += `📋 *Dados do Pedido:*\n`;
    message += `• ID: ${order.id}\n`;
    message += `• Data: ${new Date(order.createdAt).toLocaleString('pt-BR')}\n`;
    message += `• Status: ${this.translateStatus(order.status)}\n`;
    message += `• Total: ${this.formatCurrency(order.total.amount)}\n\n`;

    // Payment info
    message += `💳 *Pagamento:*\n`;
    message += `• ID Transação: ${paymentData.id}\n`;
    message += `• Status: ${this.translatePaymentStatus(paymentData.status)}\n`;
    if (paymentData.status === 'pending_whatsapp') {
      message += `• Aguardando pagamento via WhatsApp\n\n`;
    } else {
      message += `• Aprovado em: ${new Date(paymentData.date_approved).toLocaleString('pt-BR')}\n\n`;
    }

    // Climbing details
    message += `📅 *Detalhes da Escalada:*\n`;
    message += `• Data: ${new Date(order.climbingDetails.selectedDate).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}\n`;

    if (order.climbingDetails.specialRequests) {
      message += `• Solicitações especiais: ${order.climbingDetails.specialRequests}\n`;
    }
    message += '\n';

    // Participants
    message += `👥 *Participantes (${order.items.length}):*\n`;
    order.items.forEach((item: any, index: number) => {
      const participant = item.participantDetails;
      message += `\n${index + 1}. *${participant.name}*\n`;
      message += `   • Pacote: ${item.packageName}\n`;
      message += `   • Idade: ${participant.age} anos\n`;
      message += `   • Nível: ${this.translateExperience(participant.experienceLevel)}\n`;
      message += `   • Declaração saúde: ${participant.healthDeclaration ? '✅ Sim' : '❌ Não'}\n`;
    });

    message += `\n🚨 *INFORMAÇÕES NECESSÁRIAS PARA COMPLETAR A RESERVA:*\n`;
    message += `Por favor, responda com as seguintes informações para cada participante:\n\n`;

    order.items.forEach((item: any, index: number) => {
      const participant = item.participantDetails;
      message += `*${index + 1}. ${participant.name}:*\n`;
      message += `• Número do tênis: ${participant.tenis || 'Não informado'}\n`;
      message += `• Nome do contato de emergência:\n`;
      message += `• Telefone do contato de emergência:\n`;
      message += `• Relacionamento (pai/mãe/cônjuge/etc):\n\n`;
    });

    message += `📱 *Responda este WhatsApp com essas informações para confirmarmos sua reserva!*\n\n`;
    message += `🔔 *Próximos passos:* Após recebermos os dados, confirmaremos presença e enviaremos detalhes sobre equipamentos.`;

    return message;
  }

  private async sendMessage(data: WhatsAppMessage): Promise<void> {
    // Using WhatsApp Business API
    const url = `https://api.whatsapp.com/send?phone=${data.to}&text=${encodeURIComponent(data.message)}`;

    console.log('WhatsApp message formatted:', data.message);
    console.log('WhatsApp URL:', url);

    // In production, you might want to use a proper WhatsApp Business API
    // For now, we'll just log the message and create a link
    // You could integrate with services like Twilio WhatsApp API, ChatAPI, etc.
  }

  private translateStatus(status: string): string {
    const statusMap: Record<string, string> = {
      pending_payment: 'Aguardando Pagamento',
      confirmed: 'Confirmado',
      in_progress: 'Em Andamento',
      completed: 'Concluído',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
  }

  private translatePaymentStatus(status: string): string {
    const statusMap: Record<string, string> = {
      approved: 'Aprovado',
      pending: 'Pendente',
      pending_whatsapp: 'Aguardando via WhatsApp',
      in_process: 'Processando',
      rejected: 'Rejeitado',
      cancelled: 'Cancelado',
      refunded: 'Estornado',
    };
    return statusMap[status] || status;
  }

  private translateExperience(level: string): string {
    const levelMap: Record<string, string> = {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
    };
    return levelMap[level] || level;
  }

  private formatCurrency(amountInCents: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amountInCents / 100);
  }
}
