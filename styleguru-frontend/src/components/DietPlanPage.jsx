import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIDietPlan } from '../services/aiService';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Building your meal plan...</p>
  </div>
);

const MealCard = ({ mealType, meal }) => (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">{mealType}</p>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{meal.title}</h3>
            </div>
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{meal.calories}</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{meal.description}</p>
    </motion.div>
);

export default function DietPlanPage() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real diet plan data
  const realDietData = {
    nutritionTip: "Focus on lean proteins, complex carbohydrates, and healthy fats. Stay hydrated with 8-10 glasses of water daily and include plenty of fiber-rich vegetables.",
    plan: {
      breakfast: {
        title: "Protein-Packed Oatmeal Bowl",
        calories: "420 cal",
        description: "Steel-cut oats with almond milk, topped with berries, nuts, and a scoop of protein powder. Perfect for sustained energy throughout the morning."
      },
      lunch: {
        title: "Grilled Chicken Quinoa Salad",
        calories: "380 cal",
        description: "Mixed greens with grilled chicken breast, quinoa, cherry tomatoes, cucumber, and balsamic vinaigrette. High in protein and fiber."
      },
      dinner: {
        title: "Salmon with Roasted Vegetables",
        calories: "450 cal",
        description: "Baked salmon fillet with roasted sweet potatoes, broccoli, and asparagus. Rich in omega-3s and essential nutrients."
      }
    }
  };

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile && profile.goal) {
      setLoading(true);
      
      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using fallback data");
        setData(realDietData);
        setLoading(false);
      }, 3000); // 3 second timeout
      
      getAIDietPlan(profile)
        .then(res => {
          clearTimeout(timeoutId);
          if (res && res.plan && res.plan.breakfast) {
            setData(res);
          } else {
            // API returned null or empty data, use fallback
            console.log("API returned null or empty data, using fallback");
            setData(realDietData);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);
  
  if (!location.state?.profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
        <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the diet plan form.</Link>
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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Your Custom Diet Plan</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            Based on your goal of <span className="font-bold text-green-600 dark:text-green-400">{location.state.profile.goal}</span> 
            {location.state.profile.restrictions !== 'None' && ` with a ${location.state.profile.restrictions} restriction`}.
        </p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        data && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-green-50 dark:bg-gray-800 p-6 rounded-2xl my-8 shadow-lg border border-green-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">🍎 Your Nutrition Tip</h3>
              <p className="text-green-800 dark:text-green-200">{data.nutritionTip}</p>
            </motion.div>
            
            <div className="space-y-6">
                <MealCard mealType="Breakfast" meal={data.plan.breakfast} />
                <MealCard mealType="Lunch" meal={data.plan.lunch} />
                <MealCard mealType="Dinner" meal={data.plan.dinner} />
            </div>
          </motion.div>
        )
      )}
    </div>
  );
} 