import { dbReady } from '../config/db.js';

/** Returns 503 instead of hanging when Mongo is not connected. */
export function requireDB(req, res, next) {
  if (!dbReady()) {
    return res.status(503).json({
      ok: false,
      error: 'DB_UNAVAILABLE',
      message: 'Database is not reachable. Start MongoDB and run `npm run seed`.',
    });
  }
  next();
}
