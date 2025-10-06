import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WishlistModal from './WishlistModal';

const features = [
  {
    title: 'AI Outfit Suggestions',
    icon: '👗',
    desc: 'Full outfit recommendations based on gender, season, style, and body type.',
    key: 'outfit-suggestions',
  },
  {
    title: 'AI Accessories Suggestions',
    icon: '👜',
    desc: 'Find the perfect, gender-specific accessories to complete your look.',
    key: 'accessories-suggestions',
  },
  {
    title: 'Face shape eyewear recommendations',
    icon: '🕶️',
    desc: 'Find the perfect frames for your unique face shape and gender.',
    key: 'eyewear',
  },
  {
    title: 'Custom diet plans',
    icon: '🥗',
    desc: 'AI-generated meal plans tailored to your gender, goals, and preferences.',
    key: 'diet',
  },
  {
    title: 'Skin & hair care routines',
    icon: '💆‍♀️',
    desc: 'Personalized, gender-specific routines for glowing skin and healthy hair.',
    key: 'care',
  },
  {
    title: 'AR Virtual Try-on',
    icon: '🪞',
    desc: 'Try on gender-specific styles virtually with augmented reality.',
    key: 'ar',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const FeatureCard = ({ feature, onGetRecommendation }) => (
  <motion.div 
    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex flex-col text-center items-center"
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="text-5xl mb-4">{feature.icon}</div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{feature.desc}</p>
    <button
      onClick={() => onGetRecommendation(feature)}
      className="mt-auto px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
    >
      Get Recommendation
    </button>
  </motion.div>
);

// Remove the container and card variables definitions

export default function Features({ onGetRecommendation }) {
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // For now, wishlist is empty. It can be populated later.
  const allProducts = [];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Discover Your Perfect Style</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Unlock personalized recommendations with the power of AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} onGetRecommendation={onGetRecommendation} />
          ))}
        </div>
      </div>
      {/* Floating Wishlist Button */}
      <button
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg hover:scale-110 transition-transform focus:outline-none"
        aria-label="Open Wishlist"
        onClick={() => setWishlistOpen(true)}
      >
        <span className="material-icons text-white text-3xl">favorite</span>
      </button>
      <WishlistModal open={wishlistOpen} onClose={() => setWishlistOpen(false)} allProducts={allProducts} />
    </section>
  );
}