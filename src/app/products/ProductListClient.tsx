'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

interface ProductListClientProps {
  initialProducts: Product[];
  initialCategory?: string;
}

export default function ProductListClient({ initialProducts, initialCategory }: ProductListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading state for smooth UI experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'phones', 'laptops', 'accessories'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Search by Title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Sort by Price
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, selectedCategory, searchQuery, sortOrder]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOrder('featured');
  };

  return (
    <div className="bg-[#fbfbfd] min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-8">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h1>

          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black focus:border-black sm:text-sm transition-all duration-300"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-black text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category === 'All' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm font-medium cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12">
        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 p-6 h-96 animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 max-w-3xl mx-auto mt-12 animate-in fade-in duration-500">
            <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't find anything matching "{searchQuery}" in this category. Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
