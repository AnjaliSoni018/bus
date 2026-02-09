import { GatewayProvider } from '../../../generated/prisma';
import { MockGateway } from './mock.gateway';
import { PaymentGateway } from './gateway.interface';

export function getGateway(provider: GatewayProvider): PaymentGateway {
  switch (provider) {
    case GatewayProvider.MOCK:
      return new MockGateway();
    default:
      throw new Error(`Unsupported gateway: ${provider}`);
  }
}
