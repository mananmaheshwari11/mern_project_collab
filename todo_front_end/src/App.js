import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Access from './pages/Auth/Access';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import CreateTask from './pages/CreateTask';
import MyTask from './pages/MyTask';
import UserDetails from './pages/Auth/UserDetails'
import Schedule from './pages/Schedule';
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Signup/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='user' element={<Access/>}>
      <Route path='/user/home' element={<Home/>}/>
      <Route path='/user/my-task' element={<MyTask/>}/>
      <Route path='/user/create' element={<CreateTask/>}/>
      <Route path='/user/profile' element={<UserDetails/>}/>
      <Route path='/user/missed' element={<Schedule/>}/>

      </Route>
    </Routes>
  )
}

export default App;