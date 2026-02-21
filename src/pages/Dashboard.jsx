import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, User, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { cart } = useCart();

    const quickActions = [
        {
            title: 'Store',
            label: 'Browse Items',
            icon: Package,
            link: '/products',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'Cart',
            label: `${cart.length} items`,
            icon: ShoppingCart,
            link: '/cart',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        {
            title: 'Profile',
            label: 'Settings',
            icon: User,
            link: '/profile',
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-fade-in font-sans pb-20">
            {/* Minimal Hero */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        Hello, {user?.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-gray-500 font-bold mt-1 text-lg">
                        What's on your list today?
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="font-black text-gray-900 text-sm">Session Active</span>
                    </div>
                </div>
            </div>

            {/* Compact Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 px-2">
                {quickActions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.link}
                        className="group flex flex-col items-center gap-3 p-5 sm:p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300"
                    >
                        <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            <action.icon size={28} className="sm:hidden" />
                            <action.icon size={40} className="hidden sm:block" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-black text-gray-900 text-sm sm:text-lg tracking-tight truncate uppercase">
                                {action.title}
                            </h3>
                            <p className="text-[10px] sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
                                {action.label}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Cart Items - Practical Horizontal Layout */}
            <div className="space-y-6 pt-4 px-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                            <ShoppingCart size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Additions</h2>
                    </div>
                    <Link to="/cart" className="text-sm font-black text-indigo-600 hover:text-indigo-500 flex items-center gap-1 group">
                        Manage Cart <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    {cart.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {cart.slice(0, 3).map((item) => (
                                <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-colors">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border border-gray-100 p-2 shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 text-sm sm:text-lg truncate mb-1 uppercase tracking-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-400 font-bold text-xs sm:text-sm uppercase tracking-widest">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-lg sm:text-xl font-black text-gray-900 tabular-nums">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-16 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingCart className="text-slate-200" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cart is empty</h3>
                            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Start adding items to see them here in your quick access list.</p>
                            <Link to="/products" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95">
                                Browse Store
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
