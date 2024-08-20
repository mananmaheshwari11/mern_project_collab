import React,{useState} from 'react';
import './Signupauth.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup=()=>{
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[phone_no,setPhone_no]=useState("")
    const[password,setPassword]=useState("")
    const[cfmpwd,setCfmpwd]=useState("")
    const navigate=useNavigate()
    const handleSignup=async(e)=>{
        e.preventDefault()
        try{
            const {data}=await axios.post('/api/auth/signup',{name,email,phone_no,password,cfmpwd});
            if(data.success){
                toast.success(data.message)
                navigate('/login')
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
        }
        }
    return(
            <div className="signup-container">{/* signup-container */}
                <div className="signup-box">{/* //signup-box */}
                   <h1 className='signup-title'>Create your User Account</h1> {/* //"For form title" signup-title */}
                    <form onSubmit={handleSignup}> 
                    <input type='text' className='signup-input' placeholder='First Name' value={name} onChange={(e)=>setName(e.target.value)} required />
                    <input type='email' className='signup-input' placeholder='Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type='number' className='signup-input' placeholder='Enter your mobile number' value={phone_no} onChange={(e)=>setPhone_no(e.target.value)} required />
                    <input type='password' className='signup-input' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <input type='password' className='signup-input' placeholder='Confirm Password' value={cfmpwd} onChange={(e)=>setCfmpwd(e.target.value)} required />
                    <button type='submit' className='signup-button'>Create Account</button>
                    <p className='signup-text'>Already Registered ?<Link className='signup-text-link' to='/login'>Sign In</Link> Here</p>
                    </form>
                </div>
            </div>
    )
}

export default Signup