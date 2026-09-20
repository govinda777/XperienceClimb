import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ambiente de teste | Xperience Climb',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestE2ELayout({ children }: { children: React.ReactNode }) {
  return children;
}
