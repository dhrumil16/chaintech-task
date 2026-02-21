import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

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
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900 order-2">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-700 to-indigo-600 opacity-90 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                    alt="Shopping Bags"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
                <div className="relative z-20 flex flex-col justify-center px-12 text-white">
                    <h1 className="text-5xl font-bold mb-6">Join Us Today</h1>
                    <p className="text-xl text-indigo-100 max-w-md leading-relaxed">
                        Create an account to start shopping, track orders, and get exclusive offers.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-slate-50 lg:bg-white order-1">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
                    </div>

                    <div className="mt-8">
                        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-gray-100">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <Input
                                    id="name"
                                    label="Full Name"
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="email"
                                    label="Email address"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="password"
                                    label="Password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />

                                {error && (
                                    <div className="text-red-900 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                                        {error}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <Button type="submit" isLoading={loading} variant="primary" className="w-full text-lg font-semibold py-3 shadow-indigo-500/20">
                                        Create Account
                                    </Button>
                                </div>

                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
