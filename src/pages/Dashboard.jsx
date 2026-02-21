import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, User, ArrowRight, ShoppingCart, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { cart, getCartTotal, getCartItemsCount } = useCart();

    const quickActions = [
        {
            title: 'Browse Products',
            description: 'Explore our full catalog',
            icon: ShoppingBag,
            link: '/products',
            color: 'bg-indigo-600',
            bg: 'bg-indigo-50'
        },
        {
            title: 'View Cart',
            description: `${cart.length} items waiting`,
            icon: ShoppingCart,
            link: '/cart',
            color: 'bg-indigo-600',
            bg: 'bg-indigo-50'
        },
        {
            title: 'My Profile',
            description: 'Edit your details',
            icon: User,
            link: '/profile',
            color: 'bg-teal-500',
            bg: 'bg-teal-50'
        }
    ];

    return (
        <div className="max-w-md mx-auto space-y-8 animate-fade-in font-sans pb-10">
            {/* Header / Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <ShoppingBag className="text-emerald-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-gray-900 leading-none mb-1">
                            ₹{getCartTotal().toLocaleString()}
                        </div>
                        <div className="text-sm font-bold text-gray-400">Cart Total</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <CreditCard className="text-orange-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-gray-900 leading-none mb-1">
                            {cart.length}
                        </div>
                        <div className="text-sm font-bold text-gray-400">Unique Items</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 px-2 flex items-center gap-2">
                    Quick Actions
                </h2>
                <div className="space-y-3">
                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            to={action.link}
                            className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform`}>
                                <action.icon className="text-white" size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-gray-900 text-lg leading-tight uppercase tracking-tight">{action.title}</h3>
                                <p className="text-gray-400 font-bold text-sm">{action.description}</p>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Cart Items */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        Recent Cart Items
                    </h2>
                    <Link to="/cart" className="text-sm font-black text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden">
                    {cart.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {cart.slice(0, 3).map((item) => (
                                <div key={item.id} className="p-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 text-sm truncate uppercase tracking-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-400 font-bold text-xs mt-1">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="font-black text-gray-900 whitespace-nowrap">
                                        ₹{Math.round(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="text-slate-300" size={24} />
                            </div>
                            <p className="text-gray-500 font-bold">Your cart is empty</p>
                            <Link to="/products" className="text-indigo-600 font-black text-sm mt-2 inline-block">
                                Start shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
