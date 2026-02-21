import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useRecentItems } from '../context/RecentItemsContext';
import Button from './ui/Button';
import { ShoppingBag, Star } from 'lucide-react';

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
            className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2 cursor-pointer relative"
        >
            {/* Image Container */}
            <div className="relative pt-[100%] bg-[#f8fafc] m-3 rounded-[1.5rem] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Category Badge - Glassmorphism */}
                <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-800 shadow-sm uppercase tracking-widest">
                    {product.category}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/50">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-gray-700">
                        {product.rating?.rate || '4.5'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-5 pt-2 flex flex-col flex-1">
                <h3 className="text-[12px] sm:text-[15px] font-bold text-gray-900 line-clamp-2 mb-2 sm:mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300" title={product.title}>
                    {product.title}
                </h3>

                <div className="mt-auto flex flex-col items-center gap-3 pt-2 text-center">
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Price</span>
                        <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
                            ₹{product.price}
                        </span>
                    </div>

                    <Button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
                        variant={isInCart ? 'success' : 'primary'}
                        className={`!w-full !py-3 !px-4 !rounded-xl flex items-center justify-center gap-2 transition-all duration-500 shadow-lg ${isInCart
                            ? '!bg-emerald-500 !border-emerald-500 !shadow-emerald-200 hover:!bg-emerald-600'
                            : '!bg-indigo-600 !border-indigo-600 !shadow-indigo-200 hover:!bg-indigo-700'
                            }`}
                    >
                        <ShoppingBag size={18} />
                        <span className="font-bold text-sm whitespace-nowrap">
                            {isInCart ? 'Added' : 'Add to cart'}
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
