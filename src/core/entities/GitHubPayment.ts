export interface GitHubPayment {
  id: string;
  orderId: string;
  sponsorUsername: string;
  amount: number; // in cents (BRL)
  amountUSD: number; // GitHub Sponsors works in USD
  sponsorshipUrl: string;
  status: GitHubPaymentStatus;
  frequency: 'one-time' | 'monthly';
  createdAt: Date;
  updatedAt: Date;
  webhookData?: any;
}

export type GitHubPaymentStatus = 
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'failed';

export interface GitHubPaymentRequest {
  orderId: string;
  amount: number; // in cents (BRL)
  sponsorUsername: string;
  frequency?: 'one-time' | 'monthly';
  metadata?: Record<string, any>;
}

export interface GitHubPaymentResponse {
  paymentId: string;
  sponsorshipUrl: string;
  amountUSD: number;
  qrCode?: string;
  instructions: string;
}

export interface GitHubSponsorshipWebhook {
  action: 'created' | 'cancelled' | 'pending_cancellation' | 'pending_tier_change' | 'tier_changed';
  sponsorship: {
    id: number;
    node_id: string;
    created_at: string;
    sponsorable: {
      login: string;
      id: number;
    };
    sponsor: {
      login: string;
      id: number;
    };
    privacy_level: string;
    tier: {
      monthly_price_in_cents: number;
      monthly_price_in_dollars: number;
      name: string;
      description: string;
      is_one_time: boolean;
    };
  };
}
