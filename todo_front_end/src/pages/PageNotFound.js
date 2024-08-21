import React from 'react'
import { FaThumbsDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
    <center>
    <p className='error-text'> Oops! Page not found</p>
          <p className='error-text'> <FaThumbsDown/></p>
          <Link to='user/home' className='error-back'>Go to home</Link>
    </center>
    </>
  )
}

export default PageNotFound