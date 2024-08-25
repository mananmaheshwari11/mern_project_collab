import express from 'express';
import { getallusers, logIn, registerUser, updateUser } from '../Controller/authController.js';
import {RequireSignIn} from '../Middlewares/authMiddleware.js'

const route = express.Router();

route.post('/signup',registerUser);

route.post('/signin',logIn);

route.get('/users',getallusers);

route.put('/update/:id',RequireSignIn,updateUser);

route.get('/user-auth', RequireSignIn, (req,res) => {
    return res.status(200).send({ok:true})
});
export default route;