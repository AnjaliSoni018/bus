import { GatewayProvider } from '../../../generated/prisma';
import { MockGateway } from './mock.gateway';
import { RazorpayGateway } from './razorpay.gateway';
import { PaymentGateway } from './gateway.interface';

export function getGateway(provider: GatewayProvider): PaymentGateway {
  switch (provider) {
    case GatewayProvider.MOCK:
      return new MockGateway();

    case GatewayProvider.RAZORPAY:
      return new RazorpayGateway();

    default:
      throw new Error(`Unsupported gateway: ${provider}`);
  }
}
