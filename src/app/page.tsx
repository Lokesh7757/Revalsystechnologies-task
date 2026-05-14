'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { motion, Variants } from 'framer-motion';

export default function HomePage() {
  const featuredProducts = (productsData as Product[]).slice(0, 4);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="bg-[#fbfbfd] min-h-screen selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pb-48">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-gray-900 leading-[1.1] mb-8">
                Profound power. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                  Absolute elegance.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xl sm:text-2xl leading-relaxed text-gray-500 max-w-2xl mx-auto font-medium"
            >
              Discover our latest collection of premium technology designed to elevate your everyday experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-8 py-4 text-lg font-medium text-white transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop the Collection
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-white border border-gray-200 px-8 py-4 text-lg font-medium text-gray-900 transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
              >
                Learn more
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Featured</h2>
              <p className="mt-4 text-lg text-gray-500 font-medium">Handpicked essentials for you.</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex text-gray-900 font-semibold hover:text-gray-600 transition-colors items-center group text-lg"
            >
              View all
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Categories */}
      <section className="py-24 bg-[#fbfbfd]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-16"
          >
            Explore categories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[400px]">
            {/* Phones (Large) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 relative rounded-[2.5rem] overflow-hidden group cursor-pointer bg-white"
            >
              <Link href="/products?category=phones">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-80" />
                <Image
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop"
                  alt="Phones"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-bold mb-2">Phones</h3>
                  <p className="text-lg text-gray-200 font-medium flex items-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore collection <ArrowRight className="ml-2 h-5 w-5" />
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Accessories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer bg-white"
            >
              <Link href="/products?category=accessories">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10 transition-opacity group-hover:opacity-80" />
                <Image
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2000&auto=format&fit=crop"
                  alt="Accessories"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-bold mb-2">Accessories</h3>
                  <p className="text-lg text-gray-200 font-medium flex items-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore <ArrowRight className="ml-2 h-5 w-5" />
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Laptops */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 h-[400px] relative rounded-[2.5rem] overflow-hidden group cursor-pointer bg-white"
            >
              <Link href="/products?category=laptops">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-80" />
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000&auto=format&fit=crop"
                  alt="Laptops"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-bold mb-2">Laptops</h3>
                  <p className="text-lg text-gray-200 font-medium flex items-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore collection <ArrowRight className="ml-2 h-5 w-5" />
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
