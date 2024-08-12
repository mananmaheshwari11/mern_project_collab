import express from 'express';
import { logIn, registerUser } from '../Controller/authController.js';


const route = express.Router();

route.post('/signup',registerUser);
route.post('/signin',logIn);

export default route;