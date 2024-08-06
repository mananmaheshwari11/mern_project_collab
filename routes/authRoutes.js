import express from 'express';
import userModel from '../models/userModel.js'
import { logIn, registerUser } from '../Controller/authController.js';

const route = express.Router();

route.post('/signup',registerUser);
route.post('/signin',logIn);

export default route;