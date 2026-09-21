import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/hotels", hotelPublicRouter);
app.use("/api/transports", transportPublicRouter);
app.use("/api/admin/transports", transportAdminRouter);
app.use("/api/activities", activityRoutes);
app.use("/api/itinerary-templates", templateRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/enquiries", enquiryRouter);
app.use("/api/faqs", faqRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/upload", uploadRoutes);

export default app;