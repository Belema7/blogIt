import React from 'react'

const WhatIWriteCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary/30 group">

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold tracking-tight text-white mt-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  )
}

export default WhatIWriteCard
