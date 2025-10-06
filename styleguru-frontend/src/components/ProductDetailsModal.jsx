import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EcoBadge from './EcoBadge';
import ModalFocusTrap from './ModalFocusTrap';

const placeholder = 'https://via.placeholder.com/240x240?text=No+Image';

const mockReviews = [
  { user: 'Aditi', text: 'Love this product! Super comfy and stylish.' },
  { user: 'Rahul', text: 'Great value for money. Highly recommend.' },
];

export default function ProductDetailsModal({ open, onClose, product, onWishlistToggle, isWishlisted, onShare }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-xl mx-auto sm:my-12 p-0"
        >
          <ModalFocusTrap open={open} onClose={onClose}>
            <button
              aria-label="Close details"
              onClick={onClose}
              className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:scale-110 transition"
            >
              <span className="material-icons text-gray-700 dark:text-gray-200">close</span>
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row gap-6 min-h-[320px]">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative w-40 h-40 mb-2">
                  <img
                    src={product.image || placeholder}
                    alt={product.name}
                    className="w-40 h-40 object-cover rounded-xl bg-gray-100 dark:bg-gray-800"
                  />
                  {product.eco && <EcoBadge />}
                </div>
                <button
                  aria-label="Add to wishlist"
                  onClick={() => onWishlistToggle(product)}
                  className={`mt-2 text-2xl transition hover:scale-125 ${isWishlisted ? 'text-pink-500' : 'text-gray-400 dark:text-gray-500'}`}
                >
                  <span className="material-icons">{isWishlisted ? 'favorite' : 'favorite_border'}</span>
                </button>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="font-bold text-2xl mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {product.name}
                </div>
                <div className="text-gray-700 dark:text-gray-200 mb-2 text-base">
                  {product.description}
                </div>
                {product.price && (
                  <div className="text-pink-500 font-semibold mb-2 text-lg">₹{product.price}</div>
                )}
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-all mb-2"
                >
                  Buy Now
                </a>
                <div className="flex gap-3 items-center mt-2">
                  <button aria-label="Share" onClick={() => onShare('default')} className="text-2xl text-blue-500 hover:scale-125 transition"><span className="material-icons">share</span></button>
                  <button aria-label="WhatsApp" onClick={() => onShare('whatsapp')} className="text-2xl text-green-500 hover:scale-125 transition"><span className="material-icons">whatsapp</span></button>
                  <button aria-label="Copy Link" onClick={() => onShare('copy')} className="text-2xl text-gray-500 hover:scale-125 transition"><span className="material-icons">link</span></button>
                  <button aria-label="Instagram" onClick={() => onShare('instagram')} className="text-2xl text-pink-400 hover:scale-125 transition"><span className="material-icons">instagram</span></button>
                </div>
                <div className="mt-6">
                  <div className="font-semibold mb-2 text-purple-500">Reviews</div>
                  <div className="space-y-2">
                    {mockReviews.map((r, i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200">
                        <span className="font-bold text-pink-500 mr-2">{r.user}:</span> {r.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ModalFocusTrap>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 