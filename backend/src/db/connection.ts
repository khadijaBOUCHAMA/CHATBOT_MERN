import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
        throw new Error("MONGODB_URL is not defined in environment variables");
    }

    try {
        await connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Could not Connect To MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("MongoDB disconnection error:", error);
        throw new Error("Could not Disconnect From MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };
