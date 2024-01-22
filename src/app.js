import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/dbConnect.js';
import indexRouter from './routes/index.route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use(cookieParser())

app.use('/', indexRouter)

connectDb()

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log("Server is Running... 🔥🚀"))