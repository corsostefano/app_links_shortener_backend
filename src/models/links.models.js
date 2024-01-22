import mongoose from "mongoose";
import { nanoid } from "nanoid";

const LinkSchema = new mongoose.Schema({

    originalUrl: { type: String, required: true },

    shortUrl: { type: String, required: true, default: () => nanoid(8) },

    customUrl: {  type: String, unique: true, sparse: true },
})

export default mongoose.model ("Link", LinkSchema)