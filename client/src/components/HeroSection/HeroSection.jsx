import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import heroBg from '../../assets/images/hero.png'
import WhatIWrite from './WhatIWrite'

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
      <div className="absolute inset-0 bg-black/90" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">


            {/* Intro */}
            <p className="text-xs sm:text-sm font-medium text-white/70 mb-3">
              A personal blog & journey
            </p>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
              Learning by building,
              <br />
              one step at a time.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8">
              I document what I’m learning, building, and improving — from
              computer science fundamentals to real projects and lessons
              along the way.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 sm:py-3 text-sm font-medium text-black hover:bg-white/90 transition"
              >
                Read the Blog
                <BookOpen size={18} />
              </Link>

              <Link
                to="/journey"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 sm:py-3 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Follow the Journey
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      <WhatIWrite />
    </>
  )
}

export default HeroSection







