import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Payment } from '../../../generated/prisma';
import { PaymentGateway } from './gateway.interface';
import { AppError } from '../../../utils/AppError';

export class RazorpayGateway implements PaymentGateway {
  private razorpay: Razorpay;

  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not configured');
    }

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async initiate(payment: Payment): Promise<{ gatewayOrderId: string }> {
    const order = await this.razorpay.orders.create({
      amount: Math.round(payment.amount * 100), // Razorpay uses paise
      currency: payment.currency || 'INR',
      receipt: payment.id,
      notes: {
        bookingId: payment.bookingId,
        paymentId: payment.id,
      },
    });

    if (!order?.id) {
      throw new AppError('Failed to create Razorpay order', 500);
    }

    return {
      gatewayOrderId: order.id,
    };
  }

  async simulateCallback(): Promise<void> {
    // ❌ Not used for Razorpay
    return;
  }

  verifySignature(payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;

    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    return expected === payload.razorpay_signature;
  }
}
