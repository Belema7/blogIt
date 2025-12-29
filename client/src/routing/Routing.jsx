import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";

import Landing from "../pages/Landing/Landing";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Blog from "../pages/Blog/Blog";
import Journey from "../pages/Journey/Journey";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import CreateBlog from "../pages/Blog/CreateBlog";
import CreateJourney from "../pages/Journey/CreateJourney";
import PostDetails from "../pages/PostDetails/PostDetails";
import EditBlog from "../pages/Blog/EditBlogs";
import MyBlogs from "../pages/Blog/MyBlogs";
import Profile from "../pages/Profile/Profile";
import EditJourney from "../pages/Journey/EditJourney";
import MyJourney from "../pages/Journey/MyJourney";

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<PostDetails />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/blog/new" element={<CreateBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/blog/my" element={<MyBlogs />} />

        <Route path="/journey/new" element={<CreateJourney />} />
        <Route path="/journey/edit/:id" element={<EditJourney />} />
        <Route path="/journey/my" element={<MyJourney />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
