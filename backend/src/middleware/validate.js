// src/middleware/validate.js
export const validate = (schema, source = "body") => (req, res, next) => {
  const dataToValidate = req[source] || {}; // Safe fallback
  const { error, value } = schema.validate(dataToValidate, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message || "Validation failed",
      errors: errorMessages,
    });
  }

  // In Express 5, req.query and req.params are getters without setters.
  // Object.defineProperty safely overrides them on the request instance.
  try {
    Object.defineProperty(req, source, {
      value,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch {
    req[source] = value;
  }

  next();
};
