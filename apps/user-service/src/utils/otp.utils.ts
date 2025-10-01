import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

if (!TWILIO_PHONE_NUMBER) {
  throw new Error('TWILIO_PHONE_NUMBER is not defined in env variables');
}

export const sendOTP = async (phone: string, otp: string) => {
  const message = `Your OTP code is: ${otp}`;

  await client.messages.create({
    body: message,
    from: TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

export function generateOtp(length = 6): string {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();
}
