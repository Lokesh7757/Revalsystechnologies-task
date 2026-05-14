'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <li className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[1.5rem] bg-[#fbfbfd] sm:h-40 sm:w-40 border border-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2"
          sizes="160px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between sm:space-x-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{item.category}</p>
            <Link href={`/products/${item.id}`}>
              <h3 className="text-xl font-semibold text-gray-900 hover:underline transition-colors line-clamp-2">
                {item.title}
              </h3>
            </Link>
          </div>
          <p className="text-xl font-semibold text-gray-900 whitespace-nowrap">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm p-1">
            <button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-semibold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-full hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
