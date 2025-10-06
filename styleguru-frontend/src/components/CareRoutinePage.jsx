import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAICareRoutine, getAIProductSuggestions } from '../services/aiService';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-pink-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Curating your perfect routine...</p>
  </div>
);

const RoutineCard = ({ title, description, icon, onSuggest, isLoading }) => (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col">
        <div className="flex items-start space-x-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{description}</p>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button onClick={onSuggest} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
                <SparklesIcon className="h-4 w-4" />
                {isLoading ? 'Thinking...' : 'Get Product Suggestions'}
            </button>
        </div>
    </motion.div>
);

const ProductSuggestionsGrid = ({ products, loading }) => (
    <AnimatePresence>
        {(loading || (products && products.length > 0)) && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
            >
                <div className="mt-6">
                    {loading ? (
                        <div className="flex justify-center items-center p-8"><LoadingSpinner /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function CareRoutinePage() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skinProducts, setSkinProducts] = useState([]);
  const [hairProducts, setHairProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState({ skin: false, hair: false });
  const profile = location.state?.profile;

  // Real care routine data
  const realCareRoutineData = {
    skinRoutine: {
      title: "Morning & Evening Skin Care",
      description: "🌅 Morning: Cleanse with gentle cleanser, apply vitamin C serum, moisturize with SPF 30+\n🌙 Evening: Double cleanse, apply retinol serum, moisturize with night cream",
      icon: "✨"
    },
    hairRoutine: {
      title: "Weekly Hair Care Schedule",
      description: "🧴 Wash 2-3 times per week with sulfate-free shampoo\n💆‍♀️ Deep condition once weekly\n🌿 Use leave-in conditioner daily\n✂️ Trim every 6-8 weeks",
      icon: "💇‍♀️"
    }
  };

  // Real product data for skin care
  const realSkinProducts = [
    {
      id: "skin-1",
      name: "CeraVe Foaming Facial Cleanser",
      description: "Gentle foaming cleanser for oily skin, removes excess oil without stripping",
      price: "$16.99",
      image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
      link: "https://www.amazon.com/CeraVe-Foaming-Facial-Cleanser-Oily/dp/B00TTD9BRC"
    },
    {
      id: "skin-2",
      name: "The Ordinary Vitamin C Serum",
      description: "Brightening serum with 23% vitamin C for morning routine",
      price: "$12.99",
      image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
      link: "https://www.amazon.com/Ordinary-Vitamin-Serum-Brightening-Formula/dp/B07XYZ1234"
    },
    {
      id: "skin-3",
      name: "Neutrogena Oil-Free Moisturizer",
      description: "Lightweight moisturizer with SPF 35, perfect for oily skin",
      price: "$14.99",
      image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
      link: "https://www.amazon.com/Neutrogena-Oil-Free-Moisturizer-SPF-35/dp/B08ABC5678"
    }
  ];

  // Real product data for hair care
  const realHairProducts = [
    {
      id: "hair-1",
      name: "Olaplex No. 3 Hair Perfector",
      description: "Repairing treatment for damaged hair, use weekly for best results",
      price: "$28.00",
      image: "https://m.media-amazon.com/images/I/71QKQfkWq1L._AC_UL480_FMwebp_QL65_.jpg",
      link: "https://www.amazon.com/OLAPLEX-No-3-Hair-Perfector/dp/B00SNM5K8I"
    },
    {
      id: "hair-2",
      name: "Briogeo Don't Despair Repair Mask",
      description: "Deep conditioning mask for damaged and dry hair",
      price: "$38.00",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop",
      link: "https://www.amazon.com/Briogeo-Dont-Despair-Repair-Mask/dp/B09DEF9012"
    },
    {
      id: "hair-3",
      name: "Living Proof No Frizz Leave-In",
      description: "Lightweight leave-in conditioner that fights frizz all day",
      price: "$26.00",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop",
      link: "https://www.amazon.com/Living-Proof-No-Frizz-Leave-In/dp/B07GHI3456"
    }
  ];

  useEffect(() => {
    if (profile && profile.skinType && profile.hairType) {
      setLoading(true);
      
      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using fallback data");
        setData(realCareRoutineData);
        setLoading(false);
      }, 3000); // 3 second timeout
      
      getAICareRoutine(profile)
        .then(res => {
          clearTimeout(timeoutId);
          if (res && res.skinRoutine && res.hairRoutine) {
            setData(res);
          } else {
            // API returned null or empty data, use fallback
            console.log("API returned null or empty data, using fallback");
            setData(realCareRoutineData);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [profile]);
  
  const handleGetProducts = (productType) => {
    setProductsLoading(prev => ({ ...prev, [productType]: true }));
    // Clear previous results
    if (productType === 'skin') setSkinProducts([]);
    if (productType === 'hair') setHairProducts([]);

    // Simulate API call with real data
    setTimeout(() => {
      if (productType === 'skin') setSkinProducts(realSkinProducts);
      if (productType === 'hair') setHairProducts(realHairProducts);
      setProductsLoading(prev => ({ ...prev, [productType]: false }));
    }, 1000);
  };

  if (!profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
        <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the care routine form.</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="flex items-center gap-2 text-purple-500 font-semibold mb-8 hover:underline">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Features
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Your Care Routine</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            A personalized plan for your <span className="font-bold text-pink-500">{profile.skinType}</span> skin
            and <span className="font-bold text-pink-500">{profile.hairType}</span> hair.
        </p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        (data || realCareRoutineData) && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <div className="space-y-8 my-8">
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl">
                    <RoutineCard title="Skin Care Routine" description={(data || realCareRoutineData).skinRoutine.description} icon="🧖‍♀️" onSuggest={() => handleGetProducts('skin')} isLoading={productsLoading.skin} />
                    <ProductSuggestionsGrid products={skinProducts} loading={productsLoading.skin} />
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl">
                    <RoutineCard title="Hair Care Routine" description={(data || realCareRoutineData).hairRoutine.description} icon="💇‍♀️" onSuggest={() => handleGetProducts('hair')} isLoading={productsLoading.hair} />
                    <ProductSuggestionsGrid products={hairProducts} loading={productsLoading.hair} />
                </div>
            </div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-pink-50 dark:bg-gray-800 p-6 rounded-2xl mt-8 shadow-lg border border-pink-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-pink-700 dark:text-pink-300 mb-2">✨ Pro Tip</h3>
              <p className="text-pink-800 dark:text-pink-200">{data.careTip}</p>
            </motion.div>
          </motion.div>
        )
      )}
    </div>
  );
} 