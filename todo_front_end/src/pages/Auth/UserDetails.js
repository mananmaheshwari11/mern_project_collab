import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from './Authcontext'
import axios from 'axios';
import toast from 'react-hot-toast';
import '../Home.css'
import { useNavigate } from 'react-router-dom';
const UserDetails = () => {
    const [auth]=useAuth()
    const[name,setName]=useState("")
    const[phone_no,setPhone_no]=useState("")
    const navigate=useNavigate()
    const handleChange=async(e)=>{ 
      e.preventDefault()
      try {
        const {data} = await axios.put(`/api/auth/update/${auth?.user.id}`,{name,phone_no})
        if(data.success){
          toast.success(data.message)
          const auth=JSON.parse(localStorage.getItem('auth'));
          if(auth && auth.user){
            auth.user.name=name;
            auth.user.phone_no=phone_no;
          }
          localStorage.setItem('auth',JSON.stringify(auth))
          navigate('/user/home')
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        setName(auth?.user.name)
        setPhone_no(auth?.user.phone_no)
    },[auth?.user])
  return (
    <Layout>
         <div className="page-container">
      <h1 className='page-title'>User Details</h1>
        <form onSubmit={handleChange} className='page-forms'> 
        <h1 className='form-title'>Edit User Details</h1>
            <input type="text"
             className="form-input"
              value={name} 
              onChange={(e)=>setName(e.target.value)}
               placeholder="Name"/>
            <input 
            type="number"
             className="form-input" 
             value={phone_no} 
             onChange={(e)=>setPhone_no(e.target.value)} 
             placeholder="Phone number"/>
            <button type="submit" onClick={()=>window.alert("Please refresh to get the changes")} className="button">SAVE</button>
        </form>
        </div>
    </Layout>
  )
}

export default UserDetails