import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { useToast } from './ToastContext';

export default function WishlistModal({ open, onClose, allProducts }) {
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (open) {
      const ids = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(ids);
      // Filter allProducts by wishlist ids
      setProducts(allProducts.filter(p => ids.includes(p.id)));
    }
  }, [open, allProducts]);

  const handleShare = (product, platform) => {
    const shareUrl = product.link || window.location.href;
    const text = `Check out this product: ${product.name} - ${shareUrl}`;
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      showToast('Link copied!', 'success');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
      showToast('Shared on WhatsApp!', 'success');
    } else if (platform === 'instagram') {
      showToast('Instagram sharing is not supported by browsers. Copy the link and share on Instagram!', 'info');
    } else {
      if (navigator.share) {
        navigator.share({ title: product.name, text, url: shareUrl });
        showToast('Shared!', 'success');
      } else {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
        showToast('Shared on Twitter!', 'success');
      }
    }
  };

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
          className="relative w-full max-w-2xl mx-auto sm:my-12 p-0"
        >
          <button
            aria-label="Close wishlist"
            onClick={onClose}
            className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:scale-110 transition"
          >
            <span className="material-icons text-gray-700 dark:text-gray-200">close</span>
          </button>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 min-h-[300px]">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Your Wishlist</h2>
            {products.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-300">No items in your wishlist yet.</div>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {products.map(product => (
                  <div key={product.id} className="relative">
                    <ProductCard
                      product={product}
                      onWishlistToggle={() => {}}
                      isWishlisted={true}
                      onShare={() => handleShare(product, 'default')}
                    />
                    <div className="flex gap-2 justify-center mt-2">
                      <button aria-label="WhatsApp" onClick={() => handleShare(product, 'whatsapp')} className="text-xl text-green-500"><span className="material-icons">whatsapp</span></button>
                      <button aria-label="Copy Link" onClick={() => handleShare(product, 'copy')} className="text-xl text-gray-500"><span className="material-icons">link</span></button>
                      <button aria-label="Instagram" onClick={() => handleShare(product, 'instagram')} className="text-xl text-pink-400"><span className="material-icons">instagram</span></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 