import { prisma } from '../../db/prisma';
import { GatewayProvider, PaymentStatus } from '../../generated/prisma';
import { AppError } from '../../utils/AppError';
import { emitPaymentFailed, emitPaymentSuccess } from './payment.events';
import { getGateway } from './gateways';
import { RazorpayGateway } from './gateways/razorpay.gateway';

export async function initiatePayment(input: {
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  method: any;
  gateway: GatewayProvider;
}) {
  const payment = await prisma.payment.create({
    data: {
      bookingId: input.bookingId,
      userId: input.userId,
      amount: input.amount,
      currency: input.currency,
      method: input.method,
      gateway: input.gateway,
      status: PaymentStatus.PENDING,
      events: {
        create: {
          type: 'PAYMENT_INITIATED',
          payload: input,
        },
      },
    },
  });

  const gateway = getGateway(input.gateway);

  const { gatewayOrderId } = await gateway.initiate(payment);

  const updatedPayment = await prisma.payment.update({
    where: { id: payment.id },
    data: { gatewayOrderId },
  });

  return updatedPayment;
}

export async function handleGatewayCallback(payload: {
  gatewayOrderId: string;
  success: boolean;
  gatewayPaymentId?: string;
  failureReason?: string;
}) {
  const payment = await prisma.payment.findFirst({
    where: { gatewayOrderId: payload.gatewayOrderId },
  });

  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (payment.status !== PaymentStatus.PENDING) {
    return; // idempotency
  }

  if (payload.success) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.SUCCESS,
        gatewayPaymentId: payload.gatewayPaymentId,
        completedAt: new Date(),
        events: {
          create: {
            type: 'PAYMENT_SUCCESS',
            payload,
          },
        },
      },
    });

    emitPaymentSuccess({
      bookingId: payment.bookingId,
      paymentId: payment.id,
      transactionId: payload.gatewayPaymentId!,
    });
  } else {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.FAILED,
        failureReason: payload.failureReason,
        events: {
          create: {
            type: 'PAYMENT_FAILED',
            payload,
          },
        },
      },
    });

    emitPaymentFailed({
      bookingId: payment.bookingId,
      paymentId: payment.id,
      reason: payload.failureReason,
    });
  }
}

export async function handleRazorpayVerification(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  const payment = await prisma.payment.findFirst({
    where: { gatewayOrderId: payload.razorpay_order_id },
  });

  if (!payment) {
    throw new AppError('Payment not found for this order', 404);
  }

  if (payment.status !== PaymentStatus.PENDING) {
    return; // idempotent
  }

  const gateway = new RazorpayGateway();

  const isValid = gateway.verifySignature(payload);

  if (!isValid) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.FAILED,
        failureReason: 'Invalid Razorpay signature',
        events: {
          create: {
            type: 'PAYMENT_FAILED',
            payload,
          },
        },
      },
    });

    await emitPaymentFailed({
      bookingId: payment.bookingId,
      paymentId: payment.id,
      reason: 'Invalid Razorpay signature',
    });

    throw new AppError('Invalid Razorpay signature', 400);
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: PaymentStatus.SUCCESS,
      gatewayPaymentId: payload.razorpay_payment_id,
      completedAt: new Date(),
      events: {
        create: {
          type: 'PAYMENT_SUCCESS',
          payload,
        },
      },
    },
  });

  await emitPaymentSuccess({
    bookingId: payment.bookingId,
    paymentId: payment.id,
    transactionId: payload.razorpay_payment_id,
  });
}
