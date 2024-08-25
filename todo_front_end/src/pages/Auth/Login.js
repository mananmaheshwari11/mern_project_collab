import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import './Signupauth.css'
import { useAuth } from './Authcontext';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[auth,setAuth]=useAuth()
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post('/api/auth/signin',{email,password});
            if(data.success){
                toast.success(data.message,{duration:2000})
                setAuth({
                    ...auth,
                user: data.user,
                token: data.token,
                });
                localStorage.setItem('auth',JSON.stringify(data))
                navigate('/user/home');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
         <body>
            <div className="signup-container">{/* signup-container */}
            <div className="signup-box">{/* //signup-box */}
            <h1 className='signup-title'>Login to your Account</h1>
            <form onSubmit={handleLogin}>
            <input type='email' 
            className='signup-input' 
            placeholder='Your Email Address' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required />
            <input type='password' 
            className='signup-input' 
            placeholder='Password' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required />
            <button type='submit' className='signup-button'>Login</button>
            <p className='signup-text'>New To MAK ?<Link className='signup-text-link' to='/'>Sign Up</Link> Here</p>
            </form>
            </div>
            </div>
            </body>
    </div>
  )
}

export default Login