import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
    helmetMiddleware,
    compressionMiddleware,
    morganMiddleware,
    apiLimiter,
    authLimiter,
    uploadLimiter,
} from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import authRouter from "./routes/user.routes.js";
import hotelRouter from "./routes/hotels.admin.routes.js";
import hotelPublicRouter from "./routes/hotels.public.routes.js";
import transportAdminRouter from "./routes/transport.admin.routes.js";
import transportPublicRouter from "./routes/transport.public.routes.js";
import activityRoutes from "./routes/activityMaster.routes.js";
import templateRoutes from "./routes/itineraryTemplate.routes.js";
import packageRoutes from "./routes/package.routes.js";
import stateRoutes from "./routes/state.routes.js";
import destinationRoutes from "./routes/destination.routes.js";
import enquiryRouter from "./routes/enquiry.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import searchRoutes from "./routes/search.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import seoRoutes from "./routes/seo.routes.js";

const app = express();

// Trust reverse proxy (AWS, Render, Cloudflare, Nginx)
app.set("trust proxy", 1);

// Security, Compression & Logging Middlewares
app.use(helmetMiddleware);
app.use(compressionMiddleware);
app.use(morganMiddleware);

// Standard Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Dynamic CORS configuration
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:3000",
    "http://localhost:5173",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow server-to-server or requests without origin (like mobile/postman)
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(null, true); // Permissive in dev, or specify allowedOrigins
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

// Health check endpoint for deployment monitoring
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
    });
});

// Apply General Rate Limiter to all API routes
app.use("/api", apiLimiter);

// Specific Rate Limiters for sensitive endpoints
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/enquiries", authLimiter, enquiryRouter);
app.use("/api/enquiry", authLimiter, enquiryRouter);
app.use("/api/upload", uploadLimiter, uploadRoutes);

// Core Resource Routes
app.use("/api/hotel", hotelRouter);
app.use("/api/hotels", hotelPublicRouter);
app.use("/api/admin/hotels", hotelRouter);
app.use("/api/transports", transportPublicRouter);
app.use("/api/admin/transports", transportAdminRouter);
app.use("/api/activities", activityRoutes);
app.use("/api/itinerary-templates", templateRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/", seoRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;