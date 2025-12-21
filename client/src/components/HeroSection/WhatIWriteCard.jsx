import React from 'react'

const WhatIWriteCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-6 transition hover:border-black/20">
      
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white">
        <Icon size={20} />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold tracking-tight text-black">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-black/70">
        {description}
      </p>
    </div>
  )
}

export default WhatIWriteCard
