import React, { useState } from 'react'
import { NavLink, Link, useNavigation, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ArrowRight,
  Search
} from 'lucide-react'

const linkBase = 'transition-colors duration-200'

const desktopLink = ({ isActive }) =>
  `${linkBase} ${isActive
    ? 'text-black border-b-2 border-black pb-1'
    : 'text-black/60 hover:text-black'
  }`

const mobileLink = ({ isActive }) =>
  `${linkBase} block py-3 ${isActive ? 'text-black font-medium' : 'text-black/70'
  }`

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const navigate = useNavigation();
  const path = useLocation().pathname()

  const closeMenu = () => setOpen(false)

  return (
    <header
      className="w-full border-b bg-white fixed top-0 left-0 z-50">

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-xl font-semibold tracking-tight cursor-pointer">
          <Link to="/" >
            BlogIt
          </Link>
        </div>

        <h1 className='hidden md:display'>
          {
            path="/" && 
            <div onChange={(e) => setPrompt(e.target.value)}>
              <input type="text" placeholder='search a post...'/>
              <p onClick={() => navigate(prompt ? "?search"+prompt : navigate("/")) }><Search /></p>
            </div>
          }
        </h1>
          
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/blog" className={desktopLink}>Blog</NavLink>
          <NavLink to="/journey" className={desktopLink}>Journey</NavLink>
          <NavLink to="/about" className={desktopLink}>About</NavLink>
          <NavLink to="/contact" className={desktopLink}>Contact</NavLink>

          <NavLink
            to="/signup"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-black/90"
          >
            Get Started
            <ArrowRight size={16} />
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-black"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-white border-b shadow-lg">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-6 text-sm">
            <NavLink to="/" className={mobileLink} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/blog" className={mobileLink} onClick={closeMenu}>
              Blog
            </NavLink>
            <NavLink to="/journey" className={mobileLink} onClick={closeMenu}>
              Journey
            </NavLink>
            <NavLink to="/about" className={mobileLink} onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className={mobileLink} onClick={closeMenu}>
              Contact
            </NavLink>

            <NavLink
              to="/signup"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-white"
            >
              Get Started
              <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
