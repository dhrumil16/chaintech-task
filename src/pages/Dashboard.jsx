import { useAuth } from '../context/AuthContext';
import { useRecentItems } from '../context/RecentItemsContext';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, User, ArrowRight, History } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Dashboard = () => {
    const { user } = useAuth();
    const { recentItems } = useRecentItems();

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
        <div className="space-y-12 animate-fade-in font-sans">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
                        Welcome, {user?.name}!
                    </h1>
                    <p className="text-indigo-100 text-xl max-w-2xl font-medium">
                        Your personalized shopping dashboard is ready. What would you like to do today?
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        to={card.link}
                        className="group block h-full"
                    >
                        <div className={`bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm ${card.shadow} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-8 shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 mb-8 leading-relaxed text-lg">
                                {card.description}
                            </p>
                            <div className="flex items-center text-base font-bold text-indigo-600 group-hover:translate-x-2 transition-transform">
                                Explore Section <ArrowRight size={20} className="ml-2" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recently Viewed Section */}
            {recentItems.length > 0 && (
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <History size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {recentItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
