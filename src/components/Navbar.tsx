'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const user = useCartStore((state) => state.user);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className="bg-black text-white p-1.5 rounded-lg">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              TechStore.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-600 hover:text-black transition-colors group"
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-black rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-black transition-colors group"
            >
              <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                <User className="h-4 w-4" />
              </div>
              <span>{mounted && user ? user.name : 'Sign In'}</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-black transition-colors group"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {mounted && cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute 0 right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 z-50">
            <Link href="/cart" className="relative p-2 text-gray-600">
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute 0 right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100"
          >
            <div className="px-4 pt-4 pb-8 space-y-4 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-base font-semibold ${
                    pathname === link.href
                      ? 'bg-gray-50 text-black'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-semibold text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  <User className="h-5 w-5" />
                  <span>{mounted && user ? `Account (${user.name})` : 'Sign In'}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
