import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, User, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    const cards = [
        {
            title: 'Browse Products',
            description: 'Explore our latest collection and find your perfect match.',
            icon: Package,
            link: '/products',
            gradient: 'from-blue-500 to-cyan-500',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'View Cart',
            description: 'Review your selected items and proceed to checkout.',
            icon: ShoppingCart,
            link: '/cart',
            gradient: 'from-emerald-500 to-teal-500',
            shadow: 'shadow-emerald-500/20'
        },
        {
            title: 'Update Profile',
            description: 'Manage your personal information and account settings.',
            icon: User,
            link: '/profile',
            gradient: 'from-violet-500 to-purple-500',
            shadow: 'shadow-violet-500/20'
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 sm:p-10 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-2xl">
                        You are logged in. Access your store sections below.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        to={card.link}
                        className="group block h-full"
                    >
                        <div className={`bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-lg ${card.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-md text-white group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                {card.description}
                            </p>
                            <div className="flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                                Go to {card.title} <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
