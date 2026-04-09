import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component
 * 
 * Design decisions:
 * - Rounded-full: matches HeroSection styles.
 * - Variants: allows flexibility across the app.
 * - Loading state: crucial for async actions like login.
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    type = 'button',
    ...props
}) => {

    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
        secondary: "bg-zinc-900 text-white hover:bg-zinc-800",
        outline: "bg-transparent text-zinc-700 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300",
        ghost: "bg-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
        link: "text-primary underline-offset-4 hover:underline px-0",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/10",
        white: "bg-white text-zinc-900 hover:bg-zinc-50 shadow-sm border border-zinc-100",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs rounded-xl",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-14 px-10 text-base rounded-2xl",
        icon: "h-10 w-10 p-0 rounded-xl",
    };

    return (
        <button
            type={type}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
