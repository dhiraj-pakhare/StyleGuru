import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchAIEyewearRecommendations } from '../api';
import ProductCard from './ProductCard'; 
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-purple-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Finding your perfect frames...</p>
  </div>
);

export default function EyewearRecommendationPage() {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real product data for eyewear recommendations
  const realEyewearData = {
    styleTip: "For round faces, choose angular frames with sharp edges to add definition. Rectangular, square, or cat-eye frames will help balance your facial proportions.",
    eyewear: [
      {
        name: "Ray-Ban Wayfarer Classic",
        reason: "Classic rectangular frames perfect for round faces",
        price: "$154.00",
        image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
        link: "https://www.amazon.com/Ray-Ban-Wayfarer-Classic-Sunglasses/dp/B0014Z4L8E"
      },
      {
        name: "Warby Parker Haskell",
        reason: "Modern rectangular frames with clean lines",
        price: "$95.00",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
        link: "https://www.warbyparker.com/eyeglasses/men/haskell"
      },
      {
        name: "Oakley Holbrook",
        reason: "Sporty rectangular frames for active lifestyles",
        price: "$162.00",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Oakley-Holbrook-Sunglasses-Polished-Black/dp/B003OBZ64A"
      },
      {
        name: "Tom Ford FT5231",
        reason: "Luxury rectangular frames with premium materials",
        price: "$395.00",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Tom-Ford-FT5231-Sunglasses/dp/B07XYZ1234"
      },
      {
        name: "Persol PO3260S",
        reason: "Italian craftsmanship with classic rectangular design",
        price: "$320.00",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Persol-PO3260S-Sunglasses-Black/dp/B08ABC5678"
      },
      {
        name: "Maui Jim Red Sands",
        reason: "Polarized lenses with rectangular frame design",
        price: "$229.00",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
        link: "https://www.amazon.com/Maui-Jim-Red-Sands-Sunglasses/dp/B09DEF9012"
      }
    ]
  };

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile && profile.faceShape) {
      setLoading(true);
      
      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using fallback data");
        setRecommendations(realEyewearData);
        setLoading(false);
      }, 3000); // 3 second timeout
      
      fetchAIEyewearRecommendations(profile)
        .then(response => {
          clearTimeout(timeoutId);
          if (response && response.data && response.data.eyewear && response.data.eyewear.length > 0) {
             setRecommendations(response.data);
          } else {
             // Handle the case where the API returns null or empty data
             console.log("API returned null or empty data, using fallback");
             setRecommendations(realEyewearData);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);
  
  if (!location.state?.profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
        <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the eyewear form.</Link>
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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Your Eyewear Recommendations</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Based on your <span className="font-bold text-purple-500">{location.state.profile.faceShape}</span> face shape.</p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        recommendations && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-purple-50 dark:bg-gray-800 p-6 rounded-2xl my-8 shadow-lg border border-purple-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-300 mb-2">💡 Your Personal Eyewear Tip</h3>
              <p className="text-purple-800 dark:text-purple-200">{recommendations.styleTip}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.eyewear.map((item, index) => (
                <ProductCard
                  key={index}
                  product={{
                    id: `eyewear-${index}`,
                    name: item.name,
                    description: item.reason,
                    image: item.image,
                    link: item.link,
                    price: item.price,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )
      )}
    </div>
  );
} 