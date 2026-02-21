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
        const uniqueCategories = ['all', ...new Set(products.map(p => p.category))];
        return uniqueCategories;
    }, [products]);

    // Combined search and category filter logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-100 max-w-lg mx-auto mt-12">
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
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-200 pb-6">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">E-Shop Products</h1>
                    <p className="text-gray-500 mt-1">Explore our vast collection from best brands.</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-3">
                    {/* Search Field */}
                    <div className="relative group w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm group-hover:border-gray-300"
                            placeholder="Search by title or brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative w-full sm:w-48 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm appearance-none cursor-pointer group-hover:border-gray-300"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="mx-auto h-12 w-12 text-gray-300 mb-4 flex justify-center">
                        <Search size={48} />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 pb-12">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
