import "dotenv/config";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

let server = null;

const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 5000;
        server = app.listen(port, () => {
            console.log(`[Server] MakeYourOwnVoyage running on port ${port} [${process.env.NODE_ENV || "development"}]`);
        });
    } catch (error) {
        console.error("[Server] Fatal startup error:", error.message);
        process.exit(1);
    }
};

// Catch Unhandled Promise Rejections (e.g. unhandled async operations)
process.on("unhandledRejection", (err) => {
    console.error("[Process] Unhandled Promise Rejection:", err);
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

// Catch Uncaught Exceptions (synchronous fatal errors)
process.on("uncaughtException", (err) => {
    console.error("[Process] Uncaught Exception:", err);
    process.exit(1);
});

// Graceful Shutdown for Cloud Deployments (Docker, Render, Railway, AWS)
const gracefulShutdown = (signal) => {
    console.log(`\n[Process] ${signal} received. Initiating graceful shutdown...`);
    if (server) {
        server.close(async () => {
            console.log("[Process] HTTP connections closed.");
            try {
                const mongoose = (await import("mongoose")).default;
                await mongoose.connection.close(false);
                console.log("[Process] MongoDB connection closed.");
            } catch (err) {
                console.error("[Process] Error closing MongoDB:", err.message);
            }
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();