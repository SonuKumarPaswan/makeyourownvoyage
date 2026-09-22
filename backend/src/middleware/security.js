// Security & Performance Middleware with graceful fallback
let helmet = null;
let rateLimit = null;
let compression = null;
let morgan = null;

try {
    const h = await import("helmet");
    helmet = h.default || h;
} catch {
    console.warn("[Security] 'helmet' package not yet installed. Run 'npm i' to activate HTTP security headers.");
}

try {
    const rl = await import("express-rate-limit");
    rateLimit = rl.default || rl;
} catch {
    console.warn("[Security] 'express-rate-limit' package not yet installed. Run 'npm i' to activate rate limiting.");
}

try {
    const comp = await import("compression");
    compression = comp.default || comp;
} catch {
    console.warn("[Performance] 'compression' package not yet installed. Run 'npm i' to activate response compression.");
}

try {
    const m = await import("morgan");
    morgan = m.default || m;
} catch {
    console.warn("[Logging] 'morgan' package not yet installed. Run 'npm i' to activate request logging.");
}

/**
 * Configure Helmet with Cross-Origin Resource Policy allowed for APIs
 */
export const helmetMiddleware = helmet
    ? helmet({
          crossOriginResourcePolicy: { policy: "cross-origin" },
          crossOriginEmbedderPolicy: false,
      })
    : (req, res, next) => next();

/**
 * Configure response compression (Gzip/Brotli)
 */
export const compressionMiddleware = compression
    ? compression()
    : (req, res, next) => next();

/**
 * Configure HTTP request logging
 */
export const morganMiddleware = morgan
    ? morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
    : (req, res, next) => next();

/**
 * General API Rate Limiter: Max 500 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit
    ? rateLimit({
          windowMs: 15 * 60 * 1000,
          max: 500,
          standardHeaders: true,
          legacyHeaders: false,
          message: {
              success: false,
              message: "Too many requests from this IP, please try again after 15 minutes.",
          },
      })
    : (req, res, next) => next();

/**
 * Sensitive Endpoints Rate Limiter (Login, Register, Enquiries): Max 30 requests per 15 mins per IP
 */
export const authLimiter = rateLimit
    ? rateLimit({
          windowMs: 15 * 60 * 1000,
          max: 30,
          standardHeaders: true,
          legacyHeaders: false,
          message: {
              success: false,
              message: "Too many attempts from this IP, please try again after 15 minutes.",
          },
      })
    : (req, res, next) => next();

/**
 * Upload Endpoint Rate Limiter: Max 50 uploads per 15 minutes per IP
 */
export const uploadLimiter = rateLimit
    ? rateLimit({
          windowMs: 15 * 60 * 1000,
          max: 50,
          standardHeaders: true,
          legacyHeaders: false,
          message: {
              success: false,
              message: "Upload rate limit exceeded. Please try again after 15 minutes.",
          },
      })
    : (req, res, next) => next();

export default {
    helmetMiddleware,
    compressionMiddleware,
    morganMiddleware,
    apiLimiter,
    authLimiter,
    uploadLimiter,
};
