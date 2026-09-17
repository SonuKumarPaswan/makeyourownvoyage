import express from "express";
import authRouter from '../src/routes/user.routes.js'
import hotelRouter from './routes/hotels.admin.routes.js'
import hotelPublicRouter from "./routes/hotels.public.routes.js"
import transportAdminRouter from "./routes/transport.admin.routes.js";
import transportPublicRouter from "./routes/transport.public.routes.js";
import activityRoutes from "./routes/activityMaster.routes.js";
import templateRoutes from "./routes/itineraryTemplate.routes.js";
import packageRoutes from "./routes/package.routes.js";
import cookieParser from 'cookie-parser'
const app = express();
import cors from "cors";

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true, // Cookies allow karne ke liye
    })
);



app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter)
app.use("/api/hotels", hotelPublicRouter);
app.use("/api/transports", transportPublicRouter);
app.use("/api/admin/transports", transportAdminRouter);
app.use('/api/activities', activityRoutes);
app.use('/api/itinerary-templates', templateRoutes);
app.use('/api/packages', packageRoutes);




export default app;