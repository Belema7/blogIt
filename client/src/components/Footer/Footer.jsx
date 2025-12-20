import React from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send
} from 'lucide-react'
import footerBg from './../../assets/images/hero.png'

const Footer = () => {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/95" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            BlogIt
          </h2>
          <p className="text-sm text-white/70 leading-relaxed hover:text-white transition-colors">
            BlogIt is a personal space where I document my journey,
            share what I learn, and reflect on building projects
            step by step.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-medium mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail size={16} />
              belemagirma31@gmail.com
            </li>
            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone size={16} />
              +251 933 391 417
            </li>
            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <MapPin size={16} />
              Addis Ababa, Ethiopia
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="text-sm font-medium mb-4">
            Follow
          </h3>
          <div className="flex gap-4 text-white/70">
            <a
              href="https://github.com/Belema7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Send size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-medium mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/journey" className="hover:text-white transition-colors">
                Journey
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} BlogIt. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
