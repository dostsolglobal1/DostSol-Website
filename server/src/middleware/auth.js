import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from './error.js';

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    res.status(401);
    throw new Error('Authentication required.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      res.status(401);
      throw new Error('This account no longer exists.');
    }
    next();
  } catch {
    res.status(401);
    throw new Error('Session expired. Please sign in again.');
  }
});

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    res.status(403);
    return next(new Error('You do not have access to this resource.'));
  }
  next();
};
