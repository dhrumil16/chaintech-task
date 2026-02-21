import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, getCartItemsCount } = useCart();
    const { showToast } = useToast();

    const formatPrice = (price) => Math.round(price * 83);

    if (cart.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Browse our products to find something you like.</p>
                <Link to="/products">
                    <Button variant="primary" className="!w-auto inline-flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Shopping Cart
                    <span className="text-gray-400 text-lg font-normal ml-2">({getCartItemsCount()} items)</span>
                </h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline flex items-center gap-1"
                >
                    <Trash2 size={14} /> Clear cart
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group hover:border-indigo-100 transition-all duration-300">
                            {/* Product Image */}
                            <div className="w-full sm:w-28 h-28 bg-[#f8fafc] p-3 rounded-2xl border border-gray-50 flex-shrink-0 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <div className="mb-2">
                                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{item.category}</span>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-tight mt-0.5">{item.title}</h3>
                                </div>
                                <div className="text-gray-400 text-sm font-medium">
                                    Unit Price: ₹{formatPrice(item.price)}
                                </div>
                            </div>

                            {/* Actions & Total */}
                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50 mt-2 sm:mt-0">
                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all disabled:opacity-30"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center text-sm font-black text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-lg font-black text-gray-900 leading-none mb-1">
                                            ₹{formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2.5 text-gray-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 shadow-sm border border-gray-50 bg-white"
                                        title="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 border border-gray-100 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">Order Summary</h3>

                        <div className="space-y-5 mb-8">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-gray-900">₹{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-emerald-500 font-bold uppercase text-xs tracking-wider">Free Shipping</span>
                            </div>
                            <div className="border-t border-gray-50 pt-6 flex justify-between items-center">
                                <span className="text-gray-900 font-bold">Total Amount</span>
                                <span className="text-2xl font-black text-indigo-600">₹{formatPrice(getCartTotal())}</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => {
                                showToast('Order placed successfully! 🎉', 'success');
                                clearCart();
                            }}
                            variant="primary"
                            className="!py-4 !rounded-2xl !text-lg !font-extrabold shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Proceed to Checkout
                        </Button>

                        <Link to="/products" className="flex items-center justify-center gap-2 mt-6 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-all duration-300">
                            <ArrowLeft size={16} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
