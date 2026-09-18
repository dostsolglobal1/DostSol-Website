export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, _next) {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : err.status || 500;

  // Mongo duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      ok: false,
      error: 'DUPLICATE',
      message: 'That record already exists.',
      fields: Object.keys(err.keyValue || {}),
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(422).json({
      ok: false,
      error: 'VALIDATION',
      message: 'Some fields need attention.',
      fields: Object.fromEntries(
        Object.entries(err.errors).map(([k, v]) => [k, v.message])
      ),
    });
  }

  if (process.env.NODE_ENV !== 'test') {
    console.error(`[error] ${status} ${err.message}`);
  }

  res.status(status).json({
    ok: false,
    error: err.code || 'SERVER_ERROR',
    message: status === 500 ? 'Something went wrong on our side.' : err.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}

/** Wraps an async route handler so rejections reach the error middleware. */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
