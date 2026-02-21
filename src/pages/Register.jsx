import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ShoppingBag, Sparkles, UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            showToast('Passwords do not match', 'error');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            showToast('Account created successfully!', 'success');
            navigate('/login');
        } catch (err) {
            setError(err.message);
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans">
            {/* Left Side - Professional Header Design (Order-2 to show on right in desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-purple-950 order-2">
                {/* Abstract Pattern Overlay */}
                <div className="absolute inset-0 z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-purple-600/40 to-indigo-800/60 backdrop-blur-[2px]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1500"
                    alt="Shopping Fashion"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity scale-110 pointer-events-none"
                />

                <div className="relative z-20 flex flex-col justify-between p-16 text-white w-full">
                    {/* Logo/Name */}
                    <div className="flex items-center gap-3 justify-end">
                        <span className="text-3xl font-black tracking-tighter uppercase text-right">E-Shop</span>
                        <div className="p-3 bg-white rounded-2xl shadow-xl shadow-white/10">
                            <ShoppingBag className="text-purple-600" size={32} strokeWidth={3} />
                        </div>
                    </div>

                    {/* Hero Text */}
                    <div className="text-right">
                        <Sparkles className="text-purple-300 mb-6 ml-auto" size={40} />
                        <h1 className="text-6xl font-black mb-6 leading-tight tracking-tight">
                            Start Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-300 to-indigo-200">Journey.</span>
                        </h1>
                        <p className="text-xl text-purple-100/80 ml-auto max-w-sm leading-relaxed font-medium mb-12">
                            Join thousands of happy customers and experience commerce redefined with our exclusive member perks.
                        </p>

                        <div className="flex items-center gap-4 py-5 px-6 sm:py-6 sm:px-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit ml-auto">
                            <div className="flex -space-x-3">
                                {[4, 5, 6].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-purple-600 bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-bold text-purple-100">JOIN THE COMMUNITY</span>
                        </div>
                    </div>

                    {/* Footer branding info */}
                    <div className="text-purple-200/60 text-sm font-bold tracking-widest uppercase text-right">
                        MADE FOR TRENDSETTERS
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form Container */}
            <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 sm:px-12 lg:px-24 order-1">
                <div className="w-full max-w-md">
                    {/* Mobile Only Header */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-600 rounded-xl shadow-lg">
                                <ShoppingBag className="text-white" size={24} strokeWidth={3} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase text-gray-900">E-Shop</span>
                        </div>
                    </div>

                    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-gray-100">
                        <div className="mb-8 text-center sm:text-left">
                            <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight flex items-center gap-3">
                                <UserPlus className="text-purple-500 lg:hidden" size={28} />
                                Create Account
                            </h2>
                            <p className="text-gray-400 font-bold">Join the premium community of E-Shop.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <Input
                                id="name"
                                label="Full Name"
                                type="text"
                                required
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="!rounded-2xl !py-3 !border-gray-100 focus:!ring-purple-600/10 focus:!border-purple-600"
                            />

                            <Input
                                id="email"
                                label="Email address"
                                type="email"
                                required
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="!rounded-2xl !py-3 !border-gray-100 focus:!ring-purple-600/10 focus:!border-purple-600"
                            />

                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                required
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="!rounded-2xl !py-3 !border-gray-100 focus:!ring-purple-600/10 focus:!border-purple-600"
                            />

                            <Input
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                required
                                placeholder="Repeat your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="!rounded-2xl !py-3 !border-gray-100 focus:!ring-purple-600/10 focus:!border-purple-600"
                            />

                            {error && (
                                <div className="text-red-900 text-sm bg-red-50 p-4 rounded-2xl border border-red-100 font-bold animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    variant="primary"
                                    className="w-full !text-lg !font-black !py-4 !rounded-2xl !bg-purple-600 !border-purple-600 shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                >
                                    Start your journey
                                </Button>
                            </div>

                            <div className="text-center pt-6">
                                <p className="text-[15px] text-gray-400 font-bold">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-purple-600 hover:text-purple-500 underline underline-offset-4 decoration-2 transition-all">
                                        Sign in instead
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                            Premium • Secure • Exclusive
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
