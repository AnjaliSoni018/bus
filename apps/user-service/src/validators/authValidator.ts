import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z.string().regex(emailRegex, { message: 'Invalid email address' }),
  password: z.string().min(6),
});

export const sendOtpSchema = z.object({
  phone: z.string().min(10).max(15),
});

export const verifyOtpSchema = z.object({
  phone: z.string().min(10).max(15),
  otp: z.string().min(4).max(6),
  name: z.string().optional(),
  email: z
    .string()
    .regex(emailRegex, { message: 'Invalid email address' })
    .optional(),
});

export const registerOperatorSchema = z.object({
  email: z.string().regex(emailRegex, { message: 'Invalid email address' }),
  password: z.string().min(6),
  travelsName: z.string(),
  ownerName: z.string(),
  businessBackground: z.string(),
  businessBackgroundOther: z.string().optional(),
  address: z.string(),
  city: z.string(),
  district: z.string(),
  state: z.string(),
  country: z.string().optional(),
  pincode: z.string(),
  mobile: z.string(),
  phone: z.string().optional(),
  alternateEmail: z.string().optional(),
  pan: z.string(),
  isMSMERegistered: z.boolean().optional(),
  msmeNumber: z.string().optional(),
  cin: z.string().optional(),
});
