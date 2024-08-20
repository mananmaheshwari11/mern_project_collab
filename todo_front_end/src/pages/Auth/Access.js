import React, { useEffect, useState } from 'react'
import { useAuth } from './Authcontext';
import { Outlet, useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
import axios from 'axios';

export default function Access(){
    const[ok,setOk]=useState(false)
    const[auth]=useAuth()
    const navigate=useNavigate()

    useEffect(()=>{
        const AuthCheck=async()=>{
            const res= await axios.get('/api/auth/user-auth')
        if(res.data.ok){
            setOk(true)
           // navigate('/user/home')
        }
        else{
            console.log("I am not OK")
            setOk(false)
        }
        };
    if (auth?.token){
        AuthCheck();
    }
    },[auth?.token]);

    return ok ? <Outlet/>:<PageNotFound/> 
}
