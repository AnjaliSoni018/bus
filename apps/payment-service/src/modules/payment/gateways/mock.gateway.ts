import { Payment } from '../../../generated/prisma';
import { PaymentGateway } from './gateway.interface';
import axios from 'axios';
import crypto from 'crypto';

const CALLBACK_URL =
  process.env.PAYMENT_SERVICE_CALLBACK_URL ||
  'http://localhost:3000/api/v1/payment/mock/callback';

const SECRET = process.env.MOCK_GATEWAY_SECRET!;

export class MockGateway implements PaymentGateway {
  async initiate(payment: Payment) {
    return {
      gatewayOrderId: `MOCK_${payment.id}_${Date.now()}`,
    };
  }

  async simulateCallback(gatewayOrderId: string) {
    setTimeout(async () => {
      const paymentMethod = gatewayOrderId.includes('CARD') ? 'CARD' : 'UPI';

      const success = paymentMethod === 'CARD';

      const payload = {
        gatewayOrderId,
        success,
        gatewayPaymentId: success ? `PAY_${Date.now()}` : null,
        failureReason: success ? null : 'UPI payment failed',
      };

      const signature = crypto
        .createHmac('sha256', SECRET)
        .update(JSON.stringify(payload))
        .digest('hex');

      await axios.post(CALLBACK_URL, payload, {
        headers: {
          'x-mock-signature': signature,
        },
      });
    }, 3000);
  }
}
