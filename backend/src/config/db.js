import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        // On Windows Node.js, 'localhost' resolves to IPv6 (::1) first.
        // If MongoDB is only bound to IPv4, this causes sudden connection drops.
        if (uri.includes("://localhost:")) {
            uri = uri.replace("://localhost:", "://127.0.0.1:");
        }

        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        // Clear existing listeners to prevent listener leaks across nodemon reloads
        mongoose.connection.removeAllListeners("error");
        mongoose.connection.removeAllListeners("disconnected");
        mongoose.connection.removeAllListeners("reconnected");

        mongoose.connection.on("error", (err) => {
            console.error("[MongoDB] Connection error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("[MongoDB] Connection lost. Attempting auto-reconnect...");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("[MongoDB] Connection restored successfully.");
        });

        const conn = await mongoose.connect(uri, options);
        console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[MongoDB] Initial connection failure: ${error.message}`);
        throw error;
    }
};

export default connectDB;
