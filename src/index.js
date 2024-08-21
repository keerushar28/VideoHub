import dotenv from 'dotenv'
dotenv.config({
    path: './.env',
});
import express from 'express'
import connectDB from './config/dbconfig.js'
import authRoutes from './routes/authRoutes.js'


connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());




app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    )
})