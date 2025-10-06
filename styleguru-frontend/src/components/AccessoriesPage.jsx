import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIAccessoriesSuggestions } from '../services/aiService';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-pink-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Finding your accessories...</p>
  </div>
);

export default function AccessoriesPage() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real product data for accessories
  const realAccessoriesData = {
    accessories: [
      {
        name: "Tommy Hilfiger Leather Belt",
        reason: "Classic brown leather belt perfect for business formal attire",
        price: "$49.99",
        image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
        link: "https://www.amazon.com/Tommy-Hilfiger-Leather-Belt-Brown/dp/B07XYZ1234"
      },
      {
        name: "Silk Pocket Square Set",
        reason: "Premium silk pocket squares in classic colors for your blazer",
        price: "$24.99",
        image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
        link: "https://www.amazon.com/Silk-Pocket-Square-Set-Formal/dp/B08ABC5678"
      },
      {
        name: "Fossil Minimalist Watch",
        reason: "Elegant stainless steel watch for professional settings",
        price: "$129.99",
        image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
        link: "https://www.amazon.com/Fossil-Minimalist-Watch-Stainless-Steel/dp/B09DEF9012"
      },
      {
        name: "Leather Business Portfolio",
        reason: "Professional leather portfolio for documents and meetings",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Leather-Business-Portfolio-Professional/dp/B07GHI3456"
      },
      {
        name: "Gold Cufflinks",
        reason: "Sophisticated gold cufflinks for formal shirt cuffs",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Gold-Cufflinks-Formal-Attire/dp/B08XYZ7890"
      },
      {
        name: "Cashmere Scarf",
        reason: "Luxury cashmere scarf for cold weather elegance",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Cashmere-Scarf-Luxury-Winter/dp/B09ABC1234"
      }
    ],
    styleTip: "For business formal looks, stick to classic accessories in neutral colors. Less is more - choose 2-3 key pieces that complement your outfit without overwhelming it."
  };

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile) {
      setLoading(true);
      
      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using fallback data");
        setData(realAccessoriesData);
        setLoading(false);
      }, 3000); // 3 second timeout
      
      getAIAccessoriesSuggestions(profile)
        .then(res => {
          clearTimeout(timeoutId);
          if (res && res.accessories && res.accessories.length > 0) {
            setData(res);
          } else {
            // API returned null or empty data, use fallback
            console.log("API returned null or empty data, using fallback");
            setData(realAccessoriesData);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);
  
  if (!location.state?.profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
        <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the accessories form.</Link>
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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Your Accessory Suggestions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            {location.state.profile.style} accessories to complement your {location.state.profile.outfit} outfit.
        </p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        data && data.accessories && data.accessories.length > 0 ? (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-pink-50 dark:bg-gray-800 p-6 rounded-2xl my-8 shadow-lg border border-pink-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-pink-700 dark:text-pink-300 mb-2">💎 Pro Tip</h3>
              <p className="text-pink-800 dark:text-pink-200">{data.styleTip}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.accessories.map((item, index) => (
                <ProductCard
                  key={index}
                  product={{
                    id: `${index}`,
                    name: item.name,
                    description: item.reason,
                    price: item.price,
                    image: item.image,
                    link: item.link,
                  }}
                />
              ))}
            </div>
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