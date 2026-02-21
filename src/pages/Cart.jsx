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
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart <span className="text-gray-400 text-lg font-normal ml-2">({getCartItemsCount()} items)</span></h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
                >
                    Clear all items
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:border-indigo-100 transition-colors">
                            <div className="w-full sm:w-24 h-24 bg-white p-2 rounded-xl border border-gray-100 flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                <div className="mt-2 text-indigo-600 font-bold sm:hidden">
                                    ₹{formatPrice(item.price * item.quantity)}
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-1.5 rounded-md text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all disabled:opacity-30"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="p-1.5 rounded-md text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div className="hidden sm:block text-right w-24">
                                    <div className="text-lg font-bold text-gray-900">
                                        ₹{formatPrice(item.price * item.quantity)}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        ₹{formatPrice(item.price)} each
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/5 p-6 border border-gray-100 sticky top-24">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>₹{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{formatPrice(getCartTotal())}</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => {
                                showToast('Order placed successfully! 🎉', 'success');
                                clearCart();
                            }}
                            variant="primary"
                            className="py-3 text-base shadow-indigo-500/25"
                        >
                            Checkout
                        </Button>
                        <Link to="/products" className="block text-center mt-4 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
