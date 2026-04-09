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
      className="relative text-white border-t border-zinc-100"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">
            Blog<span className="text-primary">It</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed hover:text-slate-300 transition-colors">
            BlogIt is a personal space where I share what I learn,
            and reflect on building projects step by step.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-primary">
            Contact
          </h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={16} />
              </div>
              belemagirma31@gmail.com
            </li>
            <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone size={16} />
              </div>
              +251 933 391 417
            </li>
            <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin size={16} />
              </div>
              Addis Ababa, Ethiopia
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-primary">
            Follow
          </h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/Belema7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Send size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-primary">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BlogIt. Crafted with care. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
