import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIDietPlan } from '../services/aiService';
import { ArrowLeftIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';

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

const TAG_COLORS = {
  'vegetarian': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'vegan': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'keto': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'gluten-free': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  'dairy-free': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'high-protein': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  'low-carb': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
};

const MEAL_ICONS = {
  'Breakfast': '🌅',
  'Lunch': '☀️',
  'Dinner': '🌙',
  'Snack': '🍎',
};

const MealCard = ({ mealType, meal }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-1.5">
          <span>{MEAL_ICONS[mealType] || '🍽️'}</span> {mealType}
        </p>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{meal.title}</h3>
      </div>
      {meal.prepTime && meal.prepTime !== 'N/A' && (
        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap">
          <ClockIcon className="h-4 w-4" />
          {meal.prepTime}
        </span>
      )}
    </div>

    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{meal.description}</p>

    {/* Macros Row */}
    <div className="grid grid-cols-4 gap-2 mb-4">
      <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{meal.calories}</p>
      </div>
      <div className="bg-red-50 dark:bg-gray-700 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{meal.protein}</p>
      </div>
      <div className="bg-yellow-50 dark:bg-gray-700 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{meal.carbs}</p>
      </div>
      <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Fat</p>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{meal.fat}</p>
      </div>
    </div>

    {/* Dietary Tags */}
    {meal.tags && meal.tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {meal.tags
          .filter(tag => tag !== 'non-veg') // Don't show the 'non-veg' tag explicitly
          .map(tag => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              {tag}
            </span>
          ))}
      </div>
    )}
  </motion.div>
);

// Generates a restriction-compliant fallback plan based on user's restriction
const generateFallbackPlan = (restriction) => {
  const plans = {
    'Vegetarian': {
      breakfast: { title: "Masala Egg Bhurji", calories: "380 kcal", protein: "22g", carbs: "30g", fat: "18g", prepTime: "12 min", description: "Indian-style scrambled eggs with onions, tomatoes, green chillies, turmeric, and fresh coriander. Served with two multigrain rotis.", tags: ['vegetarian', 'dairy-free', 'high-protein'] },
      lunch: { title: "Paneer Tikka Masala with Jeera Rice", calories: "520 kcal", protein: "24g", carbs: "50g", fat: "26g", prepTime: "30 min", description: "Tandoori-marinated paneer in rich tomato-cream gravy with kasoori methi and fragrant jeera rice.", tags: ['vegetarian', 'gluten-free', 'high-protein'] },
      dinner: { title: "Vegetable Biryani", calories: "480 kcal", protein: "14g", carbs: "68g", fat: "16g", prepTime: "45 min", description: "Fragrant basmati rice layered with spiced mixed vegetables, caramelized onions, saffron milk, and fresh mint. Served with cucumber raita.", tags: ['vegetarian', 'gluten-free'] },
      snack: { title: "Paneer & Vegetable Skewers", calories: "200 kcal", protein: "14g", carbs: "8g", fat: "14g", prepTime: "15 min", description: "Grilled skewers of paneer cubes, cherry tomatoes, bell peppers, and zucchini.", tags: ['vegetarian', 'gluten-free', 'high-protein'] },
    },
    'Vegan': {
      breakfast: { title: "Chickpea Flour Omelette", calories: "340 kcal", protein: "18g", carbs: "32g", fat: "16g", prepTime: "15 min", description: "A savory omelette made from besan (chickpea flour) with diced tomatoes, onions, green chillies, and fresh coriander.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
      lunch: { title: "Mediterranean Falafel Bowl", calories: "520 kcal", protein: "22g", carbs: "62g", fat: "22g", prepTime: "30 min", description: "Crispy baked falafel over quinoa with hummus, tabbouleh, roasted red peppers, and tahini-lemon dressing.", tags: ['vegan', 'vegetarian', 'dairy-free', 'high-protein'] },
      dinner: { title: "Dal Makhani (Vegan Version)", calories: "440 kcal", protein: "20g", carbs: "58g", fat: "14g", prepTime: "60 min", description: "Slow-cooked black lentils and kidney beans in a rich, smoky tomato gravy made with cashew cream.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
      snack: { title: "Hummus & Vegetable Crudités", calories: "180 kcal", protein: "7g", carbs: "20g", fat: "8g", prepTime: "10 min", description: "Creamy homemade hummus with carrot sticks, cucumber, bell pepper strips, and cherry tomatoes.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    },
    'Gluten-Free': {
      breakfast: { title: "South Indian Dosa with Coconut Chutney", calories: "350 kcal", protein: "10g", carbs: "54g", fat: "10g", prepTime: "20 min", description: "Crispy rice-and-lentil dosa filled with spiced potato masala, served with fresh coconut chutney.", tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
      lunch: { title: "Thai Peanut Tofu Rice Bowl", calories: "480 kcal", protein: "24g", carbs: "54g", fat: "20g", prepTime: "25 min", description: "Crispy pan-fried tofu in a spicy peanut-lime sauce over jasmine rice with shredded cabbage and edamame.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
      dinner: { title: "Lentil & Vegetable Coconut Curry", calories: "440 kcal", protein: "18g", carbs: "56g", fat: "16g", prepTime: "30 min", description: "Red lentils and mixed vegetables simmered in a fragrant coconut milk curry with turmeric and cumin.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
      snack: { title: "Trail Mix (Nuts, Seeds & Dried Fruit)", calories: "220 kcal", protein: "8g", carbs: "20g", fat: "14g", prepTime: "2 min", description: "A blend of almonds, walnuts, pumpkin seeds, sunflower seeds, dried cranberries, and dark chocolate chips.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    },
    'Dairy-Free': {
      breakfast: { title: "Overnight Chia Pudding", calories: "310 kcal", protein: "8g", carbs: "38g", fat: "16g", prepTime: "5 min prep", description: "Chia seeds soaked in coconut milk, layered with fresh mango, passion fruit, and toasted coconut flakes.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
      lunch: { title: "Rajma Chawal (Kidney Bean Curry)", calories: "460 kcal", protein: "18g", carbs: "68g", fat: "12g", prepTime: "35 min", description: "North Indian kidney bean curry with tomatoes, onions, and aromatic spices. Served with steamed basmati rice.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
      dinner: { title: "Tofu & Broccoli Stir-Fry", calories: "400 kcal", protein: "22g", carbs: "42g", fat: "16g", prepTime: "20 min", description: "Crispy pressed tofu and broccoli florets in a garlic-ginger-tamari sauce with sesame seeds over brown rice.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free', 'high-protein'] },
      snack: { title: "Roasted Makhana (Fox Nuts)", calories: "150 kcal", protein: "5g", carbs: "18g", fat: "6g", prepTime: "10 min", description: "Crunchy roasted makhana seasoned with Himalayan pink salt, turmeric, and chaat masala.", tags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
    },
  };

  const fallback = plans[restriction] || plans['Vegetarian'];

  return {
    plan: fallback,
    dailyTotals: { calories: 'N/A', protein: 'N/A', carbs: 'N/A', fat: 'N/A' },
    nutritionTip: "Focus on whole foods, lean proteins, complex carbohydrates, and healthy fats. Stay hydrated with 8-10 glasses of water daily and include plenty of fiber-rich vegetables."
  };
};

export default function DietPlanPage() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile && profile.goal) {
      setLoading(true);

      const restriction = profile.restrictions || 'None';

      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using restriction-compliant fallback data");
        setData(generateFallbackPlan(restriction));
        setLoading(false);
      }, 3000);

      getAIDietPlan(profile)
        .then(res => {
          clearTimeout(timeoutId);
          if (res && res.plan && res.plan.breakfast) {
            setData(res);
          } else {
            console.log("API returned null/empty, using restriction-compliant fallback");
            setData(generateFallbackPlan(restriction));
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
            {/* Nutrition Tip */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-green-50 dark:bg-gray-800 p-6 rounded-2xl my-8 shadow-lg border border-green-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">🍎 Your Nutrition Tip</h3>
              <p className="text-green-800 dark:text-green-200">{data.nutritionTip}</p>
            </motion.div>

            {/* Daily Totals Summary */}
            {data.dailyTotals && data.dailyTotals.calories !== 'N/A' && (
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FireIcon className="h-5 w-5 text-orange-500" /> Daily Totals
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{data.dailyTotals.calories}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-red-500 dark:text-red-400">{data.dailyTotals.protein}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-yellow-500 dark:text-yellow-400">{data.dailyTotals.carbs}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-blue-500 dark:text-blue-400">{data.dailyTotals.fat}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fat</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Meal Cards */}
            <div className="space-y-6">
              <MealCard mealType="Breakfast" meal={data.plan.breakfast} />
              <MealCard mealType="Lunch" meal={data.plan.lunch} />
              <MealCard mealType="Dinner" meal={data.plan.dinner} />
              {data.plan.snack && <MealCard mealType="Snack" meal={data.plan.snack} />}
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}