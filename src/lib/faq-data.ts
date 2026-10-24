import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = pedraBellaTheme.faqSection?.items || [];
