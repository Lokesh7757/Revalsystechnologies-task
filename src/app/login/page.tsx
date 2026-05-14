'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Input from '@/components/Input';
import { LogOut, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const user = useCartStore((state) => state.user);
  const setUser = useCartStore((state) => state.setUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate login by saving to local state (persisted via Zustand)
      setUser({
        name: email.split('@')[0],
        email,
        isGuest: false,
      });
      router.push('/');
    }
  };

  const handleGuestLogin = () => {
    setUser({
      name: 'Guest User',
      email: 'guest@example.com',
      isGuest: true,
    });
    router.push('/');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!mounted) return null;

  if (user) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-12 px-6 sm:px-12 shadow-sm sm:rounded-[2.5rem] text-center border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h2>
            <p className="text-gray-500 mb-10">{user.email}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full flex items-center justify-center space-x-2 py-4 px-4 rounded-full text-base font-medium text-white bg-black hover:bg-gray-800 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-4 px-4 rounded-full text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8 animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            Sign In
          </h2>
          <p className="text-lg text-gray-500">
            Access your orders, saved items, and more.
          </p>
        </div>

        <div className="bg-white py-10 px-6 shadow-sm sm:rounded-[2.5rem] sm:px-12 border border-gray-100 animate-in fade-in zoom-in-95 duration-500 delay-150">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 rounded-full shadow-sm text-base font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all hover:scale-[1.02]"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium tracking-wide uppercase text-xs">
                  Or continue without an account
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleGuestLogin}
                className="w-full flex justify-center py-4 px-4 rounded-full border border-gray-200 bg-white text-base font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-black">Terms of Service</a> and{' '}
          <a href="#" className="underline hover:text-black">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
