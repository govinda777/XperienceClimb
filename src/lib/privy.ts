import { PrivyClientConfig } from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  loginMethods: ['email'],
  appearance: {
    theme: 'light',
    accentColor: '#2E473B',
    logo: '/assets/logo.svg',
    showWalletLoginFirst: false,
  },
};
