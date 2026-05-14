import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';
import ProductImageGallery from './ProductImageGallery';
import ProductCard from '@/components/ProductCard';

interface ProductDetailPageProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: ProductDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = productsData.find((p) => p.id === params.id) as Product | undefined;

  if (!product) {
    return {
      title: 'Product Not Found | TechStore',
    };
  }

  return {
    title: `${product.title} | TechStore`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = productsData.find((p) => p.id === params.id) as Product | undefined;

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product, max 4)
  const relatedProducts = (productsData as Product[])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-100 bg-[#fbfbfd]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm font-medium text-gray-500">
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-black transition-colors">Products</a>
            <span className="mx-2">/</span>
            <a href={`/products?category=${product.category}`} className="hover:text-black transition-colors capitalize">
              {product.category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Image Gallery (Left Column) */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <ProductImageGallery image={product.image} title={product.title} />
            </div>
          </div>

          {/* Product Details (Right Column) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-4 flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 rounded-full">
                New Release
              </span>
              <div className="flex items-center text-sm font-semibold text-gray-900">
                <span className="text-yellow-400 mr-1 text-lg">★</span>
                {product.rating} <span className="text-gray-400 font-normal ml-1">(128 reviews)</span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <p className="mb-8 text-3xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose prose-lg mb-10 text-gray-600 border-t border-gray-100 pt-8">
              <p className="leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-6 mt-auto">
              <div className="bg-[#fbfbfd] p-6 rounded-3xl border border-gray-100">
                <AddToCartButton product={product} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free & fast shipping</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                  <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 bg-[#fbfbfd] pt-20 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">You might also like</h2>
              <a href={`/products?category=${product.category}`} className="hidden sm:flex text-blue-600 font-medium hover:underline items-center">
                View all in {product.category}
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
