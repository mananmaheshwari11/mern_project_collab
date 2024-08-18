import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from './Authcontext'
import axios from 'axios';
import toast from 'react-hot-toast';
const UserDetails = () => {
    const [auth]=useAuth()
    const[name,setName]=useState("")
    const[phone_no,setPhone_no]=useState("")
    const handleChange=async(e)=>{ 
      e.preventDefault()
      try {
        const {data} = await axios.put(`/api/auth/update/${auth?.user.id}`,{name,phone_no})
        if(data.success){
          toast.success(data.message)
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
        <form onSubmit={handleChange}> 
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
            <button type="submit" className="button">SAVE</button>
        </form>
    </Layout>
  )
}

export default UserDetails