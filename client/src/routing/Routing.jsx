import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'
import Blog from '../pages/Blog/Blog'
import Journey from '../pages/Journey/Journey'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'

const Routing = () => {
  return (
      <Routes>
        <Route path='/' element={<Landing/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>} />

        <Route path='/blog' element={<Blog/>}/>
        <Route path='/journey' element={<Journey/>}/>

        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
  )
}

export default Routing