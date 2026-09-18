import { Router } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireDB } from '../middleware/dbGuard.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });

router.post(
  '/login',
  loginLimiter,
  requireDB,
  validate(z.object({ email: z.string().email(), password: z.string().min(6) })),
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.matchesPassword(req.body.password))) {
      res.status(401);
      throw new Error('Incorrect email or password.');
    }
    res.json({
      ok: true,
      data: {
        token: signToken(user),
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  })
);

router.get(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    res.json({ ok: true, data: req.user });
  })
);

export default router;
