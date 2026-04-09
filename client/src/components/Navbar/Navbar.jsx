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
    ? 'text-primary font-bold border-l-4 border-primary bg-white/5'
    : 'text-zinc-200 hover:bg-white/5'
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
    <>
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

      </header>

      {/* Mobile Menu Overlay */}
      {
        open && (
          <div className="md:hidden fixed inset-0 z-[100] bg-[#020617] h-screen w-screen flex flex-col overflow-hidden">

            {/* Header Area */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md shrink-0">
              <span className="text-xl font-bold text-white tracking-tight">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
              {/* Links Section */}
              <div className="flex flex-col gap-2 mb-10">
                <NavLink to="/" className={mobileLink} onClick={closeMenu}>Home</NavLink>
                <NavLink to="/blog" className={mobileLink} onClick={closeMenu}>Blog</NavLink>
                <NavLink to="/about" className={mobileLink} onClick={closeMenu}>About</NavLink>
                <NavLink to="/contact" className={mobileLink} onClick={closeMenu}>Contact</NavLink>
              </div>

              {/* Auth/User Section */}
              {user ? (
                <div className="mt-auto pb-10">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-bold">{user.username}</p>
                      <p className="text-zinc-500 text-xs">Logged in</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Link to="/blog/my" className="btn-secondary w-full py-4 text-base" onClick={closeMenu}>My Blogs</Link>
                    <Link to="/blog/new" className="btn-primary w-full py-4 text-base" onClick={closeMenu}>New Post</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 text-red-400 font-semibold text-sm hover:text-red-300 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3 mt-auto pb-10">
                  <Link to="/login" className="btn-secondary w-full py-4 text-base" onClick={closeMenu}>
                    Log in
                  </Link>
                  <NavLink
                    to="/signup"
                    onClick={closeMenu}
                    className="btn-primary w-full py-4 text-base"
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )
      }
    </>
  )
}

export default Navbar
