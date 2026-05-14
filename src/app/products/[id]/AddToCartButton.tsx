'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Quantity Selector */}
      <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm p-1 w-full sm:w-auto justify-between">
        <button
          onClick={decreaseQuantity}
          className="p-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors focus:outline-none"
          aria-label="Decrease quantity"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="w-12 text-center text-lg font-semibold text-gray-900">
          {quantity}
        </span>
        <button
          onClick={increaseQuantity}
          className="p-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors focus:outline-none"
          aria-label="Increase quantity"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`flex w-full sm:w-auto flex-1 items-center justify-center space-x-3 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isAdded
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-md'
            : 'bg-black hover:bg-gray-800 hover:shadow-lg focus:ring-black'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="h-6 w-6" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-6 w-6" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
}
