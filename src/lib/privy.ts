import { PrivyClientConfig } from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  loginMethods: ['email', 'google', 'apple'],
  appearance: {
    theme: 'light',
    accentColor: '#21808D',
    logo: '/images/logo.png',
    showWalletLoginFirst: false,
  },
  embeddedWallets: {
    createOnLogin: 'off',
  },
  supportedChains: [], // No blockchain needed for this app
  // Optional: customize the login modal
  modalSize: 'compact',
}; 