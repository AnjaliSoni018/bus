// import { createClient } from 'redis';

// const REDIS_URL = process.env.REDIS_URL ?? 'redis://redis:6379';

// const redis = createClient({ url: REDIS_URL });

// redis.on('error', (err) => {
//   console.error('Redis client error:', err);
// });

// (async () => {
//   try {
//     if (!redis.isOpen) await redis.connect();
//     console.log('Connected to Redis');
//   } catch (err) {
//     console.error('Failed to connect to Redis:', err);
//   }
// })();

// export default redis;
