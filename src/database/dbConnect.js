import mongoose from "mongoose";
import { mongoDbURI } from "../config/mongoDB.config.js";

const connectDb = async () => {
    try {
        await mongoose.connect(mongoDbURI);
        console.log("Server is connected to the Database... 🔥🚀");
    } catch (error) {
        console.error("Error connecting to the Database... ❌", error.message);
        process.exit(1);
    }
};
export default connectDb;