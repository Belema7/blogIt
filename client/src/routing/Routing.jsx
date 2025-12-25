import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'
import Blog from '../pages/Blog/Blog'
import Journey from '../pages/Journey/Journey'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'
import CreateBlog from '../pages/Blog/CreateBlog'
import CreateJourney from '../pages/Journey/CreateJourney'
import PostDetails from '../pages/PostDetails/PostDetails'
import EditBlogs from '../pages/Blog/EditBlogs'
import MyBlogs from '../pages/Blog/MyBlogs'
import Profile from '../pages/Profile/Profile'
import EditJourney from '../pages/Journey/EditJourney'
import MyJourney from '../pages/Journey/MyJourney'

const Routing = () => {
  return (
      <Routes>
        <Route path='/' element={<Landing/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>} />


        {/* Blogs route */}
        <Route path='/writeblog' element={<CreateBlog/>}/>
        <Route path='/Post/post/:id' element={<PostDetails/>}/>
        <Route path='/editblog/:id' element={<EditBlogs/>}/>
        <Route path='/myblogs/:id' element={<MyBlogs/>}/>

        {/* Journey route */}
        <Route path='/writejourney' element={<CreateJourney/>}/>
        <Route path='/editjouney/:id' element={<EditJourney/>}/>
        <Route path='/myjourney/:id' element={<MyJourney/>}/>

        


        <Route path='/profiles/:id' element={<Profile/>}/>

        <Route path='/blog' element={<Blog/>}/>
        <Route path='/journey' element={<Journey/>}/>

        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
  )
}

export default Routing