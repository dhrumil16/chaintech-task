import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ShoppingBag, Star, ShieldCheck } from 'lucide-react';

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
            await new Promise(resolve => setTimeout(resolve, 800)); // Smooth delay
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
        <div className="min-h-screen flex bg-slate-50 font-sans">
            {/* Left Side - Professional Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-950">
                {/* Abstract Pattern Overlay */}
                <div className="absolute inset-0 z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/40 to-purple-800/60 backdrop-blur-[2px]"></div>
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1500"
                    alt="Store Front"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity scale-110 animate-pulse-slow"
                />

                <div className="relative z-20 flex flex-col justify-between p-16 text-white w-full">
                    {/* Logo/Name */}
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-2xl shadow-xl shadow-white/10">
                            <ShoppingBag className="text-indigo-600" size={32} strokeWidth={3} />
                        </div>
                        <span className="text-3xl font-black tracking-tighter uppercase">E-Shop</span>
                    </div>

                    {/* Hero Text */}
                    <div>
                        <Star className="text-amber-400 mb-6 fill-amber-400" size={40} />
                        <h1 className="text-6xl font-black mb-6 leading-tight tracking-tight">
                            Elevate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-200">Commerce.</span>
                        </h1>
                        <p className="text-xl text-indigo-100/80 max-w-sm leading-relaxed font-medium mb-12">
                            Transform your shopping journey with our curated selection of premium products and seamless experience.
                        </p>

                        <div className="flex items-center gap-4 py-6 px-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-bold text-indigo-100">JOINED BY 10K+ USERS</span>
                        </div>
                    </div>

                    {/* Footer branding info */}
                    <div className="text-indigo-200/60 text-sm font-bold tracking-widest uppercase">
                        © 2024 E-SHOP DASHBOARD
                    </div>
                </div>
            </div>

            {/* Right Side - Immersive Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 sm:px-12 lg:px-24">
                <div className="w-full max-w-md">
                    {/* Mobile Only Logo */}
                    <div className="lg:hidden flex justify-center mb-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg">
                                <ShoppingBag className="text-white" size={24} strokeWidth={3} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase text-gray-900">E-Shop</span>
                        </div>
                    </div>

                    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-gray-100">
                        <div className="mb-10 text-center sm:text-left">
                            <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Welcome Home</h2>
                            <p className="text-gray-400 font-bold">Please enter your credentials to log in.</p>
                        </div>

                        <form className="space-y-7" onSubmit={handleSubmit}>
                            <Input
                                id="email"
                                label="Email address"
                                type="email"
                                required
                                placeholder="name@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="!rounded-2xl !py-3 !border-gray-100 focus:!ring-indigo-600/10 focus:!border-indigo-600"
                            />

                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="!rounded-2xl !py-3 !border-gray-100 focus:!ring-indigo-600/10 focus:!border-indigo-600"
                            />

                            {error && (
                                <div className="text-red-900 text-sm bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-shake font-bold">
                                    <ShieldCheck className="h-5 w-5 text-red-500" />
                                    {error}
                                </div>
                            )}

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    variant="primary"
                                    className="w-full !text-lg !font-black !py-4 !rounded-2xl shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                >
                                    Login to your account
                                </Button>
                            </div>

                            <div className="text-center pt-6">
                                <p className="text-[15px] text-gray-400 font-bold">
                                    New to E-Shop?{' '}
                                    <Link to="/register" className="text-indigo-600 hover:text-indigo-500 underline underline-offset-4 decoration-2 transition-all">
                                        Create your account
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Help/Support link */}
                    <div className="mt-10 text-center">
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                            Secure • Encrypted • Professional
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
