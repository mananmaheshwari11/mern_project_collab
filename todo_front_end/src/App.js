import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Access from './pages/Auth/Access';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import CreateTask from './pages/CreateTask';
import MyTask from './pages/MyTask';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/user' element={<Access/>}>
      
      </Route>
      <Route path='/home' element={<Home/>}/>
      <Route path='/my-task' element={<MyTask/>}/>
      <Route path='/create' element={<CreateTask/>}/>
    </Routes>
  )
}

export default App;