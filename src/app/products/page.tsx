import { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import ProductListClient from './ProductListClient';

export const metadata: Metadata = {
  title: 'Products | TechStore',
  description: 'Browse our collection of premium electronics including phones, laptops, and accessories.',
};

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const initialCategory = searchParams.category;
  const initialProducts = productsData as Product[];

  return (
    <main>
      <ProductListClient 
        initialProducts={initialProducts} 
        initialCategory={initialCategory} 
      />
    </main>
  );
}
