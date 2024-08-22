import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/dbconfig.js';
import authRoutes from './routes/authRoutes.js';
import { app } from './app.js'


// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

// Initialize Express app
/*
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
*/
const port = process.env.PORT || 3000;

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
