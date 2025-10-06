import React from 'react'; // Remove useState from import
import { motion, AnimatePresence } from 'framer-motion';
import ProductCarousel from './ProductCarousel';

// Reusable product recommendations card list
export default function ProductRecommendations({ products, loading, error }) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-4">{error}</div>
    );
  }
  if (!products || products.length === 0) return null;

  return (
    <AnimatePresence>
      <ProductCarousel products={products} />
    </AnimatePresence>
  );
}