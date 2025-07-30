import { PrivyClientConfig } from '@privy-io/react-auth';
import { mainnet } from 'viem/chains';

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
  supportedChains: [mainnet], // Minimal chain config (required by Privy)
}; 