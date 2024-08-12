import React,{useState} from 'react';
import './Signup.css';

const Signup=()=>{
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[mobile_no,setMobile_no]=useState("")
    const[password,setPassword]=useState("")
    const[cpassword,setCpassword]=useState("")
    return(
        <body>
            <div class="signupContainer">{/* signup-container */}
                <div class="signupbox">{/* //signup-box */}
                   <h1>Create your User Account</h1> {/* //"For form title" signup-title */}
                    <form>
                    <input type='text' className='signup-input' placeholder='First Name' value={name} onChange={(e)=>setName(e.target.value)} required />
                    <input type='text' className='signup-input' placeholder='Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type='text' className='signup-input' placeholder='Enter your mobile number' value={mobile_no} onChange={(e)=>setMobile_no(e.target.value)} required />
                    <input type='text' className='signup-input' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <input type='text' className='signup-input' placeholder='Confirm Password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)} required />
                    <button type='submit' className='signup-button'>Create Account</button>
                    </form>
                </div>
            </div>
        </body>
    )
}