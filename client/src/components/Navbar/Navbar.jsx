import React, { useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight, LogOut, User } from 'lucide-react'
import { useUser } from '../../context/UserContext'

const linkBase = 'transition-colors duration-200'

const desktopLink = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? 'text-black border-b-2 border-black pb-1'
      : 'text-black/60 hover:text-black'
  }`

const mobileLink = ({ isActive }) =>
  `${linkBase} block py-3 ${
    isActive ? 'text-black font-medium' : 'text-black/70'
  }`

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const closeMenu = () => setOpen(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
    closeMenu()
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          BlogIt
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/blog" className={desktopLink}>Blog</NavLink>
          {!user && <NavLink to="/about" className={desktopLink}>About</NavLink>}
          {!user && <NavLink to="/contact" className={desktopLink}>Contact</NavLink>}

          {user ? (
            <div className="ml-4 flex items-center gap-4">
              <Link
                to="/blog/my"
                className="text-black/60 hover:text-black transition-colors"
              >
                My Blogs
              </Link>
              <Link
                to="/blog/new"
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-black/90"
              >
                New Post
              </Link>
              <div className="flex items-center gap-2 text-black/60">
                <User size={16} />
                <span className="text-sm">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-black hover:bg-black/5 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/signup"
              className="ml-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-black/90"
            >
              Get Started
              <ArrowRight size={16} />
            </NavLink>
          )}
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

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-white border-b shadow-lg">

          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col px-6 text-sm">
            <NavLink to="/" className={mobileLink} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/blog" className={mobileLink} onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/about" className={mobileLink} onClick={closeMenu}>About</NavLink>
            <NavLink to="/contact" className={mobileLink} onClick={closeMenu}>Contact</NavLink>

            {user ? (
              <>
                <NavLink to="/blog/my" className={mobileLink} onClick={closeMenu}>My Blogs</NavLink>
                <NavLink to="/blog/new" className={mobileLink} onClick={closeMenu}>New Post</NavLink>
                <div className="py-3 border-t border-zinc-200 mt-2">
                  <div className="flex items-center gap-2 text-black/70 mb-3">
                    <User size={18} />
                    <span>{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-black/20 px-4 py-3 text-black hover:bg-black/5"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-white"
              >
                Get Started
                <ArrowRight size={16} />
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
