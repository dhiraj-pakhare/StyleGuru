import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
      setCurrentIndex(0); // Reset on resize
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < totalPages - 1;

  const handlePrev = () => {
    if (canGoLeft) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (canGoRight) setCurrentIndex(currentIndex + 1);
  };
  
  const startIndex = currentIndex * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  if (!products || products.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center py-6">
      {products.length > itemsPerPage && (
        <button
          aria-label="Previous products"
          onClick={handlePrev}
          disabled={!canGoLeft}
          className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-lg hover:scale-110 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-icons text-3xl text-purple-500">chevron_left</span>
        </button>
      )}
      <div className="w-full overflow-hidden">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
          >
            {visibleProducts.map((product, idx) => (
              <ProductCard key={product.id || idx} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {products.length > itemsPerPage && (
        <button
          aria-label="Next products"
          onClick={handleNext}
          disabled={!canGoRight}
          className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-lg hover:scale-110 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-icons text-3xl text-purple-500">chevron_right</span>
        </button>
      )}
    </div>
  );
} 