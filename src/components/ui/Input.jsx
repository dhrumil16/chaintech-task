import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, type = 'text', id, error, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 ${error ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'} ${isPassword ? 'pr-12' : ''}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1.5 text-sm text-red-600 ml-1 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                {error}
            </p>}
        </div>
    );
};

export default Input;
