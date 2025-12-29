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
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <Icon size={18} />
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    id={id}
                    className={`
            flex h-11 w-full rounded-xl border bg-zinc-900 px-3 py-2 text-sm text-white shadow-sm transition-colors 
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-zinc-500 
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white
            disabled:cursor-not-allowed disabled:opacity-50
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-800'}
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
