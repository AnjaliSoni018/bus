import { Router } from 'express';
import prisma from '../prisma/prismaClient';

const router = Router();

router.get('/', async (req, res) => {
  try {
    // quick DB ping
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err?.message || err });
  }
});

export default router;
