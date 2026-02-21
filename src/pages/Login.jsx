import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            login(email, password);
            showToast('Welcome back to E-Shop!', 'success');
            navigate('/');
        } catch (err) {
            setError(err.message);
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans bg-white">
            <div className="w-full max-w-md animate-fade-in-up">
                {/* Website Branding / Logo */}
                <div className="flex flex-col items-center mb-10">
                    <Link to="/" className="flex items-center gap-4 group transition-transform hover:scale-105">
                        <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 group-hover:bg-indigo-700 transition-all duration-500">
                            <ShoppingBag className="text-white" size={32} strokeWidth={3} />
                        </div>
                        <span className="text-4xl font-black tracking-tighter uppercase text-gray-900">E-Shop</span>
                    </Link>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="h-[1px] w-8 bg-gray-200"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Premium Commerce</span>
                        <div className="h-[1px] w-8 bg-gray-200"></div>
                    </div>
                </div>

                {/* Centered Minimal Card */}
                <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-gray-400 font-bold text-sm tracking-wide">Enter your details to access your dashboard</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            required
                            placeholder="name@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="space-y-1">
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-end pr-2">
                                <button type="button" className="text-[11px] font-bold text-gray-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-900 text-xs bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-shake font-bold">
                                <ShieldCheck className="h-4 w-4 text-red-500 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                isLoading={loading}
                                variant="primary"
                                className="w-full !text-lg !font-black !py-4.5 !rounded-2xl shadow-2xl shadow-indigo-200 hover:shadow-indigo-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                Sign In
                            </Button>
                        </div>

                        <div className="text-center pt-8 border-t border-gray-50">
                            <p className="text-sm text-gray-400 font-bold mb-2">
                                New to our platform?
                            </p>
                            <Link to="/register" className="group text-indigo-600 hover:text-indigo-500 transition-all font-black text-sm uppercase tracking-wider flex items-center justify-center gap-1.5">
                                Create an Account
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Global Footer Info */}
                <div className="mt-12 text-center space-y-4">
                    <div className="flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Secure Checkout</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Member Perks</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fast Delivery</span>
                    </div>
                    <p className="text-[10px] text-gray-300 font-bold tracking-[0.3em] uppercase">
                        © 2024 E-SHOP DASHBOARD • ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
