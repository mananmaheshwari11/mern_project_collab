import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
import morgan from 'morgan';
 import path from 'path';
 import { fileURLToPath } from 'url';

const app = express()
//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './todo_front_end/build')));

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../todo_front_end/build', 'index.html'));
//   });
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './todo_front_end/build', 'index.html'));
  });

  app.get('/user/*', (req, res) => {
      res.sendFile(path.join(__dirname, './todo_front_end/build', 'index.html'));
  })
//DB connection
dotenv.config()
connectDb();

//Routes
app.use('/api/task', taskRoutes);
app.use('/api/auth',authRoutes);

// Server start
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})