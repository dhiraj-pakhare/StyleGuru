import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIOutfitSuggestions } from '../services/aiService';
import ProductCard from './ProductCard'; 
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// A spinner component for loading state
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-purple-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Generating your style...</p>
  </div>
);

export default function RecommendationPage() {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile) {
      setLoading(true);
      getAIOutfitSuggestions(profile)
        .then(res => setRecommendations(res))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [location.state]);
  
  if (!location.state?.profile) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
            <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the style form.</Link>
        </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="flex items-center gap-2 text-purple-500 font-semibold mb-8 hover:underline">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Your AI Recommendations</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Here are some personalized looks curated just for you.</p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        recommendations && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Style Tip Card */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-purple-50 dark:bg-gray-800 p-6 rounded-2xl my-8 shadow-lg border border-purple-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-300 mb-2">✨ Your Personal Style Tip</h3>
              <p className="text-purple-800 dark:text-purple-200">{recommendations.styleTip}</p>
            </motion.div>

            {/* Outfits */}
            {recommendations.outfits.map((outfit, index) => (
              <div key={index} className="mb-12">
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{outfit.name}</motion.h2>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-md text-gray-500 dark:text-gray-400 mb-6">{outfit.description}</motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {outfit.pieces.map((piece, pieceIndex) => (
                    <ProductCard
                      key={pieceIndex}
                      product={{ ...piece, name: piece.itemName, description: `A key piece for this look. (${piece.category})` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )
      )}
    </div>
  );
} 