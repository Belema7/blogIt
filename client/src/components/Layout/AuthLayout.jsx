import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Gradients/Accents - Subtle touches to make it "professional" */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md p-6 relative z-10">
                {/* Back Button (optional, but good UX) */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{title}</h1>
                        {subtitle && (
                            <p className="text-zinc-400 text-sm">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                {/* Copyright or Footer links could go here */}
                <div className="mt-8 text-center text-xs text-zinc-600">
                    &copy; {new Date().getFullYear()} BlogIt. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
