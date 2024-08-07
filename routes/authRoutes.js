import express from 'express';
import ExpressFormidable from 'express-formidable';
import { logIn, registerUser } from '../Controller/authController.js';


const route = express.Router();

route.post('/signup',ExpressFormidable(),registerUser);
route.post('/signin',ExpressFormidable(),logIn);

export default route;