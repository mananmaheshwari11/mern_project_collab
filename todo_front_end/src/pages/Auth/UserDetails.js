import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from './Authcontext'

const UserDetails = () => {
    const [auth]=useAuth()
  return (
    <Layout>
        <form>
            
        </form>
    </Layout>
  )
}

export default UserDetails