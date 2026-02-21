import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, type = 'text', id, error, icon: Icon, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={id} className="block text-[13px] font-black text-gray-900 mb-2 ml-1 uppercase tracking-wider opacity-80">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    id={id}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    style={{ paddingLeft: Icon ? '3.5rem' : '1.5rem' }}
                    className={`w-full pr-5 py-4 border-2 rounded-[1.2rem] bg-white transition-all duration-300 placeholder:text-gray-300 text-gray-700 appearance-none font-bold relative z-0
                        ${error
                            ? 'border-red-100 focus:ring-4 focus:ring-red-500/10 focus:border-red-400'
                            : 'border-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white'
                        } 
                        ${isPassword ? 'pr-12' : ''} 
                        [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]
                        ${props.className || ''}`}
                    {...props}
                />
                {Icon && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-20">
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                )}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none z-20"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1.5 text-sm text-red-600 ml-1 flex items-center gap-1 font-bold">
                <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                {error}
            </p>}
        </div>
    );
};

export default Input;
