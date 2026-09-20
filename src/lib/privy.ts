import { PrivyClientConfig } from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  loginMethods: ['email'],
  appearance: {
    theme: 'light',
    accentColor: '#21808D',
    showWalletLoginFirst: false,
  },
};
