import React, { useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight, LogOut, User } from 'lucide-react'
import { useUser } from '../../context/UserContext'

const linkBase = 'transition-all duration-200 relative px-1 py-1'

const desktopLink = ({ isActive }) =>
  `${linkBase} ${isActive
    ? 'text-primary'
    : 'text-zinc-500 hover:text-primary'
  } ${isActive
    ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
    : 'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full'
  }`

const mobileLink = ({ isActive }) =>
  `${linkBase} block py-4 px-4 ${isActive
    ? 'text-primary font-bold border-l-4 border-primary'
    : 'text-slate-600'
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
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-zinc-900 group">
          Blog<span className="text-primary group-hover:text-primary-hover transition-colors">It</span>
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
                className="text-zinc-500 hover:text-primary transition-colors"
              >
                My Blogs
              </Link>
              <Link
                to="/blog/new"
                className="btn-primary"
              >
                New Post
              </Link>
              <div className="flex items-center gap-2 text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                <User size={14} className="text-primary" />
                <span className="text-xs font-semibold text-zinc-600">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-outline text-zinc-600 border-zinc-200 py-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-zinc-600 hover:text-zinc-900 px-4 py-2">
                Log in
              </Link>
              <NavLink
                to="/signup"
                className="btn-primary"
              >
                Get Started
                <ArrowRight size={16} />
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-zinc-900 p-2 hover:bg-zinc-50 rounded-lg"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[100] bg-zinc-100">

          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
            <span className="text-xl font-bold text-zinc-900">Menu</span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="p-2 hover:bg-zinc-200/50 rounded-lg transition-colors text-zinc-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-1 p-4 text-base">
            <NavLink to="/" className={mobileLink} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/blog" className={mobileLink} onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/about" className={mobileLink} onClick={closeMenu}>About</NavLink>
            <NavLink to="/contact" className={mobileLink} onClick={closeMenu}>Contact</NavLink>

            {user ? (
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-3 px-3 py-2 bg-zinc-50 rounded-lg mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{user.username}</p>
                    <p className="text-xs text-zinc-500">Creator</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Link to="/blog/my" className="btn-outline justify-start w-full" onClick={closeMenu}>My Blogs</Link>
                  <Link to="/blog/new" className="btn-primary justify-start w-full" onClick={closeMenu}>New Post</Link>
                  <button
                    onClick={handleLogout}
                    className="btn-outline justify-start w-full text-red-500 border-red-50 border-red-100 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/login" className="btn-outline w-full" onClick={closeMenu}>Log in</Link>
                <NavLink
                  to="/signup"
                  onClick={closeMenu}
                  className="btn-primary w-full"
                >
                  Get Started
                  <ArrowRight size={16} />
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
