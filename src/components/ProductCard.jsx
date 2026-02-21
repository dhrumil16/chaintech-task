import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useRecentItems } from '../context/RecentItemsContext';
import Button from './ui/Button';
import { ShoppingBag, Star, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { addRecentItem } = useRecentItems();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        showToast(`Added ${product.title} to cart`, 'success');
    };

    const handleProductClick = () => {
        addRecentItem(product);
    };

    return (
        <div
            onClick={handleProductClick}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1 cursor-pointer"
        >
            <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
                <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold text-gray-900 shadow-sm border border-gray-100 uppercase tracking-wider">
                    {product.category?.name || 'Category'}
                </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2">
                    <div className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        NEW ARRIVAL
                    </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors" title={product.title}>
                    {product.title}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-gray-50">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <Button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
                        variant="primary"
                        className="!w-auto !py-2 !px-4 !rounded-xl flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={18} />
                        <span className="hidden xs:inline">Add</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
