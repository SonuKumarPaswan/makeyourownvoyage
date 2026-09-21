import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const conn = await mongoose.connect(uri, options);
        console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);

        // Listen to connection life-cycle events
        mongoose.connection.on("error", (err) => {
            console.error("[MongoDB] Connection error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("[MongoDB] Connection lost. Attempting auto-reconnect...");
        });
    } catch (error) {
        console.error(`[MongoDB] Initial connection failure: ${error.message}`);
        throw error;
    }
};

export default connectDB;
