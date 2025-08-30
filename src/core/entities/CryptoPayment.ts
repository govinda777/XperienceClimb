export interface CryptoPayment {
  id: string;
  orderId: string;
  cryptoType: 'bitcoin' | 'usdt';
  network: 'bitcoin' | 'ethereum';
  walletAddress: string;
  amount: number; // Amount in crypto units (satoshis for Bitcoin, wei for USDT)
  amountFiat: number; // Amount in cents (BRL)
  exchangeRate: number; // Rate used for conversion
  transactionHash?: string;
  confirmations: number;
  requiredConfirmations: number;
  status: CryptoPaymentStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CryptoPaymentStatus = 
  | 'pending'
  | 'awaiting_payment'
  | 'confirming'
  | 'confirmed'
  | 'expired'
  | 'failed';

export interface CryptoPaymentRequest {
  orderId: string;
  cryptoType: 'bitcoin' | 'usdt';
  amountFiat: number; // Amount in cents (BRL)
}

export interface CryptoPaymentResponse {
  paymentId: string;
  walletAddress: string;
  amount: number; // Amount in crypto units
  qrCode?: string;
  expiresAt: Date;
}

export interface BlockchainTransaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  confirmations: number;
  timestamp: Date;
  blockNumber?: number;
}
