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

  req[source] = value;
  next();
};
