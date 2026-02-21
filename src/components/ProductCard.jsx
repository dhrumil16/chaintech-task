import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useRecentItems } from '../context/RecentItemsContext';
import Button from './ui/Button';
import { ShoppingBag, Star, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart, cart } = useCart();
    const { showToast } = useToast();
    const { addRecentItem } = useRecentItems();

    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!isInCart) {
            addToCart(product);
            showToast(`Added ${product.title} to cart`, 'success');
        } else {
            showToast(`${product.title} is already in your cart`, 'info');
        }
    };

    const handleProductClick = () => {
        addRecentItem(product);
    };

    return (
        <div
            onClick={handleProductClick}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1 cursor-pointer"
        >
            <div className="relative pt-[100%] bg-white p-4 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold text-gray-900 shadow-sm border border-gray-100 uppercase tracking-wider">
                    {product.category}
                </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2 text-amber-400">
                    <Star size={14} className="fill-amber-400" />
                    <span className="text-xs font-bold text-gray-700">
                        {product.rating?.rate || '4.5'}
                    </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors" title={product.title}>
                    {product.title}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-gray-50">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ₹{Math.round(product.price * 83)}
                    </span>
                    <Button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
                        variant={isInCart ? 'success' : 'primary'}
                        className={`!w-auto !py-2 !px-4 !rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${isInCart ? '!bg-emerald-500 !border-emerald-500 hover:!bg-emerald-600' : ''
                            }`}
                    >
                        <ShoppingBag size={18} />
                        <span className="sm:inline">Add to cart</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
