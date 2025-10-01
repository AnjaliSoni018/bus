import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'changeme';

export function signJwt(
  payload: JwtPayload,
  expiresIn: StringValue | number = '1d'
) {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
