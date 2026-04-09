import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import heroBg from '../../assets/images/hero.png'
import WhatIWrite from './WhatIWrite'
import Footer from '../Footer/Footer'

const HeroSection = () => {
  return (
    <>
      <section
        className="relative min-h-[80vh] flex items-center text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">


            {/* Intro */}
            <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              A personal blog
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
              Learning by building,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300">
                one step at a time.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              I document what I’m learning, building, and improving — from
              computer science fundamentals to real projects and lessons
              along the way.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/blog"
                className="btn-primary py-4 px-8 text-base shadow-lg shadow-primary/20 hover:scale-105"
              >
                Read the Blog
                <BookOpen size={20} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      <WhatIWrite />
      <div>
        <Footer />
      </div>
    </>
  )
}

export default HeroSection







