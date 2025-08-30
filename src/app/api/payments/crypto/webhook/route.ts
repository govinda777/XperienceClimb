import { NextRequest, NextResponse } from 'next/server';
import { CryptoPaymentService } from '@/infrastructure/services/CryptoPaymentService';
import { BlockchainTransaction } from '@/core/entities/CryptoPayment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Crypto Webhook received:', body);

    // Validate webhook signature (in production)
    // const signature = request.headers.get('x-signature');
    // if (!validateWebhookSignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const cryptoPaymentService = new CryptoPaymentService();

    // Process crypto transaction webhook
    const { paymentId, transaction } = body;

    if (!paymentId || !transaction) {
      return NextResponse.json(
        { error: 'Missing paymentId or transaction data' },
        { status: 400 }
      );
    }

    try {
      // Get payment details
      const payment = await cryptoPaymentService.getPayment(paymentId);
      
      if (!payment) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        );
      }

      // Create blockchain transaction object
      const blockchainTx: BlockchainTransaction = {
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        amount: transaction.amount,
        confirmations: transaction.confirmations || 0,
        timestamp: new Date(transaction.timestamp),
        blockNumber: transaction.blockNumber
      };

      // Update payment status
      await cryptoPaymentService.updatePaymentStatus(paymentId, blockchainTx);

      console.log(`Crypto payment ${paymentId} updated with ${blockchainTx.confirmations} confirmations`);

      // Check if payment is now confirmed
      const updatedPayment = await cryptoPaymentService.getPayment(paymentId);
      
      if (updatedPayment?.status === 'confirmed') {
        console.log(`Crypto payment confirmed for order: ${updatedPayment.orderId}`);
        
        // Update order status in database
        // await updateOrderStatus(updatedPayment.orderId, 'paid');
        
        // Send confirmation notification
        // await sendPaymentConfirmation(updatedPayment);
      }

      return NextResponse.json({ 
        success: true,
        status: updatedPayment?.status,
        confirmations: blockchainTx.confirmations
      });

    } catch (error) {
      console.error('Error processing crypto payment:', error);
      return NextResponse.json({ error: 'Error processing payment' }, { status: 500 });
    }

  } catch (error) {
    console.error('Crypto Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// GET endpoint to check payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const cryptoPaymentService = new CryptoPaymentService();
    const payment = await cryptoPaymentService.checkPaymentStatus(paymentId);

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        confirmations: payment.confirmations,
        requiredConfirmations: payment.requiredConfirmations,
        transactionHash: payment.transactionHash,
        expiresAt: payment.expiresAt
      }
    });

  } catch (error) {
    console.error('Error checking crypto payment status:', error);
    return NextResponse.json({ error: 'Error checking payment status' }, { status: 500 });
  }
}

// Utility function to validate webhook signature (implement in production)
function validateWebhookSignature(body: any, signature: string | null): boolean {
  // Implement blockchain webhook signature validation
  // This depends on your blockchain monitoring service (e.g., Alchemy, Infura, etc.)
  return true; // Placeholder
}
