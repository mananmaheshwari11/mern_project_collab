// SignUp.js
import React, { useState } from 'react';
import './SignUp.css';
import toast from 'react-hot-toast';
import axios from 'axios';
const Signup = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [phone_no,setMobile]=useState();
    const [password,setPassword]=useState();
    const [cfmpwd, setConfirm]=useState();
    const handleRegister=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post("/api/auth/signup",{name,email,phone_no,password,cfmpwd});
            if(data.success){
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
  return (
    <body>
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create your User Account</h2>
        <form className="signup-form" onSubmit={handleRegister}>
        <input type="text"
        placeholder="First name"
        className="signup-input" 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required />
        <input type="email" 
        placeholder="Your email address"
        className="signup-input" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required />
        <input type='text' 
        placeholder='Enter your mobile number' 
        className='signup-input' 
        value={phone_no}
        onChange={(e)=>setMobile(e.target.value)}
        required/>
        <input type="password" 
        placeholder="Password" 
        className="signup-input"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} 
        required />
        <input type="password" 
        placeholder="Confirm password" 
        className="signup-input"
        value={cfmpwd}
        onChange={(e)=>setConfirm(e.target.value)}
        required />
          <p className="signup-password-hint">
            *Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
          <button type="submit" className="signup-button">Create Account</button>
        </form>
      </div>
    </div>
    </body>
  );
};

export default Signup;
