export const OTP_TTL_SECONDS = Number(process.env.OTP_TTL_SECONDS ?? 120);
export const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS ?? 3);
export const OTP_LOCKOUT_MINUTES = Number(
  process.env.OTP_LOCKOUT_MINUTES ?? 10
);
