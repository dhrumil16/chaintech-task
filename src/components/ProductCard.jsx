import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Button from './ui/Button';
import { ShoppingBag, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        showToast(`Added ${product.title} to cart`, 'success');
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1">
            <div className="relative pt-[100%] bg-white p-2 sm:p-6 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-contain p-3 sm:p-6 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                    {product.category}
                </div>
            </div>

            <div className="p-3 sm:p-5 flex flex-col flex-1">
                <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={`${i < Math.round(product.rating?.rate || 0)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200"
                                }`}
                        />
                    ))}
                    <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5 sm:ml-1">
                        ({product.rating?.count})
                    </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-1 sm:mb-2 group-hover:text-indigo-600 transition-colors" title={product.title}>
                    {product.title}
                </h3>

                <div className="mt-auto pt-2 sm:pt-4 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 sm:gap-4">
                    <span className="text-base sm:text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button
                        onClick={handleAddToCart}
                        variant="primary"
                        className="!w-full xs:!w-auto !py-1.5 sm:!py-2 !px-2 sm:!px-3 !rounded-lg flex items-center justify-center gap-1.5"
                    >
                        <ShoppingBag size={16} className="sm:size-[18px]" />
                        <span className="text-xs sm:text-sm">Add</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
