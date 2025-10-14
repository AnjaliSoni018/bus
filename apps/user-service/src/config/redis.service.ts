import Redis from 'ioredis';

if (!process.env.REDIS_URL && !process.env.REDIS_HOST) {
  throw new Error('Redis configuration missing');
}

let redis: Redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false,
    },
  });
} else {
  redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  });
}

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error', err);
});

export default redis;
