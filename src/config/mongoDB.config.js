import dotenv from 'dotenv';

dotenv.config();

export const mongoDbURI = `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.wduddfn.mongodb.net/app_links_shortener?retryWrites=true&w=majority`
