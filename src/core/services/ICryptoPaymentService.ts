import { CryptoPayment, CryptoPaymentRequest, CryptoPaymentResponse, BlockchainTransaction } from '../entities/CryptoPayment';

export interface ICryptoPaymentService {
  /**
   * Creates a new crypto payment request
   */
  createPayment(request: CryptoPaymentRequest): Promise<CryptoPaymentResponse>;

  /**
   * Gets payment details by ID
   */
  getPayment(paymentId: string): Promise<CryptoPayment | null>;

  /**
   * Updates payment status based on blockchain confirmation
   */
  updatePaymentStatus(paymentId: string, transaction: BlockchainTransaction): Promise<void>;

  /**
   * Checks payment status on blockchain
   */
  checkPaymentStatus(paymentId: string): Promise<CryptoPayment>;

  /**
   * Gets current exchange rate for crypto to BRL
   */
  getExchangeRate(cryptoType: 'bitcoin' | 'usdt'): Promise<number>;

  /**
   * Validates a blockchain transaction
   */
  validateTransaction(transaction: BlockchainTransaction, expectedAmount: number, walletAddress: string): Promise<boolean>;

  /**
   * Cancels an expired payment
   */
  cancelExpiredPayment(paymentId: string): Promise<void>;

  /**
   * Gets all pending payments (for monitoring)
   */
  getPendingPayments(): Promise<CryptoPayment[]>;
}
