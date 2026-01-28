import { Payment } from '../../../generated/prisma';
import { PaymentGateway } from './gateway.interface';

import axios from 'axios';

const CALLBACK_URL =
  process.env.PAYMENT_SERVICE_CALLBACK_URL ||
  'http://localhost:3000/api/v1/payment/mock/callback';

export class MockGateway implements PaymentGateway {
  async initiate(_payment: Payment) {
    return {
      gatewayOrderId: `MOCK_${Date.now()}`,
    };
  }

  async simulateCallback(gatewayOrderId: string) {
    setTimeout(async () => {
      const success = Math.random() > 0.3;

      await axios.post(CALLBACK_URL, {
        gatewayOrderId,
        success,
        gatewayPaymentId: success ? `PAY_${Date.now()}` : null,
        failureReason: success ? null : 'Mock payment failed',
      });
    }, 3000);
  }
}
