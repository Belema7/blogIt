import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import heroBg from '../../assets/images/hero.png' // optional background image

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[80vh] flex items-center text-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">

          {/* Small intro */}
          <p className="text-sm font-medium text-white/70 mb-4">
            A personal blog & journey
          </p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Learning by building, <br />
            one step at a time.
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
            This is where I document my journey, share lessons learned,
            and write about building projects, studying computer science,
            and growing through real experience.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition"
            >
              Read the Blog
              <BookOpen size={18} />
            </Link>

            <Link
              to="/journey"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Follow the Journey
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
