import "dotenv/config";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    } catch (error) {
        console.error("Failed to connect DB:", error.message);
        process.exit(1); 
    }
};

startServer();