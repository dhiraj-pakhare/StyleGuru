import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EcoBadge from './EcoBadge';
import ProductDetailsModal from './ProductDetailsModal';

export default function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <motion.div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/80 shadow-lg h-full cursor-pointer"
        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(136,0,255,0.2)' }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex="0"
        aria-label={`View details for ${product.name}`}
      >
        <div
          className="relative w-full h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          {product.eco && <EcoBadge />}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate" title={product.name}>
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">{product.price}</p>
            <a
              href={product.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              onClick={e => e.stopPropagation()}
            >
              Buy Now
            </a>
          </div>
        </div>
      </motion.div>
      <ProductDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} product={product} />
    </>
  );
} 