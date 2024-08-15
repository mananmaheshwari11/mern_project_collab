import express from 'express';
import { getallusers, logIn, registerUser } from '../Controller/authController.js';
import {RequireSignIn} from '../Middlewares/authMiddleware.js'

const route = express.Router();

route.post('/signup',registerUser);
route.post('/signin',logIn);
route.get('/users',getallusers);
route.get('/user-auth',RequireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
export default route;