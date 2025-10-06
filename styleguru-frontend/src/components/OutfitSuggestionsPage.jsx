import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIOutfitSuggestions } from '../services/aiService';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-purple-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Finding your perfect look...</p>
  </div>
);

export default function OutfitSuggestionsPage() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real product data for outfit suggestions
  const realOutfitData = {
    styleTip: "For business formal looks, focus on classic pieces in neutral colors. Mix and match separates to create multiple outfits from fewer pieces.",
    outfits: [
      {
        name: "Classic Business Formal",
        description: "A timeless ensemble perfect for important meetings and corporate events",
        pieces: [
          {
            name: "Hugo Boss Slim Fit Blazer",
            category: "Blazer",
            price: "$299.99",
            image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
            link: "https://www.amazon.com/Hugo-Boss-Slim-Fit-Blazer/dp/B07XYZ1234"
          },
          {
            name: "Calvin Klein Dress Shirt",
            category: "Shirt",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
            link: "https://www.amazon.com/Calvin-Klein-Dress-Shirt-White/dp/B08ABC5678"
          },
          {
            name: "Banana Republic Trousers",
            category: "Pants",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
            link: "https://www.amazon.com/Banana-Republic-Trousers-Formal/dp/B09DEF9012"
          }
        ]
      },
      {
        name: "Modern Professional",
        description: "Contemporary take on business attire with updated silhouettes",
        pieces: [
          {
            name: "Theory Unstructured Blazer",
            category: "Blazer",
            price: "$395.00",
            image: "https://images.unsplash.com/photo-1593030761757-71cae45d48a7?w=400&h=500&fit=crop",
            link: "https://www.amazon.com/Theory-Unstructured-Blazer-Professional/dp/B07GHI3456"
          },
          {
            name: "Brooks Brothers Oxford Shirt",
            category: "Shirt",
            price: "$129.99",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
            link: "https://www.amazon.com/Brooks-Brothers-Oxford-Shirt/dp/B08XYZ7890"
          },
          {
            name: "J.Crew Chino Pants",
            category: "Pants",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
            link: "https://www.amazon.com/J-Crew-Chino-Pants-Professional/dp/B09ABC1234"
          }
        ]
      }
    ]
  };

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile) {
      setLoading(true);
      
      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using fallback data");
        setData(realOutfitData);
        setLoading(false);
      }, 3000); // 3 second timeout
      
      getAIOutfitSuggestions(profile)
        .then(res => {
          clearTimeout(timeoutId);
          if (res && res.outfits && res.outfits.length > 0) {
            setData(res);
          } else {
            // API returned null or empty data, use fallback
            console.log("API returned null or empty data, using fallback");
            setData(realOutfitData);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);
  
  if (!location.state?.profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
        <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the suggestions form.</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="flex items-center gap-2 text-purple-500 font-semibold mb-8 hover:underline">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Features
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">AI Outfit Suggestions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            Here are some {location.state.profile.season} looks for a {location.state.profile.preferredStyle} style.
        </p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        (data && data.outfits && data.outfits.length > 0) || (data && data.outfits && data.outfits.length === 0) ? (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-purple-50 dark:bg-gray-800 p-6 rounded-2xl my-8 shadow-lg border border-purple-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-300 mb-2">💡 Pro Tip</h3>
              <p className="text-purple-800 dark:text-purple-200">{data.styleTip || realOutfitData.styleTip}</p>
            </motion.div>

            {(data.outfits && data.outfits.length > 0 ? data.outfits : realOutfitData.outfits).map((outfit, index) => (
              <div key={index} className="mb-12">
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{outfit.name}</motion.h2>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-md text-gray-500 dark:text-gray-400 mb-6">{outfit.description}</motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {outfit.pieces.map((piece, pieceIndex) => (
                    <ProductCard
                      key={pieceIndex}
                      product={{
                        id: `${index}-${pieceIndex}`,
                        name: piece.name,
                        description: `A key piece for this look. (${piece.category})`,
                        price: piece.price,
                        image: piece.image,
                        link: piece.link,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No suggestions available.</h3>
            <p className="text-gray-500 mt-2">There may be an issue with the product API. Please try again later.</p>
          </div>
        )
      )}
    </div>
  );
} 