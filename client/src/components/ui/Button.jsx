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

    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-black";

    const variants = {
        primary: "bg-white text-black hover:bg-zinc-200 border border-transparent",
        secondary: "bg-transparent text-white border border-zinc-700 hover:bg-zinc-800",
        ghost: "bg-transparent text-white hover:bg-zinc-800",
        link: "text-white underline-offset-4 hover:underline",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm rounded-full",
        md: "h-11 px-6 text-sm rounded-full",
        lg: "h-14 px-8 text-base rounded-full",
        icon: "h-10 w-10 p-0 rounded-full",
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
