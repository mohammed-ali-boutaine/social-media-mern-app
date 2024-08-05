import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";



// mongo connection
import connectDB from './config/db.js';

// error midllewares
import {  errorHandler } from './middleware/errorMiddleware.js';

// routes
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import postRoutes from './routes/postRoutes.js';
import chatRoute from './routes/chatRoute.js';
import messageRoute from './routes/messageRoute.js';

////////////////////

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;


// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));// when store images




// Routes:

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/posts', postRoutes);

app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);


// Error Handling Middleware
app.use(errorHandler);

// Server start
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

