import { Payment } from '../../../generated/prisma';

export interface PaymentGateway {
  initiate(payment: Payment): Promise<{ gatewayOrderId: string }>;

  simulateCallback(gatewayOrderId: string): Promise<void>;
}
