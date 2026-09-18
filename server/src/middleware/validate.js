/** Validates req.body against a zod schema and replaces it with the parsed value. */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      ok: false,
      error: 'VALIDATION',
      message: 'Please check the highlighted fields.',
      fields: Object.fromEntries(
        result.error.issues.map((i) => [i.path.join('.') || 'form', i.message])
      ),
    });
  }
  req.body = result.data;
  next();
};
