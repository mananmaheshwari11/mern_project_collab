import React from 'react'
import { ImSad2 } from "react-icons/im";
import { Link } from 'react-router-dom';

const BadRequest = () => {
  return (
    <center>
    <p className='error-text'> Oops! Bad Request Please Login</p>
    <p className='error-text'> <ImSad2/></p>
    <Link to='/login' className='error-back'>SignIn</Link>
    
    </center>
  )
}

export default BadRequest