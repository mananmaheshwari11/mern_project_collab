import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import dotenv from 'dotenv'
import connectDb from './config/db.js'

const app = express()
const PORT = 3000
app.use(express.json());

//DB connection
dotenv.config()
connectDb();

//Routes
app.use('/api', taskRoutes);

// Server start
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})