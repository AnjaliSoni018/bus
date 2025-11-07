import prisma from '../config/prisma.service';
import { generateOtp, sendOTP } from '../utils/otp.utils';
import { signJwt } from '../utils/jwt.util';
import { AppError } from '../errors/AppError';
import { rateLimitOtp } from '../utils/rateLimiter.util';
import {
  OTP_TTL_SECONDS,
  OTP_MAX_ATTEMPTS,
  OTP_LOCKOUT_MINUTES,
} from '../config/constants';
import { SUCCESS_MESSAGES } from '../constants/SuccessMessages';
import { errorMessages } from '../constants/errorMessages';
import { comparePassword, hashPassword } from '../utils/password.util';
import {
  clearFailedLogin,
  isLockedLogin,
  recordFailedLogin,
} from '../utils/loginProtection.util';
import redis from '../config/redis.service';

export const sendOtp = async (
  phone: string,
  ip: string,
  deviceId?: string | null
) => {
  if (!phone) throw new AppError(errorMessages.PHONE_REQUIRED, 400);
  const normPhone = phone.trim();

  await rateLimitOtp({ phone: normPhone, ip, deviceId });

  const otp = generateOtp(6);
  const expiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);

  await prisma.verificationToken.create({
    data: {
      phone: normPhone,
      token: otp,
      expiresAt,
      attempts: 0,
    },
  });

  const redisOtpKey = `otp:val:phone:${normPhone}`;
  try {
    await redis.set(redisOtpKey, otp, 'EX', OTP_TTL_SECONDS);
  } catch (err) {
    console.warn(errorMessages.REDIS_SET_FAILED, err);
  }

  const message = `Your verification code is ${otp}. It will expire in ${Math.floor(
    OTP_TTL_SECONDS / 60
  )} minutes.`;
  try {
    await sendOTP(normPhone, message);
  } catch (err) {
    console.error(errorMessages.SMS_PROVIDER_ERROR, err);
    throw new AppError(errorMessages.OTP_SEND_FAILED, 500);
  }

  return {
    exists: Boolean(
      await prisma.user.findUnique({ where: { phone: normPhone } })
    ),
    message: SUCCESS_MESSAGES.OTP_SENT,
  };
};

export const verifyOtp = async (
  phone: string,
  otp: string,
  name?: string,
  email?: string
) => {
  if (!phone || !otp) throw new AppError(errorMessages.PHONE_OTP_REQUIRED, 400);
  const normPhone = phone.trim();

  const lockKey = `otp:lock:phone:${normPhone}`;

  const isLocked = await redis.exists(lockKey);
  if (isLocked) {
    throw new AppError(
      `Too many failed OTP attempts. Try again after ${OTP_LOCKOUT_MINUTES} minutes.`,
      429
    );
  }

  const redisOtpKey = `otp:val:phone:${normPhone}`;
  let redisOtp: string | null = null;
  try {
    redisOtp = (await redis.get(redisOtpKey)) ?? null;
  } catch (err) {
    console.warn(errorMessages.REDIS_GET_FAILED, err);
  }

  const tokenRecord = await prisma.verificationToken.findFirst({
    where: { phone: normPhone },
    orderBy: { createdAt: 'desc' },
  });

  if (!tokenRecord) {
    throw new AppError(errorMessages.INVALID_OTP, 400);
  }

  if (tokenRecord.expiresAt < new Date()) {
    await prisma.verificationToken.update({
      where: { id: tokenRecord.id },
      data: { attempts: { increment: 1 } },
    });
    throw new AppError(errorMessages.OTP_EXPIRED, 400);
  }

  let validOtp = false;

  if (redisOtp !== null) {
    validOtp = redisOtp === otp;
  } else {
    validOtp = tokenRecord.token === otp;
  }

  if (!validOtp) {
    const attempts = tokenRecord.attempts + 1;

    await prisma.verificationToken.update({
      where: { id: tokenRecord.id },
      data: { attempts },
    });
    if (attempts >= OTP_MAX_ATTEMPTS) {
      await redis.set(lockKey, '1', 'EX', OTP_LOCKOUT_MINUTES * 60);
      throw new AppError(
        `Too many failed OTP attempts. Phone locked for ${OTP_LOCKOUT_MINUTES} minutes.`,
        429
      );
    }

    throw new AppError(errorMessages.INVALID_OTP, 400);
  }
  let user = await prisma.user.findUnique({ where: { phone: normPhone } });

  const jwtPayload = {};
  console.log(jwtPayload);
  const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const result = await prisma.$transaction(async (tx) => {
    if (!user) {
      if (!name || !email)
        throw new AppError(errorMessages.NAME_EMAIL_REQUIRED, 400);

      user = await tx.user.create({
        data: {
          phone: normPhone,
          name,
          email,
          isVerified: true,
          role: 'CUSTOMER',
        },
      });
    } else {
      user = await tx.user.update({
        where: { id: user.id },
        data: { isVerified: true, lastLogin: new Date() },
      });
    }

    await tx.verificationToken.deleteMany({ where: { phone: normPhone } });

    const token = signJwt({ id: user.id, role: user.role, phone: user.phone });
    await tx.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: sessionExpiresAt,
      },
    });

    return { token, user };
  });

  try {
    await redis.del(redisOtpKey);
  } catch (err) {
    console.warn(errorMessages.REDIS_DEL_FAILED, err);
  }

  return result;
};

interface RegisterOperatorDTO {
  email: string;
  password: string;
  name: string;
  travelsName: string;
  ownerName: string;
  businessBackground: string;
  businessBackgroundOther?: string;
  address: string;
  city: string;
  district: string;
  state: string;
  country?: string;
  pincode: string;
  mobile: string;
  phone?: string;
  alternateEmail?: string;
  pan: string;
  isMSMERegistered?: boolean;
  msmeNumber?: string;
  cin?: string;
}

export const registerOperator = async (payload: RegisterOperatorDTO) => {
  const {
    email,
    password,
    name,
    travelsName,
    ownerName,
    businessBackground,
    businessBackgroundOther,
    address,
    city,
    district,
    state,
    country = 'India',
    pincode,
    mobile,
    phone,
    alternateEmail,
    pan,
    isMSMERegistered = false,
    msmeNumber,
    cin,
  } = payload;

  if (!email || !password || !travelsName || !ownerName || !pan) {
    throw new AppError(errorMessages.MISSING_REQUIRED_FIELDS, 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    throw new AppError(errorMessages.EMAIL_ALREADY_REGISTERED, 400);

  const existingPan = await prisma.busOperator.findUnique({ where: { pan } });
  if (existingPan)
    throw new AppError(errorMessages.PAN_ALREADY_REGISTERED, 400);

  if (msmeNumber) {
    const existingMsme = await prisma.busOperator.findUnique({
      where: { msmeNumber },
    });
    if (existingMsme)
      throw new AppError(errorMessages.MSME_ALREADY_REGISTERED, 400);
  }

  if (cin) {
    const existingCin = await prisma.busOperator.findUnique({
      where: { cin },
    });
    if (existingCin)
      throw new AppError(errorMessages.CIN_ALREADY_REGISTERED, 400);
  }

  const hashedPassword = await hashPassword(password);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'BUS_OPERATOR',
        isVerified: true,
      },
    });

    const operator = await tx.busOperator.create({
      data: {
        userId: user.id,
        travelsName,
        ownerName,
        businessBackground,
        businessBackgroundOther,
        address,
        city,
        district,
        state,
        country,
        pincode,
        mobile,
        phone,
        email,
        alternateEmail,
        pan,
        isMSMERegistered,
        msmeNumber,
        cin,
        isApproved: false,
      },
    });

    return {
      userId: user.id,
      operatorId: operator.id,
      status: 'PENDING_APPROVAL',
    };
  });

  return result;
};

export const loginWithPassword = async (
  email: string,
  password: string,
  ip: string
) => {
  console.time('loginWithPassword total');

  if (!email || !password)
    throw new AppError('Email and password required', 400);

  console.time('check locked login');
  if (await isLockedLogin(email, ip)) {
    console.timeEnd('check locked login');
    throw new AppError('Too many failed login attempts. Try later.', 429);
  }
  console.timeEnd('check locked login');

  console.time('find user');
  const user = await prisma.user.findUnique({ where: { email } });
  console.timeEnd('find user');

  if (!user) {
    console.time('record failed login');
    await recordFailedLogin(email, ip);
    console.timeEnd('record failed login');
    throw new AppError('Invalid credentials', 401);
  }

  if (user.role === 'BUS_OPERATOR') {
    console.time('find bus operator profile');
    const profile = await prisma.busOperator.findUnique({
      where: { userId: user.id },
    });
    console.timeEnd('find bus operator profile');

    if (!profile || !profile.isApproved) {
      throw new AppError('Operator account not approved yet', 403);
    }
  }

  if (!user.password) {
    console.time('record failed login');
    await recordFailedLogin(email, ip);
    console.timeEnd('record failed login');
    throw new AppError('Invalid credentials', 401);
  }

  console.time('compare password');
  const ok = await comparePassword(password, user.password);
  console.timeEnd('compare password');

  if (!ok) {
    console.time('record failed login');
    await recordFailedLogin(email, ip);
    console.timeEnd('record failed login');
    throw new AppError('Invalid credentials', 401);
  }

  console.time('clear failed login');
  await clearFailedLogin(email, ip);
  console.timeEnd('clear failed login');

  console.time('sign JWT');
  const token = signJwt({ id: user.id, role: user.role, email: user.email });
  console.timeEnd('sign JWT');

  console.time('create session');
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(
        Date.now() + Number(process.env.SESSION_TTL_HOURS ?? 24) * 3600 * 1000
      ),
    },
  });
  console.timeEnd('create session');

  console.timeEnd('loginWithPassword total');

  return { token, user };
};

export const createAdmin = async (
  creatorId: string,
  payload: { email: string; password: string; name?: string }
) => {
  const { email, password, name } = payload;
  if (!email || !password)
    throw new AppError('Email and password required', 400);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError('Email already exists', 400);

  const hashed = await hashPassword(password);

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: name ?? null,
      role: 'ADMIN',
      isVerified: true,
      createdBy: creatorId,
      updatedBy: creatorId,
    },
  });

  return admin;
};

export const approveOperator = async (operatorId: string) => {
  const profile = await prisma.busOperator.update({
    where: { userId: operatorId },
    data: { isApproved: true },
  });
  return profile;
};

export const listOperators = async () => {
  const items = await prisma.busOperator.findMany({
    include: { user: true },
  });
  return items;
};
