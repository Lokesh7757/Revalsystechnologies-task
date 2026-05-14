import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Hash, Share2, Globe, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'About Us & Contact | TechStore',
  description: 'Learn more about TechStore, our mission to provide the best premium electronics, and how to get in touch with our team.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#fbfbfd] min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Redefining your digital lifestyle.
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 font-medium leading-relaxed">
            We are passionate about technology and dedicated to bringing you the finest premium electronics available.
          </p>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
                alt="TechStore team working in a modern office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">Our Mission</h2>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Empowering people through elegant technology.</h3>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2024, TechStore was born from a simple yet ambitious goal: to make premium, life-enhancing technology accessible without compromising on design or performance.
                </p>
                <p>
                  We don't just sell products; we curate experiences. Every device in our catalog undergoes rigorous evaluation to ensure it meets our uncompromising standards for quality, sustainability, and aesthetic appeal.
                </p>
                <p>
                  Whether you're a creative professional, a student, or someone who simply appreciates fine engineering, our knowledgeable team is dedicated to helping you find the perfect tools to stay connected and inspired.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Get in touch.</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Have a question about a product or need support? Our team is here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="flex flex-col space-y-8">
              <div className="bg-[#fbfbfd] p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Email</h4>
                      <p className="mt-1 text-gray-500">support@techstore.com</p>
                      <p className="mt-1 text-sm text-gray-400">Expect a response within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                      <p className="mt-1 text-gray-500">1-800-TECH-STORE</p>
                      <p className="mt-1 text-sm text-gray-400">Mon-Fri from 8am to 6pm PST.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Office</h4>
                      <p className="mt-1 text-gray-500">123 Tech Avenue</p>
                      <p className="text-gray-500">Silicon Valley, CA 94025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-black p-8 sm:p-10 rounded-[2.5rem] text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                  <p className="text-gray-400 text-sm">Stay updated on new releases.</p>
                </div>
                <div className="flex space-x-4">
                  <Link href="#" className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <Hash className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <span className="sr-only">YouTube</span>
                    <Globe className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <Share2 className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Form Component */}
            <div className="flex-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
