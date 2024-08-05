import express from 'express'
import taskRoutes from 'routes/taskRoutes'

const app = express()
const PORT = 3000
app.use(express.json());

//DB connection


//Routes
app.use('/api', taskRoutes);

// Server start
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})