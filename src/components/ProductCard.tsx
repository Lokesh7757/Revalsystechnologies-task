'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '@/types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block h-full outline-none">
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden relative"
      >
        {/* New Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-gray-900 shadow-sm border border-white/20">
            {product.category}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square w-full bg-[#fbfbfd] overflow-hidden p-8 flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-500">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain mix-blend-multiply drop-shadow-sm"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-600">{product.rating}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-black transition-colors line-clamp-2">
              {product.title}
            </h3>
          </div>
          
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
              <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
