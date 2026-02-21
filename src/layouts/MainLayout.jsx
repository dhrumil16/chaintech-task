import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { LogOut, ShoppingCart, User, Home, Package, Menu, X } from 'lucide-react';
import { useState } from 'react';
import SessionTimer from '../components/SessionTimer';

const MainLayout = ({ children }) => {
    const { logout, user } = useAuth();
    const { getCartItemsCount } = useCart();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        showToast('Logged out successfully', 'success');
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', path: '/', icon: Home },
        { label: 'Products', path: '/products', icon: Package },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                                E-Shop
                            </Link>
                            <div className="hidden md:flex ml-10 space-x-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive(item.path)
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            } flex items-center gap-2`}
                                    >
                                        <item.icon size={18} /> {item.label}
                                        {item.label === 'Products' && (
                                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <SessionTimer />

                            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                                <ShoppingCart size={22} />
                                {getCartItemsCount() > 0 && (
                                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                                        {getCartItemsCount()}
                                    </span>
                                )}
                            </Link>

                            <div className="hidden sm:flex items-center space-x-2 border-l border-gray-200 pl-4 ml-2">
                                <Link to="/profile" className={`p-2 rounded-xl transition-colors ${isActive('/profile') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                                    }`}>
                                    <User size={22} />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={22} />
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-lg text-base font-medium ${isActive(item.path)
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        } flex items-center gap-3`}
                                >
                                    <item.icon size={20} /> {item.label}
                                </Link>
                            ))}
                            <div className="border-t border-gray-100 my-2 pt-2">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-3"
                                >
                                    <User size={20} /> Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 flex items-center gap-3"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2024 E-Shop Dashboard. Crafted with <span className="text-red-500">♥</span> using React & Tailwind.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
