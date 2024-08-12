import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
import morgan from 'morgan'

const app = express()
app.use(express.json());

//DB connection
dotenv.config()
connectDb();

//Routes
app.use('/api/task', taskRoutes);
app.use('/api/auth',authRoutes)

//middleware
app.use(cors())
app.use(morgan('dev'))
// Server start
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})