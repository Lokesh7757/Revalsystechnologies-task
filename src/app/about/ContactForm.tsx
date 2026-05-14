'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { Check } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 rounded-[2rem] p-10 text-center border border-green-100 flex flex-col items-center animate-in fade-in zoom-in duration-500 h-full justify-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-sm border border-gray-100 space-y-6 h-full flex flex-col justify-center">
      <Input
        id="name"
        name="name"
        type="text"
        label="Full Name"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      
      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      
      <Textarea
        id="message"
        name="message"
        label="Your Message"
        placeholder="How can we help you today?"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        rows={4}
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center py-4 px-4 rounded-full text-base font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:scale-[1.02] shadow-sm'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
