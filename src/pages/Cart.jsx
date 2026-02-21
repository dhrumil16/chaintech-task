import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, getCartItemsCount } = useCart();
    const { showToast } = useToast();

    const formatPrice = (price) => Math.round(price * 83);

    if (cart.length === 0) {
        return (
            <div className="text-center py-24 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 max-w-2xl mx-auto mt-12 animate-fade-in">
                <div className="w-24 h-24 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <ShoppingBag className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">Your cart is empty</h2>
                <p className="text-gray-400 mb-10 max-w-sm mx-auto text-lg leading-relaxed font-medium">
                    Time to fill it with something amazing! Explore our latest collection.
                </p>
                <Link to="/products">
                    <Button variant="primary" className="!w-auto !px-10 !py-4 inline-flex items-center gap-3 !rounded-2xl shadow-xl shadow-indigo-100 hover:scale-105 transition-transform font-bold">
                        <ArrowLeft className="h-5 w-5" /> Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-fade-in font-sans pb-20">
            {/* Creative Header */}
            <div className="flex items-end justify-between border-b-2 border-indigo-50 pb-8 px-2">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
                    <p className="text-gray-400 font-bold mt-1.5 flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
                        {getCartItemsCount()} Items
                    </p>
                </div>
                <button
                    onClick={clearCart}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 active:scale-95"
                >
                    <Trash2 size={16} /> <span>Clear All</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Creative Cart Items List */}
                <div className="flex-1 space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-5 sm:p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex gap-6 hover:shadow-[0_20px_60px_rgba(99,102,241,0.08)] transition-all duration-500 group relative overflow-hidden">
                            {/* Accent Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                            {/* Product Image Container */}
                            <div className="w-24 sm:w-32 h-24 sm:h-32 bg-[#f8fafc] p-3 rounded-2xl border border-gray-50 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Product Details Section */}
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div>
                                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1 block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors leading-tight mb-2 pr-4">
                                        {item.title}
                                    </h3>

                                    {/* Creative Quantity Pill */}
                                    <div className="flex items-center w-fit bg-gray-50/50 rounded-full p-1 border border-gray-100 group/pill hover:bg-white hover:shadow-md transition-all duration-300">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-20"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} strokeWidth={3} />
                                        </button>
                                        <span className="w-10 text-center text-sm font-black text-gray-800 tabular-nums">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-indigo-500 hover:text-white transition-all"
                                        >
                                            <Plus size={14} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
                                            ₹{formatPrice(item.price * item.quantity)}
                                        </div>
                                        <div className="text-[11px] text-gray-400 font-bold mt-1.5 flex items-center gap-1.5 italic">
                                            (₹{formatPrice(item.price)} each)
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 active:scale-90"
                                        title="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Creative Order Summary */}
                <div className="lg:w-96 flex-shrink-0">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.06)] p-8 border border-gray-100 sticky top-24 overflow-hidden group/summary">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 transition-opacity group-hover/summary:opacity-80"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                                    <ReceiptText size={24} />
                                </div>
                                Order Summary
                            </h3>

                            {/* Mini items list in summary */}
                            <div className="space-y-4 mb-8 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-gray-400 line-clamp-1 flex-1 pr-4">{item.title}</span>
                                        <span className="text-gray-900 tabular-nums font-bold ml-auto">₹{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-gray-50 pt-8 pb-4 mb-2">
                                <div className="flex justify-between text-gray-500 font-bold text-sm tracking-wide">
                                    <span>SUBTOTAL</span>
                                    <span className="text-gray-900">₹{formatPrice(getCartTotal())}</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm tracking-wide">
                                    <span className="text-gray-500">SHIPPING</span>
                                    <span className="text-emerald-500">FREE</span>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <span className="text-gray-900 text-xl font-black tracking-tight">Total Amount</span>
                                    <span className="text-3xl font-black text-indigo-600 tabular-nums">₹{formatPrice(getCartTotal())}</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => {
                                    showToast('Order placed successfully! 🎉', 'success');
                                    clearCart();
                                }}
                                variant="primary"
                                className="!py-5 !rounded-2xl !text-lg !font-black shadow-2xl shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6"
                            >
                                Proced to Checkout
                            </Button>

                            <Link to="/products" className="flex items-center justify-center gap-2 mt-8 text-sm font-black text-gray-400 hover:text-indigo-600 transition-all duration-300 group/shopping">
                                <ArrowLeft size={16} className="group-hover/shopping:-translate-x-1 transition-transform" />
                                <span>Continue Shopping</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
