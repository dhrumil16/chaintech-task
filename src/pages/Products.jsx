import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';
import useProducts from '../hooks/useProducts';

const Products = () => {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Get unique categories for the filter dropdown
    const categories = useMemo(() => {
        const uniqueCategories = ['all', ...new Set(products.map(p => p.category?.name).filter(Boolean))];
        return uniqueCategories;
    }, [products]);

    // Combined search and category filter logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category?.name === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96 font-sans">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-100 max-w-lg mx-auto mt-12 font-sans">
                <p className="text-red-600 font-medium mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Reload Page
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in font-sans">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-gray-200 pb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Collection</h1>
                    <p className="text-gray-500 mt-2 text-lg">Curated premium products for your lifestyle.</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-4">
                    {/* Search Field */}
                    <div className="relative group w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative w-full sm:w-56 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <Filter size={18} />
                        </div>
                        <select
                            className="block w-full pl-12 pr-10 py-3.5 border-2 border-gray-100 rounded-2xl bg-white text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm appearance-none cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <div className="mx-auto h-16 w-16 text-gray-200 mb-6">
                        <Search size={64} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
                    <p className="text-gray-500 mt-2">Try clarifying your search or choosing a different category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 pb-16">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
