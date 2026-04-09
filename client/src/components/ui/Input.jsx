import React, { forwardRef } from 'react';

/**
 * Reusable Input Component
 * 
 * Design decisions:
 * - Dark theme optimized (zinc-900/800).
 * - Focus rings: White focus ring to stand out on dark background.
 * - Error state: Highlights border in red and shows error message.
 */
const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    className = '',
    type = 'text',
    id,
    ...props
}, ref) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none text-zinc-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <Icon size={18} />
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    id={id}
                    className={`
            flex h-12 w-full rounded-xl border bg-white/5 px-4 py-2 text-sm text-white shadow-sm transition-all duration-200
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-slate-500 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary
            disabled:cursor-not-allowed disabled:opacity-50
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-red-500 focus-visible:ring-red-500/50' : 'border-white/10'}
            ${className}
          `}
                    {...props}
                />
            </div>

            {error && (
                <p className="text-sm text-red-500 animate-in slide-in-from-top-1 fade-in-0">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
