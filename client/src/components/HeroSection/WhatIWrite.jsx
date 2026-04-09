import React from 'react'
import { Code2, BookOpen, PenLine } from 'lucide-react'
import WhatIWriteCard from './WhatIWriteCard'
import heroBg from '../../assets/images/hero.png'

const WhatIWrite = () => {
  return (
    <section
      className="relative py-24"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            What I write about
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Notes from building, learning, and growing
          </h2>

          <p className="text-lg text-zinc-300 leading-relaxed">
            This blog is a record of real progress — things I’m learning,
            building, struggling with, and improving over time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <WhatIWriteCard
            icon={Code2}
            title="Building Projects"
            description="Real projects, real problems, and the lessons that come from actually shipping things."
          />

          <WhatIWriteCard
            icon={BookOpen}
            title="Learning Computer Science"
            description="Notes from studying fundamentals, concepts, and ideas that shape how software works."
          />

          <WhatIWriteCard
            icon={PenLine}
            title="Writing & Reflection"
            description="Thoughts on learning, consistency, mistakes, and how understanding grows over time."
          />
        </div>
      </div>
    </section>
  )
}

export default WhatIWrite
