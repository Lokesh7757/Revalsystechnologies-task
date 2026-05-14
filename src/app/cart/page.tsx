'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Loader2, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { items, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="bg-white rounded-[2.5rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="bg-green-50 w-32 h-32 rounded-full flex items-center justify-center mb-8 border border-green-100">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-500 mb-10 max-w-md">
              Thank you for your purchase. We've received your order and will begin processing it right away.
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 w-full max-w-sm mb-10">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Order Number</p>
              <p className="text-2xl font-mono font-semibold text-gray-900">#ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-black px-10 py-4 text-lg font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:scale-105 focus:outline-none"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="bg-white rounded-[2.5rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center animate-in fade-in duration-500">
            <div className="bg-gray-50 w-32 h-32 rounded-full flex items-center justify-center mb-8">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Your bag is empty.</h1>
            <p className="text-xl text-gray-500 mb-10 max-w-md">
              Sign in to see if you have any saved items, or discover our latest products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-black px-10 py-4 text-lg font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:scale-105 focus:outline-none"
              >
                Continue Shopping
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-gray-100 px-10 py-4 text-lg font-medium text-gray-900 transition-all hover:bg-gray-200 focus:outline-none"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfbfd] min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-12">Review your bag.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              
              <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-gray-500 hover:text-black transition-colors focus:outline-none"
                >
                  Clear Bag
                </button>
                <Link
                  href="/products"
                  className="text-sm font-medium text-blue-600 hover:underline transition-colors flex items-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 sm:p-10 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Summary</h2>
              
              <div className="space-y-4 text-lg text-gray-600">
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <p>Subtotal</p>
                  <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <p>Estimated Tax (8%)</p>
                  <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <p>Estimated Shipping</p>
                  <p className="font-medium text-gray-900">Free</p>
                </div>
                <div className="flex justify-between pt-4">
                  <p className="text-2xl font-semibold text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full flex items-center justify-center space-x-2 rounded-full px-6 py-5 text-xl font-semibold text-white shadow-sm transition-all focus:outline-none ${
                    isCheckingOut ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:scale-[1.02]'
                  }`}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Check Out</span>
                      <ArrowRight className="h-5 w-5 ml-1" />
                    </>
                  )}
                </button>
                <p className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
