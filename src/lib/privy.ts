import { PrivyClientConfig } from '@privy-io/react-auth';
import { mainnet } from 'viem/chains';

export const privyConfig: PrivyClientConfig = {
  loginMethods: ['email'],
  appearance: {
    theme: 'light',
    accentColor: '#21808D',
    showWalletLoginFirst: false,
  },
  embeddedWallets: {
    ethereum: {
      createOnLogin: 'off',
    },
    solana: {
      createOnLogin: 'off',
    },
  },
  supportedChains: [mainnet], // Minimal chain config (required by Privy)
};
