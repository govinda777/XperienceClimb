import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function openWhatsApp(phone: string, message?: string): void {
  // Remove all non-numeric characters from phone
  const cleanPhone = phone.replace(/\D/g, '');

  // Add country code if not present (assuming Brazil +55)
  const phoneWithCountryCode = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

  // Create WhatsApp URL
  const baseUrl = `https://wa.me/${phoneWithCountryCode}`;
  const url = message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;

  // Open in new tab
  window.open(url, '_blank');
}
